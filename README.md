# Vue前台 +  Django3.1 + DjangoRestful Framework + Ant Design Pro V4 开发的在线教育网站及后台管理

[![Build Status](https://travis-ci.org/mtianyan/hexoBlog-Github.svg?branch=master)](https://travis-ci.org/mtianyan/hexoBlog-Github)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

使用TyAdmin(现代化的Xadmin替代品)生成管理后台前后端，并自动对接。

## 项目演示

![](http://cdn.pic.mtianyan.cn/blog_img/20201009224848.png)

![](http://cdn.pic.mtianyan.cn/blog_img/20201009230342.png)


## 运行指南:

### docker运行

```
git clone https://github.com/mtianyan/VueDjangoAntdProBookShop.git
cd VueDjangoAntdProBookShop
docker-compose up

# 导入数据
docker exec -it onlinemooc_mtianyan_mysql_1 bash
mysql -u root -p -D mxonline3 < sql/mxonline3.sql
# 输入密码: mtianyanroot 
```

### 本地环境运行

后端项目运行:

```
git clone https://github.com/mtianyan/OnlineMooc.git
cd OnlineMooc
pipenv shell
pip install -r requirements.txt

# Navicat创建数据库，导入mxonline3.sql
# 修改settings.py 中数据库密码

python manage.py runserver
```

很高兴我的项目代码或许对你有帮助，请我吃包辣条或喝瓶可乐吧!

微信打赏:

![mark](http://myphoto.mtianyan.cn/blog/180302/i52eHgilfD.png?imageslim)






>账号: mtianyan
密码: admin2020

- 首页地址: https://mooc.funpython.cn/

## 运行指南:

### docker运行

```
git clone https://github.com/mtianyan/OnlineMooc.git
cd OnlineMooc
docker-compose up

# 导入数据
docker exec -it onlinemooc_mtianyan_mysql_1 bash
mysql -u root -p -D mxonline3 < sql/mxonline3.sql
# 输入密码: mtianyanroot 
```

### 本地环境运行

后端项目运行:

```
git clone https://github.com/mtianyan/OnlineMooc.git
cd OnlineMooc
pipenv shell
pip install -r requirements.txt

# Navicat创建数据库，导入mxonline3.sql
# 修改settings.py 中数据库密码

python manage.py runserver
```

很高兴我的项目代码或许对你有帮助，请我吃包辣条或喝瓶可乐吧!

微信打赏:

![mark](http://myphoto.mtianyan.cn/blog/180302/i52eHgilfD.png?imageslim)




