/**
 * @file
 * Created by wangzhicheng on 16/3/18.
 */





var fs = require('fs');
var path = require('path');


function getEntry() {
    var jsPath = './pages';
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        if (item.match(/\./)) {
            return;
        }
        debugger
        var children = fs.readdirSync(path.join(jsPath, item));
        children.forEach(function (child) {
            matchs = child.match(/(.+)\.js$/);
            if (matchs) {
                files[item] = path.join(__dirname, jsPath, item, child);
            }
        })
    });
    return files;
}
module.exports = getEntry;