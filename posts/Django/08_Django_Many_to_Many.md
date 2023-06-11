# Django Many To Many Relationship

## Index

- [1. Intro](#1-intro)
  - [1.1. Terms](#11-terms)
  - [1.2. The limits of N:1 Relationship](#12-the-limits-of-n-1-relationship)
  - [1.3. Intermediary Model](#13-intermediary-model)
  - [1.4. Many To Many Field](#14-many-to-many-field)
  - [1.5. Many To Many Table](#15-many-to-many-table)
  - [1.6. with Extra Fields](#16-with-extra-fields)
- [2. Like (Article-User)](#2-like-article-user)
- [3. Follow (User-User)](#3-follow-user-user)
  - [3.1. Profile Page](#31-profile-page)
  - [3.2. Follow](#32-follow)

---

# 1. Intro

## 1.1. Terms

- **Source Model**
  - The model that has ManyToManyField
- **Target model**
  - The model that doesn't have ManyToManyField

## 1.2. The limits of N:1 Relationship

```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=modles.CASCADE)
    name = models.TextField()
```

If one patient make reservations with 2 diffrent doctors, you can't distingush whether the first Alex and the second Alex is the same person.

| id  | name | doctor_id |
| :-: | :--: | :-------: |
|  1  | Alex |     1     |
|  1  | Alex |     2     |

## 1.3. Intermediary Model

```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    name = models.TextField()

class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=modles.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=modles.CASCADE)
```

- **Create**
  - `Reservation.objects.create(doctor=doctor_instance, patient=patient_instance)`
- **Read**
  - if doctor1 wants to read all the reservation
    - `doctor1.reservaton_set.all()`
  - if patient1 wants to read all the reservation
    - `patinet1.reservaton_set.all()`

## 1.4. Many To Many Field

```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    doctors = models.ManyToManyField(Doctor)
    name = models.TextField()
```

- **MantoToManyField(to, \*\*options)**

  - **to**
    - the target model

  * **options**
    - **related_name**
      - The alias of the dereference manager.
      - Default value is `modelName_set`
    - **through**
      - [Desginate an intermediary table](#16-manytomanyfield-with-extra-fields)
    - **symmetrical**
      - Default: True
      - This argument is valid, only when `to = 'self'`
      - When it's True, the record for the opposite direction is automatically added.

* **Create**
  - `patient1.doctors.add(doctor1)`
  - `doctor1.patient_set.add(patient1)`

- **Read**
  - if doctor1 wants to read all the reservation
    - `doctor1.patient_set.all()`
    - `doctor1.patient_set.get(id=doctor_id)`
  - if patient1 wants to read all the reservation
    - `patient1.doctors.all()`
    - `doctor1.patient_set.get(id=patient_id)`
- **Delete**
  - if doctor1 wants to cancel the reservation with patient1
    - `doctor1.patient_set.remove(patient1)`
  - if patient1 wants to cancel the reservation with doctor1
    - `patient1.doctors.remove(doctor1)`

## 1.5. Many To Many Table

- **Table Name**
  - Default: `AppName_ModelName_FieldName`
  - `db_table`
    - the argument for changing the table name
- **Field name**
  - source model != target model
    |id|SourceModel_id|TargetModel_id|
    |---|---|---|
  - source model == target model (`to = 'self'`)
    |id|form_ModelName_id|to_ModelName_id|
    |---|---|---|

## 1.6. with Extra Fields

**Make an intermediary model**

```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    doctors = models.ManyToManyField(Doctor, related_name='patients', through='Reservation')
    name = models.TextField()

class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=modles.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=modles.CASCADE)
    symptom = models.TextField()
    reserved_at = models.DateTimeField(auto_now_add=True)
```

- **Create**
  - through Reservation Model
    - `Reservation.objects.create(doctor=doctor1, patient=patient1, symptom='stomachache')`
  - through ManyToMany Field
    - `patient1.doctors.add(doctor1, through_defaults={'symptom': 'flu'})`
    - through_defaults can be defined as a function

---

# 2. Like (Article-User)

- **models.py**
  ```python
  class Article(models.Model):
      user = models.ForeignKey(setttings.AUTH_USER_MODEL, on_delete=models.CASCADE)
      like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name=like_articles)
  ```
  - **relate_name should be specified**  
    Otherwise, in the upper case, the dereference manager name(user.article_set) would be duplicated.
- **forms.py**

  ```python
  class ArticleForm(models.ModelForm):

      class Meta:
          model = Article
          exclude = ('user', 'like_users', )
  ```

- **urls.py**
  ```python
  app_name = 'articles',
  urlpatterns = [
      ...,
      path('<int:article_pk>/likes/', views.likes, name='likes')
  ]
  ```
- **views.py**

  ```python
  @require_POST
  def likes(request, article_pk):
      if request.user.is_authenticated:
          article = Article.objects.get(pk=article_pk)
          if article.like_usres.filter(pk=request.user.pk).exists():
          # if request.user in article.like_users.all():
          # get을 쓰면 객체가 없을 때 Error 발생
              article.like_users.remove(request.user)
          else:
              article.like_users.add(request.user)
          return redirect('articles:index')
      return redirect('accounts:login')
  ```

  - **exists()**  
    Returns True if the QuerySet has value, or False

- **index.html**
  ```html
  {% block content %} {% for article in articles %}
  <p><b>작성자 : {{ article.user }}</b></p>
  <p>글 번호: {{ article.pk }}</p>
  <p>글 제목: {{ article.title }}</p>
  <p>글 내용: {{ article.content }}</p>
  <div>
    <form action="{% url 'article:likes' article.pk %}" method="POST">
      {% csrf_token %} {% if request.user in article.like_users.all %}
      <input type="submit" value="좋아요취소" />
      {% else %}
      <input type="submit" value="좋아요" />
      {% endif %}
    </form>
  </div>
  <a href="{% url 'articles:detail' article.pk %}">DETAIL</a>
  <hr />
  {% endfor %} {% endblock content %}
  ```

---

# 3. Follow (User-User)

## 3.1. Profile Page

- **urls.py**
  ```python
  app_name='accounts'
  urlpatterns = [
      path('profile/<str:username>/', views.profile, name='profile'),
  ]
  ```
  - if you name the path as `path('<str:username>/', views.profile, name='profile')`, you should consider the order of the url paths carefully.
- **views.py**

  ```python
  from django.contrib.auth import get_user_model

  def profile(request, username):
      User = get_user_model()
      person = User.objects.get(username=username)
      context = {
          'person': person,
      }
      return render(request, 'accounts/prfile.html', context)
  ```

- **profile.html**

  ```html
  {% block content %}
  <h1>{{ person.username }}'s profile</h1>

  <h4>{{ person.username }}'s articles</h4>
  {% for article in person.article_set.all %}
  <div>{{ article.title }}</div>
  {% endfor %}
  <hr />
  <h4>{{ person.username }}'s comments</h4>
  {% for comment in person.comment_set.all %}
  <div>{{ comment.content }}</div>
  {% endfor %}
  <hr />
  <h4>{{ person.username }}'s liked articles</h4>
  {% for article in person.like_articles.all %}
  <div>{{ article.title }}</div>
  {% endfor %} {% endblock content %}
  ```

- **base.html**
  ```html
  <a href="{% url 'accounts:profile' user.username %}">My Profile</a>
  ```
- **index.html**
  ```html
  {% block content %} {% for article in articles %}
  <p>
    <b
      >작성자 :
      <a href="{% url 'accounts:profile' article.user.username %}"
        >{{ article.user }}</a
      ></b
    >
  </p>
  <p>글 번호: {{ article.pk }}</p>
  <p>글 제목: {{ article.title }}</p>
  <p>글 내용: {{ article.content }}</p>
  <a href="{% url 'articles:detail' article.pk %}">DETAIL</a>
  <hr />
  {% endfor %} {% endblock content %}
  ```

## 3.2. Follow

- **models.py**
  ```python
  class User(AbstractUser):
      followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
  ```
- **urls.py**
  ```python
  app_name = 'accounts',
  urlpatterns = [
      ...,
      path('<int:user_pk>/follow/', views.follow, name='follow')
  ]
  ```
- **views.py**
  ```python
  @require_POST
  def follow(request, user_pk):
      if request.user.is_authenticated:
          if request.user.pk != user_pk:
              User = get_user_model()
              person = User.objects.get(pk=user_pk)
              if person.followers.filter(pk=reqeust.user.pk).exists():
              # if reuqest.user in person.followers.all():
                  person.followers.remove(request.user)
              else:
                  person.followers.add(request.user)
          return redirect('accounts:profile' person.username)
      return redirect('accounts:login')
  ```
- **profile.html**
  ```html
  {% block content %}
  <h1>{{ person.username }}'s profile</h1>
  <div>
    Followers: {{ person.followers.all|length }} Followings:{{
    erson.followings.all|length }}
  </div>
  {% if request.user != person %}
  <div>
    <form action="{% url 'accounts:follow' person.pk %}" method="POST">
      {% csrf_token %} {% if request.user in person.followers.all %} <input
      type="submit" value=="Follow"> {% else %} <input type="submit"
      value=="Unfollow"> {% endif %}
    </form>
  </div>
  ... {% endblock content %}
  ```
