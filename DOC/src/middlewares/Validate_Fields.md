# Validate Fields

En este archivo tenemos un middleware que usa la función `validationResult` del paquete `express-validator`, con el fin de tomar los errores que aparecen en el request y enviarlos como respuesta en la response. Luego, mediante el método `next` de tipo `NextFunction`, pasamos al siguiente middleware presente en la configuración del endpoint.

```ts
import { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { validationResult } from "express-validator";


export const validateFieldsErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({
        ok: false, ...errors
    })
    next()
}
```
