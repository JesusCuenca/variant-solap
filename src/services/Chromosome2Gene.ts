import readTsvVariants from '../utils/read-tsv-variants';
import UniqueGenes from './UniqueGenes';

import { once } from 'events';
import { createWriteStream } from 'fs';
import { promisify } from 'util';
import { finished } from 'stream';

export default class Chromosome2Gene {
    chromosomeId: string;

    constructor(chromosomeId: string) {
        this.chromosomeId = chromosomeId;
    }

    async readTsvFile(sampleFileName: string) {
        return readTsvVariants(sampleFileName, (data) => {
            return data.chromosomeId === this.chromosomeId;
        });
    }

    async genesFromSampleFile(sampleFileName: string) {
        const sample = await this.readTsvFile(sampleFileName);
        const genes = sample
            .map(variant => variant.geneName)
            .sort()
            .filter(gene => !!gene)
            .filter((gene, index, array) => array.indexOf(gene) === index);
        return genes;
    }

    async processSample(sampleFileName: string, now: number) {
        const sampleId = sampleFileName.split('/').pop() || sampleFileName;
        const outputFileName = `gene_cr-${this.chromosomeId}_${sampleId}_${now}.tsv`;

        const genes = await this.genesFromSampleFile(sampleFileName);
        
        const output = createWriteStream(outputFileName, 'utf-8');
        output.write('Gene_name\n');
        if (!output.write(genes.join('\n'))) {
            await once(output, 'drain');
        }
        output.end();

        await promisify(finished)(output)

        return outputFileName;
    }

    async run(sampleFileNames: string[], unique: boolean = false) {
        const now = Date.now();
        const outputFileNames = await Promise.all(
            sampleFileNames.map(sampleFileName => this.processSample(sampleFileName, now))
        )

        if (unique && outputFileNames.length > 1) {
            const uniqueProcess = new UniqueGenes();
            await uniqueProcess.run(outputFileNames, `unique-genes_${now}.tsv`);
        }

        return outputFileNames;
    }
}