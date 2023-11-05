import { CommandModule, boolean } from "yargs";
import Chromosome2Gene from '../services/Chromosome2Gene';

export const chr2gene: CommandModule = {
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
            .help()
    },
    async handler(argv) {
        const program = new Chromosome2Gene(argv.chromosomeId as string);
        program.run(argv.files as string[], argv.unique as boolean);
    }
}