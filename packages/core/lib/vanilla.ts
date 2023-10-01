import { Vanilla } from "../data";
import { ToHexString } from "../helpers/converters";

// Small helper function to use the WebCrypto API universally
const getCrypto = () => {
  try {
    return window.crypto;
  } catch (_e) {
    try {
      return globalThis.crypto;
    } catch (_e) {
      throw Error("Could not crypto module");
    }
  }
};

export async function getSignature(data: Uint8Array) {
  const value = await getCrypto().subtle.digest("SHA-256", data);
  return ToHexString(value);
}

export const isHeadered = (signature: string) => signature === Vanilla.headered;
export const isVerified = (signature: string) => signature === Vanilla.unheadered;

export default async function verifyVanillaRom(data: Uint8Array) {
  const signature = await getSignature(data);
  return isVerified(signature);
}
