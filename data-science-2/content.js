/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  useMemo = _React.useMemo,
  useCallback = _React.useCallback;

/* ================================================================
   SECTION 8.1 -- Investigating Questions and Claims
   INTERACTIVES:
     - QuestionSorter: drag/click items into investigable vs not
     - CERBuilder: guided claim-evidence-reasoning builder
   ================================================================ */

function QuestionSorter() {
  var questions = [{
    id: "q1",
    label: "Does screen brightness affect battery life?",
    bucket: "yes"
  }, {
    id: "q2",
    label: "Which political party is better for the environment?",
    bucket: "no"
  }, {
    id: "q3",
    label: "Does water temperature affect sugar dissolving rate?",
    bucket: "yes"
  }, {
    id: "q4",
    label: "What is the meaning of life?",
    bucket: "no"
  }, {
    id: "q5",
    label: "Does daily temperature correlate with electricity demand?",
    bucket: "yes"
  }, {
    id: "q6",
    label: "Is classical music better than pop music?",
    bucket: "no"
  }, {
    id: "q7",
    label: "Does ramp height affect how far a toy car rolls?",
    bucket: "yes"
  }];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Investigable or not?",
    subtitle: "Sort each question into the correct category. A question is investigable when it can be answered by collecting measurable evidence.",
    takeaway: "A question is only investigable if it involves at least one variable you can measure or change; questions based on values or beliefs cannot be answered by collecting data."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: questions,
    buckets: [{
      id: "yes",
      label: "Investigable"
    }, {
      id: "no",
      label: "Not investigable"
    }]
  }));
}
function PeerReviewCycleSVG() {
  var stages = ["Observation", "Hypothesis", "Experiment", "Analysis", "Peer Review", "Replication"];
  var cx = 220,
    cy = 140,
    r = 110;
  var points = stages.map(function (s, i) {
    var angle = i / stages.length * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      label: s
    };
  });
  return /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "The scientific knowledge cycle: every finding must survive peer review and replication before it becomes accepted knowledge."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 440 280",
    width: "100%",
    style: {
      maxWidth: 440
    }
  }, points.map(function (p, i) {
    var next = points[(i + 1) % points.length];
    var mx = (p.x + next.x) / 2;
    var my = (p.y + next.y) / 2;
    var dx = next.x - p.x;
    var dy = next.y - p.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var ax = mx - dy / len * 14;
    var ay = my + dx / len * 14;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: p.x,
      y1: p.y,
      x2: next.x,
      y2: next.y,
      stroke: "var(--accent)",
      strokeWidth: "2",
      markerEnd: "url(#arr)"
    }));
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "arr",
    markerWidth: "8",
    markerHeight: "8",
    refX: "6",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L8,3 z",
    fill: "var(--accent)"
  }))), points.map(function (p, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: p.x,
      cy: p.y,
      r: "26",
      fill: "var(--accent-soft)",
      stroke: "var(--accent)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: p.x,
      y: p.y + 5,
      textAnchor: "middle",
      fontSize: "10",
      fontWeight: "700",
      fill: "var(--accent-deep)"
    }, p.label));
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 5,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "Science"), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 18,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "cycle")));
}
function CERBuilder() {
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    claim = _useState2[0],
    setClaim = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    evidence = _useState4[0],
    setEvidence = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    reasoning = _useState6[0],
    setReasoning = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    shown = _useState8[0],
    setShown = _useState8[1];
  var score = [claim.trim().length > 10, evidence.trim().length > 10, reasoning.trim().length > 10].filter(Boolean).length;
  var colours = ["#e74c3c", "#d97706", "#0d9488", "#16a34a"];
  var labels = ["Start writing", "Getting there", "Almost done", "Strong argument"];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "CER Argument Builder",
    subtitle: "Practice writing a scientific argument using the Claim, Evidence, Reasoning framework.",
    takeaway: "A strong scientific argument requires a clear claim, specific numerical evidence, and explicit reasoning that explains the scientific link between the data and the conclusion."
  }, /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 8
    }
  }, "Topic: A student tested whether caffeine reduces reaction time. The caffeine group had a mean reaction time of 210 ms vs 245 ms for the control group (n=8 each)."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, [{
    label: "Claim",
    val: claim,
    set: setClaim,
    hint: "State what you conclude in one clear sentence."
  }, {
    label: "Evidence",
    val: evidence,
    set: setEvidence,
    hint: "Quote specific numbers from the data."
  }, {
    label: "Reasoning",
    val: reasoning,
    set: setReasoning,
    hint: "Explain the scientific link between your evidence and your claim."
  }].map(function (_ref) {
    var label = _ref.label,
      val = _ref.val,
      set = _ref.set,
      hint = _ref.hint;
    return /*#__PURE__*/React.createElement("div", {
      key: label
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontWeight: 700,
        display: "block",
        marginBottom: 4
      }
    }, label), /*#__PURE__*/React.createElement("p", {
      className: "muted",
      style: {
        fontSize: 13,
        margin: "0 0 4px"
      }
    }, hint), /*#__PURE__*/React.createElement("textarea", {
      value: val,
      onChange: function onChange(e) {
        return set(e.target.value);
      },
      rows: 2,
      style: {
        width: "100%",
        padding: "8px 10px",
        borderRadius: 8,
        border: "1.5px solid var(--border)",
        fontSize: 14,
        resize: "vertical",
        background: "var(--surface)",
        color: "var(--ink)"
      },
      placeholder: "Write your ".concat(label.toLowerCase(), "...")
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 8,
      borderRadius: 4,
      background: "var(--border)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "".concat(score / 3 * 100, "%"),
      height: "100%",
      background: colours[score],
      transition: "width 0.4s, background 0.4s"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: colours[score],
      minWidth: 120
    }
  }, labels[score])));
}
function SourceEvalTool() {
  var sources = [{
    id: "a",
    title: "CSIRO and Bureau of Meteorology: State of the Climate 2024",
    authority: "high",
    accuracy: "high",
    purpose: "scientific",
    currency: "recent",
    label: "Reliable"
  }, {
    id: "b",
    title: "Anonymous blog: 'Vaccines cause autism'",
    authority: "low",
    accuracy: "low",
    purpose: "mislead",
    currency: "old",
    label: "Unreliable"
  }, {
    id: "c",
    title: "Supplement company: 'Our product boosts immunity (no citation)'",
    authority: "conflict",
    accuracy: "low",
    purpose: "commercial",
    currency: "recent",
    label: "Unreliable"
  }, {
    id: "d",
    title: "WHO: Global cancer statistics 2022",
    authority: "high",
    accuracy: "high",
    purpose: "scientific",
    currency: "recent",
    label: "Reliable"
  }];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    selected = _useState0[0],
    setSelected = _useState0[1];
  var _useState1 = useState({}),
    _useState10 = _slicedToArray(_useState1, 2),
    revealed = _useState10[0],
    setRevealed = _useState10[1];
  var criteria = ["authority", "accuracy", "purpose", "currency"];
  var colourMap = {
    high: "#0d9488",
    low: "#e74c3c",
    recent: "#0d9488",
    old: "#e74c3c",
    scientific: "#0d9488",
    commercial: "#d97706",
    mislead: "#e74c3c",
    conflict: "#d97706"
  };
  var labelMap = {
    high: "High",
    low: "Low / Red flag",
    recent: "Current",
    old: "Outdated",
    scientific: "Scientific/public",
    commercial: "Commercial interest",
    mislead: "Mislead/agenda",
    conflict: "Conflict of interest"
  };
  var src = sources.find(function (s) {
    return s.id === selected;
  });
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Source Evaluation Tool",
    subtitle: "Click a source to evaluate it against the CRAAP criteria: Currency, Relevance, Authority, Accuracy, Purpose.",
    takeaway: "Reliable sources score well on all CRAAP criteria; a single red flag such as low authority, inaccurate claims, or a commercial purpose is enough to treat a source with serious caution."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 16
    }
  }, sources.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      className: "btn ".concat(selected === s.id ? "btn-accent" : "btn-ghost"),
      onClick: function onClick() {
        return setSelected(s.id);
      },
      style: {
        textAlign: "left",
        maxWidth: 260
      }
    }, s.title);
  })), src && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 12,
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      marginBottom: 8
    }
  }, src.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 8
    }
  }, criteria.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        background: "var(--bg)",
        borderRadius: 8,
        padding: "8px 12px",
        borderLeft: "4px solid ".concat(colourMap[src[c]])
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: 13
      }
    }, c, ":"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 6,
        fontSize: 13,
        color: colourMap[src[c]]
      }
    }, labelMap[src[c]]));
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontWeight: 700
    }
  }, "Verdict: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: src.label === "Reliable" ? "#0d9488" : "#e74c3c"
    }
  }, src.label))), !selected && /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "Select a source above to see its evaluation."));
}
function Section1(_ref2) {
  var progress = _ref2.progress,
    setProgress = _ref2.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "8.1 Investigating Questions and Claims"), /*#__PURE__*/React.createElement("h1", null, "Asking the right questions"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Good science begins with a question that is sharp enough to test and honest enough to abandon if the data say otherwise.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.1",
    title: "Investigable and non-investigable questions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Not every question can be answered by collecting evidence. An ", /*#__PURE__*/React.createElement(Term, {
    def: "A question that can be answered by gathering measurable, observable data."
  }, "investigable question"), " involves at least one variable you can measure or change. It must be completable with the equipment, time, and participants available to you."), /*#__PURE__*/React.createElement("p", null, "Questions that depend on personal values, beliefs, or events beyond any possible measurement are ", /*#__PURE__*/React.createElement(Term, {
    def: "A question that cannot be settled by gathering empirical data."
  }, "non-investigable"), ". For example, \"Is classical music better than pop?\" cannot be answered by measurement alone, but \"Does listening to classical music change the time taken to complete a set of maths problems?\" can."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Four practical constraints"
  }, "Time, equipment, sample size, and safety all determine whether a question is investigable with your resources. A question about glacier retreat over 500 years can still be investigable if existing datasets contain that history."), /*#__PURE__*/React.createElement(QuestionSorter, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which of the following is an investigable question?",
    options: ["Is democracy better than other systems?", "Does fertiliser amount affect bean plant height over four weeks?", "What is the purpose of human life?", "Should animals be used in research?"],
    correct: 1,
    explain: "Only option B involves measurable variables (fertiliser amount, plant height) and a realistic timeframe. The other options depend on values or cannot be empirically tested."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "A student wants to investigate 'whether social media is harmful to teenagers.' Explain why this question is not investigable as stated, then rewrite it as an investigable question.",
    model: "'Harmful' is undefined and not measurable, and 'social media' and 'teenagers' are too broad. Investigable version: 'Does using social media for more than three hours per day correlate with self-reported sleep duration in Year 10 students aged 15 to 16?'"
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.2",
    title: "Hypothesis testing and peer review",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A specific, testable, falsifiable prediction about the relationship between variables."
  }, "hypothesis"), " makes a clear prediction that experiments could in principle disprove. Writing one in the form \"If [independent variable] increases, then [dependent variable] will [change] because [mechanism]\" keeps it falsifiable and precise."), /*#__PURE__*/React.createElement("p", null, "After data are collected and analysed, findings are submitted to a ", /*#__PURE__*/React.createElement(Term, {
    def: "A process in which independent experts scrutinise a study's methods, analysis, and conclusions before it is published."
  }, "peer-reviewed"), " journal. Reviewers check whether the design was appropriate, whether statistics were used correctly, and whether conclusions follow from the data. After publication, other labs attempt to ", /*#__PURE__*/React.createElement(Term, {
    def: "Repeating a study independently to check whether the same results are obtained."
  }, "replicate"), " the findings. A result that cannot be replicated carries little weight, no matter how well it was reviewed."), /*#__PURE__*/React.createElement(PeerReviewCycleSVG, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Science self-corrects"
  }, "Barry Marshall drank a culture of Helicobacter pylori in 1984 to show that bacteria cause stomach ulcers. The scientific community was sceptical, but the evidence accumulated and Marshall and his colleague Robin Warren won the Nobel Prize in 2005. When evidence demands it, science changes its mind."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "What is the main purpose of peer review in science?",
    options: ["To guarantee a study is correct", "To allow independent experts to check the study before publication", "To give the author feedback on writing style", "To decide how much funding a study receives"],
    correct: 1,
    explain: "Peer review lets independent experts assess whether methods, statistics, and conclusions are sound. It does not guarantee correctness, which is why replication is also needed."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.3",
    title: "Evaluating online sources",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The internet contains vast amounts of information, but quantity does not equal quality. Evaluating whether content is ", /*#__PURE__*/React.createElement(Term, {
    def: "Accurate and supported by evidence."
  }, "valid"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "Consistent and from a trustworthy, appropriately expert source."
  }, "reliable"), " requires applying explicit criteria. The SIFT method helps: Stop before sharing; Investigate the source; Find better coverage from multiple independent sources; Trace claims back to original evidence."), /*#__PURE__*/React.createElement("p", null, "The CRAAP framework provides five criteria: ", /*#__PURE__*/React.createElement(Term, {
    def: "How recently the information was published."
  }, "Currency"), ", Relevance, ", /*#__PURE__*/React.createElement(Term, {
    def: "The expertise and credibility of the author or publisher."
  }, "Authority"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Whether claims are supported by data and citations."
  }, "Accuracy"), ", and ", /*#__PURE__*/React.createElement(Term, {
    def: "The reason the information was published, including potential commercial or ideological motives."
  }, "Purpose"), ". Apply all five, not just the ones that are convenient."), /*#__PURE__*/React.createElement(SourceEvalTool, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Many websites, one false claim"
  }, "Many websites can repeat the same false information. The number of sites making a claim does not make it reliable. What counts is whether multiple independent expert sources that investigated the claim independently reached the same conclusion."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 4,
    question: "A health influencer posts on Instagram: 'A recent Harvard study shows this berry extract cures diabetes' with no link provided. Which evaluation criterion is most clearly failed?",
    options: ["Currency", "Accuracy", "Relevance", "Corroboration"],
    correct: 1,
    explain: "The 'Accuracy' criterion fails because the claim cannot be traced to a named study and no link is provided. Extraordinary claims require citable, verifiable evidence."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.4",
    title: "Identifying and testing claims",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A statement asserting that something is true, which can in principle be supported or contradicted by evidence."
  }, "scientific claim"), " is testable when evidence could either support or contradict it. Identifying a testable claim involves: recognising what the claim asserts, determining what evidence would confirm or refute it, and checking whether that evidence is collectable."), /*#__PURE__*/React.createElement("p", null, "Some claims require a single well-designed experiment. Others, such as \"regular exercise reduces the risk of heart disease,\" require a series of investigations: short-term studies measuring physiological markers, plus analysis of longitudinal datasets tracking outcomes over decades. Understanding the scope needed to properly test a claim prevents premature conclusions."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Claim vs hypothesis"
  }, "A claim is a statement that something is true. A hypothesis is a narrower, specific prediction in the form \"if X, then Y,\" derived from the claim to make it testable."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 5,
    question: "Explain why the claim 'this crystal brings good luck' is not scientifically testable.",
    model: "'Good luck' cannot be operationalised or measured. There is no defined outcome that would count as luck, no comparison condition, and no way to isolate the crystal's effect from all other variables. The claim is not falsifiable."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.5",
    title: "Evidence, reasoning, and conclusions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A scientific conclusion links data to a claim through explicit reasoning. It has three components: an accurate description of the data pattern, a link between the data and the hypothesis, and reasoning that explains the scientific principle connecting the observation to the claim."), /*#__PURE__*/React.createElement("p", null, "Conclusions must also acknowledge ", /*#__PURE__*/React.createElement(Term, {
    def: "Constraints that reduce the confidence you can place in a conclusion, such as small sample size or uncontrolled variables."
  }, "limitations"), ". Using qualifying language such as \"the data suggest,\" \"the results are consistent with,\" or \"further investigation is needed\" is not weakness but scientific honesty."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Weak vs strong conclusion"
  }, "Weak: \"My hypothesis was correct.\" Strong: \"As temperature increased from 20 to 60 \xB0C, mean enzyme activity increased by 42%, supporting the hypothesis that higher temperature increases reaction rate up to a threshold. However, with only 8 trials per condition, further testing with larger samples is needed.\"")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.1.6",
    title: "Written scientific arguments (CER)",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A structured written response that connects a claim to evidence through explicit reasoning using the CER framework."
  }, "scientific argument"), " is not an opinion piece. It uses the ", /*#__PURE__*/React.createElement(Term, {
    def: "Claim, Evidence, Reasoning: a framework for constructing a written scientific argument."
  }, "CER framework"), ": the Claim states what you assert; the Evidence consists of specific data (numbers, measurements, trends); the Reasoning explains the scientific principle connecting evidence to claim."), /*#__PURE__*/React.createElement("p", null, "A strong argument also addresses contradictory evidence and explains why the weight of evidence still supports the claim. Confidence in the claim must be proportional to the strength of the evidence."), /*#__PURE__*/React.createElement(CERBuilder, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 6,
    question: "What does the 'R' in CER stand for?",
    options: ["Result", "Replication", "Reasoning", "Reference"],
    correct: 2,
    explain: "Reasoning is the scientific principle that explains why the evidence implies the claim. Without it, the reader cannot see how the data leads to the conclusion."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "Use the CER framework to write a scientific argument for the claim: 'Increasing atmospheric CO2 is associated with rising global average temperature.' Use these data: CO2 has risen from 280 ppm in 1750 to 420 ppm in 2023; global mean temperature has risen by approximately 1.1 \xB0C over the same period; CO2 absorbs and re-emits infrared radiation.",
    model: "Claim: increasing atmospheric CO2 is associated with rising global average temperature. Evidence: CO2 rose from 280 ppm in 1750 to 420 ppm in 2023 (a 50% increase); global mean temperature rose by approximately 1.1 \xB0C over the same period. Reasoning: CO2 is a greenhouse gas that absorbs infrared radiation emitted by Earth's surface and re-emits it, reducing heat escaping to space. The correlation between rising CO2 and rising temperature is consistent with this physical mechanism, and the timescale matches increased fossil fuel combustion."
  }))));
}

/* ================================================================
   SECTION 8.2 -- Pseudoscience
   INTERACTIVES:
     - PseudoscienceChecker: score a claim against 7 criteria
     - DataDistortionSim: interactive axis manipulation demo
   ================================================================ */

function PseudoscienceChecker() {
  var criteria = [{
    id: "falsifiable",
    label: "Makes a falsifiable prediction",
    scientific: true
  }, {
    id: "controlled",
    label: "Tested in controlled experiments",
    scientific: true
  }, {
    id: "peerreviewed",
    label: "Published in peer-reviewed journals",
    scientific: true
  }, {
    id: "replicated",
    label: "Results independently replicated",
    scientific: true
  }, {
    id: "mechanism",
    label: "Mechanism consistent with known science",
    scientific: true
  }, {
    id: "updates",
    label: "Updates when contradictory evidence appears",
    scientific: true
  }, {
    id: "consensus",
    label: "Accepted by relevant expert community",
    scientific: true
  }];
  var _useState11 = useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    checks = _useState12[0],
    setChecks = _useState12[1];
  var score = criteria.filter(function (c) {
    return checks[c.id];
  }).length;
  var verdict = score >= 6 ? {
    label: "Likely scientific",
    color: "#0d9488"
  } : score >= 4 ? {
    label: "Uncertain / needs more investigation",
    color: "#d97706"
  } : {
    label: "Likely pseudoscientific",
    color: "#e74c3c"
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Pseudoscience Checker",
    subtitle: "Apply the 7-criterion checklist to any claim. Tick each criterion that the claim satisfies.",
    takeaway: "Scientific claims meet most of the seven criteria including falsifiability, controlled testing, peer review, and replication; pseudoscientific claims typically fail on several of them, especially falsifiability."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 8
    }
  }, criteria.map(function (c) {
    return /*#__PURE__*/React.createElement("label", {
      key: c.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        padding: "8px 12px",
        borderRadius: 8,
        background: checks[c.id] ? "var(--accent-soft)" : "var(--surface)",
        color: checks[c.id] ? "#1b1a17" : "var(--ink)",
        border: "1.5px solid " + (checks[c.id] ? "var(--accent)" : "var(--border)"),
        transition: "all 0.2s"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!checks[c.id],
      onChange: function onChange(e) {
        return setChecks(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, c.id, e.target.checked));
        });
      },
      style: {
        width: 18,
        height: 18,
        accentColor: "var(--accent)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, c.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: "12px 16px",
      borderRadius: 10,
      background: "var(--surface)",
      border: "2px solid ".concat(verdict.color)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: verdict.color
    }
  }, verdict.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, score, "/7 criteria met")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 8,
      borderRadius: 4,
      background: "var(--border)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "".concat(score / 7 * 100, "%"),
      height: "100%",
      background: verdict.color,
      transition: "width 0.4s"
    }
  }))));
}
function DataDistortionSim() {
  var _useState13 = useState(true),
    _useState14 = _slicedToArray(_useState13, 2),
    truncate = _useState14[0],
    setTruncate = _useState14[1];
  var before = 130;
  var after = 127;
  var yMin = truncate ? 124 : 0;
  var yMax = truncate ? 133 : 140;
  var svgH = 180;
  var svgW = 320;
  var padL = 48,
    padR = 20,
    padT = 20,
    padB = 36;
  var plotH = svgH - padT - padB;
  var plotW = svgW - padL - padR;
  var toY = function toY(v) {
    return padT + plotH - (v - yMin) / (yMax - yMin) * plotH;
  };
  var barW = plotW / 4;
  var barX1 = padL + plotW * 0.2;
  var barX2 = padL + plotW * 0.6;
  var bars = [{
    x: barX1,
    v: before,
    label: "Before"
  }, {
    x: barX2,
    v: after,
    label: "After"
  }];
  var ticks = [];
  var step = truncate ? 2 : 20;
  for (var y = yMin; y <= yMax; y += step) ticks.push(y);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Axis Manipulation Simulator",
    subtitle: "Toggle between a truncated y-axis and a full-scale axis. Notice how the same data looks dramatically different.",
    takeaway: "Truncating the y-axis so it does not start at zero can make a tiny difference look enormous; always check where an axis starts before drawing conclusions from a graph."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "trunc",
      label: "Truncated axis (misleading)"
    }, {
      value: "full",
      label: "Full scale (honest)"
    }],
    value: truncate ? "trunc" : "full",
    onChange: function onChange(v) {
      return setTruncate(v === "trunc");
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(svgW, " ").concat(svgH),
    width: "100%",
    style: {
      maxWidth: svgW
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT,
    x2: padL,
    y2: padT + plotH,
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT + plotH,
    x2: padL + plotW,
    y2: padT + plotH,
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), ticks.map(function (t) {
    return /*#__PURE__*/React.createElement("g", {
      key: t
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL - 4,
      y1: toY(t),
      x2: padL,
      y2: toY(t),
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 6,
      y: toY(t) + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--ink-muted)"
    }, t));
  }), bars.map(function (b) {
    var barY = toY(b.v);
    var baseY = toY(yMin);
    return /*#__PURE__*/React.createElement("g", {
      key: b.label
    }, /*#__PURE__*/React.createElement("rect", {
      x: b.x,
      y: barY,
      width: barW,
      height: baseY - barY,
      fill: "var(--accent)",
      rx: "4",
      opacity: "0.85"
    }), /*#__PURE__*/React.createElement("text", {
      x: b.x + barW / 2,
      y: baseY + 14,
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink)"
    }, b.label), /*#__PURE__*/React.createElement("text", {
      x: b.x + barW / 2,
      y: barY - 4,
      textAnchor: "middle",
      fontSize: "11",
      fontWeight: "700",
      fill: "var(--ink)"
    }, b.v));
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 36,
    y: (padT + padT + plotH) / 2,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)",
    transform: "rotate(-90, ".concat(padL - 36, ", ").concat((padT + padT + plotH) / 2, ")")
  }, "Blood pressure (mmHg)"), /*#__PURE__*/React.createElement("text", {
    x: padL + plotW / 2,
    y: svgH - 2,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, "Treatment group"))), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0,
      textAlign: "center"
    }
  }, truncate ? "Truncated axis (starts at 124): the 3 mmHg difference looks enormous." : "Full scale (starts at 0): the same 3 mmHg difference is barely visible on a scale from 0 to 140 mmHg."));
}

/* Header figure for 8.2: what cherry-picking looks like. Deterministic data: a rising trend
   (0.1 per year) plus fixed noise; years 12-17 happen to dip, so choosing only them suggests a fall. */
function CherryPickFigure() {
  var NOISE = [0.2, -0.3, 0.1, 0.3, -0.2, 0, 0.4, -0.1, 0.2, -0.3, 0.1, 0.3, 0.8, 0.5, 0.3, 0, -0.2, -0.5, 0.1, -0.2, 0.3, 0, 0.2, -0.1, 0.4, 0.1, -0.2, 0.3, 0, 0.2];
  var pts = NOISE.map(function (e, i) {
    return [i, 0.1 * i + e];
  });
  var W0 = 12,
    W1 = 17; // cherry-picked window (inclusive)
  var fit = function fit(ps) {
    var n = ps.length,
      mx = ps.reduce(function (a, p) {
        return a + p[0];
      }, 0) / n,
      my = ps.reduce(function (a, p) {
        return a + p[1];
      }, 0) / n;
    var m = ps.reduce(function (a, p) {
      return a + (p[0] - mx) * (p[1] - my);
    }, 0) / ps.reduce(function (a, p) {
      return a + Math.pow(p[0] - mx, 2);
    }, 0);
    return [m, my - m * mx];
  };
  var _fit = fit(pts),
    _fit2 = _slicedToArray(_fit, 2),
    mA = _fit2[0],
    cA = _fit2[1];
  var _fit3 = fit(pts.slice(W0, W1 + 1)),
    _fit4 = _slicedToArray(_fit3, 2),
    mW = _fit4[0],
    cW = _fit4[1];
  var X = function X(i) {
      return 46 + i * 10;
    },
    Y = function Y(v) {
      return 196 - (v + 0.6) * 44;
    };
  var TEAL = "#0d9488",
    CORAL = "#ef6b4b";
  return /*#__PURE__*/React.createElement(Figure, {
    caption: "Cherry-picking. All 30 years of data (teal line) show a clear rise, but choosing only the six shaded years (coral line) makes it look as if the values are falling. Sound evidence uses all the relevant data."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 236",
    width: "100%",
    style: {
      maxWidth: 460,
      display: "block",
      margin: "0 auto"
    },
    role: "img",
    "aria-label": "Scatter plot of 30 yearly measurements rising overall. A teal best-fit line through all points slopes upward. Six points in a shaded window are highlighted in coral, and a coral best-fit line through only those six slopes downward."
  }, /*#__PURE__*/React.createElement("rect", {
    x: X(W0) - 5,
    y: "40",
    width: X(W1) - X(W0) + 10,
    height: "156",
    fill: CORAL,
    opacity: "0.16"
  }), /*#__PURE__*/React.createElement("text", {
    x: (X(W0) + X(W1)) / 2,
    y: "54",
    textAnchor: "middle",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "picked"), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "196",
    x2: "340",
    y2: "196",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "40",
    y1: "36",
    x2: "40",
    y2: "196",
    stroke: "var(--ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "190",
    y: "214",
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--ink-muted)"
  }, "Time (years)"), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "116",
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--ink-muted)",
    transform: "rotate(-90,16,116)"
  }, "Measurement"), /*#__PURE__*/React.createElement("line", {
    x1: X(0),
    y1: Y(cA),
    x2: X(29),
    y2: Y(mA * 29 + cA),
    stroke: TEAL,
    strokeWidth: "3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: X(W0) - 4,
    y1: Y(mW * (W0 - 0.4) + cW),
    x2: X(W1) + 4,
    y2: Y(mW * (W1 + 0.4) + cW),
    stroke: CORAL,
    strokeWidth: "3.5",
    strokeLinecap: "round"
  }), pts.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      i = _ref4[0],
      v = _ref4[1];
    var inW = i >= W0 && i <= W1;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: X(i),
      cy: Y(v),
      r: inW ? 4.5 : 3.5,
      fill: inW ? CORAL : "var(--ink-muted)",
      stroke: inW ? "#1b1a17" : "none",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: "46",
    y1: "16",
    x2: "66",
    y2: "16",
    stroke: TEAL,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "72",
    y: "20",
    fontSize: "12",
    fill: "var(--ink)"
  }, "All 30 years: rising"), /*#__PURE__*/React.createElement("line", {
    x1: "200",
    y1: "16",
    x2: "220",
    y2: "16",
    stroke: CORAL,
    strokeWidth: "3.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "226",
    y: "20",
    fontSize: "12",
    fill: "var(--ink)"
  }, "6 picked: falling")));
}
function Section2(_ref5) {
  var progress = _ref5.progress,
    setProgress = _ref5.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "8.2 Pseudoscience"), /*#__PURE__*/React.createElement("h1", null, "Science versus pseudoscience"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Pseudoscience wears the costume of science but dodges the one thing that makes science reliable: the willingness to be proved wrong.")), /*#__PURE__*/React.createElement(CherryPickFigure, null), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.1",
    title: "Distinguishing science from pseudoscience",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Science is a method for generating reliable knowledge through observation, hypothesis testing, peer review, and replication. ", /*#__PURE__*/React.createElement(Term, {
    def: "Claims, practices, or systems that appear scientific but lack the key features of reliable science, especially falsifiability."
  }, "Pseudoscience"), " presents the surface features of science without following scientific methods."), /*#__PURE__*/React.createElement("p", null, "The philosopher Karl Popper identified ", /*#__PURE__*/React.createElement(Term, {
    def: "The property of a claim that means it can, in principle, be shown to be false by a specific experiment or observation."
  }, "falsifiability"), " as the central criterion: a scientific claim makes predictions that could be shown to be false. Pseudoscientific claims are typically structured so that no possible evidence could ever refute them. Negative results are explained away by inventing special exceptions."), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Pseudoscience causes real harm"
  }, "People who rely on pseudoscientific remedies instead of evidence-based medicine may delay effective treatment. Understanding the difference protects you and those around you."), /*#__PURE__*/React.createElement(PseudoscienceChecker, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "A psychic claims they can predict the future 'but only when conditions are right.' What makes this claim pseudoscientific?",
    options: ["It is too old to be scientific", "The qualifier means no failed prediction can count as disproof", "Psychics have never been tested in a controlled setting", "The claim is too specific"],
    correct: 1,
    explain: "When any failed prediction can be dismissed as 'wrong conditions,' the claim can never be falsified. Without the possibility of refutation, it is not scientific."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.2",
    title: "Identifying pseudoscientific claims",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Pseudoscientific claims appear in health, wellness, alternative medicine, and paranormal areas. Common warning signs include: undefined jargon such as \"quantum healing\" or \"detoxifying\"; anecdotal testimonials as primary evidence; appeals to ancient wisdom; financial interest in the claim; and conspiracy theories to explain why mainstream science does not support it."), /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The tendency to accept vague, general statements as personally accurate descriptions of oneself (also called the Forer effect)."
  }, "Barnum effect"), " explains why horoscopes and personality readings seem accurate: they use deliberately vague language that almost anyone can identify with. This is not evidence of validity."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Vaccine safety: the evidence"
  }, "Studies covering more than 1.2 million children confirm vaccines do not cause autism. The original 1998 Wakefield study was found to be fraudulent, retracted, and the author lost his medical licence in 2010."), /*#__PURE__*/React.createElement(Interactive, {
    title: "Pseudoscience Spotters: Claim Cards",
    subtitle: "Decide whether each claim is scientific or pseudoscientific.",
    takeaway: "Scientific claims are supported by controlled trials and peer review, while pseudoscientific claims rely on anecdote, undefined terms, or lack any controlled testing."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "c1",
      label: "Homeopathy: no effect in multiple large meta-analyses",
      bucket: "pseudo"
    }, {
      id: "c2",
      label: "Vaccine efficacy: tested in double-blind randomised trials",
      bucket: "sci"
    }, {
      id: "c3",
      label: "Crystals have healing energy (undefined 'energy')",
      bucket: "pseudo"
    }, {
      id: "c4",
      label: "Antibiotic treatment cures H. pylori ulcers (Nobel Prize 2005)",
      bucket: "sci"
    }, {
      id: "c5",
      label: "Power bracelets improve athletic performance (blinded trials show no effect)",
      bucket: "pseudo"
    }],
    buckets: [{
      id: "sci",
      label: "Scientific"
    }, {
      id: "pseudo",
      label: "Pseudoscientific"
    }]
  })), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "Explain why 'it worked for me' is not sufficient evidence that a treatment is effective. Give two alternative explanations for why someone might feel better after using a pseudoscientific remedy.",
    model: "'It worked for me' is a single uncontrolled observation. Two alternative explanations: (1) Placebo effect: belief in a treatment causes genuine physiological improvement. (2) Natural recovery: the illness would have resolved without any intervention. Regression to the mean is also acceptable."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.3",
    title: "Pseudoscience in popular media",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Pseudoscience appears in television advertising, social media wellness influencers, and news articles that misrepresent preliminary research as definitive findings. ", /*#__PURE__*/React.createElement(Term, {
    def: "When news articles give equal weight to two 'sides' of an issue even when the vast majority of evidence supports one side."
  }, "False balance"), " in reporting creates the impression of scientific controversy where there is actually strong consensus."), /*#__PURE__*/React.createElement("p", null, "Social media algorithms reward engagement over accuracy: emotionally arousing misinformation spreads faster than accurate but less dramatic information. A 2018 MIT study of Twitter found that false news reached 1,500 people about six times faster than true news. Being aware of this helps you pause before sharing."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Lateral reading"
  }, "Professional fact-checkers use lateral reading: opening new tabs to search for information about a source before reading its content. This is faster and more reliable than reading the source deeply first."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "A news headline says: 'New study suggests coffee prevents Alzheimer's.' The study had 120 participants over three months and was funded by a coffee industry group. What is the strongest reason to treat this claim with caution?",
    options: ["Coffee is a well-studied substance so the finding is likely wrong", "Industry funding creates a conflict of interest and the sample is too small for this type of research", "The headline uses the word 'suggests' rather than 'proves'", "Three months is an adequate time period for Alzheimer's research"],
    correct: 1,
    explain: "Industry funding creates financial incentive to produce positive results, and 120 participants over three months is far too small and short to study a disease that develops over decades."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.4",
    title: "How data can be distorted",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Data can be manipulated not only by fabrication but by selective analysis and misleading presentation. Key methods include: ", /*#__PURE__*/React.createElement(Term, {
    def: "Selecting only the subset of data that supports a desired conclusion while ignoring contradictory data."
  }, "cherry-picking"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "Running many statistical tests until one gives a significant result by chance, then reporting only that test."
  }, "p-hacking"), ", misleading ", /*#__PURE__*/React.createElement(Term, {
    def: "Manipulating graph axes, scale, or visual proportions to exaggerate or minimise differences."
  }, "axis manipulation"), ", and misrepresenting relative versus absolute risk."), /*#__PURE__*/React.createElement("p", null, "A drug that reduces a 5% risk to a 4% risk has a ", /*#__PURE__*/React.createElement(Term, {
    def: "The percentage reduction in risk relative to the original risk. Can make small effects sound large."
  }, "relative risk reduction"), " of 20% (sounds impressive) but an ", /*#__PURE__*/React.createElement(Term, {
    def: "The actual difference in risk between two groups, in percentage points."
  }, "absolute risk reduction"), " of only 1 percentage point. Both are mathematically correct but create very different impressions."), /*#__PURE__*/React.createElement(DataDistortionSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "A pharmaceutical company reports their drug reduces heart attack risk by 33%. The actual data shows: heart attacks in the control group occurred in 3 out of 100 patients; in the drug group, in 2 out of 100. Calculate the absolute risk reduction and explain why the 33% figure may be misleading.",
    model: "Absolute risk reduction = 3% minus 2% = 1 percentage point. The relative risk reduction = 1/3 x 100 = 33%. Both are correct, but the 33% figure makes the benefit sound much larger than it is. In practice, 100 patients must be treated to prevent one additional heart attack (Number Needed to Treat = 100)."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.2.5",
    title: "Determining if a claim is pseudoscientific",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Applying the seven-criterion checklist (falsifiability, controlled testing, peer review, replication, consistent mechanism, honest evidence handling, expert consensus) systematically is more reliable than gut feeling. Gut feeling is susceptible to ", /*#__PURE__*/React.createElement(Term, {
    def: "The tendency to accept information that confirms existing beliefs."
  }, "confirmation bias"), " and other cognitive shortcuts."), /*#__PURE__*/React.createElement("p", null, "A claim can be uncertain and still be scientific, as long as it makes specific, testable predictions. \"We do not yet understand this phenomenon\" is different from pseudoscience: ball lightning was reported for centuries before a physical model was developed, but it was consistently observable by independent witnesses and eventually documented experimentally."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Extraordinary claims require extraordinary evidence"
  }, "The more a claim contradicts established scientific knowledge, the stronger and more rigorous the evidence required before it should be accepted. This is sometimes called the Sagan standard."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "A student argues: 'Mainstream science dismissed continental drift in 1912, so dismissing homeopathy today proves nothing.' What is the key flaw in this analogy?",
    options: ["Continental drift was never dismissed by scientists", "Wegener's hypothesis made specific testable predictions that were later confirmed; homeopathy has been tested in thousands of controlled trials and consistently shows no effect beyond placebo", "Homeopathy is more ancient than continental drift theory", "Scientists always dismiss new ideas initially"],
    correct: 1,
    explain: "Wegener made specific, testable predictions (matching geological features, fossils) that were confirmed by later evidence. Homeopathy has been tested extensively under controlled conditions and consistently fails. The situations are not comparable."
  }))));
}

/* ================================================================
   SECTION 8.3 -- Large Datasets and Scientific Argumentation
   INTERACTIVES:
     - ScatterPlotLab: interactive scatter plot with draggable line of best fit and live r estimate
     - CorrelationCausationSorter: sort scenarios by correlation type
     - DescriptiveStatsCalculator: editable dataset with live mean/median/range
   ================================================================ */

function DescriptiveStatsCalc() {
  var defaultValues = "72 68 75 80 71 69 73 74 70 95";
  var _useState15 = useState(defaultValues),
    _useState16 = _slicedToArray(_useState15, 2),
    raw = _useState16[0],
    setRaw = _useState16[1];
  var nums = useMemo(function () {
    return raw.split(/[\s,]+/).map(Number).filter(function (n) {
      return !isNaN(n) && n > 0 && n < 200;
    });
  }, [raw]);
  var sorted = useMemo(function () {
    return _toConsumableArray(nums).sort(function (a, b) {
      return a - b;
    });
  }, [nums]);
  var mean = nums.length ? nums.reduce(function (a, b) {
    return a + b;
  }, 0) / nums.length : null;
  var median = nums.length ? nums.length % 2 === 0 ? (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2 : sorted[Math.floor(nums.length / 2)] : null;
  var min = nums.length ? sorted[0] : null;
  var max = nums.length ? sorted[sorted.length - 1] : null;
  var range = nums.length ? max - min : null;
  var variance = nums.length > 1 ? nums.reduce(function (s, x) {
    return s + Math.pow(x - mean, 2);
  }, 0) / (nums.length - 1) : null;
  var sd = variance !== null ? Math.sqrt(variance) : null;
  var svgW = 320,
    svgH = 80,
    pad = 20;
  var plotW = svgW - 2 * pad;
  var toX = function toX(v) {
    return pad + (v - (min || 0)) / (max - min || 1) * plotW;
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Descriptive Statistics Calculator",
    subtitle: "Type your own numbers (space or comma separated) to see mean, median, range, and standard deviation update live. The dot plot shows the distribution.",
    takeaway: "A single outlier can pull the mean far from the typical value while barely affecting the median, which is why both measures should be reported when a dataset might be skewed."
  }, /*#__PURE__*/React.createElement("textarea", {
    value: raw,
    onChange: function onChange(e) {
      return setRaw(e.target.value);
    },
    rows: 2,
    style: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: 8,
      border: "1.5px solid var(--border)",
      fontSize: 14,
      resize: "none",
      background: "var(--surface)",
      color: "var(--ink)",
      fontFamily: "monospace"
    },
    placeholder: "Enter numbers separated by spaces..."
  }), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      fontSize: 12,
      margin: "4px 0 12px"
    }
  }, "n = ", nums.length, " values loaded"), nums.length >= 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: mean !== null ? mean.toFixed(1) : "--",
    label: "Mean"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: median !== null ? median.toFixed(1) : "--",
    label: "Median"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: range !== null ? range.toFixed(0) : "--",
    label: "Range"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: sd !== null ? sd.toFixed(1) : "--",
    label: "Std Dev"
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(svgW, " ").concat(svgH),
    width: "100%",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: pad,
    y1: svgH / 2,
    x2: svgW - pad,
    y2: svgH / 2,
    stroke: "var(--border)",
    strokeWidth: "2"
  }), nums.map(function (v, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: toX(v),
      cy: svgH / 2,
      r: "5",
      fill: "var(--accent)",
      opacity: "0.7"
    });
  }), mean !== null && /*#__PURE__*/React.createElement("line", {
    x1: toX(mean),
    y1: padT,
    x2: toX(mean),
    y2: svgH - 10,
    stroke: "#d97706",
    strokeWidth: "2",
    strokeDasharray: "4,3"
  }, /*#__PURE__*/React.createElement("title", null, "Mean")), median !== null && /*#__PURE__*/React.createElement("line", {
    x1: toX(median),
    y1: 10,
    x2: toX(median),
    y2: svgH - 10,
    stroke: "#0d9488",
    strokeWidth: "2",
    strokeDasharray: "4,3"
  }, /*#__PURE__*/React.createElement("title", null, "Median")), /*#__PURE__*/React.createElement("text", {
    x: toX(min),
    y: svgH - 2,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, min), /*#__PURE__*/React.createElement("text", {
    x: toX(max),
    y: svgH - 2,
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, max), /*#__PURE__*/React.createElement("text", {
    x: toX(mean),
    y: 12,
    textAnchor: "middle",
    fontSize: "9",
    fill: "#d97706"
  }, "Mean"), /*#__PURE__*/React.createElement("text", {
    x: toX(median),
    y: 22,
    textAnchor: "middle",
    fontSize: "9",
    fill: "#0d9488"
  }, "Median"))));
}

// Compute Pearson r for two arrays
function pearsonR(xs, ys) {
  if (xs.length < 2) return 0;
  var n = xs.length;
  var mx = xs.reduce(function (a, b) {
    return a + b;
  }, 0) / n;
  var my = ys.reduce(function (a, b) {
    return a + b;
  }, 0) / n;
  var num = xs.reduce(function (s, x, i) {
    return s + (x - mx) * (ys[i] - my);
  }, 0);
  var den = Math.sqrt(xs.reduce(function (s, x) {
    return s + Math.pow(x - mx, 2);
  }, 0) * ys.reduce(function (s, y) {
    return s + Math.pow(y - my, 2);
  }, 0));
  return den === 0 ? 0 : num / den;
}
function ScatterPlotLab() {
  var datasets = {
    temp_elec: {
      label: "Temperature vs Electricity demand",
      xLabel: "Avg daily temp (°C)",
      yLabel: "Electricity demand (GWh)",
      points: [[12, 3.1], [15, 2.9], [18, 2.8], [22, 3.2], [26, 3.8], [30, 4.6], [33, 5.1], [35, 5.5], [28, 4.1], [20, 3.0], [24, 3.5], [16, 2.8], [38, 6.0], [14, 3.0], [31, 4.9]]
    },
    sleep_fatigue: {
      label: "Sleep hours vs Fatigue score",
      xLabel: "Sleep (hours)",
      yLabel: "Fatigue score (1-10)",
      points: [[5, 8], [6, 7], [7, 5], [8, 4], [9, 3], [5.5, 7.5], [6.5, 6], [7.5, 4.5], [8.5, 3.5], [10, 2], [4.5, 9], [6, 6.5], [8, 4], [7, 5.5], [9.5, 2.5]]
    },
    random: {
      label: "Shoe size vs Maths score (no real link)",
      xLabel: "Shoe size",
      yLabel: "Maths score (%)",
      points: [[7, 55], [8, 72], [9, 48], [10, 81], [11, 63], [7.5, 44], [9.5, 78], [8.5, 69], [10.5, 52], [12, 88], [6, 61], [11.5, 47], [8, 75], [9, 67], [10, 58]]
    }
  };
  var _useState17 = useState("temp_elec"),
    _useState18 = _slicedToArray(_useState17, 2),
    dsKey = _useState18[0],
    setDsKey = _useState18[1];
  var ds = datasets[dsKey];
  var svgW = 380,
    svgH = 280;
  var padL = 52,
    padR = 20,
    padT = 20,
    padB = 44;
  var plotW = svgW - padL - padR;
  var plotH = svgH - padT - padB;
  var xs = ds.points.map(function (p) {
    return p[0];
  });
  var ys = ds.points.map(function (p) {
    return p[1];
  });
  var xMin = Math.min.apply(Math, _toConsumableArray(xs)) - 1;
  var xMax = Math.max.apply(Math, _toConsumableArray(xs)) + 1;
  var yMin = Math.min.apply(Math, _toConsumableArray(ys)) - 1;
  var yMax = Math.max.apply(Math, _toConsumableArray(ys)) + 1;
  var toSvgX = function toSvgX(x) {
    return padL + (x - xMin) / (xMax - xMin) * plotW;
  };
  var toSvgY = function toSvgY(y) {
    return padT + (1 - (y - yMin) / (yMax - yMin)) * plotH;
  };
  var r = useMemo(function () {
    return pearsonR(xs, ys);
  }, [dsKey]);

  // Line of best fit via least squares
  var mx = xs.reduce(function (a, b) {
    return a + b;
  }, 0) / xs.length;
  var my = ys.reduce(function (a, b) {
    return a + b;
  }, 0) / ys.length;
  var slope = xs.reduce(function (s, x, i) {
    return s + (x - mx) * (ys[i] - my);
  }, 0) / xs.reduce(function (s, x) {
    return s + Math.pow(x - mx, 2);
  }, 0);
  var intercept = my - slope * mx;

  // Clip the best-fit line to the plot area (shorten it along x rather than squashing y)
  var lineX1 = xMin,
    lineX2 = xMax;
  if (slope !== 0) {
    var xa = (yMin - intercept) / slope,
      xb = (yMax - intercept) / slope;
    lineX1 = Math.max(xMin, Math.min(xa, xb));
    lineX2 = Math.min(xMax, Math.max(xa, xb));
  }
  var lineY1 = slope * lineX1 + intercept;
  var lineY2 = slope * lineX2 + intercept;
  var rStrength = Math.abs(r) > 0.7 ? "strong" : Math.abs(r) > 0.4 ? "moderate" : "weak";
  var rDirection = r > 0.05 ? "positive" : r < -0.05 ? "negative" : "no";
  var rColour = Math.abs(r) > 0.7 ? "#0d9488" : Math.abs(r) > 0.4 ? "#d97706" : "#94a3b8";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Scatter Plot Explorer",
    subtitle: "Switch between datasets to see how correlation strength and direction change. The line of best fit is calculated automatically.",
    takeaway: "The correlation coefficient r measures both the direction and strength of a linear relationship; values near +1 or -1 indicate a strong relationship while a value near 0 indicates no linear relationship."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 12
    }
  }, Object.entries(datasets).map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
      k = _ref7[0],
      d = _ref7[1];
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      className: "btn ".concat(dsKey === k ? "btn-accent" : "btn-ghost"),
      onClick: function onClick() {
        return setDsKey(k);
      },
      style: {
        fontSize: 13
      }
    }, d.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(svgW, " ").concat(svgH),
    width: "100%",
    style: {
      maxWidth: svgW
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: padL,
    y: padT,
    width: plotW,
    height: plotH,
    fill: "var(--surface)",
    stroke: "var(--border)",
    strokeWidth: "1"
  }), [0, 0.25, 0.5, 0.75, 1].map(function (t) {
    var xv = xMin + t * (xMax - xMin);
    var yv = yMin + t * (yMax - yMin);
    return /*#__PURE__*/React.createElement("g", {
      key: t
    }, /*#__PURE__*/React.createElement("line", {
      x1: toSvgX(xv),
      y1: padT,
      x2: toSvgX(xv),
      y2: padT + plotH,
      stroke: "var(--border)",
      strokeWidth: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: toSvgX(xv),
      y: padT + plotH + 14,
      textAnchor: "middle",
      fontSize: "10",
      fill: "var(--ink-muted)"
    }, xv.toFixed(1)), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: toSvgY(yv),
      x2: padL + plotW,
      y2: toSvgY(yv),
      stroke: "var(--border)",
      strokeWidth: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 4,
      y: toSvgY(yv) + 4,
      textAnchor: "end",
      fontSize: "10",
      fill: "var(--ink-muted)"
    }, yv.toFixed(1)));
  }), /*#__PURE__*/React.createElement("line", {
    x1: toSvgX(lineX1),
    y1: toSvgY(Math.max(yMin, Math.min(yMax, lineY1))),
    x2: toSvgX(lineX2),
    y2: toSvgY(Math.max(yMin, Math.min(yMax, lineY2))),
    stroke: rColour,
    strokeWidth: "2.5",
    strokeDasharray: "6,3"
  }), ds.points.map(function (p, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: toSvgX(p[0]),
      cy: toSvgY(p[1]),
      r: "5",
      fill: "var(--accent)",
      stroke: "white",
      strokeWidth: "1.5",
      opacity: "0.85"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: padL + plotW / 2,
    y: svgH - 4,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, ds.xLabel), /*#__PURE__*/React.createElement("text", {
    x: 14,
    y: padT + plotH / 2,
    textAnchor: "middle",
    fontSize: "11",
    fill: "var(--ink-muted)",
    transform: "rotate(-90, 14, ".concat(padT + plotH / 2, ")")
  }, ds.yLabel))), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: r.toFixed(2),
    label: "Correlation (r)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: rStrength,
    label: "Strength"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: rDirection,
    label: "Direction"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0,
      textAlign: "center",
      marginTop: 8
    }
  }, rDirection !== "no" ? /*#__PURE__*/React.createElement(React.Fragment, null, "r = ", r.toFixed(2), " indicates a ", rStrength, " ", rDirection, " linear relationship between the two variables.") : /*#__PURE__*/React.createElement(React.Fragment, null, "r = ", r.toFixed(2), " indicates no linear relationship between the two variables.")));
}
function CorrelationCausationSorter() {
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Correlation or Causation?",
    subtitle: "Sort each scenario into the correct category based on whether the relationship is likely causal, a confound, reverse causation, or spurious.",
    takeaway: "Correlation alone does not establish causation; a third confounding variable, reverse causation, or pure coincidence can all produce a correlation where no true causal link exists."
  }, /*#__PURE__*/React.createElement(MatchBuckets, {
    items: [{
      id: "s1",
      label: "Ice cream sales and drowning deaths both rise in summer",
      bucket: "confound"
    }, {
      id: "s2",
      label: "Smoking causes lung cancer (confirmed by large cohort studies and a known mechanism)",
      bucket: "causal"
    }, {
      id: "s3",
      label: "Students who attend more tutoring have lower test marks",
      bucket: "reverse"
    }, {
      id: "s4",
      label: "Nicolas Cage films per year correlated with pool drownings 1999-2009",
      bucket: "spurious"
    }, {
      id: "s5",
      label: "Shoe size and reading ability in children (both increase with age)",
      bucket: "confound"
    }, {
      id: "s6",
      label: "Vaccine dose and antibody level (dose-response confirmed)",
      bucket: "causal"
    }],
    buckets: [{
      id: "causal",
      label: "Causal"
    }, {
      id: "confound",
      label: "Confounding variable"
    }, {
      id: "reverse",
      label: "Reverse causation"
    }, {
      id: "spurious",
      label: "Spurious"
    }]
  }));
}
function AustralianRainfallSVG() {
  var cities = [{
    name: "Darwin",
    mm: 1727
  }, {
    name: "Brisbane",
    mm: 1153
  }, {
    name: "Sydney",
    mm: 1215
  }, {
    name: "Melbourne",
    mm: 648
  }, {
    name: "Hobart",
    mm: 626
  }, {
    name: "Perth",
    mm: 869
  }];
  var maxMm = 1800;
  var svgW = 400,
    svgH = 200,
    padL = 60,
    padR = 16,
    padT = 20,
    padB = 40;
  var plotW = svgW - padL - padR;
  var plotH = svgH - padT - padB;
  var barW = plotW / cities.length * 0.6;
  return /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "Mean annual rainfall for selected Australian cities. Darwin receives almost three times as much rain as Hobart. Data sourced from Bureau of Meteorology averages."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(svgW, " ").concat(svgH),
    width: "100%",
    style: {
      maxWidth: svgW
    }
  }, [0, 500, 1000, 1500].map(function (v) {
    var y = padT + plotH - v / maxMm * plotH;
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: y,
      x2: svgW - padR,
      y2: y,
      stroke: "var(--border)",
      strokeWidth: "0.7"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 4,
      y: y + 4,
      textAnchor: "end",
      fontSize: "9",
      fill: "var(--ink-muted)"
    }, v));
  }), cities.map(function (c, i) {
    var x = padL + (i + 0.5) * (plotW / cities.length) - barW / 2;
    var h = c.mm / maxMm * plotH;
    var y = padT + plotH - h;
    return /*#__PURE__*/React.createElement("g", {
      key: c.name
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: barW,
      height: h,
      fill: "var(--accent)",
      rx: "3",
      opacity: "0.85"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + barW / 2,
      y: padT + plotH + 14,
      textAnchor: "middle",
      fontSize: "9",
      fill: "var(--ink)"
    }, c.name), /*#__PURE__*/React.createElement("text", {
      x: x + barW / 2,
      y: y - 3,
      textAnchor: "middle",
      fontSize: "9",
      fontWeight: "700",
      fill: "var(--ink)"
    }, c.mm));
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 44,
    y: padT + plotH / 2,
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)",
    transform: "rotate(-90, ".concat(padL - 44, ", ").concat(padT + plotH / 2, ")")
  }, "Rainfall (mm/yr)")));
}
var padT = 20;
function Section3(_ref8) {
  var progress = _ref8.progress,
    setProgress = _ref8.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "8.3 Large Datasets and Scientific Argumentation"), /*#__PURE__*/React.createElement("h1", null, "Making sense of big data"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "A single measurement tells you almost nothing. A million measurements, properly analysed, can reveal trends that reshape our understanding of the world.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/correlation.png",
    caption: "Two variables rising together \u2014 but does one cause the other?"
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.1",
    title: "Features, collection, and uses of large datasets",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A collection of data containing many records and often many variables, generated from systematic measurement, observation, or recording over time or across a population."
  }, "large dataset"), " is characterised by volume (many records), variety (multiple variable types: numerical, categorical, geographic, temporal), and sometimes velocity (continuous real-time updating). Digital technology transformed data collection: sensors, satellites, and electronic records now generate billions of observations where humans once collected thousands."), /*#__PURE__*/React.createElement("p", null, "In Australia, the ", /*#__PURE__*/React.createElement(Term, {
    def: "Australia's national statistical agency, which conducts the Census and produces economic and social data."
  }, "Australian Bureau of Statistics (ABS)"), ", the Bureau of Meteorology (BOM), and the Australian Institute of Health and Welfare (AIHW) maintain publicly available large datasets used by scientists, policymakers, and the public."), /*#__PURE__*/React.createElement(AustralianRainfallSVG, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "BOM has over 100 years of climate data"
  }, "The Bureau of Meteorology maintains records from hundreds of weather stations across Australia going back to the 1800s. This allows scientists to detect long-term trends in temperature and rainfall that would be invisible in any short study."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "What is 'data cleaning' in the context of large datasets?",
    options: ["Deleting all data that contradicts your hypothesis", "Identifying and correcting or removing errors such as missing values, impossible values, or duplicate records", "Converting data from one unit to another", "Reducing the dataset size to make it easier to work with"],
    correct: 1,
    explain: "Data cleaning ensures that errors in the raw data do not distort statistical results. It includes removing impossible values, fixing formatting inconsistencies, and handling missing data."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.2",
    title: "Using large datasets to develop and test a question",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "In data science, scientists often explore what a publicly available dataset contains before deciding what question it can answer. This requires committing to the question before running the analysis: choosing the question after seeing which one \"works\" is a form of ", /*#__PURE__*/React.createElement(Term, {
    def: "Running many analyses and reporting only the one that produces a significant result."
  }, "p-hacking"), " that inflates false positives."), /*#__PURE__*/React.createElement("p", null, "The process involves: examining the dataset's variables; identifying a comparison that could be investigated; forming a question with a clear ", /*#__PURE__*/React.createElement(Term, {
    def: "The variable that is changed or compared between groups."
  }, "independent variable"), " and ", /*#__PURE__*/React.createElement(Term, {
    def: "The variable that is measured as the outcome."
  }, "dependent variable"), "; and then testing it using descriptive statistics, graphs, or correlations."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Temperature anomaly"
  }, "A temperature anomaly is the difference between the measured temperature for a period and the long-term average for the same period (usually the 1961 to 1990 baseline). A positive anomaly means it was warmer than average."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "A student has access to ABS data with columns for 'state' and 'Year 12 completion rate (%)' from 2000 to 2022. Write two specific, investigable questions they could ask using these variables.",
    model: "(1) Has the mean Year 12 completion rate across all states increased between 2000 and 2022? (Independent: year; dependent: completion rate.) (2) Is there a difference in Year 12 completion rates between states in 2022? (Independent: state; dependent: completion rate.)"
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.3",
    title: "Descriptive analysis of a large dataset",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The process of summarising and describing the main features of a dataset using measures of central tendency, spread, and visualisation."
  }, "Descriptive analysis"), " is always the first step before any statistical inference. It uses measures of ", /*#__PURE__*/React.createElement(Term, {
    def: "Measures that describe a typical value: mean, median, and mode."
  }, "central tendency"), " (mean, median, mode) and measures of ", /*#__PURE__*/React.createElement(Term, {
    def: "Measures that describe how spread out values are: range, interquartile range, standard deviation."
  }, "spread"), " (range, standard deviation) to summarise the data."), /*#__PURE__*/React.createElement("p", null, "Mean household income in Australia is higher than ", /*#__PURE__*/React.createElement(Term, {
    def: "The middle value when all values are ordered from smallest to largest."
  }, "median"), " household income because a small number of very high incomes pull the mean upward. In such cases, the median better represents the typical household's experience."), /*#__PURE__*/React.createElement(DescriptiveStatsCalc, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 3,
    question: "A dataset has a mean of 50 and a standard deviation of 20. Another dataset has a mean of 50 and a standard deviation of 2. What can you conclude?",
    options: ["The first dataset is more reliable", "Both datasets have identical distributions", "The first dataset has values spread much more widely around the mean than the second", "The second dataset has more outliers"],
    correct: 2,
    explain: "Standard deviation measures how spread out values are around the mean. A SD of 20 means values are widely scattered; a SD of 2 means values are clustered tightly around the mean, even though both means are identical."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.4",
    title: "Benefits of descriptive statistical analysis",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Raw data rarely communicates clearly. Descriptive statistics transform raw data into summaries that make patterns visible, communicable, and comparable. The key benefits are: identifying central tendency, identifying variability, spotting outliers, comparing groups or time periods, and communicating to a non-specialist audience through visualisations."), /*#__PURE__*/React.createElement("p", null, "Graphs are among the most powerful tools for pattern recognition. A line graph of temperature over 100 years shows a warming trend that no table of numbers would reveal intuitively. A bar chart comparing mean rainfall across cities makes differences obvious at a glance. However, graphs can also mislead (see descriptor 8.2.4), so reading them critically is equally important."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Outliers matter"
  }, "An outlier is a data point far from the main cluster. It may be a genuine extreme event (important scientifically), a measurement error (which should be corrected), or a data entry mistake. Always identify outliers before calculating means."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 4,
    question: "A researcher calculates that the mean income in a town is $85,000 per year. Another researcher visits and finds most people earn between $45,000 and $60,000. Explain using descriptive statistics why both could be correct, and what additional statistic would reveal the full picture.",
    model: "Both are correct if income is highly skewed. A few very high earners could pull the mean far above where most people earn. The median income would better represent the typical resident and would likely be in the $45,000 to $60,000 range. A standard deviation or income distribution histogram would reveal the extent of skew."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.5",
    title: "Univariate and bivariate analysis",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "Analysis that examines one variable at a time to describe its distribution, central tendency, and spread."
  }, "Univariate analysis"), " answers \"what does this variable look like?\" using means, ranges, and histograms. ", /*#__PURE__*/React.createElement(Term, {
    def: "Analysis that examines the relationship between two variables simultaneously."
  }, "Bivariate analysis"), " asks \"how does one variable change as the other changes?\" using scatter plots and the ", /*#__PURE__*/React.createElement(Term, {
    def: "A number between -1 and +1 that measures the strength and direction of a linear relationship between two variables."
  }, "correlation coefficient (r)"), "."), /*#__PURE__*/React.createElement("p", null, "r ranges from -1 to +1. A value near +1 indicates a strong positive correlation; near -1, a strong negative correlation; near 0, no linear relationship. Importantly, correlation does not establish causation (covered in 8.3.6). The ", /*#__PURE__*/React.createElement(Term, {
    def: "The straight line that best summarises the overall direction and slope of a scatter plot relationship."
  }, "line of best fit"), " is placed on a scatter plot to show the trend and allow predictions."), /*#__PURE__*/React.createElement(ScatterPlotLab, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "Four studies report these correlation coefficients: r = -0.12, r = +0.67, r = -0.88, r = +0.34. Which shows the strongest relationship?",
    options: ["r = +0.67", "r = -0.12", "r = -0.88", "r = +0.34"],
    correct: 2,
    explain: "The strength of a correlation is determined by the absolute value (distance from zero), not the direction. |-0.88| = 0.88 is closest to 1, indicating the strongest relationship."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.6",
    title: "Correlation versus causation",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Two variables are ", /*#__PURE__*/React.createElement(Term, {
    def: "When changes in one variable are statistically associated with changes in another, but one does not necessarily cause the other."
  }, "correlated"), " when changes in one are associated with changes in the other. A ", /*#__PURE__*/React.createElement(Term, {
    def: "When changes in one variable directly and reliably produce changes in the other."
  }, "causal"), " relationship exists when one variable directly produces changes in the other. Correlation does not imply causation: three situations can produce correlation without it."), /*#__PURE__*/React.createElement("p", null, "First, a ", /*#__PURE__*/React.createElement(Term, {
    def: "A third variable that influences both measured variables, creating an apparent correlation between them (also called a lurking variable)."
  }, "confounding variable"), " causes both to change together (hot weather causes both ice cream sales and drowning deaths). Second, the direction of causality may be reversed (people in hospital are more often unwell, but the illness causes the hospital stay, not the other way round). Third, the correlation may be purely coincidental: Nicolas Cage film appearances per year correlated with swimming pool drowning deaths from 1999 to 2009 with no causal mechanism whatsoever."), /*#__PURE__*/React.createElement(CorrelationCausationSorter, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 6,
    question: "A study finds that people who drink more coffee have lower rates of depression. Explain why the conclusion 'drinking coffee prevents depression' is flawed. Give two alternative explanations.",
    model: "The conclusion is flawed because the study is observational and cannot establish causation. Two alternatives: (1) Reverse causation: depressed people may drink less coffee due to reduced motivation. (2) Confounding: coffee drinkers may have more social interactions in cafes, or higher employment rates, which reduce depression independently of coffee itself."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.3.7",
    title: "Large datasets and validation of scientific findings",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A single experiment with a small sample can produce a misleading result due to chance. Large datasets enable scientists to test whether a pattern holds across thousands or millions of observations. The link between smoking and lung cancer required large epidemiological datasets tracking hundreds of thousands of people over decades before the statistical strength and consistency across populations established the scientific consensus."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The range within which the true population value is likely to fall, given the sample data, at a specified level of confidence."
  }, "Confidence intervals"), " express uncertainty: a wider interval reflects more uncertainty (usually from a smaller sample). ", /*#__PURE__*/React.createElement(Term, {
    def: "The probability of observing a result at least as extreme as the one found, if the null hypothesis were true."
  }, "P-values"), " are frequently misinterpreted: p less than 0.05 does not mean there is a 95% chance the hypothesis is true. With very large datasets, even tiny and practically irrelevant differences produce p less than 0.05. This is why ", /*#__PURE__*/React.createElement(Term, {
    def: "The magnitude of a difference or relationship, showing how large it is in practice rather than just whether it exists."
  }, "effect size"), " must always accompany statistical significance."), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Statistically significant does not mean practically important"
  }, "A drug that lowers blood pressure by 0.3 mmHg with p less than 0.001 (from a trial of 100,000 patients) is a real effect, but is clinically meaningless. Always ask: how large is the effect, not just whether it is detectable."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 7,
    question: "A clinical trial of 20 patients finds a drug reduces blood pressure by a mean of 8 mmHg (95% CI: 1 to 15 mmHg). A second trial of 2,000 patients finds a mean reduction of 2 mmHg (95% CI: 1.5 to 2.5 mmHg). Which result is more useful for clinical decision-making, and why?",
    options: ["The first: the mean reduction of 8 mmHg is larger and more impressive", "The second: the large sample size means the narrow confidence interval precisely characterises the true effect, revealing it is likely too small to be clinically meaningful", "Both are equally useful because both show a reduction", "Neither: you need p-values to decide"],
    correct: 1,
    explain: "The second trial's large sample size produces a very narrow confidence interval (1.5 to 2.5 mmHg), meaning the true effect is precisely estimated. A 2 mmHg reduction is clinically small; standard medications reduce pressure by 10 to 15 mmHg. The first trial's wide CI (1 to 15 mmHg) means the true effect is highly uncertain despite the impressive mean."
  }))));
}

/* ================================================================
   SECTION 8.4 -- Data Science 2 in Context
   INTERACTIVES:
     - EvidenceDecisionTool: step-through evidence-based decision framework
     - PredictionTool: linear extrapolation from a trend model
   ================================================================ */

function PredictionTool() {
  var baseData = [{
    year: 1910,
    anomaly: -0.4
  }, {
    year: 1930,
    anomaly: -0.1
  }, {
    year: 1950,
    anomaly: 0.0
  }, {
    year: 1970,
    anomaly: 0.1
  }, {
    year: 1990,
    anomaly: 0.3
  }, {
    year: 2010,
    anomaly: 0.7
  }, {
    year: 2023,
    anomaly: 1.1
  }];
  var _useState19 = useState(2040),
    _useState20 = _slicedToArray(_useState19, 2),
    predictYear = _useState20[0],
    setPredictYear = _useState20[1];
  var xs = baseData.map(function (d) {
    return d.year;
  });
  var ys = baseData.map(function (d) {
    return d.anomaly;
  });
  var mx = xs.reduce(function (a, b) {
    return a + b;
  }, 0) / xs.length;
  var my = ys.reduce(function (a, b) {
    return a + b;
  }, 0) / ys.length;
  var slope = xs.reduce(function (s, x, i) {
    return s + (x - mx) * (ys[i] - my);
  }, 0) / xs.reduce(function (s, x) {
    return s + Math.pow(x - mx, 2);
  }, 0);
  var intercept = my - slope * mx;
  var predicted = slope * predictYear + intercept;
  var svgW = 380,
    svgH = 220;
  var pL = 52,
    pR = 20,
    pT = 20,
    pB = 40;
  var plotW = svgW - pL - pR;
  var plotH = svgH - pT - pB;
  var xMin = 1900,
    xMax = 2080;
  var yMin = -0.8,
    yMax = 2.0;
  var toX = function toX(x) {
    return pL + (x - xMin) / (xMax - xMin) * plotW;
  };
  var toY = function toY(y) {
    return pT + (1 - (y - yMin) / (yMax - yMin)) * plotH;
  };
  var lineXs = [1900, 2080];
  var lineYs = lineXs.map(function (x) {
    return slope * x + intercept;
  });
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Climate Prediction Tool",
    subtitle: "This tool fits a linear trend to Australian temperature anomaly data and lets you extrapolate to any year. Use it to explore the model's prediction, and to think about what limitations extrapolation has.",
    takeaway: "A linear trend fitted to historical data can suggest future values, but extrapolation becomes less reliable the further you go beyond the data, and simple models can miss important real-world complexity."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(svgW, " ").concat(svgH),
    width: "100%",
    style: {
      maxWidth: svgW
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: pL,
    y: pT,
    width: plotW,
    height: plotH,
    fill: "var(--surface)",
    stroke: "var(--border)",
    strokeWidth: "1"
  }), [1920, 1940, 1960, 1980, 2000, 2020, 2040, 2060].map(function (yr) {
    return /*#__PURE__*/React.createElement("g", {
      key: yr
    }, /*#__PURE__*/React.createElement("line", {
      x1: toX(yr),
      y1: pT,
      x2: toX(yr),
      y2: pT + plotH,
      stroke: "var(--border)",
      strokeWidth: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: toX(yr),
      y: pT + plotH + 13,
      textAnchor: "middle",
      fontSize: "9",
      fill: "var(--ink-muted)"
    }, yr));
  }), [-0.5, 0, 0.5, 1.0, 1.5].map(function (v) {
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: pL,
      y1: toY(v),
      x2: pL + plotW,
      y2: toY(v),
      stroke: "var(--border)",
      strokeWidth: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: pL - 4,
      y: toY(v) + 4,
      textAnchor: "end",
      fontSize: "9",
      fill: "var(--ink-muted)"
    }, v.toFixed(1)));
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(lineXs[0]),
    y1: toY(lineYs[0]),
    x2: toX(lineXs[1]),
    y2: toY(lineYs[1]),
    stroke: "#d97706",
    strokeWidth: "2",
    strokeDasharray: "7,4"
  }), predictYear > 2023 && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: toX(predictYear),
    y1: pT,
    x2: toX(predictYear),
    y2: toY(predicted),
    stroke: "#0d9488",
    strokeWidth: "1.5",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: pL,
    y1: toY(predicted),
    x2: toX(predictYear),
    y2: toY(predicted),
    stroke: "#0d9488",
    strokeWidth: "1.5",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: toX(predictYear),
    cy: toY(predicted),
    r: "7",
    fill: "#0d9488",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("text", {
    x: toX(predictYear) + 10,
    y: toY(predicted) + 4,
    fontSize: "11",
    fontWeight: "700",
    fill: "#0d9488"
  }, predicted.toFixed(2), " \xB0C")), baseData.map(function (d, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: toX(d.year),
      cy: toY(d.anomaly),
      r: "5",
      fill: "var(--accent)",
      stroke: "white",
      strokeWidth: "1.5",
      opacity: "0.9"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(2023),
    y1: pT + 2,
    x2: toX(2023),
    y2: pT + plotH,
    stroke: "#e74c3c",
    strokeWidth: "1",
    strokeDasharray: "3,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: toX(2023) + 4,
    y: pT + 14,
    fontSize: "9",
    fill: "#e74c3c"
  }, "2023"), /*#__PURE__*/React.createElement("text", {
    x: pL - 40,
    y: pT + plotH / 2,
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)",
    transform: "rotate(-90, ".concat(pL - 40, ", ").concat(pT + plotH / 2, ")")
  }, "Temp anomaly (\xB0C)"), /*#__PURE__*/React.createElement("text", {
    x: pL + plotW / 2,
    y: svgH - 2,
    textAnchor: "middle",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "Year"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Predict year",
    min: 2024,
    max: 2080,
    step: 1,
    value: predictYear,
    onChange: setPredictYear,
    unit: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: predictYear,
    label: "Prediction year"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: predicted.toFixed(2) + " °C",
    label: "Model prediction"
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Extrapolation has real limits"
  }, "This is a simple linear model. Real climate modelling uses far more complex physics-based simulations, not just trend lines. A straight-line extrapolation works reasonably over short ranges, but becomes less reliable further from the data. Always state the assumptions and limitations of your model."));
}
function EvidenceDecisionSim() {
  var steps = [{
    num: 1,
    label: "Define the issue",
    content: "A local council asks: 'Should we reduce traffic on School Street to improve air quality for students and residents?'",
    action: "Write a specific, bounded question. Identify what decision you need the data to inform."
  }, {
    num: 2,
    label: "Gather data",
    content: "EPA monitoring data shows mean PM2.5 on School Street = 28 micrograms per cubic metre. WHO 24-hour guideline = 15 micrograms per cubic metre. The alternative route currently reads 12 micrograms per cubic metre.",
    action: "Check your data source for authority, accuracy, currency, and purpose."
  }, {
    num: 3,
    label: "Analyse data",
    content: "School Street PM2.5 is 87% above the WHO guideline. Three schools and two aged care facilities are on the street. Peak readings occur between 8 am and 9 am, matching school drop-off.",
    action: "Calculate means, identify outliers, and visualise the data. Compare to relevant benchmarks."
  }, {
    num: 4,
    label: "Evaluate evidence",
    content: "The data support the claim that air quality on School Street poses a health risk to vulnerable populations. The evidence is from a credible government source and the pattern is clear.",
    action: "Use the CER framework. Does the data support the recommended decision?"
  }, {
    num: 5,
    label: "Assess implications",
    content: "Diverting traffic may increase PM2.5 on the alternative route above safe levels. Local businesses on School Street may lose customers. Cyclists and pedestrians would benefit. Monitoring both streets after the change would be needed.",
    action: "Who benefits? Who may be disadvantaged? What unintended consequences could arise? What monitoring is needed?"
  }];
  var _useState21 = useState(0),
    _useState22 = _slicedToArray(_useState21, 2),
    step = _useState22[0],
    setStep = _useState22[1];
  var s = steps[step];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Evidence-Based Decision Framework",
    subtitle: "Step through the five stages of evidence-based decision making using an air quality example.",
    takeaway: "Sound evidence-based decisions require a clearly defined question, credible data, honest analysis, and consideration of who benefits and who might be disadvantaged before acting."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 14
    }
  }, steps.map(function (st, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "btn ".concat(step === i ? "btn-accent" : "btn-ghost"),
      onClick: function onClick() {
        return setStep(i);
      },
      style: {
        fontSize: 13
      }
    }, st.num, ". ", st.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--accent-soft)",
      color: "#1b1a17",
      borderRadius: 12,
      padding: "14px 16px",
      border: "1.5px solid var(--accent)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Step ", s.num, ": ", s.label), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 10
    }
  }, s.content), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 8,
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", null, "What to do:"), " ", s.action))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: function onClick() {
      return setStep(Math.max(0, step - 1));
    },
    disabled: step === 0
  }, "Previous"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: function onClick() {
      return setStep(Math.min(steps.length - 1, step + 1));
    },
    disabled: step === steps.length - 1
  }, "Next step")));
}
function Section4(_ref9) {
  var progress = _ref9.progress,
    setProgress = _ref9.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "8.4 Data Science 2 in Context"), /*#__PURE__*/React.createElement("h1", null, "Data for real decisions"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Every data skill you have built comes together here: take a real issue, gather reliable data, analyse it honestly, and make a decision you can defend.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "8.4.1",
    title: "Using data to make evidence-based decisions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "Using the best available data and scientific knowledge to guide choices, rather than relying on opinion, tradition, or anecdote."
  }, "Evidence-based decision making"), " applies all data skills together: identifying a clear question, evaluating source reliability, analysing data with appropriate statistical tools, distinguishing correlation from causation, and writing a well-reasoned argument that acknowledges uncertainty."), /*#__PURE__*/React.createElement("p", null, "Assessing the implications of a data-based decision means thinking beyond the data. A decision may have intended effects and ", /*#__PURE__*/React.createElement(Term, {
    def: "An effect of a decision that was not planned or anticipated."
  }, "unintended consequences"), ". It may affect different groups differently: a policy that improves average health outcomes may still leave some communities worse off. A critical data scientist acknowledges what the data show clearly, what remains uncertain, who benefits, who may be disadvantaged, and what further monitoring is needed."), /*#__PURE__*/React.createElement(EvidenceDecisionSim, null), /*#__PURE__*/React.createElement(PredictionTool, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Data equity"
  }, "Datasets fairly represent all groups only when all groups are systematically included in data collection. Clinical trials historically enrolled predominantly male participants; drugs approved on this data sometimes had different effects in women. Data equity means checking whose voices are in your dataset and whose are missing."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "A student analyses data on average daily screen time and Year 10 test scores and finds r = -0.61. They conclude: 'Students should limit screen time to improve their test scores.' What is the main flaw in this conclusion?",
    options: ["r = -0.61 means there is no relationship", "The study has too many participants", "Correlation does not establish causation; confounding variables (such as study time) could explain the relationship", "The student should have used the mean instead of the correlation"],
    correct: 2,
    explain: "r = -0.61 shows a moderate negative correlation, not causation. Confounders (e.g. less study time in high-screen-time students) could explain the relationship. A controlled study would be needed to support the causal recommendation."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 2,
    question: "Explain why a data-based recommendation can be justified by evidence and yet still involve a value judgement. Give an example from a public health context.",
    model: "Data can show that an intervention reduces disease incidence. However, implementing it also involves values: how much cost is acceptable? Are restrictions on individual freedom justifiable? Data show that mandatory seatbelt laws reduce road fatalities. The policy decision requires both the effectiveness evidence and a values judgement that public safety justifies limiting individual choice."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 3,
    question: "A council diverts heavy trucks away from a residential street to improve air quality. Identify one intended benefit and two unintended consequences they should monitor after the decision.",
    model: "Intended benefit: reduced PM2.5 on the residential street, improving health for residents and school students. Unintended consequences: (1) the alternative route may see increased PM2.5, affecting residents there; (2) local businesses on the original route may lose customers if passing traffic drops. Both routes should be monitored and data reviewed after a set period."
  }))));
}

/* ================================================================
   MOUNT
   ================================================================ */

mountTopicApp({
  year: 10,
  topicTitle: "Data Science 2",
  branch: "general",
  heroImage: "img/hero.png",
  strand: "Stage 5 · NSW Science",
  accent: "teal",
  storageKey: "y10.datascience2",
  hubHref: "../",
  intro: "In Year 8 you learned to collect and display data. Now you go further: you will ask whether questions are truly investigable, spot pseudoscience in the wild, analyse large real-world datasets using statistics, and use data to make decisions you can justify and defend. These skills matter in science, medicine, policy, and everyday life.",
  glossary: {
    "investigable question": "A question that can be answered by collecting measurable, observable evidence involving at least one variable that can be manipulated or measured.",
    "hypothesis": "A specific, testable, falsifiable prediction about the relationship between variables, typically written as 'if X then Y because Z'.",
    "falsifiability": "The property of a claim that means it can, in principle, be shown to be false by a specific experiment or observation.",
    "peer review": "A process in which independent experts scrutinise a study's methods, analysis, and conclusions before publication.",
    "replication": "Repeating a study independently to check whether the same results are obtained. Essential for building scientific confidence.",
    "pseudoscience": "Claims, practices, or systems that appear scientific but lack the key features of reliable science, especially falsifiability and honest evidence handling.",
    "CER framework": "Claim, Evidence, Reasoning: a structured approach to writing scientific arguments.",
    "validity": "In the context of sources: whether the information is accurate and supported by appropriate evidence.",
    "reliability": "In the context of sources: whether the source is consistent and trustworthy, with appropriate expertise in the subject.",
    "SIFT method": "Stop, Investigate the source, Find better coverage, Trace claims to their original source: a framework for evaluating online information.",
    "cherry-picking": "Selecting only the data points or studies that support a desired conclusion while ignoring contradictory evidence.",
    "p-hacking": "Running many statistical tests until one produces a significant result by chance, then reporting only that test.",
    "absolute risk reduction": "The actual difference in risk between two groups, expressed in percentage points.",
    "relative risk reduction": "The percentage reduction in risk relative to the original risk. Can make small effects sound large.",
    "large dataset": "A collection of data containing many records and often many variables, generated through systematic measurement or observation.",
    "descriptive analysis": "The process of summarising and describing the main features of a dataset using measures of central tendency, spread, and visualisation.",
    "mean": "The arithmetic average: sum of all values divided by the number of values.",
    "median": "The middle value when all values are ordered from smallest to largest. More robust to outliers than the mean.",
    "standard deviation": "A measure of how spread out values are around the mean. A larger SD means more variability.",
    "univariate analysis": "Analysis that examines one variable at a time to describe its distribution, central tendency, and spread.",
    "bivariate analysis": "Analysis that examines the relationship between two variables simultaneously, using scatter plots and correlation.",
    "correlation coefficient (r)": "A number from -1 to +1 measuring the strength and direction of a linear relationship between two variables.",
    "line of best fit": "The straight line that best summarises the direction and slope of the relationship in a scatter plot.",
    "confounding variable": "A third variable that influences both measured variables, creating an apparent correlation between them (also called a lurking variable).",
    "causation": "A relationship where changes in one variable directly and reliably produce changes in another variable.",
    "effect size": "The magnitude of a difference or relationship, indicating how large it is in practice, not just whether it is statistically detectable.",
    "confidence interval": "The range within which the true population value is likely to fall, at a specified level of confidence (usually 95%).",
    "p-value": "The probability of obtaining a result at least as extreme as the one observed, if the null hypothesis were true.",
    "evidence-based decision making": "Using the best available data and scientific knowledge to guide choices, rather than relying on opinion, tradition, or anecdote.",
    "data equity": "The principle that datasets fairly represent all groups in a population, including marginalised or underrepresented communities.",
    "Barnum effect": "The tendency to accept vague, general statements as personally accurate descriptions of oneself (also called the Forer effect).",
    "false balance": "When news articles give equal weight to two sides of an issue even when the vast majority of evidence supports one side, creating a false impression of scientific controversy."
  },
  sections: [{
    id: "8.1",
    label: "Investigating Questions",
    accent: "teal",
    points: ["8.1.1", "8.1.2", "8.1.3", "8.1.4", "8.1.5", "8.1.6"],
    blurb: "How to ask sharp, testable questions and construct evidence-based arguments.",
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section1, p);
    }
  }, {
    id: "8.2",
    label: "Pseudoscience",
    accent: "teal",
    points: ["8.2.1", "8.2.2", "8.2.3", "8.2.4", "8.2.5"],
    blurb: "Distinguishing science from pseudoscience and spotting data distortion.",
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section2, p);
    }
  }, {
    id: "8.3",
    label: "Large Datasets",
    accent: "teal",
    points: ["8.3.1", "8.3.2", "8.3.3", "8.3.4", "8.3.5", "8.3.6", "8.3.7"],
    blurb: "Collecting, analysing, and interpreting large datasets. Correlation vs causation.",
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section3, p);
    }
  }, {
    id: "8.4",
    label: "Data in Context",
    accent: "teal",
    points: ["8.4.1"],
    blurb: "Applying data science skills to make evidence-based decisions about real issues.",
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section4, p);
    }
  }]
});
