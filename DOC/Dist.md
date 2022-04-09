# dist

El directorio `dist` que se crea luego de ejecutar el comando `npm run build`, se encarga de almacenar la transpilación de JS a TS de los archivos del proyecto. Dicho directorio es el resultado de la configuración establecida en el archivo `tsconfig.json`:

```json
{
    "compilerOptions": {
        ...,
        "outDir": "./dist",
        ...
    }
}
```

También lo podemos conocer en otros proyectos como el directorio `build`.
