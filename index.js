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

    opts.args || (opts.args = []);

    if (pager.indexOf(' ') > 0) {
        var pagerAndArgs = pager.split(/\s+/);
        pager = pagerAndArgs[0];
        Array.prototype.push.apply(opts.args, pagerAndArgs.slice(1));
    }
    
    setRaw(true);
    var ps = spawn(pager, opts.args, { stdio : [ null, 1, 2 ] });
    
    ps.on('exit', function (code, sig) {
        setRaw(false);
        process.stdin.pause();
        if (typeof cb === 'function') cb(code, sig)
    });

    ps.stdin.on('error', function (e) {
        // Ignore EPIPE and ECONNRESET.
    });

    return ps.stdin
};

function setRaw (mode) {
    if (process.stdin.setRawMode) {
        process.stdin.setRawMode(mode);
    }
}
