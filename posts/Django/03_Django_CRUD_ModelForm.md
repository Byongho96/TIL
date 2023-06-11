# Django CRUD with ModelForm

## Index

- [1. Model Form](#1-model-form)
  - [1.1. Model Class](#11-model-class)
  - [1.2. Form Class](#12-form-class)
  - [1.3. ModeForm Class](#13-modeform-class)
- [2. Create](#2-create)
  - [2.1. urls.py](#21-urlspy)
  - [2.2. views.py](#22-viewspy)
  - [2.3. templates.html](#23-templateshtml)
- [3. Read](#3-read)
  - [3.1. urls.py](#31-urlspy)
  - [3.2. views.py](#32-viewspy)
  - [3.3. templates.html](#33-templateshtml)
- [4. Update](#4-update)
  - [4.1. urls.py](#41-urlspy)
  - [4.2. views.py](#42-viewspy)
  - [4.3. templates.html](#43-templateshtml)
- [5. Delete](#5-delete)
  - [5.1. urls.py](#51-urlspy)
  - [5.2. views.py](#52-viewspy)
  - [5.3. templates.html](#53-templateshtml)
- [6. Handling HTTP Request Methods](#6-handling-http-request-methods)
  - [6.1. View Decoarators](#61-view-decoarators)
  - [6.2. urls.py](#62-urlspy)
  - [6.3. views.py](#63-viewspy)

---

# 1. Model Form

## 1.1. Model Class

```python
# articles/models.py
from django.db import models

# Article inherits model.Model
class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
```

## 1.2. Form Class

**In a similar way that a model class’s fields map to database fields, a form class’s fields map to HTML form \<input> elements.**

- **is_valid()**  
   A Form instance has an **is_valid() method**, which runs validation routines for all its fields. When this method is called, if all fields contain valid data, it will:

  - return True
  - place the form’s data in its cleaned_data attribute.

* **Widgets**  
   [Django Widgets 공식문서](https://docs.djangoproject.com/en/4.1/ref/forms/widgets/)  
   Each form field has a corresponding Widget class, which in turn corresponds to an HTML form widget such as \<input type="text">.

* **Form rendering options**
  - **as_div**: will render them wrapped in \<div> tags.
  - **as_table**: will render them as table cells wrapped in \<tr> tags.
  - **as_p**: will render them wrapped in \<p> tags.
  - **as_ul**: will render them wrapped in \<li> tags.

Example

```python
# articles/forms.py
from django import forms

class ArticleForm(forms.Form):
    NATION_A = 'kr'
    NATION_B = 'ch'
    NATION_C = 'jp'
    NATIONS_CHOICES = [
        (NATION_A, '한국'), # (value, showing)
        (NATION_B, '중국'),
        (NATION_C, '일본'),
    ]
    title = forms.CharField(max_length=10)
    content = forms.CharField(widget=forms.Textarea())
    nation = forms.ChoiceField(choices=NATIONS_CHOICES)
```

## 1.3. ModeForm Class

**The form Class that map closely to Django models.**

```python
# articles/forms.py
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        label = 'Title',
        widget=forms.TextInput(
            attrs={
                'class': 'my-title',
                'placeholder': 'Enter the title',
            }
        )
    )

    content = forms.CharField(
        label = 'Content',
        widget=forms.Textarea(
            attrs={
                'class': 'my-content',
                'placeholder': 'Enter the content',
                'rows': 5,
                'cols': 50,
            }
            error_message={
                'required': 'Please enter your content'
            }
        )
    )

    class Meta:
        model = Article
        fields = '__all__'
        # fields = ('title', 'content',)
        # exclude = ('title', )
```

---

# 2. Create

## 2.1. urls.py

```python
app_name = 'articles'
urlpatterns = [
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
]
```

## 2.2. views.py

```python
from .forms import ArticleForm

def new(request):
    form  = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/new.html', context)

def create(request):
    form = ArticleForm(request.POST)
    if form.is_valid():
        article = form.save()
        return redirect('articles:detail', article.pk)
    # the reason is saved in form.errors
    # print(f'Error: {form.errors}')

    # also by hand over the form again, the error message can be printed on the new.html
    context = {
        'form': form,
    }
    return render(request, 'articles/new.html', context)
```

## 2.3. templates.html

**new.html**

```django
<h1>NEW</h1>
<form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
</form>
```

---

# 3. Read

## 3.1. urls.py

```python
app_name = 'articles'
urlpatterns = [
    path('index/', views.index, name='index'),
    path('<int:pk>/', views.detail, name='detail'),
]
```

## 3.2. views.py

```python
def index(request):
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)

def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)
```

## 3.3. templates.html

**index.html**

```django
<h1>Articles</h1>
<hr>
{% for article in articles %}
    <p> title: {{ article.title }} </p>
    <p> content: {{ article.content }} </p>
    <hr>
{% endfor %}
```

**detail.html**

```django
<h1>DETAIL</h1>
<h3>{{ article.pk }}th article</h3>
<hr>
<p> title: {{ article.title }} </p>
<p> content: {{ article.content }} </p>
<p> created at: {{ article.created_at }} </p>
<p> updated at: {{ article.updated_at }} </p>
<hr>
```

---

# 4. Update

## 4.1. urls.py

```python
app_name = 'articles'
urlpatterns = [
    path('<int:pk>/edit/', views.edit, name='edit'),
    path('<int:pk>/update/', views.update, name='update'),
]
```

## 4.2. views.py

```python
def edit(request, pk):
    article = Article.objects.get(pk=pk)
    # make hte instance based on another data
    form = ArticleFrom(instance=aritcle)
    context = {
        'form': form,
    }
    return render(request, 'articles/edit.html', context)

def update(request, pk):
    article = Article.objects.get(pk=pk)
    form = ArticleForm(request.POST, instance=article)
    if form.is_Valid():
        form.save()
        return redirect('articles:detial', article.pk)
    context = {
        'form': form,
    }
    return render(request, 'articles/edit.html', context)
```

## 4.3. templates.html

**edit.html**

```django
<h1>EDIT</h1>
<form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
</form>
```

---

# 5. Delete

## 5.1. urls.py

```python
app_name = 'articles'
urlpatterns = [
    path('<int:pk>/delete/', views.delete, name='delete'),
]
```

## 5.2. views.py

```python
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('articles:index')
```

## 5.3. templates.html

**detail.html**

```django
<h1>DETAIL</h1>
<h3>{{ article.pk }}th article</h3>
<hr>
<p> title: {{ article.title }} </p>
<p> content: {{ article.content }} </p>
<p> created at: {{ article.created_at }} </p>
<p> updated at: {{ article.updated_at }} </p>
<hr>
<form action="{% url 'articles:delete' article.pk %}" method="POST">
    {% csrf_token %}
    <input type="submit" value="DELETE">
</form>
```

---

# 6. Handling HTTP Request Methods

**By distinguishing the request method, url and view codes can be written more concisely.**

## 6.1. View Decoarators

`from django.views.decorators.http import`

- `@require_http_methods(['',])`
  - Allow only the methods in the list
- `@require_POST`
  - Allow POST only
- `@require_safe`
  - Allow GET only

## 6.2. urls.py

```python
app_name = 'articles'
urlpatterns = [
    path('create/', views.create, name='create'),
    path('index/', views.index, name='index'),
    path('<int:pk>/', views.detail, name='detail'),
    path('<int:pk>/update/', views.update, name='update'),
    path('<int:pk>/delete/', views.delete, name='delete'),
]
```

## 6.3. views.py

```python
from django.views.decorators.http import require_http_methods, require_safe, require_POST
from .forms import ArticleForm

# Create an Article
@require_http_methods(['GET','POST'])
def create(request):
    if request.method == 'POST':    # Post an article
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:                           # Get the article form
        form  = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/create.html', context)

# Read Article List
@require_safe
def index(request):
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)

# Read Article Detail
@require_safe
def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)

# Update an Article
@require_http_methods(['GET','POST'])
def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':        # Update an article
        form = ArticleForm(request.POST, instance=article)
        if form.is_Valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:                               # Get the article form with data
        form = ArticleFrom(instance=aritcle)
    context = {
        'form': form,
    }
    return render(request, 'articles/update.html', context)

# Delete an Article
@require_POST
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    if reqeust.mehtod == ' POST':
        article.delete()
        return redirect('articles:index')
    return redirect('articles:detial', artilce.pk)
```
