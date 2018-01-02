module.exports = function() {
    return function(style) {
        style.define('getFilename', function(path) {
            return /([^\\]+)$/.exec(this.currentBlock.filename)[1].split('.')[0];
        });
    };
};
