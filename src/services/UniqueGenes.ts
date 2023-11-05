import readTsvVariants from "../utils/read-tsv-variants";
import { createWriteStream } from "fs";
import { once } from "events";
import { promisify } from "util";
import { finished } from "stream";

export default class UniqueGenes {

    async readTsvFile(sampleFileName: string) {
        return readTsvVariants(sampleFileName);
    }

    async genesFromSampleFile(sampleFileName: string): Promise<string[]> {
        const sample = await this.readTsvFile(sampleFileName);
        const genes = sample
            .map(variant => variant.geneName)
            .sort()
            .filter(gene => !!gene)
            .filter((gene, index, array) => array.indexOf(gene) === index);
        return genes;
    }

    async run(sampleFileNames: string[], outputFileName?: string) {
        outputFileName ??= `unique-genes_${Date.now()}.tsv`;

        if (sampleFileNames.length < 2) {
            return outputFileName;
        }

        let uniqueGenes = await this.genesFromSampleFile(sampleFileNames[0]);
        for (let i = 1; i < sampleFileNames.length; i++) {
            const genes = await this.genesFromSampleFile(sampleFileNames[i])
            uniqueGenes = uniqueGenes.filter(gene => genes.includes(gene))
        }

        const output = createWriteStream(outputFileName, 'utf-8');
        output.write('Gene_name\n');
        if (!output.write(uniqueGenes.join('\n'))) {
            await once(output, 'drain');
        }
        output.end();

        await promisify(finished)(output)

        return outputFileName;
    }
}