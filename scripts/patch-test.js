async function LoadFile(path) {
  let response = await fetch(path);
  let buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function Download() {
  var freshBytes = await LoadFile("patches/b.txt");
  var freshBlob = new Blob([freshBytes]);
  saveAs(freshBlob, "b_dl.txt");
}

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

async function Checksum() {
  let response = await fetch('patches/a.txt');
  let buffer = await response.arrayBuffer();
  let check = await window.crypto.subtle.digest('SHA-1', buffer);
  console.log(toHexString(new Uint8Array(check)));
}

async function SuperMetroidChecksum() {
  let theFile = document.getElementById("checksum-file").files[0];
  let reader = new FileReader();
  reader.readAsArrayBuffer(theFile);

  reader.onload = async function () {
    let check = await window.crypto.subtle.digest('SHA-256', reader.result);
    console.log(toHexString(new Uint8Array(check)));
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

async function Upload() {
  let theFile = document.getElementById("upload-file").files[0]
  let reader = new FileReader();
  reader.readAsText(theFile);

  reader.onload = function () {
    console.log(reader.result);
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

async function PatchBuffer(theArray) {
  var thePatch = await IpsPatch.Load("patches/a_to_b.ips");
  var bytes = new Uint8Array(theArray);
  return thePatch.Apply(bytes);
}

function DownloadBuffer(bytes,name) {
  saveAs(new Blob([bytes]), name);
}

async function RoundTrip() {
  let theFile = document.getElementById("trip-file").files[0]
  let reader = new FileReader();
  reader.readAsArrayBuffer(theFile);

  reader.onload = async function () {
    let patchedBuffer = await PatchBuffer(reader.result);
    DownloadBuffer(patchedBuffer,"patched.txt");
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

async function TestLocal(p,c,a) {
  TestPatch("patches/" + p, "patches/" + c, "patches/" + a);
}

async function TestPatch(patch, clean, actual) {
  var thePatch = await IpsPatch.Load(patch);
  var freshBytes = await LoadFile(clean);
  var finalBytes = await LoadFile(actual);

  var patchedBytes = thePatch.Apply(freshBytes);
  var resultMsg = "different size";

  if (patchedBytes.length == finalBytes.length) {
    
    var equal = true;
    for (var i = patchedBytes.length - 1; i >= 0; i--) {
      if (patchedBytes[i] != finalBytes[i]) {
        equal = false;
        break;
      }
    }

    if (equal) {
      resultMsg = "match";
    } else {
      resultMsg = "same size, different content";
    }
  }

  console.log(clean + " -> " + actual + " = " + resultMsg);
}

function a_to_b() { TestLocal("a_to_b.ips", "a.txt", "b.txt"); }
function a_to_c() { TestLocal("a_to_c.ips", "a.txt", "c.txt"); }