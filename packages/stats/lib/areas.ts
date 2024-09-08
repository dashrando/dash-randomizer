import { getAreaPortals, PortalMapping } from "core";

const getNumLoops = (mappings: PortalMapping[]) => {
  return mappings.filter((p) => p[0].area === p[1].area).length
}

export const getHtml_Areas = (encodedSeeds: Uint8Array[]) => {
  const areaPortals = getAreaPortals();
  const areaRefIndex = 1 + 7;

  let numLoops = 0;

  encodedSeeds.forEach((s) => {
    const mappings: PortalMapping[] = []
    for (let i = 0; i < areaPortals.length; i++) {
      const from = areaPortals.at(i);
      const to = areaPortals.at(s[i + areaRefIndex]);

      // We only need to map portals once so ignore the reverse mapping
      if (0 <= mappings.findIndex((m) => m[0] == to && m[1] == from)) {
        continue;
      }
      mappings.push([from, to]);
    }
    numLoops += getNumLoops(mappings);
  });

  return `<p>Num Loops: ${numLoops}</p>`
}