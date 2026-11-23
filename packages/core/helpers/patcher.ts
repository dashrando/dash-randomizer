import BpsPatch from '../lib/bps-patch'
import IpsPatch from '../lib/ips-patch'

export type SeedPatch = [
  number,
  number,
  Uint8Array
]

export const patchRom = (
  vanillaRom: Uint8Array,
  basePatch: BpsPatch,
  fastPatch: IpsPatch|null,
  seedPatch: SeedPatch[]
) => {
  let rom = basePatch.Apply(vanillaRom);

  if (fastPatch) {
    rom = fastPatch.Apply(rom);
  }

  seedPatch.forEach((p) => {
    const [off, cnt, pay] = p;

    for (let i = 0; i < cnt; i++) {
      rom?.set(pay, off + i * pay.length);
    }
  });

  return rom;
};
