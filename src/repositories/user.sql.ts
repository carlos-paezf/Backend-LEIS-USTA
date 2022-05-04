export enum USERS_SQL {
    CASE_STATUS = `CASE "usuarios"."status"
        WHEN 1 THEN 'Al día' 
        WHEN 2 THEN 'En mora' 
        WHEN 3 THEN 'En préstamo' 
        WHEN 4 THEN 'Paz y Salvo' 
        ELSE 'otro' 
    END`
}