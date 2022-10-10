## 1. 학습 내용
1) ModelForm을 이용한 CRUD서비스구현
2) Django 라이브러리를 활용한 Authentification 기능 구현
3) 1:N의 RDMS 데이터 관계망 형성
## 2. 배운 내용
#### 2-1.1:N모델 구현
* account(user):movie == 1:N
* account(user):comment == 1:N
* movie:comment == 1:N
```python
from cgitb import text
from django.db import models
from django.conf import settings

# Create your models here.
class Movie(models.Model):
    accounts = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    audience = models.IntegerField()
    release_date = models.DateField()
    genre = models.CharField(max_length=30)
    score = models.FloatField()
    poster_url = models.TextField()
    description = models.TextField()
    recommendation = models.CharField(max_length=200)  # 임의 추가

class Comment(models.Model):
    accounts = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movies = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```
#### 2-2.Widget활용
* ChoiceField에서 choices를 정의하는 방법 실습
* Fields의 widget은 데이터를 입력받는 형식(Input)을 정의하고, 각 Input이 가지고 있는 attrs의 key값을 수정함으로써 사용자 입력을 제한 및 수정할 수 있다.
```python
class MovieForm(forms.ModelForm):
    GENRE_1 = 'action'
    GENRE_2 = 'animation'
    GENRE_3 = 'comedy'
    GENRE_4 = 'documentary'
    GENRE_5 = 'drama'
    GENRE_6 = 'fantasy'
    GENRE_7 = 'history'
    GENRE_8 = 'horror'
    GENRE_9 = 'muscial'
    GENRE_10 = 'sf'
    GENRE_11 = 'sports'
    GENRE_12 = 'thriller'
    GENRE_CHOICES = [
        (GENRE_4, '다큐'),
        (GENRE_5, '드라마'),
        (GENRE_9, '뮤지컬'),
        (GENRE_7, '사극'),
        (GENRE_12, '스릴러'),
        (GENRE_11, '스포츠'),
        (GENRE_10, 'SF'),
        (GENRE_2, '애니메이션'),
        (GENRE_1, '액션'),
        (GENRE_3, '코미디'),
        (GENRE_6, '판타지'),
        (GENRE_8, '호러'),
    ]
    genre = forms.ChoiceField(choices=GENRE_CHOICES,)
    score = forms.FloatField(
        widget=forms.NumberInput(
            attrs={
                'max_value': 5,
                'min_value': 0,
                'step_size': 0.5
                }
            ),
        )
    release_date = forms.DateField(
        widget= forms.DateInput(
            attrs={
                'type': 'date',
                }
            ),
        )

    class Meta:
        model = Movie
        exclude = ('accounts',)
```
#### 2-3.Decorator활용 
* login_required 데코레이터는 request하는 user가 인증된 사용자로 제한한다.
    * user.is_authenticated 값을 확인함으로써 비슷한 기능을 구현할 수 있다.
* require_http_methods, require_POST, require_safe 데코레이터들은 request method의 형식을 제한한다
    * login_required 데코레이터와 함께 사용할 때, 순서를 잘 고려해야 사용자 편의성을 높일 수 있다.
```python
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

@login_required
@require_http_methods(['GET', 'POST'])
def create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            movie = form.save(commit=False)
            movie.accounts = request.user
            movie.save()
            # movie.pk가 있는과 과연??
            return redirect('movies:detail', movie.id)
    else:
        form = MovieForm()
    context = {
        'form': form,
    }
    return render(request, 'movies/create.html', context)
```
#### 2-4.Django html함수 활용
* {% if request.user.is_authenticated %} {% endif %}
    * user가 로그인했을 경우에만, if 구문 사이의 결과를 표시한다.
* {% if user == movie.accounts %}
    * user가 movie객체가 참조하는 부모테이블의 account 객체와 동일할 경우에만, if 구문 사이의 내용을 표시한다.
    * 아래 코드의 경우, 해당 movie를 등록한 사용자에게만 UPDATE와 DELETE버튼이 보인다.
    * 이러한 기능은 시각적인 UI에서만 기능이 제한됙 때문에, 더 강력한 기능을 위해서만 view함수에서 decorator등을 적절하게 사용해야한다.
```html
<!-- movies/detail.html -->
{% extends 'base.html' %}

{% block content %}
  {% if user == movie.accounts %}
  <a class="btn btn-info" href=" {% url 'movies:update' movie.pk %} ">UPDATE</a>
  <form class = "d-inline" action=" {% url 'movies:delete' movie.pk %} " method="POST">
    {% csrf_token %}
    <input class="btn btn-danger" type="submit" value="DELETE">
  </form>
  {% endif %}
{% endblock content %}
```
## 3. 어려웠던 점
#### 3-1. 다양한 form들의 parameter의 순서
* 다양한 form들을 사용하면서 parameter의 종류 및 순서가 외우기 어려웠다.
* 특히 다른 form들은 (request.method, instance=)의 유사한 parameter 수서를 가지는 반면
* PasswordChangeForm과 AuthenticationForm은 그러한 규칙성도 보이지 않았다.
```python
form = MovieForm()
form = MovieForm(instance=movie)
form = MovieForm(request.POST, instance=movie)

comment_form = CommentForm()
comment_form = CommentForm(request.POST)

form = CustomUserCreationForm()
form = CustomUserCreationForm(request.POST)

form = CustomUserChangeForm(instance=request.user)
form = CustomUserChangeForm(request.POST, instance=request.user)

form = PasswordChangeForm(request.user)
form = PasswordChangeForm(request.user, request.POST)

form = AuthenticationForm()
form = AuthenticationForm(request, request.POST)
```
#### 3-2. accounts를 외래키로 사용하는 column은 이름은 user로
* accounts 앱의 model에서 키를 참조하기 때문에, 해당 칼럼을 account라고 선언했는데, 큰 실수였다.
* user로 받아오는 편이 나중에 views.py나 .html에서 사용할 때 더 직관적이다.
* 다음은 accounts로 선언함으로써 발생한 안 좋은 예시들이다.
```python
@require_POST
def delete(request, pk):
    movie = Movie.objects.get(pk=pk)
    if request.user.is_authenticated and movie.accounts_id==request.user.id:    # and 오른쪽 구문의 직관성이 떨어진다.
        movie.delete()
        return redirect('movies:index')
    return HttpResponse(status=403) 
```
```html
<!-- 아래 if 구문이 직관성이 떨어진다. -->
{% if user == movie.accounts %} 
  <a class="btn btn-info" href=" {% url 'movies:update' movie.pk %} ">UPDATE</a>
  <form class = "d-inline" action=" {% url 'movies:delete' movie.pk %} " method="POST">
    {% csrf_token %}
    <input class="btn btn-danger" type="submit" value="DELETE">
  </form>
{% endif %}
```