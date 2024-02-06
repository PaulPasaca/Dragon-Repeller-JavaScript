# Juego-Rol-JavaScript usando JavaScript, HTML y CSS
# Hola, Soy cricketdev! 👋
Para la ejecucion de este proyecto se debe tomar en cuenta ciertos parámetros para evitar posibles errores, los cuales se describen a continuación:  

+ 👩‍💻 Primeramente inicializa la app en el archivo settings.py
```javascript
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app_juego',
]
```

+ 👩‍💻 Dentro de el mismo archivo settings.py, agregar:
```javascript
 STATIC_URL = 'static/' 
```

+ 👩‍💻 Crea tu carpeta static, la cual almacenará los archivos .js y .css

+ 👩‍💻  Verificar que se incluyan las urls dentro de la configuración principal .../JuegoRol/urls.py

```javascript
urlpatterns = [
    path('', include('app_juego.urls')),
    path('admin/', admin.site.urls),
]

```
+ 👩‍💻  Entrar a views.py y crear la vista que apuntará hacia nuestra pagina principal 

```javascript
def inicio(request):
  template = loader.get_template('inicio.html')
  return HttpResponse(template.render())
]

```

+ 👩‍💻  Configurar la url de la app usando el view anteriormente creado  

```javascript
urlpatterns = [
    path('', views.inicio, name='inicio'),
]
```
+ 👩‍💻  En la pagina principal del html, cargar los archivos css dentro del head   

```javascript
<link rel="stylesheet" href="{% static  'css/styles.css' %}">
```

+ 👩‍💻 En la pagina principal del html, cargar los archivos js dentro de un <script>   

```javascript
    <script src="{% static '/js/script.js' %} "></script>

```


