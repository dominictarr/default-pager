default-pager
======

Launch $PAGER in your program.

adapted from [substack/node-editor](https://github.com/substack/node-editor)

Example
=======

``` js
var pager = require('default-pager')

stream.pipe(pager(function () {
  //user exited
  console.log('done!')
})
```

license
=======

MIT
