class BpsPatch {
    constructor(buffer) {
        this.patchBuffer = buffer;
    }

    Apply(bytes) {
        if (!BpsPatch.IsBpsPatch(this.patchBuffer)) {
            return null;
        }

        this.patchOffset = 4;

        var sourceSize = this.Decode();
        var targetSize = this.Decode();
        var metaDataSize = this.Decode();

        var source = bytes;
        var target = new Uint8Array(targetSize);

        // Skip the meta data
        if (metaDataSize > 0) {
            this.patchOffset += metaDataSize;
        }

        var outputOffset = 0;
        var sourceRelativeOffset = 0;
        var targetRelativeOffset = 0;
        let eof = this.patchBuffer.length - 12;

        if (!this.VerifyChecksum(source,eof)) {
            throw "Source Checksum Mismatch";
        }

        var patch = this.patchBuffer.slice(0,eof + 8);
        if (!this.VerifyChecksum(patch,eof + 8)) {
            throw "Patch Checksum Mismatch";
        }

        while (this.patchOffset < eof) {
            var data = this.Decode ();
            var command = data & 3;
            var length = (data >> 2) + 1;

            switch (command) {
                case 0:
                    while (length--) {
                        target[outputOffset] = source[outputOffset];
                        outputOffset++;
                    }
                    break;
                case 1:
                    while (length--) {
                        target[outputOffset++] = this.Read();
                    }
                    break;
                case 2:
                    var data = this.Decode();
                    sourceRelativeOffset += (data & 1 ? -1 : +1) * (data >> 1);
                    while (length--) {
                        target[outputOffset++] = source[sourceRelativeOffset++];
                    }
                    break;
                case 3:
                    var data = this.Decode();
                    targetRelativeOffset += (data & 1 ? -1 : +1) * (data >> 1);
                    while (length--) {
                        target[outputOffset++] = target[targetRelativeOffset++];
                    }
                    break;
            }
        }

        if (!this.VerifyChecksum(target,eof + 4)) {
            throw "Target Checksum Mismatch";
        }

        return target;
    }

    static CRC32(buffer) {
        if (typeof BpsPatch.crcTable == 'undefined') {
            var c;
            BpsPatch.crcTable = [];
            for(var n =0; n < 256; n++) {
                c = n;
                for(var k =0; k < 8; k++) {
                    c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
                }
                BpsPatch.crcTable[n] = c;
            }
        }

        var crc = 0 ^ (-1);

        for (var i = 0; i < buffer.length; i++) {
            crc = (crc >>> 8) ^ BpsPatch.crcTable[(crc ^ buffer[i]) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;
    }

    Decode() {
        var data = 0, shift = 1;
        while (true) {
            var x = this.Read();
            data += (x & 0x7f) * shift;
            if ((x & 0x80) != 0) break;
            shift <<= 7;
            data += shift;
        }
        return data;
    }

    static IsBpsPatch(bytes) {
        var dec = new TextDecoder("utf-8");
        return dec.decode(bytes.slice(0,4)) == "BPS1";
    }

    static async Load(FileName) {
        let response = await fetch(FileName);

        //TODO: check error
        let buffer = await response.arrayBuffer();
        let bytes = new Uint8Array(buffer);

        if (!BpsPatch.IsBpsPatch(bytes)) {
            return null;
        }

        return new BpsPatch(bytes);
    }

    Read() {
        return this.patchBuffer[this.patchOffset++];
    }

    VerifyChecksum(bytes,index) {
        var crc = BpsPatch.CRC32(bytes);
        return ((crc & 0xff) == this.patchBuffer[index]) &
            (((crc >> 8) & 0xff) == this.patchBuffer[index + 1]) &
            (((crc >> 16) & 0xff) == this.patchBuffer[index + 2]) &
            (((crc >> 24) & 0xff) == this.patchBuffer[index + 3]);
    }
}

export default BpsPatch
