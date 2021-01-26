# Calendar app

- Estructura y diseño de nuestra aplicación de Calendario
- Uso de componentes de terceros
- Modals
- Configuración de Redux
- CRUD local
- Preparación de pantallas para futuras secciones
- Uso de MomentJS
- Manejo de fechas

Esta app es el inicio de nuestro MERN, (Mongo Express React Node), luego crearemos nuestro backend y después regresaremos
a esta app para conectarla y desplegarla en producción


Se ha generado con > `npx create-react-app calendar-app`

Es mejor usar Chrome como navegador para desarrollo, Brave da problemas

La aplicación se inicia con `npm start`


## Preparación

En `src` borramos todo salvo el `index.js` y éste lo limpiamos y lo dejamos al mínimo

Instalamos Bootstrap

Instalamos FontAwsome

Creamos el componente principal `src/CalendarApp.jsx`, usamos el snippet `rafc`

Creamos una serie de componentes

`src/components/auth/LoginScreen.jsx` usamos el snippet `rafc`
`src/components/calendar/CalendarScreen.jsx` usamos el snippet `rafc`
`src/routers/AppRouter.jsx` usamos el snippet `rafc`

En `CalendarApp.jsx` colocamos <AppRouter />


## React big calendar

Instalamos `react-big-calendar` de `https://www.npmjs.com/package/react-big-calendar`

> `npm install --save react-big-calendar`

Instalamos `moment.js` > `npm install moment`

Vamos a `CalendarScreen.jsx` e importamos ambos paquetes. Configuramos el calendario.

Creamos `src/styles.css` nuestra hoja de estilos principal, creamos algunos estilos para el calendario

Creamos `src/helpers/calendar-messages-es.js` con las traducciones al español y lo importamos en `CalendarScreen.jsx`


## Rutas principales

Instalamos React Router DOM `https://reactrouter.com/web/guides/quick-start` > `npm install react-router-dom`

Los routers son componentes funcionales también. Copiamos el ejemplo de la documentación y lo pegamos en `AppRouter.js` y lo ajustamos

Creamos las rutas a <LoginScreen /> y a <CalendarScreen />


## LoginScreen y Navbar

Trabajamos el HTML de `LoginScreen.jsx` y creamos dos formularios, uno de login y otro de registro, deberían estar separados
pero para ver cómo se trabaja con varios formularios en el mismo componente los ponemos juntos

Creamos `src/components/ui/Navbar.jsx` y lo colocamos en `CalendarScreen.jsx`


## Personalizar el cuadro y disparar eventos del calendario

Creamos `src/components/calendar/CalendarEvent.jsx` es un componente funcional que recibe el evento como prop.

En `CalendarScreen.jsx` en <Calendar /> añadimos la propiedad components que igualamos a un objeto cuya propiedad event es `CalendarEvent`
como referencia.

La librería ofrece muchos eventos para botones, clicks, cambios de vista etc.

Guardamos en local storage la vista.

Ahora vamos a mantener el estado de una variable que cuando cambie, actualice las cosas, para ello vamos a usar el Hook useState
aplicamos la variable a la propiedad view del componente y usamos la función del Hook para actualizar el state

Si ahora recargamos la página, el componente lee del local storage y muestra la vista almacenada


## Creando una modal

Instalamos `react-modal` de `https://www.npmjs.com/package/react-modal` > `npm install --save react-modal`

Vamos a separar la lógica de la modal en un componente independiente `src/components/calendar/CalendarModal.jsx`

Ahora en `CalendarScreen.jsx` importamos y colocamos <CalendarModal />

De la documentación copiamos el código para configurar la modal. El componente <Modal> es un higher order component que dentro
contiene el HTML.

Instalamos `react-datetime-picker` de `https://www.npmjs.com/package/react-datetime-picker` > `npm install react-datetime-picker`

Instalamos Sweet Alert 2 > `npm i sweetalert2`




# Redux

Para la comunicación entre componentes vamos a trabajar con `Redux`

`Redux` es un patrón, un forma de trabajar. Hay quienes prefieren trabajar con el `Context` de `React`

Es un contenedor predecible del estado de una aplicación. Es decir, es una forma de controlar dónde se encuentra la información de una
aplicación en todo momento.

También ayuda a que la modificación de la información siempre sea en una sóla vía, de manera predecible, con el objeto de
prevenir cambios accidentales en la misma.

`Redux` no es propio de `React`, hasta ahora hemos hecho aplicaciones con `React`, controlando el estado de la aplicación pero sin `Redux`.

`Redux` se puede usar con `Angular`, `React`, `Vue`

Es una forma de mantener el estado de la aplicación independientemente del framework o librarías.

## Store

El `Store` en `Redux` es conocido como la fuente única de la verdad. Ahí está la información que los componentes van a consumir.

Si vovemos al `Reducer` de `React`, es una función pura que maneja un `Estado` (State), el `Estado` sirve la información a la vista para que
muestre la información deseada.

La vista no modifica el estado directamente, sólo lee, sólo está en modo lectura. Cuando se necesita hacer una modificación del
Estado la vista va a generar una `Acción` por ejemplo añadir un nuevo TODO.

Esta `Acción` va ser enviada al `Reducer` y éste sabrá qué hacer: Agregar, borrar o actualizar, después de que se ejecute esa `Acción` en
el `Reducer`, éste genera un nuevo Estado y es el Estado quien notifica a la vista de los cambios.

En Redux siempre vamos a tener un Estado (State) que va a ser proveído de datos, no por el `Reducer`, sino por el Store.

Nuevamente la vista no modifica el estado directamente, sólo lee. Cuando se necesita hacer una modificación del Estado la vista va a
generar una `Acción`.

Esta `Acción` va ser enviada a algo que se llama `Dispatcher`, éste va a recibir la `Acción`, la analiza y la envía a un `Reducer` especial.

Este `Reducer` especial es una combinación de todos los `Reducer`s que va a tener la aplicación: el `Reducer` para manejar la autenticación,
el `Reducer` de los TODOS, el `Reducer` de las tareas pendientes.

El `Reducer` especial simplemente contiene un montón de `Reducer`s pequeños, el `Dispatcher` recibe la `Acción` y tras analizarla escoge el
`Reducer` pequeño que va a ejecutar dicha `Acción` y esto genera un nuevo `Estado` (State) y éste notifica a la vista.

Todo este proceso es sólo válido para Acciones síncronas, no vale para peticiones asíncronas como peticiones Http.

En el caso de que el `Dispatcher` reciba una tarea asíncrona por ejemplo un login, se implementa un `Middleware` que forma parte del `Dispatcher`,
se pueden tener muchos `Middleware`s.

El `Middleware` recibe la tarea asíncrona, la ejecuta y espera a recibir la respuesta, cuando la recibe el `Dispatcher` del que forma parte,
la envía ya de forma síncrona al `Reducer` Principal que escoge el `Reducer` pequeño que modifica el `Estado` y el `Estado` notifica a la vista del cambio.

El `Store` tiene toda la información en todo momento.


## Instalar Redux en nuestra app

Documentación oficial de Redux: `https://es.redux.js.org/`

Documentación React Redux: `https://react-redux.js.org/`

> `npm install redux react-redux` Instalamos las dos cosas

### Action Types

Creamos types para que nos ayude con el tipo de las acciones > `src/types/types.js`

Es un objeto con strings que identifican el reducer que se va a emplear y nos ayuda en los `cases` del switch

### UI Reducer

Creamos `src/reducers/uiReducer.js` con su switch y `cases`

### rootReducer

Creamos `src/reducers/rootReducer.js` que es la combinación de todos los reducers, aquí iremos añadiendo los reducers que vayamos
creando

### Store

Ahora creamos el Store `src/store/store.js` y ahora lo importamos en `JournalApp.js` y lo implementamos igual que el Context

En la app corriendo vemos en el Inspector > Redux un enlace a las instrucciones `https://github.com/zalmoxisus/redux-devtools-extension#usage`

De la parte de Basic store copiamos `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()` y lo añadimos a `store.js`

También importamos `compose`

Ahora React sabe que tiene un Store y en el inspector > Redux > State vemos la propiedad `ui` fruto de nuestro primer Reducer `uiReducer`



## Middleware

Tendremos tareas asíncronas por lo que hay que aplicar un Middleware que ejecute la tarea, espere a que se resuelva y cuando se resuelva
llama al Dispatcher con una nueva Acción síncrona y el proceso ya sigue de manera habitual para al final generar un nuevo State.


Necesitamos instalar el paquete Redux Thunk `https://www.npmjs.com/package/redux-thunk`

Thunk es un Middleware encargado de hacer esta parte > `npm install --save redux-thunk`

Ahora hacemos la configuración en `store.js` importando `thunk`

Tenemos instrucciones aquí `https://github.com/zalmoxisus/redux-devtools-extension#usage`, tenemos que modificar nuestro createStore
usando `const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;`


## Mostrar y ocultar la Modal en base al State del Store

Creamos nuestra primera Acción `src/actions/uiActions.js` y dentro las dos acciones `uiOpenModalStoreAction` y `uiCloseModalStoreAction`

En `uiReducer.js` manejamos los `cases` para ambas acciones y los cambios del State.

En `CalendarScreen.jsx` importamos `useDispatch` para poder despachar Acciones y en la parte del doble click hacemos el dispatch de
la uiOpenModalStoreAction.

En `CalendarModal.jsx` importamos `useDispatch` para poder despachar Acciones y en la parte del cerrado de la modal hacemos dispatch
de `uiCloseModalStoreAction`.


## Calendar Reducer y primeras acciones con los eventos

Creamos `src/reducers/calendarReducer.js` con un initial state y lo añadimos a `rootReducer.js`

Vamos a `types.js` y añadimos dos Acciones que aun no han sido creadas.

Ahora creamos `src/actions/calendarActions.js` y creamos las dos acciones.

En `calendarReducer.js` manejamos los `cases` para ambas acciones y los cambios del State.

En `CalendarScreen.jsx` ya tenemos `useDispatch` para poder despachar Acciones y en la parte del select event hacemos el dispatch de
la `eventSetActiveStoreAction`.

Ya podemos ver en el inspector de Redux el evento activo cuando lo seleccionamos


## Añadir un nuevo evento

Vamos a crear un Fab (Floting action button) para que abra la modal y podamos añadir un nuevo evento `src/components/ui/AddNewFab.js`
manejamos el click haciendo un dispatch de `uiOpenModalStoreAction`

Vamos a `CalendarScreen.jsx` y añadimos el botón

En `CalendarModal.jsx` vamos al handler del submit y hacemos el dispatch de `eventAddNewEventStoreAction` pasándole formValues y añadiendo de
forma temporal un id que más adelante tendremos de la bbdd

Ahora en `calendarReducer.js` manejamos el `case` para `eventAddNewEventStoreAction` y añadimos el nuevo evento al arreglo de eventos del State.


## Mostrar eventos en el calendario

Ya podemos añadir eventos nuevos al State, ahora vamos a mostralos en el calendario.
Vamos a `CalendarScreen.jsx` y vamos a leer de State del Store los eventos con el Hook useSelector.

Una vez añadido un nuevo evento, al cerrarse la modal debemos limpiar los campos de la modal, para que no aparezcan con datos al
abrirla de nuevo. Y también debemos borrar el activeEvent, para ello creamos un nuevo type y una nueva Acción en `calendarActions.js`
y el `case` en el reducer. Ahora hacemos el dispatch en `CalendarModal.jsx` en el handler que cierra la modal

Ahora al hacer doble click se abre la modal y queremos que aparezcan los datos en los campos, como los datos están en el evento
activo podemos leerlos de ahí, usaremos un Efecto que esté pendiente de los cambios de activeEvent, lo establecemos en `CalendarModal.jsx`


## Editar el evento activo

Creamos un nuevo type y una nueva Acción en `calendarActions.js` y el `case` en el reducer. Ahora en `CalendarModal.jsx` en `handleSubmit`
comprobamos si tenemos un activeEvent, si lo tenemos hacemos el dispatch de la nueva Acción, si no lo tenemos que se haga el dispatch
de la acción que crea un nuevo evento.


## Borrar el evento seleccionado

De forma muy similar a editar. Creamos un botón de borrar `src/components/ui/DeleteFab.jsx`, lo colocamos en `CalendarScreen.jsx`, 
el botón sólo se muestra si hay un evento activo.


## Quitar el botón de borrar evento si hago click fuera 

Hay que añadir propiedades a <Calendar /> selectable y onSelectSlot


# En

En este punto ya tenemos nuestro backend terminado y corriendo en local.


## Crear variables de entorno

Cremos en raíz `.env.development` y `.env.production` y ponemos las url del backend

Bajamos y levantamos el servidor de desarrollo local de nuevo


## Manejo de autenticación y del estado de la autenticación del usuario

Creamos `src/reducers/authReducer.js` y hacemos el cascarón inicial donde el switch retorna `state` con el `initialState`

Lo añadimos a `rootReducer.js` y ahora ya lo vemos en el Inspector > Redux > State > auth

Vamos a definir los types de autenticación en `types.js`

Vamos a reutilizar nuestro custom Hook `useForm.js` de aplicaciones pasadas y lo ponemos en `src/hooks/useForm.js`

Vamos a `LoginScreen.jsx` e implementamos nuestro custom Hook `useForm.js`, manejamos el submit con un handler
ponemos los valores en los campos y el onChange según nuestro useForm. También hay que poner el name a los campos o no
podremos escribir.

Ya estamos en el punto de crear una Acción que envíe los datos del login al backend, hacer el dispatch, modificar el Store.

Creamos `src/actions/authActions.js` y nuestra primera Acción `authStartLoginAction` que recibe como argumentos email y password


## Realizar peticiones HTTP para autenticarnos

Creamos en `src/helpers/fetchHelper.js` un primer helper `fetchWithoutToken` que importamos en `authActions.js` y lo
implementamos en nuestra Acción `authStartLoginAction`

Recibimos el OK y el token generado por el backend, lo guardamos en el local storage y también la fecha

Ahora tenemos que hacer el dispatch de una Acción nueva que modifica el State en `authActions.js`

Vamos a `authReducer.js` y manejamos el `case` que cambia el State


## Añadir un usuario nuevo

Es muy parecido al proceso de login, vamos a `LoginScreen.jsx`, extraemos las const por desestructuración, ponemos los valores
en los campos y el onChange según nuestro useForm. También hay que poner el name a los campos o no podremos escribir.

Manejamos el submit del formulario de registro con un handler y en él primero verificamos que los passwords coincidan, 
si coinciden realizamos el dispatch de una Acción nueva en `authActions.js`, esta Acción dispara la función `fetchWithoutToken`,
la misma que utilizamos en el login pero con parámetros diferentes, una vez registrado el usuario con éxito realizamos
el login del mismo que modifica el State del usuario.


# Mantener el estado de autenticación

Vamos a crear una Acción nueva `authStartCheckingTokenAction` en `authActions.js` que valide y renueve el token

En `fetchHelper.js` creamos una función muy parecida a la anterior pero con la diferencia de que sí vamos a manejar el token
que vamos a leer del local storage y enviamos en los headers.

Ahora es momento de llamar esta función desde `authActions.js`, sólo necesita el token, no recibe otros datos.

Si todo va bien grabamos el nuevo token en local storage y hacemos el dispatch de login que actualiza el State del usuario

Si falla se dispara otra función que actualiza el State del usuario

Ahora debemos llamar a `authStartCheckingTokenAction`, lo podemos hacer desde `index.js` o desde `CalendarScreen.jsx` pero
lo vamos a hacer desde `AppRouter.jsx` que es donde vamos a decidir si dejamos pasar al usuario al Calendario o le mandamos
al login


## Protección de nuestras rutas

Vamos a reutilizar las `PrivateRute.js` y `PublicRoute.js` del proyecto Journal App y las ponemos en `routers` y en `PrivateRute.js`
ajustamos Redirect y añadimos a ambos camponentes la propiedad `isAuthenticated`

Si estamos autenticados y tratamos de ir al login nos llevará directamente al Calendario y si no estamos autenticados
y tratamos de ir directamente al Calendario nos llevará al login.


## Logout y nombre de usuario en Navbar

Vamos a `Navbar.jsx` leemos del Store la propiedad name

Manejamos el click del logout con un handler que hace el dispatch de una Acción que tenemos que crear en `authActions.js`

Esta función borra datos del local storage, entre ellos el token y hace dispatch de otra función que borra el `uid` y el `name` del State.

Como `AppRouter.jsx` está pendiente de cambios en el `uid` redibuja el componente y nos envía al login.


# CRUD de eventos

Vamos a hacer persistentes nuestros cambios y eventos del calendario utilizando nuestro backend, disparando acciones asíncronas que terminan ejecutando las acciones síncronas que habíamos definido anteriormente.

## Crear un nuevo evento en el calendario

Creamos una Acción nueva `eventStartAddNewEventAction` asíncrona que usa la función `fetchWithToken` porque la ruta del backend
necesita el token.

Hacemos el dispatch de la función síncrona existente `eventAddNewEventStoreAction`, esta función necesita el `id` y el `user`, el primero
lo obtenemos de la respuesta del backend y el segundo lo construimos leyendo del State con `getState`


## Mostrar los eventos de la base de datos

Añadimos el tipo `eventAllLoaded` a `types.js`


Invocamos `eventStartLoadAllEventsAction` en `CalendarScreen.jsx` la primera vez que se carga el componente, para ello usaremos
un Effect que hace el dispatch de `eventStartLoadAllEventsAction`

Vamos a crear un helper `src/helpers/adjustEventsDates.js` que pasará las fechas de string a tipo Date usando `moment` y pasando
el arreglo de eventos por `map`.

Ahora pasamos el arreglo de eventos por el helper en `calendarActions.js` justo antes de hacer el dispatch de `eventLoadAllEventsAction`

Vemos los eventos en el calendario traidos de la base de datos, aunque cambiemos de usuario en el login vemos todos los eventos.

Vamos a poner los eventos del usuario logueado de un color y los demás de otro, para ello vamos a `CalendarScreen.jsx` y leemos
del Store el `uid` y compararlo con el _id del user del evento de base de datos.


# Actualizar un evento de la base de datos

Creamos una nueva Acción en `calendarActions.js` que inicia el update de un evento en base de datos `eventStartUpdateEventAction`,
es asíncrona y utilizamos `fetchWithToken`, si recibimos un ok de la base de datos hacemos el dispatch de `eventUpdateStoreAction`
que modifica el State. El `calendarReducer.js` no hace falta modificarlo, ya manejamos el `case` de antes.

En `CalendarModal.jsx` cambiamos la función del dispatch del handler por la nueva Acción `eventStartUpdateEventAction`


## Borrar un evento de la base de datos

Creamos una nueva Acción en `calendarActions.js` que inicia el borrado de un evento en base de datos `eventStartDeleteAction`,
es asíncrona y utilizamos `fetchWithToken`, si recibimos un ok de la base de datos hacemos el dispatch de `eventDeleteStoreAction`
que modifica el State. El `calendarReducer.js` no hace falta modificarlo, ya manejamos el `case` de antes.

En `CalendarModal.jsx` cambiamos la función del dispatch del handler por la nueva Acción `eventStartUpdateEventAction`


## Limpiar el calendario al logout

Creamos una nueva Acción `eventClearCalendarStoreAction` en `calendarActions.js` que retorna un objeto con un nuevo tipo `eventClearCalendarStore`, se lo
enviamos al reducer donde manejamos el case dejando el calendario con los valores iniciales.

En `authActions.js` en `startLogoutAction` realizamos el dispatch de `eventClearCalendarStoreAction`.


# Generar la versión de producción

> `npm run build`

La aplicación se genera en una carpeta nueva `build`

Podemos subir el contenido de esta carpeta a cualquier hosting, no tiene porque estar en el mismo hosting del backend.

Pero nosotros lo alojaremos en la carpeta public de nuestro backend en Heroku



# GIT

En nuestra cuenta de github creamos un repositorio

Si no tenemos repositorio git local lo creamos > `git init`

Si no tenemos archivo `.gitignore` lo creamos, especialmente para evitar `node_modules`

Añadimos los cambios a GIT> `git add .`
Commit > `git commit -m "Primer commit"`

Si en este punto borro accidentalmente algo puedo recuperarlo con > `git checkout -- .`

Que nos recontruye los archivos tal y como estaban en el último commit.

Enlazamos el repositorio local con un repositorio externo en GitHub donde tenemos cuenta y hemos creado un repositorio
`git remote add origin https://github.com/Awandor/react-redux-calendar-CRUD-app.git`

Situarnos en la rama master > `git branch -M master`

Subir todos los cambios a la rama master remota > `git push -u origin master`

Para reconstruir en local el código de GitHub nos bajamos el código y ejecutamos `npm install` que instala todas las dependencias


## Tags y Releases

Crear un tag en Github y un Release

> `git tag -a v1.0.0 -m "Versión 1 - Lista para producción"`

> `git tag` muestra los tags

> `git push --tags` > sube los tags al repositorio remoto

En github vamos a Tags > Add release notes


## Desplegar aplicación en GitHub Pages

Tenemos que hacer un pequeño cambio en las rutas de `index.html` del build, en vez de apuntar a la raíz del servidor deben de apuntar
al directorio que contiene `index.html` simplemente con `./`

Vamos github y creamos un nuevo repositorio, podemos hacer 2 cosas:
1. Crear un proyecto aparte sólo con el contenido de build y subirlo a github
2. Renombrar el directorio build a docs, así no será ignorado por `.gitignore` y GitHub Pages lo va a detectar como posible entrada a la app
y subimos toda la app a github

Ahora vamos acceder al repositorio como si fuera una página web

Vamos a Settings > GitHub Pages > Source > master branch > Save

La app es ahora accesible desde `https://awandor.github.io/...`


## 10 librerías interesantes de React

`https://blog.logrocket.com/top-10-react-component-libraries-for-2020/`





# Pruebas Unitarias y de Integración

Las pruebas unitarias están enfocadas en pequeñas funcionalidades mientras las pruebas de integración están enfocadas en cómo reaccionan
varias piezas en conjunto, el proceso de las pruebas se conoce como **AAA**: Arrange, Act, Assert

1. Arrange, es cuando preparamos el estado inicial: iniciamos variables, importaciones necesarias, preparamos el ambiente del sujeto a probar
2. Act, aplicamos acciones o estímulos sobre el sujeto a probar: llamamos métodos, simulamos clicks
3. Assert, observamos el comportamiento resultante y afirmamos que los resultados son los esperados


## Instalaciones de paquetes y configuración del entorno de pruebas

Creamos `src/setupTests.js`

### Enzyme

Enzyme es una utilidad para probar componentes de React, fue desarrollado por AirBnB y ahora es mantenido por Facebook

Documentación: `https://enzymejs.github.io/enzyme/`

A fecha de hoy no hay Enzyme para React 17 oficial, hay una versión no oficial en beta pero que nos va a servir: 
`https://github.com/wojtekmaj/enzyme-adapter-react-17`

La instalamos > `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17`

Lo importamos en `setupTests.js` según la documentación

### Snapshot

Ahora vamos a trabajar con Snapshot que toma una fotografía de lo que renderiza el componente en forma de datos y que son
almacenados en una carpeta autogenerada `_snapshots_`

Pero para poder trabajar con esos datos en Jest necesitamos instalar el paquete enzyme-to-json: `https://www.npmjs.com/package/enzyme-to-json`

> `npm install --save-dev enzyme-to-json`

Ahora en `setupTests.js` importamos `createSerializer` según la documentación

### Redux Mock Store

Como trabajamos con Redux tenemos un Store que debemos simular con un mock del Store `https://github.com/reduxjs/redux-mock-store`

> `npm install redux-mock-store --save-dev`


> `npm run test`


## Pruebas de types.js

Creamos `src/tests/types/types.test.js` comprobamos que el objeto types coincide con la muestra.


## Pruebas de fetchHelper.js

Creamos `src/tests/helpers/fetchHelper.test.js` para disparar `fetchWithoutToken` y `fetchWithToken` necesitamos crear `.env.test`
esperamos que la respuesta sea correcta. Hay que detener y volver a ejecutar > `npm run test`


## Pruebas de authActions.js

Creamos `src/tests/actions/authActions.test.js` hay que hacer varias configuraciones pues usamos acciones asíncronas que retornan funciones,
dispatch, local storage, sweet alert 2, Store de Redux


## Pruebas de uiReducer.js

Creamos `src/tests/reducers/uiReducer.test.js` probamos que se abre y se cierra la modal


## Pruebas de authReducer.js

Creamos `src/tests/reducers/authReducer.test.js` probamos los tres cases


## Pruebas de DeleteFab.js

Creamos `src/tests/components/ui/DeleteFab.test.jsx` hay que hacer varias configuraciones para crear el entorno. Un mock del Store y uno de
eventStartDeleteAction


## Pruebas de AppRouter.jsx

Creamos `src/routers/AppRouter.test.jsx` hay que hacer varias configuraciones para crear el entorno. Un mock del Store


## Pruebas en LoginScreen.jsx

Creamos `src/components/auth/LoginScreen.test.jsx` hay que hacer varias configuraciones para crear el entorno. Un mock del Store y de Sweet Alert 2


## Pruebas en CalendarScreen.jsx

Creamos `src/tests/components/calendar/CalendarScreen.test.jsx` hay que hacer varias configuraciones para crear el entorno. Un mock del Store,
mock de varias Acciones y mock de setItem del local storage, también tenemos que usar `act`


## Pruebas en la Modal y en DateTimePicker

Creamos `src/tests/components/calendar/CalendarModal.test.jsx`hay que hacer varias configuraciones para crear el entorno. Un mock del Store,
mock de varias Acciones, mock de setItem del local storage y un mock de Sweet Alert 2, también tenemos que usar `act`





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
