"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const chr2gene_1 = require("./commands/chr2gene");
const unique_genes_1 = require("./commands/unique-genes");
const cli = function (args) {
    return (0, yargs_1.default)((0, helpers_1.hideBin)(args))
        .command(chr2gene_1.chr2gene)
        .command(unique_genes_1.uniqueGenes)
        .demandCommand()
        .help()
        .parse();
};
exports.cli = cli;
