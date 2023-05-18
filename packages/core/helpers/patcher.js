export const patchRom = (vanillaRom, basePatch, seedPatch) => {
  let rom = basePatch.Apply(vanillaRom);

  seedPatch.forEach((p) => {
    const [off, cnt, pay] = p;

    for (let i = 0; i < cnt; i++) {
      rom.set(pay, off + i * pay.length);
    }
  });

  return rom;
};
