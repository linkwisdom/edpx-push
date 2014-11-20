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
    edp push module=fc_nirvana_js // 默认配置 nirvana
    edp push module=fc_phoenix // 配置 phoenix
    edp push machine=10.94.227.28 password=xxxxx 
```
- 项目模块的配置


### 快捷发布方式 
- linux , mac 私用
- windows同理创建bat文件
- 建议加入 `~/.bashrc` 或 `~/.bash_profile`

```sh
alias epub="svn diff ~/work/fengchao/workspace/nirvana-workspace/nirvana > ~/work/fengchao/workspace/modify.patch & edp push ~/work/fengchao/workspace/modify.patch --deploy"
``

### 查看当前配置项目

```sh
edp push info
```

### 默认配置项目

```sh
    host='http://api.stqa.baidu.com' # 服务中转机器，不要修改
    uploadPath='/env/fengchao/upload' # 提交服务
    deployPath='/env/fengchao/fe_deployment' # 部署服务
    machine='fctest.baidu.com'  # 目标fcinst开发机, 提前绑定
    module='fc_nirvana_js' # 编译模块
```

### 使用反馈
- 通过gist反馈使用问题
- 直接联系作者