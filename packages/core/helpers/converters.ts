export function ToHexString(data: ArrayBuffer) {
  const value = new Uint8Array(data);
  return Array.from(value, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

export function base64ToSafe(b64: string, trim: boolean = false) {
  const safe = b64
    .replaceAll("/", "_")
    .replaceAll("+", "-")

  if (!trim) {
    return safe;
  }

  return safe.replace(/=*$/, '');
}

export function safeToBase64(safe: string) {
  return safe.replaceAll("_", "/").replaceAll("-", "+")
}