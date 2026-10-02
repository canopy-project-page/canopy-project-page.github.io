/* CANOPY in action: three test questions replayed from the run logs.
 *
 * Each case shows a gold item as retrieved and what CANOPY kept of it; the token
 * counts compare the item whole with the kept regions. The tree beside
 * each item lists every node's query similarity; a child is explored when its score
 * is at least its parent's, and a node is kept whole when no child qualifies. The
 * `sent` list is what the reader finally received, exactly the kept regions. Scores
 * and outcomes are taken verbatim from the run; text is lightly de-tokenised for
 * reading.
 */
(function () {
  "use strict";

  var IMG = "static/images/cases/lvbench/";
  function frames(k) { return [0, 1, 2, 3].map(function (j) { return IMG + "c" + k + "_f" + j + ".jpg"; }); }

  var CASES = {
    text: {
      badge: "HotpotQA · text",
      question: "Timothy J. Sloan was the CEO of Wells Fargo who succeeded the CEO who took the job in what month?",
      gold: "June 2007",
      tokens: { whole: 227, canopy: 155, delta: "−32%" },
      items: [{
        title: "Timothy J. Sloan", kind: "text",
        summary: "CANOPY kept 1 of 2 sentences; the gold sentence is among them",
        units: [
          { id: "s0", text: "Timothy J. Sloan (born 1960/61) is an American banker." },
          { id: "s1", gold: true, text: "He is the chief executive officer (CEO) of Wells Fargo since October 2016, when he succeeded John Stumpf, having previously been chief operating officer (COO) and president." }
        ],
        sent: ["s1"],
        tree: { id: "root", label: "root · s0–s1", score: 0.4715, children: [
          { id: "s0", label: "s0", score: 0.2887 },
          { id: "s1", label: "s1", score: 0.4890 } ] }
      }, {
        title: "John Stumpf", kind: "text",
        summary: "CANOPY kept 3 of 6 sentences; both gold sentences are among them",
        units: [
          { id: "s0", text: "John Gerard Stumpf (born September 15, 1953) is an American business executive and retail banker." },
          { id: "s1", gold: true, text: "He is the former chairman and chief executive officer of Wells Fargo, one of the Big Four banks of the United States." },
          { id: "s2", gold: true, text: "He was named CEO in June 2007, elected to the board of directors in June 2006, and named president in August 2005." },
          { id: "s3", text: "He became chairman in January 2010." },
          { id: "s4", text: "On October 12, 2016, Stumpf announced his retirement as chairman and CEO of effective immediately, following a scandal involving customer accounts and subsequent pressure from the public and lawmakers." },
          { id: "s5", text: "He was succeeded by Timothy J. Sloan." }
        ],
        sent: ["s0", "s1", "s2"],
        tree: { id: "root", label: "root · s0–s5", score: 0.3749, children: [
          { id: "s0-s2", label: "s0–s2", score: 0.4041, children: [
            { id: "s0-s1", label: "s0–s1", score: 0.3837, children: [
              { id: "s0", label: "s0", score: 0.3045 },
              { id: "s1", label: "s1", score: 0.3797 } ] },
            { id: "s2", label: "s2", score: 0.3618 } ] },
          { id: "s3-s5", label: "s3–s5", score: 0.3528, children: [
            { id: "s3-s4", label: "s3–s4", score: 0.3175, children: [
              { id: "s3", label: "s3", score: 0.3172 },
              { id: "s4", label: "s4", score: 0.3167 } ] },
            { id: "s5", label: "s5", score: 0.2769 } ] } ] }
      }]
    },

    video: {
      badge: "LVBench · video",
      question: "What does the protagonist observe through the window after being taken to the utility room in the full episode of Blue Eye Samurai on Netflix?",
      options: ["(A) A group of monks sitting cross-legged in the snow", "(B) A group of citizens chatting together", "(C) A group of warriors practicing swords", "(D) A group of samurais eating"],
      gold: "(C) A group of warriors practicing swords",
      tokens: { whole: 4221, canopy: 1342, delta: "−68%", note: "19 → 6 frames" },
      youtube: { id: "Cm73ma6Ibcs", offset: 2030, length: 190, title: "Blue Eye Samurai | Hammerscale | Full Episode | Netflix" },
      items: [{
        title: "Blue Eye Samurai, “Hammerscale” (a 3:10 video item)", kind: "video",
        summary: "CANOPY kept 2 of 6 clips; the gold clip is among them",
        units: [
          { id: "c0", gold: true, start: "0:00", end: "0:30", sec: [0, 30], frames: frames(0) },
          { id: "c1", start: "0:30", end: "1:00", sec: [30, 60], frames: frames(1) },
          { id: "c2", start: "1:00", end: "1:30", sec: [60, 90], frames: frames(2) },
          { id: "c3", start: "1:30", end: "2:00", sec: [90, 120], frames: frames(3) },
          { id: "c4", start: "2:00", end: "2:30", sec: [120, 150], frames: frames(4) },
          { id: "c5", start: "2:30", end: "3:10", sec: [150, 190], frames: frames(5) }
        ],
        sent: ["c0", "c1"],
        tree: { id: "root", label: "root · c0–c5", score: 0.2367, children: [
          { id: "c0-c2", label: "c0–c2", score: 0.2738, children: [
            { id: "c0-c1", label: "c0–c1", score: 0.3297, children: [
              { id: "c0", label: "c0", score: 0.2973 },
              { id: "c1", label: "c1", score: 0.2761 } ] },
            { id: "c2", label: "c2", score: 0.2138 } ] },
          { id: "c3-c5", label: "c3–c5", score: 0.1876, children: [
            { id: "c3-c4", label: "c3–c4", score: 0.1754, children: [
              { id: "c3", label: "c3", score: 0.1261 },
              { id: "c4", label: "c4", score: 0.2007 } ] },
            { id: "c5", label: "c5", score: 0.1963 } ] } ] }
      }]
    },

    table: {
      badge: "OTT-QA · table + text",
      question: "Who was featured on the cover of the Elysia Rotaru title that is noted for recording movements of one or more actors that are sample many times per second?",
      gold: "Tom Brady",
      tokens: { whole: 397, canopy: 187, delta: "−53%" },
      items: [{
        title: "Elysia Rotaru · Filmography, Video games", kind: "table",
        summary: "CANOPY kept 6 of 11 rows; the gold row is among them",
        columns: ["Year", "Title", "Role", "Notes"],
        units: [
          { id: "r0", cells: ["2017", "Mass Effect: Andromeda", "Various", "Performance Capture Actor"] },
          { id: "r1", cells: ["2017", "Lone Echo", "Hera", "Voice acting"] },
          { id: "r2", gold: true, cells: ["2017", "Madden NFL 18: Longshot", "Various", "Motion capture actor"] },
          { id: "r3", cells: ["2017", "FIFA 18", "Beatriz Villanova", "Voice acting"] },
          { id: "r4", cells: ["2017", "Puzzle Fighter", "Additional Voices", ""] },
          { id: "r5", cells: ["2017", "Need for Speed Payback", "Additional Voices", ""] },
          { id: "r6", cells: ["2018", "Dragalia Lost", "Corsaint Phoenix / Kristy", "Voice acting"] },
          { id: "r7", cells: ["2018", "FIFA 19", "Beatriz Villanova", "Voice acting"] },
          { id: "r8", cells: ["2019", "Crackdown 3", "Additional Voices", ""] },
          { id: "r9", cells: ["2019", "Anthem", "Princess Zhim", "Voice acting"] },
          { id: "r10", cells: ["2019", "FIFA 20", "Beatriz Villanova", "Voice acting"] }
        ],
        sent: ["r0", "r1", "r2", "r3", "r4", "r5"],
        tree: { id: "root", label: "root · r0–r10", score: 0.0762, children: [
          { id: "r0-r5", label: "r0–r5", score: 0.1366, children: [
            { id: "r0-r2", label: "r0–r2", score: 0.1239, children: [
              { id: "r0-r1", label: "r0–r1", score: 0.1263, children: [
                { id: "r0", label: "r0", score: 0.1487 },
                { id: "r1", label: "r1", score: 0.1812 } ] },
              { id: "r2", label: "r2", score: 0.1584 } ] },
            { id: "r3-r5", label: "r3–r5", score: 0.1326, children: [
              { id: "r3-r4", label: "r3–r4", score: 0.1226, children: [
                { id: "r3", label: "r3", score: 0.1245 },
                { id: "r4", label: "r4", score: 0.1599 } ] },
              { id: "r5", label: "r5", score: 0.1509 } ] } ] },
          { id: "r6-r10", label: "r6–r10", score: 0.0572, children: [
            { id: "r6-r8", label: "r6–r8", score: 0.1059, children: [
              { id: "r6-r7", label: "r6–r7", score: 0.1232, children: [
                { id: "r6", label: "r6", score: 0.1423 },
                { id: "r7", label: "r7", score: 0.1402 } ] },
              { id: "r8", label: "r8", score: 0.1372 } ] },
            { id: "r9-r10", label: "r9–r10", score: 0.0373, children: [
              { id: "r9", label: "r9", score: 0.0484 },
              { id: "r10", label: "r10", score: 0.1216 } ] } ] } ] }
      }, {
        title: "Madden NFL 18", kind: "text",
        summary: "CANOPY kept 1 of 5 sentences; the gold sentence is among them",
        units: [
          { id: "s0", text: "Madden NFL 18 is an American football sports video game based on the National Football League, developed and published by EA Sports for PlayStation 4 and Xbox One." },
          { id: "s1", gold: true, text: "The 29th installment of the Madden NFL series, the game features New England Patriots quarterback Tom Brady on the cover, the second straight year a Patriots player has had the distinction, following tight end Rob Gronkowski." },
          { id: "s2", text: "It was released worldwide on August 25, 2017, while those who pre-ordered the G.O.A.T." },
          { id: "s3", text: "Edition were able to play it three days earlier and access their copy on August 22, 2017." },
          { id: "s4", text: "It is the first game of the series since Madden NFL 2005 not to be released on both PlayStation 3 and Xbox 360, and also the first game in the main series to be available on only two platforms since Madden NFL '94." }
        ],
        sent: ["s1"],
        tree: { id: "root", label: "root · s0–s4", score: 0.0733, children: [
          { id: "s0-s2", label: "s0–s2", score: 0.1401, children: [
            { id: "s0-s1", label: "s0–s1", score: 0.1521, children: [
              { id: "s0", label: "s0", score: 0.1377 },
              { id: "s1", label: "s1", score: 0.1635 } ] },
            { id: "s2", label: "s2", score: 0.0618 } ] },
          { id: "s3-s4", label: "s3–s4", score: 0.0135, children: [
            { id: "s3", label: "s3", score: 0.0890 },
            { id: "s4", label: "s4", score: 0.0112 } ] } ] }
      }]
    }
  };

  /* ---------- helpers ---------- */
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else if (k === "text") el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return el;
  }
  function unitsUnder(node) {
    if (!node.children) return [node.id];
    return node.children.reduce(function (a, c) { return a.concat(unitsUnder(c)); }, []);
  }
  function fmt(x) { return x.toFixed(4); }

  /* ---------- steps of the strict rule, item by item ---------- */
  function buildSteps(item, itemIndex) {
    var steps = [];
    function visit(node) {
      if (!node.children) { steps.push({ t: "leaf", item: itemIndex, node: node }); return; }
      steps.push({ t: "focus", item: itemIndex, node: node });
      var winners = [];
      node.children.forEach(function (c) {
        var keep = c.score >= node.score;
        steps.push({ t: "decide", item: itemIndex, node: c, parent: node, keep: keep });
        if (keep) winners.push(c);
      });
      if (!winners.length) { steps.push({ t: "stop", item: itemIndex, node: node }); return; }
      winners.forEach(visit);
    }
    visit(item.tree);
    steps.push({ t: "send", item: itemIndex });
    return steps;
  }

  /* ---------- rendering ---------- */
  var root, state, COL = 66, PILL_W = 56, PILL_H = 24;

  function renderCase(key) {
    var c = CASES[key];
    root.innerHTML = "";
    state = { key: key, steps: [], i: 0, timer: null, items: c.items, trees: [] };
    c.items.forEach(function (it, k) { state.steps = state.steps.concat(buildSteps(it, k)); });

    root.appendChild(h("div", { class: "case-q" }, [
      h("span", { class: "case-badge", text: c.badge }),
      h("p", { class: "case-question", text: c.question }),
      c.options ? h("ul", { class: "case-options" }, c.options.map(function (o) { return h("li", { text: o }); })) : null,
      h("p", { class: "case-gold" }, [h("span", { class: "k", text: "Gold answer " }), h("b", { text: c.gold })])
    ]));
    root.appendChild(h("p", { class: "tokens" }, [
      h("span", { class: "k", text: "Reader-input evidence " }),
      h("b", { text: c.tokens.whole.toLocaleString("en-US") + " tokens" }), " for the items whole \u2192 ",
      h("b", { class: "ours", text: c.tokens.canopy.toLocaleString("en-US") + " tokens" }), " after CANOPY ",
      h("span", { class: "delta", text: "(" + c.tokens.delta + ")" }),
      c.tokens.note ? h("span", { class: "k", text: " \u00b7 " + c.tokens.note }) : null
    ]));

    var controls = h("div", { class: "replay-controls" }, [
      h("button", { class: "button small", type: "button", "data-act": "play", text: "Replay refinement" }),
      h("button", { class: "button small ghost", type: "button", "data-act": "step", text: "Step" }),
      h("button", { class: "button small ghost", type: "button", "data-act": "end", text: "Skip to result" }),
      h("span", { class: "replay-status", "data-role": "status", html: "Press <b>Replay</b> to walk the tree top-down, or use <kbd>&rarr;</kbd> to step." })
    ]);
    root.appendChild(controls);
    root.appendChild(h("p", { class: "case-legend", html: '<span class="lg q">child &ge; parent: explore</span><span class="lg x">child &lt; parent: drop</span><span class="lg kept">kept</span><span class="lg cut">cut</span><span class="lg gold">gold annotation</span>' }));
    c.items.forEach(function (it, k) { root.appendChild(itemBlock(it, k)); });

    controls.addEventListener("click", function (e) {
      var act = e.target.getAttribute("data-act"); if (!act) return;
      if (act === "play") { reset(); play(); }
      if (act === "step") { stopTimer(); if (state.i >= state.steps.length) reset(); step(); }
      if (act === "end") { stopTimer(); while (state.i < state.steps.length) stepOnce(); }
    });
    layoutAll();
    applyFinal();
  }

  function depthOf(node) { return node.children ? 1 + Math.max.apply(null, node.children.map(depthOf)) : 0; }

  function itemBlock(it, k) {
    var rows;
    if (it.kind === "text") {
      rows = h("div", { class: "ev-rows" }, it.units.map(function (u) {
        return h("div", { class: "u trow" + (u.gold ? " gold" : ""), "data-unit": k + ":" + u.id }, [h("sup", { class: "uid", text: u.id }), " " + u.text]);
      }));
    } else if (it.kind === "video") {
      var yt = CASES[state.key].youtube;
      rows = h("div", { class: "ev-rows" }, it.units.map(function (u, idx) {
        var row = h("div", { class: "u vrow" + (u.gold ? " gold" : ""), "data-unit": k + ":" + u.id, title: yt ? "Play this clip" : "" }, [
          h("div", { class: "clip-strip" }, u.frames.map(function (src) { return h("img", { src: src, alt: "frame from " + u.start + "–" + u.end, loading: "lazy" }); })),
          h("div", { class: "clip-cap", html: '<sup class="uid">' + u.id + "</sup> " + u.start + "&ndash;" + u.end + (u.gold ? " · gold" : "") + (yt ? ' <span class="play">&#9654;</span>' : "") })
        ]);
        if (yt) row.addEventListener("click", function () { seek(yt, idx, u); });
        return row;
      }));
    } else {
      var thead = h("thead", null, [h("tr", null, [h("th", { text: "" })].concat(it.columns.map(function (cn) { return h("th", { text: cn }); })))]);
      var tbody = h("tbody", null, it.units.map(function (u) {
        return h("tr", { class: "u" + (u.gold ? " gold" : ""), "data-unit": k + ":" + u.id },
          [h("td", { class: "uid-cell", html: '<sup class="uid">' + u.id + "</sup>" })].concat(u.cells.map(function (cell) { return h("td", { text: cell, title: cell }); })));
      }));
      // short columns (a year, a code) get the width of their longest cell; the other columns share the rest equally
      var colgroup = h("colgroup", null, [h("col", { style: "width:26px" })].concat(it.columns.map(function (cn, c) {
        var len = Math.max.apply(null, [cn.length].concat(it.units.map(function (u) { return (u.cells[c] || "").length; })));
        return len <= 8 ? h("col", { style: "width:calc(" + len + "ch + 14px)" }) : h("col", null);
      })));
      rows = h("div", { class: "ev-rows table-rows" }, [h("table", { class: "case-table compact" }, [colgroup, thead, tbody])]);
    }

    var depth = depthOf(it.tree);
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "dtree");
    svg.setAttribute("width", (depth + 1) * COL);
    buildTreeSvg(svg, it.tree, k, null);
    state.trees.push({ item: it, k: k, svg: svg, depth: depth });

    var grid = h("div", { class: "ev-grid" }, [
      h("div", { class: "tree-col", style: "width:" + ((depth + 1) * COL) + "px" }, [svg]),
      h("div", { class: "ev-col" }, [rows])
    ]);
    var block = h("div", { class: "ev-item" }, [
      h("div", { class: "ev-head", html: "<b>[" + (k + 1) + "] " + escapeHtml(it.title) + "</b> <span class='kind'>" + it.kind + "</span> · " + escapeHtml(it.summary) }),
      grid
    ]);
    if (it.kind === "video" && CASES[state.key].youtube) block.appendChild(playerBlock(it, CASES[state.key].youtube));
    return block;
  }

  function playerBlock(it, yt) {
    var sentIdx = it.units.map(function (u, i) { return it.sent.indexOf(u.id) >= 0 ? i : -1; }).filter(function (i) { return i >= 0; });
    var s0 = yt.offset + it.units[sentIdx[0]].sec[0], s1 = yt.offset + it.units[sentIdx[sentIdx.length - 1]].sec[1];
    return h("div", { class: "yt" }, [
      h("div", { class: "yt-frame" }, [h("iframe", { src: embedUrl(yt.id, s0, s1, false), title: yt.title, allow: "accelerometer; autoplay; encrypted-media; picture-in-picture", allowfullscreen: "", loading: "lazy", referrerpolicy: "strict-origin-when-cross-origin" })]),
      h("p", { class: "yt-cap", "data-role": "ytcap", html: "The item is minutes " + clock(yt.offset) + "&ndash;" + clock(yt.offset + yt.length) + " of the original video; the player is set to the span CANOPY sent to the reader (" + clock(s0) + "&ndash;" + clock(s1) + "). Click a clip to play just that clip." })
    ]);
  }

  // one <g data-node> per tree node: an edge from its parent, a pill, two lines of text
  function buildTreeSvg(svg, node, k, parent) {
    var NS = "http://www.w3.org/2000/svg";
    var g = document.createElementNS(NS, "g");
    g.setAttribute("data-node", k + ":" + node.id);
    g.setAttribute("class", "node" + (node.children ? "" : " leaf"));
    if (parent) { var e = document.createElementNS(NS, "path"); e.setAttribute("class", "edge"); g.appendChild(e); }
    var pill = document.createElementNS(NS, "rect");
    pill.setAttribute("class", "pill"); pill.setAttribute("rx", 6); pill.setAttribute("width", PILL_W); pill.setAttribute("height", PILL_H);
    var t1 = document.createElementNS(NS, "text"); t1.setAttribute("class", "nlabel"); t1.textContent = node.label.replace("root · ", "");
    var t2 = document.createElementNS(NS, "text"); t2.setAttribute("class", "score"); t2.textContent = fmt(node.score);
    var tip = document.createElementNS(NS, "title"); tip.setAttribute("class", "ndec"); tip.textContent = node.label + " · " + fmt(node.score);
    g.appendChild(pill); g.appendChild(t1); g.appendChild(t2); g.appendChild(tip);
    svg.appendChild(g);
    (node.children || []).forEach(function (c) { buildTreeSvg(svg, c, k, node); });
  }

  // place every node: leaves at the centre of their evidence row, parents at the mean of their children
  function layoutAll() {
    state.trees.forEach(function (t) {
      var grid = t.svg.closest(".ev-grid");
      var top = grid.getBoundingClientRect().top;
      var pos = {};
      function place(node, depth) {
        var y;
        if (node.children) { y = node.children.map(function (c) { return place(c, depth + 1); }).reduce(function (a, b) { return a + b; }, 0) / node.children.length; }
        else {
          var row = root.querySelector('[data-unit="' + t.k + ":" + node.id + '"]');
          var r = row.getBoundingClientRect(); y = r.top - top + r.height / 2;
        }
        pos[node.id] = { x: depth * COL + COL / 2, y: y };
        return y;
      }
      place(t.item.tree, 0);
      var hgt = grid.getBoundingClientRect().height;
      t.svg.setAttribute("height", Math.ceil(hgt));
      t.svg.setAttribute("viewBox", "0 0 " + ((t.depth + 1) * COL) + " " + Math.ceil(hgt));
      function draw(node, parent) {
        var g = t.svg.querySelector('[data-node="' + t.k + ":" + node.id + '"]');
        var p = pos[node.id];
        g.querySelector(".pill").setAttribute("x", p.x - PILL_W / 2); g.querySelector(".pill").setAttribute("y", p.y - PILL_H / 2);
        g.querySelector(".nlabel").setAttribute("x", p.x); g.querySelector(".nlabel").setAttribute("y", p.y - 2);
        g.querySelector(".score").setAttribute("x", p.x); g.querySelector(".score").setAttribute("y", p.y + 8.5);
        if (parent) {
          var q = pos[parent.id], x0 = q.x + PILL_W / 2, x1 = p.x - PILL_W / 2, xm = (x0 + x1) / 2;
          g.querySelector(".edge").setAttribute("d", "M" + x0 + "," + q.y + " H" + xm + " V" + p.y + " H" + x1);
        }
        (node.children || []).forEach(function (c) { draw(c, node); });
      }
      draw(t.item.tree, null);
    });
  }

  function escapeHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function clock(sec) { var m = Math.floor(sec / 60), s = sec % 60; return m + ":" + (s < 10 ? "0" : "") + s; }
  function embedUrl(id, start, end, autoplay) {
    return "https://www.youtube-nocookie.com/embed/" + id + "?start=" + start + "&end=" + end + "&rel=0&modestbranding=1" + (autoplay ? "&autoplay=1" : "");
  }
  function seek(yt, idx, u) {
    var start = yt.offset + u.sec[0], end = yt.offset + u.sec[1];
    var fr = root.querySelector(".yt-frame iframe"); if (!fr) return;
    fr.src = embedUrl(yt.id, start, end, true);
    var cap = root.querySelector('[data-role="ytcap"]');
    if (cap) cap.innerHTML = "Playing clip <b>" + u.id + "</b>: " + u.start + "&ndash;" + u.end + " of the item, " + clock(start) + "&ndash;" + clock(end) + " in the original video.";
    root.querySelector(".yt").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------- replay state ---------- */
  function q(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
  function unitEls(k, ids) { return ids.map(function (id) { return root.querySelector('[data-unit="' + k + ":" + id + '"]'); }).filter(Boolean); }
  function nodeEl(k, id) { return root.querySelector('[data-node="' + k + ":" + id + '"]'); }
  function setStatus(s) { var el = root.querySelector('[data-role="status"]'); if (el) el.innerHTML = s; }
  function addCls(el) { for (var i = 1; i < arguments.length; i++) el.classList.add(arguments[i]); }
  function rmCls(el) { for (var i = 1; i < arguments.length; i++) el.classList.remove(arguments[i]); }
  function setTip(el, s) { var t = el.querySelector(".ndec"); if (t) t.textContent = s; }

  function reset() {
    stopTimer(); state.i = 0;
    q(".u").forEach(function (el) { rmCls(el, "kept", "cut", "focus"); addCls(el, "pending"); });
    q("[data-node]").forEach(function (el) { rmCls(el, "current", "q", "x", "dim", "stop", "leafkept"); });
    setStatus("Walking the tree from the root.");
  }

  function applyFinal() {
    stopTimer(); state.i = state.steps.length;
    state.items.forEach(function (it, k) {
      it.units.forEach(function (u) {
        var el = root.querySelector('[data-unit="' + k + ":" + u.id + '"]');
        rmCls(el, "pending", "focus");
        el.classList.toggle("kept", it.sent.indexOf(u.id) >= 0);
        el.classList.toggle("cut", it.sent.indexOf(u.id) < 0);
      });
      markTree(it.tree, k, null, false);
    });
    setStatus("Result: what the reader received. Press <b>Replay</b> to see how the tree was walked.");
  }

  function markTree(node, k, parent, dimmed) {
    var el = nodeEl(k, node.id);
    var drop = parent ? node.score < parent.score : false;
    if (parent) { addCls(el, drop ? "x" : "q"); setTip(el, node.label + " · " + fmt(node.score) + (drop ? " · below its parent" : " · at least its parent")); }
    if (dimmed) addCls(el, "dim");
    if (node.children) {
      var any = node.children.some(function (c) { return c.score >= node.score; });
      if (!any && !dimmed && !drop) { addCls(el, "stop"); setTip(el, node.label + " · " + fmt(node.score) + " · kept whole"); }
      node.children.forEach(function (c) { markTree(c, k, node, dimmed || drop); });
    } else if (!dimmed && !drop) { addCls(el, "leafkept"); setTip(el, node.label + " · " + fmt(node.score) + " · kept"); }
  }

  function play() { state.timer = setInterval(function () { if (!step()) stopTimer(); }, 700); }
  function stopTimer() { if (state.timer) { clearInterval(state.timer); state.timer = null; } }

  function step() { return stepOnce(); }

  function stepOnce() {
    if (state.i >= state.steps.length) return false;
    var s = state.steps[state.i++], k = s.item;
    q("[data-node].current").forEach(function (el) { el.classList.remove("current"); });
    q(".u.focus").forEach(function (el) { el.classList.remove("focus"); });
    if (s.t === "focus") {
      addCls(nodeEl(k, s.node.id), "current");
      unitEls(k, unitsUnder(s.node)).forEach(function (el) { el.classList.add("focus"); });
      setStatus("At <b>" + s.node.label + "</b> (" + fmt(s.node.score) + "): comparing each child with it.");
    } else if (s.t === "decide") {
      var el = nodeEl(k, s.node.id);
      addCls(el, s.keep ? "q" : "x", "current");
      if (s.keep) {
        setTip(el, s.node.label + " · " + fmt(s.node.score) + " · at least its parent");
        setStatus("<b>" + s.node.label + "</b> " + fmt(s.node.score) + " ≥ " + fmt(s.parent.score) + ": explore it.");
      } else {
        setTip(el, s.node.label + " · " + fmt(s.node.score) + " · below its parent");
        unitEls(k, unitsUnder(s.node)).forEach(function (u) { rmCls(u, "pending", "focus"); addCls(u, "cut"); });
        dimSubtree(s.node, k);
        setStatus("<b>" + s.node.label + "</b> " + fmt(s.node.score) + " &lt; " + fmt(s.parent.score) + ": drop it.");
      }
    } else if (s.t === "stop") {
      var el2 = nodeEl(k, s.node.id); addCls(el2, "stop", "current"); setTip(el2, s.node.label + " · " + fmt(s.node.score) + " · kept whole");
      unitEls(k, unitsUnder(s.node)).forEach(function (u) { rmCls(u, "pending", "focus"); addCls(u, "kept"); });
      setStatus("No child of <b>" + s.node.label + "</b> stands out: keep it whole.");
    } else if (s.t === "leaf") {
      var el3 = nodeEl(k, s.node.id); addCls(el3, "leafkept", "current"); setTip(el3, s.node.label + " · " + fmt(s.node.score) + " · kept");
      unitEls(k, [s.node.id]).forEach(function (u) { rmCls(u, "pending", "focus"); addCls(u, "kept"); });
      setStatus("<b>" + s.node.label + "</b> is a leaf: keep it.");
    } else if (s.t === "send") {
      var it = state.items[k];
      it.units.forEach(function (u) {
        var el4 = root.querySelector('[data-unit="' + k + ":" + u.id + '"]');
        var send = it.sent.indexOf(u.id) >= 0;
        rmCls(el4, "pending", "focus");
        el4.classList.toggle("kept", send);
        el4.classList.toggle("cut", !send);
      });
      setStatus("Sent to the reader: the kept regions.");
    }
    return true;
  }

  function dimSubtree(node, k) {
    (node.children || []).forEach(function (c) { var el = nodeEl(k, c.id); if (el) el.classList.add("dim"); dimSubtree(c, k); });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    root = document.getElementById("case-root");
    if (!root) return;
    var tabs = document.querySelectorAll(".case-tab");
    Array.prototype.forEach.call(tabs, function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(tabs, function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        renderCase(b.getAttribute("data-case"));
      });
    });
    renderCase("text");
    // small hook for scripted recordings of the demo (not used by the page itself)
    root.canopyReplay = { reset: reset, step: step, play: play, stop: stopTimer, steps: function () { return state.steps.length; } };
    var relayout = function () { if (state) layoutAll(); };
    window.addEventListener("resize", relayout);
    window.addEventListener("load", relayout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
    document.addEventListener("keydown", function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      var sec = document.getElementById("cases"), r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === "ArrowRight") { e.preventDefault(); stopTimer(); if (state.i >= state.steps.length) reset(); step(); }
      else if (e.key === "r" || e.key === "R") { e.preventDefault(); reset(); play(); }
    });
  });
})();
