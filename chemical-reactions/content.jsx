/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   SECTION 6.1  -  Law of Conservation of Mass
   ============================================================ */

function ConservationSim() {
  const [system, setSystem] = useState("closed");
  const [reacted, setReacted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const reactantMass = 28.4;
  const gasMass = 4.4;
  const productMass = reacted
    ? (system === "closed" ? reactantMass : reactantMass - gasMass)
    : null;

  function doReaction() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setReacted(true);
      setAnimating(false);
    }, 900);
  }
  function reset() { setReacted(false); setAnimating(false); }

  const bubbleStyle = (on) => ({
    width: 18, height: 18, borderRadius: "50%",
    background: on ? "var(--accent)" : "#ccc",
    display: "inline-block", margin: "0 3px",
    transition: "background 0.4s"
  });

  return (
    <Interactive title="Open vs closed system" subtitle="See how system type affects the measured mass after a gas-producing reaction.">
      <div className="ctrl-row">
        <SegToggle
          options={[{ value: "closed", label: "Closed system" }, { value: "open", label: "Open system" }]}
          value={system}
          onChange={(v) => { setSystem(v); reset(); }}
        />
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", margin: "16px 0" }}>
        <div className="card" style={{ flex: 1, minWidth: 140, textAlign: "center", padding: "16px 12px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 8 }}>BEFORE REACTION</div>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect x="10" y="20" width="60" height="50" rx="6" fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth="2"/>
            {system === "closed" && <rect x="18" y="15" width="44" height="10" rx="3" fill="var(--accent-deep)"/>}
            <circle cx="25" cy="55" r="8" fill="#7c3aed" opacity="0.7"/>
            <circle cx="45" cy="50" r="10" fill="#a78bfa" opacity="0.8"/>
            <circle cx="62" cy="57" r="7" fill="#7c3aed" opacity="0.6"/>
          </svg>
          <div style={{ fontWeight: 700, marginTop: 8 }}>{reactantMass} g</div>
          <div className="muted" style={{ fontSize: 12 }}>reactants</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: "var(--accent-deep)", fontWeight: 700 }}>
          {animating ? "..." : reacted ? "=" : ""}
        </div>
        <div className="card" style={{ flex: 1, minWidth: 140, textAlign: "center", padding: "16px 12px", opacity: reacted ? 1 : 0.35 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", marginBottom: 8 }}>AFTER REACTION</div>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect x="10" y="20" width="60" height="50" rx="6" fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth="2"/>
            {system === "closed" && <rect x="18" y="15" width="44" height="10" rx="3" fill="var(--accent-deep)"/>}
            {reacted && system === "open" && (
              <>
                <circle cx="50" cy="5" r="5" fill="#a78bfa" opacity="0.5"/>
                <circle cx="65" cy="2" r="4" fill="#7c3aed" opacity="0.4"/>
                <text x="30" y="10" fontSize="10" fill="var(--muted)">CO&#8322; escapes</text>
              </>
            )}
            {reacted && (
              <>
                <circle cx="30" cy="52" r="9" fill="#4f46e5" opacity="0.8"/>
                <circle cx="55" cy="56" r="8" fill="#818cf8" opacity="0.7"/>
              </>
            )}
          </svg>
          <div style={{ fontWeight: 700, marginTop: 8 }}>
            {reacted ? `${productMass.toFixed(1)} g` : "?"}
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            {reacted
              ? (system === "closed" ? "mass conserved" : `${gasMass} g CO₂ escaped`)
              : "products"}
          </div>
        </div>
      </div>
      <div className="ctrl-row" style={{ justifyContent: "center", gap: 12 }}>
        <button className="btn btn-accent" onClick={doReaction} disabled={reacted || animating}>React!</button>
        <button className="btn btn-ghost" onClick={reset}>Reset</button>
      </div>
      {reacted && system === "open" && (
        <Callout kind="warn" title="Apparent mass loss">
          The measured mass dropped by {gasMass} g because CO&#8322; escaped. Mass is still conserved overall; you just cannot see the gas.
        </Callout>
      )}
      {reacted && system === "closed" && (
        <Callout kind="success" title="Mass conserved!">
          Every atom stayed inside. The total mass before and after is exactly the same.
        </Callout>
      )}
    </Interactive>
  );
}

function Section61({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.1 Law of conservation of mass</div>
        <h1>Nothing is created, nothing is lost</h1>
        <p className="lead">In every chemical reaction, the total mass of the substances you start with equals the total mass of the substances you end up with.</p>
      </div>

      <DotPoint id="6.1.1" title="Explain the meaning of the law of conservation of mass" progress={progress} setProgress={setProgress}>
        <p>The <Term def="Mass cannot be created or destroyed in a chemical reaction. Total mass of reactants equals total mass of products.">law of conservation of mass</Term> states that mass cannot be created or destroyed during a <Term def="A process in which substances called reactants are changed into new substances called products.">chemical reaction</Term>. This means the total mass of the <Term def="Substances that are present at the start of a reaction and are used up.">reactants</Term> always equals the total mass of the <Term def="New substances formed during a chemical reaction.">products</Term>.</p>
        <p>The law was first stated by the French chemist <Term def="French chemist (1743 to 1794) who first formulated the law of conservation of mass through careful experiments.">Antoine Lavoisier</Term> in 1789. It is one of the most important foundations of chemistry.</p>
        <p>During a reaction, atoms are rearranged into new combinations. No atoms are created or destroyed, so the total count of atoms stays the same and mass stays the same. For example, when hydrogen burns in oxygen to form water: 2H&#8322; + O&#8322; → 2H&#8322;O. Four hydrogen atoms and two oxygen atoms appear on both sides.</p>
        <Callout kind="key" title="Key law">
          Total mass of reactants = total mass of products. This applies to every chemical reaction, including combustion, neutralisation, and decomposition.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={1}
            question="24 g of magnesium reacts with 16 g of oxygen. What mass of magnesium oxide is produced?"
            options={["16 g", "24 g", "40 g", "8 g"]}
            correct={2}
            explain="Conservation of mass: 24 + 16 = 40 g of product."
          />
          <WrittenQ
            num={2}
            question="Explain, using the idea of atoms, why mass is conserved in a chemical reaction."
            model="During a chemical reaction atoms are rearranged into new combinations, but no atoms are created or destroyed. Because every atom present before the reaction is still present afterwards, and atoms have mass, the total mass stays the same."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.1.2" title="Conduct a practical investigation to demonstrate the law of conservation of mass" progress={progress} setProgress={setProgress}>
        <p>To confirm the law, you measure the total mass of reactants <em>before</em> a reaction and compare it to the total mass of products <em>after</em>. If the measurement matches within experimental error, the law is supported.</p>
        <p>The best reactions to use are those that do not involve a gas escaping, such as <Term def="A reaction that forms an insoluble solid (precipitate) when two solutions are mixed.">precipitation reactions</Term> or <Term def="A reaction between an acid and a base to form a salt and water.">neutralisation reactions</Term>. If a gas is produced, the reaction must be done in a <Term def="A container from which no matter can enter or leave.">sealed container</Term> so no mass is lost to the surroundings.</p>
        <p>A classic example mixes lead(II) nitrate solution with potassium iodide solution inside a sealed flask. A bright yellow precipitate of lead(II) iodide forms instantly. When you weigh the sealed flask before and after, the mass does not change at all.</p>
        <Callout kind="tip" title="Practical tip">
          Always weigh the entire closed system, including the lid and any gas space. A single gram of escaping CO&#8322; will make the results look wrong.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={3}
            question="Why is it important to seal the flask when conducting a conservation-of-mass investigation involving a gas-producing reaction?"
            options={[
              "To speed up the reaction",
              "To prevent gases escaping so no mass is lost from the system",
              "To make the reaction safer",
              "To increase the temperature"
            ]}
            correct={1}
            explain="If gas escapes, the measured mass after the reaction is less than before, making it look like mass was lost even though it was not."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.1.3" title="Investigate and explain how mass is conserved in closed systems" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A system in which no matter can enter or leave. Energy may still be exchanged.">closed system</Term> is one where no matter can cross the boundary. In a closed system, every atom produced in the reaction stays inside, so the total mass is always conserved, even if gases are formed.</p>
        <p>In an <Term def="A system that can exchange both matter and energy with the surroundings.">open system</Term>, gases such as CO&#8322; or water vapour can escape, making it look as though mass has been lost. Alternatively, if a substance absorbs oxygen from the air (like burning magnesium), the mass appears to increase. Both are only apparent changes. If you account for all the substances involved, including those that entered or left, mass is still conserved.</p>
        <ConservationSim />
        <Figure caption="Open vs closed systems: matter escaping causes apparent mass changes.">
          <svg viewBox="0 0 520 120" width="100%" style={{ maxWidth: 520 }}>
            {/* Open system */}
            <rect x="10" y="30" width="200" height="80" rx="8" fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth="2"/>
            <text x="110" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">Open system</text>
            <text x="110" y="75" textAnchor="middle" fontSize="12" fill="var(--ink)">CO&#8322; escapes</text>
            <text x="110" y="95" textAnchor="middle" fontSize="11" fill="var(--muted)">apparent mass loss</text>
            <path d="M180,40 Q220,10 250,5" stroke="var(--accent-deep)" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
            <circle cx="255" cy="4" r="5" fill="var(--accent-deep)" opacity="0.6"/>
            {/* Closed system */}
            <rect x="310" y="30" width="200" height="80" rx="8" fill="var(--accent-soft)" stroke="var(--accent-deep)" strokeWidth="2"/>
            <rect x="318" y="24" width="184" height="10" rx="3" fill="var(--accent-deep)"/>
            <text x="410" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">Closed system</text>
            <text x="410" y="70" textAnchor="middle" fontSize="12" fill="var(--ink)">All gases trapped</text>
            <text x="410" y="90" textAnchor="middle" fontSize="11" fill="var(--muted)">mass unchanged</text>
          </svg>
        </Figure>
        <Callout kind="fact" title="Real-world example">
          When iron rusts inside a sealed bag of air, the mass of the bag stays exactly the same. The iron gains mass but the oxygen in the air inside the bag loses the same amount of mass. Closed system, no change overall.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ
            num={4}
            question="A student burns a candle in an open container and records a decrease in mass. Does this disprove the law of conservation of mass? Explain."
            model="No. The mass appears to decrease because CO2 and water vapour are released into the air. If all the gas products were captured and weighed, the total mass would equal the original mass of the candle and oxygen used. Mass is still conserved when you account for all substances."
          />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.2  -  Chemical Reactions
   ============================================================ */

function EquationBalancer() {
  const equations = [
    {
      label: "Water formation",
      reactants: [{ formula: "H₂", coeff: 2, atoms: { H: 2, O: 0 } }, { formula: "O₂", coeff: 1, atoms: { H: 0, O: 2 } }],
      products: [{ formula: "H₂O", coeff: 2, atoms: { H: 2, O: 1 } }],
      correct: [[2, 1], [2]],
      hint: "You need 2 H₂ and 1 O₂ to make 2 H₂O."
    },
    {
      label: "Magnesium combustion",
      reactants: [{ formula: "Mg", coeff: 2, atoms: { Mg: 1, O: 0 } }, { formula: "O₂", coeff: 1, atoms: { Mg: 0, O: 2 } }],
      products: [{ formula: "MgO", coeff: 2, atoms: { Mg: 1, O: 1 } }],
      correct: [[2, 1], [2]],
      hint: "Each MgO needs 1 Mg and 1 O. You get 2 O from O₂, so make 2 MgO."
    },
    {
      label: "Hydrogen peroxide decomposition",
      reactants: [{ formula: "H₂O₂", coeff: 2, atoms: { H: 2, O: 2 } }],
      products: [{ formula: "H₂O", coeff: 2, atoms: { H: 2, O: 1 } }, { formula: "O₂", coeff: 1, atoms: { H: 0, O: 2 } }],
      correct: [[2], [2, 1]],
      hint: "2 H₂O₂ gives 4 H and 4 O. That is 2 H₂O (4H, 2O) plus 1 O₂ (2O)."
    }
  ];

  const [eqIdx, setEqIdx] = useState(0);
  const eq = equations[eqIdx];

  const [rCoeffs, setRCoeffs] = useState([1, 1, 1, 1]);
  const [pCoeffs, setPCoeffs] = useState([1, 1, 1, 1]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setRCoeffs([1, 1, 1, 1]);
    setPCoeffs([1, 1, 1, 1]);
    setChecked(false);
    setCorrect(false);
  }, [eqIdx]);

  function countAtoms(species, coeffs) {
    const totals = {};
    species.forEach((s, i) => {
      const c = coeffs[i] || 1;
      Object.entries(s.atoms).forEach(([el, n]) => {
        totals[el] = (totals[el] || 0) + c * n;
      });
    });
    return totals;
  }

  function check() {
    const rTotals = countAtoms(eq.reactants, rCoeffs);
    const pTotals = countAtoms(eq.products, pCoeffs);
    const elements = new Set([...Object.keys(rTotals), ...Object.keys(pTotals)]);
    let ok = true;
    elements.forEach(el => {
      if ((rTotals[el] || 0) !== (pTotals[el] || 0)) ok = false;
    });
    setCorrect(ok);
    setChecked(true);
  }

  const rTotals = countAtoms(eq.reactants, rCoeffs);
  const pTotals = countAtoms(eq.products, pCoeffs);
  const elements = [...new Set([...Object.keys(rTotals), ...Object.keys(pTotals)].filter(e => rTotals[e] || pTotals[e]))];

  function CoeffInput({ val, onChange }) {
    return (
      <select
        value={val}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: 44, fontSize: 15, fontWeight: 700, textAlign: "center", borderRadius: 6, border: "2px solid var(--accent-deep)", padding: "2px 4px", background: "var(--surface)", color: "var(--ink)" }}
      >
        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
    );
  }

  return (
    <Interactive title="Equation balancer" subtitle="Set the coefficients so the atom counts match on both sides, then hit Check.">
      <div className="ctrl-row" style={{ justifyContent: "center", marginBottom: 12 }}>
        <SegToggle
          options={equations.map((e, i) => ({ value: i, label: e.label }))}
          value={eqIdx}
          onChange={v => setEqIdx(Number(v))}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8, fontSize: 15, marginBottom: 16 }}>
        {eq.reactants.map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {i > 0 && <span style={{ fontWeight: 700, color: "var(--accent-deep)" }}>+</span>}
            <CoeffInput val={rCoeffs[i] || 1} onChange={v => { const c = [...rCoeffs]; c[i] = v; setRCoeffs(c); setChecked(false); }} />
            <span style={{ fontWeight: 700 }}>{s.formula}</span>
          </span>
        ))}
        <span style={{ fontWeight: 700, fontSize: 20, color: "var(--accent-deep)", margin: "0 8px" }}>→</span>
        {eq.products.map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {i > 0 && <span style={{ fontWeight: 700, color: "var(--accent-deep)" }}>+</span>}
            <CoeffInput val={pCoeffs[i] || 1} onChange={v => { const c = [...pCoeffs]; c[i] = v; setPCoeffs(c); setChecked(false); }} />
            <span style={{ fontWeight: 700 }}>{s.formula}</span>
          </span>
        ))}
      </div>
      <div style={{ overflowX: "auto", marginBottom: 14 }}>
        <table className="data-table" style={{ minWidth: 260, margin: "0 auto" }}>
          <thead>
            <tr><th>Element</th><th>Reactants</th><th>Products</th><th>Balanced?</th></tr>
          </thead>
          <tbody>
            {elements.filter(el => (rTotals[el] || 0) > 0 || (pTotals[el] || 0) > 0).map(el => {
              const r = rTotals[el] || 0;
              const p = pTotals[el] || 0;
              return (
                <tr key={el}>
                  <td><strong>{el}</strong></td>
                  <td>{r}</td>
                  <td>{p}</td>
                  <td style={{ color: r === p ? "#16a34a" : "#dc2626", fontWeight: 700 }}>{r === p ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="ctrl-row" style={{ justifyContent: "center", gap: 10 }}>
        <button className="btn btn-accent" onClick={check}>Check</button>
        <button className="btn btn-ghost" onClick={() => { setRCoeffs([1,1,1,1]); setPCoeffs([1,1,1,1]); setChecked(false); setCorrect(false); }}>Reset</button>
      </div>
      {checked && (
        <Callout kind={correct ? "success" : "warn"} title={correct ? "Correctly balanced!" : "Not balanced yet"}>
          {correct ? "Great work! Atoms balance on both sides." : `Hint: ${eq.hint}`}
        </Callout>
      )}
    </Interactive>
  );
}

function ReactionTypeClassifier() {
  const reactions = [
    { eq: "2Mg + O₂ → 2MgO", type: "synthesis", clue: "Two reactants combine into one product." },
    { eq: "CaCO₃ → CaO + CO₂", type: "decomposition", clue: "One compound splits into two simpler substances." },
    { eq: "Zn + CuSO₄ → ZnSO₄ + Cu", type: "displacement", clue: "A more reactive metal pushes out a less reactive one." },
    { eq: "HCl + NaOH → NaCl + H₂O", type: "neutralisation", clue: "Acid + base makes salt and water." },
    { eq: "N₂ + 3H₂ → 2NH₃", type: "synthesis", clue: "Multiple reactants join into one product." },
    { eq: "2H₂O₂ → 2H₂O + O₂", type: "decomposition", clue: "One substance breaks into two." },
  ];
  const types = ["synthesis", "decomposition", "displacement", "neutralisation"];
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function pick(t) {
    if (chosen !== null) return;
    setChosen(t);
    if (t === reactions[idx].type) setScore(s => s + 1);
  }
  function next() {
    if (idx + 1 >= reactions.length) { setDone(true); return; }
    setIdx(i => i + 1);
    setChosen(null);
  }
  function restart() { setIdx(0); setChosen(null); setScore(0); setDone(false); }

  const r = reactions[idx];
  return (
    <Interactive title="Reaction type classifier" subtitle="Read the equation and tap the correct reaction type.">
      {done ? (
        <div style={{ textAlign: "center", padding: 16 }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: "var(--accent-deep)", marginBottom: 8 }}>{score}/{reactions.length}</div>
          <p style={{ marginBottom: 16 }}>{score === reactions.length ? "Perfect! You know all four types." : "Good effort! Review the ones you missed."}</p>
          <button className="btn btn-accent" onClick={restart}>Try again</button>
        </div>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span className="chip accent" style={{ marginBottom: 8, display: "inline-block" }}>Equation {idx + 1} of {reactions.length}</span>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "monospace", padding: "12px 16px", background: "var(--accent-soft)", borderRadius: 10, marginBottom: 8 }}>{r.eq}</div>
          </div>
          <div className="grid-2" style={{ gap: 10, marginBottom: 12 }}>
            {types.map(t => {
              let bg = "var(--surface)";
              let border = "2px solid var(--accent-deep)";
              if (chosen === t) {
                bg = t === r.type ? "#bbf7d0" : "#fecaca";
                border = `2px solid ${t === r.type ? "#16a34a" : "#dc2626"}`;
              } else if (chosen !== null && t === r.type) {
                bg = "#bbf7d0"; border = "2px solid #16a34a";
              }
              return (
                <button key={t} onClick={() => pick(t)} style={{ padding: "12px 8px", borderRadius: 10, border, background: bg, fontWeight: 700, fontSize: 14, cursor: chosen ? "default" : "pointer", textTransform: "capitalize" }}>
                  {t}
                </button>
              );
            })}
          </div>
          {chosen && (
            <div style={{ marginBottom: 12 }}>
              <Callout kind={chosen === r.type ? "success" : "warn"} title={chosen === r.type ? "Correct!" : `Not quite. The answer is ${r.type}.`}>
                {r.clue}
              </Callout>
              <div style={{ textAlign: "center" }}>
                <button className="btn btn-accent" onClick={next}>{idx + 1 < reactions.length ? "Next" : "See score"}</button>
              </div>
            </div>
          )}
        </>
      )}
    </Interactive>
  );
}

function Section62({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.2 Chemical reactions</div>
        <h1>Representing, types and pH</h1>
        <p className="lead">From naming compounds to balancing equations and exploring the four main reaction types plus the pH scale.</p>
      </div>

      <DotPoint id="6.2.1" title="Use IUPAC naming conventions for ionic and covalent compounds" progress={progress} setProgress={setProgress}>
        <p><Term def="International Union of Pure and Applied Chemistry. Sets universal naming rules for chemicals.">IUPAC</Term> provides a standard set of rules for naming chemical substances, so scientists around the world can communicate clearly. You need to be able to name and write formulae for two main compound types.</p>
        <p><Term def="A compound formed between a metal and a non-metal, held together by electrostatic attraction between positive and negative ions.">Ionic compounds</Term> are named by stating the metal (cation) first, then the non-metal (anion) with the ending changed to "-ide". For transition metals, a Roman numeral in brackets shows the charge: for example, FeCl&#8323; is iron(III) chloride. To write the formula, use the swap-and-drop rule: swap the values of the ion charges to become subscripts, then simplify.</p>
        <p><Term def="A compound formed between two or more non-metals, held together by shared pairs of electrons.">Covalent compounds</Term> use Greek prefixes (mono-, di-, tri-, tetra-, penta-, hexa-) to show how many atoms of each element are present. The second element gets the "-ide" ending. For example, CO&#8322; is carbon dioxide and N&#8322;O&#8324; is dinitrogen tetroxide.</p>
        <Figure caption="Common polyatomic ions you need to know.">
          <svg viewBox="0 0 560 130" width="100%" style={{ maxWidth: 560 }}>
            {[
              ["Hydroxide", "OH⁻", "1−"],
              ["Nitrate", "NO₃⁻", "1−"],
              ["Carbonate", "CO₃²⁻", "2−"],
              ["Sulfate", "SO₄²⁻", "2−"],
              ["Phosphate", "PO₄³⁻", "3−"],
              ["Ammonium", "NH₄⁺", "1+"],
            ].map(([name, formula, charge], i) => (
              <g key={name} transform={`translate(${(i % 3) * 186 + 4},${Math.floor(i / 3) * 58 + 8})`}>
                <rect width="178" height="48" rx="8" fill="var(--accent-soft)" stroke="var(--accent-deep)"/>
                <text x="89" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">{name}</text>
                <text x="89" y="38" textAnchor="middle" fontSize="13" fill="var(--accent-deep)" fontWeight="700">{formula} ({charge})</text>
              </g>
            ))}
          </svg>
        </Figure>
        <Callout kind="tip" title="Swap and drop example">
          Aluminium (Al&#179;&#8314;) + Oxide (O&#178;&#8315;): swap the numbers to get Al&#8322;O&#8323;. Check: 2 x (+3) = +6 and 3 x (-2) = -6. Net charge = 0. Correct!
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={5}
            question="What is the correct formula for calcium chloride?"
            options={["CaCl", "CaCl₂", "Ca₂Cl", "Ca₂Cl₃"]}
            correct={1}
            explain="Ca is 2+ and Cl is 1-, so swap and drop: Ca₁Cl₂, simplified to CaCl₂."
          />
          <WrittenQ
            num={6}
            question="Explain the difference between how ionic and covalent compounds are named."
            model="Ionic compounds are named by stating the metal first then the non-metal with an -ide ending. Roman numerals are used for transition metals to show the charge. Covalent compounds use Greek prefixes (di-, tri-, etc.) to indicate the number of each atom and also add an -ide ending to the second element."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.2.2" title="Represent chemical reactions with word and balanced symbol equations" progress={progress} setProgress={setProgress}>
        <p>Chemical reactions can be written as <Term def="An equation that uses the names of substances: e.g. hydrogen + oxygen → water.">word equations</Term> or <Term def="An equation that uses chemical formulae and coefficients: e.g. 2H₂ + O₂ → 2H₂O.">balanced symbol equations</Term>. A balanced equation shows the same number of each type of atom on both sides, which is required by the law of conservation of mass.</p>
        <p>State symbols in brackets show the physical state of each substance: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. To balance an equation, add <Term def="A number placed in front of a formula in an equation to show how many units of that substance are involved.">coefficients</Term> in front of formulas. Never change subscripts, as that would create a different substance entirely.</p>
        <p>You can predict the products of a reaction by recognising its type: metal + oxygen gives a metal oxide; acid + metal gives a salt and hydrogen; acid + base gives a salt and water; acid + carbonate gives a salt, water, and carbon dioxide.</p>
        <EquationBalancer />
        <Callout kind="key" title="Balancing rule">
          Change coefficients only. Changing a subscript changes the substance. 2H&#8322;O is two water molecules; H&#8324;O is a completely different substance that does not exist under normal conditions.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={7}
            question="In the balanced equation 2H₂ + O₂ → 2H₂O, how many hydrogen atoms are on each side?"
            options={["2", "3", "4", "6"]}
            correct={2}
            explain="Left side: 2 x 2 = 4 H atoms. Right side: 2 x 2 = 4 H atoms. Balanced."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.2.3" title="Model simple chemical reactions to show atoms are rearranged and mass is conserved" progress={progress} setProgress={setProgress}>
        <p>Models help you visualise what happens at the atomic level. When a reaction occurs, bonds between atoms in the reactants break, and new bonds form to make the products. The atoms themselves are never destroyed; they are just rearranged into different combinations.</p>
        <p>You can model reactions using coloured balls and sticks, drawings of circles labelled with element symbols, Lego bricks, or computer simulations. Whatever method you use, the key check is: every atom in the reactants must appear in the products, with none added or removed.</p>
        <Figure num="2" caption="Water formation: 4 H atoms and 2 O atoms appear on both sides.">
          <svg viewBox="0 0 520 90" width="100%" style={{ maxWidth: 520 }}>
            {/* 2H2 */}
            <circle cx="30" cy="45" r="13" fill="#ef4444"/>
            <circle cx="58" cy="45" r="13" fill="#ef4444"/>
            <line x1="43" y1="45" x2="43" y2="45" stroke="#333" strokeWidth="3"/>
            <circle cx="90" cy="45" r="13" fill="#ef4444"/>
            <circle cx="118" cy="45" r="13" fill="#ef4444"/>
            <text x="69" y="50" textAnchor="middle" fontSize="11" fill="var(--muted)">2H&#8322;</text>
            <text x="145" y="50" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--accent-deep)">+</text>
            {/* O2 */}
            <circle cx="175" cy="45" r="13" fill="#3b82f6"/>
            <circle cx="203" cy="45" r="13" fill="#3b82f6"/>
            <text x="189" y="75" textAnchor="middle" fontSize="11" fill="var(--muted)">O&#8322;</text>
            <text x="235" y="50" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--accent-deep)">→</text>
            {/* 2H2O */}
            <circle cx="270" cy="38" r="13" fill="#ef4444"/>
            <circle cx="298" cy="55" r="18" fill="#3b82f6"/>
            <circle cx="326" cy="38" r="13" fill="#ef4444"/>
            <text x="298" y="82" textAnchor="middle" fontSize="11" fill="var(--muted)">H&#8322;O</text>
            <text x="354" y="50" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--accent-deep)">+</text>
            <circle cx="385" cy="38" r="13" fill="#ef4444"/>
            <circle cx="413" cy="55" r="18" fill="#3b82f6"/>
            <circle cx="441" cy="38" r="13" fill="#ef4444"/>
            <text x="413" y="82" textAnchor="middle" fontSize="11" fill="var(--muted)">H&#8322;O</text>
          </svg>
        </Figure>
        <Callout kind="key" title="Linking to conservation of mass">
          Because every atom present at the start also appears at the end (just in different arrangements), the total mass cannot change. This directly demonstrates the law of conservation of mass.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={8}
            question="A student models 2H₂ + O₂ → 2H₂O using coloured balls. After the reaction they have 5 red balls instead of 4. What has gone wrong?"
            options={[
              "They balanced the equation wrong",
              "They added an extra atom that should not be there",
              "They forgot to add state symbols",
              "They used the wrong colour"
            ]}
            correct={1}
            explain="In a model, every atom must come from the reactants. Adding an extra atom violates conservation of mass."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.2.4" title="Determine the features of synthesis, decomposition, displacement and neutralisation reactions" progress={progress} setProgress={setProgress}>
        <p>There are four key reaction types at Year 10. In a <Term def="A reaction in which two or more reactants combine to form a single product. General form: A + B → AB.">synthesis (combination) reaction</Term>, two or more reactants join to form one product. These are often <Term def="A reaction that releases energy to the surroundings as heat.">exothermic</Term>.</p>
        <p>In a <Term def="A reaction in which one compound breaks down into two or more simpler substances. General form: AB → A + B.">decomposition reaction</Term>, one compound breaks apart into simpler substances, usually requiring energy input (heat, light, or electricity), making them typically <Term def="A reaction that absorbs energy from the surroundings.">endothermic</Term>.</p>
        <p>In a <Term def="A reaction in which a more reactive element displaces a less reactive element from a compound. General form: A + BC → AC + B.">displacement reaction</Term>, a more reactive element takes the place of a less reactive element in a compound. Predictions require the <Term def="A list of metals ordered from most to least reactive, used to predict which metal will displace another.">reactivity series</Term> of metals.</p>
        <p>In a <Term def="A reaction between an acid and a base to produce a salt and water.">neutralisation reaction</Term>, an acid and a base react to produce a salt and water. The pH shifts towards 7, and the reaction is often exothermic.</p>
        <ReactionTypeClassifier />
        <Callout kind="fact" title="Real-world examples">
          The Haber process (synthesis) makes ammonia for fertiliser. Hydrogen peroxide in a wound decomposes (decomposition) with a fizz. Zinc in copper sulfate turns blue solution clear (displacement). Antacids neutralise stomach acid (neutralisation).
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={9}
            question="Which of these is a decomposition reaction?"
            options={[
              "Zn + CuSO₄ → ZnSO₄ + Cu",
              "2H₂O₂ → 2H₂O + O₂",
              "HCl + NaOH → NaCl + H₂O",
              "N₂ + 3H₂ → 2NH₃"
            ]}
            correct={1}
            explain="One compound (H₂O₂) breaks into two simpler substances. That is the definition of decomposition."
          />
          <WrittenQ
            num={10}
            question="Explain why you need to know the reactivity series to predict whether a displacement reaction will occur."
            model="A displacement reaction only happens when the incoming metal is more reactive than the metal already in the compound. Without the reactivity series, you cannot predict whether, for example, copper will displace zinc or vice versa. The more reactive metal will always displace the less reactive one."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.2.5" title="Identify pH as the measure of acidity and compare pH of common substances to pure water" progress={progress} setProgress={setProgress}>
        <p><Term def="A scale from 0 to 14 that measures how acidic or alkaline a solution is, based on the concentration of H+ ions.">pH</Term> is a scale used to measure the acidity or alkalinity of a solution. It is based on the concentration of <Term def="Positively charged hydrogen ions (H+) whose concentration determines whether a solution is acidic.">hydrogen ions (H&#8314;)</Term> in the solution. A pH below 7 is acidic, pH 7 is neutral (pure water), and pH above 7 is alkaline.</p>
        <p>The scale is logarithmic: each whole-number step represents a tenfold change in acidity. A solution at pH 3 is ten times more acidic than one at pH 4, and one hundred times more acidic than one at pH 5. This is why even small pH changes can have large real-world effects.</p>
        <p>pH can be measured with <Term def="A solution that changes colour across the pH range, giving an approximate reading.">universal indicator</Term>, pH paper, or a digital pH meter for precise readings. Human blood must stay between 7.35 and 7.45 for normal body function, farm soil pH affects crop growth, and pool pH must be controlled to prevent irritation.</p>
        <Figure num="3" caption="The pH scale with common substances.">
          <svg viewBox="0 0 560 130" width="100%" style={{ maxWidth: 560 }}>
            {/* gradient bar */}
            <defs>
              <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444"/>
                <stop offset="25%" stopColor="#f97316"/>
                <stop offset="42%" stopColor="#eab308"/>
                <stop offset="50%" stopColor="#22c55e"/>
                <stop offset="65%" stopColor="#3b82f6"/>
                <stop offset="85%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#6d28d9"/>
              </linearGradient>
            </defs>
            <rect x="10" y="30" width="540" height="24" rx="6" fill="url(#phGrad)"/>
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
              <g key={n} transform={`translate(${10 + n * 38.57},0)`}>
                <line x1="0" y1="54" x2="0" y2="62" stroke="var(--ink)" strokeWidth="1.5"/>
                <text x="0" y="75" textAnchor="middle" fontSize="11" fill="var(--ink)">{n}</text>
              </g>
            ))}
            {[
              { label: "Battery acid", ph: 0 },
              { label: "Lemon", ph: 2 },
              { label: "Vinegar", ph: 3 },
              { label: "Water", ph: 7 },
              { label: "Blood", ph: 7.4 },
              { label: "Soap", ph: 10 },
              { label: "Bleach", ph: 13 },
            ].map(({ label, ph }) => (
              <g key={label} transform={`translate(${10 + ph * 38.57},0)`}>
                <line x1="0" y1="26" x2="0" y2="10" stroke="#333" strokeWidth="1.5"/>
                <text x="0" y="8" textAnchor="middle" fontSize="9" fill="var(--ink)">{label}</text>
              </g>
            ))}
            <text x="10" y="115" fontSize="11" fill="#ef4444" fontWeight="700">ACIDIC</text>
            <text x="250" y="115" fontSize="11" fill="#22c55e" fontWeight="700" textAnchor="middle">NEUTRAL</text>
            <text x="550" y="115" fontSize="11" fill="#6d28d9" fontWeight="700" textAnchor="end">ALKALINE</text>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ
            num={11}
            question="A solution has a pH of 3. Another has a pH of 5. How many times more acidic is the first solution?"
            options={["2 times", "10 times", "100 times", "1000 times"]}
            correct={2}
            explain="The pH scale is logarithmic. A difference of 2 pH units means a 10 x 10 = 100-fold difference in H+ concentration."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.2.6" title="Use pH indicators or meters to measure the pH change of neutralisation reactions" progress={progress} setProgress={setProgress}>
        <p>When an acid and a base are mixed, a neutralisation reaction occurs: acid + base → salt + water. As base is added to acid, the <Term def="A graphical plot of pH against volume of base added during a titration; shows the equivalence point as a steep rise.">titration curve</Term> rises slowly at first, then shoots up steeply at the <Term def="The point at which the exact amount of base has been added to completely neutralise the acid. pH = 7 for strong acid and strong base.">equivalence point</Term>, then levels off in the alkaline region.</p>
        <p>Different <Term def="A substance that changes colour depending on the pH of the solution it is in.">indicators</Term> change colour at different pH values: phenolphthalein is colourless in acid and pink in base; litmus is red in acid and blue in base; bromothymol blue is yellow in acid and blue in base. A pH meter gives a continuous digital reading, making it more precise than a colour indicator.</p>
        <p>Monitoring pH during neutralisation has many real-world applications: antacids neutralise excess stomach acid, lime (calcium hydroxide) is added to acidic soils to adjust pH for crops, and industrial wastewater is treated to reach a safe pH before release.</p>
        <Callout kind="key" title="Titration curve shape">
          The curve starts at low pH (acidic), rises gradually, then rises sharply at the equivalence point (pH = 7 for a strong acid + strong base), then levels off at high pH (alkaline).
        </Callout>
        <Figure num="4" caption="Titration curve: adding NaOH to HCl.">
          <svg viewBox="0 0 360 200" width="100%" style={{ maxWidth: 360 }}>
            <line x1="40" y1="170" x2="330" y2="170" stroke="var(--ink)" strokeWidth="1.5"/>
            <line x1="40" y1="10" x2="40" y2="170" stroke="var(--ink)" strokeWidth="1.5"/>
            {[0,2,4,6,8,10,12,14].map(n => (
              <g key={n}>
                <line x1="36" y1={170 - n * 11.4} x2="44" y2={170 - n * 11.4} stroke="var(--ink)" strokeWidth="1"/>
                <text x="32" y={173 - n * 11.4} textAnchor="end" fontSize="10" fill="var(--ink)">{n}</text>
              </g>
            ))}
            {[0,5,10,15,20,25,30].map(n => (
              <g key={n}>
                <line x1={40 + n * 9.67} y1="170" x2={40 + n * 9.67} y2="176" stroke="var(--ink)" strokeWidth="1"/>
                <text x={40 + n * 9.67} y="186" textAnchor="middle" fontSize="10" fill="var(--ink)">{n}</text>
              </g>
            ))}
            <text x="185" y="198" textAnchor="middle" fontSize="11" fill="var(--muted)">Volume NaOH added (mL)</text>
            <text x="14" y="90" textAnchor="middle" fontSize="11" fill="var(--muted)" transform="rotate(-90,14,90)">pH</text>
            {/* titration curve */}
            <path
              d="M40,158 C80,155 110,152 130,148 C150,144 160,140 165,130 C167,125 168,118 168,108 C168,98 169,88 172,78 C175,68 180,60 192,56 C204,52 220,52 250,53 C280,54 300,54 320,55"
              fill="none" stroke="var(--accent-deep)" strokeWidth="2.5"
            />
            {/* equivalence point */}
            <line x1="168" y1="10" x2="168" y2="170" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5 3"/>
            <text x="172" y="22" fontSize="10" fill="#16a34a">equiv. point</text>
            <circle cx="168" cy="108" r="5" fill="#16a34a"/>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <WrittenQ
            num={12}
            question="Describe how the pH changes when sodium hydroxide solution is slowly added to hydrochloric acid."
            model="The pH starts low (strongly acidic, around pH 1 to 2). As NaOH is added, the pH rises slowly at first. Near the equivalence point, the pH rises very steeply, passing through 7. If excess NaOH is added after the equivalence point, the pH continues to rise and levels off at a high value (around 12 to 13)."
          />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.3  -  Rate of Chemical Reactions
   ============================================================ */

function CollisionRateSim() {
  const [temperature, setTemperature] = useState(50);
  const [concentration, setConcentration] = useState(5);
  const [surfaceArea, setSurfaceArea] = useState(1);
  const [catalyst, setCatalyst] = useState(false);

  const particleCount = Math.round(concentration * 4);
  const speed = (temperature / 100) * 3 + 0.5;
  const activationEnergy = catalyst ? 30 : 60;
  const successFraction = Math.min(1, temperature / activationEnergy);
  const effectiveSurfaceArea = surfaceArea;
  const relativeRate = (speed * successFraction * concentration * effectiveSurfaceArea * (catalyst ? 1.8 : 1)).toFixed(1);

  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ particles: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    // init particles
    const count = particleCount;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * speed * 4,
      vy: (Math.random() - 0.5) * speed * 4,
      r: 8,
    }));
    stateRef.current.particles = particles;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "var(--surface, #f8f8ff)";
      ctx.fillRect(0, 0, W, H);
      const ps = stateRef.current.particles;
      ps.forEach(p => {
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
    return () => cancelAnimationFrame(animRef.current);
  }, [particleCount, speed]);

  const rateLabel =
    Number(relativeRate) < 3 ? "Slow" :
    Number(relativeRate) < 8 ? "Moderate" :
    Number(relativeRate) < 18 ? "Fast" : "Very fast";

  return (
    <Interactive title="Collision rate simulator" subtitle="Adjust the factors and watch how the relative reaction rate changes.">
      <div className="grid-2" style={{ gap: 14, marginBottom: 12 }}>
        <Slider label="Temperature" min={20} max={100} value={temperature} onChange={setTemperature} unit=" C"/>
        <Slider label="Concentration" min={1} max={10} value={concentration} onChange={setConcentration} unit="x"/>
        <Slider label="Surface area" min={1} max={5} value={surfaceArea} onChange={setSurfaceArea} unit="x"/>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 600 }}>Catalyst</span>
          <button
            className={`btn ${catalyst ? "btn-accent" : "btn-ghost"}`}
            style={{ minWidth: 70 }}
            onClick={() => setCatalyst(c => !c)}
          >
            {catalyst ? "On" : "Off"}
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={340}
        height={120}
        style={{ borderRadius: 10, background: "var(--accent-soft)", display: "block", margin: "0 auto 14px" }}
      />
      <div className="stat-readout">
        <Stat value={relativeRate} label="Relative rate"/>
        <Stat value={rateLabel} label="Description"/>
        <Stat value={`${activationEnergy} kJ`} label="Activation energy"/>
      </div>
      <p className="muted" style={{ marginBottom: 0, fontSize: 13 }}>
        A 10 degree rise in temperature roughly doubles the rate. A catalyst lowers the activation energy so more collisions succeed.
      </p>
    </Interactive>
  );
}

function Section63({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.3 Rate of chemical reactions</div>
        <h1>How fast does a reaction go?</h1>
        <p className="lead">Concentration, surface area, temperature, and catalysts all change how quickly reactants become products.</p>
      </div>

      <DotPoint id="6.3.1" title="Investigate and explain how concentration, surface area, temperature and catalysts affect rate" progress={progress} setProgress={setProgress}>
        <p>The <Term def="A measure of how quickly reactants are converted into products in a chemical reaction.">rate of a chemical reaction</Term> tells you how fast it goes. Explosions are very fast; rusting is very slow. <Term def="The theory that reactions occur when particles collide with sufficient energy and the correct orientation.">Collision theory</Term> explains rate: a reaction only happens when particles collide with enough energy (the <Term def="The minimum amount of energy that colliding particles must have for a reaction to occur.">activation energy</Term>) and with the correct orientation. Anything that increases the frequency or energy of successful collisions increases the rate.</p>
        <p>Higher <Term def="The amount of substance dissolved in a given volume of solution.">concentration</Term> means more particles per unit volume, so collisions happen more often. Larger <Term def="The total area of a solid that is exposed and available for collisions with other particles.">surface area</Term> exposes more particles to collisions; powders react faster than lumps because there are far more particle sites available.</p>
        <p>Higher temperature makes particles move faster, causing both more frequent collisions and more energetic ones, so more collisions exceed the activation energy. As a rule of thumb, every 10 degree Celsius rise roughly doubles the rate. A <Term def="A substance that speeds up a reaction without being consumed in the process. It lowers the activation energy.">catalyst</Term> lowers the activation energy needed, so a higher proportion of collisions are successful, speeding up the reaction without being used up itself.</p>
        <CollisionRateSim />
        <Callout kind="tip" title="Measuring rate">
          Common methods include measuring the volume of gas produced over time, measuring the loss of mass over time (if a gas escapes), and measuring the time for a precipitate to obscure a cross drawn on paper.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={13}
            question="Powdered marble reacts faster with acid than marble chips. Which factor explains this?"
            options={["Temperature", "Concentration", "Surface area", "Catalyst"]}
            correct={2}
            explain="Smaller particles have a much greater surface area exposed to the acid, so more collisions happen per second."
          />
          <WrittenQ
            num={14}
            question="Using collision theory, explain why a catalyst speeds up a reaction without being used up."
            model="A catalyst provides an alternative reaction pathway with a lower activation energy. This means a greater proportion of collisions have enough energy to result in a reaction, so products form faster. Because the catalyst is not permanently changed or consumed in the process, it can catalyse many reactions repeatedly."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.3.2" title="Conduct a practical investigation, graph data and write a scientific report" progress={progress} setProgress={setProgress}>
        <p>A good investigation is built around a testable <Term def="A prediction written in 'if...then...' format that states what you expect to happen and why.">hypothesis</Term> with a clear cause-and-effect relationship. For example: "If the temperature of the acid is increased, then the rate of reaction between magnesium and acid will increase because higher temperature means more energetic collisions."</p>
        <p>Every investigation has one <Term def="The factor that the experimenter deliberately changes.">independent variable</Term> (what you change), one <Term def="The factor that is measured to show the effect of the independent variable.">dependent variable</Term> (what you measure), and several <Term def="All other variables that are kept the same to ensure a fair test.">controlled variables</Term> (everything else kept the same). This makes the investigation a fair test.</p>
        <p>Your results should be recorded in a table and then plotted as a graph with labelled axes, units, and a line of best fit. A written report follows the structure: title, aim, hypothesis, variables, materials, method, results, discussion, and conclusion. The conclusion must state whether the hypothesis was supported or rejected.</p>
        <Callout kind="key" title="Scientific report structure">
          Title - Aim - Hypothesis - Variables - Materials - Method - Results (table + graph) - Discussion - Conclusion.
        </Callout>
        <Figure num="5" caption="Sample graph: mass loss vs time for marble chips in acid at two concentrations.">
          <svg viewBox="0 0 360 200" width="100%" style={{ maxWidth: 360 }}>
            <line x1="50" y1="170" x2="330" y2="170" stroke="var(--ink)" strokeWidth="1.5"/>
            <line x1="50" y1="10" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5"/>
            {[0,0.5,1,1.5,2].map((v, i) => (
              <g key={v}>
                <line x1="46" y1={170 - i * 40} x2="54" y2={170 - i * 40} stroke="var(--ink)" strokeWidth="1"/>
                <text x="42" y={173 - i * 40} textAnchor="end" fontSize="10" fill="var(--ink)">{v}</text>
              </g>
            ))}
            {[0,1,2,3,4,5].map((v, i) => (
              <g key={v}>
                <line x1={50 + i * 56} y1="170" x2={50 + i * 56} y2="176" stroke="var(--ink)" strokeWidth="1"/>
                <text x={50 + i * 56} y="186" textAnchor="middle" fontSize="10" fill="var(--ink)">{v}</text>
              </g>
            ))}
            <text x="190" y="198" textAnchor="middle" fontSize="11" fill="var(--muted)">Time (min)</text>
            <text x="14" y="90" textAnchor="middle" fontSize="11" fill="var(--muted)" transform="rotate(-90,14,90)">Mass loss (g)</text>
            {/* concentrated - faster */}
            <path d="M50,170 C90,140 130,115 160,105 C190,95 230,90 330,88" fill="none" stroke="var(--accent-deep)" strokeWidth="2.5"/>
            <text x="335" y="86" fontSize="10" fill="var(--accent-deep)">conc.</text>
            {/* dilute - slower */}
            <path d="M50,170 C90,155 140,140 180,130 C220,120 270,115 330,112" fill="none" stroke="#94a3b8" strokeWidth="2.5"/>
            <text x="335" y="112" fontSize="10" fill="#94a3b8">dilute</text>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ
            num={15}
            question="In a rate experiment, a student changes the temperature and measures the time for the reaction to finish. What is the independent variable?"
            options={["Time", "Temperature", "Mass of reactant", "Volume of gas"]}
            correct={1}
            explain="The independent variable is the factor you deliberately change. Here that is temperature."
          />
          <WrittenQ
            num={16}
            question="Write a hypothesis in 'if...then...' format for an investigation into how surface area affects the rate of CO2 production from marble chips in acid."
            model="If the surface area of the marble chips is increased (by using smaller chips or powder), then the rate of CO2 production will increase because more marble particles are exposed to the acid, leading to more frequent collisions per second."
          />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.4  -  Nuclear Reactions
   ============================================================ */

function HalfLifeSim() {
  const [isotope, setIsotope] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const isotopes = [
    { name: "Iodine-131", halfLife: 8, unit: "days", initial: 1000 },
    { name: "Carbon-14", halfLife: 5730, unit: "years", initial: 1000 },
    { name: "Cobalt-60", halfLife: 5.27, unit: "years", initial: 1000 },
  ];
  const iso = isotopes[isotope];
  const maxElapsed = iso.halfLife * 5;
  const step = iso.halfLife / 2;

  const remaining = iso.initial * Math.pow(0.5, elapsed / iso.halfLife);
  const percentLeft = (remaining / iso.initial * 100).toFixed(1);

  const points = [];
  for (let t = 0; t <= maxElapsed; t += iso.halfLife / 20) {
    points.push({ t, n: iso.initial * Math.pow(0.5, t / iso.halfLife) });
  }

  const W = 300, H = 160;
  const padL = 45, padB = 30, padT = 10, padR = 15;
  const xScale = (t) => padL + (t / maxElapsed) * (W - padL - padR);
  const yScale = (n) => padT + H - padB - (n / iso.initial) * (H - padT - padB);

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.t).toFixed(1)},${yScale(p.n).toFixed(1)}`).join(" ");
  const currentX = xScale(elapsed);
  const currentY = yScale(remaining);

  return (
    <Interactive title="Half-life simulator" subtitle="Pick an isotope and move the time slider to see radioactive decay in action.">
      <div className="ctrl-row" style={{ marginBottom: 12 }}>
        <SegToggle
          options={isotopes.map((iso, i) => ({ value: i, label: iso.name }))}
          value={isotope}
          onChange={v => { setIsotope(Number(v)); setElapsed(0); }}
        />
      </div>
      <Slider label={`Time (${iso.unit})`} min={0} max={maxElapsed} step={step} value={elapsed} onChange={setElapsed} unit={` ${iso.unit}`}/>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, display: "block", margin: "12px auto" }}>
        {/* axes */}
        <line x1={padL} y1={padT} x2={padL} y2={H - padB + padT} stroke="var(--ink)" strokeWidth="1.5"/>
        <line x1={padL} y1={H - padB + padT} x2={W - padR} y2={H - padB + padT} stroke="var(--ink)" strokeWidth="1.5"/>
        {/* axis labels */}
        <text x={W / 2} y={H + 2} textAnchor="middle" fontSize="10" fill="var(--muted)">Time ({iso.unit})</text>
        <text x="10" y={H / 2} textAnchor="middle" fontSize="10" fill="var(--muted)" transform={`rotate(-90,10,${H/2})`}>Atoms remaining</text>
        {/* curve */}
        <path d={pathD} fill="none" stroke="var(--accent-deep)" strokeWidth="2.5"/>
        {/* current point */}
        <line x1={currentX} y1={padT} x2={currentX} y2={H - padB + padT} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx={currentX} cy={currentY} r="6" fill="#16a34a"/>
        <text x={currentX + 8} y={currentY - 4} fontSize="10" fill="#16a34a">{Math.round(remaining)}</text>
        {/* tick marks */}
        {[0, 0.25, 0.5, 0.75, 1].map(f => (
          <g key={f}>
            <line x1={padL} y1={yScale(iso.initial * f)} x2={padL - 4} y2={yScale(iso.initial * f)} stroke="var(--ink)" strokeWidth="1"/>
            <text x={padL - 6} y={yScale(iso.initial * f) + 4} textAnchor="end" fontSize="9" fill="var(--ink)">{Math.round(iso.initial * f)}</text>
          </g>
        ))}
      </svg>
      <div className="stat-readout">
        <Stat value={Math.round(remaining)} label="Atoms remaining"/>
        <Stat value={`${percentLeft}%`} label="Fraction left"/>
        <Stat value={(elapsed / iso.halfLife).toFixed(1)} label="Half-lives elapsed"/>
      </div>
    </Interactive>
  );
}

function NuclearEquationChecker() {
  const problems = [
    {
      desc: "Alpha decay of Uranium-238",
      parent: { symbol: "U", A: 238, Z: 92 },
      particle: { symbol: "α", A: 4, Z: 2 },
      type: "alpha",
      daughter: { symbol: "Th", A: 234, Z: 90 },
    },
    {
      desc: "Beta decay of Carbon-14",
      parent: { symbol: "C", A: 14, Z: 6 },
      particle: { symbol: "β", A: 0, Z: -1 },
      type: "beta",
      daughter: { symbol: "N", A: 14, Z: 7 },
    },
    {
      desc: "Alpha decay of Radium-226",
      parent: { symbol: "Ra", A: 226, Z: 88 },
      particle: { symbol: "α", A: 4, Z: 2 },
      type: "alpha",
      daughter: { symbol: "Rn", A: 222, Z: 86 },
    },
  ];

  const [idx, setIdx] = useState(0);
  const p = problems[idx];
  const [dA, setDA] = useState("");
  const [dZ, setDZ] = useState("");
  const [checked, setChecked] = useState(false);

  function check() { setChecked(true); }
  function next() { setIdx(i => (i + 1) % problems.length); setDA(""); setDZ(""); setChecked(false); }

  const correctA = p.parent.A - p.particle.A;
  const correctZ = p.parent.Z - p.particle.Z;
  const aOk = Number(dA) === correctA;
  const zOk = Number(dZ) === correctZ;
  const allOk = aOk && zOk;

  return (
    <Interactive title="Nuclear equation checker" subtitle="Work out the mass number and atomic number of the daughter nucleus.">
      <div className="ctrl-row" style={{ justifyContent: "center", marginBottom: 10 }}>
        <span className="chip accent">{p.desc}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 16, marginBottom: 16 }}>
        <span style={{ textAlign: "center" }}>
          <sup>{p.parent.A}</sup><sub>{p.parent.Z}</sub>{p.parent.symbol}
        </span>
        <span style={{ fontWeight: 700, color: "var(--accent-deep)", fontSize: 22 }}>→</span>
        <span style={{ textAlign: "center", display: "flex", alignItems: "center", gap: 4 }}>
          <span>
            <input value={dA} onChange={e => { setDA(e.target.value); setChecked(false); }} style={{ width: 44, textAlign: "center", fontWeight: 700, borderRadius: 6, border: "2px solid var(--accent-deep)", padding: "2px 4px", background: checked ? (aOk ? "#bbf7d0" : "#fecaca") : "var(--surface)" }} placeholder="A"/>
            <br/>
            <input value={dZ} onChange={e => { setDZ(e.target.value); setChecked(false); }} style={{ width: 44, textAlign: "center", fontWeight: 700, borderRadius: 6, border: "2px solid var(--accent-deep)", padding: "2px 4px", background: checked ? (zOk ? "#bbf7d0" : "#fecaca") : "var(--surface)", marginTop: 2 }} placeholder="Z"/>
            <span style={{ marginLeft: 4 }}>{p.daughter.symbol}</span>
          </span>
        </span>
        <span style={{ fontWeight: 700, color: "var(--accent-deep)" }}>+</span>
        <span>
          <sup>{p.particle.A}</sup><sub>{p.particle.Z}</sub>{p.particle.symbol}
        </span>
      </div>
      <div className="ctrl-row" style={{ justifyContent: "center", gap: 10 }}>
        <button className="btn btn-accent" onClick={check}>Check</button>
        <button className="btn btn-ghost" onClick={next}>Next equation</button>
      </div>
      {checked && (
        <Callout kind={allOk ? "success" : "warn"} title={allOk ? "Correct!" : "Not quite."}>
          {allOk
            ? `Well done. Mass number = ${correctA}, atomic number = ${correctZ}.`
            : `Hint: A must balance (${p.parent.A} = ? + ${p.particle.A}) and Z must balance (${p.parent.Z} = ? + ${p.particle.Z}).`}
        </Callout>
      )}
    </Interactive>
  );
}

function Section64({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.4 Nuclear reactions</div>
        <h1>Inside the nucleus</h1>
        <p className="lead">From the Big Bang to radioactive decay, half-lives, fission, and fusion, the nucleus is where some of the universe's most powerful reactions take place.</p>
      </div>

      <DotPoint id="6.4.1" title="Outline how the first elements were formed after the Big Bang" progress={progress} setProgress={setProgress}>
        <p>The <Term def="The leading scientific theory that the universe began about 13.8 billion years ago from an extremely hot, dense point that rapidly expanded.">Big Bang theory</Term> proposes that around 13.8 billion years ago, all matter and energy were concentrated in one unimaginably hot, dense point. As the universe expanded and cooled, matter began to take shape.</p>
        <p>Within the first second, quarks combined to form protons and neutrons. About 3 to 20 minutes after the Big Bang, <Term def="The production of atomic nuclei from protons and neutrons in the first minutes after the Big Bang.">Big Bang nucleosynthesis</Term> produced the lightest nuclei: approximately 75% hydrogen (H) and 25% helium (He), plus tiny traces of lithium and beryllium.</p>
        <p>After about 380,000 years, the universe cooled enough for electrons to combine with nuclei to form neutral atoms. All elements heavier than lithium were formed much later inside stars through <Term def="The nuclear fusion reactions inside stars that produce heavier elements from lighter ones.">stellar nucleosynthesis</Term>. Stars fuse hydrogen into helium, then helium into carbon and oxygen up to iron. Elements heavier than iron are produced only in the explosions of massive stars called <Term def="An explosive end-of-life event for a massive star that produces and disperses heavy elements throughout the universe.">supernovae</Term>. The carbon, oxygen, and iron in your body were all made inside ancient stars.</p>
        <Callout kind="fact" title="We are made of stardust">
          Every atom of carbon in your body was forged inside a star that lived and died long before our solar system was born. The iron in your blood was made in a supernova explosion.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={17}
            question="Which two elements were produced in the greatest amounts during Big Bang nucleosynthesis?"
            options={["Carbon and oxygen", "Hydrogen and helium", "Hydrogen and lithium", "Helium and iron"]}
            correct={1}
            explain="Big Bang nucleosynthesis produced roughly 75% hydrogen and 25% helium. Heavier elements formed much later inside stars."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.4.2" title="Describe the conditions that cause a nucleus to be unstable" progress={progress} setProgress={setProgress}>
        <p>The nucleus is held together by the <Term def="A very short-range force that binds protons and neutrons together in the nucleus, overcoming the repulsion between protons.">strong nuclear force</Term>, which acts between nucleons (protons and neutrons). At the same time, protons repel each other because they share the same positive charge. A nucleus is <Term def="A nucleus that has the right balance of protons and neutrons to remain intact without emitting radiation.">stable</Term> when these two forces are balanced.</p>
        <p>A nucleus becomes <Term def="A nucleus that has too many or too few neutrons relative to its protons, causing it to emit radiation to reach a more stable state.">unstable</Term> if it has too many neutrons for its protons, too few neutrons for its protons, or too many nucleons in total. Every element with more than 83 protons has at least some unstable <Term def="Atoms of the same element with different numbers of neutrons. Some isotopes are radioactive.">isotopes</Term>. Unstable nuclei undergo <Term def="The spontaneous emission of radiation from an unstable nucleus to reach a more stable state.">radioactive decay</Term>, emitting alpha particles, beta particles, or gamma radiation.</p>
        <Callout kind="key" title="Types of radiation">
          Alpha (a helium nucleus: 2 protons + 2 neutrons), Beta (a high-energy electron ejected from the nucleus when a neutron converts to a proton), and Gamma (high-energy electromagnetic radiation, often emitted alongside alpha or beta decay).
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={18}
            question="Why do all elements with more than 83 protons have at least some radioactive isotopes?"
            options={[
              "They have too few electrons",
              "The strong nuclear force cannot balance the repulsion between so many protons",
              "They are too light to be stable",
              "They were not formed in the Big Bang"
            ]}
            correct={1}
            explain="Above 83 protons, the electrostatic repulsion between protons in the nucleus becomes so strong that no stable neutron-to-proton ratio exists."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.4.3" title="Represent alpha and beta reactions as nuclear equations" progress={progress} setProgress={setProgress}>
        <p>Nuclear reactions are represented by <Term def="An equation showing how atomic nuclei change, with mass numbers and atomic numbers balancing on both sides.">nuclear equations</Term>. In these, the top number (mass number, A) is the total number of protons and neutrons, and the bottom number (atomic number, Z) is the number of protons. Both A and Z must balance on each side of the arrow.</p>
        <p>In <Term def="A type of radioactive decay in which an alpha particle (2 protons + 2 neutrons) is emitted, reducing the mass number by 4 and the atomic number by 2.">alpha decay</Term>, the nucleus loses an alpha particle (written as &#8308;&#8322;He or &#945;), so the mass number decreases by 4 and the atomic number decreases by 2. The element changes to a different element. Example: ²³&#8312;&#9226;&#8322;U → ²³&#8308;&#9226;&#8320;Th + &#8308;&#8322;He.</p>
        <p>In <Term def="A type of radioactive decay in which a neutron converts into a proton and a high-energy electron (beta particle) that is ejected, increasing the atomic number by 1.">beta decay</Term>, a neutron in the nucleus becomes a proton, and a high-energy electron (the beta particle, &#8315;&#185;&#8320;e) is ejected. The mass number stays the same, but the atomic number increases by 1. Example: &#185;&#8308;&#8326;C → &#185;&#8308;&#8327;N + &#8315;&#185;&#8320;e. <Term def="High-energy electromagnetic radiation emitted alongside alpha or beta decay. It does not change the atomic or mass number.">Gamma emission</Term> does not change atomic or mass number.</p>
        <NuclearEquationChecker />
        <QGroup title="Check yourself">
          <WrittenQ
            num={19}
            question="Explain why alpha decay changes one element into a different element."
            model="Alpha decay removes 2 protons and 2 neutrons from the nucleus. The number of protons determines the element. Removing 2 protons changes the atomic number, which means the atom is now a completely different element on the periodic table."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.4.4" title="Identify that the half-life of a radioactive isotope is the time taken for half of the atoms to decay" progress={progress} setProgress={setProgress}>
        <p>The <Term def="The time taken for half of the radioactive atoms in a sample to undergo radioactive decay. Each isotope has a fixed, characteristic half-life.">half-life</Term> of a radioactive isotope is the time it takes for half the atoms in a sample to decay. This is a fixed property of each isotope and cannot be changed by temperature, pressure, or chemical reactions.</p>
        <p>If you start with 1000 atoms of an isotope that has a half-life of 10 years, after 10 years 500 remain, after 20 years 250 remain, and after 30 years 125 remain. The decay follows an <Term def="A pattern of decrease where the quantity halves over equal time intervals.">exponential</Term> pattern: the number of radioactive atoms approaches zero but never actually reaches it.</p>
        <p>Half-life has many practical uses: radiocarbon dating uses carbon-14 (half-life 5,730 years) to estimate the age of biological materials up to about 50,000 years old; uranium-238 (half-life 4.5 billion years) is used to date rocks; medical isotopes like iodine-131 (half-life 8 days) are chosen with short half-lives so radioactivity does not persist in the body.</p>
        <HalfLifeSim />
        <QGroup title="Check yourself">
          <MCQ
            num={20}
            question="A sample contains 800 radioactive atoms with a half-life of 5 years. How many atoms remain after 15 years?"
            options={["400", "200", "100", "50"]}
            correct={2}
            explain="15 years = 3 half-lives. 800 → 400 → 200 → 100."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.4.5" title="Evaluate the societal benefits and considerations of using radioisotopes" progress={progress} setProgress={setProgress}>
        <p>Radioisotopes have significant benefits in medicine, industry, and environmental monitoring. In medicine, <Term def="A radioisotope of technetium used in medical imaging scans to detect cancer, heart disease, and bone disorders.">technetium-99m</Term> is used in millions of diagnostic scans each year. Cobalt-60 and iodine-131 are used in radiotherapy to target and kill cancer cells. Gamma radiation sterilises medical equipment without heat.</p>
        <p>In industry, beta or gamma sources measure the thickness of paper, plastic, and metal sheets as they are produced. Radiation inspects welds for internal defects, and food irradiation kills bacteria and insects to extend shelf life. Americium-241 in smoke detectors ionises air; smoke particles interrupt this current and trigger the alarm.</p>
        <p>In environmental monitoring, radioactive tracers follow water flow, detect leaks in underground pipes, and measure erosion rates. However, all uses require careful regulation: doses to patients and workers must be minimised, radioactive waste must be stored safely, and contamination of the environment must be prevented.</p>
        <Callout kind="warn" title="Risk-benefit balance">
          The benefits of radioisotopes are large, but risks to health and environment are real. Strict regulations, specialised training, and secure waste disposal are essential for responsible use.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ
            num={21}
            question="Evaluate one benefit and one consideration of using radioisotopes in medicine."
            model="Benefit: radioisotopes such as technetium-99m allow doctors to detect cancers and other diseases at an early stage without surgery, greatly improving patient outcomes. Consideration: the radiation from these isotopes can damage healthy cells, so the dose must be carefully calculated and patients may need to limit contact with others for a short period after treatment to reduce exposure to others."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.4.6" title="Describe nuclear fission and nuclear fusion" progress={progress} setProgress={setProgress}>
        <p><Term def="The splitting of a large, unstable nucleus into two smaller nuclei, releasing a large amount of energy, several neutrons, and gamma radiation.">Nuclear fission</Term> occurs when a large nucleus, such as uranium-235, absorbs a neutron and splits into two smaller nuclei. This releases extra neutrons that can trigger further fissions, creating a <Term def="A self-sustaining series of fission reactions where neutrons from each fission trigger more fissions.">chain reaction</Term>. Fission releases about one million times more energy per unit mass than a chemical reaction. It is used in nuclear power stations and atomic weapons.</p>
        <p><Term def="The joining of two small nuclei to form a larger nucleus, releasing a very large amount of energy.">Nuclear fusion</Term> is the opposite: two small nuclei (usually hydrogen isotopes deuterium and tritium) are forced together to form a larger nucleus. Fusion requires extremely high temperatures (millions of degrees Celsius) and pressures, conditions found naturally inside stars. Fusion releases even more energy per unit mass than fission and produces far less long-lived radioactive waste. Commercial fusion power stations do not yet exist, but international research projects like ITER are working on it.</p>
        <Figure num="6" caption="Fission vs fusion: key differences at a glance.">
          <svg viewBox="0 0 540 130" width="100%" style={{ maxWidth: 540 }}>
            {[
              ["Process", "Large nucleus splits", "Small nuclei join"],
              ["Fuel", "Uranium-235", "Hydrogen isotopes"],
              ["Energy", "Very large", "Even larger per kg"],
              ["Waste", "Long-lived radioactive", "Very little long-lived"],
              ["In use?", "Yes, power stations", "Research only"],
            ].map(([feat, fiss, fus], i) => (
              <g key={feat} transform={`translate(0,${i * 24})`}>
                <rect x="0" y="4" width="160" height="20" rx="4" fill={i % 2 === 0 ? "var(--accent-soft)" : "#f1f5f9"}/>
                <text x="80" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{feat}</text>
                <rect x="165" y="4" width="175" height="20" rx="4" fill={i % 2 === 0 ? "#dbeafe" : "#eff6ff"}/>
                <text x="252" y="18" textAnchor="middle" fontSize="10" fill="var(--ink)">{fiss}</text>
                <rect x="345" y="4" width="190" height="20" rx="4" fill={i % 2 === 0 ? "#dcfce7" : "#f0fdf4"}/>
                <text x="440" y="18" textAnchor="middle" fontSize="10" fill="var(--ink)">{fus}</text>
              </g>
            ))}
            <text x="80" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)">Feature</text>
            <text x="252" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">Fission</text>
            <text x="440" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">Fusion</text>
          </svg>
        </Figure>
        <QGroup title="Check yourself">
          <MCQ
            num={22}
            question="Why is nuclear fusion not yet used to generate electricity commercially?"
            options={[
              "It produces too much radioactive waste",
              "It requires extremely high temperatures and pressures that are very difficult to sustain in a reactor",
              "It is less energetic than fission",
              "It only works in space"
            ]}
            correct={1}
            explain="Fusion needs conditions like those inside the Sun (millions of degrees). Creating and maintaining these conditions in a controlled reactor on Earth is an enormous engineering challenge."
          />
        </QGroup>
      </DotPoint>

      <DotPoint id="6.4.7" title="Outline the impacts on the environment of nuclear reactions" progress={progress} setProgress={setProgress}>
        <p>Nuclear energy has a low carbon footprint during operation, making it attractive for reducing greenhouse gas emissions. However, its environmental impact must be assessed across the full <Term def="The complete sequence of steps from extracting raw materials through production to disposal at the end of use.">life cycle</Term>: from uranium mining to decommissioning.</p>
        <p>Mining and processing uranium causes habitat destruction, produces radioactive dust, and can contaminate nearby water. Construction of a nuclear power station uses large quantities of concrete and steel. During operation, the station uses large volumes of water for cooling, which can warm local waterways, and carries the risk of accidents. The Chernobyl (1986) and Fukushima (2011) accidents released radioactive materials into the environment with long-lasting effects.</p>
        <p>Nuclear reactions produce <Term def="Radioactive material that is no longer useful but remains hazardous for long periods. Classified as low-level, intermediate-level, or high-level.">nuclear waste</Term> that must be managed for thousands of years. High-level waste (such as spent fuel rods) remains hazardous for tens of thousands of years and is stored in deep geological repositories. Decommissioning an old reactor takes decades and is very expensive.</p>
        <Callout kind="key" title="Comparing with coal">
          Nuclear power produces far less CO&#8322; per kilowatt-hour than coal-fired power. However, coal waste is dispersed into the atmosphere, while nuclear waste is concentrated and must be carefully contained. Each has different but serious environmental trade-offs.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ
            num={23}
            question="Explain why nuclear power is considered low-emission but not zero-impact on the environment."
            model="During operation a nuclear power station releases almost no greenhouse gases, making it low-emission. However, the full life cycle includes uranium mining (which destroys habitat and can contaminate water), construction (which produces CO2), cooling water that warms local waterways, the risk of accidents, and the production of radioactive waste that must be safely stored for thousands of years. These impacts mean it is not zero-impact overall."
          />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 6.5  -  Reactions in Context
   ============================================================ */

function HaberProcessSim() {
  const [temperature, setTemperature] = useState(450);
  const [pressure, setPressure] = useState(200);

  // Simplified model: yield peaks around 400-450 C, increases with pressure
  // At high temp, equilibrium shifts back but rate is faster
  // At low temp, yield is better but rate is slower
  const equilibriumYield = Math.max(5, 85 - (temperature - 400) * 0.3) * Math.min(1, pressure / 150);
  const reactionRate = 0.5 + (temperature - 200) / 300 + pressure / 400;
  const practicalYield = Math.round(Math.min(equilibriumYield, 100));
  const rateLabel = reactionRate < 1.5 ? "Slow" : reactionRate < 2.5 ? "Moderate" : "Fast";

  return (
    <Interactive title="Haber process explorer" subtitle="Adjust temperature and pressure to find the best industrial conditions for ammonia production.">
      <div className="grid-2" style={{ gap: 14, marginBottom: 12 }}>
        <Slider label="Temperature" min={200} max={600} value={temperature} onChange={setTemperature} unit=" C"/>
        <Slider label="Pressure" min={50} max={400} value={pressure} onChange={setPressure} unit=" atm"/>
      </div>
      <div className="stat-readout">
        <Stat value={`~${practicalYield}%`} label="Estimated yield"/>
        <Stat value={rateLabel} label="Reaction rate"/>
        <Stat value={temperature + " C"} label="Temperature"/>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, marginBottom: 0 }}>
        Industrially, around 450 C and 200 atm are used with an iron catalyst. Lower temperatures give better yield but too slowly; higher pressure improves yield but makes equipment very expensive and dangerous.
      </p>
      {temperature < 350 && (
        <Callout kind="tip" title="Too cold">
          The yield looks good here but the rate is too slow to be economical. The industrial compromise is around 400 to 500 C.
        </Callout>
      )}
      {temperature > 530 && (
        <Callout kind="warn" title="Too hot">
          At very high temperatures the equilibrium shifts backwards and yield drops. Rate is fast but not enough product is made.
        </Callout>
      )}
    </Interactive>
  );
}

function Section65({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">6.5 Reactions in context</div>
        <h1>Chemistry at work</h1>
        <p className="lead">Industrial chemical and nuclear reactions produce many of the materials, foods, medicines, and energy sources that modern society depends on.</p>
      </div>

      <DotPoint id="6.5.1" title="Investigate a chemical or nuclear reaction used in industry to produce an important product" progress={progress} setProgress={setProgress}>
        <p>Industrial reactions are chemical or nuclear processes carried out on a large scale to produce useful products. Studying them helps you understand how scientific knowledge is applied to meet real-world needs and to evaluate the environmental and social trade-offs involved.</p>
        <p>The <Term def="An industrial process that produces ammonia (NH3) from nitrogen and hydrogen gas using an iron catalyst at high temperature and pressure.">Haber process</Term> synthesises ammonia (NH&#8323;) from nitrogen and hydrogen: N&#8322; + 3H&#8322; → 2NH&#8323;. Ammonia is the starting material for fertilisers that feed billions of people. It requires high pressure (about 200 atm), moderate temperature (about 450 degrees Celsius), and an iron catalyst. The conditions represent a compromise between yield and reaction rate.</p>
        <p><Term def="The industrial process that uses nuclear fission of uranium-235 to generate heat, which produces steam to drive turbines and generate electricity.">Nuclear fission power stations</Term> control a chain reaction of uranium-235 to generate heat, then steam to drive turbines. They produce very low greenhouse gas emissions but generate radioactive waste and require careful safety management. Other important industrial reactions include sulfuric acid production (used in fertilisers, car batteries, and mining), iron and steel production in blast furnaces, and medical radioisotope production.</p>
        <p>When evaluating any industrial reaction, consider: raw materials and their availability, energy required, conditions needed (temperature, pressure, catalyst), products and by-products, economic value, environmental impact at every stage, and social benefits and considerations.</p>
        <HaberProcessSim />
        <Callout kind="fact" title="Haber process impact">
          The Haber process is sometimes described as the most important chemical reaction of the 20th century. Without the nitrogen fertilisers it produces, current methods of farming could not feed the world's population.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ
            num={24}
            question="Why does the Haber process use a moderate temperature of around 450 C rather than a much lower temperature, even though lower temperatures give a better equilibrium yield?"
            options={[
              "Lower temperatures are more expensive",
              "At lower temperatures the reaction rate is too slow to be economical",
              "Lower temperatures produce the wrong product",
              "Nitrogen does not react below 450 C"
            ]}
            correct={1}
            explain="Below about 400 C the yield would be higher, but the rate becomes so slow that waiting for equilibrium would be uneconomical. The industrial conditions are a deliberate compromise."
          />
          <WrittenQ
            num={25}
            question="Choose one industrial reaction and evaluate its environmental impact at two different stages of the process."
            model="Example using nuclear power: (1) Uranium mining causes habitat destruction and can release radioactive dust into the environment, contaminating waterways. (2) During operation, the power station uses large volumes of cooling water that may warm local rivers, harming aquatic ecosystems, and there is a low but real risk of accidents releasing radioactive material. At both stages, careful management and regulation are essential to reduce environmental harm."
          />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   MOUNT
   ============================================================ */

mountTopicApp({
  year: 10,
  topicTitle: "Chemical Reactions",
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
    "Haber process": "An industrial process that produces ammonia from nitrogen and hydrogen using an iron catalyst.",
  },
  sections: [
    {
      id: "6.1",
      label: "Conservation of Mass",
      accent: "purple",
      blurb: "Mass cannot be created or destroyed in any chemical reaction.",
      points: ["6.1.1", "6.1.2", "6.1.3"],
      render: (p) => <Section61 {...p}/>,
    },
    {
      id: "6.2",
      label: "Chemical Reactions",
      accent: "violet",
      blurb: "Naming compounds, writing equations, reaction types, and the pH scale.",
      points: ["6.2.1", "6.2.2", "6.2.3", "6.2.4", "6.2.5", "6.2.6"],
      render: (p) => <Section62 {...p}/>,
    },
    {
      id: "6.3",
      label: "Reaction Rate",
      accent: "blue",
      blurb: "How concentration, surface area, temperature and catalysts control how fast reactions go.",
      points: ["6.3.1", "6.3.2"],
      render: (p) => <Section63 {...p}/>,
    },
    {
      id: "6.4",
      label: "Nuclear Reactions",
      accent: "red",
      blurb: "From Big Bang nucleosynthesis to radioactive decay, fission, and fusion.",
      points: ["6.4.1", "6.4.2", "6.4.3", "6.4.4", "6.4.5", "6.4.6", "6.4.7"],
      render: (p) => <Section64 {...p}/>,
    },
    {
      id: "6.5",
      label: "Reactions in Context",
      accent: "amber",
      blurb: "Industrial chemical and nuclear reactions and their social and environmental impacts.",
      points: ["6.5.1"],
      render: (p) => <Section65 {...p}/>,
    },
  ],
});
