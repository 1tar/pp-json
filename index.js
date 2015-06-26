var slice = require('sliced')

module.exports = function (log, _this) {
  if (log == null) {
    log = console.log
    _this = console
  }

  return function () {
    var argc = arguments.length
    if (argc === 0) return

    log.call(_this, JSON.stringify(argc === 1 ? arguments[0] : slice(arguments), null, 2))
  }
}
