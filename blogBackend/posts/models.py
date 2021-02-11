from django.db import models

from wagtail.api import APIField

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.api.fields import ImageRenditionField

class PostPage(Page):
    post_title = models.CharField(max_length=200)

    body = RichTextField(blank=True)

    image = models.ForeignKey(
        'wagtailimages.Image',
        null = True,
        blank = False,
        on_delete = models.SET_NULL,
        related_name = "+"
    )

    content_panels = Page.content_panels + [
        FieldPanel('post_title'),
        FieldPanel('body'),
        ImageChooserPanel('image')
    ]

    api_fields = [
        APIField('post_title'),
        APIField('body'),
        APIField('post_image', serializer=ImageRenditionField('original', source='image'))
    ]