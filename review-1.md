# Servidor Lista de Tareas en Express

## ¿Qué es mi producto y para qué sirve?

Mi producto es una aplicación basada en Node.js que proporciona funcionalidades para administrar una lista de tareas. El objetivo de esta aplicación es permitir a los usuarios crear, editar y eliminar tareas, así como ver las tareas completas e incompletas de la lista.

## #¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?

Las funcionalidades más importantes de esta aplicación son las siguientes:

1. Agregar una nueva tarea: Los usuarios pueden utilizar esta funcionalidad para agregar nuevas tareas a su lista. Al proporcionar una descripción de la tarea, se crea un nuevo objeto de tarea con un ID único y se agrega a la lista. Los usuarios encontrarán útil esta funcionalidad para registrar nuevas tareas y organizar sus responsabilidades.

2. Eliminar una tarea: Esta funcionalidad permite a los usuarios eliminar una tarea existente de la lista. Al especificar el ID de la tarea a eliminar, la aplicación busca la tarea correspondiente en la lista y la elimina. Los usuarios pueden usar esta funcionalidad cuando hayan completado una tarea o cuando deseen eliminar una tarea que ya no sea relevante.

3. Actualizar una tarea: Los usuarios pueden actualizar los detalles de una tarea existente utilizando esta funcionalidad. Al proporcionar el ID de la tarea y los nuevos datos, la aplicación busca la tarea en la lista y actualiza su descripción y estado (completa o incompleta). Esta funcionalidad es útil cuando los usuarios desean modificar o corregir los detalles de una tarea existente.

4. Ver tareas completas: Esta funcionalidad permite a los usuarios ver las tareas que han marcado como completas. Al acceder a la ruta "/tareas/completas", la aplicación filtra la lista de tareas y devuelve solo las tareas que tienen el estado "completa". Los usuarios pueden utilizar esta funcionalidad para realizar un seguimiento de las tareas que han finalizado con éxito.

5. Ver tareas incompletas: Similar a la funcionalidad anterior, esta característica permite a los usuarios ver las tareas que aún no han completado. Al acceder a la ruta "/tareas/incompletas", la aplicación filtra la lista de tareas y devuelve solo las tareas que tienen el estado "incompleta". Los usuarios pueden utilizar esta funcionalidad para identificar las tareas pendientes y priorizar su trabajo.
