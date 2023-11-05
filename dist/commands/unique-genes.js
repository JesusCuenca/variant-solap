"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueGenes = void 0;
const UniqueGenes_1 = __importDefault(require("../services/UniqueGenes"));
exports.uniqueGenes = {
    command: 'unique-genes <files..>',
    describe: 'Genera un fichero con los genes que son comunes en todos los ficheros dados.',
    aliases: ['uniq'],
    builder(yargs) {
        return yargs
            .positional('files', {
            type: 'string',
            desc: 'Ficheros de entrada donde se encuentran los datos de las muestras. Al menos dos ficheros son necesarios.',
        })
            .help();
    },
    handler(argv) {
        const program = new UniqueGenes_1.default();
        program.run(argv.files);
    }
};
