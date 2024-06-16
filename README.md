# Cloudflare-Workers-Pypi-Mirror
使用Cloudflare Workers搭建一个Pypi镜像地址。 
源项目地址：https://aber.sh/articles/create-pypi-mirror-by-cloudflare-workers/ 
在原项目的基础上稍作修改而来。
# 前提
首先你**必须**要有一个没有被墙的域名，由于众所周知的原因，workers的默认域名全部被墙了，现在只能使用自己的域名，否则无法访问。 
# 创建一个workers服务并绑定自己的域名
创建一个workers服务，然后绑定一个自己的域名，按图设置好路由。
![image](https://github.com/snakexgc/Cloudflare-Workers-Pypi-Mirror/assets/78722169/8c26a058-bbc8-4968-abf2-824acc110364) 
# 复制项目workers中的代码覆盖到cf中
复制项目中workers.js中的全部代码，覆盖掉cf workers中的代码，然后修改域名为你的自定义域名
![image](https://github.com/snakexgc/Cloudflare-Workers-Pypi-Mirror/assets/78722169/f97286c7-0535-421c-9e66-93737530e718) 
然后部署即可，之后你就可以使用你这个自建的workers域名来实现加速Pypi。
# 使用方法
## 使用加速链接更新pip 

```
python -m pip install -i https://pypi.20010101.xyz/simple --upgrade pip
```
## 设置默认
```
pip config set global.index-url https://pypi.20010101.xyz/simple
```
