# Proyecto elecciones frontend

### Frontend

Situarse en la raiz del directorio frontend en la terminal y ejecutar:

```bash
npm install # La primera vez para descargar las dependencias
npm start 
```

Url por defecto: http://localhost:3000

### Generar usuario Administrador

Usando POSTMAN, o su cliente de preferencia, realice un petición POST a la URL 'http://localhost:4000/register', enviando en el body como raw/json el siguiente json personalizado con sus datos:

```JSON
{
    "nom_usuario": "su_nombre",
    "clave_usuario": "su_contraseña",
}
```

**NOTA**: Está opción se podrá usar una única vez.

Ahora podrá loguearse desde 'http://localhost:4000/login' con los datos:

**Correo electrónico**: 'admin@gmail.com',
**Contraseña**: 'la asignada en el paso anterior'

**JOIN**

