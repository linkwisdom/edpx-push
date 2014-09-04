edpx-push
=========
> 推送并部署前端代码到测试环境

### 使用方法

### 基于edp环境

```sh
    svn diff nirvana-workspace/ >workspace.patch
    edp push workspace.patch
```

### 独立命令

- 安装 edpx-push

```sh
    [sudo] npm install edpx-push -g
```

- push 文件

```sh
    svn diff nirvana-workspace/ >workspace.patch
    edpx-push workspace.patch
```
