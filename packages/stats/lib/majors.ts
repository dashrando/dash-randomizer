import { getAreaPortals } from "core";
import { getLocations, Area, Item, ItemNames } from "core/data";

export const getHtml_Majors = (encodedSeeds: Uint8Array[]) => {
  const locations = getLocations().sort((a, b) => a.address - b.address);
  const itemTypes = Object.values(Item).filter((i) => i > 0xc000);
  const itemCounts = locations.map((l) => {
    return {
      name: l.name,
      area: l.area,
      item: new Map<string, number>(itemTypes.map((i) => {
        return [
          ItemNames.get(i),
          0
        ]
      }))
    };
  });

  const offset = 1 + 7 + getAreaPortals().length + 4;
  encodedSeeds.forEach((s) => {
    for (let i = 0; i < locations.length; i++) {
      const itemByte = s[offset + i];
      if (itemByte === 0) {
        continue;
      }
      const itemType = itemTypes[(0x7F & itemByte) - 1] as number;
      const itemName = ItemNames.get(itemType);
      const curr = itemCounts[i].item.get(itemName);
      itemCounts[i].item.set(itemName, curr + 1);
    }
  });

  const areaNames = Object.keys(Area);
  let text = `
    <table class="majors">
      <tr>
        <th class="thin_border location">Location</th>
        <th class="thin_border area">Area</th>`;
  itemTypes.forEach((i) => {
    const name = ItemNames.get(i);
    text += `<th class="thin_border">${name}</th>`
  })
  text += '</tr>'

  itemCounts.forEach((i) => {
    let hasItems = ' zero';
    let hasMajors = ' zero';
    const mapped = itemTypes.map((j) => {
      const itemName = ItemNames.get(j)
      const count = i.item.get(itemName)
      if (count > 0) {
        if (j != Item.Missile && j != Item.Super && j != Item.PowerBomb) {
          hasMajors = '';
        }
        hasItems = '';
      }
      return count
    })

    text += `<tr class="${hasItems} ${hasMajors}">
    <td class="thin_border">${i.name}</td>
    <td class="thin_border">${areaNames[i.area]}</td>
    `
    mapped.forEach((j) => {
      const percent = (100 * j / encodedSeeds.length)
      const cellColor = j == 0 ? " gray_cell" : percent > 5 ? " tan_cell" : "";
      text += `<td class="center thin_border ${cellColor}">${percent.toFixed(
        1
      )}%</td>`;
    });
    text += '</tr>'
  })

  text += '</table>';
  return text
}