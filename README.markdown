default-pager
======

Launch $PAGER in your program.

adapted from [substack/node-editor](https://github.com/substack/node-editor)

Example
-------

``` js
var pager = require('default-pager')

stream.pipe(pager(function () {
  //user exited
  console.log('done!')
})
```

API
---

### `pager([opts], [cb(code, signal)])`

Launches pager process and returns a writable stream. `cb(code, signal)` is fired once the pager is exited.

#### `opts.pager`

Type: `String` <br>
Default: `$PAGER` <br>

Pager program to launch.

#### `opts.args`

Type: `[String]` <br>
Default: `[]` <br>

Arguments passed to the pager program.

License
-------

MIT
