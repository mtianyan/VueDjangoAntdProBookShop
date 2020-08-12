<template>
    <div>
    <div id="header">
        <div class="hd_bar" id="userinfo-bar">
            <div class="bd">
                <div class="logo">
                    <router-link :to="'/app/home/index'" >袋鼠二手书网</router-link>
                </div>
                <!--<div class="hd_lbar" style="display: block;" id="ECS_MEMBERZONE">-->
                     <!--<router-link :to="'/app/home/index'"></router-link>-->
                <!--</div>-->
            </div>
        </div>
    </div>
    </div>
</template>

<script>

</script>

<style scoped>
#header {
    width:100%
}
#header .hd_bar {
    background-color:#A7B9C3;
    height:57px
}
#header .logo {

    position:absolute;
    top:0;
    left:0
}
#header .logo a {
    display:block;
    width:230px;
    height:0;
    padding-top:68px;
    overflow:hidden;
    background:#A7B9C3 url(http://myphoto.mtianyan.cn/blog/180426/K8Chgf90bk.png?imageslim) center 0 no-repeat
}
.hd_bar .bd {
    padding-left:182px;
    width:826px;
    height:57px;
    margin:0 auto;
    position:relative;
    z-index:100
}
.hd_bar .hd_lbar {
    float:left;
    width:310px;
    overflow:hidden;
    padding-left:6px;
    display:none
}
.hd_bar .hd_lbar a {
    display:inline-block;
    height:17px;
    line-height:17px;
    color:#eee;
    padding:20px 12px;
    background-color:#222;
    vertical-align:top
}
.hd_bar .hd_lbar a:hover {
    background-color:#666;
    color:#fff;
    text-decoration:none
}
.hd_bar .hd_lbar .iconfont {
    margin-right:5px;
    color:#999;
    vertical-align:top
}
.hd_bar .level {
    font-family:\5b8b\4f53;
    color:#bf001a;
    margin-left:5px;
    font-size:12px
}
.hd_bar .hd_rbar {
    float:right;
    width:300px;
    color:#eee;
    text-align:right
}
.hd_bar .hd_rbar a {
    display:inline-block;
    height:57px;
    line-height:57px;
    color:#eee;
    padding:0 12px;
    background-color:#222
}
.hd_bar .hd_rbar a:hover {
    background-color:#444;
    color:#fff;
    text-decoration:none
}

.hd-step {
    float:right;
    width:500px;
    padding-top:18px
}
.hd-step li {
    float:left;
    width:116px;
    height:28px;
    color:#bbb;
    background:url(http://vueshopstatic.mtianyan.cn/images%5CloginHead/page-step-bg.png) 0 0 no-repeat;
    font-size:14px;
    position:relative
}
.hd-step li em {
    font-weight:bold;
    font-size:16px;
    color:#fff;
    padding:0 12px 0 8px;
    font-family:arial;
    text-shadow:1px 1px 1px rgba(0,0,0,0.3)
}
.hd-step li i {
    position:absolute;
    top:23px;
    left:50%;
    width:0;
    height:0;
    overflow:hidden;
    border-width:8px;
    border-style:solid;
    border-color:#222 #222 #f8f8f8 #222;
    display:none
}
.hd-step li.first {
    width:auto
}
.hd-step li.first em {
    padding-left:7px
}
.hd-step li.jt {
    width:72px;
    background-position:center -141px
}
.hd-step li.on {
    background-position:0 -33px
}
.hd-step li.on i {
    display:block
}

</style>
