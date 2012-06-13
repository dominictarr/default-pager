var editor = require('../');
editor('beep.json', function (code, sig) {
    console.log('finished editing with code ' + code);
});
