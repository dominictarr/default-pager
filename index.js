var spawn = require('child_process').spawn;

module.exports = function (file, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    if (!opts) opts = {};
    
    var editor = opts.editor || process.env.EDITOR || 'vim';
    
    setRaw(true);
    var ps = spawn(editor, [ file ], { customFds : [ 0, 1, 2 ] });
    
    ps.on('exit', function (code, sig) {
        setRaw(false);
        process.stdin.pause();
        if (typeof cb === 'function') cb(code, sig)
    });
};

var tty = require('tty');
function setRaw (mode) {
    (process.stdin.setRawMode || tty.setRawMode)(mode);
}
