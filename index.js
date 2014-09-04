var fs = require('fs');
// var loconf = require('loconf');
var request = require('request');

exports.config = {
    host:  'http://cq01-testing-fengchao18.vm.baidu.com:8081',
    uploadPath: '/env/fengchao/upload',
    deployPath: '/env/fengchao/fe_deployment',
    module: 'fc_nirvana_js',
    machine: '10.95.184.22'
};

// loconf.use('edpx-push');
// loconf.set('config', exports.config);

/**
 * 推送代码
 * 
 * @param {string|Array} filename 文件名
 * @param {Object=} option 自定义参数
 */
exports.push = function (filename, option) {
    if ( Array.isArray(filename) ) {
        return filename.map(function (file) {
            return exports.push(file, option);
        });
    }

    var config = exports.config;
    var targetPath = config.host +  config.uploadPath;
    var moduleName = option.module || config.module;
    var machineName = option.machine || config.machine;

    var fpath = require('path').resolve(process.cwd(), filename );

    var req = request.post(targetPath, function (err, resp, body) {
        if (!err) {
            console.log(' push   %s ... Done ', filename);
            if (body == 200) {
                exports.deploy(option);
            }
        } else {
            console.log(' push   %s ... Fail \n %s', filename, err );
        }
    });

    var form = req.form();
    form.append('module', moduleName);
    form.append('machine', machineName);
    form.append('file[]', fs.createReadStream(fpath));
};

/**
 * 部署代码
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
        machine_name: machineName
    };

    request.post(deployPath, {form: params}, function (err, resp, body) {
        if (!err) {
            console.log(' deploy   %s ... Done ', moduleName);
            // console.log(body);
        } else {
            console.log(' deploy   %s ... Fail \n %s', moduleName , err );
        }
    });
}
