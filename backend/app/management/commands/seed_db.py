from django.core.management.base import BaseCommand
from app.models import Employee, Issue, Comments

class Command(BaseCommand):
    help = 'Seed database with initial data'

    def handle(self, *args, **options):
        Employee.objects.all().delete()
        Issue.objects.all().delete()
        Comments.objects.all().delete()

        Employee1 = Employee.objects.create(username='john', email='john@doe.com', password='1234', employeeId='Emp1', Degisnation='Manager')
        Employee2 = Employee.objects.create(username='jane', email='jane@doe.com', password='123', employeeId='Emp2', Degisnation='Staff')
        Employee3 = Employee.objects.create(username='jhon', email='jhon@doe.com', password='12345', employeeId='Emp3', Degisnation='DGM')

        Issue1 = Issue.objects.create(title='Issue 1', content='Description 1', author=Employee1, labels='label1, label2, label3')
        Issue2 = Issue.objects.create(title='Issue 2', content='Description 2', author=Employee2, labels='label1, label 3')
        Issue3 = Issue.objects.create(title='Issue 3', content='Description 3', author=Employee1, labels='label2, label3')

        Comment1 = Comments.objects.create(content='Comment 1', author=Employee2, issue_commented=Issue1)
        Comment2 = Comments.objects.create(content='Comment 2', author=Employee1, issue_commented=Issue1)
        Comment3 = Comments.objects.create(content='Comment 3', author=Employee2, issue_commented=Issue1)
        Comment4 = Comments.objects.create(content='Comment 4', author=Employee2, issue_commented=Issue2)
        Comment5 = Comments.objects.create(content='Comment 5', author=Employee3, issue_commented=Issue2)
        Comment6 = Comments.objects.create(content='Comment 6', author=Employee3, issue_commented=Issue3)
