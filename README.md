edpx-push
=========
> 推送并部署前端代码到测试环境

### 使用方法
> edp push modify.patch --deploy

### 基于edp环境

```sh
    cd workspace // 当前必须基于该基线上传
    svn diff nirvana-workspace/ >modify.patch
    edp push modify.patch
```

### 快捷发布方式 
- linux , mac 私用
- windows同理创建bat文件
- 建议加入 `~/.bashrc` 或 `~/.bash_profile`

```sh
alias epub="svn diff ~/work/fengchao/workspace/nirvana-workspace/nirvana > ~/work/fengchao/workspace/modify.patch & edp push ~/work/fengchao/workspace/modify.patch --deploy"
``

### 独立命令
- 安装 edpx-push

```sh
    [sudo] npm install edpx-push -g
```

- push 文件

```sh
    cd workspace // 当前必须基于该基线上传
    svn diff nirvana-workspace/ >modify.patch
    edpx-push modify.patch
```

## todo 
- 自动生成patch文件；