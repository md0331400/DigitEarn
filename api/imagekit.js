// Vercel Serverless Function — ImageKit upload signature
// IMAGEKIT_PRIVATE_KEY browser-এ কখনো যায় না — signature শুধু এই function থেকে যায়।
// Vercel Environment Variables: IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT
import crypto from 'node:crypto';

const SIGN_EXPIRY = 10 * 60; // 10 minute

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }
  const pk = process.env.IMAGEKIT_PRIVATE_KEY;
  const pub = process.env.IMAGEKIT_PUBLIC_KEY;
  const endpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (!pk || !pub || !endpoint) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'ImageKit variables Vercel-এ set করা নেই (IMAGEKIT_PUBLIC_KEY / IMAGEKIT_PRIVATE_KEY / IMAGEKIT_URL_ENDPOINT)' }));
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const expiry = timestamp + SIGN_EXPIRY;
  const token = `${pub}:${timestamp}:${expiry}`;
  const signature = crypto.createHmac('sha256', pk).update(token).digest('hex');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    publicKey: pub,
    token,
    signature,
    expiry,
    uploadEndpoint: 'https://upload.imagekit.io/api/v1/files/upload',
    urlEndpoint: endpoint,
  }));
}
