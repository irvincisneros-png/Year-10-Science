/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   SECTION 7.1 INTERACTIVES
   ========================================================= */

/* Wave simulator: canvas drawing of a transverse wave with
   amplitude, frequency, and wavelength sliders */
function WaveSim() {
  const canvasRef = useRef(null);
  const [amplitude, setAmplitude] = useState(40);
  const [frequency, setFrequency] = useState(2);
  const [waveType, setWaveType] = useState("transverse");
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const midY = H / 2;

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "var(--surface, #f8f9fa)";
      ctx.fillRect(0, 0, W, H);

      // Draw equilibrium line
      ctx.strokeStyle = "var(--border, #dee2e6)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(W, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      if (waveType === "transverse") {
        // Draw transverse wave (sine curve)
        ctx.strokeStyle = "var(--accent-deep, #1d4ed8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= W; x++) {
          const phase = (x / W) * frequency * 2 * Math.PI - t;
          const y = midY - amplitude * Math.sin(phase);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Label crest and trough
        const crestX = W / (frequency * 4);
        ctx.fillStyle = "var(--accent-deep, #1d4ed8)";
        ctx.font = "12px sans-serif";
        ctx.fillText("crest", crestX - 16, midY - amplitude - 8);
        ctx.fillText("trough", crestX * 3 - 20, midY + amplitude + 18);

        // Wavelength arrow
        const wl = W / frequency;
        const arrowY = midY + amplitude + 32;
        ctx.strokeStyle = "#6b7280";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(20, arrowY);
        ctx.lineTo(20 + wl, arrowY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, arrowY - 5); ctx.lineTo(20, arrowY + 5); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20 + wl, arrowY - 5); ctx.lineTo(20 + wl, arrowY + 5); ctx.stroke();
        ctx.fillStyle = "#6b7280";
        ctx.fillText("wavelength (lambda)", 20 + wl / 2 - 50, arrowY - 6);

        // Amplitude arrow
        ctx.beginPath();
        ctx.moveTo(8, midY); ctx.lineTo(8, midY - amplitude);
        ctx.stroke();
        ctx.fillText("A", 2, midY - amplitude / 2);

      } else {
        // Draw longitudinal wave (compressions and rarefactions using dots)
        const numParticles = 60;
        const spacing = W / numParticles;
        ctx.fillStyle = "var(--accent-deep, #1d4ed8)";
        for (let i = 0; i < numParticles; i++) {
          const baseX = i * spacing + spacing / 2;
          const displacement = (amplitude / 2) * Math.sin((baseX / W) * frequency * 2 * Math.PI - t);
          const x = baseX + displacement;
          ctx.beginPath();
          ctx.arc(x, midY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        // Labels
        ctx.fillStyle = "var(--accent-deep, #1d4ed8)";
        ctx.font = "12px sans-serif";
        const compX = W / (frequency * 4);
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
    return () => cancelAnimationFrame(animRef.current);
  }, [amplitude, frequency, waveType]);

  const wavelength = (600 / frequency).toFixed(0);

  return (
    <Interactive title="Wave simulator" subtitle="Adjust the sliders and watch the wave update live." takeaway="Increasing frequency shortens the wavelength while the wave speed stays constant, directly demonstrating the wave equation v = f x lambda; transverse and longitudinal waves differ in how their particles move relative to the wave direction.">
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
        <SegToggle
          options={[{ value: "transverse", label: "Transverse" }, { value: "longitudinal", label: "Longitudinal" }]}
          value={waveType}
          onChange={setWaveType}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={160}
        style={{ width: "100%", maxWidth: 600, height: "auto", borderRadius: "0.5rem", marginTop: "0.75rem" }}
      />
      <div className="ctrl-row" style={{ flexWrap: "wrap" }}>
        <Slider label="Amplitude" min={10} max={65} value={amplitude} onChange={setAmplitude} unit=" px" />
        <Slider label="Frequency (waves)" min={1} max={4} step={0.5} value={frequency} onChange={setFrequency} unit="" />
      </div>
      <div className="stat-readout">
        <Stat value={amplitude} label="Amplitude (px)" />
        <Stat value={frequency} label="Frequency (waves)" />
        <Stat value={wavelength} label="Wavelength (px)" />
      </div>
      <p className="muted" style={{ marginBottom: 0 }}>
        Notice: when frequency increases, wavelength decreases. This is the wave equation v = f x lambda in action.
      </p>
    </Interactive>
  );
}

/* EM spectrum explorer */
function EMExplorer() {
  const bands = [
    { name: "Radio", color: "#6366f1", freq: "10⁴ to 10¹¹ Hz", wl: ">1 mm", energy: "Very low", uses: "Broadcasting, radar, MRI, WiFi", ionising: false },
    { name: "Microwave", color: "#8b5cf6", freq: "10⁹ to 3x10¹¹ Hz", wl: "1 mm to 30 cm", energy: "Low", uses: "Cooking, satellite links, mobile phones", ionising: false },
    { name: "Infrared", color: "#f59e0b", freq: "3x10¹¹ to 4x10¹⁴ Hz", wl: "700 nm to 1 mm", energy: "Moderate", uses: "Remote controls, thermal cameras, physiotherapy", ionising: false },
    { name: "Visible", color: "#10b981", freq: "4x10¹⁴ to 7x10¹⁴ Hz", wl: "400 to 700 nm", energy: "Moderate", uses: "Human vision, photography, fibre optics", ionising: false },
    { name: "Ultraviolet", color: "#3b82f6", freq: "7x10¹⁴ to 3x10¹⁶ Hz", wl: "10 to 400 nm", energy: "High", uses: "Sterilisation, fluorescence, forensics", ionising: true },
    { name: "X-ray", color: "#ef4444", freq: "3x10¹⁶ to 3x10¹⁹ Hz", wl: "0.01 to 10 nm", energy: "Very high", uses: "Medical imaging, security scanning", ionising: true },
    { name: "Gamma", color: "#dc2626", freq: ">3x10¹⁹ Hz", wl: "<0.01 nm", energy: "Extreme", uses: "Cancer treatment, sterilisation", ionising: true },
  ];
  const [selected, setSelected] = useState(3);
  const b = bands[selected];

  return (
    <Interactive title="EM spectrum explorer" subtitle="Click a band to see its properties and uses." takeaway="Across the EM spectrum, frequency and energy per photon increase from radio waves to gamma rays, and only the higher-energy bands (UV, X-ray, gamma) are ionising and capable of damaging living cells.">
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "1rem" }}>
        {bands.map((band, i) => (
          <button
            key={band.name}
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? band.color : "var(--surface-raised, #f1f5f9)",
              color: selected === i ? "#fff" : "var(--ink, #1e293b)",
              border: `2px solid ${band.color}`,
              borderRadius: "0.4rem",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              fontWeight: selected === i ? 700 : 400,
              fontSize: "0.85rem",
              transition: "all 0.15s",
            }}
          >{band.name}</button>
        ))}
      </div>
      <div style={{
        background: b.color + "18",
        border: `2px solid ${b.color}`,
        borderRadius: "0.75rem",
        padding: "1rem 1.25rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
          <span style={{ background: b.color, color: "#fff", padding: "0.15rem 0.75rem", borderRadius: "1rem", fontWeight: 700, fontSize: "1rem" }}>{b.name}</span>
          {b.ionising && <span style={{ background: "#fee2e2", color: "#b91c1c", padding: "0.15rem 0.6rem", borderRadius: "1rem", fontSize: "0.8rem", fontWeight: 600 }}>Ionising</span>}
          {!b.ionising && <span style={{ background: "#dcfce7", color: "#15803d", padding: "0.15rem 0.6rem", borderRadius: "1rem", fontSize: "0.8rem", fontWeight: 600 }}>Non-ionising</span>}
        </div>
        <div className="grid-2" style={{ gap: "0.5rem 1.5rem" }}>
          <div><span className="muted" style={{ fontSize: "0.78rem" }}>Frequency</span><br /><strong>{b.freq}</strong></div>
          <div><span className="muted" style={{ fontSize: "0.78rem" }}>Wavelength</span><br /><strong>{b.wl}</strong></div>
          <div><span className="muted" style={{ fontSize: "0.78rem" }}>Energy per photon</span><br /><strong>{b.energy}</strong></div>
          <div><span className="muted" style={{ fontSize: "0.78rem" }}>Common uses</span><br /><strong>{b.uses}</strong></div>
        </div>
      </div>
      <p className="muted" style={{ marginTop: "0.6rem", marginBottom: 0, fontSize: "0.85rem" }}>
        Moving left to right: frequency increases, wavelength decreases, energy per photon increases.
      </p>
    </Interactive>
  );
}

/* Wave equation calculator */
function WaveCalcSim() {
  const [v, setV] = useState(340);
  const [f, setF] = useState(440);
  const lambda = (v / f).toFixed(3);

  return (
    <Interactive title="Wave equation calculator" subtitle="v = f x lambda. Set speed and frequency; see the wavelength." takeaway="The wave equation v = f x lambda links speed, frequency, and wavelength so that if any two quantities are known the third can be calculated.">
      <div className="ctrl-row" style={{ flexWrap: "wrap" }}>
        <Slider label="Wave speed (v)" min={1} max={3000} step={1} value={v} onChange={setV} unit=" m/s" />
        <Slider label="Frequency (f)" min={1} max={20000} step={1} value={f} onChange={setF} unit=" Hz" />
      </div>
      <div className="stat-readout">
        <Stat value={v} label="Speed (m/s)" />
        <Stat value={f} label="Frequency (Hz)" />
        <Stat value={lambda} label="Wavelength (m)" />
      </div>
      <Callout kind="key" title="Equation">lambda = v / f = {v} / {f} = {lambda} m</Callout>
    </Interactive>
  );
}


/* =========================================================
   SECTION 7.2 INTERACTIVES
   ========================================================= */

/* Sound wave visualiser: amplitude = loudness, frequency = pitch */
function SoundVizSim() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const [loudness, setLoudness] = useState(40);
  const [pitch, setPitch] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const midY = H / 2;

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "var(--surface, #f8f9fa)";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "var(--border, #dee2e6)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const phase = (x / W) * pitch * 2 * Math.PI - t;
        const y = midY - loudness * Math.sin(phase);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
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
    return () => cancelAnimationFrame(animRef.current);
  }, [loudness, pitch]);

  const pitchLabel = pitch <= 1 ? "Very low" : pitch <= 2 ? "Low" : pitch <= 3 ? "Medium" : pitch <= 4 ? "High" : "Very high";
  const loudLabel = loudness < 20 ? "Whisper" : loudness < 40 ? "Quiet" : loudness < 55 ? "Moderate" : "Loud";

  return (
    <Interactive title="Sound wave visualiser" subtitle="Loudness depends on amplitude; pitch depends on frequency." takeaway="Loudness and pitch are controlled by two completely independent wave properties: amplitude determines how loud a sound is, while frequency determines how high or low the pitch is.">
      <canvas
        ref={canvasRef}
        width={600}
        height={140}
        style={{ width: "100%", maxWidth: 600, height: "auto", borderRadius: "0.5rem", marginBottom: "0.75rem" }}
      />
      <div className="ctrl-row" style={{ flexWrap: "wrap" }}>
        <Slider label="Amplitude (loudness)" min={5} max={65} value={loudness} onChange={setLoudness} unit="" />
        <Slider label="Frequency (pitch)" min={1} max={6} step={0.5} value={pitch} onChange={setPitch} unit="" />
      </div>
      <div className="stat-readout">
        <Stat value={loudLabel} label="Loudness" />
        <Stat value={pitchLabel} label="Pitch" />
      </div>
    </Interactive>
  );
}

/* Doppler effect simulator */
function DopplerSim() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const [sourceSpeed, setSourceSpeed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cy = H / 2;

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "var(--surface, #f8f9fa)";
      ctx.fillRect(0, 0, W, H);

      const srcX = (W / 2) + Math.sin(t * 0.7) * (W * 0.25);
      const v_sound = 5;
      const v_source = sourceSpeed / 100 * v_sound * 0.8;

      // Draw concentric circular wavefronts
      const numRings = 5;
      for (let i = 1; i <= numRings; i++) {
        const age = i * 1.2;
        const r = age * v_sound;
        const cx_emit = srcX - age * v_source * Math.sign(Math.cos(t * 0.7));
        const alpha = 1 - i / (numRings + 1);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
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
      ctx.fillStyle = "#374151";
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
    return () => cancelAnimationFrame(animRef.current);
  }, [sourceSpeed]);

  const pitchAhead = sourceSpeed === 0 ? "Normal" : sourceSpeed < 40 ? "Slightly higher" : "Much higher";
  const pitchBehind = sourceSpeed === 0 ? "Normal" : sourceSpeed < 40 ? "Slightly lower" : "Much lower";

  return (
    <Interactive title="Doppler effect simulator" subtitle="The moving source bunches wavefronts ahead and stretches them behind." takeaway="When a wave source moves towards an observer the wavefronts bunch together so the observed frequency is higher than the source frequency; when it moves away the wavefronts spread out and the observed frequency is lower.">
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        style={{ width: "100%", maxWidth: 600, height: "auto", borderRadius: "0.5rem", marginBottom: "0.75rem" }}
      />
      <Slider label="Source speed" min={0} max={80} value={sourceSpeed} onChange={setSourceSpeed} unit="%" />
      <div className="stat-readout">
        <Stat value={pitchAhead} label="Pitch heard ahead" />
        <Stat value={pitchBehind} label="Pitch heard behind" />
      </div>
    </Interactive>
  );
}

/* Ultrasound depth calculator */
function UltrasoundCalc() {
  const [echoTime, setEchoTime] = useState(40);
  const v = 1540;
  const depth = ((v * echoTime * 0.000001) / 2 * 100).toFixed(1);

  return (
    <Interactive title="Ultrasound depth calculator" subtitle="depth = (v x t) / 2, where v = 1540 m/s in soft tissue." takeaway="Medical ultrasound calculates tissue depth from the echo return time using depth = (v x t) / 2, dividing by two because the pulse travels to the boundary and back.">
      <Slider label="Echo return time (microseconds)" min={5} max={200} step={1} value={echoTime} onChange={setEchoTime} unit=" us" />
      <div className="stat-readout">
        <Stat value={echoTime + " us"} label="Echo time" />
        <Stat value={depth + " cm"} label="Tissue depth" />
      </div>
      <Callout kind="tip" title="How it works">
        The sound travels to the boundary and back, so we divide by 2. depth = (1540 x {echoTime} x 10^-6) / 2 = {depth} cm.
      </Callout>
    </Interactive>
  );
}


/* =========================================================
   SECTION 7.3 INTERACTIVES
   ========================================================= */

/* Light properties demo: interactive SVG showing reflection and refraction */
function LightPropertiesSim() {
  const [mode, setMode] = useState("reflection");
  const [angle, setAngle] = useState(35);

  const cx = 120;
  const cy = 120;
  const surfaceY = cy;

  // Incident ray from top-left
  const rad = (angle * Math.PI) / 180;
  const incX1 = cx - 80 * Math.sin(rad);
  const incY1 = cy - 80 * Math.cos(rad);

  // Reflected ray (same angle, other side)
  const refX2 = cx + 80 * Math.sin(rad);
  const refY2 = cy - 80 * Math.cos(rad);

  // Refracted ray (snell's law approximation: n_glass ~ 1.5)
  const n = 1.5;
  const sinRef = Math.sin(rad) / n;
  const refAngle = Math.asin(sinRef);
  const refrX2 = cx + 80 * Math.sin(refAngle);
  const refrY2 = cy + 80 * Math.cos(refAngle);

  return (
    <Interactive title="Reflection and refraction of light" subtitle="Adjust the angle of incidence to see how light behaves." takeaway="For reflection the angle of incidence always equals the angle of reflection; for refraction light bends towards the normal when entering a denser medium because it slows down.">
      <div className="ctrl-row">
        <SegToggle
          options={[{ value: "reflection", label: "Reflection" }, { value: "refraction", label: "Refraction" }]}
          value={mode}
          onChange={setMode}
        />
      </div>
      <Slider label="Angle of incidence" min={5} max={75} value={angle} onChange={setAngle} unit="°" />
      <svg viewBox="0 0 240 240" width="100%" style={{ maxWidth: 320, display: "block", margin: "0 auto" }}>
        {/* Surface */}
        <rect x="0" y="120" width="240" height="120" fill="#bfdbfe" opacity="0.4" rx="0" />
        <line x1="0" y1="120" x2="240" y2="120" stroke="#93c5fd" strokeWidth="2" />
        <text x="8" y="115" fontSize="10" fill="#6b7280">air</text>
        <text x="8" y="135" fontSize="10" fill="#6b7280">{mode === "refraction" ? "glass (n=1.5)" : "mirror"}</text>

        {/* Normal line */}
        <line x1={cx} y1="40" x2={cx} y2="200" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,4" />
        <text x={cx + 4} y="52" fontSize="9" fill="#9ca3af">normal</text>

        {/* Incident ray */}
        <line x1={incX1} y1={incY1} x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowY)" />
        <text x={incX1 - 30} y={incY1} fontSize="10" fill="#d97706">incident</text>

        {mode === "reflection" ? (
          <>
            <line x1={cx} y1={cy} x2={refX2} y2={refY2} stroke="#10b981" strokeWidth="2.5" />
            <text x={refX2 + 4} y={refY2} fontSize="10" fill="#059669">reflected</text>
          </>
        ) : (
          <>
            <line x1={cx} y1={cy} x2={refrX2} y2={refrY2} stroke="#8b5cf6" strokeWidth="2.5" />
            <text x={refrX2 + 4} y={refrY2 + 8} fontSize="10" fill="#7c3aed">refracted</text>
          </>
        )}

        {/* Angle arc */}
        <path
          d={`M ${cx} ${cy - 30} A 30 30 0 0 0 ${cx - 30 * Math.sin(rad)} ${cy - 30 * Math.cos(rad)}`}
          fill="none" stroke="#f59e0b" strokeWidth="1.5"
        />
        <text x={cx - 28} y={cy - 22} fontSize="10" fill="#d97706">{angle}°</text>

        {mode === "reflection" && (
          <>
            <path
              d={`M ${cx + 30 * Math.sin(rad)} ${cy - 30 * Math.cos(rad)} A 30 30 0 0 1 ${cx} ${cy - 30}`}
              fill="none" stroke="#10b981" strokeWidth="1.5"
            />
            <text x={cx + 14} y={cy - 22} fontSize="10" fill="#059669">{angle}°</text>
          </>
        )}
        {mode === "refraction" && (
          <>
            <path
              d={`M ${cx} ${cy + 30} A 30 30 0 0 0 ${cx + 30 * Math.sin(refAngle)} ${cy + 30 * Math.cos(refAngle)}`}
              fill="none" stroke="#8b5cf6" strokeWidth="1.5"
            />
            <text x={cx + 14} y={cy + 28} fontSize="10" fill="#7c3aed">{(refAngle * 180 / Math.PI).toFixed(0)}°</text>
          </>
        )}
        <defs>
          <marker id="arrowY" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
      <div className="stat-readout">
        <Stat value={angle + "°"} label="Angle of incidence" />
        {mode === "reflection"
          ? <Stat value={angle + "°"} label="Angle of reflection" />
          : <Stat value={((Math.asin(Math.sin(angle * Math.PI / 180) / 1.5)) * 180 / Math.PI).toFixed(0) + "°"} label="Angle of refraction" />
        }
      </div>
      {mode === "reflection" && (
        <Callout kind="key" title="Law of reflection">Angle of incidence = angle of reflection ({angle}° = {angle}°). Both measured from the normal.</Callout>
      )}
      {mode === "refraction" && (
        <Callout kind="tip" title="Refraction">Light bends towards the normal when entering a denser medium. The angle of refraction is smaller than the angle of incidence.</Callout>
      )}
    </Interactive>
  );
}

/* EM Spectrum and Stars temperature explorer */
function StarTempExplorer() {
  const [temp, setTemp] = useState(5800);
  const peakNm = Math.round(2900000 / temp);
  let colour = "#fff";
  let region = "";
  if (peakNm < 400) { colour = "#a855f7"; region = "Ultraviolet (very hot star)"; }
  else if (peakNm < 450) { colour = "#7c3aed"; region = "Violet visible"; }
  else if (peakNm < 490) { colour = "#2563eb"; region = "Blue visible"; }
  else if (peakNm < 550) { colour = "#10b981"; region = "Green visible (like the Sun)"; }
  else if (peakNm < 620) { colour = "#f59e0b"; region = "Yellow-orange visible"; }
  else if (peakNm < 700) { colour = "#ef4444"; region = "Red visible (cool star)"; }
  else { colour = "#dc2626"; region = "Infrared (very cool star)"; }

  return (
    <Interactive title="Star temperature explorer" subtitle="Use Wien's law: peak wavelength x temperature = 2.9 x 10^6 nm K." takeaway="A star's surface temperature determines the colour of its peak emission: hotter stars appear blue-white and cooler stars appear red, following Wien's displacement law.">
      <Slider label="Star surface temperature (K)" min={2000} max={40000} step={100} value={temp} onChange={setTemp} unit=" K" />
      <div className="stat-readout">
        <Stat value={temp.toLocaleString() + " K"} label="Surface temperature" />
        <Stat value={peakNm + " nm"} label="Peak wavelength" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.75rem 0" }}>
        <div style={{
          width: 60, height: 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colour}, ${colour}88)`,
          boxShadow: `0 0 24px 8px ${colour}55`,
          flexShrink: 0,
        }} />
        <div>
          <strong>Peak emission region:</strong><br />
          <span style={{ color: colour, fontWeight: 700 }}>{region}</span>
        </div>
      </div>
      <Callout kind="fact" title="Wien's displacement law">
        Peak wavelength = 2,900,000 / {temp.toLocaleString()} = {peakNm} nm. Hotter stars appear blue-white; cooler stars appear red.
      </Callout>
    </Interactive>
  );
}


/* =========================================================
   SECTION 7.4 INTERACTIVES
   ========================================================= */

/* Distance-time / velocity-time graph generator */
function MotionGraphSim() {
  const [scenario, setScenario] = useState("accelerate");
  const canvasRef = useRef(null);

  const scenarios = {
    accelerate: {
      label: "Accelerating car",
      dtPoints: [[0,0],[1,5],[2,20],[3,45],[4,80]],
      vtPoints: [[0,0],[1,10],[2,20],[3,30],[4,40]],
      desc: "Distance-time curve bends upward (acceleration). Velocity-time line rises steadily.",
    },
    constant: {
      label: "Constant speed",
      dtPoints: [[0,0],[1,20],[2,40],[3,60],[4,80]],
      vtPoints: [[0,20],[1,20],[2,20],[3,20],[4,20]],
      desc: "Distance-time is a straight line (constant speed). Velocity-time is horizontal.",
    },
    stop: {
      label: "Decelerating to stop",
      dtPoints: [[0,0],[1,35],[2,60],[3,75],[4,80]],
      vtPoints: [[0,40],[1,30],[2,20],[3,10],[4,0]],
      desc: "Distance-time curve flattens (slowing). Velocity-time line falls to zero.",
    },
    stationarythen: {
      label: "Stop then go",
      dtPoints: [[0,0],[1,20],[2,20],[3,20],[4,60]],
      vtPoints: [[0,20],[1,20],[2,0],[3,0],[4,40]],
      desc: "Distance-time is flat in the middle (stationary). Velocity drops to zero then rises.",
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const half = W / 2;
    const pad = { t: 24, b: 36, l: 36, r: 12 };

    function drawGraph(offsetX, pts, title, yLabel, lineColor) {
      const gW = half - pad.l - pad.r;
      const gH = H - pad.t - pad.b;
      const x0 = offsetX + pad.l;
      const y0 = pad.t;
      const maxX = 4;
      const maxY = 80;

      ctx.fillStyle = "var(--surface-raised, #f1f5f9)";
      ctx.fillRect(offsetX, 0, half, H);

      // Grid
      ctx.strokeStyle = "var(--border, #e5e7eb)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const x = x0 + (i / maxX) * gW;
        ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + gH); ctx.stroke();
      }
      for (let i = 0; i <= 4; i++) {
        const y = y0 + (1 - i / 4) * gH;
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + gW, y); ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = "var(--ink, #1e293b)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + gH); ctx.lineTo(x0 + gW, y0 + gH); ctx.stroke();

      // Line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      pts.forEach(([t, d], i) => {
        const px = x0 + (t / maxX) * gW;
        const py = y0 + (1 - d / maxY) * gH;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Dots
      ctx.fillStyle = lineColor;
      pts.forEach(([t, d]) => {
        const px = x0 + (t / maxX) * gW;
        const py = y0 + (1 - d / maxY) * gH;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
      });

      // Labels
      ctx.fillStyle = "var(--ink, #1e293b)";
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
      for (let i = 0; i <= 4; i++) {
        const xp = x0 + (i / maxX) * gW;
        ctx.textAlign = "center";
        ctx.fillText(i, xp, y0 + gH + 12);
      }
      ctx.textAlign = "right";
      for (let i = 0; i <= 4; i++) {
        ctx.fillText(i * 20, x0 - 2, y0 + (1 - i / 4) * gH + 4);
      }
      ctx.textAlign = "left";
    }

    ctx.clearRect(0, 0, W, H);
    const s = scenarios[scenario];
    drawGraph(0, s.dtPoints, "Distance-time", "Distance (m)", "#2563eb");
    drawGraph(half, s.vtPoints, "Velocity-time", "Velocity (m/s)", "#dc2626");
  }, [scenario]);

  return (
    <Interactive title="Motion graph generator" subtitle="Choose a scenario to see both graph types side by side." takeaway="On a distance-time graph the gradient equals speed, while on a velocity-time graph the gradient equals acceleration and the area under the line equals distance travelled.">
      <SegToggle
        options={Object.entries(scenarios).map(([k, v]) => ({ value: k, label: v.label }))}
        value={scenario}
        onChange={setScenario}
      />
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{ width: "100%", maxWidth: 600, height: "auto", borderRadius: "0.5rem", marginTop: "0.75rem" }}
      />
      <Callout kind="tip" title="Reading the graphs">
        {scenarios[scenario].desc}
      </Callout>
    </Interactive>
  );
}

/* Newton's second law (F = ma) interactive */
function NewtonSecondSim() {
  const [mass, setMass] = useState(10);
  const [force, setForce] = useState(50);
  const accel = (force / mass).toFixed(2);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    posRef.current = 30;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "var(--surface, #f8f9fa)";
      ctx.fillRect(0, 0, W, H);

      // Ground
      ctx.fillStyle = "#d1d5db";
      ctx.fillRect(0, H - 20, W, 20);

      // Object (box) - size proportional to mass
      const boxW = Math.max(30, Math.min(80, mass * 3));
      const boxH = 40;
      const boxY = H - 20 - boxH;
      const boxX = posRef.current;

      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(boxX, boxY, boxW, boxH);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(mass + " kg", boxX + boxW / 2, boxY + boxH / 2 + 4);

      // Force arrow
      const arrowLen = Math.min(120, force * 0.8);
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
      ctx.fillStyle = "#374151";
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
    return () => cancelAnimationFrame(animRef.current);
  }, [mass, force, accel]);

  return (
    <Interactive title="Newton's second law (F = ma)" subtitle="Change force and mass to see how acceleration changes." takeaway="Applying a larger net force to the same mass produces a greater acceleration, and applying the same force to a larger mass produces a smaller acceleration, consistent with F = ma.">
      <canvas
        ref={canvasRef}
        width={600}
        height={110}
        style={{ width: "100%", maxWidth: 600, height: "auto", borderRadius: "0.5rem", marginBottom: "0.75rem" }}
      />
      <div className="ctrl-row" style={{ flexWrap: "wrap" }}>
        <Slider label="Mass" min={1} max={50} value={mass} onChange={setMass} unit=" kg" />
        <Slider label="Net force" min={5} max={200} step={5} value={force} onChange={setForce} unit=" N" />
      </div>
      <div className="stat-readout">
        <Stat value={force + " N"} label="Net force" />
        <Stat value={mass + " kg"} label="Mass" />
        <Stat value={accel + " m/s²"} label="Acceleration" />
      </div>
    </Interactive>
  );
}

/* Net force / free body diagram interactive */
function NetForceSim() {
  const [forceR, setForceR] = useState(40);
  const [forceL, setForceL] = useState(15);
  const net = forceR - forceL;
  const dir = net > 0 ? "right" : net < 0 ? "left" : "balanced";
  const absNet = Math.abs(net);

  return (
    <Interactive title="Net force diagram" subtitle="Set forces in each direction and find the resultant." takeaway="When opposing forces are equal the net force is zero and the object is in equilibrium; any imbalance produces a net force and the object accelerates in the direction of that net force.">
      <svg viewBox="0 0 360 90" width="100%" style={{ maxWidth: 380, display: "block", margin: "0 auto" }}>
        <rect x="140" y="25" width="80" height="40" rx="8" fill="#3b82f6" />
        <text x="180" y="50" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Object</text>
        {/* Left force */}
        <line x1={140 - Math.min(120, forceL * 1.2)} y1="45" x2="140" y2="45" stroke="#ef4444" strokeWidth="3" />
        <polygon
          points={`140,39 140,51 152,45`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          transform="scale(-1,1) translate(-280,0)"
        />
        <text x={140 - Math.min(120, forceL * 1.2) / 2} y="34" textAnchor="middle" fill="#ef4444" fontSize="11">{forceL} N</text>
        {/* Right force */}
        <line x1="220" y1="45" x2={220 + Math.min(120, forceR * 1.2)} y2="45" stroke="#10b981" strokeWidth="3" />
        <polygon points={`${220 + Math.min(120, forceR * 1.2)},39 ${220 + Math.min(120, forceR * 1.2)},51 ${220 + Math.min(120, forceR * 1.2) + 12},45`} fill="#10b981" />
        <text x={220 + Math.min(120, forceR * 1.2) / 2} y="34" textAnchor="middle" fill="#10b981" fontSize="11">{forceR} N</text>
      </svg>
      <div className="ctrl-row" style={{ flexWrap: "wrap" }}>
        <Slider label="Force RIGHT" min={0} max={80} value={forceR} onChange={setForceR} unit=" N" />
        <Slider label="Force LEFT" min={0} max={80} value={forceL} onChange={setForceL} unit=" N" />
      </div>
      <div className="stat-readout">
        <Stat value={net > 0 ? "+" + absNet : net < 0 ? "-" + absNet : "0"} label="Net force (N)" />
        <Stat value={dir === "balanced" ? "Equilibrium" : "Accelerates " + dir} label="Motion" />
      </div>
      {net === 0
        ? <Callout kind="success" title="Balanced">Net force = 0. Object at rest or constant velocity (Newton's first law).</Callout>
        : <Callout kind="key" title="Unbalanced">Net force = {absNet} N to the {dir}. Object accelerates in that direction.</Callout>
      }
    </Interactive>
  );
}


/* =========================================================
   SECTION 7.5 INTERACTIVES
   ========================================================= */

/* CER argument builder */
function CERBuilder() {
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [reasoning, setReasoning] = useState("");
  const complete = claim.trim().length > 0 && evidence.trim().length > 0 && reasoning.trim().length > 0;

  const textStyle = {
    width: "100%", padding: "0.5rem 0.75rem",
    border: "1.5px solid var(--border, #cbd5e1)",
    borderRadius: "0.5rem",
    background: "var(--surface, #f8f9fa)",
    color: "var(--ink, #1e293b)",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    resize: "vertical",
    minHeight: "60px",
    boxSizing: "border-box",
  };

  return (
    <Interactive title="CER argument builder" subtitle="Structure your argument about how waves and motion have changed society." takeaway="A well-structured scientific argument states a clear claim, backs it up with specific evidence, and explains through reasoning why that evidence supports the claim.">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div>
          <label style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.25rem" }}>
            Claim (your position statement)
          </label>
          <textarea style={textStyle} value={claim} onChange={e => setClaim(e.target.value)}
            placeholder="e.g. The understanding of wave physics has fundamentally transformed medical diagnosis..." />
        </div>
        <div>
          <label style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.25rem" }}>
            Evidence (specific facts or examples)
          </label>
          <textarea style={textStyle} value={evidence} onChange={e => setEvidence(e.target.value)}
            placeholder="e.g. Ultrasound imaging uses sound wave reflection to image internal organs without surgery..." />
        </div>
        <div>
          <label style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.25rem" }}>
            Reasoning (why evidence supports claim)
          </label>
          <textarea style={textStyle} value={reasoning} onChange={e => setReasoning(e.target.value)}
            placeholder="e.g. Because ultrasound is non-ionising it is safer than X-rays, which is why it is used in pregnancy monitoring worldwide..." />
        </div>
      </div>
      {complete && (
        <div style={{ marginTop: "1rem", background: "var(--accent-soft, #dbeafe)", borderRadius: "0.75rem", padding: "1rem" }}>
          <p style={{ margin: 0, fontWeight: 700, marginBottom: "0.4rem" }}>Your argument:</p>
          <p style={{ margin: "0 0 0.3rem" }}><strong>Claim:</strong> {claim}</p>
          <p style={{ margin: "0 0 0.3rem" }}><strong>Evidence:</strong> {evidence}</p>
          <p style={{ margin: 0 }}><strong>Reasoning:</strong> {reasoning}</p>
        </div>
      )}
      {!complete && <p className="muted" style={{ marginTop: "0.5rem" }}>Fill in all three fields to preview your complete argument.</p>}
    </Interactive>
  );
}


/* =========================================================
   SECTIONS
   ========================================================= */

function Section71({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">7.1 Common Properties of Waves</div>
        <h1>What are waves?</h1>
        <p className="lead">Waves carry energy across space and through matter. Here you will explore what all waves have in common and discover how light and sound differ in fundamental ways.</p>
      </div>

      <Figure src="img/wave.png" caption="A transverse wave showing crest, trough and wavelength." />
      <DotPoint id="7.1.1" title="Mechanical waves and electromagnetic waves" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A wave that requires a physical medium (solid, liquid or gas) to travel through.">mechanical wave</Term> needs matter to travel. Sound, water ripples, and seismic waves are all mechanical. Take away the medium and the wave disappears. That is why the vacuum of space is silent: no air means no sound.</p>
        <p>An <Term def="A wave made of oscillating electric and magnetic fields that can travel through a vacuum.">electromagnetic (EM) wave</Term> is completely different. It does not need particles. The electric and magnetic fields that make it up sustain each other as they travel, so light from the Sun crosses 150 million kilometres of almost empty space to reach you. Radio waves, X-rays, and microwaves are all electromagnetic.</p>
        <p>The classic demonstration is the bell-jar experiment. A ringing electric bell sits inside a sealed jar. As a vacuum pump removes the air, the sound fades completely even though you can still see the bell vibrating. Restore the air and the sound returns. The light travelling through the glass (an EM wave) was never affected because it needs no medium.</p>
        <Figure num="1" caption="Mechanical waves need particles; EM waves do not.">
          <svg viewBox="0 0 520 90" width="100%" style={{ maxWidth: 520 }}>
            {[
              ["Mechanical Wave", "Needs a medium", "Sound, water ripples", "#bfdbfe"],
              ["Electromagnetic Wave", "No medium needed", "Light, radio, X-rays", "#d1fae5"],
            ].map(([title, sub, ex, bg], i) => (
              <g key={title} transform={`translate(${i * 268 + 4}, 4)`}>
                <rect width="248" height="80" rx="12" fill={bg} stroke="var(--accent-deep,#1d4ed8)" strokeWidth="1.5" />
                <text x="124" y="26" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{title}</text>
                <text x="124" y="46" textAnchor="middle" fontSize="11" fill="#374151">{sub}</text>
                <text x="124" y="66" textAnchor="middle" fontSize="11" fill="#6b7280">{ex}</text>
              </g>
            ))}
          </svg>
        </Figure>
        <Callout kind="key" title="Key difference">Mechanical waves die without a medium. EM waves travel through a vacuum at 3 x 10^8 m/s.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={1} question="Which of the following is a mechanical wave?" options={["Radio waves", "Light from a torch", "Sound from a speaker", "X-rays"]} correct={2} explain="Sound is a mechanical wave that needs air (a medium) to travel. Radio waves, light, and X-rays are all electromagnetic." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.1.2" title="Waves transfer energy without transferring particles" progress={progress} setProgress={setProgress}>
        <p>The most important and often misunderstood feature of all waves is that they transfer <Term def="The capacity to do work, measured in joules (J).">energy</Term> from place to place <em>without</em> carrying matter with them. When a wave moves through a medium, each particle oscillates back and forth about its rest position and passes energy to its neighbours. The particle returns to where it started. The wave pattern advances; the individual particles do not travel with it.</p>
        <p>Think of a Mexican wave in a sports stadium. Every person moves only up and down and returns to their seat. The visible wave travels horizontally around the stadium without anyone moving around it. A cork bobbing on water does the same thing: it bobs up and down while the wave energy travels forward past it.</p>
        <Callout kind="tip" title="Try it yourself">Drop a pebble in a still pond and watch a floating leaf. The leaf bobs up and down but does not drift away with the ripples.</Callout>
      </DotPoint>

      <DotPoint id="7.1.3" title="Transverse and longitudinal waves" progress={progress} setProgress={setProgress}>
        <p>Waves are classified by the relationship between the direction particles oscillate and the direction the wave travels. In a <Term def="A wave in which particles oscillate perpendicular (at right angles) to the direction of wave travel. It has crests and troughs.">transverse wave</Term>, particles move at right angles to the wave's direction. Shaking one end of a rope up and down creates a transverse wave that travels along the rope while rope segments move up and down. All electromagnetic waves are transverse.</p>
        <p>In a <Term def="A wave in which particles oscillate parallel to (in the same direction as) the wave's travel. It has compressions and rarefactions.">longitudinal wave</Term>, particles oscillate in the same direction as the wave travels. Sound is the best example. A speaker cone pushes air molecules together into a region of high pressure called a <Term def="A region in a longitudinal wave where particles are pushed close together, creating higher than normal pressure.">compression</Term>, then pulls back creating a region of low pressure called a <Term def="A region in a longitudinal wave where particles spread apart, creating lower than normal pressure.">rarefaction</Term>. These regions travel outward as the sound wave.</p>
        <WaveSim />
        <QGroup title="Check yourself">
          <MCQ num={2} question="A wave on a rope travels horizontally. The rope segments move up and down. What type of wave is this?" options={["Longitudinal", "Transverse", "Electromagnetic", "Compression"]} correct={1} explain="Particles moving perpendicular (at right angles) to the wave's travel direction defines a transverse wave." />
          <WrittenQ num={3} question="How would you tell the difference between a transverse and a longitudinal wave by watching a slinky spring?" model="In a transverse wave the coils move side to side (perpendicular to the direction of wave travel), producing crests and troughs. In a longitudinal wave the coils move back and forth along the direction of travel, producing alternating regions where coils are bunched together (compressions) and spread apart (rarefactions)." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.1.4" title="The electromagnetic spectrum" progress={progress} setProgress={setProgress}>
        <p>The <Term def="The complete range of all electromagnetic waves, ordered by frequency or wavelength.">electromagnetic spectrum</Term> is the complete family of all EM waves. All of them travel at 3 x 10^8 m/s in a vacuum, but they differ enormously in frequency and wavelength. From lowest to highest frequency the regions are: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays.</p>
        <p>Higher frequency means more energy per photon. Radio waves are non-ionising and harmless at normal intensities. Gamma rays are <Term def="Radiation with enough energy per photon to remove electrons from atoms, potentially damaging DNA.">ionising</Term> and can break chemical bonds in DNA, which is why they are used to kill cancer cells but also why radiation exposure must be carefully controlled.</p>
        <EMExplorer />
        <Callout kind="warn" title="Ionising radiation">Ultraviolet, X-rays, and gamma rays carry enough energy to damage living cells. Exposure should be minimised or shielded where possible.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={4} question="Which part of the electromagnetic spectrum has the longest wavelength?" options={["Gamma rays", "Visible light", "Radio waves", "Ultraviolet"]} correct={2} explain="Radio waves have the longest wavelengths (up to kilometres) and the lowest frequencies in the EM spectrum." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.1.5" title="Features of waves: amplitude, frequency, wavelength, speed" progress={progress} setProgress={setProgress}>
        <p>Every wave can be described with four measurable features. <Term def="The maximum displacement of a particle from its rest position. Related to the energy the wave carries.">Amplitude (A)</Term> is the height of a crest (or depth of a trough) measured from the midline. Doubling the amplitude quadruples the energy. <Term def="The number of complete wave cycles that pass a point per second. Measured in hertz (Hz).">Frequency (f)</Term> is the number of complete waves passing a point each second, measured in <Term def="The unit of frequency. 1 Hz means one complete cycle per second.">hertz (Hz)</Term>.</p>
        <p><Term def="The distance between two successive identical points on a wave, such as crest to crest. Symbol: lambda. Unit: metres.">Wavelength (lambda)</Term> is the crest-to-crest distance. The <Term def="The time taken for one complete wave cycle. T = 1/f.">period (T)</Term> is the time for one cycle: T = 1/f. <Term def="How fast the wave pattern moves through the medium. v = d/t for waves. Unit: m/s.">Wave speed (v)</Term> measures how quickly the wave pattern advances.</p>
        <Figure num="2" caption="The four key features of a wave shown on a transverse wave diagram.">
          <svg viewBox="0 0 560 130" width="100%" style={{ maxWidth: 560 }}>
            <line x1="30" y1="65" x2="540" y2="65" stroke="var(--border,#cbd5e1)" strokeWidth="1" strokeDasharray="6,4" />
            <path d="M30,65 Q100,5 170,65 Q240,125 310,65 Q380,5 450,65 Q520,125 540,85" fill="none" stroke="var(--accent-deep,#1d4ed8)" strokeWidth="3" />
            {/* Amplitude */}
            <line x1="100" y1="5" x2="100" y2="65" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="104" y="38" fontSize="11" fill="#ef4444" fontWeight="600">A (amplitude)</text>
            {/* Wavelength */}
            <line x1="30" y1="120" x2="310" y2="120" stroke="#10b981" strokeWidth="1.5" />
            <line x1="30" y1="115" x2="30" y2="125" stroke="#10b981" strokeWidth="1.5" />
            <line x1="310" y1="115" x2="310" y2="125" stroke="#10b981" strokeWidth="1.5" />
            <text x="160" y="118" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="600">lambda (wavelength)</text>
            {/* Labels */}
            <text x="100" y="13" textAnchor="middle" fontSize="10" fill="#374151">crest</text>
            <text x="240" y="128" textAnchor="middle" fontSize="10" fill="#374151">trough</text>
          </svg>
        </Figure>
      </DotPoint>

      <DotPoint id="7.1.6" title="The wave equation: v = f x lambda" progress={progress} setProgress={setProgress}>
        <p>The three key wave quantities are linked by one elegant equation: <strong>v = f x lambda</strong>. If f waves pass a point every second and each wave is lambda metres long, the wave front must travel f x lambda metres per second. This is the wave speed. Rearranging gives: lambda = v / f and f = v / lambda.</p>
        <p>When a wave enters a new medium, the frequency stays constant (it is set by the source). If the speed changes, the wavelength must adjust so that v = f x lambda still holds. This is why light slows down and its wavelength shortens when it enters glass, causing refraction.</p>
        <WaveCalcSim />
        <QGroup title="Check yourself">
          <MCQ num={5} question="A sound wave in air has a frequency of 500 Hz and a wavelength of 0.68 m. What is its speed?" options={["0.00136 m/s", "735 m/s", "340 m/s", "500 m/s"]} correct={2} explain="v = f x lambda = 500 x 0.68 = 340 m/s, which is the speed of sound in air at room temperature." />
          <WrittenQ num={6} question="A radio station broadcasts at 100 MHz (10^8 Hz). The speed of light is 3 x 10^8 m/s. Calculate the wavelength of the radio waves." model="lambda = v / f = (3 x 10^8) / (1 x 10^8) = 3 m. The wavelength of the radio waves is 3 metres." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.1.7" title="Uses of EM waves from data analysis" progress={progress} setProgress={setProgress}>
        <p>The property of each EM band that makes it useful is directly linked to its frequency. You can analyse secondary data (tables, graphs, reports) to compare uses across the spectrum. For example, X-rays penetrate soft tissue but are absorbed by bone, making them ideal for detecting fractures. Gamma rays are ionising enough to kill cells, making them useful for sterilising surgical equipment and treating tumours, but they require lead shielding to protect workers.</p>
        <Callout kind="fact" title="MRI uses radio waves">Magnetic resonance imaging (MRI) uses radio waves, which are non-ionising. This makes MRI much safer for repeated use than X-ray imaging, with no radiation risk.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={7} question="A hospital wants to sterilise sealed surgical instruments. Which EM wave type is most appropriate and why?" model="Gamma rays are the most appropriate because they are highly penetrating and ionising, capable of killing microorganisms inside sealed packaging. UV light cannot penetrate opaque packaging. Workers must use remote handling and lead shielding because gamma rays are also dangerous to humans." />
        </QGroup>
      </DotPoint>
    </>
  );
}


function Section72({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">7.2 Sound Waves</div>
        <h1>Sound: the wave you feel</h1>
        <p className="lead">Sound is energy moving through matter as a series of pressure pulses. Explore how it travels, how you hear it, and how it is used in medicine.</p>
      </div>

      <Figure src="img/sound.png" caption="Sound travels as compressions and rarefactions through the air to the ear." />
      <DotPoint id="7.2.1" title="Sound energy travels as compressions and rarefactions" progress={progress} setProgress={setProgress}>
        <p>When an object vibrates, it pushes the surrounding air molecules together, forming a <Term def="A region of higher-than-normal pressure in a longitudinal wave where molecules are pushed close together.">compression</Term>. Then it pulls back, spreading the molecules apart into a <Term def="A region of lower-than-normal pressure in a longitudinal wave where molecules spread apart.">rarefaction</Term>. These alternating pressure changes radiate outward as a longitudinal mechanical wave. The individual air molecules do not travel to your ear. Only the pattern of pressure variations travels.</p>
        <p>The speed of sound depends on the medium and its temperature. In dry air at 20 degrees Celsius, sound travels at about 343 m/s. In water, molecules are much closer together, so collisions transfer energy faster: sound travels at about 1480 m/s in water. In steel, it reaches roughly 5000 m/s. Warmer air also carries sound faster because molecules move faster and collide more frequently.</p>
        <Callout kind="key" title="No medium, no sound">Sound is a mechanical wave. In a vacuum there are no molecules to compress or rarefy, so sound cannot exist. Space is silent.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={8} question="A student shouts and hears an echo from a cliff 0.4 s later. The speed of sound is 340 m/s. How far away is the cliff?" options={["136 m", "68 m", "340 m", "0.4 m"]} correct={1} explain="Distance = speed x time / 2 = 340 x 0.4 / 2 = 68 m. We divide by 2 because the sound travels to the cliff and back." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.2.2" title="Amplitude and frequency control volume and pitch" progress={progress} setProgress={setProgress}>
        <p>Two independent features of a sound wave control what you hear. The <Term def="The maximum pressure variation from normal in a sound wave. Determines loudness.">amplitude</Term> of a sound wave determines its loudness: larger amplitude means larger pressure variations, which make your eardrum vibrate more vigorously. Loudness is measured in <Term def="The unit of sound intensity level. A logarithmic scale where a 10 dB increase represents roughly ten times more intensity.">decibels (dB)</Term>. Normal conversation is about 60 dB; sounds above 85 dB can cause permanent hearing damage with prolonged exposure.</p>
        <p>The <Term def="The number of complete pressure cycles per second in a sound wave. Determines pitch.">frequency</Term> of a sound wave determines its pitch. A high frequency (many compressions per second) gives a high-pitched sound. Humans hear sounds from about 20 Hz to 20,000 Hz. Sounds above 20,000 Hz are called <Term def="Sound with a frequency above 20,000 Hz, beyond the upper limit of human hearing.">ultrasound</Term>; sounds below 20 Hz are <Term def="Sound with a frequency below 20 Hz, below the lower limit of human hearing.">infrasound</Term>.</p>
        <SoundVizSim />
        <QGroup title="Check yourself">
          <WrittenQ num={9} question="A singer holds the same note but sings louder. Describe what changes in the sound wave and what stays the same." model="The amplitude of the sound wave increases (louder sound), but the frequency (and therefore the pitch of the note) stays the same. A larger amplitude means bigger pressure variations, which the ear perceives as a louder sound." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.2.3" title="The Doppler effect" progress={progress} setProgress={setProgress}>
        <p>The <Term def="The change in observed frequency of a wave due to relative motion between the source and the observer.">Doppler effect</Term> is the change in the pitch you hear when the source of a sound moves towards or away from you. As an ambulance approaches, it emits each successive compression from a position slightly closer to you than the last, so the compressions arrive more frequently. You hear a higher pitch than the siren actually produces. As the ambulance moves away, compressions arrive less frequently and the pitch drops. The source frequency never changes; only the observed frequency does.</p>
        <p>The Doppler effect applies to all waves, not just sound. For light, a source approaching Earth shows a <Term def="A shift of light towards shorter wavelengths (higher frequency) caused by the source moving towards the observer.">blueshift</Term>; a source moving away shows a <Term def="A shift of light towards longer wavelengths (lower frequency) caused by the source moving away from the observer.">redshift</Term>. Astronomers use redshift to measure how fast galaxies move away from Earth. Police speed cameras use the Doppler effect of reflected radar to measure vehicle speeds. Doppler ultrasound scans measure blood flow speed in arteries.</p>
        <DopplerSim />
        <QGroup title="Check yourself">
          <MCQ num={10} question="A train approaches a platform sounding its horn at 500 Hz. What does the person on the platform hear as the train approaches?" options={["Exactly 500 Hz", "A frequency lower than 500 Hz", "A frequency higher than 500 Hz", "No sound at all"]} correct={2} explain="As the source approaches, successive compressions arrive more frequently than they are emitted, so the observer hears a frequency higher than 500 Hz. After the train passes, the observed frequency drops below 500 Hz." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.2.4" title="How the ear responds to sound waves" progress={progress} setProgress={setProgress}>
        <p>Your ear converts sound waves (mechanical energy) into electrical signals that your brain interprets as sound. The <Term def="The visible outer flap of the ear that collects and funnels sound waves into the ear canal.">pinna</Term> funnels sound into the ear canal towards the <Term def="The thin membrane separating the outer and middle ear. It vibrates at the same frequency as incoming sound waves.">eardrum (tympanic membrane)</Term>. Pressure variations in the sound wave make the eardrum vibrate at exactly the sound's frequency.</p>
        <p>Three tiny bones in the middle ear, the <Term def="The three small bones (malleus, incus, stapes) in the middle ear that amplify and transmit vibrations from the eardrum to the oval window.">ossicles</Term> (malleus, incus, stapes), amplify these vibrations and deliver them to the oval window, the entry point of the inner ear. Inside the fluid-filled <Term def="The spiral-shaped inner ear structure lined with hair cells that converts mechanical vibrations into electrical nerve signals.">cochlea</Term>, thousands of hair cells line the basilar membrane. Hair cells near the base respond to high frequencies; those near the apex respond to low frequencies. When hair cells bend, they generate electrical signals that travel to the brain along the auditory nerve.</p>
        <Figure num="3" caption="Pathway of sound through the ear.">
          <svg viewBox="0 0 560 70" width="100%" style={{ maxWidth: 560 }}>
            {["Pinna", "Ear canal", "Eardrum", "Ossicles", "Oval window", "Cochlea", "Auditory nerve"].map((s, i) => (
              <g key={s} transform={`translate(${i * 80 + 4}, 8)`}>
                <rect width="68" height="40" rx="8" fill="var(--accent-soft,#dbeafe)" stroke="var(--accent-deep,#1d4ed8)" strokeWidth="1.5" />
                <text x="34" y="25" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--ink)">{s}</text>
                {i < 6 && <text x="76" y="28" textAnchor="middle" fontSize="14" fill="var(--accent-deep,#1d4ed8)">›</text>}
              </g>
            ))}
          </svg>
        </Figure>
        <Callout kind="warn" title="Protect your hearing">Hair cells in the cochlea cannot regenerate once damaged. Prolonged exposure above 85 dB causes permanent hearing loss, usually starting with high-frequency sounds.</Callout>
      </DotPoint>

      <DotPoint id="7.2.5" title="Aboriginal and Torres Strait Islander instruments and material selection" progress={progress} setProgress={setProgress}>
        <p>Aboriginal and Torres Strait Islander peoples have developed musical and communication instruments over thousands of years, with material selection directly shaping the acoustic properties. The <Term def="A long hollow wind instrument made from eucalyptus wood, traditionally used by Aboriginal peoples. One of the world's oldest known wind instruments.">didgeridoo</Term> (also called yidaki or mago in different language groups) is typically made from eucalyptus branches naturally hollowed by termites. The density and hardness of the eucalyptus wood, combined with the length and internal diameter of the hollow bore, determine the fundamental resonant frequency and richness of overtones. A longer bore produces a lower pitch because a longer air column has a longer standing wave wavelength, and since v = f x lambda at constant speed, a longer wavelength means lower frequency.</p>
        <p>Clapsticks (bilma) are made from very hard, dense hardwoods such as acacia. Hard materials vibrate at high frequency and release energy quickly when struck, producing a sharp crack that carries well over distance. This makes clapsticks effective for both music and long-distance communication. The bullroarer is a flat piece of wood on a cord that, when swung, produces a deep low-frequency humming sound through aerodynamic vibration. Its low frequency travels particularly far, historically used for ceremony and communication across vast areas of Country.</p>
        <Callout kind="fact" title="Physics and culture">The choice of material is not just traditional: it is a practical application of acoustic physics. Dense, hard woods carry more energy as sound and lose less to heat in the walls. Longer, wider bores produce lower fundamental frequencies. These principles were understood and applied for thousands of years before formal wave physics was written down.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={11} question="Explain why a longer didgeridoo produces a lower pitch than a shorter one. Use the wave equation in your answer." model="A longer hollow tube supports a standing wave with a longer wavelength. Using v = f x lambda: if the speed of sound in air is constant and the wavelength increases (longer tube), the frequency must decrease. Lower frequency produces a lower-pitched sound." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.2.6" title="Sound waves in medical diagnosis" progress={progress} setProgress={setProgress}>
        <p>Medical <Term def="A diagnostic imaging technique using high-frequency sound waves (above 20,000 Hz) reflected from tissue boundaries to build images of internal structures.">ultrasound</Term> imaging uses sound frequencies between 1 MHz and 20 MHz. A transducer pressed against the skin emits short pulses of sound. When those pulses reach a boundary between two different tissue types (for example, the edge of an organ), some sound is reflected back as an echo. The transducer detects the echo and a computer calculates the depth using: depth = (speed x time) / 2 (divided by 2 because sound travels to the boundary and back).</p>
        <p>Thousands of such echoes are assembled into a real-time image on screen. Unlike X-rays, ultrasound is non-ionising, so it cannot damage DNA. This is why ultrasound is the preferred method for imaging a developing foetus during pregnancy. Doppler ultrasound uses the Doppler effect to measure blood flow speed and direction in real time without any surgery.</p>
        <UltrasoundCalc />
        <QGroup title="Check yourself">
          <MCQ num={12} question="Why is ultrasound preferred over X-rays for imaging a developing foetus?" options={["Ultrasound is cheaper", "Ultrasound is non-ionising and cannot damage DNA", "Ultrasound gives sharper images", "X-rays cannot penetrate tissue"]} correct={1} explain="Ultrasound is non-ionising and does not carry enough energy to damage DNA, making it safe for the rapidly dividing cells of a developing foetus. X-rays are ionising and could increase the risk of mutations." />
        </QGroup>
      </DotPoint>
    </>
  );
}


function Section73({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">7.3 Light Waves</div>
        <h1>Light and how we see</h1>
        <p className="lead">Light is a transverse EM wave. Discover how your eye detects it, how surfaces interact with it, and what the full spectrum tells us about distant stars.</p>
      </div>

      <DotPoint id="7.3.1" title="How the eye responds to light" progress={progress} setProgress={setProgress}>
        <p>Your eye is an optical instrument that focuses light onto a light-sensitive layer and converts it into electrical signals. Light enters through the <Term def="The transparent curved front surface of the eye. Provides most of the eye's refractive power.">cornea</Term>, which provides about two-thirds of the eye's total bending (refraction) power. The <Term def="The coloured muscular ring of the eye that controls the size of the pupil.">iris</Term> controls the size of the <Term def="The dark opening in the iris that controls how much light enters the eye.">pupil</Term>: in bright light it contracts to a small pupil; in dim light it dilates to let in more light.</p>
        <p>Behind the iris, the flexible <Term def="A transparent disc in the eye that adjusts its curvature to focus light on the retina. Changes shape through accommodation.">lens</Term> fine-tunes the focus through a process called <Term def="The process by which the ciliary muscles change the shape of the lens to focus on objects at different distances.">accommodation</Term>. Ciliary muscles contract to thicken the lens for close objects and relax to flatten it for distant objects. The focused image falls on the <Term def="The light-sensitive layer at the back of the eye containing rod and cone photoreceptor cells.">retina</Term>, which contains two types of photoreceptors: <Term def="Photoreceptor cells sensitive to low light levels and movement. Do not distinguish colour.">rods</Term> (for low-light and motion detection) and <Term def="Photoreceptor cells that require bright light and detect colour. Three types respond to red, green, and blue wavelengths.">cones</Term> (for colour vision in bright light, sensitive to red, green, and blue). Electrical signals from these cells travel to the brain via the optic nerve.</p>
        <Callout kind="key" title="Why you can't see colour in dim light">Cones need bright light to respond. In low-light conditions only rods are active, and rods are not sensitive to colour differences. That is why everything looks grey or black and white at night.</Callout>
      </DotPoint>

      <DotPoint id="7.3.2" title="Absorption, reflection, refraction and scattering" progress={progress} setProgress={setProgress}>
        <p>When light hits a surface, it can be <Term def="A process where light energy is taken in by a material and converted to another form, usually thermal energy.">absorbed</Term>, <Term def="A process where light bounces off a surface. The angle of incidence equals the angle of reflection.">reflected</Term>, or transmitted. Objects appear coloured because they absorb some wavelengths and reflect others. A red apple absorbs green and blue light but reflects red wavelengths back to your eyes. A black surface absorbs nearly all wavelengths; a white surface reflects nearly all of them.</p>
        <p><Term def="The bending of a wave as it crosses the boundary between two media of different optical density. Occurs because light changes speed.">Refraction</Term> happens when light changes speed as it enters a new medium. Light slows in denser media (like glass or water). This speed change causes the wavefront to bend. That is why a straw in a glass of water appears bent at the surface: your brain assumes light travels in straight lines and traces the refracted ray back to a position that does not match the actual position of the straw.</p>
        <p><Term def="The redirection of light in multiple directions when it interacts with small particles. Short wavelengths are scattered more than long wavelengths.">Scattering</Term> occurs when light interacts with small particles. In the atmosphere, gas molecules scatter short wavelengths (blue and violet) much more than long wavelengths (red and orange). This is why the sky is blue: scattered blue light comes from every direction. At sunset, sunlight travels through much more atmosphere, scattering away nearly all the blue light and leaving the red-orange glow at the horizon.</p>
        <LightPropertiesSim />
        <QGroup title="Check yourself">
          <MCQ num={13} question="Why does the sky appear blue?" options={["The sky absorbs all colours except blue", "Blue light is scattered most by gas molecules in the atmosphere", "The Sun only emits blue light", "Water vapour makes the sky blue"]} correct={1} explain="Rayleigh scattering: gas molecules in the atmosphere scatter shorter wavelengths (blue) much more than longer wavelengths (red). Scattered blue light comes from all parts of the sky." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.3.3" title="Applications of light properties in everyday life" progress={progress} setProgress={setProgress}>
        <p>The properties of light underpin many everyday technologies. Solar hot-water collectors use a dark, absorbing surface to convert solar radiation into thermal energy for heating water. Spectacles correct vision through refraction: a concave (diverging) lens corrects short-sightedness by spreading light rays so they focus on the retina rather than in front of it; a convex (converging) lens corrects long-sightedness. Fibre optic cables guide light signals around bends using <Term def="The complete reflection of light back into a denser medium when the angle of incidence exceeds the critical angle. Used in optical fibres.">total internal reflection</Term>, transmitting data at the speed of light over vast distances with minimal loss.</p>
        <p>Rainbows form through refraction and dispersion in water droplets: white sunlight enters a droplet and is split into its constituent wavelengths because different wavelengths refract by slightly different amounts. They reflect off the back of the droplet and exit spread into a spectrum. Curved mirrors are used in torches, car headlights, and reflecting telescopes to redirect light into useful beams or to focus incoming light from distant stars.</p>
        <Figure num="4" caption="Three light properties and their everyday applications.">
          <svg viewBox="0 0 540 80" width="100%" style={{ maxWidth: 540 }}>
            {[
              ["Absorption", "Solar panels\nDark clothing", "#f59e0b"],
              ["Reflection", "Mirrors\nFibre optics (TIR)\nRoad markings", "#3b82f6"],
              ["Refraction", "Spectacles\nCamera lenses\nRainbows", "#10b981"],
            ].map(([title, apps, color], i) => (
              <g key={title} transform={`translate(${i * 182 + 4}, 4)`}>
                <rect width="170" height="72" rx="12" fill={color + "20"} stroke={color} strokeWidth="1.5" />
                <text x="85" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
                {apps.split("\n").map((line, j) => (
                  <text key={j} x="85" y={38 + j * 14} textAnchor="middle" fontSize="10" fill="#374151">{line}</text>
                ))}
              </g>
            ))}
          </svg>
        </Figure>
      </DotPoint>

      <DotPoint id="7.3.4" title="The EM spectrum and what it tells us about stars" progress={progress} setProgress={setProgress}>
        <p>Stars emit radiation across the entire electromagnetic spectrum. Astronomers use different telescopes to observe different regions, building a complete picture of each star. The temperature of a star determines where it emits most strongly: very hot stars (above 30,000 K) peak in the ultraviolet; the Sun (about 5800 K) peaks in visible light; cool stars peak in the infrared. This relationship is described by Wien's displacement law: peak wavelength x temperature = 2.9 x 10^6 nm K.</p>
        <p>A star's chemical composition is revealed by its spectrum. When starlight is split by a prism, dark <Term def="Dark lines in a stellar spectrum where atoms in the star's cooler outer atmosphere have absorbed specific wavelengths, creating a chemical fingerprint.">absorption lines (Fraunhofer lines)</Term> appear at wavelengths that match the energy transitions of specific atoms. Each element has a unique pattern of lines. The Doppler effect applies to light too: if these lines are shifted towards shorter wavelengths (blueshift), the star is approaching; if shifted towards longer wavelengths (redshift), it is receding.</p>
        <StarTempExplorer />
        <QGroup title="Check yourself">
          <WrittenQ num={14} question="A star's spectrum shows absorption lines that are shifted to longer wavelengths compared to laboratory measurements of the same lines. What does this tell you about the star's motion?" model="The shift to longer wavelengths is a redshift, caused by the Doppler effect. This tells us the star is moving away from Earth. The size of the shift is proportional to the star's recession speed." />
        </QGroup>
      </DotPoint>
    </>
  );
}


function Section74({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">7.4 Motion</div>
        <h1>Forces, motion and Newton's laws</h1>
        <p className="lead">Everything that moves follows rules. Learn the language of motion, master distance-time and velocity-time graphs, and use Newton's three laws to explain the world around you.</p>
      </div>

      <Figure src="img/motion.png" caption="A distance–time graph rises as an object moves." />
      <DotPoint id="7.4.1" title="Distance, displacement, speed and velocity" progress={progress} setProgress={setProgress}>
        <p><Term def="The total length of the path travelled by an object. A scalar quantity with no direction.">Distance</Term> is the total path length, a <Term def="A quantity that has magnitude (size) only, with no direction.">scalar</Term> quantity. <Term def="The straight-line distance from start to finish, including direction. A vector quantity.">Displacement</Term> is the straight-line distance from start to end, including direction: it is a <Term def="A quantity that has both magnitude and direction.">vector</Term>. An athlete who runs one lap of a 400 m track and returns to the start has covered 400 m of distance but zero displacement.</p>
        <p><Term def="The rate of change of distance. Speed = distance / time. A scalar quantity.">Speed</Term> is the rate of change of distance (v = d/t), a scalar. <Term def="The rate of change of displacement. Velocity = displacement / time. A vector quantity with magnitude and direction.">Velocity</Term> is the rate of change of displacement, a vector that includes direction. Moving at 60 km/h north is a different velocity from 60 km/h south, even though the speed is the same. An object moving in a circle at constant speed is continuously changing its velocity because its direction is changing.</p>
        <Callout kind="tip" title="Remembering the difference">Speed = how fast (no direction). Velocity = how fast AND which way. Displacement = how far from start to finish, in a straight line, including direction.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={15} question="A car travels 120 km in 1.5 hours. What is its average speed?" options={["80 km/h", "180 km/h", "1.5 km/h", "120 km/h"]} correct={0} explain="Average speed = distance / time = 120 km / 1.5 h = 80 km/h." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.4.2" title="Motion diagrams and graphs" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A graph of distance (y-axis) against time (x-axis). The gradient at any point equals the speed.">distance-time graph</Term> shows how far an object has travelled. The gradient (slope) of the line at any point equals the speed at that moment. A horizontal line means the object is stationary. A straight upward slope means constant speed. A curve with increasing gradient means the object is accelerating.</p>
        <p>A <Term def="A graph of speed (y-axis) against time (x-axis). The gradient equals acceleration; the area under the line equals distance travelled.">velocity-time graph</Term> is different: the gradient now equals acceleration, and the area under the line equals the distance travelled. A horizontal line means constant speed (zero acceleration). A line sloping upward means constant acceleration. The area of a triangle or rectangle under the line gives the distance for that time interval.</p>
        <MotionGraphSim />
        <Callout kind="key" title="Graph gradients summarised">Distance-time: gradient = speed. Velocity-time: gradient = acceleration, area under line = distance.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={16} question="A velocity-time graph shows a straight line starting at 0 m/s, rising to 20 m/s over 4 seconds, then staying constant at 20 m/s for 6 seconds. Calculate the total distance travelled in 10 seconds." model="Distance during acceleration = area of triangle = 0.5 x base x height = 0.5 x 4 x 20 = 40 m. Distance at constant speed = area of rectangle = 6 x 20 = 120 m. Total distance = 40 + 120 = 160 m." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.4.4" title="Newton's second law: F = ma" progress={progress} setProgress={setProgress}>
        <p>Newton's second law states that the <Term def="The vector sum of all forces acting on an object. Determines acceleration via F = ma.">net force</Term> acting on an object equals its mass multiplied by its acceleration: <strong>F = ma</strong>. Here F is the net force in <Term def="The SI unit of force. 1 newton accelerates a 1 kg mass at 1 m/s squared.">newtons (N)</Term>, m is mass in kilograms (kg), and a is acceleration in m/s squared. The same force on a smaller mass produces a bigger acceleration. The same mass under a larger force accelerates more rapidly.</p>
        <p>A <Term def="The gravitational force pulling an object towards Earth. W = mg, where g = 9.8 m/s squared.">weight force (W = mg)</Term> is a direct application of Newton's second law: gravity applies a force of mg newtons to a mass m, giving it an acceleration g. On Earth g is approximately 9.8 m/s squared (often rounded to 10 m/s squared for calculations). The net force is the vector sum of all forces: if a 1200 kg car has an engine force of 5000 N forward and friction of 2000 N backward, the net force is 3000 N and the acceleration is a = F/m = 3000/1200 = 2.5 m/s squared.</p>
        <NewtonSecondSim />
        <QGroup title="Check yourself">
          <MCQ num={17} question="A net force of 30 N acts on a 6 kg object. What is the acceleration?" options={["5 m/s squared", "180 m/s squared", "0.2 m/s squared", "36 m/s squared"]} correct={0} explain="a = F/m = 30 / 6 = 5 m/s squared." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.4.5" title="Newton's three laws of motion" progress={progress} setProgress={setProgress}>
        <p>Newton's first law (the law of <Term def="The tendency of an object to resist any change to its state of motion. Greater mass means greater inertia.">inertia</Term>) states that an object at rest stays at rest, and an object in motion continues at constant velocity, unless a net external force acts on it. This is why you lurch forward when a car brakes suddenly: your body continues at the original speed while the car decelerates. A seatbelt provides the backward force to decelerate you safely.</p>
        <p>Newton's third law states that for every action force there is an equal and opposite reaction force acting on a different object. When a rocket engine pushes exhaust gases backward, the gases push the rocket forward with the same magnitude of force. When you push off a swimming pool wall, the wall pushes you back into the water. The action-reaction pair is always the same type of force, always equal in magnitude, always opposite in direction, and always acts on different objects.</p>
        <Figure num="5" caption="Newton's three laws summarised with everyday examples.">
          <svg viewBox="0 0 540 90" width="100%" style={{ maxWidth: 540 }}>
            {[
              ["1st Law", "Inertia", "Seatbelts protect\npassengers in a crash", "#3b82f6"],
              ["2nd Law", "F = ma", "Heavier car needs more\nforce to accelerate", "#10b981"],
              ["3rd Law", "Action-Reaction", "Rocket: gases back,\ncraft forward", "#8b5cf6"],
            ].map(([law, label, ex, color], i) => (
              <g key={law} transform={`translate(${i * 182 + 4}, 4)`}>
                <rect width="170" height="80" rx="12" fill={color + "18"} stroke={color} strokeWidth="1.5" />
                <text x="85" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{law}</text>
                <text x="85" y="40" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)">{label}</text>
                {ex.split("\n").map((line, j) => (
                  <text key={j} x="85" y={56 + j * 15} textAnchor="middle" fontSize="10" fill="#374151">{line}</text>
                ))}
              </g>
            ))}
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <WrittenQ num={18} question="Explain how a helicopter generates lift using Newton's third law. What force pair is involved?" model="The rotor blades spin and push a large volume of air downward (action force). By Newton's third law, the air pushes back on the rotor blades with an equal and opposite upward force (reaction). This upward reaction force is lift. When lift exceeds the helicopter's weight, it rises." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.4.6" title="Net force and vector analysis in one dimension" progress={progress} setProgress={setProgress}>
        <p>Since forces are vectors, you must add them with direction in mind. In one dimension, choose a positive direction (for example, right = positive). Forces in the opposite direction are negative. The net force is the algebraic sum of all force values. If the net force equals zero, the forces are <Term def="Forces that sum to zero. The object is in equilibrium: stationary or at constant velocity.">balanced</Term> and the object is in <Term def="The state of an object when net force is zero. The object is either at rest or moving at constant velocity.">equilibrium</Term>. If the net force is non-zero, the object <Term def="Forces that do not sum to zero. The object accelerates in the direction of the net force.">accelerates in the direction of the net force</Term>.</p>
        <p>A <Term def="A diagram showing all forces acting on an object as arrows from a single point or box, with direction and relative magnitude.">free-body diagram</Term> is a tool for identifying all the forces acting on an object. The object is represented as a box or dot, and each force is an arrow pointing in its direction, with arrow length representing magnitude. A skydiver at terminal velocity has a weight arrow pointing down and an equal-length drag arrow pointing up: net force = zero, constant velocity.</p>
        <NetForceSim />
        <QGroup title="Check yourself">
          <MCQ num={19} question="Three forces act on an object: 15 N right, 8 N right, and 10 N left. What is the net force?" options={["13 N right", "33 N right", "3 N right", "13 N left"]} correct={0} explain="Taking right as positive: net force = +15 + 8 - 10 = +13 N. The net force is 13 N to the right." />
        </QGroup>
      </DotPoint>

      <DotPoint id="7.4.7" title="Mathematical representations of motion and force" progress={progress} setProgress={setProgress}>
        <p>The key formulas for motion allow you to calculate any unknown quantity when you know others. <strong>v = d/t</strong> gives average speed. <strong>a = (v - u) / t</strong> gives acceleration from initial velocity u, final velocity v, and time t. <strong>v = u + at</strong> gives final velocity. <strong>s = ut + 0.5at squared</strong> gives displacement during uniform acceleration. <strong>v squared = u squared + 2as</strong> relates velocity to displacement without needing time. These are the SUVAT equations.</p>
        <p>When solving problems: write down what you know (s, u, v, a, t), identify what you need to find, and choose the equation that links them. Always include units. Check that your answer is physically sensible. For force problems use F = ma. For waves use v = f x lambda. Combining algebraic and graphical methods gives you a complete toolkit for motion.</p>
        <Callout kind="key" title="SUVAT summary">
          s = displacement (m), u = initial velocity (m/s), v = final velocity (m/s), a = acceleration (m/s^2), t = time (s). Each equation links four of these five variables.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={20} question="A car starts from rest and accelerates uniformly at 3 m/s squared for 5 s. What is its final speed?" options={["15 m/s", "8 m/s", "1.67 m/s", "37.5 m/s"]} correct={0} explain="v = u + at = 0 + 3 x 5 = 15 m/s." />
          <WrittenQ num={21} question="A car travels at 30 m/s and brakes with a deceleration of 6 m/s squared. How far does it travel before stopping? Show your working." model="Using v squared = u squared + 2as: at stop v = 0. So 0 = 30 squared + 2 x (-6) x s. 0 = 900 - 12s. 12s = 900. s = 75 m. The car travels 75 m before stopping." />
        </QGroup>
      </DotPoint>
    </>
  );
}


function Section75({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">7.5 Waves and Motion in Context</div>
        <h1>Science shaping society</h1>
        <p className="lead">Wave and motion physics have transformed communication, medicine, transport, and daily life. Here you will build structured arguments about these impacts.</p>
      </div>

      <DotPoint id="7.5.1" title="How waves and motion have changed society" progress={progress} setProgress={setProgress}>
        <p>Our understanding of waves and motion has driven some of the most significant transformations in human history. Before Newton's laws were published in 1687, there was no reliable way to predict or engineer the motion of machines. Today, aircraft, high-speed trains, rockets, and smartphones are all engineered using those same principles. Before Maxwell and Hertz established the theory of electromagnetic waves in the 1860s to 1880s, long-distance communication took days or weeks. Today, radio, television, mobile phone networks, the internet, and GPS all rely on EM waves, connecting billions of people instantly.</p>
        <p>In medicine, ultrasound imaging (using reflected sound waves) and X-ray imaging (using EM waves) allow doctors to diagnose conditions and guide treatment without exploratory surgery. These technologies have reduced maternal mortality, improved cancer detection, and transformed healthcare in both wealthy and remote communities. Not all impacts have been positive: fossil-fuel combustion in transport engines contributes to climate change, and military radar and surveillance technologies raise ethical questions. A balanced analysis requires examining both benefits and costs.</p>
        <p>A <Term def="A structured approach to scientific argument using three components: Claim (statement of position), Evidence (facts and examples), and Reasoning (explanation of the connection).">Claim-Evidence-Reasoning (CER)</Term> framework helps you build well-structured arguments. Your claim answers the question directly. Your evidence consists of specific facts, statistics, or examples. Your reasoning explains how and why the evidence supports the claim. A thorough argument also acknowledges counterarguments or limitations.</p>
        <CERBuilder />
        <Callout kind="key" title="CER structure">Claim: state your position clearly. Evidence: give specific examples (for example, ultrasound imaging, GPS, Doppler speed cameras). Reasoning: explain the connection using physics concepts from this topic.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={22} question="Using the CER framework, write a short argument (3 to 4 sentences) for the following claim: GPS technology, which relies on wave physics, has had a significant positive impact on society." model="Claim: GPS technology, which uses electromagnetic wave propagation from satellites to calculate position, has profoundly benefited society. Evidence: GPS enables turn-by-turn navigation for billions of smartphone users, guides emergency services to injured people in remote areas, and underpins precision agriculture and aviation safety. Reasoning: because GPS uses radio waves that travel at the speed of light, it provides position accuracy to within a few metres in real time anywhere on Earth, reducing navigational errors and enabling entirely new industries. This has made previously dangerous tasks much safer and created significant economic value." />
        </QGroup>
      </DotPoint>
    </>
  );
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
    "total internal reflection": "Complete reflection of light back into a denser medium when the angle of incidence exceeds the critical angle.",
  },
  sections: [
    {
      id: "7.1",
      label: "Wave Properties",
      accent: "blue",
      blurb: "Mechanical vs EM waves, the wave model, transverse and longitudinal types, the EM spectrum, wave features, and the wave equation.",
      points: ["7.1.1", "7.1.2", "7.1.3", "7.1.4", "7.1.5", "7.1.6", "7.1.7"],
      render: (p) => <Section71 {...p} />,
    },
    {
      id: "7.2",
      label: "Sound Waves",
      accent: "cyan",
      blurb: "Compressions and rarefactions, pitch and loudness, the Doppler effect, the ear, Aboriginal instruments, and medical ultrasound.",
      points: ["7.2.1", "7.2.2", "7.2.3", "7.2.4", "7.2.5", "7.2.6"],
      render: (p) => <Section72 {...p} />,
    },
    {
      id: "7.3",
      label: "Light Waves",
      accent: "violet",
      blurb: "How the eye works, absorption, reflection, refraction and scattering, everyday applications, and stellar spectroscopy.",
      points: ["7.3.1", "7.3.2", "7.3.3", "7.3.4"],
      render: (p) => <Section73 {...p} />,
    },
    {
      id: "7.4",
      label: "Motion",
      accent: "blue",
      blurb: "Speed, velocity and displacement, motion graphs, Newton's three laws, net force vectors, and SUVAT calculations.",
      points: ["7.4.1", "7.4.2", "7.4.4", "7.4.5", "7.4.6", "7.4.7"],
      render: (p) => <Section74 {...p} />,
    },
    {
      id: "7.5",
      label: "Waves in Society",
      accent: "teal",
      blurb: "How wave and motion science has transformed communication, medicine, and transport. Building CER arguments.",
      points: ["7.5.1"],
      render: (p) => <Section75 {...p} />,
    },
  ],
});
