module.exports = function() {
    return function(style) {
        style.define('getFilename', function(path) {
            const parts = this.currentBlock.filename.split('\\');
            parts.pop();

            return parts.pop();
        });
    };
};
