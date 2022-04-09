# Variables de Entorno

Se tiene un archivo llamado `.env` en la raíz del proyecto, y también otro elemento llamado `.env.example`. La idea en el primero, es poder definir las variables de entorno para el servidor, pero dejando que los datos sean privados y solo para el programador, puesto que dentro del archivo `.gitignore` se han ocultado las variables de entorno. El segundo archivo, `.env.example`, se encarga de mostrar los nombres de las variables y un ejemplo del tipo de dato.

A continuación se muestra un ejemplo de la estructura de las variables de entorno.

```.env
PORT = 0000

LOCAL_HOST = "http://localhost"
DEV_HOST = "http://localhost"
PROD_HOST = "http://localhost"

DB_HOST = "host"
DB_PORT = 0000
DB_NAME = "database"
DB_USER = "user"
DB_PASSWORD = "password"
```
