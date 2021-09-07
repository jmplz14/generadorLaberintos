import numpy as np
from random import randrange
import sys


def agregar_fronteras(i, j, tam, matrix, fronteras):
    if (i >= 0 and i < tam and j >= 0 and j < tam and matrix[i][j] == -2):
        matrix[i][j] = -1
        fronteras.append([i,j])
    
        
#marca la posición de la matriz como visitada y añade a la frontera los vecinos

def marcar_pos(i, j, tam, matrix, fronteras):

    matrix[i,j] = 0

    agregar_fronteras(i-1 ,j, tam, matrix, fronteras) 
    agregar_fronteras(i+1 ,j, tam, matrix, fronteras)
    agregar_fronteras(i ,j-1, tam, matrix, fronteras)
    agregar_fronteras(i ,j+1, tam, matrix, fronteras)


def elegir_direccion(i_actual ,j_actual, i_vecino, j_vecino):
    #print("{},{} {},{}".format(i_actual,j_actual,i_vecino,j_vecino))
    if(i_actual == i_vecino - 1): muros_eliminados.append([[i_vecino,j_vecino],1])
    if(j_actual == j_vecino + 1): muros_eliminados.append([[i_vecino,j_vecino],2])
    if(i_actual == i_vecino + 1): muros_eliminados.append([[i_vecino,j_vecino],3])
    if(j_actual == j_vecino - 1): muros_eliminados.append([[i_vecino,j_vecino],4])
    
    
    

def get_vecionos_no_cabados(i, j, tam, matrix):
    vecinos = []

    if(i + 1 < tam and  matrix[i+1][j] == 0): vecinos.append([i+1,j]) 
    if(i - 1 >= 0 and  matrix[i-1][j] == 0): vecinos.append([i-1,j]) 
    if(j + 1 < tam and  matrix[i][j+1] == 0): vecinos.append([i,j+1]) 
    if(j - 1 >= 0 and  matrix[i][j-1] == 0): vecinos.append([i,j-1]) 
    
    return vecinos

def crear_camino(i, j, tam, matrix, fronteras):
    vecinos = get_vecionos_no_cabados(i, j, tam, matrix)

    if(len(vecinos) > 0):
        vecino_conectar = vecinos[randrange(len(vecinos))]
        elegir_direccion(i, j, vecino_conectar[0], vecino_conectar[1])
        
def obtener_tamaño_laberinto():
    
    if(len(sys.argv) != 2):
        print("Error - Para ejecutar el scirpt necesitamos un único argumento numérico.")
        print("Este argumento representara el tamaño del laberinto y tiene que se un entero mayor o igual a 2.")
        exit()
    else:
        try:
            valor = int(sys.argv[1])
            return valor
        except ValueError:
            print("No se introdujo un valor entero valido")
            exit()

def mostrar_muros_eliminados(muros_eliminados):
    for muro in muros_eliminados:
        print("{},{},{}".format(muro[0][0], muro[0][1], muro[1]))



tam = obtener_tamaño_laberinto()
# tenemos la matriz iniciada a -1
matrix = np.full((tam, tam), -2)

# Creamos la lista con las posiciones frontera
fronteras = []

muros_eliminados = []

#Elegimos la posicion en la que inicia el algoritmo
i , j = randrange(tam), randrange(tam)

#Marcamos la casilla del laberinto como visitada y añadimos las fronteras
marcar_pos(i, j, tam, matrix, fronteras)

#Ejecutamos mientras queden elementos frontera que procesar
while fronteras:
    #obtenemos una frontera de forma aleatoria y la borramos de la lista
    indice_actual = randrange(len(fronteras))
    actual = fronteras[indice_actual]
    del fronteras[indice_actual]

    crear_camino(actual[0],actual[1], tam, matrix, fronteras)
    #marcamos la casilla actual y añadimos las fronteras de esta
    
    marcar_pos(actual[0],actual[1], tam, matrix, fronteras)

print(tam)
mostrar_muros_eliminados(muros_eliminados)




