Desarrollo de una aplicacion web ASP.NET SuperSonido MVC
Version 1.0

La aplicacion se trata de una web de musica en donde un usuario pueda puntuar cds.
La aplicacion contara con un login, la pagina en donde se encuetran los cds a puntuar y un formulario de registro.

Para desarrollar esta aplicaion vamos a usar como herramientas principales el Visual Studio 2015 Community, 
SQL Server 2014 Management Studio para gestionar la base de datos.
Nuget EntityFramework 6.1.3
Jquery
React
amCharts

Otras tecnologias usadas:
Slack
StackEditor
GitHub
Gmail
Trello

La aplicacion esta basada en el model E-R usando .NET en el lado del servidor y sigue un modelo REST.

ASP.NET usa unas determinadas carpetas en las que se reparte el proyecto:
Controllers, responde al input del navegador, decide lo que hacer y nos develve la respuesta al usuario.
Views, aqui se situaran las vistas de las paginas, plantillas.
Models, para poder manejar la informacion.
Content, situamos las imagenes, css y demas contenido.
Scripts, contiene los archivos de javascript usados.

Lo primero es modificar la base de datos:
Se añaden contraseñas a los usuarios, los claves primarias.

Empezamos a crear el proyecto, establecemos la conexion entre la bd y vs.
Prestamos atencion al connectionString de web.config

Una vez tenemos todo esto, se comienzan a crear las clases para los models y controladores.

 A partir de esto, se crean las vistas para que genere una respuesta HTML.
Con el scaffolding examinamos el objeto y determinamos el tipo de plantilla que deseamos generar.

En el proyecto se hace uso de una plantilla bootstrap responsive.

El registro y login de usuario cuenta con validaciones y mensaje de error que informe al usuario.

El usuario puede puntuar un determiando cd, para ello se hace uso de css con inputs.

Las puntuaciones se van a reflejar en una grafica generada mediante amCharts.

El diseño de la aplicacion es sencilla, que no confunda al usuario, sea facil de usar y no muestre botones o link que no son necesarios.

Para testear la aplicacion se tiene en cuenta la perspectiva del lado cliente, los timempos de espera, mensajes de error claros, feedback inmediato si se produce un error.

La aplicacion cumple con el producto minimo viable.







 
 







> Written with [StackEdit](https://stackedit.io/).