import csv
from Variant import Variant
from Region import Region

class App():
	"""
	Lee un fichero CSV y devuelve los datos de ciertas columnas en un diccionario
	"""
	def read_csv_file(self, fileName, chromosome_id = None):
		rows = []
		with open(fileName, 'r', newline='', encoding="utf8", errors="ignore") as tsvfile:
			tsvreader = csv.DictReader(tsvfile, delimiter='\t', fieldnames=['AnnotSV_ID', 'SV_chrom', 'SV_start', 'SV_end', 'SV_length', 'SV_type'])

			# Itera sobre las filas del archivo
			for row in tsvreader:
				del row[None]
				rows.append(row)

		return rows[1:]

	"""
	Carga una muestra de datos a partir de su CSV, y devuelve cada fila como un objeto Variant.
	"""
	def load_sample(self, fileName):
		sample = self.read_csv_file(fileName);
		return [Variant(chr['SV_chrom'], fileName, int(chr['SV_start']), int(chr['SV_end'])) for chr in sample]

	"""
	Busca los solapamientos entre los cromosomas de dos muestras, devolviéndolos como objetos Region.
	"""
	def find_overlaps_between_chromosomes(self, sample1, sample2, chromosome_id = None):
		intersections = {}
		for chr1 in sample1:
			if chromosome_id and chromosome_id != chr1.chromosome_id:
				continue;

			for chr2 in sample2:
				if not chr1.intersectsWith(chr2):
					continue

				region = Region.fromVariants(chr1, chr2)
				if not region.chromosome_id in intersections:
					intersections[region.chromosome_id] = []
				intersections[region.chromosome_id].append(region)

		return intersections


	"""
	Busca los solapamientos entre las regiones encontradas por la función find_overlaps_between_chromosomes
	"""
	def find_overlaps_between_regions(self, overlaps):
		more_overlaps = {}
		for chrId in overlaps:
			if len(overlaps[chrId]) <= 1:
				more_overlaps[chrId] = overlaps[chrId].copy()
				continue

			chr_overlaps = []
			queue = overlaps[chrId].copy()

			while len(queue) > 0:
				current_intersection = queue.pop()
				chr_overlaps.append(current_intersection)

				for next_intersection in queue.copy():
					if current_intersection.intersectsWith(next_intersection):
						region = Region.fromRegions(current_intersection, next_intersection)
						if region != current_intersection and region != next_intersection:
							queue.insert(0, region)

			more_overlaps[chrId] = chr_overlaps

		return more_overlaps


	"""
	Punto de entrada de la aplicación: carga las muestras, las compara, y ordena y muestra los resultados.
	"""
	def run(self, fileName1, fileName2, chromosome_id = None, sort = None):
		sample1 = self.load_sample(fileName1)
		sample2 = self.load_sample(fileName2)

		overlaps = self.find_overlaps_between_chromosomes(sample1, sample2, chromosome_id)
		overlaps = self.find_overlaps_between_regions(overlaps)

		if sort:
			sort_key = None
			if sort == "len":
				sort_key = lambda chr: chr.len
			elif sort == "count":
				sort_key = lambda chr: chr.count
			if sort_key:
				for chrId in overlaps:
					overlaps[chrId].sort(key=sort_key, reverse=True)


		if chromosome_id:
			if chromosome_id in overlaps:
				print("Regiones para el cromosoma " + chromosome_id)
				for intersection in overlaps[chromosome_id]:
					print(" - " + str(intersection))
				return overlaps[chromosome_id]

			print("No se han encontrado solapamientos para el cromosoma " + chromosome_id)
			return None

		for i in overlaps:
			print("\nRegiones para el cromosoma " + i)
			for intersection in overlaps[i]:
				print(" - " + str(intersection))

		return overlaps
