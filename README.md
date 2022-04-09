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
npm i express colors cors morgan dotenv pg-promise
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

```txt
npm install @types/pg-promise --save-dev
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
