!(function (n) {
  function e(e) {
    for (var r, i, c = e[0], a = e[1], l = e[2], s = 0, d = []; s < c.length; s++) (i = c[s]), Object.prototype.hasOwnProperty.call(o, i) && o[i] && d.push(o[i][0]), (o[i] = 0);
    for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (n[r] = a[r]);
    for (f && f(e); d.length; ) d.shift()();
    return u.push.apply(u, l || []), t();
  }
  function t() {
    for (var n, e = 0; e < u.length; e++) {
      for (var t = u[e], r = !0, c = 1; c < t.length; c++) {
        var a = t[c];
        0 !== o[a] && (r = !1);
      }
      r && (u.splice(e--, 1), (n = i((i.s = t[0]))));
    }
    return n;
  }
  var r = {},
    o = { 2: 0 },
    u = [];
  function i(e) {
    if (r[e]) return r[e].exports;
    var t = (r[e] = { i: e, l: !1, exports: {} });
    return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  (i.m = n),
    (i.c = r),
    (i.d = function (n, e, t) {
      i.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: t });
    }),
    (i.r = function (n) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
    }),
    (i.t = function (n, e) {
      if ((1 & e && (n = i(n)), 8 & e)) return n;
      if (4 & e && "object" == typeof n && n && n.__esModule) return n;
      var t = Object.create(null);
      if ((i.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: n }), 2 & e && "string" != typeof n))
        for (var r in n)
          i.d(
            t,
            r,
            function (e) {
              return n[e];
            }.bind(null, r)
          );
      return t;
    }),
    (i.n = function (n) {
      var e =
        n && n.__esModule
          ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (i.p = "assets/");
  var c = (window.webpackJsonp = window.webpackJsonp || []),
    a = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var l = 0; l < c.length; l++) e(c[l]);
  var f = a;
  u.push([605, 0]), t();
})({
  48: function (n, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return r;
    }),
      t.d(e, "d", function () {
        return o;
      }),
      t.d(e, "c", function () {
        return u;
      }),
      t.d(e, "f", function () {
        return i;
      }),
      t.d(e, "g", function () {
        return c;
      }),
      t.d(e, "b", function () {
        return a;
      }),
      t.d(e, "e", function () {
        return l;
      });
    var r = { GET_TABS: "GET_TABS", SENDER_FROM_TAB: "SENDER_FROM_TAB", UPDATE_TAB: "UPDATE_TAB", CREATE_TAB: "CREATE_TAB", REMOVE_TAB: "REMOVE_TAB", GET_CURRENT_TAB: "GET_CURRENT_TAB" };
    function o() {
      chrome.runtime.onMessage.addListener(function (n, e, t) {
        !(function (n, e, t) {
          try {
            var o = n.type,
              a = void 0 === o ? "" : o,
              l = n.options,
              f = void 0 === l ? {} : l,
              s = null == e ? void 0 : e.tab;
            switch (a) {
              case r.GET_TABS:
                !(function () {
                  var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                  new Promise(function (t) {
                    return chrome.tabs.query(n, function (n) {
                      e ? e(n) : t(n);
                    });
                  });
                })(f, t);
                break;
              case r.CREATE_TAB:
                u(f, t);
                break;
              case r.REMOVE_TAB:
                i(s.id, t);
                break;
              case r.SENDER_FROM_TAB:
                t(e.tab);
                break;
              case r.UPDATE_TAB:
                c(s.id, f, t);
            }
          } catch (n) {}
        })(n, e, t);
      });
    }
    function u() {
      var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      return new Promise(function (t) {
        return chrome.tabs.create(n, function (n) {
          e ? e(n) : t(n);
        });
      });
    }
    function i(n) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      return new Promise(function (t) {
        return chrome.tabs.remove(n, function (n) {
          e ? e(n) : t(n);
        });
      });
    }
    function c(n) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
      return new Promise(function (r) {
        chrome.tabs.update(n, e, function (n) {
          t ? t(n) : r(n);
        });
      });
    }
    function a(n) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      return new Promise(function (t) {
        chrome.tabs.update(n, { highlighted: !0 }, function (n) {
          e ? e(n) : t(n);
        });
      });
    }
    function l(n) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      return new Promise(function (t) {
        chrome.tabs.reload(n, {}, function (n) {
          e ? e(n) : t(n);
        });
      });
    }
  },
  605: function (n, e, t) {
    "use strict";
    t.r(e);
    var r = t(0),
      o = t.n(r),
      u = t(31),
      i = t(48);
    u.render(
      r.createElement(function () {
        return (
          o.a.useEffect(function () {
            i.c({ url: "https://alihunter.io" });
          }, []),
          o.a.createElement("div", null, o.a.createElement("div", null))
        );
      }, null),
      document.getElementById("root")
    );
  },
});
