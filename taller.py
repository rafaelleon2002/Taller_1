from flask import Flask, jsonify
from flask_cors import CORS
import random
import string
import secrets

taller = Flask(__name__)
CORS(taller)

nombres_usuarios = ['rafael', 'santiago', 'steffany', 'veimar', 'albeiro']
dominios_ficticios = ['gmail.com', 'hotmail.net', 'yahoo.org', 'datosabiertos.info', 'bootcamp.biz']

@taller.route('/generar-datos')
def generar_datos():
    cantidad_datos = 500000
    datos_generados = []

    for i in range(1, cantidad_datos + 1):
        nombre_usuario = random.choice(nombres_usuarios)
        dominio = random.choice(dominios_ficticios)

        
        longitud_contrasena = random.randint(8, 12)
        contrasena = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(longitud_contrasena))

        datos_generados.append({
            'nombre': nombre_usuario,
            'correo': f'{nombre_usuario}@{dominio}',
            'contrasena': contrasena,
            
        })

    return jsonify(datos_generados)

if __name__ == '__main__':
    taller.run(debug=True)
