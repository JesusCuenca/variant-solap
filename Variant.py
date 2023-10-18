class Variant():
    def __init__(self, chromosome_id, sample_id, start, end):
        self.chromosome_id = chromosome_id
        self.sample_id = sample_id
        self.start = start
        self.end = end

    def intersectsWith(self, chr):
        return (self.chromosome_id == chr.chromosome_id and
         self.end >= chr.start and
         self.start <= chr.end)

    def __str__(self):
    	return f"Chromosome {self.chromosome_id} from {self.start} to {self.end}"

    def __eq__(self, chr):
        return (self.chromosome_id == chr.chromosome_id and
         self.sample_id == chr.sample_id and
         self.end == chr.start and
         self.start == chr.end)

    def __hash__(self):
        return hash((self.chromosome_id, self.sample_id, self.start, self.end))
