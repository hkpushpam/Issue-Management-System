from collections import defaultdict
from rest_framework import serializers
from app.models import Employee, IssueDetails, CommentDetails, DailySummary, Comments, Issue
from datetime import datetime, timedelta


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = CommentDetails
        fields = [
            'comment_id',
            'issue_connected',
            'comment_content',
            'comment_date',
            'author',
            'author_email'
        ]

    def get_author(self, obj):
        return f"{obj.author_first_name} {obj.author_last_name}"

class IssueSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = IssueDetails
        fields = [
            'issue_id',
            'issue_title',
            'issue_content',
            'issue_date',
            'is_solved',
            'labels',
            'author',
            'author_email',
            'author_degisnation'
        ]

    def get_author(self, obj):
        return f"{obj.author_first_name} {obj.author_last_name}"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        labels = representation.get('labels', '')
        representation['labels'] = [label.strip() for label in labels.split(',')] if labels else []
        return representation

class DailySummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySummary
        fields =['date', 'issues_solved', 'issues_created']

class WeeklySummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySummary
        fields = ['date', 'issues_solved', 'issues_created', 'comments_created']

class EmployeeRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'employeeId', 'Degisnation', 'is_superuser']

    def create(self, validated_data):
        user = Employee.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            employeeId=validated_data['employeeId'],
            Degisnation=validated_data['Degisnation'],
            is_superuser=validated_data['is_superuser']
        )
        return user

class NewCommentSerializer(serializers.ModelSerializer):
    author_email = serializers.EmailField(write_only=True)
    class Meta:
        model = Comments
        fields = ['content', 'author_email', 'issue_commented']

    def create(self, validated_data):
        author_email = validated_data.pop('author_email')
        author = Employee.objects.get(email=author_email)
        issue_commented = validated_data.pop('issue_commented')

        comment = Comments.objects.create(
            content=validated_data['content'],
            author=author,
            issue_commented=issue_commented
        )
        return comment

class NewIssueSerializer(serializers.ModelSerializer):
    author_email = serializers.EmailField(write_only=True)

    class Meta:
        model = Issue
        fields = ['title', 'content', 'author_email', 'labels']

    def create(self, validated_data):
        author_email = validated_data.pop('author_email')
        author = Employee.objects.get(email=author_email)
        issue = Issue.objects.create(
            title=validated_data['title'],
            content=validated_data['content'],
            author=author,
            labels=validated_data['labels']
        )
        return issue

class IssueSolveChangeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Issue
        fields = ['id']
    def update(self, instance, validated_data):
        instance.is_solved = not instance.is_solved
        if(instance.is_solved):
            instance.date_solved = datetime.now()
        else:
            instance.date_solved = None
        instance.save()
        return instance