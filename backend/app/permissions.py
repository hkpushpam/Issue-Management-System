from rest_framework.permissions import BasePermission

class canCloseIssue(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.User
        return user.is_superuser
