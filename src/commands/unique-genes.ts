import { CommandModule } from "yargs";
import UniqueGenes from "../services/UniqueGenes";

export const uniqueGenes: CommandModule = {
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
        const program = new UniqueGenes();
        program.run(argv.files as string[])
    }
}