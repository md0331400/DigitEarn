/* ImageKit image upload (browser-side).
   Signature Vercel-er /api/imagekit function থেকে আসে — private key client-এ আসে না। */

const MAX_SIZE = 3 * 1024 * 1024; // 3MB

export async function uploadImage(file) {
  if (!file) throw new Error('Image select করুন');
  if (!file.type || !file.type.startsWith('image/')) throw new Error('শুধু image (screenshot) upload করবেন');
  if (file.size > MAX_SIZE) throw new Error('Image 3MB-এর বেশি হতে পারবে না — ছোট screenshot দিন');

  // 1) signature নিন (Vercel serverless)
  const sigResp = await fetch('/api/imagekit', { method: 'POST' });
  if (!sigResp.ok) {
    let msg = 'Image upload system configure নেই';
    try { msg = (await sigResp.json()).error || msg; } catch (_) {}
    throw new Error(msg);
  }
  const { token, signature, uploadEndpoint } = await sigResp.json();

  // 2) ImageKit upload API-তে straight upload
  const fd = new FormData();
  const ext = (file.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
  fd.append('file', file, `proof_${Date.now()}.${ext}`);
  fd.append('token', token);
  fd.append('signature', signature);

  const resp = await fetch(uploadEndpoint, { method: 'POST', body: fd });
  if (!resp.ok) throw new Error('Image upload fail হয়েছে — আবার চেষ্টা করুন');
  const data = await resp.json();
  if (!data.url) throw new Error('Image upload fail হয়েছে — আবার চেষ্টা করুন');
  return data.url;
}

export async function uploadImages(files, onProgress) {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    if (onProgress) onProgress(i + 1, files.length);
    urls.push(await uploadImage(files[i]));
  }
  return urls;
}
