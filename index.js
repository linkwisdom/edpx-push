var fs = require('fs');
var loconf = require('loconf');
var request = require('request');

var DEFAULT_CONF = {
    host:  'http://api.stqa.baidu.com',
    uploadPath: '/env/fengchao/upload',
    deployPath: '/env/fengchao/fe_deployment',
    module: 'fc_nirvana_js'
};

loconf.use('edpx-push');

// 设置默认配置
exports.config = loconf.getContext('edpx-push');
if (!exports.config || !exports.config.host) {
    loconf.set(DEFAULT_CONF);
    exports.config = DEFAULT_CONF;
}

/**
 * 设置配置选项
 * 
 * @param {Object} option
 */
exports.setConfig = function (option) {
    loconf.set(option);
};

/**
 * 设置键值参数
 * 
 * @param {string} key   
 * @param {string|Object} value
 */
exports.set = function (key, value) {
    loconf.set(key, value);
};

/**
 * 推送代码
 * 
 * @param {string|Array} filename 文件名
 * @param {Object=} option 自定义参数
 */
exports.push = function (filename, option) {
    if (typeof option == 'object') {
        exports.setConfig(option);
    }

    if ( Array.isArray(filename) ) {
        return filename.map(function (file) {
            return exports.push(file, option);
        });
    }

    if (!filename) {
        return;
    }

    var config = exports.config;
    var targetPath = config.host +  config.uploadPath;
    var moduleName = option.module || config.module;
    var machineName = option.machine || config.machine;
    var password = option.password || config.password;

    var fpath = require('path').resolve(process.cwd(), filename );

    var req = request.post(targetPath, function (err, resp, body) {
        if (!err) {
            if (body == 200) {
                console.log(' push   %s ... Done ', filename);
                if (config.deploy) {
                    exports.deploy(option);
                }
            } else {
                console.log(' fail   %s ... Done ', filename);
            }
        } else {
            console.log(' push   %s ... Fail \n %s', filename, err );
        }
    });

    var form = req.form();
    form.append('module', moduleName);
    form.append('machine', machineName);
    form.append('password', password);
    form.append('file[]', fs.createReadStream(fpath));
};

/**
 * 部署代码
 * @todo 分离部署，暂时接口字段有问题
 * 
 * @param {Object=} option 自定义参数
 */
exports.deploy = function (option) {
    var config = exports.config;
    var deployPath = config.host +  config.deployPath;
    var moduleName = option.module || config.module;
    var machineName = option.machine || config.machine;

    var params = {
        module_name: moduleName,
        machine_name: machineName,
        password: config.password
    };

    var req = request.post(
        {
            url: deployPath,
            body: JSON.stringify(params)
        },
        function (err, resp, body) {
            if (!err) {
                console.log(' deploy   %s ... Done ', moduleName);
                console.log(params);
                try {
                    var response = JSON.parse(body);
                    if (response && response.navigator) {
                        var info = response.navigator[0];
                        exports.pollingStatus(info, 0);
                    }
                } catch (ex) {}
            } else {
                console.log(' deploy   %s ... Fail \n %s', moduleName , err );
            }
    });
}

/**
 * 轮询编译状态
 * 
 * @param  {Object} info 轮询信息
 * @param  {number} counter 轮询次数
 */
exports.pollingStatus = function (info, counter) {
    var config = exports.config;

    request(config.host + info.href, function (err, resp, body) {
        var result = JSON.parse(body);

        var prefix = new Array(++counter).join('==');
        console.log('%s=> [ %s ]', prefix, result.phrase);

        if (result.phrase == 'finished' || result.phrase == 'fail' ) {
            console.log('=======[ %s ]=========', result['module_name']);
        } else {
            setTimeout(function () {
                exports.pollingStatus(info, counter);
            }, 5000);
        }
    });
};