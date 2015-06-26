var printer = require('./index')
var test = require('tape')

test('', function (t) {
  t.equal(typeof printer, 'function')
  t.equal(typeof printer(), 'function')

  var o = {
    called: false,
    log: function (res) {
      this.res = res
      this.called = true
    }
  }
  var pp = printer(o.log, o)

  o.called = false
  pp()
  t.false(o.called)

  pp(123.5)
  t.equal(o.res, '123.5')

  pp(undefined)
  t.equal(o.res, undefined)

  var v = {
    prop1: 123,
    prop2: 456,
    toJSON: function () {
      return { foo: 'Foo', bar: [1, 2, 3] }
    }
  }
  pp(undefined, null, v)
  t.equal(o.res, JSON.stringify([
    null,
    null,
    { foo: 'Foo', bar: [1, 2, 3] }
  ], null, 2))

  t.end()
})
