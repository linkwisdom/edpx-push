edpx-push
=========
> 推送并部署前端代码到测试环境

### 安装
- 自动安装(`edp push` 命令自动安装)
- 手动安装 `npm install edpx-push -g`

### 使用方法
- 需提前配置机器

```sh
> svn diff ~/work/fengchao/workspace >modify.patch
> edp push modify.patch --deploy
```

### 预览效果
- 进度状态为`finished`即可访问
- 需要将目标机器的ip绑定到fctest
- etc: `10.94.227.28 fctest.baidu.com`


## 机器配置
- 配置一次即可
- 需要提前向QA或RD要求机器ip及密码

```sh
    edp push machine=10.94.227.28 password=xxxxx 
```

### 快捷发布方式 
- linux , mac 私用
- windows同理创建bat文件
- 建议加入 `~/.bashrc` 或 `~/.bash_profile`

```sh
alias epub="svn diff ~/work/fengchao/workspace/nirvana-workspace/nirvana > ~/work/fengchao/workspace/modify.patch & edp push ~/work/fengchao/workspace/modify.patch --deploy"
``

### 使用反馈
- 通过gist反馈使用问题
- 直接联系作者