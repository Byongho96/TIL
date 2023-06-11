# Django CRUD

## Index

- [0. Cross Site Request Forgery(CSRF)](#0-cross-site-request-forgerycsrf)
  - [0.1. What is CSRF](#01-what-is-csrf)
  - [0.2. CSRF Token](#02-csrf-token)
- [1. Model](#1-model)
  - [1.1. models.py](#11-modelspy)
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

---

# 0. Cross Site Request Forgery(CSRF)

[CSRF에 대해 정리된 블로그 글](https://codevang.tistory.com/282)

## 0.1. What is CSRF

**An attack that sends a request to the server that is unrelated to the user's intention**

It can be done by creating a fake template that matches the server request format.

## 0.2. CSRF Token

**It's arbitrarily issued token by the server.**

Server inserts a CSRF token into the template so that it can be automatically returned with the user's request. When a user request is received, the server checks the validity of the CSRF token. if the token is not valid, the server considers it as abnormal, and doesn't accept the data.

---

# 1. Model

## 1.1. models.py

```python
# articles/models.py
from django.db import models

# Article inherits model.Model
class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
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
def new(request):
    return render(request, 'articles/new.html')

def create(request):
    title = request.POST.get('title')
    content = request.POST.get('content')

    # 1.
    # article = Article()
    # article.title = title
    # article.content = content
    # article.save()

    # 2.
    article = Article(tite=title, content=content)
    article.save()

    # 3.
    # Article.objects.create(title=title, content=content)

    return redirect('articles:detail', article.pk)
```

### 2.3. templates.html

**new.html**

```django
<h1>NEW</h1>
<form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    <label for="title">Title:</label>
    <input type="text" name="title"><br>
    <label for="content">Content:</label>
    <textarea name="content"></textarea><br>
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
    context = {
        'article': article,
    }
    return render(request, 'articles/edit.html', context)

def update(request, pk):
    article = Article.objects.get(pk=pk)
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect('articles:detail', article.pk)
```

## 4.3. templates.html

**edit.html**

```django
<h1>EDIT</h1>
<form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    <label for="title">Title:</label>
    <input type="text" name="title" value={{article.title}}><br>
    <label for="content">Content:</label>
    <textarea name="content">{{article.content}}</textarea><br>
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
