var GLOBAL = this;
function randomVersion() {
  return "?v=" + Math.round(999999 * Math.random());
}
"undefined" == typeof path_resource && (path_resource = "");
var globalCssList = [],
  globalJsList = [
    path_resource + "js/plugins/digitop/lazyload.js",
    path_resource + "js/plugins/barba/core/dist/barba.umd.js",
    path_resource + "js/plugins/tweenmax/TweenMax.min.js",
    path_resource + "js/plugins/tweenmax/plugins/ScrollToPlugin.min.js",
    path_resource + "js/plugins/nanoscroller/nanoscroller.min.js",
    path_resource + "js/plugins/hovereffect/anime.min.js",
    path_resource + "js/plugins/slick/slick.min.js",
    path_resource + "js/plugins/hovereffect/main.js",
    path_resource + "js/modules/common.js",
  ],
  GLoader = {
    version: 1.2,
    loadScript: function (e, t) {
      var s = !1,
        o = e.indexOf(".js") > -1 ? "js" : "css",
        a = { status: !1, message: "" },
        r =
          "js" == o
            ? document.createElement("script")
            : document.createElement("link");
      function n() {
        s ||
          ((s = !0),
          (a.status = !0),
          (a.message = "Script was loaded successfully"),
          t && t(a));
      }
      r.setAttribute("data-loader", "GLoader"),
        "js" == o
          ? (r.setAttribute("type", "text/javascript"),
            r.setAttribute("src", e + randomVersion()))
          : (r.setAttribute("rel", "stylesheet"),
            r.setAttribute("type", "text/css"),
            r.setAttribute("href", e)),
        (r.onload = n),
        (r.onreadystatechange = function () {
          s || ("complete" === r.readyState && n());
        }),
        (r.onerror = function () {
          s ||
            ((s = !0),
            (a.status = !1),
            (a.message = "Failed to load script."),
            t && t(a));
        }),
        "js" == o ? document.body.appendChild(r) : document.head.appendChild(r);
    },
    isExisted: function (e) {
      for (
        var t = document.getElementsByTagName("script"), s = !1, o = 0;
        o < t.length;
        o++
      )
        if (t[o].src) {
          var a = t[o].src;
          String(a).toLowerCase().indexOf(e.toLowerCase()) >= 0 && (s = !0);
        }
      return s;
    },
    loadScripts: function (e, t) {
      var s = 0,
        o = e.length;
      this.loadScript(e[s], function a(r) {
        s++;
        s == o
          ? ((r.status = !0),
            (r.message = "All scripts were loaded."),
            t && t(r))
          : (GLoader.isExisted(e[s]) &&
              console.log(
                '[GLoader] The script "' + e[s] + '" was existed -> Skipped.'
              ),
            GLoader.loadScript(e[s], a));
      });
    },
    loadPhoto: function (e, t, s) {
      var o = new Image();
      (o.onload = function () {
        void 0 !== s && s(e);
      }),
        (o.onerror = function () {
          void 0 !== s && s(null);
        }),
        (o.src = e);
    },
    loadPhotos: function (e, t, s) {
      var o = e,
        a = 0,
        r = o.length,
        n = { status: !1, message: "" },
        i = [],
        c = o[a];
      this.loadPhoto(c, t, function e(u) {
        a++;
        a == r
          ? ((n.status = !0),
            (n.message = "All photos were loaded."),
            (n.photos = i),
            s && s(n))
          : (i.push(u), (c = o[a]), GLoader.loadPhoto(c, t, e));
      });
    },
  },
  MAIN = {
    init: function () {
      var e = [];
      globalCssList.forEach(function (t) {
        e.push(t);
      }),
        globalJsList.forEach(function (t) {
          e.push(t);
        }),
        GLoader.loadScripts(e, function (e) {
          var t = document.getElementsByTagName("main")[0];
          if (t) {
            var s = t.getAttribute("id");
            s &&
              GLoader.loadScript(
                path_resource + "js/pages/" + s + ".js",
                function (e) {
                  GLOBAL[s] && void 0 !== GLOBAL[s].init && GLOBAL[s].init();
                }
              );
          }
        });
    },
  };
MAIN.init();
