#  API CRUD HTTP CON AUTENTICACIÓN JWT , LOGIN SOCIAL Y VALIDACIÓN MAIL🔗 💡

Este ejercicio es continuación del API programado para el "Ejercicio 2".
Sobre el mismo CRUD de Posts, en esta ocasión añadiremos un nuevo modelo de usuario y expondremos endpoints para login, logout y validación de cuenta

## 1. Diseño modelo User
Diseñar y programar un modelo Mongoose "User" con al menos los siguientes campos y validaciones en su esquema:
- name, string, requerido
- email, string, requerido, formato email
- password, string, requerido
- bio, string.
- active: boolean. Default false
- createdAt: Date,
- updatedAt: Date.

## 2. API HTTP
Codificar los siguientes endpoints HTTP sobre el API:

## POST /api/users
- No necesita estar autenticada
- Recibe body JSON con los campos name, email, password y bio
- Almacena el usuario en Base de Datos en memoria cifrando su contraseña

## POST /api/login
- Recibe body con email, password
- Devuelve HTTP 200 OK con token JWT de sesión si las credenciales son correctas
- Devuelve HTTP 400 en caso de error en la validación de datos
- Devuelve HTTP 401 si las credenciales no son correctas

## 3. El resto de endpoints de nuestra API (CRUD de Posts) deben requerir autenticación y devolver código HTTP 401 ante peticiones no autenticadas.

## 4. Confirmación de Registro
- Tras crear un usuario (POST /api/users) éste se creara con el campo active: false. El servidor enviará un email a la dirección de correo de registro compartiendo una   URL con la que el usuario que reciba el correo pueda hacer GET para modificar el campo "active" de su cuenta a valor "true".
  Solo usuarios con el campo active == true podrán hacer login (POST /api/login)

## Built with ⛏
- [EXPRESS](https://expressjs.com/)
- [NODEMAILER](https://nodemailer.com/about/)
- [PASSPORT](https://www.passportjs.org/packages/)
- [MONGOOSE](https://www.npmjs.com/package/mongodb-memory-server)

