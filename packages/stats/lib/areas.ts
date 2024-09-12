import { decodeAreaPortals, getAreaPortals, PortalMapping } from "core";

const getNumLoops = (mappings: PortalMapping[]) => {
  const loops = mappings.filter((p) => p[0].area === p[1].area)
  //loops.forEach(console.log)
  return loops.length
}

const getNumVanilla = (mappings: PortalMapping[]) => {
  let count = 0;
  const vanilla = getAreaPortals();
  for (let i = 0; i < vanilla.length; i += 2) {
    const vanillaFrom = vanilla[i].name;
    const vanillaTo = vanilla[i+1].name;
    mappings.forEach(([from, to]) => {
      if (from.name == vanillaFrom && to.name == vanillaTo) {
        count += 1;
      } else if (to.name == vanillaFrom && from.name == vanillaTo) {
        count += 1;
      }
    })
  };
  return count;
}

export const getHtml_Areas = (encodedSeeds: Uint8Array[]) => {
  let numLoops = 0, numSeedsWithLoops = 0, numVanilla = 0;

  encodedSeeds.forEach((s, i) => {
    const mappings = decodeAreaPortals(s);
    const seedLoops = getNumLoops(mappings);
    if (seedLoops > 0) {
      numSeedsWithLoops += 1;
      numLoops += seedLoops;
    }
    numVanilla += getNumVanilla(mappings);
  });

  return `<p>Num Seeds with Loops: ${numSeedsWithLoops} Total Loops: ${numLoops} Num Vanilla: ${numVanilla}</p>`
}