import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { chr2gene } from './commands/chr2gene'
import { uniqueGenes } from './commands/unique-genes'

export const cli = function (args: string[]) {
    return yargs(hideBin(args))
        .command(chr2gene)
        .command(uniqueGenes)
        .demandCommand()
        .help()
        .parse()
}