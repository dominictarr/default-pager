
var fs = require('fs')
var pager = require('./')

fs.createReadStream(__dirname + '/README.markdown')
  .pipe(pager(function () {
    console.log("DONE")
  }))
