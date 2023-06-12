---
title: 'Django N:1 Realationship'
updatedAt: '2022-12-27'
createdAt: '2022-11-08'
isCompleted: true
reference:
---

- [1. Many to One Relationship](#1-many-to-one-relationship)
  - [1.1. Foreign Key](#11-foreign-key)
- [2. Comment : Article (N:1)](#2-comment--article-n1)
  - [2.1. Create](#21-create)
  - [2.2. Read](#22-read)
  - [2.3. Delete](#23-delete)
- [3. Article : User (N:1)](#3-article--user-n1)
  - [3.1. Create](#31-create)
  - [3.2. Update](#32-update)
  - [3.3. Delete](#33-delete)
- [4. Comment : User (N:1)](#4-comment--user-n1)
  - [4.1. Create](#41-create)
  - [4.2. Read](#42-read)
  - [4.3. Delete](#43-delete)

---

# 1. Many to One Relationship

**One-to-Many relationship in DBMS is a relationship between instances of an entity with more than one instance of another entity.**
<img alt="Many_to_one" src="./images/Many_to_one.jpg" width="700">

## 1.1. Foreign Key

A foreign key is a column or columns of data in one table that refers to the unique data values (often the primary key data) in another table

# 2. Comment : Article (N:1)

- **models.py**

  ```python
  # articles/models.py
  class Article(models.Model):
      title = models.CharField(max_length=10)
      content = models.TextField()
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)


  class Comment(models.Model):
      article = models.ForeignKey(Article, on_delete=models.CASCADE, releated_name='comments')
      content = models.CharField(max_length=200)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  ```

  - **on_delete**
    - Referential Integrity: what to do when the parent instance is deleted
    - CASCADE
      - The referencing instance is also deleted
    - PROTECT
      - Can't delete the parent instance
    - SET_NULL
    - SET_DEFAULT
  - **related_name**
    - The alias of the dereference manager
    - Default value is `modelName_set`

* **forms.py**

  ```python
  # articles/forms.py
  class CommentForm(forms.ModelForm):

  class Meta:
      model = Comment
      exclude = ('article',)
  ```

## 2.1. Create

- **urls.py**
  ```python
  # articles/urls.py
  urlpatterns = [
      ...,
      path('<int:pk>/comments/', views.comments_create, name='comments_create'),
  ]
  ```
- **views.py**
  ```python
  # articles/views.py
  def comments_create(request, pk):
      article = Article.objects.get(pk=pk)
      comment_form = CommentForm(request.POST)
      if comment_form.is_valid():
          comment = comment_form.save(commit=False)
          comment.accounts = article
          comment.save()
      return redirect('movies:detail', pk)
  ```
- **detail.html**
  ```html
  <!-- articles/detail.html -->
  <form
    action=" {% url 'articles:comments_create' article.pk %} "
    method="POST">
    {% csrf_token %} {{ comment_form }}
    <input type="submit" />
  </form>
  ```

## 2.2. Read

- **views.py**
  ```python
  # articles/views.py
  def detail(request, pk):
      article = Article.objects.get(pk=pk)
      comment_form = CommentForm()
      # 역참조 manager 사용
      # related_name 미선언 시, comment_set
      comments = article.comments.all()
      context = {
          'movie': movie,,
          'comment_form': comment_form,
          'comments': comments
      }
      return render(request, 'articles/detail.html', context)
  ```
- **detail.html**
  ```html
  <h4>댓글 목록</h4>
  <ul>
    {% for comment in comments %}
    <li>{{ comment.content }}</li>
    {% endfor %}
  </ul>
  ```

## 2.3. Delete

- **urls.py**
  ```python
  # articles/urls.py
  urlpatterns = [
      ...,
      path('<int:article_pk>/comments/<int:comment_pk>', views.comments_delete, name='comments_delete'),
  ]
  ```
- **views.py**
  ```python
  # articles/views.py
  def comments_delete(request, article_pk, comment_pk):
      comment = Comment.objects.get(pk=comment_pk)
      comment.delete()
      return redirect('articles:detail', article_pk)
  ```
- **detail.html**
  ```html
  <h4>댓글 목록</h4>
  <ul>
    {% for comment in comments %}
    <li>
      {{ comment.content }}
      <form
        action=" {% url 'articles:comments_delete' article.pk comment_pk %} "
        method="POST">
        {% csrf_token %}
        <input type="submit" value="DELETE" />
      </form>
    </li>
    {% endfor %}
  </ul>
  ```

# 3. Article : User (N:1)

- **models.py**

  ```python
  # articles/models.py
  from django.conf import settings

  class Movie(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  ```

- **forms.py**

  ```python
  # articles/forms.py
  class ArticleForm(forms.ModelForm):

  class Meta:
      model = Comment
      exclude = ('user',)
  ```

## 3.1. Create

- **views.py**

  ```python
  # articles/views.py

  @login_required
  @require_http_methods(['GET', 'POST'])
  def create(request):
      if request.method == 'POST':
          form = ArticleForm(request.POST)
          if form.is_valid():
              article = form.save(commit=False)
              article.user = request.user
              article.save()
              return redirect('movies:detail', article.pk)
      else:
          form = ArticleForm()
      context = {
          'form': form,
      }
      return render(request, 'articles/create.html', context)
  ```

## 3.2. Update

- **views.py**
  ```python
  @login_required
  @require_http_methods(['GET', 'POST'])
  def update(request, pk):
      article = article.objects.get(pk=pk)
      if request.user == article.user:
          if request.method == 'POST':
              form = ArticleForm(request.POST, instance=article)
              if form.is_valid():
                  form.save()
                  return redirect('articles:detail', pk)
          else:
              form = ArticleForm(instance=article)
          context = {
              'article': article,
              'form': form
          }
          return render(request, 'articles/update.html', context)
      return HttpResponse(status=403)
  ```
- **detail.html**

  ```html
  {% if request.user == article.user %}
  <a href="{% url 'articles:update' article.pk %}">UPDATE</a>
  <form action="{% url 'articles:delete' article.pk %}" method="POST">
    {% csrf_token %}
    <input type="submit" value="DELETE" />
  </form>
  {% endif %}
  ```

## 3.3. Delete

- **views.py**

  ```python
  # articles/views.py

  @require_POST
  def delete(request, pk):
      article = Article.objects.get(pk=pk)
      if request.user.is_authenticated:
          if request.user == article.user:
              article.delete()
              return redirect('articles:index')
          return HttpResponse(status=403) # 권한없음
      return redirect('accounts:login')
  ```

- **detail.html**
  ```html
  {% if request.user == article.user %}
  <a href="{% url 'articles:update' article.pk %}">UPDATE</a>
  <form action="{% url 'articles:delete' article.pk %}" method="POST">
    {% csrf_token %}
    <input type="submit" value="DELETE" />
  </form>
  {% endif %}
  ```

# 4. Comment : User (N:1)

- **models.py**
  ```python
  # articles/models.py
  class Comment(models.Model):
      article = models.ForeignKey(Article, on_delete=models.CASCADE, releated_name='comments'),
      user = mmodels.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  ```
- **forms.py**

  ```python
  # articles/forms.py
  class CommentForm(forms.ModelForm):

  class Meta:
      model = Comment
      exclude = ('article', 'user',)
  ```

## 4.1. Create

- **views.py**
  ```python
  # articles/views.py
  def comments_create(request, pk):
      article = Article.objects.get(pk=pk)
      comment_form = CommentForm(request.POST)
      if comment_form.is_valid():
          comment = comment_form.save(commit=False)
          comment.accounts = article
          comment.user = request.user
          comment.save()
      return redirect('movies:detail', pk)
  ```

## 4.2. Read

- **detail.html**
  ```html
  <h4>댓글 목록</h4>
  <ul>
    {% for comment in comments %}
    <li>{{ comment.user }}: {{ comment.content }}</li>
    {% endfor %}
  </ul>
  ```

## 4.3. Delete

- **views.py**
  ```python
  # articles/views.py
  def comments_delete(request, article_pk, comment_pk):
      comment = Comment.objects.get(pk=comment_pk)
      if request.user == comment.user:
          comment.delete()
      return redirect('articles:detail', article_pk)
  ```
- **detail.html**
  ```html
  <h4>댓글 목록</h4>
  <ul>
    {% for comment in comments %}
    <li>
      {{ comment.user }}: {{ comment.content }} {% if request.user ==
      comment.user %}
      <form
        action=" {% url 'articles:comments_delete' article.pk comment_pk %} "
        method="POST">
        {% csrf_token %}
        <input type="submit" value="DELETE" />
      </form>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
  ```
