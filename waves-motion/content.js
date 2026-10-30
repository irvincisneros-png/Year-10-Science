/* Generated from content.jsx by tools/build.js. Edit the .jsx, not this file. */
"use strict";

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

/* Canvas cannot resolve CSS var(...) strings, so read the computed value instead. */
var cssv = function cssv(el, name, fb) {
  try {
    var v = getComputedStyle(el).getPropertyValue(name).trim();
    return v || fb;
  } catch (e) {
    return fb;
  }
};

/* =========================================================
   SECTION 7.1 INTERACTIVES
   ========================================================= */

/* Wave simulator: canvas drawing of a transverse wave with
   amplitude, frequency, and wavelength sliders */
function WaveSim() {
  var canvasRef = useRef(null);
  var _useState = useState(40),
    _useState2 = _slicedToArray(_useState, 2),
    amplitude = _useState2[0],
    setAmplitude = _useState2[1];
  var _useState3 = useState(2),
    _useState4 = _slicedToArray(_useState3, 2),
    frequency = _useState4[0],
    setFrequency = _useState4[1];
  var _useState5 = useState("transverse"),
    _useState6 = _slicedToArray(_useState5, 2),
    waveType = _useState6[0],
    setWaveType = _useState6[1];
  var animRef = useRef(null);
  var timeRef = useRef(0);
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var midY = H / 2;
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cssv(canvas, "--surface", "#f8f9fa");
      ctx.fillRect(0, 0, W, H);

      // Draw equilibrium line
      ctx.strokeStyle = cssv(canvas, "--border", "#dee2e6");
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(W, midY);
      ctx.stroke();
      ctx.setLineDash([]);
      if (waveType === "transverse") {
        // Draw transverse wave (sine curve)
        ctx.strokeStyle = cssv(canvas, "--accent", "#1d4ed8");
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (var x = 0; x <= W; x++) {
          var phase = x / W * frequency * 2 * Math.PI - t * frequency;
          var y = midY - amplitude * Math.sin(phase);
          if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Label crest and trough
        var crestX = W / (frequency * 4);
        ctx.fillStyle = cssv(canvas, "--accent", "#1d4ed8");
        ctx.font = "12px sans-serif";
        ctx.fillText("crest", crestX - 16, midY - amplitude - 8);
        ctx.fillText("trough", crestX * 3 - 20, midY + amplitude + 14);

        // Wavelength arrow
        var wl = W / frequency;
        var arrowY = H - 12;
        ctx.strokeStyle = "#6b7280";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(20, arrowY);
        ctx.lineTo(20 + wl, arrowY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, arrowY - 5);
        ctx.lineTo(20, arrowY + 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20 + wl, arrowY - 5);
        ctx.lineTo(20 + wl, arrowY + 5);
        ctx.stroke();
        ctx.fillStyle = "#6b7280";
        ctx.fillText("wavelength (lambda)", 20 + wl / 2 - 50, arrowY - 6);

        // Amplitude arrow
        ctx.beginPath();
        ctx.moveTo(8, midY);
        ctx.lineTo(8, midY - amplitude);
        ctx.stroke();
        ctx.fillText("A", 2, midY - amplitude / 2);
      } else {
        // Draw longitudinal wave (compressions and rarefactions using dots)
        var numParticles = 60;
        var spacing = W / numParticles;
        ctx.fillStyle = cssv(canvas, "--accent", "#1d4ed8");
        for (var i = 0; i < numParticles; i++) {
          var baseX = i * spacing + spacing / 2;
          var displacement = amplitude / 2 * Math.sin(baseX / W * frequency * 2 * Math.PI - t * frequency);
          var _x = baseX + displacement;
          ctx.beginPath();
          ctx.arc(_x, midY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        // Labels
        ctx.fillStyle = cssv(canvas, "--accent", "#1d4ed8");
        ctx.font = "12px sans-serif";
        var compX = W / (frequency * 4);
        ctx.fillText("compression", compX - 38, midY + 24);
        ctx.fillText("rarefaction", compX * 3 - 34, midY + 24);
      }
    }
    function animate() {
      timeRef.current += 0.04;
      draw(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [amplitude, frequency, waveType]);
  var wavelength = (600 / frequency).toFixed(0);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Wave simulator",
    subtitle: "Adjust the sliders and watch the wave update live.",
    takeaway: "Increasing frequency shortens the wavelength while the wave speed stays constant, directly demonstrating the wave equation v = f x lambda; transverse and longitudinal waves differ in how their particles move relative to the wave direction."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      flexWrap: "wrap",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "transverse",
      label: "Transverse"
    }, {
      value: "longitudinal",
      label: "Longitudinal"
    }],
    value: waveType,
    onChange: setWaveType
  })), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 600,
    height: 200,
    style: {
      width: "100%",
      maxWidth: 600,
      height: "auto",
      borderRadius: "0.5rem",
      marginTop: "0.75rem"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Amplitude",
    min: 10,
    max: 55,
    value: amplitude,
    onChange: setAmplitude,
    unit: " px"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Frequency (waves)",
    min: 1,
    max: 4,
    step: 0.5,
    value: frequency,
    onChange: setFrequency,
    unit: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: amplitude,
    label: "Amplitude (px)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: frequency,
    label: "Frequency (waves)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: wavelength,
    label: "Wavelength (px)"
  })), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginBottom: 0
    }
  }, "Notice: when frequency increases, wavelength decreases. This is the wave equation v = f x lambda in action."));
}

/* EM spectrum explorer */
function EMExplorer() {
  var bands = [{
    name: "Radio",
    color: "#6366f1",
    freq: "10⁴ to 10⁹ Hz",
    wl: ">30 cm",
    energy: "Very low",
    uses: "Radio and TV broadcasting, MRI, aircraft communication",
    ionising: false
  }, {
    name: "Microwave",
    color: "#8b5cf6",
    freq: "10⁹ to 3x10¹¹ Hz",
    wl: "1 mm to 30 cm",
    energy: "Low",
    uses: "Cooking, radar, WiFi, satellite links, mobile phones",
    ionising: false
  }, {
    name: "Infrared",
    color: "#d97706",
    freq: "3x10¹¹ to 4.3x10¹⁴ Hz",
    wl: "700 nm to 1 mm",
    energy: "Moderate",
    uses: "Remote controls, thermal cameras, physiotherapy",
    ionising: false
  }, {
    name: "Visible",
    color: "#059669",
    freq: "4.3x10¹⁴ to 7.5x10¹⁴ Hz",
    wl: "400 to 700 nm",
    energy: "Moderate",
    uses: "Human vision, photography, fibre optics",
    ionising: false
  }, {
    name: "Ultraviolet",
    color: "#3b82f6",
    freq: "7.5x10¹⁴ to 3x10¹⁶ Hz",
    wl: "10 to 400 nm",
    energy: "High",
    uses: "Sterilisation, fluorescence, forensics",
    ionising: true
  }, {
    name: "X-ray",
    color: "#ef4444",
    freq: "3x10¹⁶ to 3x10¹⁹ Hz",
    wl: "0.01 to 10 nm",
    energy: "Very high",
    uses: "Medical imaging, security scanning",
    ionising: true
  }, {
    name: "Gamma",
    color: "#dc2626",
    freq: ">3x10¹⁹ Hz",
    wl: "<0.01 nm",
    energy: "Extreme",
    uses: "Cancer treatment, sterilisation",
    ionising: true
  }];
  var _useState7 = useState(3),
    _useState8 = _slicedToArray(_useState7, 2),
    selected = _useState8[0],
    setSelected = _useState8[1];
  var b = bands[selected];
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "EM spectrum explorer",
    subtitle: "Click a band to see its properties and uses.",
    takeaway: "Across the EM spectrum, frequency and energy per photon increase from radio waves to gamma rays, and only the higher-energy bands (UV, X-ray, gamma) are ionising and capable of damaging living cells."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "4px",
      flexWrap: "wrap",
      marginBottom: "1rem"
    }
  }, bands.map(function (band, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: band.name,
      onClick: function onClick() {
        return setSelected(i);
      },
      style: {
        background: selected === i ? band.color : "var(--surface)",
        color: selected === i ? "#fff" : "var(--ink, #1e293b)",
        border: "2px solid ".concat(band.color),
        borderRadius: "0.4rem",
        padding: "0.3rem 0.6rem",
        cursor: "pointer",
        fontWeight: selected === i ? 700 : 400,
        fontSize: "0.85rem",
        transition: "all 0.15s"
      }
    }, band.name);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: b.color + "18",
      border: "2px solid ".concat(b.color),
      borderRadius: "0.75rem",
      padding: "1rem 1.25rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.6rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: b.color,
      color: "#fff",
      padding: "0.15rem 0.75rem",
      borderRadius: "1rem",
      fontWeight: 700,
      fontSize: "1rem"
    }
  }, b.name), b.ionising && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "0.15rem 0.6rem",
      borderRadius: "1rem",
      fontSize: "0.8rem",
      fontWeight: 600
    }
  }, "Ionising"), !b.ionising && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#dcfce7",
      color: "#15803d",
      padding: "0.15rem 0.6rem",
      borderRadius: "1rem",
      fontSize: "0.8rem",
      fontWeight: 600
    }
  }, "Non-ionising")), /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      gap: "0.5rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "muted",
    style: {
      fontSize: "0.78rem"
    }
  }, "Frequency"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, b.freq)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "muted",
    style: {
      fontSize: "0.78rem"
    }
  }, "Wavelength"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, b.wl)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "muted",
    style: {
      fontSize: "0.78rem"
    }
  }, "Energy per photon"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, b.energy)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "muted",
    style: {
      fontSize: "0.78rem"
    }
  }, "Common uses"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, b.uses)))), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginTop: "0.6rem",
      marginBottom: 0,
      fontSize: "0.85rem"
    }
  }, "Moving left to right: frequency increases, wavelength decreases, energy per photon increases."));
}

/* Wave equation calculator */
function WaveCalcSim() {
  var _useState9 = useState(340),
    _useState0 = _slicedToArray(_useState9, 2),
    v = _useState0[0],
    setV = _useState0[1];
  var _useState1 = useState(440),
    _useState10 = _slicedToArray(_useState1, 2),
    f = _useState10[0],
    setF = _useState10[1];
  var lambda = (v / f).toFixed(3);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Wave equation calculator",
    subtitle: "v = f x lambda. Set speed and frequency; see the wavelength.",
    takeaway: "The wave equation v = f x lambda links speed, frequency, and wavelength so that if any two quantities are known the third can be calculated."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Wave speed (v)",
    min: 1,
    max: 3000,
    step: 1,
    value: v,
    onChange: setV,
    unit: " m/s"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Frequency (f)",
    min: 1,
    max: 20000,
    step: 1,
    value: f,
    onChange: setF,
    unit: " Hz"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: v,
    label: "Speed (m/s)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: f,
    label: "Frequency (Hz)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: lambda,
    label: "Wavelength (m)"
  })), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Equation"
  }, "lambda = v / f = ", v, " / ", f, " = ", lambda, " m"));
}

/* =========================================================
   SECTION 7.2 INTERACTIVES
   ========================================================= */

/* Sound wave visualiser: amplitude = loudness, frequency = pitch */
function SoundVizSim() {
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var timeRef = useRef(0);
  var _useState11 = useState(40),
    _useState12 = _slicedToArray(_useState11, 2),
    loudness = _useState12[0],
    setLoudness = _useState12[1];
  var _useState13 = useState(3),
    _useState14 = _slicedToArray(_useState13, 2),
    pitch = _useState14[0],
    setPitch = _useState14[1];
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var midY = H / 2;
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cssv(canvas, "--surface", "#f8f9fa");
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = cssv(canvas, "--border", "#dee2e6");
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(W, midY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (var x = 0; x <= W; x++) {
        var phase = x / W * pitch * 2 * Math.PI - t;
        var y = midY - loudness * Math.sin(phase);
        if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Oscilloscope-style labels
      ctx.fillStyle = "#6b7280";
      ctx.font = "11px sans-serif";
      ctx.fillText("Amplitude (loudness)", 8, 14);
      ctx.fillText("Frequency (pitch) = " + pitch + " waves", 8, H - 6);
    }
    function animate() {
      timeRef.current += 0.05;
      draw(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [loudness, pitch]);
  var pitchLabel = pitch <= 1 ? "Very low" : pitch <= 2 ? "Low" : pitch <= 3 ? "Medium" : pitch <= 4 ? "High" : "Very high";
  var loudLabel = loudness < 20 ? "Whisper" : loudness < 40 ? "Quiet" : loudness < 55 ? "Moderate" : "Loud";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Sound wave visualiser",
    subtitle: "Loudness depends on amplitude; pitch depends on frequency.",
    takeaway: "Loudness and pitch are controlled by two completely independent wave properties: amplitude determines how loud a sound is, while frequency determines how high or low the pitch is."
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 600,
    height: 140,
    style: {
      width: "100%",
      maxWidth: 600,
      height: "auto",
      borderRadius: "0.5rem",
      marginBottom: "0.75rem"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Amplitude (loudness)",
    min: 5,
    max: 65,
    value: loudness,
    onChange: setLoudness,
    unit: ""
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Frequency (pitch)",
    min: 1,
    max: 6,
    step: 0.5,
    value: pitch,
    onChange: setPitch,
    unit: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: loudLabel,
    label: "Loudness"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: pitchLabel,
    label: "Pitch"
  })));
}

/* Doppler effect simulator */
function DopplerSim() {
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var timeRef = useRef(0);
  var _useState15 = useState(0),
    _useState16 = _slicedToArray(_useState15, 2),
    sourceSpeed = _useState16[0],
    setSourceSpeed = _useState16[1];
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var cy = H / 2;
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cssv(canvas, "--surface", "#f8f9fa");
      ctx.fillRect(0, 0, W, H);
      var srcX = W / 2 + Math.sin(t * 0.7) * (W * 0.25);
      var v_sound = 5;
      var v_source = sourceSpeed / 100 * v_sound * 0.8;

      // Draw concentric circular wavefronts
      var numRings = 5;
      for (var i = 1; i <= numRings; i++) {
        var age = i * 1.2;
        var r = age * v_sound;
        var cx_emit = srcX - age * v_source * Math.sign(Math.cos(t * 0.7));
        var alpha = 1 - i / (numRings + 1);
        ctx.strokeStyle = "rgba(59, 130, 246, ".concat(alpha, ")");
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx_emit, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Source dot
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(srcX, cy, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("src", srcX, cy + 3);
      ctx.textAlign = "left";

      // Observer labels
      ctx.fillStyle = cssv(canvas, "--ink", "#374151");
      ctx.font = "11px sans-serif";
      ctx.fillText("Observer (ahead): higher pitch", 8, 18);
      ctx.fillText("Observer (behind): lower pitch", 8, H - 6);
    }
    function animate() {
      timeRef.current += 0.04;
      draw(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [sourceSpeed]);
  var pitchAhead = sourceSpeed === 0 ? "Normal" : sourceSpeed < 40 ? "Slightly higher" : "Much higher";
  var pitchBehind = sourceSpeed === 0 ? "Normal" : sourceSpeed < 40 ? "Slightly lower" : "Much lower";
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Doppler effect simulator",
    subtitle: "The moving source bunches wavefronts ahead and stretches them behind.",
    takeaway: "When a wave source moves towards an observer the wavefronts bunch together so the observed frequency is higher than the source frequency; when it moves away the wavefronts spread out and the observed frequency is lower."
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 600,
    height: 180,
    style: {
      width: "100%",
      maxWidth: 600,
      height: "auto",
      borderRadius: "0.5rem",
      marginBottom: "0.75rem"
    }
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Source speed",
    min: 0,
    max: 80,
    value: sourceSpeed,
    onChange: setSourceSpeed,
    unit: "%"
  }), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: pitchAhead,
    label: "Pitch heard ahead"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: pitchBehind,
    label: "Pitch heard behind"
  })));
}

/* Ultrasound depth calculator */
function UltrasoundCalc() {
  var _useState17 = useState(40),
    _useState18 = _slicedToArray(_useState17, 2),
    echoTime = _useState18[0],
    setEchoTime = _useState18[1];
  var v = 1540;
  var depth = (v * echoTime * 0.000001 / 2 * 100).toFixed(1);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Ultrasound depth calculator",
    subtitle: "depth = (v x t) / 2, where v = 1540 m/s in soft tissue.",
    takeaway: "Medical ultrasound calculates tissue depth from the echo return time using depth = (v x t) / 2, dividing by two because the pulse travels to the boundary and back."
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Echo return time (microseconds)",
    min: 5,
    max: 200,
    step: 1,
    value: echoTime,
    onChange: setEchoTime,
    unit: " \xB5s"
  }), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: echoTime + " µs",
    label: "Echo time"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: depth + " cm",
    label: "Tissue depth"
  })), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "How it works"
  }, "The sound travels to the boundary and back, so we divide by 2. depth = (1540 x ", echoTime, " x 10\u207B\u2076) / 2 = ", (depth / 100).toFixed(3), " m = ", depth, " cm."));
}

/* =========================================================
   SECTION 7.3 INTERACTIVES
   ========================================================= */

/* Light properties demo: interactive SVG showing reflection and refraction */
function LightPropertiesSim() {
  var _useState19 = useState("reflection"),
    _useState20 = _slicedToArray(_useState19, 2),
    mode = _useState20[0],
    setMode = _useState20[1];
  var _useState21 = useState(35),
    _useState22 = _slicedToArray(_useState21, 2),
    angle = _useState22[0],
    setAngle = _useState22[1];
  var cx = 120;
  var cy = 120;
  var surfaceY = cy;

  // Incident ray from top-left
  var rad = angle * Math.PI / 180;
  var incX1 = cx - 80 * Math.sin(rad);
  var incY1 = cy - 80 * Math.cos(rad);

  // Reflected ray (same angle, other side)
  var refX2 = cx + 80 * Math.sin(rad);
  var refY2 = cy - 80 * Math.cos(rad);

  // Refracted ray (snell's law approximation: n_glass ~ 1.5)
  var n = 1.5;
  var sinRef = Math.sin(rad) / n;
  var refAngle = Math.asin(sinRef);
  var refrX2 = cx + 80 * Math.sin(refAngle);
  var refrY2 = cy + 80 * Math.cos(refAngle);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Reflection and refraction of light",
    subtitle: "Adjust the angle of incidence to see how light behaves.",
    takeaway: "For reflection the angle of incidence always equals the angle of reflection; for refraction light bends towards the normal when entering a denser medium because it slows down."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row"
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: [{
      value: "reflection",
      label: "Reflection"
    }, {
      value: "refraction",
      label: "Refraction"
    }],
    value: mode,
    onChange: setMode
  })), /*#__PURE__*/React.createElement(Slider, {
    label: "Angle of incidence",
    min: 5,
    max: 75,
    value: angle,
    onChange: setAngle,
    unit: "\xB0"
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 240",
    width: "100%",
    style: {
      maxWidth: 320,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "120",
    width: "240",
    height: "120",
    fill: "#bfdbfe",
    opacity: "0.4",
    rx: "0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "120",
    x2: "240",
    y2: "120",
    stroke: "#93c5fd",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: "8",
    y: "115",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, "air"), /*#__PURE__*/React.createElement("text", {
    x: "8",
    y: "135",
    fontSize: "10",
    fill: "var(--ink-muted)"
  }, mode === "refraction" ? "glass (n=1.5)" : "mirror"), /*#__PURE__*/React.createElement("line", {
    x1: cx,
    y1: "40",
    x2: cx,
    y2: "200",
    stroke: "#9ca3af",
    strokeWidth: "1",
    strokeDasharray: "5,4"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 4,
    y: "52",
    fontSize: "9",
    fill: "var(--ink-muted)"
  }, "normal"), /*#__PURE__*/React.createElement("line", {
    x1: incX1,
    y1: incY1,
    x2: cx,
    y2: cy,
    stroke: "#f59e0b",
    strokeWidth: "2.5",
    markerEnd: "url(#arrowY)"
  }), /*#__PURE__*/React.createElement("text", {
    x: incX1 - 30,
    y: incY1,
    fontSize: "10",
    fill: "#d97706"
  }, "incident"), mode === "reflection" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: cx,
    y1: cy,
    x2: refX2,
    y2: refY2,
    stroke: "#10b981",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: refX2 + 4,
    y: refY2,
    fontSize: "10",
    fill: "#059669"
  }, "reflected")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: cx,
    y1: cy,
    x2: refrX2,
    y2: refrY2,
    stroke: "#8b5cf6",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: refrX2 + 4,
    y: refrY2 + 8,
    fontSize: "10",
    fill: "#7c3aed"
  }, "refracted")), /*#__PURE__*/React.createElement("path", {
    d: "M ".concat(cx, " ").concat(cy - 30, " A 30 30 0 0 0 ").concat(cx - 30 * Math.sin(rad), " ").concat(cy - 30 * Math.cos(rad)),
    fill: "none",
    stroke: "#f59e0b",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx - 28,
    y: cy - 22,
    fontSize: "10",
    fill: "#d97706"
  }, angle, "\xB0"), mode === "reflection" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M ".concat(cx + 30 * Math.sin(rad), " ").concat(cy - 30 * Math.cos(rad), " A 30 30 0 0 0 ").concat(cx, " ").concat(cy - 30),
    fill: "none",
    stroke: "#10b981",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 14,
    y: cy - 22,
    fontSize: "10",
    fill: "#059669"
  }, angle, "\xB0")), mode === "refraction" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M ".concat(cx, " ").concat(cy + 30, " A 30 30 0 0 0 ").concat(cx + 30 * Math.sin(refAngle), " ").concat(cy + 30 * Math.cos(refAngle)),
    fill: "none",
    stroke: "#8b5cf6",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx + 14,
    y: cy + 28,
    fontSize: "10",
    fill: "#7c3aed"
  }, (refAngle * 180 / Math.PI).toFixed(0), "\xB0")), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "arrowY",
    markerWidth: "8",
    markerHeight: "8",
    refX: "6",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L8,3 z",
    fill: "#f59e0b"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: angle + "°",
    label: "Angle of incidence"
  }), mode === "reflection" ? /*#__PURE__*/React.createElement(Stat, {
    value: angle + "°",
    label: "Angle of reflection"
  }) : /*#__PURE__*/React.createElement(Stat, {
    value: (Math.asin(Math.sin(angle * Math.PI / 180) / 1.5) * 180 / Math.PI).toFixed(0) + "°",
    label: "Angle of refraction"
  })), mode === "reflection" && /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Law of reflection"
  }, "Angle of incidence = angle of reflection (", angle, "\xB0 = ", angle, "\xB0). Both measured from the normal."), mode === "refraction" && /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Refraction"
  }, "Light bends towards the normal when entering a denser medium. The angle of refraction is smaller than the angle of incidence."));
}

/* EM Spectrum and Stars temperature explorer */
function StarTempExplorer() {
  var _useState23 = useState(5800),
    _useState24 = _slicedToArray(_useState23, 2),
    temp = _useState24[0],
    setTemp = _useState24[1];
  var peakNm = Math.round(2900000 / temp);
  var colour = "#fff";
  var region = "";
  if (peakNm < 400) {
    colour = "#a855f7";
    region = "Ultraviolet (very hot star)";
  } else if (peakNm < 450) {
    colour = "#7c3aed";
    region = "Violet visible";
  } else if (peakNm < 490) {
    colour = "#2563eb";
    region = "Blue visible";
  } else if (peakNm < 550) {
    colour = "#10b981";
    region = "Green visible (like the Sun)";
  } else if (peakNm < 620) {
    colour = "#f59e0b";
    region = "Yellow-orange visible";
  } else if (peakNm < 700) {
    colour = "#ef4444";
    region = "Red visible (cool star)";
  } else {
    colour = "#dc2626";
    region = "Infrared (very cool star)";
  }
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Star temperature explorer",
    subtitle: "Use Wien's law: peak wavelength x temperature = 2.9 x 10^6 nm K.",
    takeaway: "A star's surface temperature determines the colour of its peak emission: hotter stars appear blue-white and cooler stars appear red, following Wien's displacement law."
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Star surface temperature (K)",
    min: 2000,
    max: 40000,
    step: 100,
    value: temp,
    onChange: setTemp,
    unit: " K"
  }), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: temp.toLocaleString() + " K",
    label: "Surface temperature"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: peakNm + " nm",
    label: "Peak wavelength"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      margin: "0.75rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "radial-gradient(circle, ".concat(colour, ", ").concat(colour, "88)"),
      boxShadow: "0 0 24px 8px ".concat(colour, "55"),
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Peak emission region:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)",
      fontWeight: 700
    }
  }, region))), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Wien's displacement law"
  }, "Peak wavelength = 2,900,000 / ", temp.toLocaleString(), " = ", peakNm, " nm. Hotter stars appear blue-white; cooler stars appear red."));
}

/* =========================================================
   SECTION 7.4 INTERACTIVES
   ========================================================= */

/* Distance-time / velocity-time graph generator */
function MotionGraphSim() {
  var _useState25 = useState("accelerate"),
    _useState26 = _slicedToArray(_useState25, 2),
    scenario = _useState26[0],
    setScenario = _useState26[1];
  var canvasRef = useRef(null);
  var scenarios = {
    accelerate: {
      label: "Accelerating car",
      dtPoints: [[0, 0], [1, 5], [2, 20], [3, 45], [4, 80]],
      vtPoints: [[0, 0], [1, 10], [2, 20], [3, 30], [4, 40]],
      desc: "Distance-time curve bends upward (acceleration). Velocity-time line rises steadily."
    },
    constant: {
      label: "Constant speed",
      dtPoints: [[0, 0], [1, 20], [2, 40], [3, 60], [4, 80]],
      vtPoints: [[0, 20], [1, 20], [2, 20], [3, 20], [4, 20]],
      desc: "Distance-time is a straight line (constant speed). Velocity-time is horizontal."
    },
    stop: {
      label: "Decelerating to stop",
      dtPoints: [[0, 0], [1, 35], [2, 60], [3, 75], [4, 80]],
      vtPoints: [[0, 40], [1, 30], [2, 20], [3, 10], [4, 0]],
      desc: "Distance-time curve flattens (slowing). Velocity-time line falls to zero."
    },
    stationarythen: {
      label: "Stop then go",
      dtPoints: [[0, 0], [1, 20], [2, 30], [3, 30], [4, 50]],
      vtPoints: [[0, 20], [1, 20], [2, 0], [3, 0], [4, 40]],
      desc: "Distance-time is flat between 2 s and 3 s (stationary). Velocity drops to zero, stays at zero, then rises again."
    }
  };
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var half = W / 2;
    var pad = {
      t: 24,
      b: 36,
      l: 36,
      r: 12
    };
    function drawGraph(offsetX, pts, title, yLabel, lineColor) {
      var gW = half - pad.l - pad.r;
      var gH = H - pad.t - pad.b;
      var x0 = offsetX + pad.l;
      var y0 = pad.t;
      var maxX = 4;
      var maxY = 80;
      ctx.fillStyle = cssv(canvas, "--surface", "#f8f9fa");
      ctx.fillRect(offsetX, 0, half, H);

      // Grid
      ctx.strokeStyle = cssv(canvas, "--border", "#e5e7eb");
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var x = x0 + i / maxX * gW;
        ctx.beginPath();
        ctx.moveTo(x, y0);
        ctx.lineTo(x, y0 + gH);
        ctx.stroke();
      }
      for (var _i = 0; _i <= 4; _i++) {
        var y = y0 + (1 - _i / 4) * gH;
        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x0 + gW, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = cssv(canvas, "--ink", "#1e293b");
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0, y0 + gH);
      ctx.lineTo(x0 + gW, y0 + gH);
      ctx.stroke();

      // Line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      pts.forEach(function (_ref, i) {
        var _ref2 = _slicedToArray(_ref, 2),
          t = _ref2[0],
          d = _ref2[1];
        var px = x0 + t / maxX * gW;
        var py = y0 + (1 - d / maxY) * gH;
        if (i === 0) ctx.moveTo(px, py);else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Dots
      ctx.fillStyle = lineColor;
      pts.forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          t = _ref4[0],
          d = _ref4[1];
        var px = x0 + t / maxX * gW;
        var py = y0 + (1 - d / maxY) * gH;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Labels
      ctx.fillStyle = cssv(canvas, "--ink", "#1e293b");
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(title, offsetX + half / 2, 14);
      ctx.font = "10px sans-serif";
      ctx.fillText("Time (s)", x0 + gW / 2, H - 4);
      ctx.save();
      ctx.translate(offsetX + 10, y0 + gH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yLabel, 0, 0);
      ctx.restore();
      ctx.textAlign = "left";

      // Axis ticks
      ctx.fillStyle = "#9ca3af";
      ctx.font = "9px sans-serif";
      for (var _i2 = 0; _i2 <= 4; _i2++) {
        var xp = x0 + _i2 / maxX * gW;
        ctx.textAlign = "center";
        ctx.fillText(_i2, xp, y0 + gH + 12);
      }
      ctx.textAlign = "right";
      for (var _i3 = 0; _i3 <= 4; _i3++) {
        ctx.fillText(_i3 * 20, x0 - 2, y0 + (1 - _i3 / 4) * gH + 4);
      }
      ctx.textAlign = "left";
    }
    ctx.clearRect(0, 0, W, H);
    var s = scenarios[scenario];
    drawGraph(0, s.dtPoints, "Distance-time", "Distance (m)", "#2563eb");
    drawGraph(half, s.vtPoints, "Velocity-time", "Velocity (m/s)", "#dc2626");
  }, [scenario]);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Motion graph generator",
    subtitle: "Choose a scenario to see both graph types side by side.",
    takeaway: "On a distance-time graph the gradient equals speed, while on a velocity-time graph the gradient equals acceleration and the area under the line equals distance travelled."
  }, /*#__PURE__*/React.createElement(SegToggle, {
    options: Object.entries(scenarios).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];
      return {
        value: k,
        label: v.label
      };
    }),
    value: scenario,
    onChange: setScenario
  }), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 600,
    height: 200,
    style: {
      width: "100%",
      maxWidth: 600,
      height: "auto",
      borderRadius: "0.5rem",
      marginTop: "0.75rem"
    }
  }), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Reading the graphs"
  }, scenarios[scenario].desc));
}

/* Newton's second law (F = ma) interactive */
function NewtonSecondSim() {
  var _useState27 = useState(10),
    _useState28 = _slicedToArray(_useState27, 2),
    mass = _useState28[0],
    setMass = _useState28[1];
  var _useState29 = useState(50),
    _useState30 = _slicedToArray(_useState29, 2),
    force = _useState30[0],
    setForce = _useState30[1];
  var accel = (force / mass).toFixed(2);
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var posRef = useRef(0);
  useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    posRef.current = 30;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = cssv(canvas, "--surface", "#f8f9fa");
      ctx.fillRect(0, 0, W, H);

      // Ground
      ctx.fillStyle = "#d1d5db";
      ctx.fillRect(0, H - 20, W, 20);

      // Object (box) - size proportional to mass
      var boxW = Math.max(30, Math.min(80, mass * 3));
      var boxH = 40;
      var boxY = H - 20 - boxH;
      var boxX = posRef.current;
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(boxX, boxY, boxW, boxH);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(mass + " kg", boxX + boxW / 2, boxY + boxH / 2 + 4);

      // Force arrow
      var arrowLen = Math.min(120, force * 0.8);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(boxX + boxW, boxY + boxH / 2);
      ctx.lineTo(boxX + boxW + arrowLen, boxY + boxH / 2);
      ctx.stroke();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.moveTo(boxX + boxW + arrowLen, boxY + boxH / 2 - 6);
      ctx.lineTo(boxX + boxW + arrowLen + 12, boxY + boxH / 2);
      ctx.lineTo(boxX + boxW + arrowLen, boxY + boxH / 2 + 6);
      ctx.closePath();
      ctx.fill();
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("F = " + force + " N", boxX + boxW + arrowLen / 2, boxY + boxH / 2 - 10);

      // Acceleration label
      ctx.fillStyle = cssv(canvas, "--ink", "#374151");
      ctx.textAlign = "left";
      ctx.font = "12px sans-serif";
      ctx.fillText("a = F/m = " + force + "/" + mass + " = " + accel + " m/s²", 8, 20);

      // Animate position
      posRef.current += parseFloat(accel) * 0.15;
      if (posRef.current > W - 40) posRef.current = 30;
      ctx.textAlign = "left";
    }
    function animate() {
      draw();
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return function () {
      return cancelAnimationFrame(animRef.current);
    };
  }, [mass, force, accel]);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Newton's second law (F = ma)",
    subtitle: "Change force and mass to see how acceleration changes.",
    takeaway: "Applying a larger net force to the same mass produces a greater acceleration, and applying the same force to a larger mass produces a smaller acceleration, consistent with F = ma."
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 600,
    height: 110,
    style: {
      width: "100%",
      maxWidth: 600,
      height: "auto",
      borderRadius: "0.5rem",
      marginBottom: "0.75rem"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Mass",
    min: 1,
    max: 50,
    value: mass,
    onChange: setMass,
    unit: " kg"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Net force",
    min: 5,
    max: 200,
    step: 5,
    value: force,
    onChange: setForce,
    unit: " N"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: force + " N",
    label: "Net force"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: mass + " kg",
    label: "Mass"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: accel + " m/s²",
    label: "Acceleration"
  })));
}

/* Net force / free body diagram interactive */
function NetForceSim() {
  var _useState31 = useState(40),
    _useState32 = _slicedToArray(_useState31, 2),
    forceR = _useState32[0],
    setForceR = _useState32[1];
  var _useState33 = useState(15),
    _useState34 = _slicedToArray(_useState33, 2),
    forceL = _useState34[0],
    setForceL = _useState34[1];
  var net = forceR - forceL;
  var dir = net > 0 ? "right" : net < 0 ? "left" : "balanced";
  var absNet = Math.abs(net);
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "Net force diagram",
    subtitle: "Set forces in each direction and find the resultant.",
    takeaway: "When opposing forces are equal the net force is zero and the object is in equilibrium; any imbalance produces a net force and the object accelerates in the direction of that net force."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 90",
    width: "100%",
    style: {
      maxWidth: 380,
      display: "block",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "140",
    y: "25",
    width: "80",
    height: "40",
    rx: "8",
    fill: "#3b82f6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "50",
    textAnchor: "middle",
    fill: "#fff",
    fontSize: "12",
    fontWeight: "700"
  }, "Object"), /*#__PURE__*/React.createElement("line", {
    x1: 140 - Math.min(120, forceL * 1.2),
    y1: "45",
    x2: "140",
    y2: "45",
    stroke: "#ef4444",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "".concat(140 - Math.min(120, forceL * 1.2), ",39 ").concat(140 - Math.min(120, forceL * 1.2), ",51 ").concat(140 - Math.min(120, forceL * 1.2) - 12, ",45"),
    fill: "#ef4444"
  }), /*#__PURE__*/React.createElement("text", {
    x: 140 - Math.min(120, forceL * 1.2) / 2,
    y: "34",
    textAnchor: "middle",
    fill: "#ef4444",
    fontSize: "11"
  }, forceL, " N"), /*#__PURE__*/React.createElement("line", {
    x1: "220",
    y1: "45",
    x2: 220 + Math.min(120, forceR * 1.2),
    y2: "45",
    stroke: "#10b981",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "".concat(220 + Math.min(120, forceR * 1.2), ",39 ").concat(220 + Math.min(120, forceR * 1.2), ",51 ").concat(220 + Math.min(120, forceR * 1.2) + 12, ",45"),
    fill: "#10b981"
  }), /*#__PURE__*/React.createElement("text", {
    x: 220 + Math.min(120, forceR * 1.2) / 2,
    y: "34",
    textAnchor: "middle",
    fill: "#059669",
    fontSize: "11"
  }, forceR, " N")), /*#__PURE__*/React.createElement("div", {
    className: "ctrl-row",
    style: {
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Force RIGHT",
    min: 0,
    max: 80,
    value: forceR,
    onChange: setForceR,
    unit: " N"
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Force LEFT",
    min: 0,
    max: 80,
    value: forceL,
    onChange: setForceL,
    unit: " N"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-readout"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: net > 0 ? "+" + absNet : net < 0 ? "-" + absNet : "0",
    label: "Net force (N)"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: dir === "balanced" ? "Equilibrium" : "Accelerates " + dir,
    label: "Motion"
  })), net === 0 ? /*#__PURE__*/React.createElement(Callout, {
    kind: "success",
    title: "Balanced"
  }, "Net force = 0. Object at rest or constant velocity (Newton's first law).") : /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Unbalanced"
  }, "Net force = ", absNet, " N to the ", dir, ". Object accelerates in that direction."));
}

/* =========================================================
   SECTION 7.5 INTERACTIVES
   ========================================================= */

/* CER argument builder */
function CERBuilder() {
  var _useState35 = useState(""),
    _useState36 = _slicedToArray(_useState35, 2),
    claim = _useState36[0],
    setClaim = _useState36[1];
  var _useState37 = useState(""),
    _useState38 = _slicedToArray(_useState37, 2),
    evidence = _useState38[0],
    setEvidence = _useState38[1];
  var _useState39 = useState(""),
    _useState40 = _slicedToArray(_useState39, 2),
    reasoning = _useState40[0],
    setReasoning = _useState40[1];
  var complete = claim.trim().length > 0 && evidence.trim().length > 0 && reasoning.trim().length > 0;
  var textStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "1.5px solid var(--border, #cbd5e1)",
    borderRadius: "0.5rem",
    background: "var(--surface, #f8f9fa)",
    color: "var(--ink, #1e293b)",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    resize: "vertical",
    minHeight: "60px",
    boxSizing: "border-box"
  };
  return /*#__PURE__*/React.createElement(Interactive, {
    title: "CER argument builder",
    subtitle: "Structure your argument about how waves and motion have changed society.",
    takeaway: "A well-structured scientific argument states a clear claim, backs it up with specific evidence, and explains through reasoning why that evidence supports the claim."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontWeight: 600,
      fontSize: "0.9rem",
      display: "block",
      marginBottom: "0.25rem"
    }
  }, "Claim (your position statement)"), /*#__PURE__*/React.createElement("textarea", {
    style: textStyle,
    value: claim,
    onChange: function onChange(e) {
      return setClaim(e.target.value);
    },
    placeholder: "e.g. The understanding of wave physics has fundamentally transformed medical diagnosis..."
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontWeight: 600,
      fontSize: "0.9rem",
      display: "block",
      marginBottom: "0.25rem"
    }
  }, "Evidence (specific facts or examples)"), /*#__PURE__*/React.createElement("textarea", {
    style: textStyle,
    value: evidence,
    onChange: function onChange(e) {
      return setEvidence(e.target.value);
    },
    placeholder: "e.g. Ultrasound imaging uses sound wave reflection to image internal organs without surgery..."
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontWeight: 600,
      fontSize: "0.9rem",
      display: "block",
      marginBottom: "0.25rem"
    }
  }, "Reasoning (why evidence supports claim)"), /*#__PURE__*/React.createElement("textarea", {
    style: textStyle,
    value: reasoning,
    onChange: function onChange(e) {
      return setReasoning(e.target.value);
    },
    placeholder: "e.g. Because ultrasound is non-ionising it is safer than X-rays, which is why it is used in pregnancy monitoring worldwide..."
  }))), complete && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1rem",
      background: "var(--accent-soft, #dbeafe)",
      color: "#1b1a17",
      borderRadius: "0.75rem",
      padding: "1rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700,
      marginBottom: "0.4rem"
    }
  }, "Your argument:"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 0.3rem"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Claim:"), " ", claim), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 0.3rem"
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Evidence:"), " ", evidence), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Reasoning:"), " ", reasoning)), !complete && /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      marginTop: "0.5rem"
    }
  }, "Fill in all three fields to preview your complete argument."));
}

/* =========================================================
   SECTIONS
   ========================================================= */

function Section71(_ref7) {
  var progress = _ref7.progress,
    setProgress = _ref7.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.1 Common Properties of Waves"), /*#__PURE__*/React.createElement("h1", null, "What are waves?"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Waves carry energy across space and through matter. Here you will explore what all waves have in common and discover how light and sound differ in fundamental ways.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/wave.png",
    alt: "A transverse wave with two crests and two troughs. An arrow above spans one wavelength from crest to crest; an arrow inside a crest marks the amplitude.",
    caption: "A transverse wave. The arrow above spans one wavelength (crest to crest); the arrow inside a crest marks the amplitude."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.1",
    title: "Mechanical waves and electromagnetic waves",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A wave that requires a physical medium (solid, liquid or gas) to travel through."
  }, "mechanical wave"), " needs matter to travel. Sound, water ripples, and seismic waves are all mechanical. Take away the medium and the wave disappears. That is why the vacuum of space is silent: no air means no sound."), /*#__PURE__*/React.createElement("p", null, "An ", /*#__PURE__*/React.createElement(Term, {
    def: "A wave made of oscillating electric and magnetic fields that can travel through a vacuum."
  }, "electromagnetic (EM) wave"), " is completely different. It does not need particles. The electric and magnetic fields that make it up sustain each other as they travel, so light from the Sun crosses 150 million kilometres of almost empty space to reach you. Radio waves, X-rays, and microwaves are all electromagnetic."), /*#__PURE__*/React.createElement("p", null, "The classic demonstration is the bell-jar experiment. A ringing electric bell sits inside a sealed jar. As a vacuum pump removes the air, the sound fades completely even though you can still see the bell vibrating. Restore the air and the sound returns. The light travelling through the glass (an EM wave) was never affected because it needs no medium."), /*#__PURE__*/React.createElement(Figure, {
    num: "1",
    caption: "Mechanical waves need particles; EM waves do not."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 520 90",
    width: "100%",
    style: {
      maxWidth: 520
    }
  }, [["Mechanical Wave", "Needs a medium", "Sound, water ripples", "#bfdbfe"], ["Electromagnetic Wave", "No medium needed", "Light, radio, X-rays", "#d1fae5"]].map(function (_ref8, i) {
    var _ref9 = _slicedToArray(_ref8, 4),
      title = _ref9[0],
      sub = _ref9[1],
      ex = _ref9[2],
      bg = _ref9[3];
    return /*#__PURE__*/React.createElement("g", {
      key: title,
      transform: "translate(".concat(i * 268 + 4, ", 4)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "248",
      height: "80",
      rx: "12",
      fill: bg,
      stroke: "var(--accent-deep,#1d4ed8)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "124",
      y: "26",
      textAnchor: "middle",
      fontSize: "13",
      fontWeight: "700",
      fill: "#1b1a17"
    }, title), /*#__PURE__*/React.createElement("text", {
      x: "124",
      y: "46",
      textAnchor: "middle",
      fontSize: "11",
      fill: "#374151"
    }, sub), /*#__PURE__*/React.createElement("text", {
      x: "124",
      y: "66",
      textAnchor: "middle",
      fontSize: "11",
      fill: "#6b7280"
    }, ex));
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Key difference"
  }, "Mechanical waves die without a medium. EM waves travel through a vacuum at 3 x 10^8 m/s."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 1,
    question: "Which of the following is a mechanical wave?",
    options: ["Radio waves", "Light from a torch", "Sound from a speaker", "X-rays"],
    correct: 2,
    explain: "Sound is a mechanical wave that needs air (a medium) to travel. Radio waves, light, and X-rays are all electromagnetic."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.2",
    title: "Waves transfer energy without transferring particles",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The most important and often misunderstood feature of all waves is that they transfer ", /*#__PURE__*/React.createElement(Term, {
    def: "The capacity to do work, measured in joules (J)."
  }, "energy"), " from place to place ", /*#__PURE__*/React.createElement("em", null, "without"), " carrying matter with them. When a wave moves through a medium, each particle oscillates back and forth about its rest position and passes energy to its neighbours. The particle returns to where it started. The wave pattern advances; the individual particles do not travel with it."), /*#__PURE__*/React.createElement("p", null, "Think of a Mexican wave in a sports stadium. Every person moves only up and down and returns to their seat. The visible wave travels horizontally around the stadium without anyone moving around it. A cork bobbing on water does the same thing: it bobs up and down while the wave energy travels forward past it."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Try it yourself"
  }, "Drop a pebble in a still pond and watch a floating leaf. The leaf bobs up and down but does not drift away with the ripples.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.3",
    title: "Transverse and longitudinal waves",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Waves are classified by the relationship between the direction particles oscillate and the direction the wave travels. In a ", /*#__PURE__*/React.createElement(Term, {
    def: "A wave in which particles oscillate perpendicular (at right angles) to the direction of wave travel. It has crests and troughs."
  }, "transverse wave"), ", particles move at right angles to the wave's direction. Shaking one end of a rope up and down creates a transverse wave that travels along the rope while rope segments move up and down. All electromagnetic waves are transverse."), /*#__PURE__*/React.createElement("p", null, "In a ", /*#__PURE__*/React.createElement(Term, {
    def: "A wave in which particles oscillate parallel to (in the same direction as) the wave's travel. It has compressions and rarefactions."
  }, "longitudinal wave"), ", particles oscillate in the same direction as the wave travels. Sound is the best example. A speaker cone pushes air molecules together into a region of high pressure called a ", /*#__PURE__*/React.createElement(Term, {
    def: "A region in a longitudinal wave where particles are pushed close together, creating higher than normal pressure."
  }, "compression"), ", then pulls back creating a region of low pressure called a ", /*#__PURE__*/React.createElement(Term, {
    def: "A region in a longitudinal wave where particles spread apart, creating lower than normal pressure."
  }, "rarefaction"), ". These regions travel outward as the sound wave."), /*#__PURE__*/React.createElement(WaveSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 2,
    question: "A wave on a rope travels horizontally. The rope segments move up and down. What type of wave is this?",
    options: ["Longitudinal", "Transverse", "Electromagnetic", "Compression"],
    correct: 1,
    explain: "Particles moving perpendicular (at right angles) to the wave's travel direction defines a transverse wave."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 3,
    question: "How would you tell the difference between a transverse and a longitudinal wave by watching a slinky spring?",
    model: "In a transverse wave the coils move side to side (perpendicular to the direction of wave travel), producing crests and troughs. In a longitudinal wave the coils move back and forth along the direction of travel, producing alternating regions where coils are bunched together (compressions) and spread apart (rarefactions)."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.4",
    title: "The electromagnetic spectrum",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The complete range of all electromagnetic waves, ordered by frequency or wavelength."
  }, "electromagnetic spectrum"), " is the complete family of all EM waves. All of them travel at 3 x 10^8 m/s in a vacuum, but they differ enormously in frequency and wavelength. From lowest to highest frequency the regions are: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays."), /*#__PURE__*/React.createElement("p", null, "Higher frequency means more energy per photon. Radio waves are non-ionising and harmless at normal intensities. Gamma rays are ", /*#__PURE__*/React.createElement(Term, {
    def: "Radiation with enough energy per photon to remove electrons from atoms, potentially damaging DNA."
  }, "ionising"), " and can break chemical bonds in DNA, which is why they are used to kill cancer cells but also why radiation exposure must be carefully controlled."), /*#__PURE__*/React.createElement(EMExplorer, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Ionising radiation"
  }, "Ultraviolet, X-rays, and gamma rays carry enough energy to damage living cells. Exposure should be minimised or shielded where possible."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 4,
    question: "Which part of the electromagnetic spectrum has the longest wavelength?",
    options: ["Gamma rays", "Visible light", "Radio waves", "Ultraviolet"],
    correct: 2,
    explain: "Radio waves have the longest wavelengths (up to kilometres) and the lowest frequencies in the EM spectrum."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.5",
    title: "Features of waves: amplitude, frequency, wavelength, speed",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Every wave can be described with four measurable features. ", /*#__PURE__*/React.createElement(Term, {
    def: "The maximum displacement of a particle from its rest position. Related to the energy the wave carries."
  }, "Amplitude (A)"), " is the height of a crest (or depth of a trough) measured from the midline. Doubling the amplitude quadruples the energy. ", /*#__PURE__*/React.createElement(Term, {
    def: "The number of complete wave cycles that pass a point per second. Measured in hertz (Hz)."
  }, "Frequency (f)"), " is the number of complete waves passing a point each second, measured in ", /*#__PURE__*/React.createElement(Term, {
    def: "The unit of frequency. 1 Hz means one complete cycle per second."
  }, "hertz (Hz)"), "."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The distance between two successive identical points on a wave, such as crest to crest. Symbol: lambda. Unit: metres."
  }, "Wavelength (lambda)"), " is the crest-to-crest distance. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The time taken for one complete wave cycle. T = 1/f."
  }, "period (T)"), " is the time for one cycle: T = 1/f. ", /*#__PURE__*/React.createElement(Term, {
    def: "How fast the wave pattern moves through the medium. v = d/t for waves. Unit: m/s."
  }, "Wave speed (v)"), " measures how quickly the wave pattern advances."), /*#__PURE__*/React.createElement(Figure, {
    num: "2",
    caption: "The four key features of a wave shown on a transverse wave diagram."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 130",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "65",
    x2: "540",
    y2: "65",
    stroke: "var(--border,#cbd5e1)",
    strokeWidth: "1",
    strokeDasharray: "6,4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30,65 Q100,5 170,65 Q240,125 310,65 Q380,5 450,65 Q520,125 540,85",
    fill: "none",
    stroke: "var(--accent-deep,#1d4ed8)",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "100",
    y1: "35",
    x2: "100",
    y2: "65",
    stroke: "#ef4444",
    strokeWidth: "1.5",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "104",
    y: "55",
    fontSize: "11",
    fill: "#ef4444",
    fontWeight: "600"
  }, "A (amplitude)"), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "120",
    x2: "310",
    y2: "120",
    stroke: "#059669",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "115",
    x2: "30",
    y2: "125",
    stroke: "#059669",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "310",
    y1: "115",
    x2: "310",
    y2: "125",
    stroke: "#059669",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "160",
    y: "118",
    textAnchor: "middle",
    fontSize: "11",
    fill: "#059669",
    fontWeight: "600"
  }, "lambda (wavelength)"), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "29",
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink)"
  }, "crest"), /*#__PURE__*/React.createElement("text", {
    x: "240",
    y: "110",
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--ink)"
  }, "trough")))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.6",
    title: "The wave equation: v = f x lambda",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The three key wave quantities are linked by one elegant equation: ", /*#__PURE__*/React.createElement("strong", null, "v = f x lambda"), ". If f waves pass a point every second and each wave is lambda metres long, the wave front must travel f x lambda metres per second. This is the wave speed. Rearranging gives: lambda = v / f and f = v / lambda."), /*#__PURE__*/React.createElement("p", null, "When a wave enters a new medium, the frequency stays constant (it is set by the source). If the speed changes, the wavelength must adjust so that v = f x lambda still holds. This is why light slows down and its wavelength shortens when it enters glass, causing refraction."), /*#__PURE__*/React.createElement(WaveCalcSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 5,
    question: "A sound wave in air has a frequency of 500 Hz and a wavelength of 0.68 m. What is its speed?",
    options: ["0.00136 m/s", "735 m/s", "340 m/s", "500 m/s"],
    correct: 2,
    explain: "v = f x lambda = 500 x 0.68 = 340 m/s, which is the speed of sound in air at room temperature."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 6,
    question: "A radio station broadcasts at 100 MHz (10^8 Hz). The speed of light is 3 x 10^8 m/s. Calculate the wavelength of the radio waves.",
    model: "lambda = v / f = (3 x 10^8) / (1 x 10^8) = 3 m. The wavelength of the radio waves is 3 metres."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.1.7",
    title: "Uses of EM waves from data analysis",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The property of each EM band that makes it useful is directly linked to its frequency. You can analyse secondary data (tables, graphs, reports) to compare uses across the spectrum. For example, X-rays penetrate soft tissue but are absorbed by bone, making them ideal for detecting fractures. Gamma rays are ionising enough to kill cells, making them useful for sterilising surgical equipment and treating tumours, but they require lead shielding to protect workers."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "MRI uses radio waves"
  }, "Magnetic resonance imaging (MRI) uses radio waves, which are non-ionising. This makes MRI much safer for repeated use than X-ray imaging, with no radiation risk."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 7,
    question: "A hospital wants to sterilise sealed surgical instruments. Which EM wave type is most appropriate and why?",
    model: "Gamma rays are the most appropriate because they are highly penetrating and ionising, capable of killing microorganisms inside sealed packaging. UV light cannot penetrate opaque packaging. Workers must use remote handling and lead shielding because gamma rays are also dangerous to humans."
  }))));
}
function Section72(_ref0) {
  var progress = _ref0.progress,
    setProgress = _ref0.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.2 Sound Waves"), /*#__PURE__*/React.createElement("h1", null, "Sound: the wave you feel"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Sound is energy moving through matter as a series of pressure pulses. Explore how it travels, how you hear it, and how it is used in medicine.")), /*#__PURE__*/React.createElement(Figure, {
    src: "img/sound.png",
    caption: "Sound travels as compressions and rarefactions through the air to the ear."
  }), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.1",
    title: "Sound energy travels as compressions and rarefactions",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "When an object vibrates, it pushes the surrounding air molecules together, forming a ", /*#__PURE__*/React.createElement(Term, {
    def: "A region of higher-than-normal pressure in a longitudinal wave where molecules are pushed close together."
  }, "compression"), ". Then it pulls back, spreading the molecules apart into a ", /*#__PURE__*/React.createElement(Term, {
    def: "A region of lower-than-normal pressure in a longitudinal wave where molecules spread apart."
  }, "rarefaction"), ". These alternating pressure changes radiate outward as a longitudinal mechanical wave. The individual air molecules do not travel to your ear. Only the pattern of pressure variations travels."), /*#__PURE__*/React.createElement("p", null, "The speed of sound depends on the medium and its temperature. In dry air at 20 \xB0C, sound travels at about 343 m/s. In water, molecules are much closer together, so collisions transfer energy faster: sound travels at about 1480 m/s in water. In steel, it reaches roughly 5000 m/s. Warmer air also carries sound faster because molecules move faster and collide more frequently."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "No medium, no sound"
  }, "Sound is a mechanical wave. In a vacuum there are no molecules to compress or rarefy, so sound cannot exist. Space is silent."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 8,
    question: "A student shouts and hears an echo from a cliff 0.4 s later. The speed of sound is 340 m/s. How far away is the cliff?",
    options: ["136 m", "68 m", "340 m", "0.4 m"],
    correct: 1,
    explain: "Distance = speed x time / 2 = 340 x 0.4 / 2 = 68 m. We divide by 2 because the sound travels to the cliff and back."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.2",
    title: "Amplitude and frequency control volume and pitch",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Two independent features of a sound wave control what you hear. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The maximum pressure variation from normal in a sound wave. Determines loudness."
  }, "amplitude"), " of a sound wave determines its loudness: larger amplitude means larger pressure variations, which make your eardrum vibrate more vigorously. Loudness is measured in ", /*#__PURE__*/React.createElement(Term, {
    def: "The unit of sound intensity level. A logarithmic scale where a 10 dB increase represents roughly ten times more intensity."
  }, "decibels (dB)"), ". Normal conversation is about 60 dB; sounds above 85 dB can cause permanent hearing damage with prolonged exposure."), /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The number of complete pressure cycles per second in a sound wave. Determines pitch."
  }, "frequency"), " of a sound wave determines its pitch. A high frequency (many compressions per second) gives a high-pitched sound. Humans hear sounds from about 20 Hz to 20,000 Hz. Sounds above 20,000 Hz are called ", /*#__PURE__*/React.createElement(Term, {
    def: "Sound with a frequency above 20,000 Hz, beyond the upper limit of human hearing."
  }, "ultrasound"), "; sounds below 20 Hz are ", /*#__PURE__*/React.createElement(Term, {
    def: "Sound with a frequency below 20 Hz, below the lower limit of human hearing."
  }, "infrasound"), "."), /*#__PURE__*/React.createElement(SoundVizSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 9,
    question: "A singer holds the same note but sings louder. Describe what changes in the sound wave and what stays the same.",
    model: "The amplitude of the sound wave increases (louder sound), but the frequency (and therefore the pitch of the note) stays the same. A larger amplitude means bigger pressure variations, which the ear perceives as a louder sound."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.3",
    title: "The Doppler effect",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement(Term, {
    def: "The change in observed frequency of a wave due to relative motion between the source and the observer."
  }, "Doppler effect"), " is the change in the pitch you hear when the source of a sound moves towards or away from you. As an ambulance approaches, it emits each successive compression from a position slightly closer to you than the last, so the compressions arrive more frequently. You hear a higher pitch than the siren actually produces. As the ambulance moves away, compressions arrive less frequently and the pitch drops. The source frequency never changes; only the observed frequency does."), /*#__PURE__*/React.createElement("p", null, "The Doppler effect applies to all waves, not just sound. For light, a source approaching Earth shows a ", /*#__PURE__*/React.createElement(Term, {
    def: "A shift of light towards shorter wavelengths (higher frequency) caused by the source moving towards the observer."
  }, "blueshift"), "; a source moving away shows a ", /*#__PURE__*/React.createElement(Term, {
    def: "A shift of light towards longer wavelengths (lower frequency) caused by the source moving away from the observer."
  }, "redshift"), ". Astronomers use redshift to measure how fast galaxies move away from Earth. Police speed cameras use the Doppler effect of reflected radar to measure vehicle speeds. Doppler ultrasound scans measure blood flow speed in arteries."), /*#__PURE__*/React.createElement(DopplerSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 10,
    question: "A train approaches a platform sounding its horn at 500 Hz. What does the person on the platform hear as the train approaches?",
    options: ["Exactly 500 Hz", "A frequency lower than 500 Hz", "A frequency higher than 500 Hz", "No sound at all"],
    correct: 2,
    explain: "As the source approaches, successive compressions arrive more frequently than they are emitted, so the observer hears a frequency higher than 500 Hz. After the train passes, the observed frequency drops below 500 Hz."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.4",
    title: "How the ear responds to sound waves",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Your ear converts sound waves (mechanical energy) into electrical signals that your brain interprets as sound. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The visible outer flap of the ear that collects and funnels sound waves into the ear canal."
  }, "pinna"), " funnels sound into the ear canal towards the ", /*#__PURE__*/React.createElement(Term, {
    def: "The thin membrane separating the outer and middle ear. It vibrates at the same frequency as incoming sound waves."
  }, "eardrum (tympanic membrane)"), ". Pressure variations in the sound wave make the eardrum vibrate at exactly the sound's frequency."), /*#__PURE__*/React.createElement("p", null, "Three tiny bones in the middle ear, the ", /*#__PURE__*/React.createElement(Term, {
    def: "The three small bones (malleus, incus, stapes) in the middle ear that amplify and transmit vibrations from the eardrum to the oval window."
  }, "ossicles"), " (malleus, incus, stapes), amplify these vibrations and deliver them to the oval window, the entry point of the inner ear. Inside the fluid-filled ", /*#__PURE__*/React.createElement(Term, {
    def: "The spiral-shaped inner ear structure lined with hair cells that converts mechanical vibrations into electrical nerve signals."
  }, "cochlea"), ", thousands of hair cells line the basilar membrane. Hair cells near the base respond to high frequencies; those near the apex respond to low frequencies. When hair cells bend, they generate electrical signals that travel to the brain along the auditory nerve."), /*#__PURE__*/React.createElement(Figure, {
    num: "3",
    caption: "Pathway of sound through the ear."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 560 70",
    width: "100%",
    style: {
      maxWidth: 560
    }
  }, ["Pinna", "Ear canal", "Eardrum", "Ossicles", "Oval window", "Cochlea", "Auditory nerve"].map(function (s, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: s,
      transform: "translate(".concat(i * 80 + 4, ", 8)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "68",
      height: "40",
      rx: "8",
      fill: "var(--accent-soft,#dbeafe)",
      stroke: "var(--accent-deep,#1d4ed8)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "34",
      y: "25",
      textAnchor: "middle",
      fontSize: "10",
      fontWeight: "600",
      fill: "#1b1a17"
    }, s), i < 6 && /*#__PURE__*/React.createElement("text", {
      x: "76",
      y: "28",
      textAnchor: "middle",
      fontSize: "14",
      fill: "var(--ink-muted)"
    }, "\u203A"));
  }))), /*#__PURE__*/React.createElement(Callout, {
    kind: "warn",
    title: "Protect your hearing"
  }, "Hair cells in the cochlea cannot regenerate once damaged. Prolonged exposure above 85 dB causes permanent hearing loss, usually starting with high-frequency sounds.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.5",
    title: "Aboriginal and Torres Strait Islander instruments and material selection",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Aboriginal and Torres Strait Islander peoples have developed musical and communication instruments over thousands of years, with material selection directly shaping the acoustic properties. The ", /*#__PURE__*/React.createElement(Term, {
    def: "A long hollow wind instrument made from eucalyptus wood, traditionally used by Aboriginal peoples. One of the world's oldest known wind instruments."
  }, "didgeridoo"), " (also called yidaki or mago in different language groups) is typically made from eucalyptus branches naturally hollowed by termites. The density and hardness of the eucalyptus wood, combined with the length and internal diameter of the hollow bore, determine the fundamental resonant frequency and richness of overtones. A longer bore produces a lower pitch because a longer air column has a longer standing wave wavelength, and since v = f x lambda at constant speed, a longer wavelength means lower frequency."), /*#__PURE__*/React.createElement("p", null, "Clapsticks (bilma) are made from very hard, dense hardwoods such as acacia. Hard materials vibrate at high frequency and release energy quickly when struck, producing a sharp crack that carries well over distance. This makes clapsticks effective for both music and long-distance communication. The bullroarer is a flat piece of wood on a cord that, when swung, produces a deep low-frequency humming sound through aerodynamic vibration. Its low frequency travels particularly far, historically used for ceremony and communication across vast areas of Country."), /*#__PURE__*/React.createElement(Callout, {
    kind: "fact",
    title: "Physics and culture"
  }, "The choice of material is not just traditional: it is a practical application of acoustic physics. Dense, hard woods carry more energy as sound and lose less to heat in the walls. Longer, wider bores produce lower fundamental frequencies. These principles were understood and applied for thousands of years before formal wave physics was written down."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 11,
    question: "Explain why a longer didgeridoo produces a lower pitch than a shorter one. Use the wave equation in your answer.",
    model: "A longer hollow tube supports a standing wave with a longer wavelength. Using v = f x lambda: if the speed of sound in air is constant and the wavelength increases (longer tube), the frequency must decrease. Lower frequency produces a lower-pitched sound."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.2.6",
    title: "Sound waves in medical diagnosis",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Medical ", /*#__PURE__*/React.createElement(Term, {
    def: "A diagnostic imaging technique using high-frequency sound waves (above 20,000 Hz) reflected from tissue boundaries to build images of internal structures."
  }, "ultrasound"), " imaging uses sound frequencies between 1 MHz and 20 MHz. A transducer pressed against the skin emits short pulses of sound. When those pulses reach a boundary between two different tissue types (for example, the edge of an organ), some sound is reflected back as an echo. The transducer detects the echo and a computer calculates the depth using: depth = (speed x time) / 2 (divided by 2 because sound travels to the boundary and back)."), /*#__PURE__*/React.createElement("p", null, "Thousands of such echoes are assembled into a real-time image on screen. Unlike X-rays, ultrasound is non-ionising, so it cannot damage DNA. This is why ultrasound is the preferred method for imaging a developing foetus during pregnancy. Doppler ultrasound uses the Doppler effect to measure blood flow speed and direction in real time without any surgery."), /*#__PURE__*/React.createElement(UltrasoundCalc, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 12,
    question: "Why is ultrasound preferred over X-rays for imaging a developing foetus?",
    options: ["Ultrasound is cheaper", "Ultrasound is non-ionising and cannot damage DNA", "Ultrasound gives sharper images", "X-rays cannot penetrate tissue"],
    correct: 1,
    explain: "Ultrasound is non-ionising and does not carry enough energy to damage DNA, making it safe for the rapidly dividing cells of a developing foetus. X-rays are ionising and could increase the risk of mutations."
  }))));
}
function Section73(_ref1) {
  var progress = _ref1.progress,
    setProgress = _ref1.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.3 Light Waves"), /*#__PURE__*/React.createElement("h1", null, "Light and how we see"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Light is a transverse EM wave. Discover how your eye detects it, how surfaces interact with it, and what the full spectrum tells us about distant stars.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.3.1",
    title: "How the eye responds to light",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Your eye is an optical instrument that focuses light onto a light-sensitive layer and converts it into electrical signals. Light enters through the ", /*#__PURE__*/React.createElement(Term, {
    def: "The transparent curved front surface of the eye. Provides most of the eye's refractive power."
  }, "cornea"), ", which provides about two-thirds of the eye's total bending (refraction) power. The ", /*#__PURE__*/React.createElement(Term, {
    def: "The coloured muscular ring of the eye that controls the size of the pupil."
  }, "iris"), " controls the size of the ", /*#__PURE__*/React.createElement(Term, {
    def: "The dark opening in the iris that controls how much light enters the eye."
  }, "pupil"), ": in bright light it contracts to a small pupil; in dim light it dilates to let in more light."), /*#__PURE__*/React.createElement("p", null, "Behind the iris, the flexible ", /*#__PURE__*/React.createElement(Term, {
    def: "A transparent disc in the eye that adjusts its curvature to focus light on the retina. Changes shape through accommodation."
  }, "lens"), " fine-tunes the focus through a process called ", /*#__PURE__*/React.createElement(Term, {
    def: "The process by which the ciliary muscles change the shape of the lens to focus on objects at different distances."
  }, "accommodation"), ". Ciliary muscles contract to thicken the lens for close objects and relax to flatten it for distant objects. The focused image falls on the ", /*#__PURE__*/React.createElement(Term, {
    def: "The light-sensitive layer at the back of the eye containing rod and cone photoreceptor cells."
  }, "retina"), ", which contains two types of photoreceptors: ", /*#__PURE__*/React.createElement(Term, {
    def: "Photoreceptor cells sensitive to low light levels and movement. Do not distinguish colour."
  }, "rods"), " (for low-light and motion detection) and ", /*#__PURE__*/React.createElement(Term, {
    def: "Photoreceptor cells that require bright light and detect colour. Three types respond to red, green, and blue wavelengths."
  }, "cones"), " (for colour vision in bright light, sensitive to red, green, and blue). Electrical signals from these cells travel to the brain via the optic nerve."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Why you can't see colour in dim light"
  }, "Cones need bright light to respond. In low-light conditions only rods are active, and rods are not sensitive to colour differences. That is why everything looks grey or black and white at night.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.3.2",
    title: "Absorption, reflection, refraction and scattering",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "When light hits a surface, it can be ", /*#__PURE__*/React.createElement(Term, {
    def: "A process where light energy is taken in by a material and converted to another form, usually thermal energy."
  }, "absorbed"), ", ", /*#__PURE__*/React.createElement(Term, {
    def: "A process where light bounces off a surface. The angle of incidence equals the angle of reflection."
  }, "reflected"), ", or transmitted. Objects appear coloured because they absorb some wavelengths and reflect others. A red apple absorbs green and blue light but reflects red wavelengths back to your eyes. A black surface absorbs nearly all wavelengths; a white surface reflects nearly all of them."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The bending of a wave as it crosses the boundary between two media of different optical density. Occurs because light changes speed."
  }, "Refraction"), " happens when light changes speed as it enters a new medium. Light slows in denser media (like glass or water). This speed change causes the wavefront to bend. That is why a straw in a glass of water appears bent at the surface: your brain assumes light travels in straight lines and traces the refracted ray back to a position that does not match the actual position of the straw."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The redirection of light in multiple directions when it interacts with small particles. Short wavelengths are scattered more than long wavelengths."
  }, "Scattering"), " occurs when light interacts with small particles. In the atmosphere, gas molecules scatter short wavelengths (blue and violet) much more than long wavelengths (red and orange). This is why the sky is blue: scattered blue light comes from every direction. At sunset, sunlight travels through much more atmosphere, scattering away nearly all the blue light and leaving the red-orange glow at the horizon."), /*#__PURE__*/React.createElement(LightPropertiesSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 13,
    question: "Why does the sky appear blue?",
    options: ["The sky absorbs all colours except blue", "Blue light is scattered most by gas molecules in the atmosphere", "The Sun only emits blue light", "Water vapour makes the sky blue"],
    correct: 1,
    explain: "Rayleigh scattering: gas molecules in the atmosphere scatter shorter wavelengths (blue) much more than longer wavelengths (red). Scattered blue light comes from all parts of the sky."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.3.3",
    title: "Applications of light properties in everyday life",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The properties of light underpin many everyday technologies. Solar hot-water collectors use a dark, absorbing surface to convert solar radiation into thermal energy for heating water. Spectacles correct vision through refraction: a concave (diverging) lens corrects short-sightedness by spreading light rays so they focus on the retina rather than in front of it; a convex (converging) lens corrects long-sightedness. Fibre optic cables guide light signals around bends using ", /*#__PURE__*/React.createElement(Term, {
    def: "The complete reflection of light back into a denser medium when the angle of incidence exceeds the critical angle. Used in optical fibres."
  }, "total internal reflection"), ", transmitting data as pulses of light over vast distances with minimal loss."), /*#__PURE__*/React.createElement("p", null, "Rainbows form through refraction and dispersion in water droplets: white sunlight enters a droplet and is split into its constituent wavelengths because different wavelengths refract by slightly different amounts. They reflect off the back of the droplet and exit spread into a spectrum. Curved mirrors are used in torches, car headlights, and reflecting telescopes to redirect light into useful beams or to focus incoming light from distant stars."), /*#__PURE__*/React.createElement(Figure, {
    num: "4",
    caption: "Three light properties and their everyday applications."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 540 80",
    width: "100%",
    style: {
      maxWidth: 540
    }
  }, [["Absorption", "Solar panels\nDark clothing", "#d97706"], ["Reflection", "Mirrors\nFibre optics (TIR)\nRoad markings", "#3b82f6"], ["Refraction", "Spectacles\nCamera lenses\nRainbows", "#059669"]].map(function (_ref10, i) {
    var _ref11 = _slicedToArray(_ref10, 3),
      title = _ref11[0],
      apps = _ref11[1],
      color = _ref11[2];
    return /*#__PURE__*/React.createElement("g", {
      key: title,
      transform: "translate(".concat(i * 182 + 4, ", 4)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "170",
      height: "72",
      rx: "12",
      fill: color + "20",
      stroke: color,
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "85",
      y: "22",
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "700",
      fill: color
    }, title), apps.split("\n").map(function (line, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: "85",
        y: 38 + j * 14,
        textAnchor: "middle",
        fontSize: "10",
        fill: "var(--ink)"
      }, line);
    }));
  })))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.3.4",
    title: "The EM spectrum and what it tells us about stars",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Stars emit radiation across the entire electromagnetic spectrum. Astronomers use different telescopes to observe different regions, building a complete picture of each star. The temperature of a star determines where it emits most strongly: stars hotter than about 7,300 K peak in the ultraviolet; the Sun (about 5800 K) peaks in visible light; stars cooler than about 4,100 K peak in the infrared. This relationship is described by Wien's displacement law: peak wavelength x temperature = 2.9 x 10^6 nm K."), /*#__PURE__*/React.createElement("p", null, "A star's chemical composition is revealed by its spectrum. When starlight is split by a prism, dark ", /*#__PURE__*/React.createElement(Term, {
    def: "Dark lines in a stellar spectrum where atoms in the star's cooler outer atmosphere have absorbed specific wavelengths, creating a chemical fingerprint."
  }, "absorption lines (Fraunhofer lines)"), " appear at wavelengths that match the energy transitions of specific atoms. Each element has a unique pattern of lines. The Doppler effect applies to light too: if these lines are shifted towards shorter wavelengths (blueshift), the star is approaching; if shifted towards longer wavelengths (redshift), it is receding."), /*#__PURE__*/React.createElement(StarTempExplorer, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 14,
    question: "A star's spectrum shows absorption lines that are shifted to longer wavelengths compared to laboratory measurements of the same lines. What does this tell you about the star's motion?",
    model: "The shift to longer wavelengths is a redshift, caused by the Doppler effect. This tells us the star is moving away from Earth. The size of the shift is proportional to the star's recession speed."
  }))));
}

/* Header figure for 7.4: a distance-time graph with three stages
   (10 m/s for 4 s, stopped for 2 s, 20 m/s for 3 s). Gradient = speed. */
function DistanceTimeFigure() {
  var X = function X(t) {
      return 52 + t * 30;
    },
    Y = function Y(d) {
      return 196 - d * 1.6;
    };
  var pts = [[0, 0], [4, 40], [6, 40], [9, 100]];
  return /*#__PURE__*/React.createElement(Figure, {
    caption: "A distance\u2013time graph. The line rises while the object moves, is flat while it is stopped, and is steeper when it moves faster, because the gradient equals the speed."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 236",
    width: "100%",
    style: {
      maxWidth: 440,
      display: "block",
      margin: "0 auto"
    },
    role: "img",
    "aria-label": "Distance-time graph. From 0 to 4 seconds the line rises steadily to 40 metres (10 metres per second). From 4 to 6 seconds it is flat at 40 metres (stopped). From 6 to 9 seconds it rises steeply to 100 metres (20 metres per second)."
  }, [0, 20, 40, 60, 80, 100].map(function (d) {
    return /*#__PURE__*/React.createElement("g", {
      key: "d" + d
    }, /*#__PURE__*/React.createElement("line", {
      x1: "52",
      y1: Y(d),
      x2: "334",
      y2: Y(d),
      stroke: "var(--border)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: "46",
      y: Y(d) + 4,
      textAnchor: "end",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, d));
  }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (t) {
    return /*#__PURE__*/React.createElement("text", {
      key: "t" + t,
      x: X(t),
      y: "212",
      textAnchor: "middle",
      fontSize: "11",
      fill: "var(--ink-muted)"
    }, t);
  }), /*#__PURE__*/React.createElement("line", {
    x1: "52",
    y1: "196",
    x2: "336",
    y2: "196",
    stroke: "var(--ink)",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "52",
    y1: "196",
    x2: "52",
    y2: "24",
    stroke: "var(--ink)",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("text", {
    x: "194",
    y: "230",
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--ink)"
  }, "Time (s)"), /*#__PURE__*/React.createElement("text", {
    x: "16",
    y: "110",
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--ink)",
    transform: "rotate(-90,16,110)"
  }, "Distance (m)"), /*#__PURE__*/React.createElement("polyline", {
    points: pts.map(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
        t = _ref13[0],
        d = _ref13[1];
      return "".concat(X(t), ",").concat(Y(d));
    }).join(" "),
    fill: "none",
    stroke: "#4b7bc9",
    strokeWidth: "3.5",
    strokeLinejoin: "round"
  }), pts.map(function (_ref14) {
    var _ref15 = _slicedToArray(_ref14, 2),
      t = _ref15[0],
      d = _ref15[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: t,
      cx: X(t),
      cy: Y(d),
      r: "4",
      fill: "#4b7bc9"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: X(1.5),
    y: Y(20) - 14,
    textAnchor: "end",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "steady"), /*#__PURE__*/React.createElement("text", {
    x: X(1.5),
    y: Y(20) - 1,
    textAnchor: "end",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "10 m/s"), /*#__PURE__*/React.createElement("text", {
    x: X(5),
    y: Y(40) - 10,
    textAnchor: "middle",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "stopped"), /*#__PURE__*/React.createElement("text", {
    x: X(6.8),
    y: Y(70) - 6,
    textAnchor: "end",
    fontSize: "12",
    fontWeight: "700",
    fill: "var(--ink)"
  }, "faster"), /*#__PURE__*/React.createElement("text", {
    x: X(6.8),
    y: Y(70) + 7,
    textAnchor: "end",
    fontSize: "11",
    fill: "var(--ink-muted)"
  }, "20 m/s")));
}
function Section74(_ref16) {
  var progress = _ref16.progress,
    setProgress = _ref16.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.4 Motion"), /*#__PURE__*/React.createElement("h1", null, "Forces, motion and Newton's laws"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Everything that moves follows rules. Learn the language of motion, master distance-time and velocity-time graphs, and use Newton's three laws to explain the world around you.")), /*#__PURE__*/React.createElement(DistanceTimeFigure, null), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.1",
    title: "Distance, displacement, speed and velocity",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The total length of the path travelled by an object. A scalar quantity with no direction."
  }, "Distance"), " is the total path length, a ", /*#__PURE__*/React.createElement(Term, {
    def: "A quantity that has magnitude (size) only, with no direction."
  }, "scalar"), " quantity. ", /*#__PURE__*/React.createElement(Term, {
    def: "The straight-line distance from start to finish, including direction. A vector quantity."
  }, "Displacement"), " is the straight-line distance from start to end, including direction: it is a ", /*#__PURE__*/React.createElement(Term, {
    def: "A quantity that has both magnitude and direction."
  }, "vector"), ". An athlete who runs one lap of a 400 m track and returns to the start has covered 400 m of distance but zero displacement."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Term, {
    def: "The rate of change of distance. Speed = distance / time. A scalar quantity."
  }, "Speed"), " is the rate of change of distance (v = d/t), a scalar. ", /*#__PURE__*/React.createElement(Term, {
    def: "The rate of change of displacement. Velocity = displacement / time. A vector quantity with magnitude and direction."
  }, "Velocity"), " is the rate of change of displacement, a vector that includes direction. Moving at 60 km/h north is a different velocity from 60 km/h south, even though the speed is the same. An object moving in a circle at constant speed is continuously changing its velocity because its direction is changing."), /*#__PURE__*/React.createElement(Callout, {
    kind: "tip",
    title: "Remembering the difference"
  }, "Speed = how fast (no direction). Velocity = how fast AND which way. Displacement = how far from start to finish, in a straight line, including direction."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 15,
    question: "A car travels 120 km in 1.5 hours. What is its average speed?",
    options: ["80 km/h", "180 km/h", "1.5 km/h", "120 km/h"],
    correct: 0,
    explain: "Average speed = distance / time = 120 km / 1.5 h = 80 km/h."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.2",
    title: "Motion diagrams and graphs",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A graph of distance (y-axis) against time (x-axis). The gradient at any point equals the speed."
  }, "distance-time graph"), " shows how far an object has travelled. The gradient (slope) of the line at any point equals the speed at that moment. A horizontal line means the object is stationary. A straight upward slope means constant speed. A curve with increasing gradient means the object is accelerating."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A graph of speed (y-axis) against time (x-axis). The gradient equals acceleration; the area under the line equals distance travelled."
  }, "velocity-time graph"), " is different: the gradient now equals acceleration, and the area under the line equals the distance travelled. A horizontal line means constant speed (zero acceleration). A line sloping upward means constant acceleration. The area of a triangle or rectangle under the line gives the distance for that time interval."), /*#__PURE__*/React.createElement(MotionGraphSim, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "Graph gradients summarised"
  }, "Distance-time: gradient = speed. Velocity-time: gradient = acceleration, area under line = distance."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 16,
    question: "A velocity-time graph shows a straight line starting at 0 m/s, rising to 20 m/s over 4 seconds, then staying constant at 20 m/s for 6 seconds. Calculate the total distance travelled in 10 seconds.",
    model: "Distance during acceleration = area of triangle = 0.5 x base x height = 0.5 x 4 x 20 = 40 m. Distance at constant speed = area of rectangle = 6 x 20 = 120 m. Total distance = 40 + 120 = 160 m."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.4",
    title: "Newton's second law: F = ma",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Newton's second law states that the ", /*#__PURE__*/React.createElement(Term, {
    def: "The vector sum of all forces acting on an object. Determines acceleration via F = ma."
  }, "net force"), " acting on an object equals its mass multiplied by its acceleration: ", /*#__PURE__*/React.createElement("strong", null, "F = ma"), ". Here F is the net force in ", /*#__PURE__*/React.createElement(Term, {
    def: "The SI unit of force. 1 newton accelerates a 1 kg mass at 1 m/s squared."
  }, "newtons (N)"), ", m is mass in kilograms (kg), and a is acceleration in m/s squared. The same force on a smaller mass produces a bigger acceleration. The same mass under a larger force accelerates more rapidly."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "The gravitational force pulling an object towards Earth. W = mg, where g = 9.8 m/s squared."
  }, "weight force (W = mg)"), " is a direct application of Newton's second law: gravity applies a force of mg newtons to a mass m, giving it an acceleration g. On Earth g is approximately 9.8 m/s squared (often rounded to 10 m/s squared for calculations). The net force is the vector sum of all forces: if a 1200 kg car has an engine force of 5000 N forward and friction of 2000 N backward, the net force is 3000 N and the acceleration is a = F/m = 3000/1200 = 2.5 m/s squared."), /*#__PURE__*/React.createElement(NewtonSecondSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 17,
    question: "A net force of 30 N acts on a 6 kg object. What is the acceleration?",
    options: ["5 m/s squared", "180 m/s squared", "0.2 m/s squared", "36 m/s squared"],
    correct: 0,
    explain: "a = F/m = 30 / 6 = 5 m/s squared."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.5",
    title: "Newton's three laws of motion",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Newton's first law (the law of ", /*#__PURE__*/React.createElement(Term, {
    def: "The tendency of an object to resist any change to its state of motion. Greater mass means greater inertia."
  }, "inertia"), ") states that an object at rest stays at rest, and an object in motion continues at constant velocity, unless a net external force acts on it. This is why you lurch forward when a car brakes suddenly: your body continues at the original speed while the car decelerates. A seatbelt provides the backward force to decelerate you safely."), /*#__PURE__*/React.createElement("p", null, "Newton's third law states that for every action force there is an equal and opposite reaction force acting on a different object. When a rocket engine pushes exhaust gases backward, the gases push the rocket forward with the same magnitude of force. When you push off a swimming pool wall, the wall pushes you back into the water. The action-reaction pair is always the same type of force, always equal in magnitude, always opposite in direction, and always acts on different objects."), /*#__PURE__*/React.createElement(Figure, {
    num: "5",
    caption: "Newton's three laws summarised with everyday examples."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 540 90",
    width: "100%",
    style: {
      maxWidth: 540
    }
  }, [["1st Law", "Inertia", "Seatbelts protect\npassengers in a crash", "#3b82f6"], ["2nd Law", "F = ma", "Heavier car needs more\nforce to accelerate", "#059669"], ["3rd Law", "Action-Reaction", "Rocket: gases back,\ncraft forward", "#8b5cf6"]].map(function (_ref17, i) {
    var _ref18 = _slicedToArray(_ref17, 4),
      law = _ref18[0],
      label = _ref18[1],
      ex = _ref18[2],
      color = _ref18[3];
    return /*#__PURE__*/React.createElement("g", {
      key: law,
      transform: "translate(".concat(i * 182 + 4, ", 4)")
    }, /*#__PURE__*/React.createElement("rect", {
      width: "170",
      height: "80",
      rx: "12",
      fill: color + "18",
      stroke: color,
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: "85",
      y: "22",
      textAnchor: "middle",
      fontSize: "13",
      fontWeight: "700",
      fill: color
    }, law), /*#__PURE__*/React.createElement("text", {
      x: "85",
      y: "40",
      textAnchor: "middle",
      fontSize: "11",
      fontWeight: "600",
      fill: "var(--ink)"
    }, label), ex.split("\n").map(function (line, j) {
      return /*#__PURE__*/React.createElement("text", {
        key: j,
        x: "85",
        y: 56 + j * 15,
        textAnchor: "middle",
        fontSize: "10",
        fill: "var(--ink)"
      }, line);
    }));
  }))), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 18,
    question: "Explain how a helicopter generates lift using Newton's third law. What force pair is involved?",
    model: "The rotor blades spin and push a large volume of air downward (action force). By Newton's third law, the air pushes back on the rotor blades with an equal and opposite upward force (reaction). This upward reaction force is lift. When lift exceeds the helicopter's weight, it rises."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.6",
    title: "Net force and vector analysis in one dimension",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Since forces are vectors, you must add them with direction in mind. In one dimension, choose a positive direction (for example, right = positive). Forces in the opposite direction are negative. The net force is the algebraic sum of all force values. If the net force equals zero, the forces are ", /*#__PURE__*/React.createElement(Term, {
    def: "Forces that sum to zero. The object is in equilibrium: stationary or at constant velocity."
  }, "balanced"), " and the object is in ", /*#__PURE__*/React.createElement(Term, {
    def: "The state of an object when net force is zero. The object is either at rest or moving at constant velocity."
  }, "equilibrium"), ". If the net force is non-zero, the object ", /*#__PURE__*/React.createElement(Term, {
    def: "Forces that do not sum to zero. The object accelerates in the direction of the net force."
  }, "accelerates in the direction of the net force"), "."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A diagram showing all forces acting on an object as arrows from a single point or box, with direction and relative magnitude."
  }, "free-body diagram"), " is a tool for identifying all the forces acting on an object. The object is represented as a box or dot, and each force is an arrow pointing in its direction, with arrow length representing magnitude. A skydiver at terminal velocity has a weight arrow pointing down and an equal-length drag arrow pointing up: net force = zero, constant velocity."), /*#__PURE__*/React.createElement(NetForceSim, null), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 19,
    question: "Three forces act on an object: 15 N right, 8 N right, and 10 N left. What is the net force?",
    options: ["13 N right", "33 N right", "3 N right", "13 N left"],
    correct: 0,
    explain: "Taking right as positive: net force = +15 + 8 - 10 = +13 N. The net force is 13 N to the right."
  }))), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.4.7",
    title: "Mathematical representations of motion and force",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "The key formulas for motion allow you to calculate any unknown quantity when you know others. ", /*#__PURE__*/React.createElement("strong", null, "v = d/t"), " gives average speed. ", /*#__PURE__*/React.createElement("strong", null, "a = (v - u) / t"), " gives acceleration from initial velocity u, final velocity v, and time t. ", /*#__PURE__*/React.createElement("strong", null, "v = u + at"), " gives final velocity. ", /*#__PURE__*/React.createElement("strong", null, "s = ut + 0.5at squared"), " gives displacement during uniform acceleration. ", /*#__PURE__*/React.createElement("strong", null, "v squared = u squared + 2as"), " relates velocity to displacement without needing time. These are the SUVAT equations."), /*#__PURE__*/React.createElement("p", null, "When solving problems: write down what you know (s, u, v, a, t), identify what you need to find, and choose the equation that links them. Always include units. Check that your answer is physically sensible. For force problems use F = ma. For waves use v = f x lambda. Combining algebraic and graphical methods gives you a complete toolkit for motion."), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "SUVAT summary"
  }, "s = displacement (m), u = initial velocity (m/s), v = final velocity (m/s), a = acceleration (m/s^2), t = time (s). Each equation links four of these five variables."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(MCQ, {
    num: 20,
    question: "A car starts from rest and accelerates uniformly at 3 m/s squared for 5 s. What is its final speed?",
    options: ["15 m/s", "8 m/s", "1.67 m/s", "37.5 m/s"],
    correct: 0,
    explain: "v = u + at = 0 + 3 x 5 = 15 m/s."
  }), /*#__PURE__*/React.createElement(WrittenQ, {
    num: 21,
    question: "A car travels at 30 m/s and brakes with a deceleration of 6 m/s squared. How far does it travel before stopping? Show your working.",
    model: "Using v squared = u squared + 2as: at stop v = 0. So 0 = 30 squared + 2 x (-6) x s. 0 = 900 - 12s. 12s = 900. s = 75 m. The car travels 75 m before stopping."
  }))));
}
function Section75(_ref19) {
  var progress = _ref19.progress,
    setProgress = _ref19.setProgress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topic-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "7.5 Waves and Motion in Context"), /*#__PURE__*/React.createElement("h1", null, "Science shaping society"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Wave and motion physics have transformed communication, medicine, transport, and daily life. Here you will build structured arguments about these impacts.")), /*#__PURE__*/React.createElement(DotPoint, {
    id: "7.5.1",
    title: "How waves and motion have changed society",
    progress: progress,
    setProgress: setProgress
  }, /*#__PURE__*/React.createElement("p", null, "Our understanding of waves and motion has driven some of the most significant transformations in human history. Before Newton's laws were published in 1687, there was no reliable way to predict or engineer the motion of machines. Today, aircraft, high-speed trains, rockets, and smartphones are all engineered using those same principles. Before Maxwell and Hertz established the theory of electromagnetic waves in the 1860s to 1880s, long-distance messages needed a telegraph wire or travelled by ship, and could take days or weeks to reach places without a cable. Today, radio, television, mobile phone networks, the internet, and GPS all rely on EM waves, connecting billions of people instantly."), /*#__PURE__*/React.createElement("p", null, "In medicine, ultrasound imaging (using reflected sound waves) and X-ray imaging (using EM waves) allow doctors to diagnose conditions and guide treatment without exploratory surgery. These technologies have reduced maternal mortality, improved cancer detection, and transformed healthcare in both wealthy and remote communities. Not all impacts have been positive: fossil-fuel combustion in transport engines contributes to climate change, and military radar and surveillance technologies raise ethical questions. A balanced analysis requires examining both benefits and costs."), /*#__PURE__*/React.createElement("p", null, "A ", /*#__PURE__*/React.createElement(Term, {
    def: "A structured approach to scientific argument using three components: Claim (statement of position), Evidence (facts and examples), and Reasoning (explanation of the connection)."
  }, "Claim-Evidence-Reasoning (CER)"), " framework helps you build well-structured arguments. Your claim answers the question directly. Your evidence consists of specific facts, statistics, or examples. Your reasoning explains how and why the evidence supports the claim. A thorough argument also acknowledges counterarguments or limitations."), /*#__PURE__*/React.createElement(CERBuilder, null), /*#__PURE__*/React.createElement(Callout, {
    kind: "key",
    title: "CER structure"
  }, "Claim: state your position clearly. Evidence: give specific examples (for example, ultrasound imaging, GPS, Doppler speed cameras). Reasoning: explain the connection using physics concepts from this topic."), /*#__PURE__*/React.createElement(QGroup, {
    title: "Check yourself"
  }, /*#__PURE__*/React.createElement(WrittenQ, {
    num: 22,
    question: "Using the CER framework, write a short argument (3 to 4 sentences) for the following claim: GPS technology, which relies on wave physics, has had a significant positive impact on society.",
    model: "Claim: GPS technology, which uses electromagnetic wave propagation from satellites to calculate position, has profoundly benefited society. Evidence: GPS enables turn-by-turn navigation for billions of smartphone users, guides emergency services to injured people in remote areas, and underpins precision agriculture and aviation safety. Reasoning: because GPS uses radio waves that travel at the speed of light, it provides position accuracy to within a few metres in real time anywhere on Earth, reducing navigational errors and enabling entirely new industries. This has made previously dangerous tasks much safer and created significant economic value."
  }))));
}

/* =========================================================
   MOUNT
   ========================================================= */
mountTopicApp({
  year: 10,
  topicTitle: "Waves and Motion",
  branch: "physics",
  heroImage: "img/hero.png",
  strand: "Stage 5 · NSW Science",
  accent: "blue",
  storageKey: "y10.wavesmotion",
  hubHref: "../",
  intro: "Waves carry energy across space without moving matter, and forces drive every motion you observe. In this topic you will explore the full electromagnetic spectrum, model sound and light, master distance-time and velocity-time graphs, apply Newton's three laws, and examine how this science has transformed communication, medicine, and transport.",
  glossary: {
    "wave": "A disturbance that transfers energy from one place to another without the net transfer of matter.",
    "mechanical wave": "A wave that requires a physical medium (solid, liquid, or gas) to travel through.",
    "electromagnetic wave": "A wave consisting of oscillating electric and magnetic fields that travels through a vacuum at 3 x 10^8 m/s.",
    "transverse wave": "A wave in which particles oscillate perpendicular to the direction of wave travel. Has crests and troughs.",
    "longitudinal wave": "A wave in which particles oscillate parallel to the direction of wave travel. Has compressions and rarefactions.",
    "amplitude": "The maximum displacement of a particle from its rest (equilibrium) position. Related to the energy a wave carries.",
    "frequency": "The number of complete wave cycles passing a point per second. Measured in hertz (Hz).",
    "wavelength": "The distance between two successive identical points on a wave, such as crest to crest. Symbol: lambda.",
    "wave speed": "How quickly the wave pattern advances through a medium. v = f x lambda.",
    "compression": "A region in a longitudinal wave where particles are pushed together, creating higher-than-normal pressure.",
    "rarefaction": "A region in a longitudinal wave where particles spread apart, creating lower-than-normal pressure.",
    "electromagnetic spectrum": "The complete range of all electromagnetic waves ordered by frequency or wavelength, from radio waves to gamma rays.",
    "ionising radiation": "Radiation (such as UV, X-rays, gamma rays) with enough energy per photon to remove electrons from atoms and damage DNA.",
    "Doppler effect": "The change in observed frequency of a wave caused by relative motion between the source and the observer.",
    "redshift": "A shift of light towards longer wavelengths caused by a source moving away from the observer.",
    "blueshift": "A shift of light towards shorter wavelengths caused by a source moving towards the observer.",
    "refraction": "The bending of a wave as it crosses a boundary between two media of different optical density.",
    "reflection": "The bouncing of a wave off a surface. The angle of incidence equals the angle of reflection.",
    "absorption": "The process by which a material takes in wave energy and converts it to another form, usually thermal energy.",
    "scattering": "The redirection of light in multiple directions by small particles. Blue light scatters most in the atmosphere.",
    "ultrasound": "Sound with a frequency above 20,000 Hz (20 kHz), beyond the upper limit of human hearing.",
    "distance": "The total length of path travelled by an object. A scalar quantity.",
    "displacement": "The straight-line distance from start to finish including direction. A vector quantity.",
    "velocity": "The rate of change of displacement, including direction. A vector quantity.",
    "acceleration": "The rate of change of velocity. a = (v - u) / t. Measured in m/s squared.",
    "net force": "The vector sum of all forces acting on an object. Determines acceleration via F = ma.",
    "inertia": "The tendency of an object to resist any change to its state of motion. Greater mass means greater inertia.",
    "Newton's first law": "An object stays at rest or at constant velocity unless acted upon by a net external force.",
    "Newton's second law": "The net force on an object equals its mass times its acceleration: F = ma.",
    "Newton's third law": "For every action force there is an equal and opposite reaction force acting on a different object.",
    "total internal reflection": "Complete reflection of light back into a denser medium when the angle of incidence exceeds the critical angle."
  },
  sections: [{
    id: "7.1",
    label: "Wave Properties",
    accent: "blue",
    blurb: "Mechanical vs EM waves, the wave model, transverse and longitudinal types, the EM spectrum, wave features, and the wave equation.",
    points: ["7.1.1", "7.1.2", "7.1.3", "7.1.4", "7.1.5", "7.1.6", "7.1.7"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section71, p);
    }
  }, {
    id: "7.2",
    label: "Sound Waves",
    accent: "cyan",
    blurb: "Compressions and rarefactions, pitch and loudness, the Doppler effect, the ear, Aboriginal instruments, and medical ultrasound.",
    points: ["7.2.1", "7.2.2", "7.2.3", "7.2.4", "7.2.5", "7.2.6"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section72, p);
    }
  }, {
    id: "7.3",
    label: "Light Waves",
    accent: "violet",
    blurb: "How the eye works, absorption, reflection, refraction and scattering, everyday applications, and stellar spectroscopy.",
    points: ["7.3.1", "7.3.2", "7.3.3", "7.3.4"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section73, p);
    }
  }, {
    id: "7.4",
    label: "Motion",
    accent: "blue",
    blurb: "Speed, velocity and displacement, motion graphs, Newton's three laws, net force vectors, and SUVAT calculations.",
    points: ["7.4.1", "7.4.2", "7.4.4", "7.4.5", "7.4.6", "7.4.7"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section74, p);
    }
  }, {
    id: "7.5",
    label: "Waves in Society",
    accent: "teal",
    blurb: "How wave and motion science has transformed communication, medicine, and transport. Building CER arguments.",
    points: ["7.5.1"],
    render: function render(p) {
      return /*#__PURE__*/React.createElement(Section75, p);
    }
  }]
});
