## 1. Intro
### 1.0. Terms
* Source model
    * The model that has ManyToManyField
* Target model
    * The model that doesn't have ManyToManyField

### 1.1. The limits of N:1 Relationship
```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=modles.CASCADE)
    name = models.TextField()
```
If one patient want to make a reservation with 2 diffrent doctors
|id|name|doctor_id|
|:---:|:---:|:---:|
|1|Alex|1|
|1|Alex|2|
* We can't distingush whether the first Alex and the second Alex is the same person

### 1.2. Intermediary Model
```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    name = models.TextField()

class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=modles.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=modles.CASCADE)
```
* create a record
    * `Reservation.objects.create(doctor=doctor_instance, patient=patient_instance)`
* read data
    * if doctor1 wants to read all the reservation
        * `doctor1.reservaton_set.all()`
    * if patient1 wants to read all the reservation
        * `patinet1.reservaton_set.all()`

### 1.3. ManyToManyField
```python
class Doctor(models.Model):
    name = models.TextField()

class Patient(models.Model):
    doctors = models.ManyToManyField(Doctor)
    name = models.TextField()
```
* Additional table
    * AppName_patient_doctors
    * it looks same as the intermediary model
        |id|ptient_id|doctor_id|
        |---|---|---|
* create a record
    * `patient1.doctors.add(doctor1)`
    * `doctor1.patient_set.add(patient1)`
* read data
    * if doctor1 wants to read all the reservation
        * `doctor1.patient_set.all()`
        * `doctor1.patient_set.get(id=doctor_id)`
            * in many to many relationships, Django automatically recognize the 'id' as the other class' object id
    * if patient1 wants to read all the reservation
        * `patient1.doctors.all()`
        * `doctor1.patient_set.get(id=patient_id)`
* remove data
    * if doctor1 wants to cancel the reservation with patient1
        * `doctor1.patient_set.remove(patient1)`
    * if patient1 wants to cancel the reservation with doctor1
        * `patient1.doctors.remove(doctor1)`

### 1.4. ManyToManyField with Extra Fields
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
* create a record
    * through Reservation Model
        * `Reservation.objects.create(doctor=doctor1, patient=patient1, symptom='stomachache')`
    * through ManyToMany Field
        * `patient1.doctors.add(doctor1, through_defaults={'symptom': 'flu'})`
        * through_defaults can be defined as a function

## 2. ManyToManyField
* MantoToManyField(to, **options)
    * to: the target model
    * Methods
        * add(), remove(), create(), clear(), ...
    * Table name
        * Default: AppName_ModelName_FieldName
        * `db_table`
            * the argument for changing the table name
    * Field name
        * When targetting another model
            |id|SourceModel_id|TargetModel_id|
            |---|---|---|
        * 'self'
            |id|form_ModelName_id|to_ModelName_id|
            |---|---|---|
* options
    1. related_name
        * In M : N relationship, the related_name is usually set as the plural of the source model.
    2. through
        * Link to an intermediary table for extra data
    3. symmetrical
        * Default: True
        * This argument is valid, only when `to = 'self'`
        * When it's True, the record of the opposite direction is added automatically

## 3. Like (Article-User)
* models.py
    ```python
    class Article(models.Model):
        user = models.ForeignKey(setttings.AUTH_USER_MODEL, on_delete=models.CASCADE)
        like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name=like_articles)
    ```
    * **relate_name should be specified**
        * Otherwise, in the upper case, the dereferenced manager name(user.article_set) is duplicated.
* forms.py
    ```python
    class ArticleForm(models.ModelForm):
        
        class Meta:
            model = Article
            exclude = ('user', 'like_users', )
    ```
* urls.py
    ```python
    app_name = 'articles',
    urlpatterns = [
        ...,
        path('<int:article_pk>/likes/', views.likes, name='likes')
    ]
    ```
* views.py
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
    * exists()
        * Returns True if the QuerySet has value, or False

* index.html
    ```html
    {% block content %}
    {% for article in articles %}
        <p><b>작성자 : {{ article.user }}</b></p>
        <p>글 번호: {{ article.pk }}</p>
        <p>글 제목: {{ article.title }}</p>
        <p>글 내용: {{ article.content }}</p>
        <div>
            <form action="{% url 'article:likes' article.pk %}" method="POST">
                {% csrf_token %}
                {% if request.user in article.like_users.all %}
                    <input type="submit" value="좋아요취소">
                {% else %}
                    <input type="submit" value="좋아요">
                {% endif %}
            </form>
        </div>
        <a href="{% url 'articles:detail' article.pk %}">DETAIL</a>
        <hr>
    {% endfor %}
    {% endblock content %}
    ```

## 3. Follow (User-User)
### 3.1. Profile Page
* urls.py
    ```python
    app_name='accounts'
    urlpatterns = [
        path('profile/<str:username>/', views.profile, name='profile'),
    ]
    ```
    * if `path('<str:username>/', views.profile, name='profile')`
        * All the url below this path starting with string wouldn't work properly
* views.py
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
* profile.html
    ```html
    {% block content %}
        <h1>{{ person.username }}'s profile</h1>

        <h4>{{ person.username }}'s articles</h4>
        {% for article in person.article_set.all %}
            <div>{{ article.title }}</div>
        {% endfor %}
        <hr>
        <h4>{{ person.username }}'s comments</h4>
        {% for comment in person.comment_set.all %}
            <div>{{ comment.content }}</div>
        {% endfor %}
        <hr>
        <h4>{{ person.username }}'s liked articles</h4>
        {% for article in person.like_articles.all %}
            <div>{{ article.title }}</div>
        {% endfor %}
    {% endblock content %}
    ```
* base.html
    ```html
    <a href="{% url 'accounts:profile' user.username %}">My Profile</a>
    ```
* index.html
    ```html
    {% block content %}
        {% for article in articles %}
            <p>
                <b>작성자 : <a href="{% url 'accounts:profile' article.user.username %}">{{ article.user }}</a></b>
            </p>
            <p>글 번호: {{ article.pk }}</p>
            <p>글 제목: {{ article.title }}</p>
            <p>글 내용: {{ article.content }}</p>
            <a href="{% url 'articles:detail' article.pk %}">DETAIL</a>
            <hr>
        {% endfor %}
    {% endblock content %}
    ```
### 3.2. Following
* models.py
    ```python
    class User(AbstractUser):
        followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    ```
* urls.py
    ```python
    app_name = 'accounts',
    urlpatterns = [
        ...,
        path('<int:user_pk>/follow/', views.follow, name='follow')
    ]
    ```
* views.py
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
* profile.html
    ```html
    {% block content %}
        <h1>{{ person.username }}'s profile</h1>
        <div>
            Followers: {{ person.followers.all|length }}  Followings:{{ erson.followings.all|length }}
        </div>
        {% if request.user != person %}
        <div>
            <form action="{% url 'accounts:follow' person.pk %}" method="POST">
                {% csrf_token %}
                {% if request.user in person.followers.all %}
                    <input type="submit" value=="Follow">
                {% else %}
                    <input type="submit" value=="Unfollow">
                {% endif %}
            </form>
        </div>
        ...
    {% endblock content %}
    ```
