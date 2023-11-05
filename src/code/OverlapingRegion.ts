import Variant from "./Variant";

const CSV_COLS_TO_PROPERTIES = {
    'SV_chrom': 'chromosomeId',
    'SV_start': 'start',
    'SV_end': 'end',
    'Gene_name': 'geneName',
    'Location': 'location',
    'SV_type': 'type'
};

export default class OverlapinRegion {
    start: number;
    end: number;
    variants: Variant[];

    constructor(start: number, end: number, variants: Variant[]) {
        this.start = Math.min(start, end);
        this.end = Math.max(start, end);
        this.variants = variants;
    }

    intersectsWithRegion(region: OverlapinRegion) {
        return this.chromosomeId === region.chromosomeId
            && this.end >= region.end
            && this.start <= region.start;
    }

    get length(): number {
        return this.end - this.start;
    }

    get str(): string {
        return `Overlaping Region for chromosome ${this.chromosomeId}, from ${this.start} to ${this.start} (length: ${this.length}, ${this.variants.length} variants)`;
    }

    get firstVariant(): Variant | undefined {
        return this.variants.pop();
    }

    get chromosomeId(): string | undefined {
        return this.firstVariant?.chromosomeId;
    }

    get geneName(): string | undefined {
        return this.firstVariant?.geneName;
    }

    get location(): string | undefined {
        return this.firstVariant?.location;
    }

    get type(): string | undefined {
        return this.firstVariant?.type;
    }

    get tsv(): string {
        return Object.values(CSV_COLS_TO_PROPERTIES)
            .map(key => this[key])
            .join('\t');
    }

    equals(region: OverlapinRegion): boolean {
        return this.chromosomeId === region.chromosomeId
            && this.start === region.start
            && this.end === region.end;
    }

    static fromVariants(variant1: Variant, variant2: Variant): OverlapinRegion {
        return new OverlapinRegion(
            Math.max(variant1.start, variant2.start),
            Math.max(variant1.end, variant2.end),
            [variant1, variant2]
        );
    }

    static fromRegions(region1: OverlapinRegion, region2: OverlapinRegion): OverlapinRegion {
        const variants = region1.variants
            .concat(region2.variants)
            .filter((value, index, array) => array.indexOf(value) === index);


        return new OverlapinRegion(
            Math.max(region1.start, region2.start),
            Math.max(region1.end, region2.end),
            variants
        );
    }

    static fromRegionAndVariant(region: OverlapinRegion, variant: Variant): OverlapinRegion {
        const variantRegion = new OverlapinRegion(variant.start, variant.end, [variant]);
        return OverlapinRegion.fromRegions(region, variantRegion);
    }

    static get csvColumns(): string[] {
        return Object.keys(CSV_COLS_TO_PROPERTIES);
    }
}