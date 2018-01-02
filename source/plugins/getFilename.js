module.exports = function() {
    return function(style) {
        style.define('getFilename', function(path) {
            console.log(path);
            const filename = /([^\\]+)$/.exec(this.currentBlock.filename)[1].split('.')[0];
            return filename;
        });
    };
};
