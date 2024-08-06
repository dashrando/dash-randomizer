import {
  fetchSignature,
  formatMonoSignature,
  prefetchSignature,
} from "./signature";

describe("fetchSignature", () => {

  test("Verify encoded signatures", () => {
    const data = new Uint8Array(0x2f8004).fill(0x0);
    expect(fetchSignature(data)).toBe("GEEMER GEEMER GEEMER GEEMER");
    data.set([1, 2, 3, 4], 0x2f8000)
    expect(fetchSignature(data)).toBe("RIPPER ATOMIC POWAMP SCISER");
    data.set([31, 31, 31, 31], 0x2f8000)
    expect(fetchSignature(data)).toBe("BULL BULL BULL BULL");
    data.set([32, 32, 32, 32], 0x2f8000)
    expect(fetchSignature(data)).toBe("GEEMER GEEMER GEEMER GEEMER");
    data.set([0xAD, 0xC6, 0xC8, 0xFA], 0x2f8000)
    expect(fetchSignature(data)).toBe("VIOLA PUROMI BEETOM ZOA");
    data.set([0xD2, 0x11, 0x24, 0x0C], 0x2f8000)
    expect(fetchSignature(data)).toBe("KAGO CHOOT SCISER HOLTZ");
    data.set([0xD2, 0x80, 0xD4, 0xD5], 0x2f8000)
    expect(fetchSignature(data)).toBe("KAGO GEEMER COVERN EVIR");
  });

});

describe("formatMonoSignature", () => {
  test("Verify first 10 signatures", () => {
    const cmp = (a: string, b: string) => expect(formatMonoSignature(a)).toBe(b)
    cmp("BEETOM BULL YARD GAMET", "BEETOM  BULL    YARD    GAMET   ")
    cmp("NAMIHE NAMIHE TATORI ALCOON", "NAMIHE  NAMIHE  TATORI  ALCOON  ")
    cmp("POWAMP ZEELA SKREE KAGO", "POWAMP  ZEELA   SKREE   KAGO    ");
    cmp("GEEMER BOYON CHOOT GERUTA", "GEEMER  BOYON   CHOOT   GERUTA  ");
    cmp("BULL TATORI RINKA BEETOM", "BULL    TATORI  RINKA   BEETOM  ");
    cmp("GAMET GAMET HOLTZ SKREE", "GAMET   GAMET   HOLTZ   SKREE   ");
    cmp("ZOA ATOMIC OWTCH BULL", "ZOA     ATOMIC  OWTCH   BULL    ");
    cmp("OUM ALCOON ALCOON ZEBBO", "OUM     ALCOON  ALCOON  ZEBBO   ");
    cmp("EVIR VIOLA NAMIHE EVIR", "EVIR    VIOLA   NAMIHE  EVIR    ");
    cmp("KAGO SKREE ATOMIC GEEMER", "KAGO    SKREE   ATOMIC  GEEMER  ");
  });
});

describe("prefetchSignature", () => {
  test("Verify first 10 signatures", () => {
    expect(prefetchSignature(1)).toBe("BEETOM BULL YARD GAMET");
    expect(prefetchSignature(2)).toBe("NAMIHE NAMIHE TATORI ALCOON");
    expect(prefetchSignature(3)).toBe("POWAMP ZEELA SKREE KAGO");
    expect(prefetchSignature(4)).toBe("GEEMER BOYON CHOOT GERUTA");
    expect(prefetchSignature(5)).toBe("BULL TATORI RINKA BEETOM");
    expect(prefetchSignature(6)).toBe("GAMET GAMET HOLTZ SKREE");
    expect(prefetchSignature(7)).toBe("ZOA ATOMIC OWTCH BULL");
    expect(prefetchSignature(8)).toBe("OUM ALCOON ALCOON ZEBBO");
    expect(prefetchSignature(9)).toBe("EVIR VIOLA NAMIHE EVIR");
    expect(prefetchSignature(10)).toBe("KAGO SKREE ATOMIC GEEMER");
  });
});
