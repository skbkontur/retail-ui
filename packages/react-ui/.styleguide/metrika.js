(function (n) {
  function r() {
    n.infra_frontTracker = n.Tracker.createTracker(170, 'prod', {
      catchPageVisits: !0,
      catchUnloadEvent: !0,
      disableCatchClickOnLinks: !1,
    });
    typeof infra_frontQueue != 'undefined' && n.infra_frontTracker.assignQueue(infra_frontQueue);
    n.infra_frontTracker.assignQueue(t);
  }
  var t = [],
    i;
  n.Tracker
    ? r()
    : ((i = document.createElement('script')),
      (i.onload = function () {
        r();
      }),
      (i.type = 'text/javascript'),
      (i.async = !0),
      (i.src = 'https://metrika.kontur.ru/static/js/tracker.new.js'),
      document.head.appendChild(i));
  n.infra_frontTracker ||
    (n.infra_frontTracker = {
      assignQueue: function (n) {
        for (var i = 0; i < n.length; i++) t.push(n[i]);
      },
      push: function (n) {
        t.push(n);
      },
      trackEvent: function (n, i, r, u) {
        t.push(['trackEvent', n, i, r, u]);
      },
      trackPageVisit: function (n) {
        t.push(['trackPageVisit', n]);
      },
      trackElement: function (n, i, r) {
        t.push(['trackElement', n, i, r]);
      },
      enableDevMode: function () {
        t.push(['enableDevMode']);
      },
      enableHTMLTracking: function () {
        t.push(['enableHTMLTracking']);
      },
    });
})(window);
