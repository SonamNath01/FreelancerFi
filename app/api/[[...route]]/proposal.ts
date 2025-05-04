import { prisma } from "@/lib/db";
import { Hono } from "hono";

const app = new Hono();

app.get("/received", async (c) => {
  const userId = c.req.header("x-user-id");
  const role = c.req.header("x-role");

  if (!userId || !role) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (role !== "CLIENT") {
    return c.json({ error: "Only clients can view proposals" }, 403);
  }

  try {
    const proposals = await prisma.proposal.findMany({
      where: {
        job: {
          clientId: userId,
        },
      },
      include: {
        job: {
          select: {
            title: true,
            company: true,
          },
        },
        freelancer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: proposals,
    });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return c.json({ success: false, error: "Failed to fetch proposals" }, 500);
  }
});

app.patch("/accept/:id", async (c) => {
  const id = c.req.param("id");

  const accepted = await prisma.proposal.update({
    where: { id },
    data: { status: "ACCEPTED" },
  });

  await prisma.job.update({
    where: { id: accepted.jobId },
    data: {
      freelancerId: accepted.freelancerId,
      isOpen: false,
    },
  });

  await prisma.proposal.updateMany({
    where: {
      jobId: accepted.jobId,
      id: { not: id },
    },
    data: {
      status: "REJECTED",
    },
  });

  return c.json({ message: "Proposal accepted and job updated", accepted });
});

app.patch("/reject/:id", async (c) => {
  const id = c.req.param("id");

  const updated = await prisma.proposal.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  await prisma.proposal.delete({
    where: { id },
  });

  return c.json(updated);
});

export default app;
