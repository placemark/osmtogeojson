!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).osmtogeojson = e();
  }
})(function () {
  return (function i(a, u, s) {
    function l(n, e) {
      if (!u[n]) {
        if (!a[n]) {
          var t = "function" == typeof require && require;
          if (!e && t) return t(n, !0);
          if (c) return c(n, !0);
          var r = new Error("Cannot find module '" + n + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        var o = (u[n] = { exports: {} });
        a[n][0].call(
          o.exports,
          function (e) {
            var t = a[n][1][e];
            return l(t || e);
          },
          o,
          o.exports,
          i,
          a,
          u,
          s
        );
      }
      return u[n].exports;
    }
    for (
      var c = "function" == typeof require && require, e = 0;
      e < s.length;
      e++
    )
      l(s[e]);
    return l;
  })(
    {
      1: [
        function (e, t, n) {
          var F = e("./lodash.custom.js"),
            I = e("@mapbox/geojson-rewind"),
            r = {};
          function o(e, t) {
            return (e.version || t.version) && e.version !== t.version
              ? (+e.version || 0) > (+t.version || 0)
                ? e
                : t
              : F.merge(e, t);
          }
          e("osm-polygon-features").forEach(function (e) {
            if ("all" === e.polygon) r[e.key] = !0;
            else {
              var t =
                  "whitelist" === e.polygon
                    ? "included_values"
                    : "excluded_values",
                n = {};
              e.values.forEach(function (e) {
                n[e] = !0;
              }),
                (r[e.key] = {}),
                (r[e.key][t] = n);
            }
          });
          var i;
          function R(e) {
            function t(e) {
              return e[0];
            }
            function n(e) {
              return e[e.length - 1];
            }
            function r(e, t) {
              return void 0 !== e && void 0 !== t && e.id === t.id;
            }
            for (var o, i, a, u, s, l, c = []; e.length; )
              for (
                o = e.pop().nodes.slice(), c.push(o);
                e.length && !r(t(o), n(o));

              ) {
                for (i = t(o), a = n(o), u = 0; u < e.length; u++) {
                  if (r(a, t((l = e[u].nodes)))) {
                    (s = o.push), (l = l.slice(1));
                    break;
                  }
                  if (r(a, n(l))) {
                    (s = o.push), (l = l.slice(0, -1).reverse());
                    break;
                  }
                  if (r(i, n(l))) {
                    (s = o.unshift), (l = l.slice(0, -1));
                    break;
                  }
                  if (r(i, t(l))) {
                    (s = o.unshift), (l = l.slice(1).reverse());
                    break;
                  }
                  l = s = null;
                }
                if (!l) break;
                e.splice(u, 1), s.apply(o, l);
              }
            return c;
          }
          ((i = function (e, N, B) {
            var t, l, c, f, p, y;
            function d(e, t, n) {
              e.hasAttribute(n) && (t[n] = e.getAttribute(n));
            }
            function g(e, t) {
              var n = F.clone(e);
              d(t, n, "lat"),
                d(t, n, "lon"),
                (n.__is_center_placeholder = !0),
                f.push(n);
            }
            function v(e, t) {
              var o = F.clone(e);
              function n(e, t, n) {
                var r = {
                  type: "node",
                  id: "_" + o.type + "/" + o.id + "bounds" + n,
                  lat: e,
                  lon: t,
                };
                o.nodes.push(r.id), f.push(r);
              }
              (o.nodes = []),
                n(t.getAttribute("minlat"), t.getAttribute("minlon"), 1),
                n(t.getAttribute("maxlat"), t.getAttribute("minlon"), 2),
                n(t.getAttribute("maxlat"), t.getAttribute("maxlon"), 3),
                n(t.getAttribute("minlat"), t.getAttribute("maxlon"), 4),
                o.nodes.push(o.nodes[0]),
                (o.__is_bounds_placeholder = !0),
                p.push(o);
            }
            return (
              (N = F.merge(
                {
                  verbose: !1,
                  flatProperties: !0,
                  uninterestingTags: {
                    source: !0,
                    source_ref: !0,
                    "source:ref": !0,
                    history: !0,
                    attribution: !0,
                    created_by: !0,
                    "tiger:county": !0,
                    "tiger:tlid": !0,
                    "tiger:upload_uuid": !0,
                  },
                  polygonFeatures: r,
                  deduplicator: o,
                },
                N
              )),
              ("undefined" != typeof XMLDocument && e instanceof XMLDocument) ||
              ("undefined" == typeof XMLDocument && e.childNodes)
                ? ((t = e),
                  (f = new Array()),
                  (p = new Array()),
                  (y = new Array()),
                  F.each(t.getElementsByTagName("node"), function (e, t) {
                    var n = {};
                    F.each(e.getElementsByTagName("tag"), function (e) {
                      n[e.getAttribute("k")] = e.getAttribute("v");
                    });
                    var r = { type: "node" };
                    d(e, r, "id"),
                      d(e, r, "lat"),
                      d(e, r, "lon"),
                      d(e, r, "version"),
                      d(e, r, "timestamp"),
                      d(e, r, "changeset"),
                      d(e, r, "uid"),
                      d(e, r, "user"),
                      F.isEmpty(n) || (r.tags = n),
                      f.push(r);
                  }),
                  F.each(t.getElementsByTagName("way"), function (e, t) {
                    var n = {},
                      r = [];
                    F.each(e.getElementsByTagName("tag"), function (e) {
                      n[e.getAttribute("k")] = e.getAttribute("v");
                    });
                    var o = !1;
                    F.each(e.getElementsByTagName("nd"), function (e, t) {
                      var n;
                      (n = e.getAttribute("ref")) && (r[t] = n),
                        !o && e.getAttribute("lat") && (o = !0);
                    });
                    var i = { type: "way" };
                    d(e, i, "id"),
                      d(e, i, "version"),
                      d(e, i, "timestamp"),
                      d(e, i, "changeset"),
                      d(e, i, "uid"),
                      d(e, i, "user"),
                      0 < r.length && (i.nodes = r),
                      F.isEmpty(n) || (i.tags = n),
                      (l = e.getElementsByTagName("center")[0]) && g(i, l),
                      o
                        ? (function (a, e) {
                            F.isArray(a.nodes) ||
                              ((a.nodes = []),
                              F.each(e, function (e, t) {
                                a.nodes.push(
                                  "_anonymous@" +
                                    e.getAttribute("lat") +
                                    "/" +
                                    e.getAttribute("lon")
                                );
                              })),
                              F.each(e, function (e, t) {
                                var n, r, o, i;
                                e.getAttribute("lat") &&
                                  ((n = e.getAttribute("lat")),
                                  (r = e.getAttribute("lon")),
                                  (o = a.nodes[t]),
                                  (i = { type: "node", id: o, lat: n, lon: r }),
                                  f.push(i));
                              });
                          })(i, e.getElementsByTagName("nd"))
                        : (c = e.getElementsByTagName("bounds")[0]) && v(i, c),
                      p.push(i);
                  }),
                  F.each(t.getElementsByTagName("relation"), function (e, t) {
                    var n = {},
                      r = [];
                    F.each(e.getElementsByTagName("tag"), function (e) {
                      n[e.getAttribute("k")] = e.getAttribute("v");
                    });
                    var o = !1;
                    F.each(e.getElementsByTagName("member"), function (e, t) {
                      (r[t] = {}),
                        d(e, r[t], "ref"),
                        d(e, r[t], "role"),
                        d(e, r[t], "type"),
                        ((!o && "node" == r[t].type && e.getAttribute("lat")) ||
                          ("way" == r[t].type &&
                            0 < e.getElementsByTagName("nd").length)) &&
                          (o = !0);
                    });
                    var a,
                      i,
                      u = { type: "relation" };
                    function s(e, t) {
                      if (
                        !p.some(function (e) {
                          return "way" == e.type && e.id == t;
                        })
                      ) {
                        var o = { type: "way", id: t, nodes: [] };
                        F.each(e, function (e) {
                          var t, n, r;
                          e.getAttribute("lat")
                            ? ((t = e.getAttribute("lat")),
                              (n = e.getAttribute("lon")),
                              (r = {
                                type: "node",
                                id: "_anonymous@" + t + "/" + n,
                                lat: t,
                                lon: n,
                              }),
                              o.nodes.push(r.id),
                              f.push(r))
                            : o.nodes.push(void 0);
                        }),
                          p.push(o);
                      }
                    }
                    d(e, u, "id"),
                      d(e, u, "version"),
                      d(e, u, "timestamp"),
                      d(e, u, "changeset"),
                      d(e, u, "uid"),
                      d(e, u, "user"),
                      0 < r.length && (u.members = r),
                      F.isEmpty(n) || (u.tags = n),
                      (l = e.getElementsByTagName("center")[0]) && g(u, l),
                      o
                        ? ((a = u),
                          (i = e.getElementsByTagName("member")),
                          F.each(i, function (e, t) {
                            var n, r, o, i;
                            "node" == a.members[t].type
                              ? e.getAttribute("lat") &&
                                ((n = e.getAttribute("lat")),
                                (r = e.getAttribute("lon")),
                                (o = a.members[t].ref),
                                (i = { type: "node", id: o, lat: n, lon: r }),
                                f.push(i))
                              : "way" == a.members[t].type &&
                                0 < e.getElementsByTagName("nd").length &&
                                ((a.members[t].ref =
                                  "_fullGeom" + a.members[t].ref),
                                s(
                                  e.getElementsByTagName("nd"),
                                  a.members[t].ref
                                ));
                          }))
                        : (c = e.getElementsByTagName("bounds")[0]) && v(u, c),
                      y.push(u);
                  }),
                  h(f, p, y))
                : (function (e) {
                    var u = new Array(),
                      n = new Array(),
                      t = new Array();
                    function r(e) {
                      var t = F.clone(e);
                      (t.lat = e.center.lat),
                        (t.lon = e.center.lon),
                        (t.__is_center_placeholder = !0),
                        u.push(t);
                    }
                    function o(e) {
                      var o = F.clone(e);
                      function t(e, t, n) {
                        var r = {
                          type: "node",
                          id: "_" + o.type + "/" + o.id + "bounds" + n,
                          lat: e,
                          lon: t,
                        };
                        o.nodes.push(r.id), u.push(r);
                      }
                      (o.nodes = []),
                        t(o.bounds.minlat, o.bounds.minlon, 1),
                        t(o.bounds.maxlat, o.bounds.minlon, 2),
                        t(o.bounds.maxlat, o.bounds.maxlon, 3),
                        t(o.bounds.minlat, o.bounds.maxlon, 4),
                        o.nodes.push(o.nodes[0]),
                        (o.__is_bounds_placeholder = !0),
                        n.push(o);
                    }
                    function i(a) {
                      F.isArray(a.nodes) ||
                        (a.nodes = a.geometry.map(function (e) {
                          return null !== e
                            ? "_anonymous@" + e.lat + "/" + e.lon
                            : "_anonymous@unknown_location";
                        })),
                        a.geometry.forEach(function (e, t) {
                          var n, r, o, i;
                          e &&
                            ((n = e.lat),
                            (r = e.lon),
                            (o = a.nodes[t]),
                            (i = { type: "node", id: o, lat: n, lon: r }),
                            u.push(i));
                        });
                    }
                    function a(e) {
                      function a(e, t) {
                        if (
                          !n.some(function (e) {
                            return "way" == e.type && e.id == t;
                          })
                        ) {
                          var o = { type: "way", id: t, nodes: [] };
                          e.forEach(function (e) {
                            var t, n, r;
                            e
                              ? ((t = e.lat),
                                (n = e.lon),
                                (r = {
                                  type: "node",
                                  id: "_anonymous@" + t + "/" + n,
                                  lat: t,
                                  lon: n,
                                }),
                                o.nodes.push(r.id),
                                u.push(r))
                              : o.nodes.push(void 0);
                          }),
                            n.push(o);
                        }
                      }
                      e.members.forEach(function (e, t) {
                        var n, r, o, i;
                        "node" == e.type
                          ? e.lat &&
                            ((n = e.lat),
                            (r = e.lon),
                            (o = e.ref),
                            (i = { type: "node", id: o, lat: n, lon: r }),
                            u.push(i))
                          : "way" == e.type &&
                            e.geometry &&
                            ((e.ref = "_fullGeom" + e.ref),
                            a(e.geometry, e.ref));
                      });
                    }
                    for (var s = 0; s < e.elements.length; s++)
                      switch (e.elements[s].type) {
                        case "node":
                          var l = e.elements[s];
                          u.push(l);
                          break;
                        case "way":
                          var c = F.clone(e.elements[s]);
                          (c.nodes = F.clone(c.nodes)),
                            n.push(c),
                            c.center && r(c),
                            c.geometry ? i(c) : c.bounds && o(c);
                          break;
                        case "relation":
                          var f = F.clone(e.elements[s]);
                          (f.members = F.clone(f.members)), t.push(f);
                          var p =
                            f.members &&
                            f.members.some(function (e) {
                              return (
                                ("node" == e.type && e.lat) ||
                                ("way" == e.type &&
                                  e.geometry &&
                                  0 < e.geometry.length)
                              );
                            });
                          f.center && r(f), p ? a(f) : f.bounds && o(f);
                      }
                    return h(u, n, t);
                  })(e)
            );
            function h(e, t, n) {
              function r(e, t) {
                if (
                  ("object" != typeof t && (t = {}),
                  "function" == typeof N.uninterestingTags)
                )
                  return !N.uninterestingTags(e, t);
                for (var n in e)
                  if (
                    !0 !== N.uninterestingTags[n] &&
                    !0 !== t[n] &&
                    t[n] !== e[n]
                  )
                    return !0;
                return !1;
              }
              function g(e) {
                var t = {
                  timestamp: e.timestamp,
                  version: e.version,
                  changeset: e.changeset,
                  user: e.user,
                  uid: e.uid,
                };
                for (var n in t) void 0 === t[n] && delete t[n];
                return t;
              }
              for (
                var o = new Object(), i = new Object(), a = 0;
                a < e.length;
                a++
              ) {
                void 0 !== o[(p = e[a]).id] && (p = N.deduplicator(p, o[p.id])),
                  void 0 !== (o[p.id] = p).tags && r(p.tags) && (i[p.id] = !0);
              }
              for (a = 0; a < n.length; a++)
                if (F.isArray(n[a].members))
                  for (var u = 0; u < n[a].members.length; u++)
                    "node" == n[a].members[u].type &&
                      (i[n[a].members[u].ref] = !0);
              var v = new Object(),
                s = new Object();
              for (a = 0; a < t.length; a++) {
                var l = t[a];
                if (
                  (v[l.id] && (l = N.deduplicator(l, v[l.id])),
                  (v[l.id] = l),
                  F.isArray(l.nodes))
                )
                  for (u = 0; u < l.nodes.length; u++)
                    "object" != typeof l.nodes[u] &&
                      ((s[l.nodes[u]] = !0), (l.nodes[u] = o[l.nodes[u]]));
              }
              var c = new Array();
              for (var f in o) {
                var p = o[f];
                (s[f] && !i[f]) || c.push(p);
              }
              var y = new Array();
              for (a = 0; a < n.length; a++) {
                y[(m = n[a]).id] && (m = N.deduplicator(m, y[m.id])),
                  (y[m.id] = m);
              }
              var d,
                h = { node: {}, way: {}, relation: {} };
              for (var f in y) {
                var m = y[f];
                if (F.isArray(m.members))
                  for (u = 0; u < m.members.length; u++) {
                    var b = m.members[u].type,
                      _ = m.members[u].ref;
                    "number" != typeof _ && (_ = _.replace("_fullGeom", "")),
                      h[b]
                        ? (void 0 === h[b][_] && (h[b][_] = []),
                          h[b][_].push({
                            role: m.members[u].role,
                            rel: m.id,
                            reltags: m.tags,
                          }))
                        : N.verbose &&
                          console.warn(
                            "Relation",
                            m.type + "/" + m.id,
                            "member",
                            b + "/" + _,
                            "ignored because it has an invalid type"
                          );
                  }
                else
                  N.verbose &&
                    console.warn(
                      "Relation",
                      m.type + "/" + m.id,
                      "ignored because it has no members"
                    );
              }
              var w = [];
              for (a = 0; a < c.length; a++)
                if (void 0 !== c[a].lon && void 0 !== c[a].lat) {
                  var j = {
                    type: "Feature",
                    id: c[a].type + "/" + c[a].id,
                    properties: {
                      type: c[a].type,
                      id: c[a].id,
                      tags: c[a].tags || {},
                      relations: h.node[c[a].id] || [],
                      meta: g(c[a]),
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [+c[a].lon, +c[a].lat],
                    },
                  };
                  c[a].__is_center_placeholder &&
                    (j.properties.geometry = "center"),
                    B ? B(j) : w.push(j);
                } else
                  N.verbose &&
                    console.warn(
                      "POI",
                      c[a].type + "/" + c[a].id,
                      "ignored because it lacks coordinates"
                    );
              var A = [],
                k = [];
              for (a = 0; a < n.length; a++)
                if (y[n[a].id] === n[a]) {
                  if (
                    void 0 !== n[a].tags &&
                    ("route" == n[a].tags.type || "waterway" == n[a].tags.type)
                  ) {
                    if (!F.isArray(n[a].members)) {
                      N.verbose &&
                        console.warn(
                          "Route",
                          n[a].type + "/" + n[a].id,
                          "ignored because it has no members"
                        );
                      continue;
                    }
                    if (
                      (n[a].members.forEach(function (e) {
                        v[e.ref] &&
                          !r(v[e.ref].tags) &&
                          (v[e.ref].is_skippablerelationmember = !0);
                      }),
                      !1 === (j = O(n[a])))
                    ) {
                      N.verbose &&
                        console.warn(
                          "Route relation",
                          n[a].type + "/" + n[a].id,
                          "ignored because it has invalid geometry"
                        );
                      continue;
                    }
                    function O(n) {
                      var e,
                        t,
                        r = !1;
                      (e = (e = n.members.filter(function (e) {
                        return "way" === e.type;
                      })).map(function (t) {
                        var e = v[t.ref];
                        return void 0 === e || void 0 === e.nodes
                          ? (N.verbose &&
                              console.warn(
                                "Route " + n.type + "/" + n.id,
                                "tainted by a missing or incomplete  way",
                                t.type + "/" + t.ref
                              ),
                            void (r = !0))
                          : {
                              id: t.ref,
                              role: t.role,
                              way: e,
                              nodes: e.nodes.filter(function (e) {
                                return (
                                  void 0 !== e ||
                                  ((r = !0),
                                  N.verbose &&
                                    console.warn(
                                      "Route",
                                      n.type + "/" + n.id,
                                      "tainted by a way",
                                      t.type + "/" + t.ref,
                                      "with a missing node"
                                    ),
                                  !1)
                                );
                              }),
                            };
                      })),
                        (t = R((e = F.compact(e))));
                      var o;
                      if (
                        0 ==
                        (o = F.compact(
                          t.map(function (e) {
                            return F.compact(
                              e.map(function (e) {
                                return [+e.lon, +e.lat];
                              })
                            );
                          })
                        )).length
                      )
                        return (
                          N.verbose &&
                            console.warn(
                              "Route",
                              n.type + "/" + n.id,
                              "contains no coordinates"
                            ),
                          !1
                        );
                      var i = {
                        type: "Feature",
                        id: n.type + "/" + n.id,
                        properties: {
                          type: n.type,
                          id: n.id,
                          tags: n.tags || {},
                          relations: h[n.type][n.id] || [],
                          meta: g(n),
                        },
                        geometry: {
                          type:
                            1 === o.length ? "LineString" : "MultiLineString",
                          coordinates: 1 === o.length ? o[0] : o,
                        },
                      };
                      return (
                        r &&
                          (N.verbose &&
                            console.warn(
                              "Route",
                              n.type + "/" + n.id,
                              "is tainted"
                            ),
                          (i.properties.tainted = !0)),
                        i
                      );
                    }
                    B ? B(I(j)) : k.push(j);
                  }
                  if (
                    void 0 !== n[a].tags &&
                    ("multipolygon" == n[a].tags.type ||
                      "boundary" == n[a].tags.type)
                  ) {
                    if (!F.isArray(n[a].members)) {
                      N.verbose &&
                        console.warn(
                          "Multipolygon",
                          n[a].type + "/" + n[a].id,
                          "ignored because it has no members"
                        );
                      continue;
                    }
                    var x = 0;
                    for (u = 0; u < n[a].members.length; u++)
                      "outer" == n[a].members[u].role
                        ? x++
                        : N.verbose &&
                          "inner" != n[a].members[u].role &&
                          console.warn(
                            "Multipolygon",
                            n[a].type + "/" + n[a].id,
                            "member",
                            n[a].members[u].type + "/" + n[a].members[u].ref,
                            'ignored because it has an invalid role: "' +
                              n[a].members[u].role +
                              '"'
                          );
                    if (
                      (n[a].members.forEach(function (e) {
                        v[e.ref] &&
                          ("outer" !== e.role ||
                            r(v[e.ref].tags, n[a].tags) ||
                            (v[e.ref].is_skippablerelationmember = !0),
                          "inner" !== e.role ||
                            r(v[e.ref].tags) ||
                            (v[e.ref].is_skippablerelationmember = !0));
                      }),
                      0 == x)
                    ) {
                      N.verbose &&
                        console.warn(
                          "Multipolygon relation",
                          n[a].type + "/" + n[a].id,
                          "ignored because it has no outer ways"
                        );
                      continue;
                    }
                    var E = !1;
                    1 != x || r(n[a].tags, { type: !0 }) || (E = !0);
                    j = null;
                    if (E) {
                      var M = n[a].members.filter(function (e) {
                        return "outer" === e.role;
                      })[0];
                      if (void 0 === (M = v[M.ref])) {
                        N.verbose &&
                          console.warn(
                            "Multipolygon relation",
                            n[a].type + "/" + n[a].id,
                            "ignored because outer way",
                            M.type + "/" + M.ref,
                            "is missing"
                          );
                        continue;
                      }
                      (M.is_skippablerelationmember = !0), (j = T(M, n[a]));
                    } else j = T(n[a], n[a]);
                    if (!1 === j) {
                      N.verbose &&
                        console.warn(
                          "Multipolygon relation",
                          n[a].type + "/" + n[a].id,
                          "ignored because it has invalid geometry"
                        );
                      continue;
                    }
                    function T(e, t) {
                      var n,
                        i,
                        r,
                        o,
                        a = !1,
                        u = E ? "way" : "relation",
                        s =
                          "number" == typeof e.id
                            ? e.id
                            : +e.id.replace("_fullGeom", "");
                      function l(e) {
                        function t(e, t) {
                          for (var n = 0; n < t.length; n++)
                            if (o(t[n], e)) return !0;
                          return !1;
                        }
                        function n(e) {
                          return e.map(function (e) {
                            return [+e.lat, +e.lon];
                          });
                        }
                        var r,
                          o = function (e, t) {
                            for (
                              var n = e[0],
                                r = e[1],
                                o = !1,
                                i = 0,
                                a = t.length - 1;
                              i < t.length;
                              a = i++
                            ) {
                              var u = t[i][0],
                                s = t[i][1],
                                l = t[a][0],
                                c = t[a][1];
                              r < s != r < c &&
                                n < ((l - u) * (r - s)) / (c - s) + u &&
                                (o = !o);
                            }
                            return o;
                          };
                        for (e = n(e), r = 0; r < i.length; r++)
                          if (t(n(i[r]), e)) return r;
                      }
                      (n = (n = t.members.filter(function (e) {
                        return "way" === e.type;
                      })).map(function (t) {
                        var e = v[t.ref];
                        return void 0 === e || void 0 === e.nodes
                          ? (N.verbose &&
                              console.warn(
                                "Multipolygon",
                                u + "/" + s,
                                "tainted by a missing or incomplete way",
                                t.type + "/" + t.ref
                              ),
                            void (a = !0))
                          : {
                              id: t.ref,
                              role: t.role || "outer",
                              way: e,
                              nodes: e.nodes.filter(function (e) {
                                return (
                                  void 0 !== e ||
                                  ((a = !0),
                                  N.verbose &&
                                    console.warn(
                                      "Multipolygon",
                                      u + "/" + s,
                                      "tainted by a way",
                                      t.type + "/" + t.ref,
                                      "with a missing node"
                                    ),
                                  !1)
                                );
                              }),
                            };
                      })),
                        (n = F.compact(n)),
                        (i = R(
                          n.filter(function (e) {
                            return "outer" === e.role;
                          })
                        )),
                        (r = R(
                          n.filter(function (e) {
                            return "inner" === e.role;
                          })
                        )),
                        (o = i.map(function (e) {
                          return [e];
                        }));
                      for (var c = 0; c < r.length; c++) {
                        var f = l(r[c]);
                        void 0 !== f
                          ? o[f].push(r[c])
                          : N.verbose &&
                            console.warn(
                              "Multipolygon",
                              u + "/" + s,
                              "contains an inner ring with no containing outer"
                            );
                      }
                      var p = [];
                      if (
                        0 ==
                        (p = F.compact(
                          o.map(function (e) {
                            var t = F.compact(
                              e.map(function (e) {
                                if (!(e.length < 4))
                                  return F.compact(
                                    e.map(function (e) {
                                      return [+e.lon, +e.lat];
                                    })
                                  );
                                N.verbose &&
                                  console.warn(
                                    "Multipolygon",
                                    u + "/" + s,
                                    "contains a ring with less than four nodes"
                                  );
                              })
                            );
                            if (0 != t.length) return t;
                            N.verbose &&
                              console.warn(
                                "Multipolygon",
                                u + "/" + s,
                                "contains an empty ring cluster"
                              );
                          })
                        )).length
                      )
                        return (
                          N.verbose &&
                            console.warn(
                              "Multipolygon",
                              u + "/" + s,
                              "contains no coordinates"
                            ),
                          !1
                        );
                      var y = "MultiPolygon";
                      1 === p.length && ((y = "Polygon"), (p = p[0]));
                      var d = {
                        type: "Feature",
                        id: e.type + "/" + s,
                        properties: {
                          type: e.type,
                          id: s,
                          tags: e.tags || {},
                          relations: h[e.type][e.id] || [],
                          meta: g(e),
                        },
                        geometry: { type: y, coordinates: p },
                      };
                      return (
                        a &&
                          (N.verbose &&
                            console.warn(
                              "Multipolygon",
                              u + "/" + s,
                              "is tainted"
                            ),
                          (d.properties.tainted = !0)),
                        d
                      );
                    }
                    B ? B(I(j)) : k.push(j);
                  }
                }
              for (a = 0; a < t.length; a++)
                if (v[t[a].id] === t[a])
                  if (F.isArray(t[a].nodes)) {
                    if (!t[a].is_skippablerelationmember) {
                      "number" != typeof t[a].id &&
                        (t[a].id = +t[a].id.replace("_fullGeom", "")),
                        (t[a].tainted = !1),
                        (t[a].hidden = !1);
                      var P = new Array();
                      for (u = 0; u < t[a].nodes.length; u++)
                        "object" == typeof t[a].nodes[u]
                          ? P.push([+t[a].nodes[u].lon, +t[a].nodes[u].lat])
                          : (N.verbose &&
                              console.warn(
                                "Way",
                                t[a].type + "/" + t[a].id,
                                "is tainted by an invalid node"
                              ),
                            (t[a].tainted = !0));
                      if (P.length <= 1)
                        N.verbose &&
                          console.warn(
                            "Way",
                            t[a].type + "/" + t[a].id,
                            "ignored because it contains too few nodes"
                          );
                      else {
                        var S = "LineString";
                        void 0 !== t[a].nodes[0] &&
                          void 0 !== t[a].nodes[t[a].nodes.length - 1] &&
                          t[a].nodes[0].id ===
                            t[a].nodes[t[a].nodes.length - 1].id &&
                          ((void 0 !== t[a].tags && L(t[a].tags)) ||
                            t[a].__is_bounds_placeholder) &&
                          ((S = "Polygon"), (P = [P]));
                        j = {
                          type: "Feature",
                          id: t[a].type + "/" + t[a].id,
                          properties: {
                            type: t[a].type,
                            id: t[a].id,
                            tags: t[a].tags || {},
                            relations: h.way[t[a].id] || [],
                            meta: g(t[a]),
                          },
                          geometry: { type: S, coordinates: P },
                        };
                        t[a].tainted &&
                          (N.verbose &&
                            console.warn(
                              "Way",
                              t[a].type + "/" + t[a].id,
                              "is tainted"
                            ),
                          (j.properties.tainted = !0)),
                          t[a].__is_bounds_placeholder &&
                            (j.properties.geometry = "bounds"),
                          B
                            ? B(I(j))
                            : "LineString" == S
                            ? A.push(j)
                            : k.push(j);
                      }
                    }
                  } else
                    N.verbose &&
                      console.warn(
                        "Way",
                        t[a].type + "/" + t[a].id,
                        "ignored because it has no nodes"
                      );
              return (
                !!B ||
                (((d = { type: "FeatureCollection", features: [] }).features =
                  d.features.concat(k)),
                (d.features = d.features.concat(A)),
                (d.features = d.features.concat(w)),
                N.flatProperties &&
                  d.features.forEach(function (e) {
                    e.properties = F.merge(
                      e.properties.meta,
                      e.properties.tags,
                      { id: e.properties.type + "/" + e.properties.id }
                    );
                  }),
                (d = I(d)))
              );
            }
            function L(e) {
              var t = N.polygonFeatures;
              if ("function" == typeof t) return t(e);
              if ("no" === e.area) return !1;
              for (var n in e) {
                var r = e[n],
                  o = t[n];
                if (void 0 !== o && "no" !== r) {
                  if (!0 === o) return !0;
                  if (o.included_values && !0 === o.included_values[r])
                    return !0;
                  if (o.excluded_values && !0 !== o.excluded_values[r])
                    return !0;
                }
              }
              return !1;
            }
          }).toGeojson = i),
            (t.exports = i);
        },
        {
          "./lodash.custom.js": 2,
          "@mapbox/geojson-rewind": 4,
          "osm-polygon-features": 5,
        },
      ],
      2: [
        function (e, ln, cn) {
          (function (sn) {
            (function () {
              var _,
                e = "Expected a function",
                r = "__lodash_hash_undefined__",
                h = 1,
                w = 2,
                n = 1 / 0,
                o = 9007199254740991,
                m = "[object Arguments]",
                b = "[object Array]",
                j = "[object Boolean]",
                A = "[object Date]",
                k = "[object Error]",
                O = "[object Function]",
                x = "[object GeneratorFunction]",
                E = "[object Map]",
                M = "[object Number]",
                T = "[object Object]",
                i = "[object Promise]",
                P = "[object RegExp]",
                S = "[object Set]",
                N = "[object String]",
                B = "[object Symbol]",
                a = "[object WeakMap]",
                L = "[object ArrayBuffer]",
                F = "[object DataView]",
                I = "[object Float32Array]",
                R = "[object Float64Array]",
                D = "[object Int8Array]",
                U = "[object Int16Array]",
                $ = "[object Int32Array]",
                G = "[object Uint8Array]",
                C = "[object Uint8ClampedArray]",
                z = "[object Uint16Array]",
                W = "[object Uint32Array]",
                u = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                s = /^\w*$/,
                t = /^\./,
                l =
                  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                c = /\\(\\)?/g,
                q = /\w*$/,
                f = /^\[object .+?Constructor\]$/,
                p = /^(?:0|[1-9]\d*)$/,
                y = {};
              (y[I] =
                y[R] =
                y[D] =
                y[U] =
                y[$] =
                y[G] =
                y[C] =
                y[z] =
                y[W] =
                  !0),
                (y[m] =
                  y[b] =
                  y[L] =
                  y[j] =
                  y[F] =
                  y[A] =
                  y[k] =
                  y[O] =
                  y[E] =
                  y[M] =
                  y[T] =
                  y[P] =
                  y[S] =
                  y[N] =
                  y[a] =
                    !1);
              var V = {};
              (V[m] =
                V[b] =
                V[L] =
                V[F] =
                V[j] =
                V[A] =
                V[I] =
                V[R] =
                V[D] =
                V[U] =
                V[$] =
                V[E] =
                V[M] =
                V[T] =
                V[P] =
                V[S] =
                V[N] =
                V[B] =
                V[G] =
                V[C] =
                V[z] =
                V[W] =
                  !0),
                (V[k] = V[O] = V[a] = !1);
              var d = "object" == typeof sn && sn && sn.Object === Object && sn,
                g =
                  "object" == typeof self &&
                  self &&
                  self.Object === Object &&
                  self,
                v = d || g || Function("return this")(),
                X = "object" == typeof cn && cn && !cn.nodeType && cn,
                H = X && "object" == typeof ln && ln && !ln.nodeType && ln,
                J = H && H.exports === X,
                K = J && d.process,
                Q = (function () {
                  try {
                    return K && K.binding("util");
                  } catch (e) {}
                })(),
                Y = Q && Q.isTypedArray;
              function Z(e, t) {
                return e.set(t[0], t[1]), e;
              }
              function ee(e, t) {
                return e.add(t), e;
              }
              function te(e, t) {
                for (
                  var n = -1, r = e ? e.length : 0;
                  ++n < r && !1 !== t(e[n], n, e);

                );
                return e;
              }
              function ne(e, t, n, r) {
                var o = -1,
                  i = e ? e.length : 0;
                for (r && i && (n = e[++o]); ++o < i; ) n = t(n, e[o], o, e);
                return n;
              }
              function re(e, t) {
                for (var n = -1, r = e ? e.length : 0; ++n < r; )
                  if (t(e[n], n, e)) return !0;
                return !1;
              }
              function oe(e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString)
                  try {
                    t = !!(e + "");
                  } catch (e) {}
                return t;
              }
              function ie(e) {
                var n = -1,
                  r = Array(e.size);
                return (
                  e.forEach(function (e, t) {
                    r[++n] = [t, e];
                  }),
                  r
                );
              }
              function ae(t, n) {
                return function (e) {
                  return t(n(e));
                };
              }
              function ue(e) {
                var t = -1,
                  n = Array(e.size);
                return (
                  e.forEach(function (e) {
                    n[++t] = e;
                  }),
                  n
                );
              }
              var se,
                le = Array.prototype,
                ce = Function.prototype,
                fe = Object.prototype,
                pe = v["__core-js_shared__"],
                ye = (se = /[^.]+$/.exec(
                  (pe && pe.keys && pe.keys.IE_PROTO) || ""
                ))
                  ? "Symbol(src)_1." + se
                  : "",
                de = ce.toString,
                ge = fe.hasOwnProperty,
                ve = de.call(Object),
                he = fe.toString,
                me = RegExp(
                  "^" +
                    de
                      .call(ge)
                      .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?"
                      ) +
                    "$"
                ),
                be = J ? v.Buffer : _,
                _e = v.Symbol,
                we = v.Uint8Array,
                je = ae(Object.getPrototypeOf, Object),
                Ae = Object.create,
                ke = fe.propertyIsEnumerable,
                Oe = le.splice,
                xe = Object.getOwnPropertySymbols,
                Ee = be ? be.isBuffer : _,
                Me = ae(Object.keys, Object),
                Te = Math.max,
                Pe = wt(v, "DataView"),
                Se = wt(v, "Map"),
                Ne = wt(v, "Promise"),
                Be = wt(v, "Set"),
                Le = wt(v, "WeakMap"),
                Fe = wt(Object, "create"),
                Ie = !ke.call({ valueOf: 1 }, "valueOf"),
                Re = St(Pe),
                De = St(Se),
                Ue = St(Ne),
                $e = St(Be),
                Ge = St(Le),
                Ce = _e ? _e.prototype : _,
                ze = Ce ? Ce.valueOf : _,
                We = Ce ? Ce.toString : _;
              function qe() {}
              function Ve(e) {
                var t = -1,
                  n = e ? e.length : 0;
                for (this.clear(); ++t < n; ) {
                  var r = e[t];
                  this.set(r[0], r[1]);
                }
              }
              function Xe(e) {
                var t = -1,
                  n = e ? e.length : 0;
                for (this.clear(); ++t < n; ) {
                  var r = e[t];
                  this.set(r[0], r[1]);
                }
              }
              function He(e) {
                var t = -1,
                  n = e ? e.length : 0;
                for (this.clear(); ++t < n; ) {
                  var r = e[t];
                  this.set(r[0], r[1]);
                }
              }
              function Je(e) {
                var t = -1,
                  n = e ? e.length : 0;
                for (this.__data__ = new He(); ++t < n; ) this.add(e[t]);
              }
              function Ke(e) {
                this.__data__ = new Xe(e);
              }
              function Qe(e, t) {
                var n =
                    It(e) || Ft(e)
                      ? (function (e, t) {
                          for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
                          return r;
                        })(e.length, String)
                      : [],
                  r = n.length,
                  o = !!r;
                for (var i in e)
                  (!t && !ge.call(e, i)) ||
                    (o && ("length" == i || kt(i, r))) ||
                    n.push(i);
                return n;
              }
              function Ye(e, t, n) {
                ((n === _ || Lt(e[t], n)) &&
                  ("number" != typeof t || n !== _ || t in e)) ||
                  (e[t] = n);
              }
              function Ze(e, t, n) {
                var r = e[t];
                (ge.call(e, t) && Lt(r, n) && (n !== _ || t in e)) ||
                  (e[t] = n);
              }
              function et(e, t) {
                for (var n = e.length; n--; ) if (Lt(e[n][0], t)) return n;
                return -1;
              }
              function tt(n, r, o, i, e, t, a) {
                var u;
                if ((i && (u = t ? i(n, e, t, a) : i(n)), u !== _)) return u;
                if (!Ct(n)) return n;
                var s,
                  l,
                  c,
                  f,
                  p,
                  y = It(n);
                if (y) {
                  if (
                    ((u = (function (e) {
                      var t = e.length,
                        n = e.constructor(t);
                      t &&
                        "string" == typeof e[0] &&
                        ge.call(e, "index") &&
                        ((n.index = e.index), (n.input = e.input));
                      return n;
                    })(n)),
                    !r)
                  )
                    return ht(n, u);
                } else {
                  var d = At(n),
                    g = d == O || d == x;
                  if (Ut(n))
                    return (function (e, t) {
                      if (t) return e.slice();
                      var n = new e.constructor(e.length);
                      return e.copy(n), n;
                    })(n, r);
                  if (d == T || d == m || (g && !t)) {
                    if (oe(n)) return t ? n : {};
                    if (
                      ((u =
                        "function" != typeof (p = g ? {} : n).constructor ||
                        xt(p)
                          ? {}
                          : (function (e) {
                              return Ct(e) ? Ae(e) : {};
                            })(je(p))),
                      !r)
                    )
                      return (
                        (f = s = n),
                        (l = (c = u) && mt(f, Yt(f), c)),
                        mt(s, jt(s), l)
                      );
                  } else {
                    if (!V[d]) return t ? n : {};
                    u = (function (e, t, n, r) {
                      var o = e.constructor;
                      switch (t) {
                        case L:
                          return vt(e);
                        case j:
                        case A:
                          return new o(+e);
                        case F:
                          return (function (e, t) {
                            var n = t ? vt(e.buffer) : e.buffer;
                            return new e.constructor(
                              n,
                              e.byteOffset,
                              e.byteLength
                            );
                          })(e, r);
                        case I:
                        case R:
                        case D:
                        case U:
                        case $:
                        case G:
                        case C:
                        case z:
                        case W:
                          return (function (e, t) {
                            var n = t ? vt(e.buffer) : e.buffer;
                            return new e.constructor(n, e.byteOffset, e.length);
                          })(e, r);
                        case E:
                          return (function (e, t, n) {
                            return ne(
                              t ? n(ie(e), !0) : ie(e),
                              Z,
                              new e.constructor()
                            );
                          })(e, r, n);
                        case M:
                        case N:
                          return new o(e);
                        case P:
                          return (function (e) {
                            var t = new e.constructor(e.source, q.exec(e));
                            return (t.lastIndex = e.lastIndex), t;
                          })(e);
                        case S:
                          return (function (e, t, n) {
                            return ne(
                              t ? n(ue(e), !0) : ue(e),
                              ee,
                              new e.constructor()
                            );
                          })(e, r, n);
                        case B:
                          return (function (e) {
                            return ze ? Object(ze.call(e)) : {};
                          })(e);
                      }
                    })(n, d, tt, r);
                  }
                }
                var v = (a = a || new Ke()).get(n);
                if (v) return v;
                if ((a.set(n, u), !y))
                  var h = o
                    ? (function (e, t, n) {
                        var r = t(e);
                        return It(e)
                          ? r
                          : (function (e, t) {
                              for (
                                var n = -1, r = t.length, o = e.length;
                                ++n < r;

                              )
                                e[o + n] = t[n];
                              return e;
                            })(r, n(e));
                      })(n, Yt, jt)
                    : Yt(n);
                return (
                  te(h || n, function (e, t) {
                    h && (e = n[(t = e)]), Ze(u, t, tt(e, r, o, i, t, n, a));
                  }),
                  u
                );
              }
              (Ve.prototype.clear = function () {
                this.__data__ = Fe ? Fe(null) : {};
              }),
                (Ve.prototype.delete = function (e) {
                  return this.has(e) && delete this.__data__[e];
                }),
                (Ve.prototype.get = function (e) {
                  var t = this.__data__;
                  if (Fe) {
                    var n = t[e];
                    return n === r ? _ : n;
                  }
                  return ge.call(t, e) ? t[e] : _;
                }),
                (Ve.prototype.has = function (e) {
                  var t = this.__data__;
                  return Fe ? t[e] !== _ : ge.call(t, e);
                }),
                (Ve.prototype.set = function (e, t) {
                  return (this.__data__[e] = Fe && t === _ ? r : t), this;
                }),
                (Xe.prototype.clear = function () {
                  this.__data__ = [];
                }),
                (Xe.prototype.delete = function (e) {
                  var t = this.__data__,
                    n = et(t, e);
                  return (
                    !(n < 0) &&
                    (n == t.length - 1 ? t.pop() : Oe.call(t, n, 1), !0)
                  );
                }),
                (Xe.prototype.get = function (e) {
                  var t = this.__data__,
                    n = et(t, e);
                  return n < 0 ? _ : t[n][1];
                }),
                (Xe.prototype.has = function (e) {
                  return -1 < et(this.__data__, e);
                }),
                (Xe.prototype.set = function (e, t) {
                  var n = this.__data__,
                    r = et(n, e);
                  return r < 0 ? n.push([e, t]) : (n[r][1] = t), this;
                }),
                (He.prototype.clear = function () {
                  this.__data__ = {
                    hash: new Ve(),
                    map: new (Se || Xe)(),
                    string: new Ve(),
                  };
                }),
                (He.prototype.delete = function (e) {
                  return _t(this, e).delete(e);
                }),
                (He.prototype.get = function (e) {
                  return _t(this, e).get(e);
                }),
                (He.prototype.has = function (e) {
                  return _t(this, e).has(e);
                }),
                (He.prototype.set = function (e, t) {
                  return _t(this, e).set(e, t), this;
                }),
                (Je.prototype.add = Je.prototype.push =
                  function (e) {
                    return this.__data__.set(e, r), this;
                  }),
                (Je.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (Ke.prototype.clear = function () {
                  this.__data__ = new Xe();
                }),
                (Ke.prototype.delete = function (e) {
                  return this.__data__.delete(e);
                }),
                (Ke.prototype.get = function (e) {
                  return this.__data__.get(e);
                }),
                (Ke.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (Ke.prototype.set = function (e, t) {
                  var n = this.__data__;
                  if (n instanceof Xe) {
                    var r = n.__data__;
                    if (!Se || r.length < 199) return r.push([e, t]), this;
                    n = this.__data__ = new He(r);
                  }
                  return n.set(e, t), this;
                });
              var nt,
                rt,
                ot,
                it =
                  ((nt = function (e, t) {
                    return e && at(e, t, Yt);
                  }),
                  function (e, t) {
                    if (null == e) return e;
                    if (!Rt(e)) return nt(e, t);
                    for (
                      var n = e.length, r = rt ? n : -1, o = Object(e);
                      (rt ? r-- : ++r < n) && !1 !== t(o[r], r, o);

                    );
                    return e;
                  }),
                at = function (e, t, n) {
                  for (
                    var r = -1, o = Object(e), i = n(e), a = i.length;
                    a--;

                  ) {
                    var u = i[ot ? a : ++r];
                    if (!1 === t(o[u], u, o)) break;
                  }
                  return e;
                };
              function ut(e, t) {
                for (
                  var n = 0, r = (t = Ot(t, e) ? [t] : gt(t)).length;
                  null != e && n < r;

                )
                  e = e[Pt(t[n++])];
                return n && n == r ? e : _;
              }
              function st(e, t) {
                return null != e && t in Object(e);
              }
              function lt(e, t, n, r, o) {
                return (
                  e === t ||
                  (null == e || null == t || (!Ct(e) && !zt(t))
                    ? e != e && t != t
                    : (function (e, t, n, r, o, i) {
                        var a = It(e),
                          u = It(t),
                          s = b,
                          l = b;
                        a || (s = (s = At(e)) == m ? T : s);
                        u || (l = (l = At(t)) == m ? T : l);
                        var c = s == T && !oe(e),
                          f = l == T && !oe(t),
                          p = s == l;
                        if (p && !c)
                          return (
                            (i = i || new Ke()),
                            a || Xt(e)
                              ? bt(e, t, n, r, o, i)
                              : (function (e, t, n, r, o, i, a) {
                                  switch (n) {
                                    case F:
                                      if (
                                        e.byteLength != t.byteLength ||
                                        e.byteOffset != t.byteOffset
                                      )
                                        return !1;
                                      (e = e.buffer), (t = t.buffer);
                                    case L:
                                      return !(
                                        e.byteLength != t.byteLength ||
                                        !r(new we(e), new we(t))
                                      );
                                    case j:
                                    case A:
                                    case M:
                                      return Lt(+e, +t);
                                    case k:
                                      return (
                                        e.name == t.name &&
                                        e.message == t.message
                                      );
                                    case P:
                                    case N:
                                      return e == t + "";
                                    case E:
                                      var u = ie;
                                    case S:
                                      var s = i & w;
                                      if (
                                        ((u = u || ue), e.size != t.size && !s)
                                      )
                                        return !1;
                                      var l = a.get(e);
                                      if (l) return l == t;
                                      (i |= h), a.set(e, t);
                                      var c = bt(u(e), u(t), r, o, i, a);
                                      return a.delete(e), c;
                                    case B:
                                      if (ze) return ze.call(e) == ze.call(t);
                                  }
                                  return !1;
                                })(e, t, s, n, r, o, i)
                          );
                        if (!(o & w)) {
                          var y = c && ge.call(e, "__wrapped__"),
                            d = f && ge.call(t, "__wrapped__");
                          if (y || d) {
                            var g = y ? e.value() : e,
                              v = d ? t.value() : t;
                            return (i = i || new Ke()), n(g, v, r, o, i);
                          }
                        }
                        return (
                          p &&
                          ((i = i || new Ke()),
                          (function (e, t, n, r, o, i) {
                            var a = o & w,
                              u = Yt(e),
                              s = u.length,
                              l = Yt(t).length;
                            if (s != l && !a) return !1;
                            var c = s;
                            for (; c--; ) {
                              var f = u[c];
                              if (!(a ? f in t : ge.call(t, f))) return !1;
                            }
                            var p = i.get(e);
                            if (p && i.get(t)) return p == t;
                            var y = !0;
                            i.set(e, t), i.set(t, e);
                            var d = a;
                            for (; ++c < s; ) {
                              f = u[c];
                              var g = e[f],
                                v = t[f];
                              if (r)
                                var h = a
                                  ? r(v, g, f, t, e, i)
                                  : r(g, v, f, e, t, i);
                              if (
                                !(h === _ ? g === v || n(g, v, r, o, i) : h)
                              ) {
                                y = !1;
                                break;
                              }
                              d = d || "constructor" == f;
                            }
                            if (y && !d) {
                              var m = e.constructor,
                                b = t.constructor;
                              m != b &&
                                "constructor" in e &&
                                "constructor" in t &&
                                !(
                                  "function" == typeof m &&
                                  m instanceof m &&
                                  "function" == typeof b &&
                                  b instanceof b
                                ) &&
                                (y = !1);
                            }
                            return i.delete(e), i.delete(t), y;
                          })(e, t, n, r, o, i))
                        );
                      })(e, t, lt, n, r, o))
                );
              }
              function ct(e) {
                return (
                  !(!Ct(e) || ((t = e), ye && ye in t)) &&
                  ($t(e) || oe(e) ? me : f).test(St(e))
                );
                var t;
              }
              function ft(e) {
                return "function" == typeof e
                  ? e
                  : null == e
                  ? nn
                  : "object" == typeof e
                  ? It(e)
                    ? (function (n, r) {
                        if (Ot(n) && Et(r)) return Mt(Pt(n), r);
                        return function (e) {
                          var t = Kt(e, n);
                          return t === _ && t === r
                            ? Qt(e, n)
                            : lt(r, t, _, h | w);
                        };
                      })(e[0], e[1])
                    : (function (t) {
                        var n = (function (e) {
                          var t = Yt(e),
                            n = t.length;
                          for (; n--; ) {
                            var r = t[n],
                              o = e[r];
                            t[n] = [r, o, Et(o)];
                          }
                          return t;
                        })(t);
                        if (1 == n.length && n[0][2])
                          return Mt(n[0][0], n[0][1]);
                        return function (e) {
                          return (
                            e === t ||
                            (function (e, t, n, r) {
                              var o = n.length,
                                i = o,
                                a = !r;
                              if (null == e) return !i;
                              for (e = Object(e); o--; ) {
                                var u = n[o];
                                if (a && u[2] ? u[1] !== e[u[0]] : !(u[0] in e))
                                  return !1;
                              }
                              for (; ++o < i; ) {
                                var s = (u = n[o])[0],
                                  l = e[s],
                                  c = u[1];
                                if (a && u[2]) {
                                  if (l === _ && !(s in e)) return !1;
                                } else {
                                  var f = new Ke();
                                  if (r) var p = r(l, c, s, e, t, f);
                                  if (!(p === _ ? lt(c, l, r, h | w, f) : p))
                                    return !1;
                                }
                              }
                              return !0;
                            })(e, t, n)
                          );
                        };
                      })(e)
                  : on(e);
              }
              function pt(e) {
                if (!Ct(e))
                  return (function (e) {
                    var t = [];
                    if (null != e) for (var n in Object(e)) t.push(n);
                    return t;
                  })(e);
                var t = xt(e),
                  n = [];
                for (var r in e)
                  ("constructor" != r || (!t && ge.call(e, r))) && n.push(r);
                return n;
              }
              function yt(r, o, i, a, u) {
                if (r !== o) {
                  if (!It(o) && !Xt(o)) var s = pt(o);
                  te(s || o, function (e, t) {
                    if ((s && (e = o[(t = e)]), Ct(e)))
                      (u = u || new Ke()),
                        (function (e, t, n, r, o, i, a) {
                          var u = e[n],
                            s = t[n],
                            l = a.get(s);
                          if (l) return Ye(e, n, l);
                          var c = i ? i(u, s, n + "", e, t, a) : _,
                            f = c === _;
                          f &&
                            (It((c = s)) || Xt(s)
                              ? (c = It(u)
                                  ? u
                                  : Dt(u)
                                  ? ht(u)
                                  : tt(s, !(f = !1)))
                              : Wt(s) || Ft(s)
                              ? (c = Ft(u)
                                  ? Ht(u)
                                  : !Ct(u) || (r && $t(u))
                                  ? tt(s, !(f = !1))
                                  : u)
                              : (f = !1));
                          f && (a.set(s, c), o(c, s, r, i, a), a.delete(s));
                          Ye(e, n, c);
                        })(r, o, t, i, yt, a, u);
                    else {
                      var n = a ? a(r[t], e, t + "", r, o, u) : _;
                      n === _ && (n = e), Ye(r, t, n);
                    }
                  });
                }
              }
              function dt(i, a) {
                return (
                  (a = Te(a === _ ? i.length - 1 : a, 0)),
                  function () {
                    for (
                      var e = arguments,
                        t = -1,
                        n = Te(e.length - a, 0),
                        r = Array(n);
                      ++t < n;

                    )
                      r[t] = e[a + t];
                    t = -1;
                    for (var o = Array(a + 1); ++t < a; ) o[t] = e[t];
                    return (
                      (o[a] = r),
                      (function (e, t, n) {
                        switch (n.length) {
                          case 0:
                            return e.call(t);
                          case 1:
                            return e.call(t, n[0]);
                          case 2:
                            return e.call(t, n[0], n[1]);
                          case 3:
                            return e.call(t, n[0], n[1], n[2]);
                        }
                        return e.apply(t, n);
                      })(i, this, o)
                    );
                  }
                );
              }
              function gt(e) {
                return It(e) ? e : Tt(e);
              }
              function vt(e) {
                var t = new e.constructor(e.byteLength);
                return new we(t).set(new we(e)), t;
              }
              function ht(e, t) {
                var n = -1,
                  r = e.length;
                for (t = t || Array(r); ++n < r; ) t[n] = e[n];
                return t;
              }
              function mt(e, t, n, r) {
                n = n || {};
                for (var o = -1, i = t.length; ++o < i; ) {
                  var a = t[o],
                    u = r ? r(n[a], e[a], a, n, e) : _;
                  Ze(n, a, u === _ ? e[a] : u);
                }
                return n;
              }
              function bt(e, t, n, r, o, i) {
                var a = o & w,
                  u = e.length,
                  s = t.length;
                if (u != s && !(a && u < s)) return !1;
                var l = i.get(e);
                if (l && i.get(t)) return l == t;
                var c = -1,
                  f = !0,
                  p = o & h ? new Je() : _;
                for (i.set(e, t), i.set(t, e); ++c < u; ) {
                  var y = e[c],
                    d = t[c];
                  if (r) var g = a ? r(d, y, c, t, e, i) : r(y, d, c, e, t, i);
                  if (g !== _) {
                    if (g) continue;
                    f = !1;
                    break;
                  }
                  if (p) {
                    if (
                      !re(t, function (e, t) {
                        if (!p.has(t) && (y === e || n(y, e, r, o, i)))
                          return p.add(t);
                      })
                    ) {
                      f = !1;
                      break;
                    }
                  } else if (y !== d && !n(y, d, r, o, i)) {
                    f = !1;
                    break;
                  }
                }
                return i.delete(e), i.delete(t), f;
              }
              function _t(e, t) {
                var n,
                  r,
                  o = e.__data__;
                return (
                  "string" == (r = typeof (n = t)) ||
                  "number" == r ||
                  "symbol" == r ||
                  "boolean" == r
                    ? "__proto__" !== n
                    : null === n
                )
                  ? o["string" == typeof t ? "string" : "hash"]
                  : o.map;
              }
              function wt(e, t) {
                var n,
                  r,
                  o = ((r = t), null == (n = e) ? _ : n[r]);
                return ct(o) ? o : _;
              }
              var jt = xe ? ae(xe, Object) : an,
                At = function (e) {
                  return he.call(e);
                };
              function kt(e, t) {
                return (
                  !!(t = null == t ? o : t) &&
                  ("number" == typeof e || p.test(e)) &&
                  -1 < e &&
                  e % 1 == 0 &&
                  e < t
                );
              }
              function Ot(e, t) {
                if (It(e)) return !1;
                var n = typeof e;
                return (
                  !(
                    "number" != n &&
                    "symbol" != n &&
                    "boolean" != n &&
                    null != e &&
                    !qt(e)
                  ) ||
                  s.test(e) ||
                  !u.test(e) ||
                  (null != t && e in Object(t))
                );
              }
              function xt(e) {
                var t = e && e.constructor;
                return e === (("function" == typeof t && t.prototype) || fe);
              }
              function Et(e) {
                return e == e && !Ct(e);
              }
              function Mt(t, n) {
                return function (e) {
                  return null != e && e[t] === n && (n !== _ || t in Object(e));
                };
              }
              ((Pe && At(new Pe(new ArrayBuffer(1))) != F) ||
                (Se && At(new Se()) != E) ||
                (Ne && At(Ne.resolve()) != i) ||
                (Be && At(new Be()) != S) ||
                (Le && At(new Le()) != a)) &&
                (At = function (e) {
                  var t = he.call(e),
                    n = t == T ? e.constructor : _,
                    r = n ? St(n) : _;
                  if (r)
                    switch (r) {
                      case Re:
                        return F;
                      case De:
                        return E;
                      case Ue:
                        return i;
                      case $e:
                        return S;
                      case Ge:
                        return a;
                    }
                  return t;
                });
              var Tt = Bt(function (e) {
                e = Jt(e);
                var o = [];
                return (
                  t.test(e) && o.push(""),
                  e.replace(l, function (e, t, n, r) {
                    o.push(n ? r.replace(c, "$1") : t || e);
                  }),
                  o
                );
              });
              function Pt(e) {
                if ("string" == typeof e || qt(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -n ? "-0" : t;
              }
              function St(e) {
                if (null != e) {
                  try {
                    return de.call(e);
                  } catch (e) {}
                  try {
                    return e + "";
                  } catch (e) {}
                }
                return "";
              }
              function Nt(e, t) {
                return (It(e) ? te : it)(
                  e,
                  (function (e, t) {
                    var n = qe.iteratee || rn;
                    return (
                      (n = n === rn ? ft : n), arguments.length ? n(e, t) : n
                    );
                  })(t, 3)
                );
              }
              function Bt(o, i) {
                if ("function" != typeof o || (i && "function" != typeof i))
                  throw new TypeError(e);
                var a = function () {
                  var e = arguments,
                    t = i ? i.apply(this, e) : e[0],
                    n = a.cache;
                  if (n.has(t)) return n.get(t);
                  var r = o.apply(this, e);
                  return (a.cache = n.set(t, r)), r;
                };
                return (a.cache = new (Bt.Cache || He)()), a;
              }
              function Lt(e, t) {
                return e === t || (e != e && t != t);
              }
              function Ft(e) {
                return (
                  Dt(e) &&
                  ge.call(e, "callee") &&
                  (!ke.call(e, "callee") || he.call(e) == m)
                );
              }
              Bt.Cache = He;
              var It = Array.isArray;
              function Rt(e) {
                return null != e && Gt(e.length) && !$t(e);
              }
              function Dt(e) {
                return zt(e) && Rt(e);
              }
              var Ut = Ee || un;
              function $t(e) {
                var t = Ct(e) ? he.call(e) : "";
                return t == O || t == x;
              }
              function Gt(e) {
                return "number" == typeof e && -1 < e && e % 1 == 0 && e <= o;
              }
              function Ct(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t);
              }
              function zt(e) {
                return !!e && "object" == typeof e;
              }
              function Wt(e) {
                if (!zt(e) || he.call(e) != T || oe(e)) return !1;
                var t = je(e);
                if (null === t) return !0;
                var n = ge.call(t, "constructor") && t.constructor;
                return (
                  "function" == typeof n && n instanceof n && de.call(n) == ve
                );
              }
              function qt(e) {
                return "symbol" == typeof e || (zt(e) && he.call(e) == B);
              }
              var Vt,
                Xt = Y
                  ? ((Vt = Y),
                    function (e) {
                      return Vt(e);
                    })
                  : function (e) {
                      return zt(e) && Gt(e.length) && !!y[he.call(e)];
                    };
              function Ht(e) {
                return mt(e, Zt(e));
              }
              function Jt(e) {
                return null == e
                  ? ""
                  : (function (e) {
                      if ("string" == typeof e) return e;
                      if (qt(e)) return We ? We.call(e) : "";
                      var t = e + "";
                      return "0" == t && 1 / e == -n ? "-0" : t;
                    })(e);
              }
              function Kt(e, t, n) {
                var r = null == e ? _ : ut(e, t);
                return r === _ ? n : r;
              }
              function Qt(e, t) {
                return (
                  null != e &&
                  (function (e, t, n) {
                    for (
                      var r, o = -1, i = (t = Ot(t, e) ? [t] : gt(t)).length;
                      ++o < i;

                    ) {
                      var a = Pt(t[o]);
                      if (!(r = null != e && n(e, a))) break;
                      e = e[a];
                    }
                    return (
                      r ||
                      (!!(i = e ? e.length : 0) &&
                        Gt(i) &&
                        kt(a, i) &&
                        (It(e) || Ft(e)))
                    );
                  })(e, t, st)
                );
              }
              function Yt(e) {
                return Rt(e)
                  ? Qe(e)
                  : (function (e) {
                      if (!xt(e)) return Me(e);
                      var t = [];
                      for (var n in Object(e))
                        ge.call(e, n) && "constructor" != n && t.push(n);
                      return t;
                    })(e);
              }
              function Zt(e) {
                return Rt(e) ? Qe(e, !0) : pt(e);
              }
              var en,
                tn =
                  ((en = function (e, t, n) {
                    yt(e, t, n);
                  }),
                  dt(function (e, t) {
                    var n = -1,
                      r = t.length,
                      o = 1 < r ? t[r - 1] : _,
                      i = 2 < r ? t[2] : _;
                    for (
                      o =
                        3 < en.length && "function" == typeof o ? (r--, o) : _,
                        i &&
                          (function (e, t, n) {
                            if (!Ct(n)) return !1;
                            var r = typeof t;
                            return (
                              !!("number" == r
                                ? Rt(n) && kt(t, n.length)
                                : "string" == r && (t in n)) && Lt(n[t], e)
                            );
                          })(t[0], t[1], i) &&
                          ((o = r < 3 ? _ : o), (r = 1)),
                        e = Object(e);
                      ++n < r;

                    ) {
                      var a = t[n];
                      a && en(e, a, n, o);
                    }
                    return e;
                  }));
              function nn(e) {
                return e;
              }
              function rn(e) {
                return ft("function" == typeof e ? e : tt(e, !0));
              }
              function on(e) {
                return Ot(e)
                  ? ((n = Pt(e)),
                    function (e) {
                      return null == e ? _ : e[n];
                    })
                  : ((t = e),
                    function (e) {
                      return ut(e, t);
                    });
                var t, n;
              }
              function an() {
                return [];
              }
              function un() {
                return !1;
              }
              (qe.compact = function (e) {
                for (
                  var t = -1, n = e ? e.length : 0, r = 0, o = [];
                  ++t < n;

                ) {
                  var i = e[t];
                  i && (o[r++] = i);
                }
                return o;
              }),
                (qe.iteratee = rn),
                (qe.keys = Yt),
                (qe.keysIn = Zt),
                (qe.memoize = Bt),
                (qe.merge = tn),
                (qe.property = on),
                (qe.toPlainObject = Ht),
                (qe.clone = function (e) {
                  return tt(e, !1, !0);
                }),
                (qe.eq = Lt),
                (qe.forEach = Nt),
                (qe.get = Kt),
                (qe.hasIn = Qt),
                (qe.identity = nn),
                (qe.isArguments = Ft),
                (qe.isArray = It),
                (qe.isArrayLike = Rt),
                (qe.isArrayLikeObject = Dt),
                (qe.isBuffer = Ut),
                (qe.isEmpty = function (e) {
                  if (
                    Rt(e) &&
                    (It(e) ||
                      "string" == typeof e ||
                      "function" == typeof e.splice ||
                      Ut(e) ||
                      Ft(e))
                  )
                    return !e.length;
                  var t = At(e);
                  if (t == E || t == S) return !e.size;
                  if (Ie || xt(e)) return !Me(e).length;
                  for (var n in e) if (ge.call(e, n)) return !1;
                  return !0;
                }),
                (qe.isFunction = $t),
                (qe.isLength = Gt),
                (qe.isObject = Ct),
                (qe.isObjectLike = zt),
                (qe.isPlainObject = Wt),
                (qe.isSymbol = qt),
                (qe.isTypedArray = Xt),
                (qe.stubArray = an),
                (qe.stubFalse = un),
                (qe.toString = Jt),
                (qe.each = Nt),
                (qe.VERSION = "4.15.0"),
                H && (((H.exports = qe)._ = qe), (X._ = qe));
            }.call(this));
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      3: [
        function (e, t, n) {
          var l = e("wgs84");
          function o(e) {
            var t = 0;
            if (e && 0 < e.length) {
              t += Math.abs(r(e[0]));
              for (var n = 1; n < e.length; n++) t -= Math.abs(r(e[n]));
            }
            return t;
          }
          function r(e) {
            var t,
              n,
              r,
              o,
              i,
              a,
              u = 0,
              s = e.length;
            if (2 < s) {
              for (a = 0; a < s; a++)
                (i =
                  a === s - 2
                    ? ((r = s - 2), (o = s - 1), 0)
                    : a === s - 1
                    ? ((r = s - 1), (o = 0), 1)
                    : ((o = (r = a) + 1), a + 2)),
                  (t = e[r]),
                  (n = e[o]),
                  (u += (c(e[i][0]) - c(t[0])) * Math.sin(c(n[1])));
              u = (u * l.RADIUS * l.RADIUS) / 2;
            }
            return u;
          }
          function c(e) {
            return (e * Math.PI) / 180;
          }
          (t.exports.geometry = function e(t) {
            var n,
              r = 0;
            switch (t.type) {
              case "Polygon":
                return o(t.coordinates);
              case "MultiPolygon":
                for (n = 0; n < t.coordinates.length; n++)
                  r += o(t.coordinates[n]);
                return r;
              case "Point":
              case "MultiPoint":
              case "LineString":
              case "MultiLineString":
                return 0;
              case "GeometryCollection":
                for (n = 0; n < t.geometries.length; n++)
                  r += e(t.geometries[n]);
                return r;
            }
          }),
            (t.exports.ring = r);
        },
        { wgs84: 7 },
      ],
      4: [
        function (e, t, n) {
          var r = e("@mapbox/geojson-area");
          function o(t, n) {
            return function (e) {
              return t(e, n);
            };
          }
          function i(e, t) {
            return (
              "Polygon" === e.type
                ? (e.coordinates = a(e.coordinates, t))
                : "MultiPolygon" === e.type &&
                  (e.coordinates = e.coordinates.map(o(a, t))),
              e
            );
          }
          function a(e, t) {
            (t = !!t), (e[0] = u(e[0], t));
            for (var n = 1; n < e.length; n++) e[n] = u(e[n], !t);
            return e;
          }
          function u(e, t) {
            return (n = e), 0 <= r.ring(n) === t ? e : e.reverse();
            var n;
          }
          t.exports = function e(t, n) {
            switch ((t && t.type) || null) {
              case "FeatureCollection":
                return (t.features = t.features.map(o(e, n))), t;
              case "GeometryCollection":
                return (t.geometries = t.geometries.map(o(e, n))), t;
              case "Feature":
                return (t.geometry = e(t.geometry, n)), t;
              case "Polygon":
              case "MultiPolygon":
                return i(t, n);
              default:
                return t;
            }
          };
        },
        { "@mapbox/geojson-area": 3 },
      ],
      5: [
        function (e, t, n) {
          t.exports = e("./polygon-features.json");
        },
        { "./polygon-features.json": 6 },
      ],
      6: [
        function (e, t, n) {
          t.exports = [
            { key: "building", polygon: "all" },
            {
              key: "highway",
              polygon: "whitelist",
              values: ["services", "rest_area", "escape", "elevator"],
            },
            {
              key: "natural",
              polygon: "blacklist",
              values: ["coastline", "cliff", "ridge", "arete", "tree_row"],
            },
            { key: "landuse", polygon: "all" },
            {
              key: "waterway",
              polygon: "whitelist",
              values: ["riverbank", "dock", "boatyard", "dam"],
            },
            { key: "amenity", polygon: "all" },
            { key: "leisure", polygon: "all" },
            {
              key: "barrier",
              polygon: "whitelist",
              values: [
                "city_wall",
                "ditch",
                "hedge",
                "retaining_wall",
                "wall",
                "spikes",
              ],
            },
            {
              key: "railway",
              polygon: "whitelist",
              values: ["station", "turntable", "roundhouse", "platform"],
            },
            { key: "area", polygon: "all" },
            { key: "boundary", polygon: "all" },
            {
              key: "man_made",
              polygon: "blacklist",
              values: ["cutline", "embankment", "pipeline"],
            },
            {
              key: "power",
              polygon: "whitelist",
              values: ["plant", "substation", "generator", "transformer"],
            },
            { key: "place", polygon: "all" },
            { key: "shop", polygon: "all" },
            { key: "aeroway", polygon: "blacklist", values: ["taxiway"] },
            { key: "tourism", polygon: "all" },
            { key: "historic", polygon: "all" },
            { key: "public_transport", polygon: "all" },
            { key: "office", polygon: "all" },
            { key: "building:part", polygon: "all" },
            { key: "military", polygon: "all" },
            { key: "ruins", polygon: "all" },
            { key: "area:highway", polygon: "all" },
            { key: "craft", polygon: "all" },
            { key: "golf", polygon: "all" },
            { key: "indoor", polygon: "all" },
          ];
        },
        {},
      ],
      7: [
        function (e, t, n) {
          (t.exports.RADIUS = 6378137),
            (t.exports.FLATTENING = 1 / 298.257223563),
            (t.exports.POLAR_RADIUS = 6356752.3142);
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});
