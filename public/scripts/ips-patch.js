class IpsPatch {
    constructor(buffer) {
        this.hunks = [];
        this.Process(buffer);
    }

    Apply(bytes) {
        if (this.hunks.length <= 0) {
            return null;
        }

        var minSize = bytes.length;
        this.hunks.forEach (function (val, idx) {
            if (val.GetMinSize() > minSize) {
                minSize = val.GetMinSize();
            }
        });

        var newBytes = new Uint8Array(minSize);
        newBytes.set(bytes);
        
        this.hunks.forEach (function (val, idex) {
            val.Apply(newBytes);
        })

        return newBytes;
    }

    Process(buffer) {
        var bytes = new Uint8Array(buffer);
        var dec = new TextDecoder("utf-8");

        var start = bytes.slice(0, 5);
        if (dec.decode(start) != "PATCH") {
            return false;
        }

        var end = bytes.slice(-3);
        if (dec.decode(end) != "EOF") {
            return false;
        }

        var PatchIndex = 5;
        var hunk = null;

        while (null != (hunk = IpsHunk.Process(bytes, PatchIndex))) {
            this.hunks.push(hunk[0]);
            PatchIndex = hunk[1];
        }

        return true;
    }

    static async Load(FileName) {
        let response = await fetch(FileName);

        //TODO: check error
        let buffer = await response.arrayBuffer();
        return new IpsPatch(buffer);
    }
}

class IpsHunk {
    constructor(RLE, Offset, Length, Payload, PayloadIndex) {
        this.rle = RLE;
        this.offset = Offset;
        this.length = Length;
        this.payload = Payload;
        this.payloadIndex = PayloadIndex;
    }

    Apply(bytes) {
        if (this.rle) {
            var theByte = this.payload[this.payloadIndex];
            for (var i = 0; i < this.length; i++) {
                bytes[this.offset + i] = theByte;
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                bytes[this.offset + i] = this.payload[this.payloadIndex + i];
            }
        }
    }

    GetMinSize() {
        return this.offset + this.length;
    }

    static Process(bytes,index) {

        if (index > bytes.length - 8) {
            return null;
        }

        var offset = (bytes[index] << 16) | (bytes[index + 1] << 8) | (bytes[index + 2]);
        var length = (bytes[index + 3] << 8) + (bytes[index + 4]);
        index += 5;

        var hunk = null;

        if (length == 0) {

            if (index > bytes.length - 6) {
                return null;
            }

            length = (bytes[index] << 8) + (bytes[index + 1]);
            hunk = new IpsHunk(true, offset, length, bytes, index + 2);
            index += 3;
        } else {
            hunk = new IpsHunk(false, offset, length, bytes, index);
            index += length;
        }

        return [ hunk, index ];
    }
}