## 1. Static Files
### 1.1. Static Files
Files that does not have to go through additional process before being shown to the user
* media file
* javascript file
* CSS file

### 1.2. Web Server and Static Files
To reqeust static files in the server on web, we should know the address(url) of the files

### 1.3. Static Files with Django
1. **check INSTALLED_APPS in settings.py**
    * `INSTALLED_APPS = [ django.contrib.staticfile, ... ]`
    * usually it's already set
2. **set STATIC_DIRS in settings.py**
    * Default: []
    * set additional directories excpet 'app/static/'
    ```python
    STATICFILES_DIRS = [
        BASE_DIR / 'static',
    ]
    ```
3. **set STATIC_URL in settings.py**
    * usually it's already set as `STATIC_URL = '/static/'`
4. **make 'static/app_name/' folder in the app and save the image there/**
    * my_app/static/sample_img.jpg
5. **print with static templates tags**
    ```html
    {% extends 'must_be_on_the_top.html' %}
    <!-- import static -->
    {% load static %}

    <img src="{% static 'app_name/img_name.jpg' %} alt="smple image"">
    ```  

### 1.4. Deploy Static Files
#### 1.4.1. STATIC_ROOT
where all the static files are collected when the command `collectstatic` is excuted, usually before deploy the proeject. The default is `None`.
If `DEBUG = TRUE`, STATIC_ROOT is not applied.

It's required because the server which actually runs the program doesn't know where the static files are, unlike Django.

#### 1.4.2. Procedure
1. **set STATIC_ROOT in settings.py**
    * `STATIC_ROOT = BASE_DIR / 'staticfiles'`
2. **run the cmd**
    * `python manage.py collectstatic`


## 2. Image Upload
### 2.1. ImageField()
* The model field for uploading image
* Inherit FilreField + Check the vaildity of the uploaded image
* The instance of ImageField is string with a maximum length of 100
    * The string is the path of the file after MEDIA_ROOT
    * When the same name of image is saved in the exactly the same directory, a random string is added to the name

#### 2.1.2. FileField()
* FileField(upload_to'', storage=None, max_length=100, **options)
    * upload_to
        * Set up the detailed path (path after MEDIA_ROOT)

### 2.2. Before using FileField / ImageField 
1. **Set MEDIA_ROOT**
    * Default: ''
    * The absolute path where the images uploaded by users will be stored
    * It must be different from STATIC_ROOT
    ```python
    MEDIA_ROOT = BASE_DIR / 'media'
    ```
2.  **Set MEDIA_URL**
    * Default: ''
    * the front of the URL of media files, similar with what STATIC_URL does
    *  It must be different from STATIC_URL

3. **link MEDIA_URL to MEDIA_ROOT**
    ```python
    # project/urls.py
    from django.conf import settings
    from django.conf.urls.static import static

    urlpatterns = [
        ...,
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    ```
4. **install Pillow library**
    * `pip install Pillow`

### 2.3. Create
* models.py
    ```python
    class Article(models.Model):
        image = models.ImageField(blank=True, upload_to='images/')
    ```
    * blank
        * The field can be '', and it still can pass the validation test.
        * validation-related
    * null
        * Save the falsy value as NULL.(as long as the falsy value passed the validation test)
        * Database-related
    * upload_to(optional)
        * Set up the detailed path (path after MEDIA_ROOT)
        * `upload_to = '%Y/%m/%d/`
            * Python time module
        * You also can call a function for delciately naming the folder
            ```python
            def articles_image_path(instance, filename):
                return f'images/{instance.user.username/{filename}'
            
            class Article(models.Model):
                image = models.ImageField(blank=True, upload_to=articles_image_path)
            ```
            * the arguments are fixed like above
            * pk can't be used in the function becuase the function is excuted before saved
* form.py
    When the form is made, <input> tag of the ImageField has `accept` attrs which is for setting the type of files the form will be accepted
    * `accept="image/*"`
* views.py
    ```python
    def created(request):
        if request.method == 'POST':
            form = ArticleForm(request.POST, request.FILES)
        ...
    ```
    * BaseModelForm(data=None, files=None, ..., instance=None)
* create.html
    ```html
    <form action="#" method="POST" enctyp="multipart/form-data">
    ```
    * enctype
        * Default: aplication/x-www-from-rulencoded
        * Set the encoding type of the form

### 2.4. READ
* detail.html
    ```html
    {% if article.image %}
        <img src="{{ article.image.url }}" alt="{{ article.image }}">
    {% endif %}
    ```

### 2.5. UPDATE
Strictly speaking, it's not updating but a replacement
The previous file remains. To manage these files, you can use addtional libraries
* update.html
    ```html
    <form action="#" method="POST" enctyp="multipart/form-data">
    ```
* views.py
    ```python
    def update(request):
        article = Article.objects.get(pk=pk)
        if request.method == 'POST':
            form = ArticleForm(request.POST, request.FILES, instance=article)
    ...
    ```

### 2.6. Image Resizing
Resizing the uploaded image to use storage space efficiently
#### 2.6.1. Preset
1. **install dajngo-imagekit**
    * `pip install dajngo-imagekit`
2. **add to INSTALLED_APPS**
    * `INSTALLED_APPS = ['imagekit', ]`
#### 2.6.2. Make Thumbnail Without Saving The Original IMAGE
* models.py
    ```python
    from imagekit.processors import Thumbnail
    from imagekit.models import ProcessedImageField

    class Article(models.Model):
        image = ProcessedIamgeField(
            blank=True,
            upload_to='thumbnails/',
            processors=[Thumbnail(200, 300)],   # pixel : width, height
            format='JPEG',
            options={'quality':80}              # resolution
        )
    ```
    * There're many functions in the imagekit library.
#### 2.6.3. Make Thumbnail With Saving The Original IMAGE
* models.py
    ```python
    from imagekit.processors import Thumbnail
    from imagekit.models import ProcessedImageField, ImageSpecField

    class Article(models.Model):
        image = models.ImageField(blank=True)
        image_thumbnail = ProcessedIamgeField(
            source='image',
            processors=[Thumbnail(200, 300)],   # pixel : width, height
            format='JPEG',
            options={'quality':80}              # resolution
        )
    ```
    * The column of the image_thumbnail is not created
    * Even thhe file is not created until the field is used in the .html
        * In a CACHE folder