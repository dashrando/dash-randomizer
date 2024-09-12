import { decodeItemLocations } from "core";
import { getLocations, Area, Item, ItemNames } from "core/data";

export const getHtml_Majors = (encodedSeeds: Uint8Array[]) => {
  const ITEM_COLUMNS = Object.values(Item)
    .filter((i) => i > 0xc000)
    .map((i) => ItemNames.get(i));
  const locations = getLocations().sort((a, b) => a.address - b.address);

  const itemCounts = locations.map((l) => {
    return {
      name: l.name,
      area: l.area,
      item: new Map(ITEM_COLUMNS.map((i) => [i, 0])),
    };
  });

  encodedSeeds.forEach((s) => {
    decodeItemLocations(s).forEach((v, i) => {
      if (v.item === null) {
        return;
      }
      const itemName = v.item.name;
      const curr = itemCounts[i].item.get(itemName);
      if (curr === undefined) {
        return;
      }
      itemCounts[i].item.set(itemName, curr + 1);
    });
  });

  const areaNames = Object.keys(Area);
  let text = `
    <table class="majors">
      <tr>
        <th class="thin_border location">Location</th>
        <th class="thin_border area">Area</th>`;
  ITEM_COLUMNS.forEach((name) => {
    text += `<th class="thin_border">${name}</th>`;
  });
  text += "</tr>";

  itemCounts.forEach((i) => {
    let hasItems = " zero";
    let hasMajors = " zero";
    const mapped = ITEM_COLUMNS.map((itemName) => {
      const count = i.item.get(itemName);
      if (count > 0) {
        const isMajor =
          itemName != "Missile" &&
          itemName != "Super Missile" &&
          itemName != "Power Bomb";
        if (isMajor) {
          hasMajors = "";
        }
        hasItems = "";
      }
      return count;
    });

    text += `<tr class="${hasItems} ${hasMajors}">
    <td class="thin_border">${i.name}</td>
    <td class="thin_border">${areaNames[i.area]}</td>
    `;
    mapped.forEach((j) => {
      const percent = (100 * j) / encodedSeeds.length;
      const cellColor = j == 0 ? " gray_cell" : percent > 5 ? " tan_cell" : "";
      text += `<td class="center thin_border ${cellColor}">${percent.toFixed(
        1
      )}%</td>`;
    });
    text += "</tr>";
  });

  text += "</table>";
  return text;
};
