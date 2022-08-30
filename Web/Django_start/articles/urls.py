from django.urls import path
from articles import views

# articles의 urls
app_name = 'articles'
urlpatterns = [
    path('index/', views.index, name='index'),  # 나중에 a 태그 등으로 이동할 때, 해당 url의 주소가 아닌 그냥 name값으로
    # {% url 'index' %}
    path('greeting/', views.greeting, name='dinner'),
    path('dinner/', views.dinner, name='dinner'),
    path('throw/', views.throw, name='throw'),
    path('catch/', views.catch, name='catch'),
    path('fake-google/', views.fake_google, name='fake-google'),
    path('hello/<str:name>/', views.hello, name='hello'),
]
