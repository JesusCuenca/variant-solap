class Region():
    def __init__(self, chromosome_id, start, end, variants):
        self.chromosome_id = chromosome_id
        self.start = start
        self.end = end
        self.variants = variants

    @staticmethod
    def fromVariants(variant1, variant2):
        start = max(variant1.start, variant2.start)
        end = min(variant1.end, variant2.end)
        return Region(variant1.chromosome_id, start, end, [variant1, variant2])

    @staticmethod
    def fromRegions(region1, region2):
        start = max(region1.start, region2.start)
        end = min(region1.end, region2.end)
        variants = region1.variants.copy()
        variants.extend(region2.variants)
        variants = list(set(variants)) # filtramos variantes repetidas
        return Region(region1.chromosome_id, start, end, variants)

    @property
    def len(self):
        return self.end - self.start

    @property
    def count(self):
        return len(self.variants)

    def intersectsWith(self, region):
        return self.chromosome_id == region.chromosome_id and self.end >= region.start and self.start <= region.end

    def __str__(self):
        return f"Chromosome {self.chromosome_id}: Region [{self.start}, {self.end}] (length: {self.len}, {self.count} variants)"

    def __eq__(self, region):
        return self.chromosome_id == region.chromosome_id and self.start == region.start and self.end == region.end
