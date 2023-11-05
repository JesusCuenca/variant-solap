export default class Variant {
    id: string;
    chromosomeId: string;
    start: number;
    end: number;
    length: number;
    type: string;
    geneName: string;
    location: string;
    sampleId: string;

    constructor(
        sampleId: string,
        id: string,
        chromosomeId: string,
        start: number,
        end: number,
        length: number,
        type: string,
        geneName: string,
        location: string,
    ) {
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

    intersectsWith(variant: Variant) {
        return this.chromosomeId === variant.chromosomeId
            && this.end >= variant.end
            && this.start <= variant.start;
    }
}