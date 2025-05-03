import { Hono } from "hono";
import { prisma } from "@/lib/db";
import { uploadToPinata, fetchFromPinata } from "@/lib/pinata";

const app = new Hono();

app.post("/post-job", async (c) => {
  try {
    const {
      title,
      company,
      location,
      type,
      budgetMin,
      budgetMax,
      description,
      skills,
      category,
      experienceLevel,
      projectLength,
      clientId,
    } = await c.req.json();

    if (!clientId) {
      return c.json(
        {
          success: false,
          message: "User ID is required. Please log in.",
        },
        401
      );
    }

    if (!title || !description) {
      return c.json(
        {
          success: false,
          message: "Title and description are required.",
        },
        400
      );
    }

    const deadlineDate = new Date();
    switch (projectLength) {
      case "Less than 1 month":
        deadlineDate.setDate(deadlineDate.getDate() + 30);
        break;
      case "1-3 months":
        deadlineDate.setDate(deadlineDate.getDate() + 90);
        break;
      case "3-6 months":
        deadlineDate.setDate(deadlineDate.getDate() + 180);
        break;
      case "6+ months":
        deadlineDate.setDate(deadlineDate.getDate() + 365);
        break;
      default:
        deadlineDate.setDate(deadlineDate.getDate() + 90);
    }

    const richDescription = {
      description,
      skills,
      type,
      experienceLevel,
      projectLength,
      additionalDetails: {
        postedAt: new Date().toISOString(),
        requiresNDA: false,
      },
    };

    const fileName = `job-${Date.now()}.json`;
    const cid = await uploadToPinata(richDescription, fileName);

    const budgetMinValue = parseFloat(budgetMin) || 0;
    const budgetMaxValue = parseFloat(budgetMax) || 0;
    const budget = budgetMaxValue
      ? (budgetMinValue + budgetMaxValue) / 2
      : budgetMinValue;

    const existingUser = await prisma.user.findUnique({
      where: { id: clientId },
    });

    if (!existingUser) {
      return c.json(
        {
          success: false,
          message: "Client does not exist.",
        },
        400
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        company: company || null,
        location: location || null,
        longDescHash: cid,
        budget,
        deadline: deadlineDate,
        category,
        clientId,
        isOpen: true,
      },
    });

    return c.json(
      {
        success: true,
        message: "Job posted successfully",
        data: {
          jobId: job.id,
          descriptionCid: cid,
        },
      },
      201
    );
  } catch (error) {
    console.error("Error posting job:", error);
    return c.json(
      {
        success: false,
        message: "Failed to post job",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

app.get("/jobs/:id", async (c) => {
  try {
    const jobId = c.req.param("id");

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        proposals: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!job) {
      return c.json({ success: false, message: "Job not found" }, 404);
    }

    let richDescription = {};
    try {
      if (job.longDescHash) {
        richDescription = await fetchFromPinata(job.longDescHash);
      }
    } catch (fetchError) {
      console.error("Error fetching job description:", fetchError);
    }

    return c.json({
      success: true,
      data: {
        ...job,
        richDescription,
      },
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch job",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

app.get("/jobs", async (c) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        proposals: {
          select: {
            id: true,
          },
        },
      },
    });

    const jobsWithDescriptions = await Promise.all(
      jobs.map(async (job) => {
        let richDescription = {};
        try {
          if (job.longDescHash) {
            richDescription = await fetchFromPinata(job.longDescHash);
          }
        } catch (error) {
          console.error(`Error fetching description for job ${job.id}:`, error);
        }

        return {
          ...job,
          richDescription,
        };
      })
    );

    return c.json({
      success: true,
      data: jobsWithDescriptions,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch jobs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export default app;
