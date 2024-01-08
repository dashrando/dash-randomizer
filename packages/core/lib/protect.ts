import DotNetRandom from "./dotnet-random";
import { getLocations } from "./locations";
import RandomizeRom, { Config } from "./randomize";
import { Options, Settings } from "./graph/params";

async function ProtectRom(
  seed: number = 0,
  settings: Settings,
  opts: Options = {
    DisableFanfare: false,
  },
  config: Config
) {
  const res = await RandomizeRom(seed, settings, opts, config);
  const block = res.data;

  if (block == null) {
    return res;
  }

  const rnd = new DotNetRandom(seed);
  const getRandomNumber = (maxValue: number) => rnd.Next(maxValue);
  const getRandomByte = () => rnd.Next(256);

  // Fisher-Yates shuffle algorithm
  const shuffle = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomNumber(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  for (let i = 0; i < 800; i++) {
    block[0x07fce0 + i] = getRandomByte();
  }

  const addresses = getLocations().map((l) => l.address);
  shuffle(addresses);

  const maxSep = 5;
  const separationArray: number[] = [];
  let totalBytes = 0;
  let totalSteps = 0;
  while (totalSteps < 100) {
    const draw = getRandomNumber(maxSep);

    if (totalBytes + draw > 200) {
      continue;
    }
    separationArray.push(draw);
    totalBytes += draw;
    totalSteps += 1;
  }
  shuffle(separationArray);

  let verifiedBytes = 0;
  let verifiedItems = 0;
  let position = 0x07fce0;
  //console.log(position.toString(16))
  separationArray.forEach((s,i) => {
    const address = addresses[i];
    for (let j = 0; j < 6; j++) {
        block[position] = block[address+j];
        position += 1;
    }
    block[address+0] = 0x01;
    block[address+1] = 0x00;
    block[address+2] = 0x01;
    block[address+3] = 0x00;
    block[address+4] = 0xFF & (position-6);
    block[address+5] = 0xFF & ((position-6) >> 8);
    position += s;
    verifiedBytes += s;
    verifiedItems += 1;
  })
  //console.log('bytes:',verifiedBytes)
  //console.log('items:',verifiedBytes)
  //console.log('final:',position.toString(16))

  return res;
}

export default ProtectRom;
