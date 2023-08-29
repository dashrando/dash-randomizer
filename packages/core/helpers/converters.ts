export function ToHexString(data: ArrayBuffer) {
  const value = new Uint8Array(data);
  return Array.from(value, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}
