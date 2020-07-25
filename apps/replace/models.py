from datetime import datetime

from django.db import models


# Create your models here.
class VersionControl(models.Model):
    version_code = models.CharField(null=True, blank=True, max_length=10, verbose_name="版本号")
    file = models.FileField(null=True, blank=True, upload_to="message/images/", verbose_name="前端js文件",
                            help_text="前端js文件")
    add_time = models.DateTimeField(default=datetime.now, verbose_name="添加时间")

    class Meta:
        verbose_name = "版本信息"
        verbose_name_plural = verbose_name
        db_table = "replace_version"

    # 重载str方法使后台不再直接显示object
    def __str__(self):
        return '版本{0}已更新'.format(self.version_code)
