import BpsPatch from '../lib/bps-patch'

export type SeedPatch = [
  number,
  number,
  Uint8Array
]

export const patchRom = (
  vanillaRom: Uint8Array,
  basePatch: BpsPatch,
  seedPatch: SeedPatch
) => {
  let rom = basePatch.Apply(vanillaRom);

  seedPatch.forEach((p: any) => {
    const [off, cnt, pay] = p;

    for (let i = 0; i < cnt; i++) {
      rom?.set(pay, off + i * pay.length);
    }
  });

  return rom;
};
