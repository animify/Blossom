const stylus = require('stylus');

module.exports = function() {
    return function(style) {
        style.define('ifExists', function(path, theme) {
            const pathToThemes = './../themes/' + theme + '/' + path + '/style';
            const pathName = !!stylus.utils.lookup(pathToThemes.string + '.styl', this.paths);
            console.log(pathName);
            stylus(path).import(pathName);
        });
    };
};
