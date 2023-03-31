import { getSignature, isHeadered, isVerified } from "./verify";

async function parseContents(value) {
  const signature = await getSignature(value);
  if (isVerified(signature)) {
    const event = new CustomEvent("vanillaRom:input", {
      detail: {
        data: new Uint8Array(value),
      }
    })
    document.dispatchEvent(event)
    return;
  }

  if (isHeadered(signature)) {
    console.warn("You have entered a headered ROM. The header will now be removed.");
    const unheaderedContent = value.slice(512);
    return parseContents(unheaderedContent);
  }

  throw Error("Vanilla Rom does not match checksum.");
}

export default function inputVanillaRom(el) {
  if (!el) {
    return;
 }
 let vanillaRom = el.files[0];
 let reader = new FileReader();
 reader.readAsArrayBuffer(vanillaRom);

 reader.onload = async function () {
    try {
      await parseContents(reader.result);
    } catch (e) {
      console.error(e.message);
      alert(e.message);
      el.value = "";
    }
 };

 reader.onerror = function () {
    alert("Failed to load file.");
 };
}