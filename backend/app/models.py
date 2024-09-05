from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import json

# Create your models here.
#  TODO: users will of 3 types:- user, admin and approver
#  Todo: new user can register themselves and the approver need to aprrove them
#  tODO: USER WILL HAVE 3 STAGE BEFORE new, approved, active, one extra will be decativation of a user only by the admin.

class Employee(AbstractUser):
    # is_approved = models.BooleanField(default=False)
    # is_approver = models.BooleanField(default=False)
    employeeId = models.CharField(max_length=15)
    Degisnation = models.CharField(max_length=30)

class Issue(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    author = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(default=timezone.now)
    is_solved = models.BooleanField(default=False)
    date_solved = models.DateTimeField(null=True)
    labels = models.TextField(null=True)

    def set_labels(self, words_list):
        self.words = json.dumps(words_list)

    def get_labels(self):
        return json.loads(self.words)

    def mark_solve(self):
        self.is_solved = True
        return self

    @property
    def number_of_comments(self):
        return Comments.objects.filter(post_connected=self).count()

class Comments(models.Model):
    content = models.TextField(max_length=100)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(to=Employee, on_delete=models.CASCADE)
    issue_commented = models.ForeignKey(Issue, on_delete=models.CASCADE)

# Views
class CommentDetails(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    issue_connected = models.IntegerField()
    issue_title = models.CharField(max_length=50)
    comment_content = models.TextField()
    comment_date = models.DateTimeField()
    author_first_name = models.CharField(max_length=150)
    author_last_name = models.CharField(max_length=150)
    author_email = models.EmailField()

    class Meta:
        managed = False
        db_table = 'comment_details'

class IssueDetails(models.Model):
    issue_id = models.IntegerField(primary_key=True)
    issue_title = models.CharField(max_length=50)
    issue_content = models.TextField()
    issue_date = models.DateTimeField()
    is_solved = models.BooleanField()
    labels = models.TextField()
    author_first_name = models.CharField(max_length=150)
    author_last_name = models.CharField(max_length=150)
    author_email = models.EmailField()
    author_degisnation = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'issue_details'

class DailySummary(models.Model):
    date = models.DateField(primary_key=True)
    issues_solved = models.IntegerField()
    issues_created = models.IntegerField()
    comments_created = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'daily_summary'

