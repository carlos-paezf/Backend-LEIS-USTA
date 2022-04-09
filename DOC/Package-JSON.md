# package.json

Dentro del archivo `package.json`, el cual fue creado con el comando `npm init -y`, tenemos la gestión de los scripts del proyecto, paquetes en modo producción, y dependencias en modo desarrollo.

## Scripts

Los scripts cumple con la función de almacenar los comandos que se ejecutarían en consola, pero ahora se ejecutan con el siguiente standard: `npm run <script>`.

```json
{
    ...,
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "tsc --watch",
        "dev": "nodemon dist/index.js",
        "prod": "node dist/index.js"
    },
}
```

## Dependencias

Cada que se instala un paquete para usarlo dentro del proyecto, podemos observar que se ha instalado correctamente y con una versión especifica dentro de la siguiente sección:

```json
{
    ...,
    "dependencies": {
        "colors": "^1.4.0",
        "cors": "^2.8.5",
        "dotenv": "^16.0.0",
        "express": "^4.17.3",
        "morgan": "^1.10.0",
        "pg-promise": "^10.11.1"
    },
}
```

Las `devDependencies`, son paquetes que se encargan de hacer compatibles con TS los módulos creados en JS. Solo funcionan durante la versión de desarrollo, no en la versión transpilada.
