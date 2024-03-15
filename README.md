# Superheroes

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión `17.0.5`.

## Development server

Ejecute `npm install` y entonces `npm run start:both` para los dos servidores de desarrollo. Navegue a `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Prueba técnica frontend

Se debe utilizar la última versión LTS de Angular.

La prueba consiste en desarrollar una aplicación SPA que permita gestionar un mantenimiento de súper héroes, se valorarán tanto la estructura del proyecto, el formato, la optimización y el tipado del código, se debe crear el proyecto teniendo en cuenta que podría crecer en un futuro.
La aplicación debe contener al menos las siguientes vistas y se valora positivamente la navegación entre las mismas:

## Filtro y listado
• Input para filtrado por nombre de héroes, se valora la gestión de los eventos para minimizar las veces que se lanza el filtrado.
• Botón editar, navegará a la página de edición mostrando los datos del héroe seleccionado.
• Botón nuevo héroe, navegará a la página de creación de héroes.
• El nombre de los héroes del filtrado debe `mostrarse` con la primera letra en mayúsculas.
• Botón de borrar héroes, preguntará si se está seguro de que se desea borrar el héroe y, al confirmarlo, lo borrará.

## Crear / Editar
• Formulario con los campos necesarios para la creación / edición.
• Al crear/editar un héroe, navegar al listado de héroes.
• El campo de nombre de los héroes debe mostrarse en mayúsculas.

## Otros elementos:
• `Servicio:` se permite tanto mockear los datos como la conexión con una API (real o) pero en caso de tener los datos en el servicio, se debe simular las llamadas a la API mediante observables.
• `Loader:` Al obtener los datos se debe mostrar un loader informando al usuario de que los datos se están cargando.
• `Notificaciones:` Al crear / modificar / eliminar un elemento o en caso de error, mostrar mensaje informativo al usuario.

## Se valora positivamente:
1. Utilizar una librería visual como podría ser `Angular material`.
2. Añadir `tests`.
3. Uso de `programación reactiva`.
4. Modularización de los componentes

La prueba se debe presentar en un `repositorio de Git`.