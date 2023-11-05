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
exports.chr2gene = void 0;
const Chromosome2Gene_1 = __importDefault(require("../services/Chromosome2Gene"));
exports.chr2gene = {
    command: 'chr2gene <chromosomeId> <files..>',
    describe: 'Dado un fichero de variaciones, genera un nuevo fichero donde aparecen el nombre de los genes asociados al cromosoma dado.',
    aliases: ['cg', 'c2g'],
    builder(yargs) {
        return yargs
            .positional('chromosomeId', {
            type: 'string',
            desc: 'Cromosoma que se está buscando.'
        })
            .positional('files', {
            type: 'string',
            desc: 'Ficheros de entrada donde se encuentran los datos de las muestras. Al menos dos ficheros son necesarios.',
        })
            .option('unique', {
            alias: 'u',
            type: 'boolean',
            desc: 'Generar un fichero con los genes que son comunes entre todos ficheros dados.'
        })
            .help();
    },
    handler(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = new Chromosome2Gene_1.default(argv.chromosomeId);
            program.run(argv.files, argv.unique);
        });
    }
};
