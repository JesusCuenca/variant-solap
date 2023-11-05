"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_tsv_variants_1 = __importDefault(require("../utils/read-tsv-variants"));
const fs_1 = require("fs");
const events_1 = require("events");
const util_1 = require("util");
const stream_1 = require("stream");
class UniqueGenes {
    readTsvFile(sampleFileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, read_tsv_variants_1.default)(sampleFileName);
        });
    }
    genesFromSampleFile(sampleFileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sample = yield this.readTsvFile(sampleFileName);
            const genes = sample
                .map(variant => variant.geneName)
                .sort()
                .filter(gene => !!gene)
                .filter((gene, index, array) => array.indexOf(gene) === index);
            return genes;
        });
    }
    run(sampleFileNames, outputFileName) {
        return __awaiter(this, void 0, void 0, function* () {
            outputFileName !== null && outputFileName !== void 0 ? outputFileName : (outputFileName = `unique-genes_${Date.now()}.tsv`);
            if (sampleFileNames.length < 2) {
                return outputFileName;
            }
            let uniqueGenes = yield this.genesFromSampleFile(sampleFileNames[0]);
            for (let i = 1; i < sampleFileNames.length; i++) {
                const genes = yield this.genesFromSampleFile(sampleFileNames[i]);
                uniqueGenes = uniqueGenes.filter(gene => genes.includes(gene));
            }
            const output = (0, fs_1.createWriteStream)(outputFileName, 'utf-8');
            output.write('Gene_name\n');
            if (!output.write(uniqueGenes.join('\n'))) {
                yield (0, events_1.once)(output, 'drain');
            }
            output.end();
            yield (0, util_1.promisify)(stream_1.finished)(output);
            return outputFileName;
        });
    }
}
exports.default = UniqueGenes;
