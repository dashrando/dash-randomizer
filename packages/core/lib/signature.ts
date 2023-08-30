// @ts-nocheck
import DotNetRandom from "./dotnet-random";

const encodeRepeating = (patch, offset, length, bytes) => {
  patch.push([offset, length, bytes]);
};

const encodeBytes = (patch, offset, bytes) => {
  encodeRepeating(patch, offset, 1, bytes);
};

const U16toBytes = (u16) => {
  return new Uint8Array(new Uint16Array([u16]).buffer);
};

// These signatures are taken from:
// https://github.com/dashrando/dash-template-asm/blob/main/src/fileselect/gameoptions.asm#L63-L94
const SIGNATURE_VALUES = [
  "GEEMER  ",
  "RIPPER  ",
  "ATOMIC  ",
  "POWAMP  ",
  "SCISER  ",
  "NAMIHE  ",
  "PUROMI  ",
  "ALCOON  ",
  "BEETOM  ",
  "OWTCH   ",
  "ZEBBO   ",
  "ZEELA   ",
  "HOLTZ   ",
  "VIOLA   ",
  "WAVER   ",
  "RINKA   ",
  "BOYON   ",
  "CHOOT   ",
  "KAGO    ",
  "SKREE   ",
  "COVERN  ",
  "EVIR    ",
  "TATORI  ",
  "OUM     ",
  "PUYO    ",
  "YARD    ",
  "ZOA     ",
  "FUNE    ",
  "GAMET   ",
  "GERUTA  ",
  "SOVA    ",
  "BULL    ",
];

export function fetchSignature(data: Uint8Array) {
  // the signature is stored in 4 bytes at 0x2f8000 - 0x2f8003
  // use bit mask of 0x1f to get the index in the signatures array
  // then trim the string to remove the extra spaces
  const mask = 0x1f;
  const addresses = [0x2f8000, 0x2f8001, 0x2f8002, 0x2f8003]
    .map((addr) => data[addr] & mask)
    .map((index) => SIGNATURE_VALUES[index].trim());
  return addresses.join(" ");
}

export const formatMonoSignature = (signature: string) =>
  signature.split(' ').map(s => s.padEnd(8, ' ')).join('')

export const prefetchSignature = (seed) => {
  const seedPatch = [];
  const rnd = new DotNetRandom(seed);
  encodeBytes(seedPatch, 0x2f8000, U16toBytes(rnd.Next(0xffff)));
  encodeBytes(seedPatch, 0x2f8002, U16toBytes(rnd.Next(0xffff)));
  const signature = seedPatch
    .map((patch) => (
      [patch[2][0] & 0x1f, patch[2][1] & 0x1f]
    ))
    .flat()
    .map((index) => SIGNATURE_VALUES[index].trim())
    .join(' ')
  return signature
}

export default fetchSignature;
