export type VariantTsvColumns =
    'AnnotSV_ID'
    | 'SV_chrom'
    | 'SV_start'
    | 'SV_end'
    | 'SV_length'
    | 'SV_type'
    | 'Gene_name'
    | 'Location'
    ;

export type VariantProperties =
    "id"
    | "chromosomeId"
    | "start"
    | "end"
    | "length"
    | "type"
    | "geneName"
    | "location"
    ;

export type VariantTsvRow = {
    id: string;
    chromosomeId: string;
    start: number;
    end: number;
    length: number;
    type: string;
    geneName: string;
    location: string;
}