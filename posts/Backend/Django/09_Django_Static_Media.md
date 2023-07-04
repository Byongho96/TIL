---
title: 'Django Static Files'
updatedAt: '2022-12-27'
createdAt: '2022-11-08'
isCompleted: true
reference:
---

- [1. Static Files](#1-static-files)
  - [1.1. Static Files](#11-static-files)
  - [1.2. Static Files with Django](#12-static-files-with-django)
  - [1.3. Deploy Static Files](#13-deploy-static-files)
    - [1.3.1. STATIC_ROOT](#131-static_root)
    - [1.3.2. Procedure](#132-procedure)
- [2. Media Files](#2-media-files)
  - [2.1. ImageField()](#21-imagefield)
    - [2.1.2. FileField()](#212-filefield)
  - [2.2. Before Using Media Files](#22-before-using-media-files)
- [3. Image File CRUD](#3-image-file-crud)
  - [3.1. Create](#31-create)
  - [3.2. READ](#32-read)
  - [3.3. UPDATE](#33-update)
- [4. Image Resizing](#4-image-resizing)
  - [4.1. Django Imagekit](#41-django-imagekit)
  - [4.2. Make Thumbnail Without Saving the Original Image](#42-make-thumbnail-without-saving-the-original-image)
  - [4.3. Make Thumbnail With Saving the Original Image](#43-make-thumbnail-with-saving-the-original-image)

---

# 1. Static Files

## 1.1. Static Files

**Files that do not require additional processing before being shown to the user.** To request a static file to the server, we should know the address(url) of the file

- **Examples**
  - media file
  - javascript file
  - CSS file

## 1.2. Static Files with Django

1. **Check `INSTALLED_APPS` in settings.py**  
   It is set by default.
   ```python
   INSTALLED_APPS = [
    django.contrib.staticfile,
    ... ]
   ```
2. **Set `STATIC_DIRS` in settings.py**  
   It's about setting an additional static file path in addition to the app path.
   ```python
   # Default: []
   STATICFILES_DIRS = [
       BASE_DIR / 'static',
   ]
   ```
3. **Set `STATIC_URL` in settings.py**  
   The path corresponding to `STATIC_ROOT`. It is set to `STATIC_URL = '/static/'` by default.
4. **Make 'static/app_name/' folder for each app to divide namespace**  
   `my_app/static/my_app/sample_img.jpg`
5. **print with static templates tags**

   ```html
   {% extends 'must_be_on_the_top.html' %}
   <!-- import static -->
   {% load static %}
   <img src="{% static 'app_name/img_name.jpg' %}" />
   ```

## 1.3. Deploy Static Files

### 1.3.1. STATIC_ROOT

**Where all the static files are collected** when the command `collectstatic` is excuted. The default is `None`. If `DEBUG = TRUE`, STATIC_ROOT is not applied.

It's required because the server which actually runs the project doesn't know where the static files are.

### 1.3.2. Procedure

1. **Set `STATIC_ROOT` in settings.py**
   ```python
   STATIC_ROOT = BASE_DIR / 'staticfiles'
   ```
2. **Run the cmd**  
   `python manage.py collectstatic`

# 2. Media Files

**The static files which are uploaded by the user.**

## 2.1. ImageField()

- **The model field for image files.**
- It inherits FileField and has a function of checking the validity of an image file.
- **The instance of ImageField is a string with a maximum length of 100**
  - The string is the path after `MEDIA_ROOT`
  - When the same name of image is saved in the exactly the same directory, a random string is added to the name

### 2.1.2. FileField()

**FileField(upload_to='', storage=None, max_length=100, \*\*options)**

- **upload_to**
  - setting the detailed path (path after MEDIA_ROOT)

## 2.2. Before Using Media Files

1. **Set `MEDIA_ROOT`**  
   The absolute path where all the media files will be stored. It must be different from `STATIC_ROOT`

   ```python
   # Default: ''
   MEDIA_ROOT = BASE_DIR / 'media'
   ```

2. **Set `MEDIA_URL`**  
   The path corresponding to `MEDIA_ROOT`. It must be different from STATIC_URL.  
   `MEDIA_URL = '/media/'`

3. **Link MEDIA_URL to MEDIA_ROOT**

   ```python
   # project/urls.py
   from django.conf import settings
   from django.conf.urls.static import static

   urlpatterns = [
       ...,
   ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   ```

4. **Install Pillow library**  
   The libarary which is necessary for processing image files in Python.  
   `pip install Pillow`

# 3. Image File CRUD

## 3.1. Create

- **models.py**

  ```python
  class Article(models.Model):
      image = models.ImageField(blank=True, upload_to='images/')
  ```

  - **blank**

    - The field can be blank, and '' can pass the validation test.
    - validation-related

  - **upload_to(optional)**

    - Sets the detailed path (path after MEDIA_ROOT)
      - Example of using Python time module  
        `upload_to = '%Y/%m/%d/`
    - A functon can be used as the parameter.

      ```python
      def articles_image_path(self, filename):
          return f'images/{self.user.username}/{filename}'

      class Article(models.Model):
          image = models.ImageField(blank=True, upload_to=articles_image_path)
      ```

      - The arguments are fixed like above. [Django doc about upload_to](https://docs.djangoproject.com/en/4.1/ref/models/fields/#filefield)
      - pk can't be used in the function becuase the function is excuted before saved

- **create.html**

  ```html
  <form action="#" method="POST" enctyp="multipart/form-data"></form>
  ```

  - **enctype**
    - Sets the encoding type of the form
    - Default: aplication/x-www-from-rulencoded

- **views.py**
  ```python
  def created(request):
      if request.method == 'POST':
          form = ArticleForm(request.POST, request.FILES)
      ...
  ```
  - BaseModelForm(data=None, files=None, ..., instance=None)

## 3.2. READ

- **detail.html**
  ```html
  {% if article.image %}
  <img src="{{ article.image.url }}" alt="{{ article.image }}" />
  {% endif %}
  ```

## 3.3. UPDATE

**Strictly speaking, it's not updating but a replacement**
The manage the previous file, you should use an addtional library like [django-cleanup](https://pypi.org/project/django-cleanup/)

- **update.html**
  ```html
  <form action="#" method="POST" enctyp="multipart/form-data"></form>
  ```
- **views.py**
  ```python
  def update(request):
      article = Article.objects.get(pk=pk)
      if request.method == 'POST':
          form = ArticleForm(request.POST, request.FILES, instance=article)
  ...
  ```

# 4. Image Resizing

Resizing the uploaded image to use storage space efficiently

## 4.1. Django Imagekit

1. **Install dajngo-imagekit**
   - `pip install dajngo-imagekit`
2. **Add to INSTALLED_APPS**
   - `INSTALLED_APPS = ['imagekit', ]`

## 4.2. Make Thumbnail Without Saving the Original Image

- **models.py**

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

## 4.3. Make Thumbnail With Saving the Original Image

- **models.py**

  ```python
  from imagekit.processors import Thumbnail
  from imagekit.models import ProcessedImageField, ImageSpecField

  class Article(models.Model):
      image = models.ImageField(blank=True)
      image_thumbnail = ProcessedImageField(
          source='image',
          processors=[Thumbnail(200, 300)],   # pixel : width, height
          format='JPEG',
          options={'quality':80}              # resolution
      )
  ```

  - **The column of the `image_thumbnail` is not created.** Only a cache file is created in the cache folder when the field is used.
