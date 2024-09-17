import { decodeAreaPortals, getAreaPortals, PortalMapping } from "core";

const duoPortals = getAreaPortals()
  .filter(
    (p) =>
      p.area == "LowerNorfair" ||
      p.area == "EastMaridia" ||
      p.area == "WreckedShip"
  )
  .map((p) => p.name);

const deadPortals = getAreaPortals()
  .filter(
    (p) =>
      p.area == "KraidsLair" ||
      p.area == "CrocomiresLair" ||
      p.area == "Tourian"
  )
  .map((p) => p.name);

const getNumLoops = (mappings: PortalMapping[]) => {
  const loops = mappings.filter((p) => p[0].area === p[1].area)
  //loops.forEach(console.log)
  return loops.length
}

const getNumDuoToDuo = (mappings: PortalMapping[]) => {
  return mappings.filter(([p, q]) => {
    if (duoPortals.includes(p.name) && duoPortals.includes(q.name)) {
      return true;
    }
  }).length
}

const getNumDuoToDead = (mappings: PortalMapping[]) => {
  let num = 0;
  mappings.forEach(([p, q]) => {
    if (duoPortals.includes(p.name)) {
      if (deadPortals.includes(q.name)) {
        num += 1;
      }
    } else if (duoPortals.includes(q.name)) {
      if (deadPortals.includes(p.name)) {
        num += 1;
      }
    }
  })
  return num
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
  const numSeeds = encodedSeeds.length;
  let numLoops = 0, numSeedsWithLoops = 0, numVanilla = 0;
  let numSingleDuoToDuo = 0, numDoubleDuoToDuo = 0;
  let numDuoToDead: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  encodedSeeds.forEach((s, i) => {
    const mappings = decodeAreaPortals(s);
    numVanilla += getNumVanilla(mappings);

    const seedLoops = getNumLoops(mappings);
    if (seedLoops > 0) {
      numSeedsWithLoops += 1;
      numLoops += seedLoops;
    }

    const seedDuoToDead = getNumDuoToDead(mappings);
    const seedDuoToDuo = getNumDuoToDuo(mappings);

    numDuoToDead[seedDuoToDuo][seedDuoToDead] += 1;

    if (seedDuoToDuo === 1) {
      numSingleDuoToDuo += 1;
    } else if (seedDuoToDuo === 2) {
      numDoubleDuoToDuo += 1;
    }
  });

  const p1 = (num: number) => (100*num/numSeeds).toFixed(1) + '%';
  const deadSum = (nums: number[]) => nums.reduce((a, b) => a + b, 0)

  return `
  <div style="display: flex; column-gap: 20px; padding-bottom: 20px">
  <div>
  <table>
    <tr>
      <td>Same Area Loop</td>
      <td>${p1(numSeedsWithLoops)}</td>
    </tr>
    <tr>
      <td style="padding-right: 10px">Vanilla Connection</td>
      <td>${p1(numVanilla)}</td>
    </tr>
    <tr>
      <td>1 Duo-to-Duo</td>
      <td>${p1(numSingleDuoToDuo)}</td>
    </tr>
    <tr>
      <td>2 Duo-to-Duo</td>
      <td>${p1(numDoubleDuoToDuo)}</td>
    </tr>
  </table>
  </div>
  <div>
    <table class="dead">
      <tr>
        <th style="border-style: none"></th>
        <th>0 Duo-to-Dead</th>
        <th>1 Duo-to-Dead</th>
        <th>2 Duo-to-Dead</th>
        <th>3 Duo-to-Dead</th>
        <th>Total</th>
      </tr>
      <tr>
        <th>0 Duo-to-Duo</th>
        <td>${p1(numDuoToDead[0][0])}</td>
        <td>${p1(numDuoToDead[0][1])}</td>
        <td>${p1(numDuoToDead[0][2])}</td>
        <td>${p1(numDuoToDead[0][3])}</td>
        <td><b>${p1(deadSum(numDuoToDead[0]))}</b></td>
      </tr>
      <tr>
        <th>1 Duo-to-Duo</th>
        <td>${p1(numDuoToDead[1][0])}</td>
        <td>${p1(numDuoToDead[1][1])}</td>
        <td>${p1(numDuoToDead[1][2])}</td>
        <td class="gray_cell"></td>
        <td><b>${p1(deadSum(numDuoToDead[1]))}</b></td>
      </tr>
      <tr>
        <th>2 Duo-to-Duo</th>
        <td>${p1(numDuoToDead[2][0])}</td>
        <td>${p1(numDuoToDead[2][1])}</td>
        <td class="gray_cell"></td>
        <td class="gray_cell"></td>
        <td><b>${p1(deadSum(numDuoToDead[2]))}</b></td>
      </tr>
      <tr style="font-weight: bold">
        <th>Total</th>
        <td>${p1(numDuoToDead[0][0]+numDuoToDead[1][0]+numDuoToDead[2][0])}</td>
        <td>${p1(numDuoToDead[0][1]+numDuoToDead[1][1]+numDuoToDead[2][1])}</td>
        <td>${p1(numDuoToDead[0][2]+numDuoToDead[1][2]+numDuoToDead[2][2])}</td>
        <td>${p1(numDuoToDead[0][3]+numDuoToDead[1][3]+numDuoToDead[2][3])}</td>
        <td style="border-style: none"></td>
      </tr>
    </table>
  </div>
  </div>
  `
}