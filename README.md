# Task Manager

Aplicación web para la gestión de tareas e incidencias, desarrollada como prueba técnica con ASP.NET Core Web API, Angular y SQL Server.

La aplicación permite administrar tareas, usuarios y sesiones mediante una API REST y una interfaz web responsiva.

---

## Funcionalidades

### Autenticación

- Inicio de sesión con correo electrónico y contraseña.
- Autenticación mediante JWT.
- Access token almacenado en cookie HttpOnly.
- Refresh token almacenado en cookie HttpOnly.
- Renovación automática de la sesión.
- Rotación y revocación de refresh tokens.
- Cierre de sesión.
- Protección de rutas en Angular mediante `AuthGuard`.
- Interceptor HTTP para envío de credenciales y renovación de sesión.

### Usuarios

- Registro de usuarios.
- Consulta de usuarios.
- Consulta de usuario por ID.
- Edición de usuarios.
- Eliminación lógica.
- Activación y desactivación de usuarios.
- Contraseñas protegidas con BCrypt.
- Imagen de perfil almacenada en SQL Server como `VARBINARY(MAX)`.
- Previsualización de la imagen antes de guardar.
- Validación del tipo de archivo desde Angular.
- Visualización de la imagen en el listado de usuarios.

### Tareas

- Crear tareas.
- Editar tareas.
- Eliminar tareas.
- Consultar tarea por ID.
- Listar tareas.
- Filtrar por estado.
- Filtrar por prioridad.
- Mostrar fecha de creación.
- Mostrar fecha de actualización.
- Identificación visual de prioridades.
- Estados disponibles:
  - Pendiente.
  - En progreso.
  - Completada.
- Prioridades disponibles:
  - Baja.
  - Media.
  - Alta.
  - Crítica.

### Interfaz

- Formularios reactivos.
- Validaciones básicas.
- Componentes reutilizables.
- Diseño responsivo con Bootstrap.
- Iconos con Bootstrap Icons.
- Alertas y confirmaciones con SweetAlert2.
- Estados de carga y manejo de errores.
- Navegación protegida según el estado de autenticación.

---

## Arquitectura

El backend utiliza una arquitectura por capas.

### API

Responsable de:

- Exponer los endpoints REST.
- Recibir solicitudes HTTP.
- Validar el formato de entrada.
- Administrar cookies.
- Configurar autenticación y autorización.
- Documentar endpoints con Swagger.

### BL — Business Logic

Responsable de:

- Implementar reglas de negocio.
- Validar credenciales.
- Generar contraseñas con hash.
- Generar access tokens y refresh tokens.
- Coordinar los repositorios.
- Procesar usuarios y tareas.

### DL — Data Layer

Responsable de:

- Acceder a SQL Server.
- Ejecutar procedimientos almacenados.
- Utilizar Entity Framework Core.
- Implementar el patrón Repository.

### ML — Model Layer

Contiene:

- Entidades.
- Requests.
- Responses.
- DTOs.
- Modelos compartidos.
- Resultado estándar de operaciones.

### Frontend

El frontend se encuentra organizado por funcionalidades:

- Componentes.
- Páginas.
- Formularios reutilizables.
- Servicios HTTP.
- Modelos TypeScript.
- Guards.
- Interceptores.
- Layouts compartidos.

---

## Tecnologías utilizadas

### Backend

- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core 8
- SQL Server
- Stored Procedures
- JWT Bearer Authentication
- BCrypt.Net
- Swagger / OpenAPI

### Frontend

- Angular
- TypeScript
- RxJS
- Reactive Forms
- Bootstrap
- Bootstrap Icons
- SweetAlert2

### Herramientas

- Visual Studio
- Visual Studio Code
- SQL Server Management Studio
- Git
- GitHub

---

## Decisiones técnicas

- Se utilizó arquitectura por capas para separar responsabilidades.
- Se implementó Repository Pattern para desacoplar el acceso a datos.
- Las operaciones principales de base de datos utilizan procedimientos almacenados.
- Se utilizó Entity Framework Core con enfoque Database First.
- Las contraseñas se almacenan utilizando BCrypt.
- El access token se guarda en una cookie HttpOnly.
- El refresh token se guarda en una cookie HttpOnly.
- Se implementó rotación de refresh tokens.
- Los refresh tokens pueden ser revocados.
- Angular utiliza un interceptor para renovar automáticamente la sesión.
- Las rutas privadas están protegidas mediante un guard.
- Las imágenes de usuario se almacenan como `VARBINARY(MAX)`.
- La API serializa los arreglos de bytes como Base64.
- Los formularios se construyeron con Reactive Forms.
- SweetAlert2 se centralizó mediante un servicio reutilizable.
- Se implementaron filtros de tareas desde backend por estado y prioridad.

---

## Requisitos previos

Para ejecutar el proyecto es necesario contar con:

- .NET SDK 8.
- Node.js.
- npm.
- Angular CLI 19.
- SQL Server.
- SQL Server Management Studio.
- Git.

---

## Configuración de la base de datos

1. Abrir SQL Server Management Studio.
2. Ejecutar el script ubicado en:

```text
Database/TaskManager.sql
```

El script debe incluir:

- Creación de tablas.
- Llaves primarias.
- Llaves foráneas.
- Catálogos.
- Procedimientos almacenados.
- Datos iniciales necesarios.

---

## Configuración del backend

### Cadena de conexión

Configura la cadena de conexión mediante variables de entorno, User Secrets o un archivo local no incluido en Git.

Ejemplo:

```json
{
  "ConnectionStrings": {
    "TaskManager": "Server=TU_SERVIDOR;Database=TaskManager;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

### Configuración de JWT

Ejemplo:

```json
{
  "Jwt": {
    "Key": "TU_CLAVE_SEGURA",
    "Issuer": "TaskManagerAPI",
    "Audience": "TaskManagerClient",
    "ExpirationMinutes": 15
  }
}
```

No se deben publicar claves reales, contraseñas ni cadenas de conexión sensibles en el repositorio.

---

La documentación Swagger estará disponible en:

```text
https://localhost:7000/swagger
```

La URL y el puerto pueden cambiar según la configuración de `launchSettings.json`.

---

## Configuración del frontend

Configura la URL de la API en el archivo de ambiente de Angular.

Ejemplo:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7000/api'
};
```

Los servicios deben utilizar la variable:

```ts
environment.ts
```

en lugar de tener URLs escritas directamente.

---

## Ejecución del frontend

Desde la carpeta del proyecto Angular:

```bash
npm install
```

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

o en el puerto configurado para el proyecto.

---

## Endpoints principales

Las rutas pueden variar de acuerdo con el nombre final de los controladores.

### Autenticación

```http
POST /api/Auth/Login
POST /api/Auth/RefreshToken
POST /api/Auth/Logout
GET  /api/Auth/ValidateSession
```

### Usuarios

```http
GET    /api/Usuario/GetAll
GET    /api/Usuario/GetById/{id}
POST   /api/Usuario/Add
PUT    /api/Usuario/Update
DELETE /api/Usuario/Delete/{id}
PUT    /api/Usuario/UpdateEstatus
```

### Tareas

```http
GET    /api/Tarea/GetAll
GET    /api/Tarea/GetById/{id}
POST   /api/Tarea/Add
PUT    /api/Tarea/Update
DELETE /api/Tarea/Delete/{id}
```

### Filtros de tareas

Ejemplo:

```http
GET /api/Tarea/GetAll?idPrioridadTarea=3&idEstadoTarea=1
```

Los filtros son opcionales y pueden combinarse.

---

## Modelo de tarea

Cada tarea contiene:

```text
IdTarea
Título
Descripción
Estado
Prioridad
Usuario
Fecha de creación
Fecha de actualización
```

---

## Modelo de usuario

Cada usuario contiene:

```text
IdUsuario
Nombre
Apellido paterno
Apellido materno
Correo electrónico
PasswordHash
Imagen
Fecha de creación
Activo
```

---

## Autenticación

El flujo de autenticación funciona de la siguiente manera:

```text
Login
→ validación de credenciales
→ generación de access token
→ generación de refresh token
→ almacenamiento del refresh token
→ creación de cookies HttpOnly
```

Cuando el access token expira:

```text
Petición protegida
→ respuesta 401
→ Angular solicita RefreshToken
→ backend valida el refresh token
→ revoca el token anterior
→ genera tokens nuevos
→ repite la petición original
```

Al cerrar sesión:

```text
Logout
→ revocación del refresh token
→ eliminación de cookies
→ actualización del estado de autenticación
```

---

## Seguridad

El proyecto incluye:

- Hash de contraseñas con BCrypt.
- JWT con fecha de expiración.
- Cookies HttpOnly.
- Cookies Secure.
- Rotación de refresh tokens.
- Revocación de tokens.
- Protección de rutas.
- Consultas SQL parametrizadas.
- Eliminación lógica de usuarios.
- Validaciones en formularios.

Las consultas realizadas con parámetros de Entity Framework Core evitan concatenar datos directamente en las instrucciones SQL.

---

## Manejo de imágenes

Las imágenes de perfil:

- Se seleccionan desde Angular.
- Se previsualizan antes de guardar.
- Se envían como `multipart/form-data`.
- La API recibe el archivo como `IFormFile`.
- La API convierte el archivo a `byte[]`.
- SQL Server almacena la imagen como `VARBINARY(MAX)`.
- La API devuelve la imagen serializada en Base64.
- Angular muestra la imagen en el listado y formulario de edición.

---

## Validaciones

### Usuarios

- Nombre obligatorio.
- Apellido paterno obligatorio.
- Validación de caracteres.
- Correo electrónico válido.
- Contraseña segura.
- Imagen limitada a formatos permitidos desde Angular.

### Tareas

- Título obligatorio.
- Longitud máxima del título.
- Longitud máxima de la descripción.
- Estado obligatorio.
- Prioridad obligatoria.

---

## Manejo de errores

La aplicación contempla:

- Respuestas HTTP adecuadas.
- Mensajes de error enviados mediante el modelo `Result`.
- Manejo de errores HTTP en Angular.
- Estados de carga.
- Mensajes visuales con SweetAlert2.
- Confirmación antes de eliminar registros.
- Confirmación antes de cambiar el estatus de usuarios.

---


## Estado actual del proyecto

### Requisitos implementados

- CRUD de tareas.
- Consulta por ID.
- Listado de tareas.
- Filtros por estado y prioridad.
- API REST.
- Angular con TypeScript.
- Entity Framework Core.
- SQL Server.
- Arquitectura por capas.
- Repository Pattern.
- JWT.
- Refresh token.
- Swagger.
- Formularios reactivos.
- Manejo de carga y errores.
- SweetAlert2.
- CRUD de usuarios.
- Imágenes de usuario.

---

## Autor

Desarrollado por:

```text
Jorge Guevara Flores
```

Proyecto realizado como prueba técnica para demostrar conocimientos en:

- ASP.NET Core.
- Angular.
- SQL Server.
- Entity Framework Core.
- Arquitectura por capas.
- Autenticación JWT.
- Desarrollo de APIs REST.
