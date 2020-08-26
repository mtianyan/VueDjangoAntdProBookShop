from django.core.files.images import ImageFile
from django.db import models
from django.db.models.fields.files import FieldFile


class richTextField(models.TextField):
    pass


class MyFieldFile(FieldFile):
    @property
    def url(self):
        self._require_file()
        if self.name.startswith("http://") or self.name.startswith("https://"):
            ret = self.name
        else:
            ret = self.storage.url(self.name)
        return ret


class ImageFieldFile(ImageFile, MyFieldFile):
    def delete(self, save=True):
        # Clear the image dimensions cache
        if hasattr(self, '_dimensions_cache'):
            del self._dimensions_cache
        super().delete(save)


class ImageField(models.ImageField):
    attr_class = ImageFieldFile
