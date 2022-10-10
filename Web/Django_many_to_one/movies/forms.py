from lib2to3.pgen2.pgen import generate_grammar
from socket import fromshare
from django import forms
from .models import Movie, Comment

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

class CommentForm(forms.ModelForm):
    
    class Meta:
        model = Comment
        exclude = ('accounts', 'movies',)