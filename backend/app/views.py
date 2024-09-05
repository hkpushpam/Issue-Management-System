from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from .permissions import *
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import views
from rest_framework.authtoken.models import Token
# Create your views here.


class UserDetailsView(views.APIView):
    def get(self, request, token):
        user = Employee.objects.get(auth_token=token)
        full = user.get_full_name()
        return Response({
            'is_admin': user.is_superuser,
            'email': user.email,
            'name': full,
            'employeeId' :user.employeeId,
            'Degisnation': user.Degisnation
        })

class UserLogout(views.APIView):
    def post(self, request, token):
        try:
            token_obj = Token.objects.get(key=token)
            token_obj.delete()
            return Response("Succssful log out",status=status.HTTP_200_OK)
        except:
            return Response({ "Something went wrong." }, status=status.HTTP_400_BAD_REQUEST)

class IssueListView(generics.ListCreateAPIView):
    queryset = IssueDetails.objects.all()
    serializer_class = IssueSerializer

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        issue_id = self.kwargs.get('id')
        return CommentDetails.objects.filter(issue_connected=issue_id).order_by('-comment_date')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class DailySummaryListView(generics.ListAPIView):
    queryset = DailySummary.objects.all()
    serializer_class = DailySummarySerializer

class WeeklySummaryListView(views.APIView):
    def get(self, request):
        current_date = datetime.now().date()
        seven_days_ago = current_date - timedelta(days=6)  # 6 days ago + current day = 7 days
        daily_summaries = DailySummary.objects.filter(date__range=[seven_days_ago, current_date])
        serializer = WeeklySummarySerializer(daily_summaries, many=True)
        data = serializer.data
        issues_solved_last_7_days = self.get_issues_solved_last_7_days(data)
        return Response(issues_solved_last_7_days)

    def get_issues_solved_last_7_days(self, data):
        current_date = datetime.now().date()
        seven_days_ago = current_date - timedelta(days=6)
        issues_solved_list = [0] * 7
        issues_created_list = [0] * 7
        comment_created_list = [0] * 7

        for item in data:
            date = datetime.strptime(item['date'], '%Y-%m-%d').date()
            if seven_days_ago <= date <= current_date:
                index = (current_date - date).days
                if 0 <= index < 7:
                    issues_solved_list[6 - index] = item['issues_solved']
                    issues_created_list[6-index] = item['issues_created']
                    comment_created_list[6-index] = item['comments_created']

        return {
            'issue_createdlast7days': issues_created_list,
            'issue_solvedlast7days': issues_solved_list,
            'newcommentlast7days': comment_created_list
        }

class RegistrationView(views.APIView):
    def post(self, request):
        serializer = EmployeeRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NewCommentView(views.APIView):
    def post(self, request):
        serializer = NewCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NewIssueView(views.APIView):
    def post(self, request):
        serializer = NewIssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IssueSolveChangeView(views.APIView):
    def post(self, request):
        serializer = IssueSolveChangeSerializer(data=request.data)
        if serializer.is_valid():
            issue = Issue.objects.get(id=serializer.validated_data['id'])
            serializer.update(issue, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

