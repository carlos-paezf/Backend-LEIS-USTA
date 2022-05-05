# Backend - Laboratory Equipment Inventory System USTA Tunja

## Autores

- García Sisa Jairo Eduardo.
- Gil Estupiñan Sergio Alejandro.
- Mesa Buitrago Sergio David.
- Páez Ferreira Carlos David.

## Comandos

- Creación del proyecto

  ```txt
  npm init -y
  ```

- Reinstalar o recuperar los `node_modules`
  
  ```txt
  npm install
  ```

- Transpilar el proyecto de TS a JS (2 opciones)
  
  ```txt
  npm run build
  ```

  ```txt
  tsc --watch
  ```

- Desplegar el servidor en modo desarrollo (2 opciones)
  
  ```txt
  npm run dev
  ```
  
  ```txt
  nodemon dist/index.js
  ```

- Desplegar el servidor en modo producción (2 opciones)
  
  ```txt
  npm run prod
  ```

  ```txt
  node dist/index.js
  ```

## Instalación de Paquetes necesarios

```txt
npm i express express-validator colors cors morgan dotenv bcryptjs jsonwebtoken
```
<!-- ```txt
npm i express colors cors morgan dotenv pg-promise
``` -->

```txt
npm i --save sequelize
```

```txt
npm install --save pg pg-hstore
```

## Instalación de tipado de paquetes en modo desarrollo

```txt
npm i @types/express --save-dev
```

```txt
npm i @types/cors --save-dev
```

```txt
npm i @types/morgan --save-dev
```

<!-- ```txt
npm install @types/pg-promise --save-dev
``` -->

```txt
npm install @types/bcryptjs --save-dev
```

```txt
npm install @types/jsonwebtoken --save-dev
```

## Instalación de Nodemon en modo desarrollo

```txt
npm i nodemon --save-dev
```

## Instalación y configuración de TS

- Instalación de TS de manera global
  
  ```txt
  npm i -g typescript
  ```

- Inicialización de TS en el proyecto
  
  ```txt
  tsc --init
  ```

- Configuración del archivo `tsconfig.json`
  
  ```json
  {
      "compilerOptions": {
          ...,
          "outDir": "./dist",
          ...
      }
  }
  ```

## Establecimiento de scripts del proyecto

Dentro del archivo `package.json` tenemos la siguiente configuración, asociada con los comandos presentados en la primera parte de este archivo:

```json
{
    ...,
    "scripts": {
        ...,
        "build": "tsc --watch",
        "dev": "nodemon dist/index.js",
        "prod": "node dist/index.js"
    },
    ...
}
```

## Documentación de un API Client

A continuación se presenta la documentación de los endpoints de nuestro Backend: [Documentación Backend LEIS](https://documenter.getpostman.com/view/8438809/UVyysCDd 'Endpoints Backend')

## Activación de ESLint

ESLint es una herramienta que nos permite encontrar problemas de sintaxis y errores en nuestro código. Para activar esta función debemos instalar la extensión **ESLint** en VSCode. Luego usamos el siguiente comando dentro del proyecto para instalar el paquete de ESLint:

```txt
npm i eslint --save-dev
```

Inicializamos ESLint con el siguiente comando, y seleccionamos las opciones más adecuadas que aparezcan en la consola.

```txt
npx eslint --init
```

## Conocer la complejidad de los archivos

Podemos conocer los archivos más complejos de nuestro proyecto, y en los cuales debemos centrar una refactorización. ¿Cómo se calcula la complejidad? Tiene en cuenta el número de líneas de código, la indentación, el número de veces que se ha modificado el fichero (git) y otras cosas. Es necesario tener git y node instalado para poder usar el siguiente comando dentro del Git Bash.

```txt
npx code-complexity . --filter '**/*.ts' --limit 10 --sort score
```
