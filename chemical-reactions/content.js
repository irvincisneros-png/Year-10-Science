/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

/* ============================================================
   SECTION 6.1  -  Law of Conservation of Mass
   ============================================================ */

function ConservationSim() {
  var _useState = useState("closed"),
    _useState2 = _slicedToArray(_useState, 2),
    system = _useState2[0],
    setSystem = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    reacted = _useState4[0],
    setReacted = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    animating = _useState6[0],
    setAnimating = _useState6[1];
  var reactantMass = 28.4;
  var gasMass = 4.4;
  var productMass = reacted ? system === "closed" ? reactantMass : reactantMass - gasMass : null;
  function doReaction() {
    if (animating) return;
    setAnimating(true);
    setTimeout(function () {
      setReacted(true);
      setAnimating(false);
    }, 900);
  }
  function reset() {
    setReacted(false);
    setAnimating(false);
  }
  var bubbleStyle = function bubbleStyle(on) {
    return {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: on ? "var(--accent)" : "#ccc",
      display: "inline-block",
      margin: "0 3px",
      transition: "background 0.4s"
    };
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Open vs closed system",
    subtitle: "See how system type affects the measured mass after a gas-producing reaction.",
    takeaway: "In a closed system every atom stays inside, so mass is always conserved; in an open system gases can escape and the measured mass appears to drop even though mass is still conserved overall."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "closed",
      label: "Closed system"
    }, {
      value: "open",
      label: "Open system"
    }],
    value: system,
    onChange: function onChange(v) {
      setSystem(v);
      reset();
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      flexWrap: "wrap",
      justifyContent: "center",
      margin: "16px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      minWidth: 140,
      textAlign: "center",
      padding: "16px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--ink-muted)",
      marginBottom: 8
    }
  }, "BEFORE REACTION"), /*#__PURE__*/React.createElement("svg", {
    width: "80",
    height: "80",
    viewBox: "0 0 80 80"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "20",
    width: "60",
    height: "50",
    rx: "6",
    fill: "var(--accent-soft)",
    stroke: "var(--accent-deep)",
    strokeWidth: "2"
  }), system === "closed" && /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "15",
    width: "44",
    height: "10",
    rx: "3",
    fill: "var(--accent-deep)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "25",
    cy: "55",
    r: "8",
    fill: "#7c3aed",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "45",
    cy: "50",
    r: "10",
    fill: "#a78bfa",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "62",
    cy: "57",
    r: "7",
    fill: "#7c3aed",
    opacity: "0.6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginTop: 8
    }
  }, reactantMass, " g"), /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: 12
    }
  }, "reactants")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      fontSize: 28,
      color: "var(--accent-deep)",
      fontWeight: 700
    }
  }, animating ? "..." : reacted ? "=" : ""), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      flex: 1,
      minWidth: 140,
      textAlign: "center",
      padding: "16px 12px",
      opacity: reacted ? 1 : 0.35
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--ink-muted)",
      marginBottom: 8
    }
  }, "AFTER REACTION"), /*#__PURE__*/React.createElement("svg", {
    width: "80",
    height: "80",
    viewBox: "0 0 80 80"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "20",
    width: "60",
    height: "50",
    rx: "6",
    fill: "var(--accent-soft)",
    stroke: "var(--accent-deep)",
    strokeWidth: "2"
  }), system === "closed" && /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "15",
    width: "44",
    height: "10",
    rx: "3",
    fill: "var(--accent-deep)"
  }), reacted && system === "open" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "5",
    r: "5",
    fill: "#a78bfa",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "65",
    cy: "2",
    r: "4",
    fill: "#7c3aed",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "30",
    y: "10",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, "CO\u2082 escapes")), reacted && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "30",
    cy: "52",
    r: "9",
    fill: "#4f46e5",
    opacity: "0.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "55",
    cy: "56",
    r: "8",
    fill: "#818cf8",
    opacity: "0.7"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginTop: 8
    }
  }, reacted ? "".concat(productMass.toFixed(1), " g") : "?"), /*#__PURE__*/React.createElement("div", {
    className: "muted",
    style: {
      fontSize: 12
    }
  }, reacted ? system === "closed" ? "mass conserved" : "".concat(gasMass, " g CO\u2082 escaped") : "products"))), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      justifyContent: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: doReaction,
    disabled: reacted || animating
  }, "React!"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: reset
  }, "Reset")), reacted && system === "open" && /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Apparent mass loss"
  }, "The measured mass dropped by ", gasMass, " g because CO\u2082 escaped. Mass is still conserved overall; you just cannot see the gas."), reacted && system === "closed" && /*#__PURE__*/React.createElement(Callout, {
    kind: "success",
    title: "Mass conserved!"
  }, "Every atom stayed inside. The total mass before and after is exactly the same."));
}

/* Header figure for 6.1: a level balance with the same atoms on each pan (2H2 + O2 -> 2H2O). */
function ConservationFigure() {
  var H = function H(x, y, k) {
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      cx: x,
      cy: y,
      r: "7",
      fill: "#f7f1e3",
      stroke: "#1b1a17",
      strokeWidth: "1.4"
    });
  };
  var O = function O(x, y, k) {
    return /*#__PURE__*/React.createElement("circle", {
      key: k,
      cx: x,
      cy: y,
      r: "11",
      fill: "#ef6b4b",
      stroke: "#1b1a17",
      strokeWidth: "1.4"
    });
  };
  var pan = function pan(cx) {
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: cx,
      y1: "62",
      x2: cx - 46,
      y2: "128",
      stroke: "var(--ink)",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: cx,
      y1: "62",
      x2: cx + 46,
      y2: "128",
      stroke: "var(--ink)",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M ".concat(cx - 54, " 128 Q ").concat(cx, " 164 ").concat(cx + 54, " 128 Z"),
      fill: "#f7f1e3",
      stroke: "var(--border-strong)",
      strokeWidth: "2"
    }));
  };
  return /*#__PURE__*/React.createElement(Figure, {
    caption: "Mass is conserved. 4 g of hydrogen and 32 g of oxygen (2H\u2082 + O\u2082) react to make 36 g of water (2H\u2082O). The same 4 H atoms and 2 O atoms are on each pan, just rearranged, so the balance stays level."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 236",
    width: "100%",
    style: {
      maxWidth: 420,
      display: "block",
      margin: "0 auto"
    },
    role: "img",
    "aria-label": "A level balance. Left pan: two hydrogen molecules and one oxygen molecule, 4 g plus 32 g equals 36 g. Right pan: two water molecules, 36 g. Both pans hold 4 hydrogen atoms and 2 oxygen atoms."
  }, /*#__PURE__*/React.createElement("rect", {
    x: "140",
    y: "204",
    width: "80",
    height: "10",
    rx: "3",
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "180",
    y1: "62",
    x2: "180",
    y2: "206",
    stroke: "var(--ink)",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 170 70 L 180 54 L 190 70 Z",
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "72",
    y1: "62",
    x2: "288",
    y2: "62",
    stroke: "var(--ink)",
    strokeWidth: "5",
    strokeLinecap: "round"
  }), pan(72), pan(288), H(38, 122, "a"), H(51, 122, "b"), H(38, 106, "c"), H(51, 106, "d"), O(78, 120, "e"), O(98, 120, "f"), [262, 310].map(function (x) {
    return /*#__PURE__*/React.createElement("g", {
      key: x
    }, H(x - 11, 108, "h1"), H(x + 11, 108, "h2"), O(x, 121, "o"));
  }), /*#__PURE__*/React.createElement("text", {
    x: "72",
    y: "182",
    textAnchor: "middle",
    fontSize: "15",
    fontWeight: "800",
    fill: "var(--ink)"
  }, "2H\u2082 + O\u2082"), /*#__PURE__*/React.createElement("text", {
    x: "72",
    y: "201",
    textAnchor: "middle",
    fontSize: "13",
    fill: "var(--ink)"
  }, "4 g + 32 g = 36 g"), /*#__PURE__*/React.createElement("text", {
    x: "288",
    y: "182",
    textAnchor: "middle",
    fontSize: "15",
    fontWeight: "800",
    fill: "var(--ink)"
  }, "2H\u2082O"), /*#__PURE__*/React.createElement("text", {
    x: "288",
    y: "201",
    textAnchor: "middle",
    fontSize: "13",
    fill: "var(--ink)"
  }, "36 g"), /*#__PURE__*/React.createElement("text", {
    x: "72",
    y: "40",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink-muted)"
  }, "Reactants"), /*#__PURE__*/React.createElement("text", {
    x: "288",
    y: "40",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink-muted)"
  }, "Products"), /*#__PURE__*/React.createElement("circle", {
    cx: "140",
    cy: "18",
    r: "6",
    fill: "#f7f1e3",
    stroke: "#1b1a17",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "22",
    fontSize: "12",
    fill: "var(--ink)"
  }, "H"), /*#__PURE__*/React.createElement("circle", {
    cx: "182",
    cy: "18",
    r: "8",
    fill: "#ef6b4b",
    stroke: "#1b1a17",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "194",
    y: "22",
    fontSize: "12",
    fill: "var(--ink)"
  }, "O")));
}

/* Header figure for 6.4: neutron-induced fission of U-235 (mass and atomic numbers balance:
   1 + 235 = 141 + 92 + 3; 92 = 56 + 36). */
function FissionFigure() {
  var nuc = function nuc(cx, cy, r, fill, label) {
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: r,
      fill: fill,
      stroke: "#1b1a17",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + 5,
      textAnchor: "middle",
      fontSize: r > 30 ? 15 : 13,
      fontWeight: "800",
      fill: "#1b1a17"
    }, label));
  };
  var n = function n(cx, cy) {
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "9",
      fill: "#c9c2b4",
      stroke: "#1b1a17",
      strokeWidth: "1.6"
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + 4,
      textAnchor: "middle",
      fontSize: "11",
      fontWeight: "700",
      fill: "#1b1a17"
    }, "n"));
  };
  var arrow = function arrow(d) {
    return /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "2",
      markerEnd: "url(#fis-arrow)"
    });
  };
  return /*#__PURE__*/React.createElement(Figure, {
    caption: "Nuclear fission. A neutron is absorbed by a uranium-235 nucleus, which splits into two smaller nuclei (for example barium-141 and krypton-92), releasing a large amount of energy and three more neutrons that can trigger further fissions."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 224",
    width: "100%",
    style: {
      maxWidth: 460,
      display: "block",
      margin: "0 auto"
    },
    role: "img",
    "aria-label": "A neutron hits a uranium-235 nucleus. The nucleus splits into barium-141 and krypton-92, releasing energy and 3 neutrons. Equation: n plus U-235 gives Ba-141 plus Kr-92 plus 3 n plus energy."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "fis-arrow",
    viewBox: "0 0 10 10",
    refX: "8",
    refY: "5",
    markerWidth: "6",
    markerHeight: "6",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 0 L 10 5 L 0 10 Z",
    fill: "var(--ink)"
  }))), n(24, 100), /*#__PURE__*/React.createElement("text", {
    x: "4",
    y: "128",
    fontSize: "12",
    fill: "var(--ink)"
  }, "neutron"), arrow("M 36 100 L 66 100"), nuc(108, 100, 38, "#d99e1e", "U-235"), /*#__PURE__*/React.createElement("path", {
    d: "M 178 80 L 184 93 L 198 90 L 189 101 L 198 112 L 184 109 L 178 122 L 172 109 L 158 112 L 167 101 L 158 90 L 172 93 Z",
    fill: "#f6c945",
    stroke: "#1b1a17",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "178",
    y: "142",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "energy"), arrow("M 190 88 L 224 66"), arrow("M 190 114 L 226 136"), nuc(252, 52, 28, "#ef6b4b", "Ba-141"), nuc(252, 152, 24, "#4b7bc9", "Kr-92"), arrow("M 198 98 Q 290 92 316 58"), arrow("M 200 101 L 318 101"), arrow("M 198 104 Q 290 110 316 146"), n(330, 50), n(332, 101), n(330, 154), /*#__PURE__*/React.createElement("text", {
    x: "352",
    y: "180",
    textAnchor: "end",
    fontSize: "12",
    fill: "var(--ink)"
  }, "3 neutrons"), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "214",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "n + U-235 \u2192 Ba-141 + Kr-92 + 3 n + energy")));
}
function Section61(_ref) {
  var progress = _ref.progress,
    setProgress = _ref.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.1 Law of conservation of mass"), /*#__PURE__*/React.createElement("h1", null, "Nothing is created, nothing is lost"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "In every chemical reaction, the total mass of the substances you start with equals the total mass of the substances you end up with.")), /*#__PURE__*/React.createElement(ConservationFigure, null), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.1.1",
    title: "Explain the meaning of the law of conservation of mass",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "Mass cannot be created or destroyed in a chemical reaction. Total mass of reactants equals total mass of products."
  }, "law of conservation of mass"), " states that mass cannot be created or destroyed during a ", /*#__PURE__*/React.createElement(Term, {
    def: "A process in which substances called reactants are changed into new substances called products."
  }, "chemical reaction"), ". This means the total mass of the ", /*#__PURE__*/React.createElement(Term, {
    def: "Substances that are present at the start of a reaction and are used up."
  }, "reactants"), " always equals the total mass of the ", /*#__PURE__*/React.createElement(Term, {
    def: "New substances formed during a chemical reaction."
  }, "products"), "."), /*#__PURE__*/React.createElement("p", null, "The law was first stated by the French chemist ", /*#__PURE__*/React.createElement(Term, {
    def: "French chemist (1743 to 1794) who first formulated the law of conservation of mass through careful experiments."
  }, "Antoine Lavoisier"), " in 1789. It is one of the most important foundations of chemistry."), /*#__PURE__*/React.createElement("p", null, "During a reaction, atoms are rearranged into new combinations. No atoms are created or destroyed, so the total count of atoms stays the same and mass stays the same. For example, when hydrogen burns in oxygen to form water: 2H\u2082 + O\u2082 \u2192 2H\u2082O. Four hydrogen atoms and two oxygen atoms appear on both sides."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Key law"
  }, "Total mass of reactants = total mass of products. This applies to every chemical reaction, including combustion, neutralisation, and decomposition."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "24 g of magnesium reacts with 16 g of oxygen. What mass of magnesium oxide is produced?",
    options: ["16 g", "24 g", "40 g", "8 g"],
    correct: 2,
    explain: "Conservation of mass: 24 + 16 = 40 g of product."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "Explain, using the idea of atoms, why mass is conserved in a chemical reaction.",
    model: "During a chemical reaction atoms are rearranged into new combinations, but no atoms are created or destroyed. Because every atom present before the reaction is still present afterwards, and atoms have mass, the total mass stays the same."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.1.2",
    title: "Conduct a practical investigation to demonstrate the law of conservation of mass",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "To confirm the law, you measure the total mass of reactants ", /*#__PURE__*/React.createElement("em", null, "before"), " a reaction and compare it to the total mass of products ", /*#__PURE__*/React.createElement("em", null, "after"), ". If the measurement matches within experimental error, the law is supported."), /*#__PURE__*/React.createElement("p", null, "The best reactions to use are those that do not involve a gas escaping, such as ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction that forms an insoluble solid (precipitate) when two solutions are mixed."
  }, "precipitation reactions"), " or ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction between an acid and a base to form a salt and water."
  }, "neutralisation reactions"), ". If a gas is produced, the reaction must be done in a ", /*#__PURE__*/React.createElement(Term, {
    def: "A container from which no matter can enter or leave."
  }, "sealed container"), " so no mass is lost to the surroundings."), /*#__PURE__*/React.createElement("p", null, "A classic example mixes lead(II) nitrate solution with potassium iodide solution inside a sealed flask. A bright yellow precipitate of lead(II) iodide forms instantly. When you weigh the sealed flask before and after, the mass does not change at all."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Practical tip"
  }, "Always weigh the entire closed system, including the lid and any gas space. A single gram of escaping CO\u2082 will make the results look wrong."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "Why is it important to seal the flask when conducting a conservation-of-mass investigation involving a gas-producing reaction?",
    options: ["To speed up the reaction", "To prevent gases escaping so no mass is lost from the system", "To make the reaction safer", "To increase the temperature"],
    correct: 1,
    explain: "If gas escapes, the measured mass after the reaction is less than before, making it look like mass was lost even though it was not."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.1.3",
    title: "Investigate and explain how mass is conserved in closed systems",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A system in which no matter can enter or leave. Energy may still be exchanged."
  }, "closed system"), " is one where no matter can cross the boundary. In a closed system, every atom produced in the reaction stays inside, so the total mass is always conserved, even if gases are formed."), /*#__PURE__*/React.createElement("p", null, "In an ", /*#__PURE__*/React.createElement(Term, {
    def: "A system that can exchange both matter and energy with the surroundings."
  }, "open system"), ", gases such as CO\u2082 or water vapour can escape, making it look as though mass has been lost. Alternatively, if a substance absorbs oxygen from the air (like burning magnesium), the mass appears to increase. Both are only apparent changes. If you account for all the substances involved, including those that entered or left, mass is still conserved."), /*#__PURE__*/React.createElement(ConservationSim, null), /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "Open vs closed systems: matter escaping causes apparent mass changes."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 520 120",
    width: "100%",
    style: {
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "30",
    width: "200",
    height: "80",
    rx: "8",
    fill: "var(--accent-soft)",
    stroke: "var(--accent-deep)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "22",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Open system"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "75",
    textAnchor: "middle",
    fontSize: "12",
    fill: "#1b1a17"
  }, "CO\u2082 escapes"), /*#__PURE__*/React.createElement("text", {
    x: "110",
    y: "95",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--accent-deep)"
  }, "apparent mass loss"), /*#__PURE__*/React.createElement("path", {
    d: "M180,40 Q220,10 250,5",
    stroke: "var(--accent-deep)",
    strokeWidth: "2",
    fill: "none",
    strokeDasharray: "4 3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "255",
    cy: "4",
    r: "5",
    fill: "var(--accent-deep)",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "310",
    y: "30",
    width: "200",
    height: "80",
    rx: "8",
    fill: "var(--accent-soft)",
    stroke: "var(--accent-deep)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "318",
    y: "24",
    width: "184",
    height: "10",
    rx: "3",
    fill: "var(--accent-deep)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "410",
    y: "22",
    textAnchor: "middle",
    fontSize: "13",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Closed system"), /*#__PURE__*/React.createElement("text", {
    x: "410",
    y: "70",
    textAnchor: "middle",
    fontSize: "12",
    fill: "#1b1a17"
  }, "All gases trapped"), /*#__PURE__*/React.createElement("text", {
    x: "410",
    y: "90",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--accent-deep)"
  }, "mass unchanged"))), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Real-world example"
  }, "When iron rusts inside a sealed bag of air, the mass of the bag stays exactly the same. The iron gains mass but the oxygen in the air inside the bag loses the same amount of mass. Closed system, no change overall."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "A student burns a candle in an open container and records a decrease in mass. Does this disprove the law of conservation of mass? Explain.",
    model: "No. The mass appears to decrease because CO2 and water vapour are released into the air. If all the gas products were captured and weighed, the total mass would equal the original mass of the candle and oxygen used. Mass is still conserved when you account for all substances."
  }))));
}

/* ============================================================
   SECTION 6.2  -  Chemical Reactions
   ============================================================ */

function EquationBalancer() {
  var equations = [{
    label: "Water formation",
    reactants: [{
      formula: "H₂",
      coeff: 2,
      atoms: {
        H: 2,
        O: 0
      }
    }, {
      formula: "O₂",
      coeff: 1,
      atoms: {
        H: 0,
        O: 2
      }
    }],
    products: [{
      formula: "H₂O",
      coeff: 2,
      atoms: {
        H: 2,
        O: 1
      }
    }],
    correct: [[2, 1], [2]],
    hint: "You need 2 H₂ and 1 O₂ to make 2 H₂O."
  }, {
    label: "Magnesium combustion",
    reactants: [{
      formula: "Mg",
      coeff: 2,
      atoms: {
        Mg: 1,
        O: 0
      }
    }, {
      formula: "O₂",
      coeff: 1,
      atoms: {
        Mg: 0,
        O: 2
      }
    }],
    products: [{
      formula: "MgO",
      coeff: 2,
      atoms: {
        Mg: 1,
        O: 1
      }
    }],
    correct: [[2, 1], [2]],
    hint: "Each MgO needs 1 Mg and 1 O. You get 2 O from O₂, so make 2 MgO."
  }, {
    label: "Hydrogen peroxide decomposition",
    reactants: [{
      formula: "H₂O₂",
      coeff: 2,
      atoms: {
        H: 2,
        O: 2
      }
    }],
    products: [{
      formula: "H₂O",
      coeff: 2,
      atoms: {
        H: 2,
        O: 1
      }
    }, {
      formula: "O₂",
      coeff: 1,
      atoms: {
        H: 0,
        O: 2
      }
    }],
    correct: [[2], [2, 1]],
    hint: "2 H₂O₂ gives 4 H and 4 O. That is 2 H₂O (4H, 2O) plus 1 O₂ (2O)."
  }];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    eqIdx = _useState8[0],
    setEqIdx = _useState8[1];
  var eq = equations[eqIdx];
  var _useState9 = useState([1, 1, 1, 1]),
    _useState0 = _slicedToArray(_useState9, 2),
    rCoeffs = _useState0[0],
    setRCoeffs = _useState0[1];
  var _useState1 = useState([1, 1, 1, 1]),
    _useState10 = _slicedToArray(_useState1, 2),
    pCoeffs = _useState10[0],
    setPCoeffs = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    checked = _useState12[0],
    setChecked = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    correct = _useState14[0],
    setCorrect = _useState14[1];
  useEffect(function () {
    setRCoeffs([1, 1, 1, 1]);
    setPCoeffs([1, 1, 1, 1]);
    setChecked(false);
    setCorrect(false);
  }, [eqIdx]);
  function countAtoms(species, coeffs) {
    var totals = {};
    species.forEach(function (s, i) {
      var c = coeffs[i] || 1;
      Object.entries(s.atoms).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          el = _ref3[0],
          n = _ref3[1];
        totals[el] = (totals[el] || 0) + c * n;
      });
    });
    return totals;
  }
  function check() {
    var rTotals = countAtoms(eq.reactants, rCoeffs);
    var pTotals = countAtoms(eq.products, pCoeffs);
    var elements = new Set([].concat(_toConsumableArray(Object.keys(rTotals)), _toConsumableArray(Object.keys(pTotals))));
    var ok = true;
    elements.forEach(function (el) {
      if ((rTotals[el] || 0) !== (pTotals[el] || 0)) ok = false;
    });
    setCorrect(ok);
    setChecked(true);
  }
  var rTotals = countAtoms(eq.reactants, rCoeffs);
  var pTotals = countAtoms(eq.products, pCoeffs);
  var elements = _toConsumableArray(new Set([].concat(_toConsumableArray(Object.keys(rTotals)), _toConsumableArray(Object.keys(pTotals))).filter(function (e) {
    return rTotals[e] || pTotals[e];
  })));
  function CoeffInput(_ref4) {
    var val = _ref4.val,
      _onChange = _ref4.onChange;
    return /*#__PURE__*/React.createElement("select", {
      value: val,
      onChange: function onChange(e) {
        return _onChange(Number(e.target.value));
      },
      style: {
        width: 44,
        fontSize: 15,
        fontWeight: 700,
        textAlign: "center",
        borderRadius: 6,
        border: "2px solid var(--accent-deep)",
        padding: "2px 4px",
        background: "var(--surface)",
        color: "var(--ink)"
      }
    }, [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
      return /*#__PURE__*/React.createElement("option", {
        key: n,
        value: n
      }, n);
    }));
  }
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Equation balancer",
    subtitle: "Set the coefficients so the atom counts match on both sides, then hit Check.",
    takeaway: "A balanced equation has the same number of each type of atom on both sides because atoms are rearranged, not created or destroyed, during a chemical reaction."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      justifyContent: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: equations.map(function (e, i) {
      return {
        value: i,
        label: e.label
      };
    }),
    value: eqIdx,
    onChange: function onChange(v) {
      return setEqIdx(Number(v));
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 8,
      fontSize: 15,
      marginBottom: 16
    }
  }, eq.reactants.map(function (s, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "var(--ink)"
      }
    }, "+"), /*#__PURE__*/React.createElement(CoeffInput, {
      val: rCoeffs[i] || 1,
      onChange: function onChange(v) {
        var c = _toConsumableArray(rCoeffs);
        c[i] = v;
        setRCoeffs(c);
        setChecked(false);
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, s.formula));
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 20,
      color: "var(--ink)",
      margin: "0 8px"
    }
  }, "\u2192"), eq.products.map(function (s, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "var(--ink)"
      }
    }, "+"), /*#__PURE__*/React.createElement(CoeffInput, {
      val: pCoeffs[i] || 1,
      onChange: function onChange(v) {
        var c = _toConsumableArray(pCoeffs);
        c[i] = v;
        setPCoeffs(c);
        setChecked(false);
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, s.formula));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      minWidth: 260,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Element"), /*#__PURE__*/React.createElement("th", null, "Reactants"), /*#__PURE__*/React.createElement("th", null, "Products"), /*#__PURE__*/React.createElement("th", null, "Balanced?"))), /*#__PURE__*/React.createElement("tbody", null, elements.filter(function (el) {
    return (rTotals[el] || 0) > 0 || (pTotals[el] || 0) > 0;
  }).map(function (el) {
    var r = rTotals[el] || 0;
    var p = pTotals[el] || 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: el
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, el)), /*#__PURE__*/React.createElement("td", null, r), /*#__PURE__*/React.createElement("td", null, p), /*#__PURE__*/React.createElement("td", {
      style: {
        color: r === p ? "#16a34a" : "#ef4444",
        fontWeight: 700
      }
    }, r === p ? "Yes" : "No"));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: check
  }, "Check"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: function onClick() {
      setRCoeffs([1, 1, 1, 1]);
      setPCoeffs([1, 1, 1, 1]);
      setChecked(false);
      setCorrect(false);
    }
  }, "Reset")), checked && /*#__PURE__*/React.createElement(Callout, {
    kind: correct ? "success" : "warn",
    title: correct ? "Correctly balanced!" : "Not balanced yet"
  }, correct ? "Great work! Atoms balance on both sides." : "Hint: ".concat(eq.hint)));
}
function ReactionTypeClassifier() {
  var reactions = [{
    eq: "2Mg + O₂ → 2MgO",
    type: "synthesis",
    clue: "Two reactants combine into one product."
  }, {
    eq: "CaCO₃ → CaO + CO₂",
    type: "decomposition",
    clue: "One compound splits into two simpler substances."
  }, {
    eq: "Zn + CuSO₄ → ZnSO₄ + Cu",
    type: "displacement",
    clue: "A more reactive metal pushes out a less reactive one."
  }, {
    eq: "HCl + NaOH → NaCl + H₂O",
    type: "neutralisation",
    clue: "Acid + base makes salt and water."
  }, {
    eq: "N₂ + 3H₂ → 2NH₃",
    type: "synthesis",
    clue: "Multiple reactants join into one product."
  }, {
    eq: "2H₂O₂ → 2H₂O + O₂",
    type: "decomposition",
    clue: "One substance breaks into two."
  }];
  var types = ["synthesis", "decomposition", "displacement", "neutralisation"];
  var _useState15 = useState(0),
    _useState16 = _slicedToArray(_useState15, 2),
    idx = _useState16[0],
    setIdx = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    chosen = _useState18[0],
    setChosen = _useState18[1];
  var _useState19 = useState(0),
    _useState20 = _slicedToArray(_useState19, 2),
    score = _useState20[0],
    setScore = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    done = _useState22[0],
    setDone = _useState22[1];
  function pick(t) {
    if (chosen !== null) return;
    setChosen(t);
    if (t === reactions[idx].type) setScore(function (s) {
      return s + 1;
    });
  }
  function next() {
    if (idx + 1 >= reactions.length) {
      setDone(true);
      return;
    }
    setIdx(function (i) {
      return i + 1;
    });
    setChosen(null);
  }
  function restart() {
    setIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  }
  var r = reactions[idx];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Reaction type classifier",
    subtitle: "Read the equation and tap the correct reaction type.",
    takeaway: "Each reaction type has a characteristic pattern: synthesis joins reactants into one product, decomposition splits one compound apart, displacement swaps a more reactive element in, and neutralisation produces a salt and water from an acid and a base."
  }, done ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 900,
      color: "var(--accent-deep)",
      marginBottom: 8
    }
  }, score, "/", reactions.length), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 16
    }
  }, score === reactions.length ? "Perfect! You know all four types." : "Good effort! Review the ones you missed."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: restart
  }, "Try again")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip accent",
    style: {
      marginBottom: 8,
      display: "inline-block"
    }
  }, "Equation ", idx + 1, " of ", reactions.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      fontFamily: "monospace",
      padding: "12px 16px",
      background: "var(--accent-soft)",
      color: "var(--accent-deep)",
      borderRadius: 10,
      marginBottom: 8
    }
  }, r.eq)), /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      gap: 10,
      marginBottom: 12
    }
  }, types.map(function (t) {
    var bg = "var(--surface)";
    var border = "2px solid var(--accent-deep)";
    if (chosen === t) {
      bg = t === r.type ? "#bbf7d0" : "#fecaca";
      border = "2px solid ".concat(t === r.type ? "#16a34a" : "#dc2626");
    } else if (chosen !== null && t === r.type) {
      bg = "#bbf7d0";
      border = "2px solid #16a34a";
    }
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: function onClick() {
        return pick(t);
      },
      style: {
        padding: "12px 8px",
        borderRadius: 10,
        border: border,
        background: bg,
        color: bg === "var(--surface)" ? "var(--ink)" : "#1b1a17",
        fontWeight: 700,
        fontSize: 14,
        cursor: chosen ? "default" : "pointer",
        textTransform: "capitalize"
      }
    }, t);
  })), chosen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    kind: chosen === r.type ? "success" : "warn",
    title: chosen === r.type ? "Correct!" : "Not quite. The answer is ".concat(r.type, ".")
  }, r.clue), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: next
  }, idx + 1 < reactions.length ? "Next" : "See score")))));
}
function Section62(_ref5) {
  var progress = _ref5.progress,
    setProgress = _ref5.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.2 Chemical reactions"), /*#__PURE__*/React.createElement("h1", null, "Representing, types and pH"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "From naming compounds to balancing equations and exploring the four main reaction types plus the pH scale.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.1",
    title: "Use IUPAC naming conventions for ionic and covalent compounds",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "International Union of Pure and Applied Chemistry. Sets universal naming rules for chemicals."
  }, "IUPAC"), " provides a standard set of rules for naming chemical substances, so scientists around the world can communicate clearly. You need to be able to name and write formulae for two main compound types."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "A compound formed between a metal and a non-metal, held together by electrostatic attraction between positive and negative ions."
  }, "Ionic compounds"), " are named by stating the metal (cation) first, then the non-metal (anion) with the ending changed to \"-ide\". For transition metals, a Roman numeral in brackets shows the charge: for example, FeCl\u2083 is iron(III) chloride. To write the formula, use the swap-and-drop rule: swap the values of the ion charges to become subscripts, then simplify."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "A compound formed between two or more non-metals, held together by shared pairs of electrons."
  }, "Covalent compounds"), " use Greek prefixes (mono-, di-, tri-, tetra-, penta-, hexa-) to show how many atoms of each element are present. The second element gets the \"-ide\" ending. For example, CO\u2082 is carbon dioxide and N\u2082O\u2084 is dinitrogen tetroxide."), /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "Common polyatomic ions you need to know."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 130",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, [["Hydroxide", "OH⁻", "1−"], ["Nitrate", "NO₃⁻", "1−"], ["Carbonate", "CO₃²⁻", "2−"], ["Sulfate", "SO₄²⁻", "2−"], ["Phosphate", "PO₄³⁻", "3−"], ["Ammonium", "NH₄⁺", "1+"]].map(function (_ref6, i) {
    var _ref7 = _slicedToArray(_ref6, 3),
      name = _ref7[0],
      formula = _ref7[1],
      charge = _ref7[2];
    return /*#__PURE__*/React.createElement("g", {
      key: name,
      transform: "translate(".concat(i % 3 * 186 + 4, ",").concat(Math.floor(i / 3) * 58 + 8, ")")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "178",
      height: "48",
      rx: "8",
      fill: "var(--accent-soft)",
      stroke: "var(--accent-deep)"
    }), /*#__PURE__*/React.createElement("text", {
      x: "89",
      y: "20",
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "700",
      fill: "#1b1a17"
    }, name), /*#__PURE__*/React.createElement("text", {
      x: "89",
      y: "38",
      textAnchor: "middle",
      fontSize: "13",
      fill: "var(--accent-deep)",
      fontWeight: "700"
    }, formula, " (", charge, ")"));
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Swap and drop example"
  }, "Aluminium (Al\xB3\u207A) + Oxide (O\xB2\u207B): swap the numbers to get Al\u2082O\u2083. Check: 2 x (+3) = +6 and 3 x (-2) = -6. Net charge = 0. Correct!"), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "What is the correct formula for calcium chloride?",
    options: ["CaCl", "CaCl₂", "Ca₂Cl", "Ca₂Cl₃"],
    correct: 1,
    explain: "Ca is 2+ and Cl is 1-, so swap and drop: Ca\u2081Cl\u2082, simplified to CaCl\u2082."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 6,
    question: "Explain the difference between how ionic and covalent compounds are named.",
    model: "Ionic compounds are named by stating the metal first then the non-metal with an -ide ending. Roman numerals are used for transition metals to show the charge. Covalent compounds use Greek prefixes (di-, tri-, etc.) to indicate the number of each atom and also add an -ide ending to the second element."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.2",
    title: "Represent chemical reactions with word and balanced symbol equations",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Chemical reactions can be written as ", /*#__PURE__*/React.createElement(Term, {
    def: "An equation that uses the names of substances: e.g. hydrogen + oxygen \u2192 water."
  }, "word equations"), " or ", /*#__PURE__*/React.createElement(Term, {
    def: "An equation that uses chemical formulae and coefficients: e.g. 2H\u2082 + O\u2082 \u2192 2H\u2082O."
  }, "balanced symbol equations"), ". A balanced equation shows the same number of each type of atom on both sides, which is required by the law of conservation of mass."), /*#__PURE__*/React.createElement("p", null, "State symbols in brackets show the physical state of each substance: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. To balance an equation, add ", /*#__PURE__*/React.createElement(Term, {
    def: "A number placed in front of a formula in an equation to show how many units of that substance are involved."
  }, "coefficients"), " in front of formulas. Never change subscripts, as that would create a different substance entirely."), /*#__PURE__*/React.createElement("p", null, "You can predict the products of a reaction by recognising its type: metal + oxygen gives a metal oxide; acid + metal gives a salt and hydrogen; acid + base gives a salt and water; acid + carbonate gives a salt, water, and carbon dioxide."), /*#__PURE__*/React.createElement(EquationBalancer, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Balancing rule"
  }, "Change coefficients only. Changing a subscript changes the substance. 2H\u2082O is two water molecules; H\u2084O is a completely different substance that does not exist under normal conditions."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "In the balanced equation 2H\u2082 + O\u2082 \u2192 2H\u2082O, how many hydrogen atoms are on each side?",
    options: ["2", "3", "4", "6"],
    correct: 2,
    explain: "Left side: 2 x 2 = 4 H atoms. Right side: 2 x 2 = 4 H atoms. Balanced."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.3",
    title: "Model simple chemical reactions to show atoms are rearranged and mass is conserved",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Models help you visualise what happens at the atomic level. When a reaction occurs, bonds between atoms in the reactants break, and new bonds form to make the products. The atoms themselves are never destroyed; they are just rearranged into different combinations."), /*#__PURE__*/React.createElement("p", null, "You can model reactions using coloured balls and sticks, drawings of circles labelled with element symbols, Lego bricks, or computer simulations. Whatever method you use, the key check is: every atom in the reactants must appear in the products, with none added or removed."), /*#__PURE__*/React.createElement(Figure, {
    num: "3",
    caption: "Water formation: 4 H atoms (cream) and 2 O atoms (red) appear on both sides, just rearranged."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 470 118",
    width: "100%",
    style: {
      maxWidth: 520
    },
    role: "img",
    "aria-label": "Particle model: two hydrogen molecules plus one oxygen molecule become two water molecules. Four hydrogen atoms and two oxygen atoms on each side."
  }, function () {
    var H = function H(x, y) {
      return /*#__PURE__*/React.createElement("circle", {
        cx: x,
        cy: y,
        r: "10",
        fill: "#f7f1e3",
        stroke: "#1b1a17",
        strokeWidth: "1.6"
      });
    };
    var O = function O(x, y) {
      return /*#__PURE__*/React.createElement("circle", {
        cx: x,
        cy: y,
        r: "15",
        fill: "#ef6b4b",
        stroke: "#1b1a17",
        strokeWidth: "1.6"
      });
    };
    var water = function water(x) {
      return /*#__PURE__*/React.createElement("g", {
        key: x
      }, H(x - 15, 34), H(x + 15, 34), O(x, 50));
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", null, H(26, 46), H(43, 46)), /*#__PURE__*/React.createElement("g", null, H(80, 46), H(97, 46)), /*#__PURE__*/React.createElement("text", {
      x: "62",
      y: "86",
      textAnchor: "middle",
      fontSize: "14",
      fontWeight: "700",
      fill: "var(--ink)"
    }, "2H\u2082"), /*#__PURE__*/React.createElement("text", {
      x: "128",
      y: "52",
      textAnchor: "middle",
      fontSize: "20",
      fontWeight: "700",
      fill: "var(--ink)"
    }, "+"), /*#__PURE__*/React.createElement("g", null, O(164, 46), O(190, 46)), /*#__PURE__*/React.createElement("text", {
      x: "177",
      y: "86",
      textAnchor: "middle",
      fontSize: "14",
      fontWeight: "700",
      fill: "var(--ink)"
    }, "O\u2082"), /*#__PURE__*/React.createElement("text", {
      x: "240",
      y: "53",
      textAnchor: "middle",
      fontSize: "22",
      fontWeight: "700",
      fill: "var(--ink)"
    }, "\u2192"), water(305), water(395), /*#__PURE__*/React.createElement("text", {
      x: "350",
      y: "86",
      textAnchor: "middle",
      fontSize: "14",
      fontWeight: "700",
      fill: "var(--ink)"
    }, "2H\u2082O"), /*#__PURE__*/React.createElement("text", {
      x: "110",
      y: "110",
      textAnchor: "middle",
      fontSize: "12",
      fill: "var(--ink-muted)"
    }, "4 H atoms, 2 O atoms"), /*#__PURE__*/React.createElement("text", {
      x: "350",
      y: "110",
      textAnchor: "middle",
      fontSize: "12",
      fill: "var(--ink-muted)"
    }, "4 H atoms, 2 O atoms"));
  }())), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Linking to conservation of mass"
  }, "Because every atom present at the start also appears at the end (just in different arrangements), the total mass cannot change. This directly demonstrates the law of conservation of mass."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "A student models 2H\u2082 + O\u2082 \u2192 2H\u2082O using coloured balls. After the reaction they have 5 red balls instead of 4. What has gone wrong?",
    options: ["They balanced the equation wrong", "They added an extra atom that should not be there", "They forgot to add state symbols", "They used the wrong colour"],
    correct: 1,
    explain: "In a model, every atom must come from the reactants. Adding an extra atom violates conservation of mass."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.4",
    title: "Determine the features of synthesis, decomposition, displacement and neutralisation reactions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "There are four key reaction types at Year 10. In a ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction in which two or more reactants combine to form a single product. General form: A + B \u2192 AB."
  }, "synthesis (combination) reaction"), ", two or more reactants join to form one product. These are often ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction that releases energy to the surroundings as heat."
  }, "exothermic"), "."), /*#__PURE__*/React.createElement("p", null, "In a ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction in which one compound breaks down into two or more simpler substances. General form: AB \u2192 A + B."
  }, "decomposition reaction"), ", one compound breaks apart into simpler substances, usually requiring energy input (heat, light, or electricity), making them typically ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction that absorbs energy from the surroundings."
  }, "endothermic"), "."), /*#__PURE__*/React.createElement("p", null, "In a ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction in which a more reactive element displaces a less reactive element from a compound. General form: A + BC \u2192 AC + B."
  }, "displacement reaction"), ", a more reactive element takes the place of a less reactive element in a compound. Predictions require the ", /*#__PURE__*/React.createElement(Term, {
    def: "A list of metals ordered from most to least reactive, used to predict which metal will displace another."
  }, "reactivity series"), " of metals."), /*#__PURE__*/React.createElement("p", null, "In a ", /*#__PURE__*/React.createElement(Term, {
    def: "A reaction between an acid and a base to produce a salt and water."
  }, "neutralisation reaction"), ", an acid and a base react to produce a salt and water. The pH shifts towards 7, and the reaction is often exothermic."), /*#__PURE__*/React.createElement(ReactionTypeClassifier, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Real-world examples"
  }, "The Haber process (synthesis) makes ammonia for fertiliser. Hydrogen peroxide in a wound decomposes (decomposition) with a fizz. Zinc in copper sulfate turns blue solution clear (displacement). Antacids neutralise stomach acid (neutralisation)."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 9,
    question: "Which of these is a decomposition reaction?",
    options: ["Zn + CuSO₄ → ZnSO₄ + Cu", "2H₂O₂ → 2H₂O + O₂", "HCl + NaOH → NaCl + H₂O", "N₂ + 3H₂ → 2NH₃"],
    correct: 1,
    explain: "One compound (H\u2082O\u2082) breaks into two simpler substances. That is the definition of decomposition."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 10,
    question: "Explain why you need to know the reactivity series to predict whether a displacement reaction will occur.",
    model: "A displacement reaction only happens when the incoming metal is more reactive than the metal already in the compound. Without the reactivity series, you cannot predict whether, for example, copper will displace zinc or vice versa. The more reactive metal will always displace the less reactive one."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.5",
    title: "Identify pH as the measure of acidity and compare pH of common substances to pure water",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "A scale from 0 to 14 that measures how acidic or alkaline a solution is, based on the concentration of H+ ions."
  }, "pH"), " is a scale used to measure the acidity or alkalinity of a solution. It is based on the concentration of ", /*#__PURE__*/React.createElement(Term, {
    def: "Positively charged hydrogen ions (H+) whose concentration determines whether a solution is acidic."
  }, "hydrogen ions (H\u207A)"), " in the solution. A pH below 7 is acidic, pH 7 is neutral (pure water), and pH above 7 is alkaline."), /*#__PURE__*/React.createElement("p", null, "The scale is logarithmic: each whole-number step represents a tenfold change in acidity. A solution at pH 3 is ten times more acidic than one at pH 4, and one hundred times more acidic than one at pH 5. This is why even small pH changes can have large real-world effects."), /*#__PURE__*/React.createElement("p", null, "pH can be measured with ", /*#__PURE__*/React.createElement(Term, {
    def: "A solution that changes colour across the pH range, giving an approximate reading."
  }, "universal indicator"), ", pH paper, or a digital pH meter for precise readings. Human blood must stay between 7.35 and 7.45 for normal body function, farm soil pH affects crop growth, and pool pH must be controlled to prevent irritation."), /*#__PURE__*/React.createElement(Figure, {
    num: "4",
    caption: "The pH scale with common substances."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 130",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "phGrad",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ef4444"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "25%",
    stopColor: "#f97316"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "42%",
    stopColor: "#eab308"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#22c55e"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "65%",
    stopColor: "#3b82f6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "85%",
    stopColor: "#8b5cf6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#6d28d9"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "30",
    width: "540",
    height: "24",
    rx: "6",
    fill: "url(#phGrad)"
  }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function (n) {
    return /*#__PURE__*/React.createElement("g", {
      key: n,
      transform: "translate(".concat(10 + n * 38.57, ",0)")
    }, /*#__PURE__*/React.createElement("line", {
      x1: "0",
      y1: "54",
      x2: "0",
      y2: "62",
      stroke: "var(--ink)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "0",
      y: "75",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, n));
  }), [{
    label: "Battery acid",
    ph: 0
  }, {
    label: "Lemon",
    ph: 2
  }, {
    label: "Vinegar",
    ph: 3
  }, {
    label: "Water",
    ph: 7
  }, {
    label: "Blood",
    ph: 7.4
  }, {
    label: "Soap",
    ph: 10
  }, {
    label: "Bleach",
    ph: 13
  }].map(function (_ref8) {
    var label = _ref8.label,
      ph = _ref8.ph;
    return /*#__PURE__*/React.createElement("g", {
      key: label,
      transform: "translate(".concat(10 + ph * 38.57, ",0)")
    }, /*#__PURE__*/React.createElement("line", {
      x1: "0",
      y1: "26",
      x2: "0",
      y2: "10",
      stroke: "var(--ink)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: label === "Water" ? -2 : label === "Blood" ? 2 : label === "Battery acid" ? -4 : 0,
      y: "8",
      textAnchor: label === "Water" ? "end" : label === "Blood" || label === "Battery acid" ? "start" : "middle",
      fontSize: "9",
      fill: "var(--ink)"
    }, label));
  }), /*#__PURE__*/React.createElement("text", {
    x: "10",
    y: "115",
    fontSize: "11",
    fill: "#ef4444",
    fontWeight: "700"
  }, "ACIDIC"), /*#__PURE__*/React.createElement("text", {
    x: "280",
    y: "115",
    fontSize: "11",
    fill: "#16a34a",
    fontWeight: "700",
    textAnchor: "middle"
  }, "NEUTRAL"), /*#__PURE__*/React.createElement("text", {
    x: "550",
    y: "115",
    fontSize: "11",
    fill: "#8b5cf6",
    fontWeight: "700",
    textAnchor: "end"
  }, "ALKALINE"))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 11,
    question: "A solution has a pH of 3. Another has a pH of 5. How many times more acidic is the first solution?",
    options: ["2 times", "10 times", "100 times", "1000 times"],
    correct: 2,
    explain: "The pH scale is logarithmic. A difference of 2 pH units means a 10 x 10 = 100-fold difference in H+ concentration."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.2.6",
    title: "Use pH indicators or meters to measure the pH change of neutralisation reactions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "When an acid and a base are mixed, a neutralisation reaction occurs: acid + base \u2192 salt + water. As base is added to acid, the ", /*#__PURE__*/React.createElement(Term, {
    def: "A graphical plot of pH against volume of base added during a titration; shows the equivalence point as a steep rise."
  }, "titration curve"), " rises slowly at first, then shoots up steeply at the ", /*#__PURE__*/React.createElement(Term, {
    def: "The point at which the exact amount of base has been added to completely neutralise the acid. pH = 7 for strong acid and strong base."
  }, "equivalence point"), ", then levels off in the alkaline region."), /*#__PURE__*/React.createElement("p", null, "Different ", /*#__PURE__*/React.createElement(Term, {
    def: "A substance that changes colour depending on the pH of the solution it is in."
  }, "indicators"), " change colour at different pH values: phenolphthalein is colourless in acid and pink in base; litmus is red in acid and blue in base; bromothymol blue is yellow in acid and blue in base. A pH meter gives a continuous digital reading, making it more precise than a colour indicator."), /*#__PURE__*/React.createElement("p", null, "Monitoring pH during neutralisation has many real-world applications: antacids neutralise excess stomach acid, lime (calcium hydroxide) is added to acidic soils to adjust pH for crops, and industrial wastewater is treated to reach a safe pH before release."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Titration curve shape"
  }, "The curve starts at low pH (acidic), rises gradually, then rises sharply at the equivalence point (pH = 7 for a strong acid + strong base), then levels off at high pH (alkaline)."), /*#__PURE__*/React.createElement(Figure, {
    num: "5",
    caption: "Titration curve: adding NaOH to HCl."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 200",
    width: "100%",
    style: {
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "170",
    x2: "330",
    y2: "170",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "10",
    x2: "40",
    y2: "170",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), [0, 2, 4, 6, 8, 10, 12, 14].map(function (n) {
    return /*#__PURE__*/React.createElement("g", {
      key: n
    }, /*#__PURE__*/React.createElement("line", {
      x1: "36",
      y1: 170 - n * 11.4,
      x2: "44",
      y2: 170 - n * 11.4,
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "32",
      y: 173 - n * 11.4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--ink)"
    }, n));
  }), [0, 5, 10, 15, 20, 25, 30].map(function (n) {
    return /*#__PURE__*/React.createElement("g", {
      key: n
    }, /*#__PURE__*/React.createElement("line", {
      x1: 40 + n * 9.67,
      y1: "170",
      x2: 40 + n * 9.67,
      y2: "176",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: 40 + n * 9.67,
      y: "186",
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--ink)"
    }, n));
  }), /*#__PURE__*/React.createElement("text", {
    x: "185",
    y: "198",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "Volume NaOH added (mL)"), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "90",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)",
    transform: "rotate(-90,14,90)"
  }, "pH"), /*#__PURE__*/React.createElement("path", {
    d: "M40,158 C80,155 110,152 130,148 C150,144 160,140 165,125 C167,115 168,100 168,90 C168,75 170,55 176,45 C184,36 200,33 250,30 C280,29 300,28 320,28",
    fill: "none",
    stroke: "var(--accent-deep)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "168",
    y1: "10",
    x2: "168",
    y2: "170",
    stroke: "#16a34a",
    strokeWidth: "1.5",
    strokeDasharray: "5 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "172",
    y: "22",
    fontSize: "10",
    fill: "#16a34a"
  }, "equiv. point"), /*#__PURE__*/React.createElement("circle", {
    cx: "168",
    cy: "90",
    r: "5",
    fill: "#16a34a"
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 12,
    question: "Describe how the pH changes when sodium hydroxide solution is slowly added to hydrochloric acid.",
    model: "The pH starts low (strongly acidic, around pH 1 to 2). As NaOH is added, the pH rises slowly at first. Near the equivalence point, the pH rises very steeply, passing through 7. If excess NaOH is added after the equivalence point, the pH continues to rise and levels off at a high value (around 12 to 13)."
  }))));
}

/* ============================================================
   SECTION 6.3  -  Rate of Chemical Reactions
   ============================================================ */

function CollisionRateSim() {
  var _useState23 = useState(50),
    _useState24 = _slicedToArray(_useState23, 2),
    temperature = _useState24[0],
    setTemperature = _useState24[1];
  var _useState25 = useState(5),
    _useState26 = _slicedToArray(_useState25, 2),
    concentration = _useState26[0],
    setConcentration = _useState26[1];
  var _useState27 = useState(1),
    _useState28 = _slicedToArray(_useState27, 2),
    surfaceArea = _useState28[0],
    setSurfaceArea = _useState28[1];
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    catalyst = _useState30[0],
    setCatalyst = _useState30[1];
  var particleCount = Math.round(concentration * 4);
  var speed = temperature / 100 * 3 + 0.5;
  var activationEnergy = catalyst ? 30 : 60;
  var successFraction = Math.min(1, temperature / activationEnergy);
  var effectiveSurfaceArea = surfaceArea;
  var relativeRate = (speed * successFraction * concentration * effectiveSurfaceArea * (catalyst ? 1.8 : 1)).toFixed(1);
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var stateRef = useRef({
    particles: []
  });
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width,
      H = canvas.height;

    // init particles
    var count = particleCount;
    var particles = Array.from({
      length: count
    }, function () {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * speed * 4,
        vy: (Math.random() - 0.5) * speed * 4,
        r: 8
      };
    });
    stateRef.current.particles = particles;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var ps = stateRef.current.particles;
      ps.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < p.r || p.x > W - p.r) p.vx *= -1;
        if (p.y < p.r || p.y > H - p.r) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#7c3aed";
        ctx.globalAlpha = 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [particleCount, speed]);
  var rateLabel = Number(relativeRate) < 3 ? "Slow" : Number(relativeRate) < 8 ? "Moderate" : Number(relativeRate) < 18 ? "Fast" : "Very fast";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Collision rate simulator",
    subtitle: "Adjust the factors and watch how the relative reaction rate changes.",
    takeaway: "Higher temperature, higher concentration, greater surface area, and adding a catalyst all increase the reaction rate by increasing the frequency or energy of successful collisions between particles."
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      gap: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Temperature",
    min: 20,
    max: 100,
    value: temperature,
    onChange: setTemperature,
    unit: " \xB0C"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Concentration",
    min: 1,
    max: 10,
    value: concentration,
    onChange: setConcentration,
    unit: "x"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Surface area",
    min: 1,
    max: 5,
    value: surfaceArea,
    onChange: setSurfaceArea,
    unit: "x"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Catalyst"), /*#__PURE__*/React.createElement("button", {
    className: "btn ".concat(catalyst ? "btn-accent" : "btn-ghost"),
    style: {
      minWidth: 70
    },
    onClick: function onClick() {
      return setCatalyst(function (c) {
        return !c;
      });
    }
  }, catalyst ? "On" : "Off"))), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 340,
    height: 120,
    style: {
      borderRadius: 10,
      background: "var(--accent-soft)",
      display: "block",
      margin: "0 auto 14px",
      width: "100%",
      maxWidth: 340,
      height: "auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: relativeRate,
    label: "Relative rate"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: rateLabel,
    label: "Description"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "".concat(activationEnergy, " kJ/mol"),
    label: "Activation energy"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0,
      fontSize: 13
    }
  }, "In many real reactions a 10 \xB0C rise roughly doubles the rate (this simple model does not show that exactly). A catalyst lowers the activation energy so more collisions succeed."));
}
function Section63(_ref9) {
  var progress = _ref9.progress,
    setProgress = _ref9.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.3 Rate of chemical reactions"), /*#__PURE__*/React.createElement("h1", null, "How fast does a reaction go?"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Concentration, surface area, temperature, and catalysts all change how quickly reactants become products.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/reaction-rate.png",
    caption: "Smaller particles mean more surface area and a faster reaction."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.3.1",
    title: "Investigate and explain how concentration, surface area, temperature and catalysts affect rate",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "A measure of how quickly reactants are converted into products in a chemical reaction."
  }, "rate of a chemical reaction"), " tells you how fast it goes. Explosions are very fast; rusting is very slow. ", /*#__PURE__*/React.createElement(Term, {
    def: "The theory that reactions occur when particles collide with sufficient energy and the correct orientation."
  }, "Collision theory"), " explains rate: a reaction only happens when particles collide with enough energy (the ", /*#__PURE__*/React.createElement(Term, {
    def: "The minimum amount of energy that colliding particles must have for a reaction to occur."
  }, "activation energy"), ") and with the correct orientation. Anything that increases the frequency or energy of successful collisions increases the rate."), /*#__PURE__*/React.createElement("p", null, "Higher ", /*#__PURE__*/React.createElement(Term, {
    def: "The amount of substance dissolved in a given volume of solution."
  }, "concentration"), " means more particles per unit volume, so collisions happen more often. Larger ", /*#__PURE__*/React.createElement(Term, {
    def: "The total area of a solid that is exposed and available for collisions with other particles."
  }, "surface area"), " exposes more particles to collisions; powders react faster than lumps because there are far more particle sites available."), /*#__PURE__*/React.createElement("p", null, "Higher temperature makes particles move faster, causing both more frequent collisions and more energetic ones, so more collisions exceed the activation energy. As a rule of thumb, every 10 \xB0C rise roughly doubles the rate for many reactions. A ", /*#__PURE__*/React.createElement(Term, {
    def: "A substance that speeds up a reaction without being consumed in the process. It lowers the activation energy."
  }, "catalyst"), " lowers the activation energy needed, so a higher proportion of collisions are successful, speeding up the reaction without being used up itself."), /*#__PURE__*/React.createElement(CollisionRateSim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Measuring rate"
  }, "Common methods include measuring the volume of gas produced over time, measuring the loss of mass over time (if a gas escapes), and measuring the time for a precipitate to obscure a cross drawn on paper."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Powdered marble reacts faster with acid than marble chips. Which factor explains this?",
    options: ["Temperature", "Concentration", "Surface area", "Catalyst"],
    correct: 2,
    explain: "Smaller particles have a much greater surface area exposed to the acid, so more collisions happen per second."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 14,
    question: "Using collision theory, explain why a catalyst speeds up a reaction without being used up.",
    model: "A catalyst provides an alternative reaction pathway with a lower activation energy. This means a greater proportion of collisions have enough energy to result in a reaction, so products form faster. Because the catalyst is not permanently changed or consumed in the process, it can catalyse many reactions repeatedly."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.3.2",
    title: "Conduct a practical investigation, graph data and write a scientific report",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A good investigation is built around a testable ", /*#__PURE__*/React.createElement(Term, {
    def: "A prediction written in 'if...then...' format that states what you expect to happen and why."
  }, "hypothesis"), " with a clear cause-and-effect relationship. For example: \"If the temperature of the acid is increased, then the rate of reaction between magnesium and acid will increase because higher temperature means more energetic collisions.\""), /*#__PURE__*/React.createElement("p", null, "Every investigation has one ", /*#__PURE__*/React.createElement(Term, {
    def: "The factor that the experimenter deliberately changes."
  }, "independent variable"), " (what you change), one ", /*#__PURE__*/React.createElement(Term, {
    def: "The factor that is measured to show the effect of the independent variable."
  }, "dependent variable"), " (what you measure), and several ", /*#__PURE__*/React.createElement(Term, {
    def: "All other variables that are kept the same to ensure a fair test."
  }, "controlled variables"), " (everything else kept the same). This makes the investigation a fair test."), /*#__PURE__*/React.createElement("p", null, "Your results should be recorded in a table and then plotted as a graph with labelled axes, units, and a line of best fit. A written report follows the structure: title, aim, hypothesis, variables, materials, method, results, discussion, and conclusion. The conclusion must state whether the hypothesis was supported or rejected."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Scientific report structure"
  }, "Title - Aim - Hypothesis - Variables - Materials - Method - Results (table + graph) - Discussion - Conclusion."), /*#__PURE__*/React.createElement(Figure, {
    num: "6",
    caption: "Sample graph: mass loss vs time for marble chips in the same volume of acid at two concentrations. The acid is the limiting reactant, so the more concentrated acid reacts faster and also produces more CO\u2082 in total."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 200",
    width: "100%",
    style: {
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "170",
    x2: "330",
    y2: "170",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "10",
    x2: "50",
    y2: "170",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), [0, 0.5, 1, 1.5, 2].map(function (v, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: "46",
      y1: 170 - i * 40,
      x2: "54",
      y2: 170 - i * 40,
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "42",
      y: 173 - i * 40,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--ink)"
    }, v));
  }), [0, 1, 2, 3, 4, 5].map(function (v, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: 50 + i * 56,
      y1: "170",
      x2: 50 + i * 56,
      y2: "176",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: 50 + i * 56,
      y: "186",
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--ink)"
    }, v));
  }), /*#__PURE__*/React.createElement("text", {
    x: "190",
    y: "198",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "Time (min)"), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "90",
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)",
    transform: "rotate(-90,14,90)"
  }, "Mass loss (g)"), /*#__PURE__*/React.createElement("path", {
    d: "M50,170 C90,140 130,115 160,105 C190,95 230,90 330,88",
    fill: "none",
    stroke: "var(--accent-deep)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "335",
    y: "86",
    fontSize: "10",
    fill: "var(--ink)"
  }, "conc."), /*#__PURE__*/React.createElement("path", {
    d: "M50,170 C90,155 140,140 180,130 C220,120 270,115 330,112",
    fill: "none",
    stroke: "#7a8699",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "335",
    y: "112",
    fontSize: "10",
    fill: "#7a8699"
  }, "dilute"))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 15,
    question: "In a rate experiment, a student changes the temperature and measures the time for the reaction to finish. What is the independent variable?",
    options: ["Time", "Temperature", "Mass of reactant", "Volume of gas"],
    correct: 1,
    explain: "The independent variable is the factor you deliberately change. Here that is temperature."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "Write a hypothesis in 'if...then...' format for an investigation into how surface area affects the rate of CO2 production from marble chips in acid.",
    model: "If the surface area of the marble chips is increased (by using smaller chips or powder), then the rate of CO2 production will increase because more marble particles are exposed to the acid, leading to more frequent collisions per second."
  }))));
}

/* ============================================================
   SECTION 6.4  -  Nuclear Reactions
   ============================================================ */

function HalfLifeSim() {
  var _useState31 = useState(0),
    _useState32 = _slicedToArray(_useState31, 2),
    isotope = _useState32[0],
    setIsotope = _useState32[1];
  var _useState33 = useState(0),
    _useState34 = _slicedToArray(_useState33, 2),
    elapsed = _useState34[0],
    setElapsed = _useState34[1];
  var isotopes = [{
    name: "Iodine-131",
    halfLife: 8,
    unit: "days",
    initial: 1000
  }, {
    name: "Carbon-14",
    halfLife: 5730,
    unit: "years",
    initial: 1000
  }, {
    name: "Cobalt-60",
    halfLife: 5.27,
    unit: "years",
    initial: 1000
  }];
  var iso = isotopes[isotope];
  var maxElapsed = iso.halfLife * 5;
  var step = iso.halfLife / 2;
  var remaining = iso.initial * Math.pow(0.5, elapsed / iso.halfLife);
  var percentLeft = (remaining / iso.initial * 100).toFixed(1);
  var points = [];
  for (var t = 0; t <= maxElapsed; t += iso.halfLife / 20) {
    points.push({
      t: t,
      n: iso.initial * Math.pow(0.5, t / iso.halfLife)
    });
  }
  var W = 300,
    H = 160;
  var padL = 45,
    padB = 30,
    padT = 10,
    padR = 15;
  var xScale = function xScale(t) {
    return padL + t / maxElapsed * (W - padL - padR);
  };
  var yScale = function yScale(n) {
    return padT + H - padB - n / iso.initial * (H - padT - padB);
  };
  var pathD = points.map(function (p, i) {
    return "".concat(i === 0 ? "M" : "L").concat(xScale(p.t).toFixed(1), ",").concat(yScale(p.n).toFixed(1));
  }).join(" ");
  var currentX = xScale(elapsed);
  var currentY = yScale(remaining);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Half-life simulator",
    subtitle: "Pick an isotope and move the time slider to see radioactive decay in action.",
    takeaway: "Each half-life halves the number of radioactive atoms remaining, so the decay curve is exponential and the fraction of atoms left can be calculated by repeatedly halving for each half-life elapsed."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: isotopes.map(function (iso, i) {
      return {
        value: i,
        label: iso.name
      };
    }),
    value: isotope,
    onChange: function onChange(v) {
      setIsotope(Number(v));
      setElapsed(0);
    }
  })), /*#__PURE__*/React.createElement(Slider, {
    label: "Time (".concat(iso.unit, ")"),
    min: 0,
    max: maxElapsed,
    step: step,
    value: elapsed,
    onChange: setElapsed,
    unit: " ".concat(iso.unit)
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    style: {
      maxWidth: W,
      display: "block",
      margin: "12px auto"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT,
    x2: padL,
    y2: H - padB + padT,
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: H - padB + padT,
    x2: W - padR,
    y2: H - padB + padT,
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: H + 2,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, "Time (", iso.unit, ")"), /*#__PURE__*/React.createElement("text", {
    x: "10",
    y: H / 2,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)",
    transform: "rotate(-90,10,".concat(H / 2, ")")
  }, "Atoms remaining"), /*#__PURE__*/React.createElement("path", {
    d: pathD,
    fill: "none",
    stroke: "var(--accent-deep)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: currentX,
    y1: padT,
    x2: currentX,
    y2: H - padB + padT,
    stroke: "#16a34a",
    strokeWidth: "1.5",
    strokeDasharray: "4 3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: currentX,
    cy: currentY,
    r: "6",
    fill: "#16a34a"
  }), /*#__PURE__*/React.createElement("text", {
    x: currentX + 8,
    y: currentY - 4,
    fontSize: "10",
    fill: "#16a34a"
  }, Math.round(remaining)), [0, 0.25, 0.5, 0.75, 1].map(function (f) {
    return /*#__PURE__*/React.createElement("g", {
      key: f
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: yScale(iso.initial * f),
      x2: padL - 4,
      y2: yScale(iso.initial * f),
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 6,
      y: yScale(iso.initial * f) + 4,
      textAnchor: "end",
      fontSize: "9",
      fill: "var(--ink)"
    }, Math.round(iso.initial * f)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: Math.round(remaining),
    label: "Atoms remaining"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "".concat(percentLeft, "%"),
    label: "Fraction left"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: (elapsed / iso.halfLife).toFixed(1),
    label: "Half-lives elapsed"
  })));
}
function NuclearEquationChecker() {
  var problems = [{
    desc: "Alpha decay of Uranium-238",
    parent: {
      symbol: "U",
      A: 238,
      Z: 92
    },
    particle: {
      symbol: "α",
      A: 4,
      Z: 2
    },
    type: "alpha",
    daughter: {
      symbol: "Th",
      A: 234,
      Z: 90
    }
  }, {
    desc: "Beta decay of Carbon-14",
    parent: {
      symbol: "C",
      A: 14,
      Z: 6
    },
    particle: {
      symbol: "β",
      A: 0,
      Z: -1
    },
    type: "beta",
    daughter: {
      symbol: "N",
      A: 14,
      Z: 7
    }
  }, {
    desc: "Alpha decay of Radium-226",
    parent: {
      symbol: "Ra",
      A: 226,
      Z: 88
    },
    particle: {
      symbol: "α",
      A: 4,
      Z: 2
    },
    type: "alpha",
    daughter: {
      symbol: "Rn",
      A: 222,
      Z: 86
    }
  }];
  var _useState35 = useState(0),
    _useState36 = _slicedToArray(_useState35, 2),
    idx = _useState36[0],
    setIdx = _useState36[1];
  var p = problems[idx];
  var _useState37 = useState(""),
    _useState38 = _slicedToArray(_useState37, 2),
    dA = _useState38[0],
    setDA = _useState38[1];
  var _useState39 = useState(""),
    _useState40 = _slicedToArray(_useState39, 2),
    dZ = _useState40[0],
    setDZ = _useState40[1];
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    checked = _useState42[0],
    setChecked = _useState42[1];
  function check() {
    setChecked(true);
  }
  function next() {
    setIdx(function (i) {
      return (i + 1) % problems.length;
    });
    setDA("");
    setDZ("");
    setChecked(false);
  }
  var correctA = p.parent.A - p.particle.A;
  var correctZ = p.parent.Z - p.particle.Z;
  var aOk = Number(dA) === correctA;
  var zOk = Number(dZ) === correctZ;
  var allOk = aOk && zOk;
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Nuclear equation checker",
    subtitle: "Work out the mass number and atomic number of the daughter nucleus.",
    takeaway: "In nuclear equations, the mass numbers and atomic numbers must balance on both sides, and each decay type changes the daughter nucleus in a predictable way."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      justifyContent: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip accent"
  }, p.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      flexWrap: "wrap",
      fontSize: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("sup", null, p.parent.A), /*#__PURE__*/React.createElement("sub", null, p.parent.Z), p.parent.symbol), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--ink)",
      fontSize: 22
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("input", {
    value: dA,
    onChange: function onChange(e) {
      setDA(e.target.value);
      setChecked(false);
    },
    style: {
      width: 44,
      textAlign: "center",
      fontWeight: 700,
      borderRadius: 6,
      border: "2px solid var(--accent-deep)",
      padding: "2px 4px",
      background: checked ? aOk ? "#bbf7d0" : "#fecaca" : "var(--surface)",
      color: checked ? "#1b1a17" : "var(--ink)"
    },
    placeholder: "A"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    value: dZ,
    onChange: function onChange(e) {
      setDZ(e.target.value);
      setChecked(false);
    },
    style: {
      width: 44,
      textAlign: "center",
      fontWeight: 700,
      borderRadius: 6,
      border: "2px solid var(--accent-deep)",
      padding: "2px 4px",
      background: checked ? zOk ? "#bbf7d0" : "#fecaca" : "var(--surface)",
      color: checked ? "#1b1a17" : "var(--ink)",
      marginTop: 2
    },
    placeholder: "Z"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 4
    }
  }, p.daughter.symbol))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--ink)"
    }
  }, "+"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("sup", null, p.particle.A), /*#__PURE__*/React.createElement("sub", null, p.particle.Z), p.particle.symbol)), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: check
  }, "Check"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: next
  }, "Next equation")), checked && /*#__PURE__*/React.createElement(Callout, {
    kind: allOk ? "success" : "warn",
    title: allOk ? "Correct!" : "Not quite."
  }, allOk ? "Well done. Mass number = ".concat(correctA, ", atomic number = ").concat(correctZ, ".") : "Hint: A must balance (".concat(p.parent.A, " = ? + ").concat(p.particle.A, ") and Z must balance (").concat(p.parent.Z, " = ? + ").concat(p.particle.Z, ").")));
}
function Section64(_ref0) {
  var progress = _ref0.progress,
    setProgress = _ref0.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.4 Nuclear reactions"), /*#__PURE__*/React.createElement("h1", null, "Inside the nucleus"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "From the Big Bang to radioactive decay, half-lives, fission, and fusion, the nucleus is where some of the universe's most powerful reactions take place.")), /*#__PURE__*/React.createElement(FissionFigure, null), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.1",
    title: "Outline how the first elements were formed after the Big Bang",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The leading scientific theory that the universe began about 13.8 billion years ago from an extremely hot, dense point that rapidly expanded."
  }, "Big Bang theory"), " proposes that around 13.8 billion years ago, all matter and energy were concentrated in one unimaginably hot, dense point. As the universe expanded and cooled, matter began to take shape."), /*#__PURE__*/React.createElement("p", null, "Within the first second, quarks combined to form protons and neutrons. About 3 to 20 minutes after the Big Bang, ", /*#__PURE__*/React.createElement(Term, {
    def: "The production of atomic nuclei from protons and neutrons in the first minutes after the Big Bang."
  }, "Big Bang nucleosynthesis"), " produced the lightest nuclei: approximately 75% hydrogen (H) and 25% helium (He), plus tiny traces of lithium and beryllium."), /*#__PURE__*/React.createElement("p", null, "After about 380,000 years, the universe cooled enough for electrons to combine with nuclei to form neutral atoms. All elements heavier than lithium were formed much later inside stars through ", /*#__PURE__*/React.createElement(Term, {
    def: "The nuclear fusion reactions inside stars that produce heavier elements from lighter ones."
  }, "stellar nucleosynthesis"), ". Stars fuse hydrogen into helium, then helium into carbon and oxygen up to iron. Most elements heavier than iron are produced in the explosions of massive stars called ", /*#__PURE__*/React.createElement(Term, {
    def: "An explosive end-of-life event for a massive star that produces and disperses heavy elements throughout the universe."
  }, "supernovae"), " (and in collisions between neutron stars). The carbon, oxygen, and iron in your body were all made inside ancient stars."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "We are made of stardust"
  }, "Every atom of carbon in your body was forged inside a star that lived and died long before our solar system was born. The iron in your blood was made in a supernova explosion."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "Which two elements were produced in the greatest amounts during Big Bang nucleosynthesis?",
    options: ["Carbon and oxygen", "Hydrogen and helium", "Hydrogen and lithium", "Helium and iron"],
    correct: 1,
    explain: "Big Bang nucleosynthesis produced roughly 75% hydrogen and 25% helium. Heavier elements formed much later inside stars."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.2",
    title: "Describe the conditions that cause a nucleus to be unstable",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The nucleus is held together by the ", /*#__PURE__*/React.createElement(Term, {
    def: "A very short-range force that binds protons and neutrons together in the nucleus, overcoming the repulsion between protons."
  }, "strong nuclear force"), ", which acts between nucleons (protons and neutrons). At the same time, protons repel each other because they share the same positive charge. A nucleus is ", /*#__PURE__*/React.createElement(Term, {
    def: "A nucleus that has the right balance of protons and neutrons to remain intact without emitting radiation."
  }, "stable"), " when these two forces are balanced."), /*#__PURE__*/React.createElement("p", null, "A nucleus becomes ", /*#__PURE__*/React.createElement(Term, {
    def: "A nucleus that has too many or too few neutrons relative to its protons, causing it to emit radiation to reach a more stable state."
  }, "unstable"), " if it has too many neutrons for its protons, too few neutrons for its protons, or too many nucleons in total. Every element with more than 82 protons (heavier than lead) has no stable ", /*#__PURE__*/React.createElement(Term, {
    def: "Atoms of the same element with different numbers of neutrons. Some isotopes are radioactive."
  }, "isotopes"), " at all: all of its isotopes are radioactive. Unstable nuclei undergo ", /*#__PURE__*/React.createElement(Term, {
    def: "The spontaneous emission of radiation from an unstable nucleus to reach a more stable state."
  }, "radioactive decay"), ", emitting alpha particles, beta particles, or gamma radiation."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Types of radiation"
  }, "Alpha (a helium nucleus: 2 protons + 2 neutrons), Beta (a high-energy electron ejected from the nucleus when a neutron converts to a proton), and Gamma (high-energy electromagnetic radiation, often emitted alongside alpha or beta decay)."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 18,
    question: "Why are all isotopes of elements with more than 82 protons radioactive?",
    options: ["They have too few electrons", "The strong nuclear force cannot balance the repulsion between so many protons", "They are too light to be stable", "They were not formed in the Big Bang"],
    correct: 1,
    explain: "Above 82 protons, the electrostatic repulsion between protons in the nucleus becomes so strong that no stable neutron-to-proton ratio exists."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.3",
    title: "Represent alpha and beta reactions as nuclear equations",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Nuclear reactions are represented by ", /*#__PURE__*/React.createElement(Term, {
    def: "An equation showing how atomic nuclei change, with mass numbers and atomic numbers balancing on both sides."
  }, "nuclear equations"), ". In these, the top number (mass number, A) is the total number of protons and neutrons, and the bottom number (atomic number, Z) is the number of protons. Both A and Z must balance on each side of the arrow."), /*#__PURE__*/React.createElement("p", null, "In ", /*#__PURE__*/React.createElement(Term, {
    def: "A type of radioactive decay in which an alpha particle (2 protons + 2 neutrons) is emitted, reducing the mass number by 4 and the atomic number by 2."
  }, "alpha decay"), ", the nucleus loses an alpha particle (written as \u2074\u2082He or \u03B1), so the mass number decreases by 4 and the atomic number decreases by 2. The element changes to a different element. Example: \xB2\xB3\u2078\u2089\u2082U \u2192 \xB2\xB3\u2074\u2089\u2080Th + \u2074\u2082He."), /*#__PURE__*/React.createElement("p", null, "In ", /*#__PURE__*/React.createElement(Term, {
    def: "A type of radioactive decay in which a neutron converts into a proton and a high-energy electron (beta particle) that is ejected, increasing the atomic number by 1."
  }, "beta decay"), ", a neutron in the nucleus becomes a proton, and a high-energy electron (the beta particle, \u2070\u208B\u2081e) is ejected. The mass number stays the same, but the atomic number increases by 1. Example: \xB9\u2074\u2086C \u2192 \xB9\u2074\u2087N + \u2070\u208B\u2081e. ", /*#__PURE__*/React.createElement(Term, {
    def: "High-energy electromagnetic radiation emitted alongside alpha or beta decay. It does not change the atomic or mass number."
  }, "Gamma emission"), " does not change atomic or mass number."), /*#__PURE__*/React.createElement(NuclearEquationChecker, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 19,
    question: "Explain why alpha decay changes one element into a different element.",
    model: "Alpha decay removes 2 protons and 2 neutrons from the nucleus. The number of protons determines the element. Removing 2 protons changes the atomic number, which means the atom is now a completely different element on the periodic table."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.4",
    title: "Identify that the half-life of a radioactive isotope is the time taken for half of the atoms to decay",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The time taken for half of the radioactive atoms in a sample to undergo radioactive decay. Each isotope has a fixed, characteristic half-life."
  }, "half-life"), " of a radioactive isotope is the time it takes for half the atoms in a sample to decay. This is a fixed property of each isotope and cannot be changed by temperature, pressure, or chemical reactions."), /*#__PURE__*/React.createElement("p", null, "If you start with 1000 atoms of an isotope that has a half-life of 10 years, after 10 years 500 remain, after 20 years 250 remain, and after 30 years 125 remain. The decay follows an ", /*#__PURE__*/React.createElement(Term, {
    def: "A pattern of decrease where the quantity halves over equal time intervals."
  }, "exponential"), " pattern: the number of radioactive atoms approaches zero but never actually reaches it."), /*#__PURE__*/React.createElement("p", null, "Half-life has many practical uses: radiocarbon dating uses carbon-14 (half-life 5,730 years) to estimate the age of biological materials up to about 50,000 years old; uranium-238 (half-life 4.5 billion years) is used to date rocks; medical isotopes like iodine-131 (half-life 8 days) are chosen with short half-lives so radioactivity does not persist in the body."), /*#__PURE__*/React.createElement(HalfLifeSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 20,
    question: "A sample contains 800 radioactive atoms with a half-life of 5 years. How many atoms remain after 15 years?",
    options: ["400", "200", "100", "50"],
    correct: 2,
    explain: "15 years = 3 half-lives. 800 \u2192 400 \u2192 200 \u2192 100."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.5",
    title: "Evaluate the societal benefits and considerations of using radioisotopes",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Radioisotopes have significant benefits in medicine, industry, and environmental monitoring. In medicine, ", /*#__PURE__*/React.createElement(Term, {
    def: "A radioisotope of technetium used in medical imaging scans to detect cancer, heart disease, and bone disorders."
  }, "technetium-99m"), " is used in millions of diagnostic scans each year. Cobalt-60 and iodine-131 are used in radiotherapy to target and kill cancer cells. Gamma radiation sterilises medical equipment without heat."), /*#__PURE__*/React.createElement("p", null, "In industry, beta or gamma sources measure the thickness of paper, plastic, and metal sheets as they are produced. Radiation inspects welds for internal defects, and food irradiation kills bacteria and insects to extend shelf life. Americium-241 in smoke detectors ionises air; smoke particles interrupt this current and trigger the alarm."), /*#__PURE__*/React.createElement("p", null, "In environmental monitoring, radioactive tracers follow water flow, detect leaks in underground pipes, and measure erosion rates. However, all uses require careful regulation: doses to patients and workers must be minimised, radioactive waste must be stored safely, and contamination of the environment must be prevented."), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Risk-benefit balance"
  }, "The benefits of radioisotopes are large, but risks to health and environment are real. Strict regulations, specialised training, and secure waste disposal are essential for responsible use."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "Evaluate one benefit and one consideration of using radioisotopes in medicine.",
    model: "Benefit: radioisotopes such as technetium-99m allow doctors to detect cancers and other diseases at an early stage without surgery, greatly improving patient outcomes. Consideration: the radiation from these isotopes can damage healthy cells, so the dose must be carefully calculated and patients may need to limit contact with others for a short period after treatment to reduce exposure to others."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.6",
    title: "Describe nuclear fission and nuclear fusion",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The splitting of a large, unstable nucleus into two smaller nuclei, releasing a large amount of energy, several neutrons, and gamma radiation."
  }, "Nuclear fission"), " occurs when a large nucleus, such as uranium-235, absorbs a neutron and splits into two smaller nuclei. This releases extra neutrons that can trigger further fissions, creating a ", /*#__PURE__*/React.createElement(Term, {
    def: "A self-sustaining series of fission reactions where neutrons from each fission trigger more fissions."
  }, "chain reaction"), ". Fission releases about one million times more energy per unit mass than a chemical reaction. It is used in nuclear power stations and atomic weapons."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The joining of two small nuclei to form a larger nucleus, releasing a very large amount of energy."
  }, "Nuclear fusion"), " is the opposite: two small nuclei (usually hydrogen isotopes deuterium and tritium) are forced together to form a larger nucleus. Fusion requires extremely high temperatures (millions of degrees Celsius) and pressures, conditions found naturally inside stars. Fusion releases even more energy per unit mass than fission and produces far less long-lived radioactive waste. Commercial fusion power stations do not yet exist, but international research projects like ITER are working on it."), /*#__PURE__*/React.createElement(Figure, {
    num: "7",
    caption: "Fission vs fusion: key differences at a glance."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 540 146",
    width: "100%",
    style: {
      maxWidth: 540
    }
  }, [["Process", "Large nucleus splits", "Small nuclei join"], ["Fuel", "Uranium-235", "Hydrogen isotopes"], ["Energy", "Very large", "Even larger per kg"], ["Waste", "Long-lived radioactive", "Very little long-lived"], ["In use?", "Yes, power stations", "Research only"]].map(function (_ref1, i) {
    var _ref10 = _slicedToArray(_ref1, 3),
      feat = _ref10[0],
      fiss = _ref10[1],
      fus = _ref10[2];
    return /*#__PURE__*/React.createElement("g", {
      key: feat,
      transform: "translate(0,".concat(i * 24 + 22, ")")
    }, /*#__PURE__*/React.createElement("rect", {
      x: "0",
      y: "4",
      width: "160",
      height: "20",
      rx: "4",
      fill: i % 2 === 0 ? "var(--accent-soft)" : "#f1f5f9"
    }), /*#__PURE__*/React.createElement("text", {
      x: "80",
      y: "18",
      textAnchor: "middle",
      fontSize: "11",
      fontWeight: "700",
      fill: "#1b1a17"
    }, feat), /*#__PURE__*/React.createElement("rect", {
      x: "165",
      y: "4",
      width: "175",
      height: "20",
      rx: "4",
      fill: i % 2 === 0 ? "#dbeafe" : "#eff6ff"
    }), /*#__PURE__*/React.createElement("text", {
      x: "252",
      y: "18",
      textAnchor: "middle",
      fontSize: "10",
      fill: "#1b1a17"
    }, fiss), /*#__PURE__*/React.createElement("rect", {
      x: "345",
      y: "4",
      width: "190",
      height: "20",
      rx: "4",
      fill: i % 2 === 0 ? "#dcfce7" : "#f0fdf4"
    }), /*#__PURE__*/React.createElement("text", {
      x: "440",
      y: "18",
      textAnchor: "middle",
      fontSize: "10",
      fill: "#1b1a17"
    }, fus));
  }), /*#__PURE__*/React.createElement("text", {
    x: "80",
    y: "18",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "Feature"), /*#__PURE__*/React.createElement("text", {
    x: "252",
    y: "18",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "#4b7bc9"
  }, "Fission"), /*#__PURE__*/React.createElement("text", {
    x: "440",
    y: "18",
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "#3f8a4a"
  }, "Fusion"))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 22,
    question: "Why is nuclear fusion not yet used to generate electricity commercially?",
    options: ["It produces too much radioactive waste", "It requires extremely high temperatures and pressures that are very difficult to sustain in a reactor", "It is less energetic than fission", "It only works in space"],
    correct: 1,
    explain: "Fusion needs conditions like those inside the Sun (millions of degrees). Creating and maintaining these conditions in a controlled reactor on Earth is an enormous engineering challenge."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.4.7",
    title: "Outline the impacts on the environment of nuclear reactions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Nuclear energy has a low carbon footprint during operation, making it attractive for reducing greenhouse gas emissions. However, its environmental impact must be assessed across the full ", /*#__PURE__*/React.createElement(Term, {
    def: "The complete sequence of steps from extracting raw materials through production to disposal at the end of use."
  }, "life cycle"), ": from uranium mining to decommissioning."), /*#__PURE__*/React.createElement("p", null, "Mining and processing uranium causes habitat destruction, produces radioactive dust, and can contaminate nearby water. Construction of a nuclear power station uses large quantities of concrete and steel. During operation, the station uses large volumes of water for cooling, which can warm local waterways, and carries the risk of accidents. The Chernobyl (1986) and Fukushima (2011) accidents released radioactive materials into the environment with long-lasting effects."), /*#__PURE__*/React.createElement("p", null, "Nuclear reactions produce ", /*#__PURE__*/React.createElement(Term, {
    def: "Radioactive material that is no longer useful but remains hazardous for long periods. Classified as low-level, intermediate-level, or high-level."
  }, "nuclear waste"), " that must be managed for thousands of years. High-level waste (such as spent fuel rods) remains hazardous for tens of thousands of years and is stored in deep geological repositories. Decommissioning an old reactor takes decades and is very expensive."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Comparing with coal"
  }, "Nuclear power produces far less CO\u2082 per kilowatt-hour than coal-fired power. However, coal waste is dispersed into the atmosphere, while nuclear waste is concentrated and must be carefully contained. Each has different but serious environmental trade-offs."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 23,
    question: "Explain why nuclear power is considered low-emission but not zero-impact on the environment.",
    model: "During operation a nuclear power station releases almost no greenhouse gases, making it low-emission. However, the full life cycle includes uranium mining (which destroys habitat and can contaminate water), construction (which produces CO2), cooling water that warms local waterways, the risk of accidents, and the production of radioactive waste that must be safely stored for thousands of years. These impacts mean it is not zero-impact overall."
  }))));
}

/* ============================================================
   SECTION 6.5  -  Reactions in Context
   ============================================================ */

function HaberProcessSim() {
  var _useState43 = useState(450),
    _useState44 = _slicedToArray(_useState43, 2),
    temperature = _useState44[0],
    setTemperature = _useState44[1];
  var _useState45 = useState(200),
    _useState46 = _slicedToArray(_useState45, 2),
    pressure = _useState46[0],
    setPressure = _useState46[1];

  // Simplified model: yield peaks around 400-450 C, increases with pressure
  // At high temp, equilibrium shifts back but rate is faster
  // At low temp, yield is better but rate is slower
  var equilibriumYield = Math.min(97, 95 * Math.exp(-(temperature - 200) / 250) * Math.pow(pressure / 200, 0.6));
  var reactionRate = 0.5 + (temperature - 200) / 300 + pressure / 400;
  var practicalYield = Math.round(Math.min(equilibriumYield, 100));
  var rateLabel = reactionRate < 1.5 ? "Slow" : reactionRate < 2.5 ? "Moderate" : "Fast";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Haber process explorer",
    subtitle: "Adjust temperature and pressure to find the best industrial conditions for ammonia production.",
    takeaway: "Industrial conditions for the Haber process are a compromise: lower temperature gives better yield but too slowly, while higher pressure improves yield but makes equipment expensive and dangerous, so around 450 \xB0C and 200 atm is used with an iron catalyst."
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      gap: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Temperature",
    min: 200,
    max: 600,
    value: temperature,
    onChange: setTemperature,
    unit: " \xB0C"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Pressure",
    min: 50,
    max: 400,
    value: pressure,
    onChange: setPressure,
    unit: " atm"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "~".concat(practicalYield, "%"),
    label: "Estimated yield"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: rateLabel,
    label: "Reaction rate"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: temperature + " °C",
    label: "Temperature"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--ink-muted)",
      marginTop: 8,
      marginBottom: 0
    }
  }, "Industrially, around 450 \xB0C and 200 atm are used with an iron catalyst. Lower temperatures give better yield but too slowly; higher pressure improves yield but makes equipment very expensive and dangerous."), temperature < 350 && /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Too cold"
  }, "The yield looks good here but the rate is too slow to be economical. The industrial compromise is around 400 to 500 \xB0C."), temperature > 530 && /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Too hot"
  }, "At very high temperatures the equilibrium shifts backwards and yield drops. Rate is fast but not enough product is made."));
}
function Section65(_ref11) {
  var progress = _ref11.progress,
    setProgress = _ref11.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "6.5 Reactions in context"), /*#__PURE__*/React.createElement("h1", null, "Chemistry at work"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Industrial chemical and nuclear reactions produce many of the materials, foods, medicines, and energy sources that modern society depends on.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "6.5.1",
    title: "Investigate a chemical or nuclear reaction used in industry to produce an important product",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Industrial reactions are chemical or nuclear processes carried out on a large scale to produce useful products. Studying them helps you understand how scientific knowledge is applied to meet real-world needs and to evaluate the environmental and social trade-offs involved."), /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "An industrial process that produces ammonia (NH3) from nitrogen and hydrogen gas using an iron catalyst at high temperature and pressure."
  }, "Haber process"), " synthesises ammonia (NH\u2083) from nitrogen and hydrogen: N\u2082 + 3H\u2082 \u2192 2NH\u2083. Ammonia is the starting material for fertilisers that feed billions of people. It requires high pressure (about 200 atm), moderate temperature (about 450 \xB0C), and an iron catalyst. The conditions represent a compromise between yield and reaction rate."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The industrial process that uses nuclear fission of uranium-235 to generate heat, which produces steam to drive turbines and generate electricity."
  }, "Nuclear fission power stations"), " control a chain reaction of uranium-235 to generate heat, then steam to drive turbines. They produce very low greenhouse gas emissions but generate radioactive waste and require careful safety management. Other important industrial reactions include sulfuric acid production (used in fertilisers, car batteries, and mining), iron and steel production in blast furnaces, and medical radioisotope production."), /*#__PURE__*/React.createElement("p", null, "When evaluating any industrial reaction, consider: raw materials and their availability, energy required, conditions needed (temperature, pressure, catalyst), products and by-products, economic value, environmental impact at every stage, and social benefits and considerations."), /*#__PURE__*/React.createElement(HaberProcessSim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Haber process impact"
  }, "The Haber process is sometimes described as the most important chemical reaction of the 20th century. Without the nitrogen fertilisers it produces, current methods of farming could not feed the world's population."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 24,
    question: "Why does the Haber process use a moderate temperature of around 450 \xB0C rather than a much lower temperature, even though lower temperatures give a better equilibrium yield?",
    options: ["Lower temperatures are more expensive", "At lower temperatures the reaction rate is too slow to be economical", "Lower temperatures produce the wrong product", "Nitrogen does not react below 450 °C"],
    correct: 1,
    explain: "Below about 400 \xB0C the yield would be higher, but the rate becomes so slow that waiting for equilibrium would be uneconomical. The industrial conditions are a deliberate compromise."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 25,
    question: "Choose one industrial reaction and evaluate its environmental impact at two different stages of the process.",
    model: "Example using nuclear power: (1) Uranium mining causes habitat destruction and can release radioactive dust into the environment, contaminating waterways. (2) During operation, the power station uses large volumes of cooling water that may warm local rivers, harming aquatic ecosystems, and there is a low but real risk of accidents releasing radioactive material. At both stages, careful management and regulation are essential to reduce environmental harm."
  }))));
}

/* ============================================================
   MOUNT
   ============================================================ */

mountTopicApp({
  year: 10,
  topicTitle: "Chemical Reactions",
  branch: "chemistry",
  heroImage: "img/hero.png",
  strand: "Stage 5 · NSW Science",
  accent: "purple",
  storageKey: "y10.chemreactions",
  hubHref: "../",
  intro: "Chemical and nuclear reactions are at the heart of everything from the food you eat to the stars that forged your atoms. In this topic you will master the law of conservation of mass, learn to balance equations, classify reaction types, explore the pH scale, understand what controls reaction rate, and delve into the extraordinary world of nuclear reactions from the Big Bang to fission and fusion.",
  glossary: {
    "law of conservation of mass": "Mass cannot be created or destroyed in a chemical reaction. Total mass of reactants equals total mass of products.",
    "reactant": "A substance that is present at the start of a reaction and is used up to form products.",
    "product": "A new substance formed as a result of a chemical reaction.",
    "closed system": "A system in which no matter can enter or leave. Mass is always conserved.",
    "open system": "A system that can exchange matter with its surroundings, so apparent mass changes may occur.",
    "IUPAC": "International Union of Pure and Applied Chemistry. Sets global rules for naming chemical substances.",
    "ionic compound": "A compound formed between a metal and a non-metal, held together by electrostatic attraction between ions.",
    "covalent compound": "A compound formed between non-metals, held together by shared pairs of electrons.",
    "balanced equation": "A chemical equation in which the number of each type of atom is the same on both sides, obeying conservation of mass.",
    "coefficient": "A number placed in front of a formula in an equation to show how many units of that substance are involved.",
    "synthesis reaction": "A reaction in which two or more reactants combine to form a single product (A + B → AB).",
    "decomposition reaction": "A reaction in which one compound breaks into two or more simpler substances (AB → A + B).",
    "displacement reaction": "A reaction in which a more reactive element displaces a less reactive element from a compound.",
    "neutralisation reaction": "A reaction between an acid and a base that produces a salt and water.",
    "pH": "A scale from 0 to 14 measuring the acidity or alkalinity of a solution based on H+ ion concentration.",
    "acid": "A substance that releases hydrogen ions (H+) in solution and has a pH below 7.",
    "base": "A substance that accepts hydrogen ions or releases hydroxide ions (OH-) in solution; pH above 7 when dissolved.",
    "indicator": "A substance that changes colour depending on the pH of the solution.",
    "titration": "A laboratory technique in which a solution of known concentration is used to find the concentration of another solution.",
    "rate of reaction": "A measure of how quickly reactants are converted into products.",
    "collision theory": "Reactions occur when particles collide with sufficient energy (activation energy) and correct orientation.",
    "activation energy": "The minimum energy that colliding particles must have for a reaction to occur.",
    "catalyst": "A substance that speeds up a reaction without being permanently consumed. It lowers activation energy.",
    "radioactive decay": "The spontaneous emission of radiation from an unstable nucleus to reach a more stable state.",
    "half-life": "The time taken for half of the radioactive atoms in a sample to decay.",
    "alpha decay": "Radioactive decay in which an alpha particle (2 protons + 2 neutrons) is emitted.",
    "beta decay": "Radioactive decay in which a neutron converts to a proton and an electron (beta particle) is ejected.",
    "nuclear fission": "The splitting of a large nucleus into two smaller nuclei, releasing a large amount of energy.",
    "nuclear fusion": "The joining of two small nuclei to form a larger nucleus, releasing a very large amount of energy.",
    "Big Bang nucleosynthesis": "The production of hydrogen, helium, and trace lithium nuclei in the first few minutes after the Big Bang.",
    "Haber process": "An industrial process that produces ammonia from nitrogen and hydrogen using an iron catalyst."
  },
  sections: [{
    id: "6.1",
    label: "Conservation of Mass",
    accent: "purple",
    blurb: "Mass cannot be created or destroyed in any chemical reaction.",
    points: ["6.1.1", "6.1.2", "6.1.3"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section61, p);
    }
  }, {
    id: "6.2",
    label: "Chemical Reactions",
    accent: "violet",
    blurb: "Naming compounds, writing equations, reaction types, and the pH scale.",
    points: ["6.2.1", "6.2.2", "6.2.3", "6.2.4", "6.2.5", "6.2.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section62, p);
    }
  }, {
    id: "6.3",
    label: "Reaction Rate",
    accent: "blue",
    blurb: "How concentration, surface area, temperature and catalysts control how fast reactions go.",
    points: ["6.3.1", "6.3.2"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section63, p);
    }
  }, {
    id: "6.4",
    label: "Nuclear Reactions",
    accent: "red",
    blurb: "From Big Bang nucleosynthesis to radioactive decay, fission, and fusion.",
    points: ["6.4.1", "6.4.2", "6.4.3", "6.4.4", "6.4.5", "6.4.6", "6.4.7"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section64, p);
    }
  }, {
    id: "6.5",
    label: "Reactions in Context",
    accent: "amber",
    blurb: "Industrial chemical and nuclear reactions and their social and environmental impacts.",
    points: ["6.5.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section65, p);
    }
  }]
});
