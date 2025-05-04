// app/api/file/uploadFileToPinata/route.ts (using Hono)
import { Hono } from 'hono';
import { uploadFileToPinata } from '@/lib/pinata';

const app = new Hono();

app.post('/uploadFileToPinata', async (c) => {
  console.log('Received request to upload file to Pinata');
  
  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    
    console.log('Received file:', file);
    
    if (!file || !(file instanceof File)) {
      return c.json({ 
        success: false, 
        message: 'Invalid or missing file' 
      }, 400);
    }
    
    console.log('Uploading file to Pinata:', file.name, file.size);
    
    const cid = await uploadFileToPinata(file);
    console.log('File uploaded successfully with CID:', cid);
    
    return c.json({ 
      success: true, 
      cid: cid 
    }, 200);
    
  } catch (error: any) {
    console.error('Error uploading to Pinata:', error);
    
    return c.json({ 
      success: false, 
      message: 'Upload failed', 
      error: error.message 
    }, 500);
  }
});

export default app;