# 1. Applying ModelForm
## C and U are changed which use the form
* models.py
```python
# articles/models.py
from django.db import models

# Article inherits model.Model
class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
```
* Form class with widget
    * Form class
        * form classhas methods something like check the validity of the input
    * Widget
        * customizing outlook of the form on html file
    * From rendering options
        * as_p
        * as_ul
        * as_table

* forms.py
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
```python
# articles/forms.py
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        label = 'Title',
        widgtet=forms.TextInput(
            attrs={
                'class': 'my-title',
                'placeholder': 'Enter the title',
            }
        )
    )

    content = forms.CharField(
        label = 'Content',
        widgtet=forms.Textarea(
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
## 1. Create
### 1-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
]
```
### 1-2. views.py
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
### 1-3. templates.html
* new.html
```django
<h1>NEW</h1>
<form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
</form>
```
---
## 2. Read
### 2-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('index/', views.index, name='index'),
    path('<int:pk>/', views.detail, name='detail'),
]
```
### 2-2. views.py
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
### 2-3. templates.html
* index.html
```django
<h1>Articles</h1>
<hr>
{% for article in articles %}
    <p> title: {{ article.title }} </p>
    <p> content: {{ article.content }} </p>
    <hr>
{% endfor %}
```
* detail.html
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
## 3. Update
### 3-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('<int:pk>/edit/', views.edit, name='edit'),
    path('<int:pk>/update/', views.update, name='update'),
]
```
### 3-2. views.py
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
### 3-3. templates.html
* edit.html
```django
<h1>EDIT</h1>
<form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
</form>
```
---
## 4. Delete
### 4-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('<int:pk>/delete/', views.delete, name='delete'),
]
```
### 4-2. views.py
```python
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('articles:index')
```
### 4-3. templates.html
* detail.html
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
# 2. Handling HTTP requests
* View decoarators
    * `from django.views.decorators.http import`
    * @require_http_methods(['',])
    * @require_POST
    * @require_safe
## C, U and D are changed which use POST method
## 1. Create
### 1-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('create/', views.create, name='create'),
]
```
### 1-2. views.py
```python
from django.views.decorators.http import require_http_methods
from .forms import ArticleForm

@require_http_methods(['GET','POST'])
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        form  = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/create.html', context)
```
### 1-3. templates.html
* create.html
```django
<h1>CREATE</h1>
<form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
</form>
```
---
## 2. Read
### 2-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('index/', views.index, name='index'),
    path('<int:pk>/', views.detail, name='detail'),
]
```
### 2-2. views.py
```python
from django.views.decorators.http import require_safe

@require_safe
def index(request):
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)

@require_safe
def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)
```
### 2-3. templates.html
* index.html
```django
<h1>Articles</h1>
<hr>
{% for article in articles %}
    <p> title: {{ article.title }} </p>
    <p> content: {{ article.content }} </p>
    <hr>
{% endfor %}
```
* detail.html
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
## 3. Update
### 3-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('<int:pk>/update/', views.update, name='update'),
]
```
### 3-2. views.py
```python
from django.views.decorators.http import require_http_methods
from .forms import ArticleForm

@require_http_methods(['GET','POST'])
def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_Valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleFrom(instance=aritcle)
    context = {
        'form': form,
    }
    return render(request, 'articles/update.html', context)
```
### 3-3. templates.html
* update.html
```django
<h1>UPDATE</h1>
<form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
</form>
```
---
## 4. Delete
### 4-1. urls.py
```python
app_name = 'articles' 
urlpatterns = [
    path('<int:pk>/delete/', views.delete, name='delete'),
]
```
### 4-2. views.py
```python
from django.views.decorators.http import require_POST

@require_POST
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    if reqeust.mehtod == ' POST':
        article.delete()
        return redirect('articles:index')
    return redirect('articles:detial', artilce.pk)
```
### 4-3. templates.html
* detail.html
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