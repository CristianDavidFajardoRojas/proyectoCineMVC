# CineCampus

## Introducción

CineCampus es un proyecto diseñado para facilitar la adquisición de asientos para diferentes películas de manera cómoda y eficiente. A través de consultas y manipulaciones en una base de datos MongoDB, nuestro sistema permite a los usuarios seleccionar y reservar asientos con facilidad. En un entorno donde la experiencia del cliente es clave, CineCampus se asegura de que cada visita al cine sea fluida y agradable. Este README ofrece una visión general del sistema, sus características y los pasos para su implementación.


## Instalación

Para comenzar a utilizar CineCampus, primero es necesario instalar las dependencias del proyecto. Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu máquina. Luego, sigue estos pasos:

1. Instala las dependencias utilizando el siguiente comando:

   ```bash
   npm i
   ```

2. Para configurar el proyecto, necesitarás crear un archivo para las variables de entorno. Crea un archivo llamado `.env` en la raíz del proyecto y define las variables:

    ```bash
   EXPRESS_PROTOCOL=http://
    EXPRESS_HOST_NAME=localhost
    EXPRESS_PORT=5001
    EXPRESS_STATIC=src
    EXPRESS_KEY_SECRET=MyLlaveSecreta
    
    MONGO_PROTOCOL=mongodb://
    MONGO_USER=root
    MONGO_PSW=campus2023
    MONGO_HOST=172.16.102.60
    MONGO_PORT=27017
    
    MONGO_DB_NAME=CineCampus
    ```

3. Una vez que hayas configurado las variables de entorno y hayas instalado las dependencias, puedes inicializar la aplicación. En la consola, escribe el siguiente comando:

    ```bash
    npm run start
    ```

Una vez que hayas configurado las variables de entorno y hayas instalado las dependencias, puedes inicializar la aplicación en [http://localhost:5001](http://localhost:5001).

## Interfaz de la Aplicación
***
### Primera vista

![image](https://github.com/user-attachments/assets/a4e66fa2-3c19-46e7-a011-9f3dd031ecf6)


Al acceder a la aplicación, verás la página de inicio que incluye el logo de CineCampus en la parte superior. Justo debajo del logo, encontrarás dos botones: "Sign Up" y "Login". Estos botones te permitirán registrarte como nuevo usuario o iniciar sesión si ya tienes una cuenta. La interfaz es intuitiva y está diseñada para ofrecerte una experiencia fluida desde el primer momento.

***
### Registro

![image](https://github.com/user-attachments/assets/fff83dbc-f68f-43c1-b144-1d72d2dcf39c)

Al hacer clic en "Sign Up", serás llevado al apartado de registro, donde deberás ingresar la siguiente información:

- **Nombre**
- **Nickname**
- **Email**
- **Contraseña**

![image](https://github.com/user-attachments/assets/be166d08-d6ef-4d8d-bc16-3570aabefee8)

El formulario de registro incluye distintas validaciones para asegurar la creación de un usuario válido. Completa estos campos y sigue las instrucciones para crear tu cuenta y empezar a disfrutar de las funciones de CineCampus.

***
### Login

![image](https://github.com/user-attachments/assets/00249e60-0b71-4570-9a09-ba32982493e1)

Al hacer clic en "Login", accederás a la sección de inicio de sesión. Aquí deberás ingresar tus credenciales: 

- **Email**
- **Contraseña**

![image](https://github.com/user-attachments/assets/90e6021f-da80-4237-86e7-3e2e31f39554)

Este formulario también cuenta con diversas validaciones que aseguran que no podrás ingresar a la aplicación si no se cumplen los requisitos necesarios, como la correcta combinación de email y contraseña. Asegúrate de ingresar la información correcta para acceder a tu cuenta.

***
### Página Principal

![image](https://github.com/user-attachments/assets/e9274c21-f29b-4a3c-87df-367afdde91aa) ![image](https://github.com/user-attachments/assets/6360a872-10ec-4fdb-aaa4-7ee51b5d2c2c)


Una vez que hayas iniciado sesión, serás dirigido a la página principal del cine. En esta sección, podrás ver las películas actualmente disponibles para comprar asientos, así como una lista de películas que llegarán pronto. También tendrás la opción de buscar películas específicas, lo que te permitirá explorar fácilmente todas las opciones de entretenimiento y realizar tus reservas de manera sencilla.

***
### Detalles de las Películas

![image](https://github.com/user-attachments/assets/b881f55f-d00c-48ae-8b7c-15fd88a90bc4)![image](https://github.com/user-attachments/assets/dd35c26e-8d94-493b-81ff-6883147ebc2d)

Al seleccionar una película, podrás ver sus detalles, ya sea de las disponibles o de las que llegarán pronto. También hay un apartado para seleccionar la sala en la que se proyectará la película. Una vez que hayas seleccionado la sala, se habilitará un botón que te llevará a la sección de compra de asientos.

***
### Selección de Función y Asientos

![image](https://github.com/user-attachments/assets/7a29e4e5-ac76-4827-ba28-efd89705765e)

En esta sección, los usuarios pueden visualizar los días en los que se presentará la película seleccionada. Al elegir un día específico, se desplegarán las horas disponibles para esa fecha. Una vez que se haya seleccionado la hora, se mostrará un esquema de asientos, donde se diferenciarán claramente los asientos disponibles y los ocupados. Los asientos seleccionados se marcarán en rojo para una fácil identificación. 

![image](https://github.com/user-attachments/assets/dccebaa1-76ca-4c75-8150-38d7a2b1db75)

Una vez que el usuario haya elegido los asientos deseados, se habilitará un botón que redireccionará a la sección de detalles de compra y confirmación de pago, facilitando así una experiencia de usuario fluida y eficiente en el proceso de reserva.

![image](https://github.com/user-attachments/assets/2646dac8-2fc3-47aa-9f3b-4ea6dba63496)



