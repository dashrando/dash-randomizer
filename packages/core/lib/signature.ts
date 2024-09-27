import DotNetRandom from "./dotnet-random";
import { TABLE_FLAGS } from "../data/interface";

const U16toBytes = (u16: number) => {
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

const byteToWord = (byte: number): string => {
  // use bit mask of 0x1f to get the index in the signatures array
  // then trim the string to remove the extra spaces
  return SIGNATURE_VALUES[byte & 0x1f].trim();
}

const bytesToSignature = (bytes: number[]): string => {
  return bytes.map(byteToWord).join(' ');
}

export function fetchSignature(data: Uint8Array) {
  // the signature is stored in 4 bytes at 0x2f8000 - 0x2f8003
  return bytesToSignature([
    data[TABLE_FLAGS.FileSelectCode],
    data[TABLE_FLAGS.FileSelectCode + 1],
    data[TABLE_FLAGS.FileSelectCode + 2],
    data[TABLE_FLAGS.FileSelectCode + 3],
  ]);
}

export const formatMonoSignature = (signature: string) =>
  signature.split(' ').map(s => s.padEnd(8, ' ')).join('')

export const prefetchSignature = (seed: number) => {
  const rnd = new DotNetRandom(seed);
  const bytes = [ [...U16toBytes(rnd.Next(0xffff))],
                  [...U16toBytes(rnd.Next(0xffff))] ].flat();
  return bytesToSignature(bytes);
}

export default fetchSignature;
