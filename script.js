(function () {
  "use strict";

  // Data (PHASES, SKILLS, TIERS, TIER_RANK, PHD_START, PHD_END) comes from data.js.

  var STORE_KEY = "toolkit-roadmap-done";

  /* ---------- saved progress ---------- */

  function loadDone() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveDone(d) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(d));
    } catch (e) { /* storage unavailable: progress lasts for this visit only */ }
  }

  var done = loadDone();

  /* ---------- helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function skillId(s) { return s.title; }

  function months() {
    return Math.max(0, Math.round((new Date() - PHD_START) / (1000 * 60 * 60 * 24 * 30.44)));
  }

  function phdYear() {
    return Math.min(5, Math.floor(months() / 12) + 1);
  }

  function currentPhaseIndex() {
    var now = new Date();
    var index = 0;
    for (var i = 0; i < PHASES.length; i++) {
      if (now >= PHASES[i].start) index = i;
    }
    return index;
  }

  function link(s, className) {
    var a = el("a", className, s.title);
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  /* ---------- time bar ---------- */

  function buildTimeBar() {
    var now = new Date();
    var total = 60;
    var m = Math.min(total, Math.max(1, months()));
    var phase = PHASES[currentPhaseIndex()].title;

    document.getElementById("time").textContent =
      now < PHD_START ? "Your PhD has not started yet" : "Month " + m + " of " + total + ", " + phase;

    var p = Math.max(0, Math.min(1, (now - PHD_START) / (PHD_END - PHD_START))) * 100;
    document.getElementById("timefill").style.width = p.toFixed(1) + "%";
  }

  /* ---------- timeline ---------- */

  function buildPhases() {
    var host = document.getElementById("phases");
    var current = currentPhaseIndex();

    PHASES.forEach(function (phase, i) {
      var d = el("details", "phase");
      if (i === current) d.open = true;

      var summary = el("summary");
      summary.appendChild(el("span", "phase-title", "Year " + (i + 1) + ": " + phase.title));
      summary.appendChild(el("span", "phase-dates", phase.dates));
      if (i === current) summary.appendChild(el("span", "phase-now", "You are here"));
      d.appendChild(summary);

      var ul = el("ul");
      phase.goals.forEach(function (goal) { ul.appendChild(el("li", null, goal)); });
      d.appendChild(ul);

      host.appendChild(d);
    });
  }

  /* ---------- up next ---------- */

  function renderNext() {
    var list = document.getElementById("next");
    var intro = document.getElementById("next-intro");
    list.textContent = "";

    var year = phdYear();
    var pending = SKILLS.filter(function (s) { return !done[skillId(s)]; });
    var due = pending.filter(function (s) { return s.year <= year; });
    var pool = due;
    var label = "Three things to work on now, essentials first.";

    if (due.length === 0) {
      pool = pending.filter(function (s) { return s.year === year + 1; });
      label = "You have covered everything planned for year " + year + ". Here is what comes next.";
    }
    if (pool.length === 0) {
      intro.textContent = pending.length === 0
        ? "You have ticked every skill on this page."
        : "Open the toolkit below to see what is left.";
      return;
    }

    pool = pool.map(function (s, i) { return { s: s, i: i }; })
      .sort(function (a, b) {
        return TIER_RANK[a.s.tier] - TIER_RANK[b.s.tier] || a.s.year - b.s.year || a.i - b.i;
      })
      .slice(0, 3)
      .map(function (x) { return x.s; });

    intro.textContent = label;

    pool.forEach(function (s) {
      var li = el("li", "next-item");
      var text = el("div");
      text.appendChild(link(s, "skill-title"));
      text.appendChild(el("p", "skill-note", s.note));

      var btn = el("button", "text-button", "Mark learned");
      btn.type = "button";
      btn.setAttribute("aria-label", "Mark " + s.title + " as learned");
      btn.addEventListener("click", function () {
        done[skillId(s)] = true;
        saveDone(done);
        renderGroups();
      });

      li.appendChild(text);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  /* ---------- toolkit ---------- */

  var areas = [];
  SKILLS.forEach(function (s) {
    if (areas.indexOf(s.area) === -1) areas.push(s.area);
  });

  var view = "essential";           // "essential" or "all"
  var query = "";
  var openAreas = {};
  openAreas[areas[0]] = true;       // start with the first area open

  function matches(s) {
    if (view === "essential" && s.tier !== "essential") return false;
    if (!query) return true;
    return (s.title + " " + s.note + " " + s.kind + " " + s.area).toLowerCase().indexOf(query) !== -1;
  }

  function buildControls() {
    var box = document.getElementById("view");
    var essentialCount = SKILLS.filter(function (s) { return s.tier === "essential"; }).length;
    var options = [
      ["essential", "Essentials (" + essentialCount + ")"],
      ["all", "Everything (" + SKILLS.length + ")"]
    ];

    options.forEach(function (pair) {
      var b = el("button", null, pair[1]);
      b.type = "button";
      b.setAttribute("aria-pressed", pair[0] === view ? "true" : "false");
      b.addEventListener("click", function () {
        view = pair[0];
        Array.prototype.forEach.call(box.children, function (child) {
          child.setAttribute("aria-pressed", child === b ? "true" : "false");
        });
        renderGroups();
      });
      box.appendChild(b);
    });

    document.getElementById("search").addEventListener("input", function (e) {
      query = e.target.value.trim().toLowerCase();
      renderGroups();
    });
  }

  function renderGroups() {
    var host = document.getElementById("groups");
    host.textContent = "";
    var shown = 0;

    areas.forEach(function (area) {
      var skills = SKILLS.filter(function (s) { return s.area === area && matches(s); });
      if (skills.length === 0) return;
      shown += skills.length;

      var group = el("details", "group");
      group.open = !!query || !!openAreas[area];
      group.addEventListener("toggle", function () {
        if (!query) openAreas[area] = group.open;
      });

      var summary = el("summary");
      summary.appendChild(el("span", "group-name", area));
      var count = el("span", "group-count");
      count.setAttribute("data-count", area);
      summary.appendChild(count);
      var bar = el("span", "group-bar");
      var fill = el("span");
      fill.setAttribute("data-fill", area);
      bar.appendChild(fill);
      summary.appendChild(bar);
      group.appendChild(summary);

      var ul = el("ul", "skills");
      skills.forEach(function (s) {
        var li = el("li", "skill" + (done[skillId(s)] ? " done" : ""));

        var box = el("input");
        box.type = "checkbox";
        box.checked = !!done[skillId(s)];
        box.setAttribute("aria-label", "Mark " + s.title + " as learned");
        box.addEventListener("change", function () {
          if (box.checked) done[skillId(s)] = true; else delete done[skillId(s)];
          li.classList.toggle("done", box.checked);
          saveDone(done);
          updateProgress();
          renderNext();
        });

        var text = el("div");
        text.appendChild(link(s, "skill-title"));
        text.appendChild(el("p", "skill-note", s.note));

        var side = el("div", "skill-side");
        if (view === "all") side.appendChild(el("span", "tier tier-" + s.tier, TIERS[s.tier]));
        side.appendChild(el("span", null, "Year " + s.year));

        li.appendChild(box);
        li.appendChild(text);
        li.appendChild(side);
        ul.appendChild(li);
      });
      group.appendChild(ul);
      host.appendChild(group);
    });

    if (shown === 0) {
      host.appendChild(el("p", "empty", "No skills match. Clear the search box, or choose Everything."));
    }

    updateProgress();
    renderNext();
  }

  function updateProgress() {
    var essentials = SKILLS.filter(function (s) { return s.tier === "essential"; });
    var essentialsDone = essentials.filter(function (s) { return done[skillId(s)]; }).length;
    document.getElementById("overall").textContent =
      essentialsDone + " of " + essentials.length + " essentials learned";

    areas.forEach(function (area) {
      var skills = SKILLS.filter(function (s) { return s.area === area && matches(s); });
      var n = skills.filter(function (s) { return done[skillId(s)]; }).length;
      var count = document.querySelector('[data-count="' + area + '"]');
      var fill = document.querySelector('[data-fill="' + area + '"]');
      if (count) count.textContent = n + " of " + skills.length;
      if (fill) fill.style.width = (skills.length ? (n / skills.length) * 100 : 0) + "%";
    });
  }

  /* ---------- reset ---------- */

  document.getElementById("reset").addEventListener("click", function () {
    if (!window.confirm("Clear all ticked skills?")) return;
    done = {};
    saveDone(done);
    renderGroups();
  });

  /* ---------- start ---------- */

  buildTimeBar();
  buildPhases();
  buildControls();
  renderGroups();
})();