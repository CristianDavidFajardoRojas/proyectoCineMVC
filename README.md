# CineCampus

## ENV

MONGO_PROTOCOL =mongodb:// 
MONGO_USER =admin_cine
MONGO_PSW =cine
MONGO_HOST =172.16.106.71
MONGO_PORT =27017/CineCampus
MONGO_DB_NAME =CineCampus

## Descripción del Proyecto

CineCampus es una empresa de entretenimiento que busca ofrecer una experiencia cinematográfica personalizada y completa. Este proyecto tiene como objetivo desarrollar una base de datos en MongoDB que soporte las operaciones clave de la aplicación web de CineCampus. La base de datos gestionará la selección de películas, la compra de boletos, la asignación de asientos y la implementación de descuentos para usuarios con tarjeta VIP. Además, permitirá una administración eficiente de los diferentes roles de usuario, asegurando que cada interacción dentro de la plataforma sea segura y adecuada según el nivel de acceso del usuario.

## Objetivo

El objetivo principal de este proyecto es diseñar y desarrollar una base de datos en MongoDB que sea capaz de gestionar todas las funcionalidades clave de la aplicación web de CineCampus. Esto incluye:

- Gestión de la selección de películas.
- Procesamiento de la compra de boletos.
- Asignación y gestión de asientos.
- Implementación de un sistema de descuentos para usuarios con tarjeta VIP.
- Soporte para diferentes roles de usuario y niveles de acceso.


---



# Métodos y usos:

## getAllPeliculasCartelera

### Caso de uso:

- **Listar Películas:** Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

### Descripción

Este método recupera todas las películas que actualmente están en cartelera. Utiliza una consulta agregada para obtener las funciones asociadas a cada película, filtrando por la fecha actual para mostrar solo aquellas películas que están activamente en exhibición.

### Uso

```javascript

let obj = new cartelera();
obj.getAllPeliculasCartelera().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

Este método no recibe parámetros.

### Retorna

`Promise<Array<Object>>`: Una promesa que se resuelve con un array de objetos, donde cada objeto representa una película en cartelera con sus funciones asociadas. Los campos incluidos en cada objeto son:

- `titulo` (String): El título de la película.
- `fecha_estreno` (Date): La fecha de estreno de la película.
- `fecha_retiro` (Date): La fecha en que la película será retirada de cartelera.
- `sinopsis` (String): Una breve descripción de la trama de la película.
- `hora_inicio_funcion` (Date): La fecha y hora de inicio de la función.
- `hora_fin_funcion` (Date): La fecha y hora de finalización de la función.

### Errores

El método lanzará un error si la operación de consulta falla o si no se puede establecer una conexión con la base de datos.

---

## getPeliculaDetalles

### Caso de uso:

- **Obtener Detalles de Película:** Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

### Descripción

Este método recupera los detalles de una película específica en la base de datos, identificada por su ID.

### Uso

```javascript

let obj = new pelicula();
obj.getPeliculaDetalles("64f0e8c3a4d5f1b8d77e4c8b").then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `id` (String): El identificador único de la película que deseas consultar.

### Retorna

`Promise<Array<Object>>`: Una promesa que se resuelve con un array que contiene el objeto de la película que coincide con el ID proporcionado. El array contendrá un solo objeto si la película es encontrada.

### Errores

El método lanzará un error si la operación de consulta falla o si no se puede establecer una conexión con la base de datos.


---


## insertTicket

### Casos de uso:

- **Comprar Boletos:** Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
- **Reservar Asientos:** Permitir la selección y reserva de asientos para una proyección específica.
- **Aplicar Descuentos:** Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.
- **Procesar Pagos:** Permitir el procesamiento de pagos en línea para la compra de boletos.
- **Confirmación de Compra:** Enviar confirmación de la compra y los detalles del boleto al usuario.
  
### Descripción

Este método permite insertar un nuevo ticket en la base de datos para una función específica, reservando asientos para un cliente. Calcula el precio total basado en el tipo de asientos y aplica un descuento si el cliente tiene una suscripción.

### Uso

```javascript

let obj = new ticket();
obj.insertTicket("64a6c6b4e1d4a28b4c8b4578", "64a6c6b4e1d4a28b4c8b4567", [{fila: "B", numero: 2, tipo:"general"}]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `funcionId` (String): El identificador único de la función para la cual se está comprando el ticket.
- `clienteId` (String): El identificador único del cliente que está comprando el ticket.
- `arrayAsientos` (Array<Object>): Un array de objetos que representa los asientos que se desean reservar. Cada objeto debe tener los campos `fila`, `numero` y `tipo`.

### Retorna

`Promise<Object>`: Una promesa que se resuelve con el resultado de la operación de inserción. El resultado incluye los detalles especificos de el ticket que se agregó, haciendo simulación de la confirmación de la compra.

### Errores

- Lanza un error si algunos de los asientos solicitados no están disponibles.
- Lanza un error si la operación de inserción falla o si no se puede establecer una conexión con la base de datos.

---

## getAsientosDisponibles:

### Caso de uso:

- **Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

### Descripción

Este método recupera la información sobre los asientos disponibles para una función específica. Utiliza una consulta agregada para obtener los asientos que están libres en la sala correspondiente a la función solicitada.

### Uso

```javascript

let obj = new asientos();
obj.getAsientosDisponibles('64a6c6b4e1d4a28b4c8b4578').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `funcionId` (String): El identificador único de la función para la cual deseas obtener la disponibilidad de asientos.

### Retorna

`Promise<Object>`: Una promesa que se resuelve con un objeto que contiene la información sobre los asientos disponibles. El objeto incluye los siguientes campos:

- `pelicula_id` (ObjectId): El identificador de la película.
- `fecha_hora_inicio` (Date): La fecha y hora de inicio de la función.
- `fecha_hora_fin` (Date): La fecha y hora de finalización de la función.
- `asientos_disponibles` (Array<Object>): Un array de objetos que representan los asientos disponibles en la sala. Cada objeto incluye información como fila, número y tipo de asiento.

### Errores

El método lanzará un error si la operación de consulta falla o si no se puede establecer una conexión con la base de datos.

---

## verificarSuscripcion

### Caso de uso:

 - **Verificar Tarjeta VIP:** Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.

### Descripción

Este método verifica si una suscripción existe en la base de datos utilizando su ID. Recupera los detalles de la suscripción si se encuentra, o lanza un error si no se encuentra.

### Uso

```javascript

let obj = new suscripcion();
obj.verificarSuscripcion('64a6c6b4e1d4a28b4c8b4572').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `suscripcionId` (String): El identificador único de la suscripción que deseas verificar.

### Retorna

`Promise<Object>`: Una promesa que se resuelve con el objeto de la suscripción correspondiente al ID proporcionado. Si la suscripción no existe, se lanza un error.

### Errores

- Lanza un error si la suscripción con el ID proporcionado no existe en la base de datos.
- Lanza un error si la operación de consulta falla o si no se puede establecer una conexión con la base de datos.


---


## agregarUsuarioConRol

### Caso de uso:

 - **Crear Usuario:** Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).

### Descripción

Este método agrega un nuevo usuario con un rol específico a la base de datos y crea un documento de cliente en la colección correspondiente. El usuario se crea con los detalles proporcionados y se asigna un rol en la base de datos "CineCampus".

### Uso

```javascript

let obj = new user();
obj.agregarUsuarioConRol({
    user: "pruebaNuevoUser",
    apellido: 'queso',
    pwd: 'asdasd',
    rol: 'cliente',
    email: 'asdasdasda@gmail.com',
    telefono: '1234567890',
    suscripcion_id: null
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `objetoDeUsuario` (Object): Un objeto que contiene los detalles del usuario a agregar. Debe incluir los siguientes campos:
  - `user` (String): Nombre de usuario para el nuevo usuario.
  - `pwd` (String): Contraseña para el nuevo usuario.
  - `rol` (String): Rol que se asignará al usuario en la base de datos.
  - `apellido` (String): Apellido del usuario.
  - `email` (String): Correo electrónico del usuario.
  - `telefono` (String): Número de teléfono del usuario.
  - `suscripcion_id` (String): ID de la suscripción del usuario (si aplica).

### Retorna

`Promise<Object>`: Una promesa que se resuelve con el resultado de la operación de inserción en la colección `cliente`. El resultado incluye detalles sobre la inserción, como el identificador único del nuevo documento.

### Errores

- Lanza un error si la operación de creación de usuario o la inserción en la colección `cliente` falla.
- Lanza un error si no se puede establecer una conexión con la base de datos.

---

## obtenerRolesUsuario

### Caso de uso:

 - **Obtener Detalles de Usuario:** Permitir la consulta de información detallada sobre un usuario, incluyendo su rol.

### Descripción

Este método recupera la información de roles de un usuario específico en la base de datos. Utiliza un comando para obtener los detalles de usuario, incluyendo sus roles asignados.

### Uso

```javascript

let obj = new user();
obj.obtenerRolesUsuario('pruebaNuevoUser').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `nombreUsuario` (String): El nombre del usuario para el cual deseas obtener la información de roles.

### Retorna

`Promise<Object>`: Una promesa que se resuelve con un objeto que contiene la información del usuario, incluyendo sus roles. El objeto incluye detalles como el nombre de usuario y los roles asignados.

### Errores

- Lanza un error si el usuario con el nombre proporcionado no existe en la base de datos.
- Lanza un error si la operación de consulta falla o si no se puede establecer una conexión con la base de datos.

---

## actualizarRol

### Caso de uso:

 - **Actualizar Rol de Usuario:** Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).

### Descripción

Este método actualiza el rol de un usuario en la base de datos. Basado en la existencia de una suscripción asociada al usuario, se asigna un nuevo rol (`cliente` o `cliente_vip`). Además, actualiza la suscripción del usuario si es necesario.

### Uso

```javascript

let obj = new user();
obj.actualizarRol('pruebaNuevoUser').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `nombreUsuario` (String): El nombre del usuario cuyo rol deseas actualizar.

### Retorna

`Promise<Object>`: Una promesa que se resuelve con el resultado de la operación de actualización del rol. El resultado incluye detalles sobre la operación, como el estado (`ok` y `message`).

### Errores

- Lanza un error si la operación de actualización falla o si no se puede establecer una conexión con la base de datos.
- Lanza un error si el usuario no existe en la colección `cliente`.

---

## listarUsuariosPorRol

### Caso de uso:

 - **Listar Usuarios:** Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).

### Descripción

Este método lista todos los usuarios en la base de datos que tienen un rol específico. Utiliza un comando para obtener la información de todos los usuarios y filtra aquellos que tienen el rol solicitado.

### Uso

```javascript

let obj = new user();
obj.listarUsuariosPorRol('cliente').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```

### Parámetros

- `rol` (String): El rol que deseas buscar entre los usuarios.

### Retorna

`Promise<Array<Object>>`: Una promesa que se resuelve con un array de objetos, donde cada objeto representa un usuario que tiene el rol especificado. Cada objeto incluye detalles del usuario y los roles asignados.

### Errores

- Lanza un error si la operación de consulta falla o si no se puede establecer una conexión con la base de datos.

