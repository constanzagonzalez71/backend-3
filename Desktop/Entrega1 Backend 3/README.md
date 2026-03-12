# Backend 3 - API REST

Proyecto desarrollado para el curso **Backend 3**.

API REST para gestión de **usuarios, mascotas y adopciones** utilizando Node.js, Express y MongoDB.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- dotenv
- cookie-parser
- Swagger (documentación de API)
- Mocha / Chai / Supertest (tests funcionales)
- Docker

---

## Instalación

Clonar el repositorio

git clone https://github.com/constanzagonzalez71/backend-3

Entrar a la carpeta del proyecto

cd backend-3

Instalar dependencias

npm install

Ejecutar servidor

npm run dev

El servidor se ejecutará en:

http://localhost:8080

---

## Endpoints principales

### Users

GET /api/users  
GET /api/users/:uid  
POST /api/users  
PUT /api/users/:uid  
DELETE /api/users/:uid  

### Pets

GET /api/pets  
POST /api/pets  

### Adoptions

GET /api/adoptions  
GET /api/adoptions/:aid  
POST /api/adoptions  

### Sessions

POST /api/sessions/register  
POST /api/sessions/login  

---

## Documentación con Swagger

El módulo **Users** se encuentra documentado utilizando **Swagger**.

La documentación se puede visualizar en:

/api/docs

Swagger permite visualizar y probar los endpoints directamente desde el navegador.

---

## Tests funcionales

Se desarrollaron **tests funcionales para todos los endpoints del router**:

adoption.router.js

Los tests verifican:

- Creación de adopciones
- Obtención de adopciones
- Validación de errores
- Respuestas correctas del servidor

Para ejecutar los tests:

npm test

Los tests se encuentran en la carpeta:

tests/

---

## Docker

El proyecto incluye un **Dockerfile** para generar una imagen del backend.

Construir la imagen:

docker build -t backend-adoptions .

Ejecutar el contenedor:

docker run -p 8080:8080 backend-adoptions

Imagen publicada en DockerHub:

(Aquí se agregará el link cuando la imagen sea subida a DockerHub)

---

## Estructura del proyecto

src/

controllers  
routes  
users.router.js  
pets.router.js  
adoption.router.js  
sessions.router.js  
mocks.router.js  

services  
models  
utils  

app.js  

tests/

Dockerfile  
README.md  
package.json  

---

## Seguridad de contraseñas

Las contraseñas **no se almacenan en texto plano**.

Se utiliza **bcrypt** para generar hashes seguros.

Para reutilizar esta lógica se creó el archivo:

src/utils/password.utils.js

Funciones disponibles:

createHash(password)  
isValidPassword(user,password)

Estas funciones se utilizan en el **registro y login de usuarios**.

---

## Autor

Constanza González  
Curso Backend 3  
Coderhouse