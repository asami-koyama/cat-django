from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils import timezone
from django.core.mail import send_mail
from django.contrib.auth.base_user import BaseUserManager

# デフォルトのUserModelを変更
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, user_type, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, user_type=None,**extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, user_type, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)

USER_TYPE = [
   ('Adopter', 'Adopter'),
   ('Supporter', 'Supporter')
]

class User(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.
    Username and password are required. Other fields are optional.
    """
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("そのユーザ名は既に使われています！"),
        },
    )
    email = models.EmailField(_('email address'), blank=True,unique=True)
    # user_type( 里親 = 'Adopter' / サポーター = 'Supporter')
    user_type = models.CharField(_('usertype'), max_length=255, choices=USER_TYPE)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)


    objects = UserManager()

    # email + password でログインに変更
    EMAIL_FIELD = 'email' # fix
    USERNAME_FIELD = 'email' # fix
    REQUIRED_FIELDS = ['username','user_type'] # fix

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)


STATUS_CAT = [
   ('募集中', '募集中'),
   ('申請中', '申請中'),
   ('お家決定','お家決定')
]

GENDER = [
    ('オス','オス'),
    ('メス','メス')
]

class Cat(models.Model):
    name = models.CharField(max_length=64, blank=False)
    status = models.CharField(max_length=128, choices=STATUS_CAT, blank=False)
    location = models.CharField(max_length=128, blank=False)
    protected_date = models.DateField()
    age_year = models.IntegerField(blank=True, null=True)
    age_month = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=8, choices=GENDER)
    pattern = models.CharField(max_length=128)
    color = models.CharField(max_length=64)
    note = models.CharField(max_length=1024)
    img = models.ImageField(upload_to='post_images', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

'''
class Offer(models.Model):
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE, related_name="cat")
    adopter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="adopter")
    supporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="supporter")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.cat

class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver")
    messeage = models.CharField(max_length=2048)
    is_readed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.messeage
'''