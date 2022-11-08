**Import data.csv data into db.sqlite3**
* opening sqlite3 shell with db.sqlite3
    * `sqlite3 db.sqlite3`
* sqlite's dot-commands
    * `.mode csv`
    * `.import data.csv AppName_ModelName`
    * `.exit`

**Check the SQL statement of the query**
    * `print(Django_Query.query)`

## 0. Schema
* User
    * first_name: str
    * last_name: str
    * age: int
    * country: str
    * phone: str
        * 010-1234-5678
    * balance: int
## 1. CRUD
* Create a record
    * `User.objects.create(first_name='', ...)`
* Read all the records
    * `User.objects.all()`
* Read the 101th record
    * `User.objects.get(pk=101)`
* Read the number of records
    * `User.objects.count()`
* Update the 101th record's last_name into 'Kim'
    * `user = User.objects.get(pk=101)`
    * `user.last_name='Kim'`
    * `user.save()`
* Delete the 101the record
    * `user = User.objects.get(pk=101)`
    * `user.delete()`

## 2. Sorting Data
* values()
    * return a list of dictionaries
    * if the parameter is empty, it use all the fields as keys
* order_by()
    * reverse: '-field_name'
    * random: '?'
    * when there're more than two parameters, it works as python.sort() does
* Read first_name and age in order of age
    * `User.objects.order_by('age').values('first_name', 'age')`
* Read all the fields in order of age
    * `User.objects.order_by('age').values()`
* Read first_name and age in reverse order of age
    * `User.objects.order_by('-age').values('first_name', 'age')`
* Read first_name and age in random order
    * `User.objects.order_by('?').values('first_name', 'age')`
* Read first_name in order of age. If the age is the same, sort in reverse ordef of account_balance
    * `User.objects.order_by('age', '-balance').values('first_name')`

## 3. Filtering Data
[Django_Filter_Lookups](https://docs.djangoproject.com/en/4.1/ref/models/querysets/)
* Read all the countries without duplication
    * `User.objects.distinct().values('country')`
* Read all the countries without duplication inf order of country
    * `User.objects.distinct().values('country').order_by('country')`
* Read first_name with age == 30
    * `User.obejcts.filter(age=30).values('first_name')`
* Read first_name with age >= 30
    * `User.obejcts.filter(age__gte=30).values('first_name')`
* Read first_name with age >= 30 and balance > 50
    * `User.obejcts.filter(age__gte=30, balance__gt=50).values('first_name')`
    * `from django.db.models import Q`
    * `User.objects.filter(Q(age__gte=30) & Q(balance__gt=50))`
* Read first_name which contains 'A'
    * `User.obejcts.filter(first_name__contains='A').values('first_name')`
* Read phone which starts with '011'
    * `User.obejcts.filter(phone__startswiths='011-').values('phone')`
* Read phone which endswith with '9'
    * `User.obejcts.filter(phone__endswith='9').values('phone')`
* Read first_name of people who live in Korea or America
    * `User.obejcts.filter(country__in=['Korea, 'America'']).values('first_name')`
* Read first_name of people who don't live in Korea or America
    * `User.obejcts.exclude(country__in=['Korea, 'America'']).values('first_name')`
* Read first_name of the 10 yougest people
    * `User.obejcts.order_by('age').values('first_name')[:10]`
* Read first_name of people 'whose age is 30' or 'whose the last_name is 'Kim''
    * `from django.db.models import Q`
    * `User.objects.filter(Q(age=30) | Q(last_name='Kim'))`

## 4. Grouping Data
### 4.1. Aggregation
[Django_Aggregation](https://docs.djangoproject.com/en/4.1/topics/db/aggregation/)
* `from django.db.models import function_name`
    * Examples
        * Avg()
        * Count()
        * Max()
        * Min()
        * Sum()
* it returns a dictionary, and the name of the key is 'ParameterName__FunctionName'
    * the key name can be changed
    * `User.objects.filter(age__gte=30).aggregate(Avg('avg'))`
        * `{'age__avg': 36.25}`
    * `User.objects.filter(age__gte=30).aggregate(average=Avg('avg'))`
        * `{'average': 36.25}`

### 4.1.1. Examples
* Read the largest balance
    * `User.objects.aggregate(Max('balance'))`
* Read the sum of balance
    * `User.objects.aggregate(Sum('balance'))`

### 4.1.2. Apply to Annotation
Adding an additional column for the records grouped by values()
* Read the number of people in each country
    * `User.objects.values('country').annotate(Count('country'))`
* Read the number of people and the average of balance in each country
    * `User.objects.values('country').annotate(Count('country'), avg_balance=Avg('balance'))`

### 4.1.3. Annotation with N:1
If there's N:1 relationship with Comment-Article
```python
# N : 1 = Comment : Article
Article.objects.annotate(
    number_of_comment=Count('comment'),
    number_of_recent_comment=Count('comment', filter=Q(comment__created_at__lte='2000-01-01'))
)
```
* the parameter 'comment' is **not related_name**, but **model_name**

* Example in the either project
    * models.py
    ```python
    class Question(models.Model):
        title = models.CharField(max_length=50)
        issue_a = models.CharField(max_length=50)
        issue_b = models.CharField(max_length=50)

    class Comment(models.Model):
        question = models.ForeignKey(Question, on_delete=models.CASCADE)
        content = models.CharField(max_length=100)
        pick = models.BooleanField()
    ```
    * forms.py
    ```python
    class CommentForm(forms.ModelForm):
        PICK_A = FALSE
        PICK_B = TRUE
        PICKS = [
            (PICK_A, '왼쪽'),
            (PICK_B, '오른쪽'),
        ]
        pick = forms.ChoiceField(choices=PICKS)

        class Meta:
            model = Comment
            fields = '__all__'
    ```
    * views.py
    ```python
    def detail(request, question_pk):
        count_a = Count('comment', filter=Q(comment__pick=False))
        count_b = Count('comment', filter=Q(comment__pick=True))
        total_count = Count('comment')

        question = Question.objects.annotate(
            count_a = count_a,
            count_b = count_b,
            totla_count = total_count,
        ).get(pk=questioin_pk)

        question.count_a # 왼쪽을 선택한 코멘트 갯수
        question.count_b # 오른을 선택한 코멘트 갯수
    ```

## 5. Optimization with Article Project
* 1:N (Article-Comment)
* 1:N (User-Article)
* 1:N (User-Comment)
1. Annotate
    Situation: I want to display the number of comments for each article in the index_1.html
    * views.py
    ```python
    def index_1(request):
        articles = Article.objects.annotate(Count('comments')).order_by('-pk')
        context = {
            'articles': articles,
        }
        return render(request, 'articles/index_1.html', context)
    ```
    * index_1.html
    ```html
    {% extends 'base.html' %}

    {% block content %}
    <h1>Articles</h1>
    <hr>
    {% for article in articles %}
        <p>Title: {{ article.title }}</p>
        <p>Comments: {{ article.comment__count }}</p>
        <hr>
    {% endfor %}
    {% endblock content %}
    ```
2. selected_related
    Situation: I want to display the username for each article in the index_2.html
    * views.py
    ```python
    def index_2(request):
        articles = Article.objects.select_related('user').order_by('-pk')
        context = {
            'articles': articles,
        }
        return render(request, 'articles/index_2.html', context)
    ```
    * index_2.html

3. prefetch_related
    Situation: I want to display all the comments for each article in the index_3.html
    * views.py
    ```python
    def index_3(request):
        articles = Article.objects.prefetch_related('comment_set').order_by('-pk')
        context = {
            'articles': articles,
        }
        return render(request, 'articles/index_3.html', context)
    ```
    * index_3.html
4. select_realted & prefetch_related
    Situation: I want to display the author and all the comments for each article in the index_4.html
    * views.py
    ```python
    def index_4(request):
        articles = Article.objects.prefetch_related(
            Prefetch('comment_set', queryset=Comment.objects.select_related('user'))
        ).order_by('-pk')
        context = {
            'articles': articles,
        }
        return render(request, 'articles/index_4.html', context)
    ```
    * index_4.html
