"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = require("fs");
const Variant_1 = __importDefault(require("../code/Variant"));
const TsvColumnToVariantProperty = {
    'AnnotSV_ID': "id",
    'SV_chrom': "chromosomeId",
    'SV_start': "start",
    'SV_end': "end",
    'SV_length': "length",
    'SV_type': "type",
    'Gene_name': "geneName",
    'Location': "location",
};
function default_1(sampleFileName, validator) {
    const sampleId = sampleFileName.split('/').pop() || sampleFileName;
    const result = [];
    return new Promise((resolve, reject) => {
        (0, fs_1.createReadStream)(sampleFileName)
            .pipe((0, csv_parser_1.default)({
            separator: '\t',
            mapHeaders({ header }) {
                // @ts-ignore
                if (header in TsvColumnToVariantProperty)
                    return TsvColumnToVariantProperty[header];
                return null;
            },
        }))
            .on('data', (data) => {
            if (validator && !validator(data)) {
                return;
            }
            const variant = new Variant_1.default(sampleId, data.id, data.chromosomeId, data.start, data.end, data.length, data.type, data.geneName, data.location);
            result.push(variant);
        })
            .on('end', () => resolve(result))
            .on('error', (e) => reject(e));
    });
}
exports.default = default_1;
