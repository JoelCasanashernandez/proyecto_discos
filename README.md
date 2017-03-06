##SuperSonido

Desarrollo de una aplicación web ASP.NET **SuperSonido MVC Version 1.0**

Se trata de una web de música en donde un usuario pueda acceder y puntuar cds.

La aplicación contará con un *login*, es decir, solo pueden acceder usuarios registrados. Una vez dentro, los usuarios podrán buscar un cd determinado y puntuarlo.

Para el desarrolo de esta aplicación vamos a usar como herramientas principales el **Visual Studio 2015 Community**, y el
**SQL Server 2014 Management Studio** para gestionar la base de datos.

Además de lo siguiente:

-[Nuget EntityFramework 6.1.3](https://www.nuget.org/packages/EntityFramework)
-[Jquery](https://jquery.com/)
-[React](https://reactjs.net/)
-[amCharts](https://www.amcharts.com/)
-[JQueryUI](https://jqueryui.com/)

Otras tecnologias usadas:

-[Slack](https://slack.com/)
-[StackEditor](https://stackedit.io/)
-[GitHub](https://github.com/)
-[Gmail](https://www.google.com/gmail/)
-[Trello](https://trello.com/)

La aplicación está basada en el modelo *E-R* usando *.NET* en el lado del servidor y sigue un modelo *REST*.

Con *ASP.NET* usamos unas determinadas carpetas en las que se reparte la estructura del proyecto:
**Controllers**, responde al input del navegador, decide lo que hacer y nos develve la respuesta al usuario.
**View**s, aquí se situarán las vistas de las páginas, plantillas.
**Models**, para poder manejar la información.
**Content**, situamos las imágenes, css y demás contenido.
**Scripts**, contiene los archivos de javascript usados.

###Resumen de desarrollo:

Lo primero es crear y en este caso modificar la base de datos proporcionada *Discos*, es decir, se añaden elementos básicos como contraseñas a los usuarios, los claves primarias...

Empezamos a crear el proyecto, para ello establecemos la conexión entre la base de datos y el Visual Studio.
Prestamos atención al *connectionString* de *web.config*

Una vez tenemos todo esto, se comienzan a crear las clases para los **modelos** y **controladores**.

 A partir de aquí, se crean las vistas para que genere una respuesta **HTML**.
Con el *scaffolding* examinamos el objeto y determinamos el tipo de plantilla que deseamos generar.

Cuando comprobamos que todo esto funciona y hace la conexión, ya se comienza con la parte del **cliente**.

Como base se hace uso de una plantilla *bootstrap* responsive.

Se va añadiendo herramientas útiles como *react* para poder hacer un buscador de cds y que el usuario no tenga que estar buscando en un **dropdown list** uno a uno. Mejorando así la experiencia de usuario.

El **login** cuenta con validaciones y mensaje de error que informe al usuario, a parte de un teclado virtual para poder introducir la contraseña numérica. 

Para la sección de puntuar cds, se hace uso de *css* y se hace mediante un sistema de estrellas de 1 a 5. Una vez votado el disco, se informa mediante [toastr](http://codeseven.github.io/toastr/demo.html) de que la puntuación se ha llevado a cabo con éxito.

Las puntuaciones se van a ir reflejando en una gráfica generada mediante *amCharts*, además es interactiva.

También se ha incluído mapar de imágenes que permita poner publicidad que lleven a enlaces como [Spotify](https://www.spotify.com/es/)...

El diseño de la aplicacion es sencillo, que no confunda al usuario, sea facil de usar/navegar y no muestre botones o links que no son necesarios, con validaciones que informen en caso de error.

Para testear la aplicacion se ha tenido en cuenta la perspectiva del lado cliente, es decir, tiempos de espera, mensajes de error claros, feedback inmediato si se produce un error.

**SuperSonido** cumple con el producto minimo viable.







 
 







> Written with [StackEdit](https://stackedit.io/).
