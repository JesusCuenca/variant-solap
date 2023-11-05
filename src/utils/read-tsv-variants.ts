import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { VariantProperties, VariantTsvColumns, VariantTsvRow } from "../types";
import Variant from "../code/Variant";

const TsvColumnToVariantProperty: { [k in VariantTsvColumns]: VariantProperties } = {
    'AnnotSV_ID': "id",
    'SV_chrom': "chromosomeId",
    'SV_start': "start",
    'SV_end': "end",
    'SV_length': "length",
    'SV_type': "type",
    'Gene_name': "geneName",
    'Location': "location",
};

export default function (
    sampleFileName: string,
    validator?: (data: VariantTsvRow) => boolean
): Promise<Variant[]> {
    const sampleId = sampleFileName.split('/').pop() || sampleFileName;
    const result: Variant[] = [];
    return new Promise((resolve, reject) => {
        createReadStream(sampleFileName)
            .pipe(csvParser({
                separator: '\t',
                mapHeaders({ header }): string | null {
                    // @ts-ignore
                    if (header in TsvColumnToVariantProperty) return TsvColumnToVariantProperty[header];
                    return null;
                },
            }))
            .on('data', (data: VariantTsvRow) => {
                if (validator && !validator(data)) {
                    return;
                }

                const variant = new Variant(
                    sampleId,
                    data.id,
                    data.chromosomeId,
                    data.start,
                    data.end,
                    data.length,
                    data.type,
                    data.geneName,
                    data.location,
                )
                result.push(variant);
            })
            .on('end', () => resolve(result))
            .on('error', (e) => reject(e));
    })
}