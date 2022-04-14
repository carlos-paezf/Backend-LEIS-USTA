# User Repository

En la carpeta de repositorios tenemos algunas sentencias SQL parciales o totales, con el fin de solo llamarlas en otras partes del código. En este caso tenemos una consulta para poder darle un nombre especifico al resultado, según el caso del estado del usuario.

```ts
export const USERS_SQL = {
    CASE_STATUS: `CASE "users"."status"
        WHEN 1 THEN 'Al día' 
        WHEN 2 THEN 'En mora' 
        WHEN 3 THEN 'En préstamo' 
        WHEN 4 THEN 'Paz y Salvo' 
        ELSE 'otro' 
    END`
}
```
