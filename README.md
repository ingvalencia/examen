## Registro de País y Estado

Este proyecto es una aplicación web para el registro de países y sus respectivos estados. Permite agregar, editar y eliminar países y estados utilizando una API RESTful en el backend y una interfaz de usuario construida con React en el frontend.

## Funcionalidades

- Registro de países y estados
- Edición de nombres de estados
- Eliminación de países y estados
- Selección de un país para ver sus estados asociados

## Tecnologías Utilizadas

- React: Una biblioteca de JavaScript para construir interfaces de usuario.
- Axios: Un cliente HTTP basado en promesas para realizar solicitudes a la API RESTful.
- SweetAlert2: Una biblioteca de JavaScript para crear bonitas alertas modales.
- PHP: Lenguaje de programación utilizado para el backend de la API RESTful.
- MySQL: Sistema de gestión de bases de datos utilizado para almacenar información sobre países y estados.

## Configuración del Proyecto

1. Clona el repositorio:

git clone https://github.com/ingvalencia/examen.git

2. Instala las dependencias del frontend:

  -cd examen
  -npm install


3. Configura el backend:

   - Asegúrate de tener un servidor web configurado (como Apache o Nginx) con PHP y MySQL.
   - Importa la base de datos desde `examen/BD/examen.sql`.
   - Actualiza la configuración de conexión a la base de datos en `backend/config.php`.

4. Inicia el frontend:

  -npm start

## Evidencias

1. Prueba de los EndPoints

-Consulta:   
![postman_consultar](https://github.com/ingvalencia/examen/assets/68766893/1639dd65-f208-4dae-87b1-fe0fa5a3b1f9)

-Insertar:
![postman_agregar](https://github.com/ingvalencia/examen/assets/68766893/7f36b912-acf8-4c02-923c-2a3285788274)

-Actualizar:
![postman_actualizar](https://github.com/ingvalencia/examen/assets/68766893/8dd4b6ea-6fcb-490f-846e-d5cf93c3b625)

-Eliminar:
![postman_eliminar](https://github.com/ingvalencia/examen/assets/68766893/c8195dee-b256-4b28-883e-9c481328610d)

2.  Accediendo a la aplicación desde localhost
![inicio](https://github.com/ingvalencia/examen/assets/68766893/c1fcc022-68d3-43c1-ba87-a644a119df55)

3.  Registro del Pais
![registro](https://github.com/ingvalencia/examen/assets/68766893/9b285172-dfd1-474f-a379-93fc5be50087)

4. Consulta de los Paises
![consulta](https://github.com/ingvalencia/examen/assets/68766893/c0bcd289-ffee-4bcc-9dab-18e1a06cb038)

5. Registro de los Estados por Pais 

![estadoregistro](https://github.com/ingvalencia/examen/assets/68766893/7d41b125-7540-4543-a4a6-1de4d562508f)

6.  Consulta de los Estados por Pais
![consultaestados](https://github.com/ingvalencia/examen/assets/68766893/141242b4-1983-4b39-8808-5b1f5c54bf91)

7.  Actualización de los Estados por Pais
![editarestados](https://github.com/ingvalencia/examen/assets/68766893/3e919a0f-75f5-432f-8087-fa2db12edb87)

8.  Eliminar Estados por Pais
![eliminarestado](https://github.com/ingvalencia/examen/assets/68766893/91730a4b-109f-452b-b5ce-88f1c307121c)

   
