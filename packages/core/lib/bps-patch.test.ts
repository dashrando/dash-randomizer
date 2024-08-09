import BpsPatch from "./bps-patch";

describe("CRC32", () => {
  test("Verify checksums", () => {
    const data = new Uint8Array(4);
    data.set([1, 2, 3, 4]);
    expect(BpsPatch.CRC32(data)).toBe(0xb63cfbcd);

    const encoder = new TextEncoder()
    const lxp32_sample = encoder.encode('123456789')
    expect(BpsPatch.CRC32(lxp32_sample)).toBe(0xCBF43926);

    const sample2 = encoder.encode('Hi\n')
    expect(BpsPatch.CRC32(sample2)).toBe(0xD5223C9A);
  });
});
