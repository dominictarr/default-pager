var test = require('tape');
var async = require('async');

mockSpawn = {
    on: function() {},
    stdin: { on: function() {} },
};

test("$PAGER unset", function(t) {
    require('child_process').spawn = function(cmd, args, opts) {
        t.equals(cmd, "more", "Use 'more' unless $PAGER is set");
        t.deepEquals(args, [], "No args unless $PAGER is set");
        return mockSpawn;
    };
    delete process.env.PAGER;
    require('.')();
    t.end();
    delete require.cache[require.resolve('.')]
});

test("$PAGER set to 'less'", function(t) {
    require('child_process').spawn = function(cmd, args, opts) {
        t.equals(cmd, "less", "Use 'less' if $PAGER == 'less'");
        t.deepEquals(args, [], "No args for $PAGER == 'less'");
        return mockSpawn;
    };
    process.env.PAGER = 'less';
    require('.')();
    delete require.cache[require.resolve('.')]
    t.end();
});

test("$PAGER set to 'less -Rs'", function(t) {
    require('child_process').spawn = function(cmd, args, opts) {
        t.equals(cmd, "less", "Use 'less' if $PAGER == 'less -Rs'");
        t.deepEquals(args, ['-Rs'], "args: ['-Rs'] for $PAGER == 'less -Rs'");
        return mockSpawn;
    };
    process.env.PAGER = 'less -Rs';
    require('.')();
    delete require.cache[require.resolve('.')]
    t.end();
});

test("$PAGER set to 'less -Rs' plus opt.args", function(t) {
    require('child_process').spawn = function(cmd, args, opts) {
        t.equals(cmd, "less", "Use 'less' if $PAGER == 'less -Rs'");
        t.deepEquals(args, ['foo', '-Rs'], "args: ['foo', '-Rs'] for $PAGER == 'less -Rs' and opt.args == ['foo']");
        return mockSpawn;
    };
    process.env.PAGER = 'less -Rs';
    require('.')({args: ['foo']});
    delete require.cache[require.resolve('.')]
    t.end();
});
