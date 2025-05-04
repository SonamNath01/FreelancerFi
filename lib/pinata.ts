import PinataClient from '@pinata/sdk';

const pinata = new PinataClient({
  pinataJWTKey: process.env.PINATA_JWT!, // Used server-side (ensure this is not exposed to the client)
});

// Server-side: Upload JSON data to Pinata
export async function uploadToPinata(content: object, fileName: string): Promise<string> {
  const jsonContent = JSON.stringify(content);

  try {
    const result = await pinata.pinJSONToIPFS(content, {
      pinataMetadata: {
        name: fileName,
      },
    });

    return result.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw new Error("Failed to upload file to Pinata");
  }
}

// Client-side: Upload file to Pinata
export async function uploadFileToPinata(file: File): Promise<string> {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const form = new FormData();
  form.append('file', file, file.name);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        // Ensure the JWT is exposed to the client through NEXT_PUBLIC_
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Pinata file upload failed: ${res.status} ${text}`);
    }

    const { IpfsHash } = await res.json();
    return IpfsHash;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw error;
  }
}

// Fetch file from Pinata
export async function fetchFromPinata(cid: string): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch file from Pinata');

  return res.json();
}
