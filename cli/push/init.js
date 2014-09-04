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
    '[files]'
];

cli.main = function (args, opts) {
    var files = Array.prototype.slice.call(args, 0);
    var options = {};

    files = files.filter(function (item) {
        if (item.charAt(0) == '-' || item.indexOf('=') > -1) {
            var kv = item.replace(/^\-+/, '').split('=');
            options[kv[0]] = kv[1] || true;
            return false;
        }
        return true;
    });

    upload.push(files, options);
};

exports.cli = cli;