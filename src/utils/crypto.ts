/**
 * HMAC-SHA256 request signing for the landing page registration endpoint.
 * Must mirror backend LandingPageSignatureMiddleware:
 * stringToSign = timestamp + "." + rawJsonBody, hex-encoded lowercase (64 chars).
 */
export async function generateHmacSignature(
  timestamp: string,
  rawBody: string,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${timestamp}.${rawBody}`)
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
