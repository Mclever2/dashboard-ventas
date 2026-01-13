# LiquiData Analytics

LiquiData Analytics es una plataforma de visualización de datos en tiempo real diseñada para el monitoreo de ventas en el sector de bebidas. El sistema permite la gestión de indicadores comerciales bajo dos dimensiones principales que son Categoría y Marca.

El objetivo principal de la aplicación es proporcionar una interfaz reactiva donde la entrada de datos impacta inmediatamente en la visualización gráfica. El usuario puede registrar ventas nuevas mediante un formulario dedicado y analizar el rendimiento a través de filtros dinámicos. Por ejemplo al seleccionar la categoría Aguas el sistema restringe automáticamente las opciones de marcas a San Luis y San Mateo asegurando la integridad de los datos visualizados.

Stack Tecnológico
El proyecto está construido sobre una arquitectura robusta utilizando versiones específicas para garantizar estabilidad y compatibilidad empresarial.

Framework Frontend: Angular 9.0.7

Lenguaje: TypeScript

Interfaz de Usuario: Ng-Zorro Ant Design

Visualización de Datos: G2Plot

Backend y Persistencia: Firebase Firestore

Modelado de Datos: FireORM

Entorno de Ejecución: Node.js 12.22.9

Guía de Configuración del Entorno
Debido a que este proyecto utiliza Angular 9 es estricto el uso de una versión compatible de Node.js para evitar errores de compilación relacionados con node-sass y otras dependencias nativas. Siga estos pasos secuenciales para replicar el entorno de desarrollo correctamente.

1. **Gestión de Versiones de Node**
El proyecto no funcionará con versiones actuales de Node como la v20 o v22. Es necesario utilizar nvm para gestionar la versión.

    nvm install 12.22.9
    nvm use 12.22.9

2. **Instalación de Dependencias**
Una vez activo Node 12 proceda a instalar las librerías del proyecto.

    npm install

3. **Corrección de Compatibilidad**
En ciertos entornos de Windows la compilación puede requerir la librería querystring de forma explícita. Ejecute el siguiente comando para asegurar la estabilidad del servidor de desarrollo.

    npm install querystring

4. **Configuración de Firebase**
Instalamos una version compatible de firebase 

    npm install firebase@8.10.1 @angular/fire@6.0.4 --save

El proyecto requiere las credenciales de conexión a la base de datos.
Cree un proyecto en Firebase Console.
Habilite Firestore Database en modo prueba.
Copie las credenciales de configuración web.
Pegue las credenciales en el archivo src/environments/environment.ts.


# DashboardVentas

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
