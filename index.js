var spawn = require('child_process').spawn;

module.exports = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    if (!opts) opts = {};
    
    var pager = opts.pager 
      || process.env.PAGER 
      || 'more'
    
    setRaw(true);
    var ps = spawn(pager, [], { customFds : [ null, 1, 2 ] });
    
    ps.on('exit', function (code, sig) {
        setRaw(false);
        process.stdin.pause();
        if (typeof cb === 'function') cb(code, sig)
    });

    return ps.stdin
};

var tty = require('tty');
function setRaw (mode) {
    process.stdin.setRawMode ? process.stdin.setRawMode(mode) : tty.setRawMode(mode);
}
