from App import App
import argparse

parser = argparse.ArgumentParser(
    description="Encuentra los solapamientos entre chromosomas",
    )
parser.add_argument("filename1", action="store", help="Primer fichero de muestras")
parser.add_argument("filename2", action="store", help="Segundo fichero de muestras")
parser.add_argument("--chromosome-id", "-c", action="store", help="Muestra solo los resultados para un cromosoma concreto", dest="chrId")
parser.add_argument("--sort-by", action="store", choices=["len", "count"], help="Permite ordenar las regiones solapadas: 'len' para ordenar por la longitud de la region; 'count' para ordenar por el número de chromosomas solapados", dest="sort")
args = parser.parse_args()

app = App()
intersections = app.run(args.filename1, args.filename2, args.chrId, args.sort)
