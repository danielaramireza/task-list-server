# Servidor Lista de Tareas en Express

## ¿Qué es mi producto y para qué sirve?

Mi producto es una aplicación basada en Node.js que proporciona funcionalidades para administrar una lista de tareas. El objetivo de esta aplicación es permitir a los usuarios crear, editar y eliminar tareas, así como ver las tareas completas e incompletas de la lista, y poner consultar una única tarea.

## #¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?

Las funcionalidades más importantes de esta aplicación son las siguientes:

1. Agregar una nueva tarea: Los usuarios pueden utilizar esta funcionalidad para agregar nuevas tareas a su lista. Al proporcionar una descripción de la tarea, se crea un nuevo objeto de tarea con un ID único y se agrega a la lista. Los usuarios encontrarán útil esta funcionalidad para registrar nuevas tareas y organizar sus responsabilidades.

2. Eliminar una tarea: Esta funcionalidad permite a los usuarios eliminar una tarea existente de la lista. Al especificar el ID de la tarea a eliminar, la aplicación busca la tarea correspondiente en la lista y la elimina. Los usuarios pueden usar esta funcionalidad cuando hayan completado una tarea o cuando deseen eliminar una tarea que ya no sea relevante.

3. Actualizar una tarea: Los usuarios pueden actualizar los detalles de una tarea existente utilizando esta funcionalidad. Al proporcionar el ID de la tarea y los nuevos datos, la aplicación busca la tarea en la lista y actualiza su descripción y estado (completa o incompleta). Esta funcionalidad es útil cuando los usuarios desean modificar o corregir los detalles de una tarea existente.

4. Ver tareas completas: Esta funcionalidad permite a los usuarios ver las tareas que han marcado como completas. Al acceder a la ruta "/tareas/completas", la aplicación filtra la lista de tareas y devuelve solo las tareas que tienen el estado "completa". Los usuarios pueden utilizar esta funcionalidad para realizar un seguimiento de las tareas que han finalizado con éxito.

5. Ver tareas incompletas: Similar a la funcionalidad anterior, esta característica permite a los usuarios ver las tareas que aún no han completado. Al acceder a la ruta "/tareas/incompletas", la aplicación filtra la lista de tareas y devuelve solo las tareas que tienen el estado "incompleta". Los usuarios pueden utilizar esta funcionalidad para identificar las tareas pendientes y priorizar su trabajo.

6. Consultar una tarea: Esta caracteristica permite a los usuarios consultar una única tarea utilizando el id de la misma. Al acceder a la ruta "/tareas/:id", la aplicación filtra la tarea seleccionada con ese id. Los usuarios pueden utilizar esta funcionalidad para ver en el detalle de una tarea específica.

Además, es importante resaltar el uso de los siguientes middlewares en la aplicación:

1. Middlewares de validación para solicitudes POST y PUT: Estos middlewares se utilizan para validar las solicitudes POST y PUT antes de procesarlas. Verifican si el cuerpo de la solicitud contiene la información necesaria y si los atributos cumplen con los requisitos, como tener una descripción válida. Estos middlewares garantizan que los datos enviados por los usuarios cumplan con las expectativas y ayudan a mantener la integridad de la lista de tareas.

2. Middleware a nivel de aplicación para gestionar los métodos HTTP válidos: Este middleware se utiliza para gestionar los métodos HTTP válidos. Se define una función que verifica el método de la solicitud y permite que las solicitudes POST, GET, PUT y DELETE pasen al siguiente middleware. Si se recibe un método no válido, como HEAD o OPTIONS, se devuelve una respuesta de error. Este middleware garantiza que solo se acepten y procesen los métodos HTTP adecuados para la funcionalidad de la aplicación.

3. Middleware del direccioandor list-view-router.js para gestionar parámetros correctos: Se verifica el valor del parámetro en la ruta y se permite que la solicitud continúe solo si el valor es "completas" o "incompletas". Si el valor del parámetro no es válido, se devuelve una respuesta de error. Este middleware asegura que solo se acceda a las rutas adecuadas y evita posibles errores en el manejo de las tareas.

4. Middleware JWT: Se implementó JWT en todas las rutas de nuestra API REST para restringir el acceso no autorizado y limitarlo a una lista selecta de usuarios registrados en la aplicación. Esto se logra mediante el uso del encabezado "Authorization" y validando la autenticidad del token JWT proporcionado por los usuarios autorizados. Esta implementación garantiza la seguridad de nuestros recursos y previene accesos indebidos o manipulaciones por parte de usuarios no autorizados.
