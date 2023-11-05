"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Variant {
    constructor(sampleId, id, chromosomeId, start, end, length, type, geneName, location) {
        this.id = id;
        this.chromosomeId = chromosomeId;
        this.start = start;
        this.end = end;
        this.length = length;
        this.type = type;
        this.geneName = geneName;
        this.location = location;
        this.sampleId = sampleId;
    }
    intersectsWith(variant) {
        return this.chromosomeId === variant.chromosomeId
            && this.end >= variant.end
            && this.start <= variant.start;
    }
}
exports.default = Variant;
