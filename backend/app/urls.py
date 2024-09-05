from .import views
from django.urls import path


urlpatterns = [
    path('user/<str:token>', views.UserDetailsView.as_view()),
    path('user/logout/<str:token>',views.UserLogout.as_view()),
    path('issue/', views.IssueListView.as_view()),
    path('comments/<int:id>',views.CommentListView.as_view()),
    path('chart/', views.DailySummaryListView.as_view()),
    path('card/',views.WeeklySummaryListView.as_view()),
    path('registration/', views.RegistrationView.as_view()),
    path('comment/new/', views.NewCommentView.as_view()),
    path('issue/new/', views.NewIssueView.as_view()),
    path('issue/solve/', views.IssueSolveChangeView.as_view())
]