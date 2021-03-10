# Vue前台 +  Django3.1 + DjangoRestful Framework + Ant Design Pro V4 开发的二手书商城网站及后台管理

[![Build Status](https://travis-ci.org/mtianyan/hexoBlog-Github.svg?branch=master)](https://travis-ci.org/mtianyan/hexoBlog-Github)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

使用TyAdmin(现代化的Xadmin替代品)生成管理后台前后端，并自动对接。✨ 强烈推荐使用:

>https://github.com/mtianyan/tyadmin_api_cli 

📨 Tyadmin互动交流反馈QQ群: 304094780

## 项目演示

![](http://cdn.pic.mtianyan.cn/blog_img/20201204231519.png)

![](http://cdn.pic.mtianyan.cn/blog_img/20201204231446.png)

## 运行指南:

### docker运行

```
git clone https://github.com/mtianyan/VueDjangoAntdProBookShop.git
cd VueDjangoAntdProBookShop
docker-compose up

# 导入数据
docker exec -it vuedjangoantdprobookshop_mtianyan_mysql_1 bash
mysql -u root -p -D vue_shop < sql/book_shop.sql
# 输入密码: mtianyanroot 
```

### 本地环境运行

后端项目运行:

```
git clone https://github.com/mtianyan/VueDjangoAntdProBookShop.git
cd VueDjangoAntdProBookShop
pipenv shell
pip install -r requirements.txt

# Navicat创建数据库，book_shop.sql.sql
# 修改settings.py 中数据库密码

python manage.py runserver
```

访问首页: http://127.0.0.1:8000/index
访问后台: http://127.0.0.1:8000/xadmin


很高兴我的项目代码或许对你有帮助，请我吃包辣条或喝瓶可乐吧!

微信打赏:

![mark](http://myphoto.mtianyan.cn/blog/180302/i52eHgilfD.png?imageslim)