from nntplib import ArticleInfo
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods, require_POST, require_safe
from django.http import HttpResponse

from .models import Movie, Comment
from .forms import MovieForm, CommentForm

# Create your views here.
@require_safe
def index(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies,
    }
    return render(request, 'movies/index.html', context)

# @login_required, detail까지는 비로그인 사용자도 볼 수 있도록
@require_safe
def detail(request, pk):
    movie = Movie.objects.get(pk=pk)
    comments = Comment.objects.filter(movies_id=pk)
    comment_form = CommentForm()
    context = {
        'movie': movie,
        'comments': comments,
        'comment_form': comment_form,
    }
    return render(request, 'movies/detail.html', context)

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

@login_required
@require_http_methods(['GET', 'POST'])
def update(request, pk):
    movie = Movie.objects.get(pk=pk)
    if request.user == movie.accounts:
        if request.method == 'POST':
            form = MovieForm(request.POST, instance=movie)
            if form.is_valid():
                form.save()
                return redirect('movies:detail', pk)
        else:
            form = MovieForm(instance=movie)
        context = {
            'movie': movie,
            'form': form
        }
        return render(request, 'movies/update.html', context)
    return HttpResponse(status=403)

@require_POST
def delete(request, pk):
    movie = Movie.objects.get(pk=pk)
    if request.user.is_authenticated and movie.accounts_id==request.user.id:    # 로그인하였고, 본인이 작성한 글이 맞을 때
        movie.delete()
        return redirect('movies:index')
    return HttpResponse(status=403) # 삭제할 권한이 없다는 에러메시지

@require_POST
def comments_create(request, pk):
    if request.user.is_authenticated:
        movie = Movie.objects.get(pk=pk)
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.movies = movie
            comment.accounts = request.user
            comment.save()
        return redirect('movies:detail', pk)
    return redirect('accounts:login')

@require_POST
def comments_delete(request, movie_pk, comment_pk):
    if request.user.is_authenticated:
        comment = Comment.objects.get(pk=comment_pk)
        if request.user == comment.accounts:
            comment.delete()
            return redirect('movies:detail', movie_pk)
        return HttpResponse(status=403)
    return redirect('accounts:login')
