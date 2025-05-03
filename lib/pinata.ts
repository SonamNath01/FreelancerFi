import  PinataClient  from '@pinata/sdk'; 

export const pinata = new PinataClient({
  pinataJWTKey: process.env.PINATA_JWT!,
});

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

export async function fetchFromPinata(cid: string): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`; 
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch file from Pinata');
  
  return res.json();
}