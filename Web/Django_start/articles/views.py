from django.http import HttpResponse
from django.shortcuts import render
import random

# Create your views here.
def index(request):
    print('here', request)  # cmd에 출력될 것임
    # return HttpResponse("<h1>Cola</h1>")      # 웹브라우저에 반환되는 값. HTTPResponse랑 다름. http를 다른 곳에 저장(articles > templates)
    return render(request, 'articles/index.html')        # templates폴더 안에 있는데 왜 index.html만 할까??

def greeting(request):
    fruits = ['peach', 'banana', 'orange']
    context = {
        'info': {'name': 'Lee'},
        'foods': fruits,
    }
    return render(request, 'articles/greeting.html', context)

def dinner(request):
    foods = ['peach', 'banana', 'orange']
    pick = random.choice(foods)

    context = {
        'foods': foods,
        'pick': pick,
    }
    return render(request, 'articles/dinner.html', context)

def throw(request):
    return render(request, 'articles/throw.html')

def catch(request):
    data = request.GET.get('message')    # data는 사용자의 요청안에 있음. 딕셔너리. json
    context = {'data': data}
    return render(request, 'articles/catch.html', context)

def fake_google(request):
    return render(request, 'articles/fake-google.html')

def hello(request, name):
    context = {'name': name}
    return render(request, 'articles/hello.html', context)
