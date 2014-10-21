var cli = {};
var upload = require('../../index');

/**
 * 命令描述信息
 *
 * @type {string}
 */
cli.description = '构建目录或项目';

/**
 * 命令选项信息
 *
 * @type {Array}
 */
cli.options = [
    'file:',
    'host:',
    'uploadPath:',
    'deployPath:',
    'module:',
    'deploy',
    'machine:',
    'password:'
];

cli.main = function (args, opts) {
    if (args == 'deploy') {
        return upload.deploy(opts);
    }

    var files = Array.prototype.slice.call(args, 0);
    var options = {};

    files = files.filter(function (item) {
        if (item.indexOf('=') > -1) {
            var kv = item.split('=');
            options[kv[0]] = kv[1] || true;
            return false;
        }
        return true;
    });

    for (var k in opts) {
        options[k] = opts[k];
    }

    if (!options.deploy) {
        options.deploy = false;
    }

    if (options.file) {
        upload.push(option.file, options);
    } else {
        upload.push(files, options);
    }
};

exports.cli = cli;