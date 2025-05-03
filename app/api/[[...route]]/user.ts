import { Hono } from 'hono';
import {prisma}from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = new Hono();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.post('/sign-up', async (c) => {
    console.log('Sign-up route hit');
  try {
    console.log('Received request to sign up a user.');
    const { fullName, role, email, password } = await c.req.json();
    console.log(fullName, role, email, password);
    

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: fullName,
        role : role.toUpperCase(),
        email,
        passwordHash: hashedPassword,
      },
    });

    const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      return c.json({
        message: 'User created successfully',
        token,
        user: { id: user.id, fullName: user.name, role: user.role, email: user.email },
      }, 201);
  } catch (err) {
    console.error(err);
    return c.json({ message: 'Error occurred while signing up.' }, 500);
  }
});

app.post('/sign-in', async (c) => {
    console.log('Sign-in route hit');
    try {
      const { email, password } = await c.req.json();
      console.log('Sign-in request:', email);
  
      if (!email || !password) {
        return c.json({ message: 'Email and password are required.' }, 400);
      }
  
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return c.json({ message: 'Invalid email or password.' }, 401);
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  
      if (!isPasswordValid) {
        return c.json({ message: 'Invalid email or password.' }, 401);
      }
  
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      return c.json({
        message: 'Login successful',
        token,
        user: { id: user.id, fullName: user.name, role: user.role, email: user.email },
      }, 200);
    } catch (err) {
      console.error('Error during sign-in:', err);
      return c.json({ message: 'Error occurred while signing in.' }, 500);
    }
  });

export default app;
