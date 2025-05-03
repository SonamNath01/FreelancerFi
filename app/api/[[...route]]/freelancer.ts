import { prisma } from '@/lib/db';
import { Hono } from 'hono';
const app = new Hono();

app.post('/submit-proposal/:id', async (c) => {
  try {
    const jobId = c.req.param('id');
    
    const { message, bidAmount, deliveryTime, freelancerId } = await c.req.json();
    console.log('Received proposal data:', { message, bidAmount, deliveryTime, freelancerId });
    
    if (!message || !bidAmount || !deliveryTime || !freelancerId) {
      return c.json({ error: 'All fields are required' }, 400);
    }
    
    const proposal = await prisma.proposal.create({
      data: {
        message,
        bidAmount: parseFloat(bidAmount),
        deliveryTime,
        jobId,
        freelancerId,
        status: 'PENDING', 
        createdAt: new Date(),
      },
    });
    
    console.log('Proposal submitted and saved to database:', proposal);
    
    return c.json({
      success: true,
      message: 'Proposal submitted successfully!',
      proposalId: proposal.id
    }, 201);
  } catch (error) {
    console.error('Error submitting proposal:', error);
    return c.json({
      success: false,
      error: 'Failed to submit proposal. Please try again.'
    }, 500);
  }
});

// Get all proposals for a specific job
app.get('/proposals/:jobId', async (c) => {
  try {
    const jobId = c.req.param('jobId');
    
    const proposals = await prisma.proposal.findMany({
      where: {
        jobId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return c.json({
      success: true,
      data: proposals,
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return c.json({
      success: false,
      error: 'Failed to fetch proposals',
    }, 500);
  }
});

// Update proposal status (for clients to accept/reject)
app.patch('/proposals/:proposalId/status', async (c) => {
  try {
    const proposalId = c.req.param('proposalId');
    const { status } = await c.req.json();
    
    if (!['ACCEPTED', 'REJECTED', 'PENDING'].includes(status)) {
      return c.json({
        success: false,
        error: 'Invalid status value',
      }, 400);
    }
    
    const updatedProposal = await prisma.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
    
    return c.json({
      success: true,
      data: updatedProposal,
    });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    return c.json({
      success: false,
      error: 'Failed to update proposal status',
    }, 500);
  }
});

export default app;