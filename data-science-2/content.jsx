/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ================================================================
   SECTION 8.1 -- Investigating Questions and Claims
   INTERACTIVES:
     - QuestionSorter: drag/click items into investigable vs not
     - CERBuilder: guided claim-evidence-reasoning builder
   ================================================================ */

function QuestionSorter() {
  const questions = [
    { id: "q1", label: "Does screen brightness affect battery life?", bucket: "yes" },
    { id: "q2", label: "Which political party is better for the environment?", bucket: "no" },
    { id: "q3", label: "Does water temperature affect sugar dissolving rate?", bucket: "yes" },
    { id: "q4", label: "What is the meaning of life?", bucket: "no" },
    { id: "q5", label: "Does daily temperature correlate with electricity demand?", bucket: "yes" },
    { id: "q6", label: "Is classical music better than pop music?", bucket: "no" },
    { id: "q7", label: "Does ramp height affect how far a toy car rolls?", bucket: "yes" },
  ];
  return (
    <Interactive title="Investigable or not?" subtitle="Sort each question into the correct category. A question is investigable when it can be answered by collecting measurable evidence.">
      <MatchBuckets
        items={questions}
        buckets={[{ id: "yes", label: "Investigable" }, { id: "no", label: "Not investigable" }]}
      />
    </Interactive>
  );
}

function PeerReviewCycleSVG() {
  const stages = [
    "Observation", "Hypothesis", "Experiment", "Analysis",
    "Peer Review", "Replication"
  ];
  const cx = 220, cy = 140, r = 110;
  const points = stages.map((s, i) => {
    const angle = (i / stages.length) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), label: s };
  });
  return (
    <Figure caption="The scientific knowledge cycle: every finding must survive peer review and replication before it becomes accepted knowledge.">
      <svg viewBox="0 0 440 280" width="100%" style={{ maxWidth: 440 }}>
        {points.map((p, i) => {
          const next = points[(i + 1) % points.length];
          const mx = (p.x + next.x) / 2;
          const my = (p.y + next.y) / 2;
          const dx = next.x - p.x;
          const dy = next.y - p.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const ax = mx - (dy / len) * 14;
          const ay = my + (dx / len) * 14;
          return (
            <g key={i}>
              <line x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr)" />
            </g>
          );
        })}
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
          </marker>
        </defs>
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
            <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--ink)">{p.label}</text>
          </g>
        ))}
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11" fill="var(--muted)">Science</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" fill="var(--muted)">cycle</text>
      </svg>
    </Figure>
  );
}

function CERBuilder() {
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [shown, setShown] = useState(false);
  const score = [claim.trim().length > 10, evidence.trim().length > 10, reasoning.trim().length > 10].filter(Boolean).length;
  const colours = ["var(--red, #e74c3c)", "var(--amber-500, #f59e0b)", "var(--teal-500, #14b8a6)", "var(--green-500, #22c55e)"];
  const labels = ["Start writing", "Getting there", "Almost done", "Strong argument"];
  return (
    <Interactive title="CER Argument Builder" subtitle="Practice writing a scientific argument using the Claim, Evidence, Reasoning framework.">
      <p className="muted" style={{ marginBottom: 8 }}>Topic: A student tested whether caffeine reduces reaction time. The caffeine group had a mean reaction time of 210 ms vs 245 ms for the control group (n=8 each).</p>
      <div style={{ display: "grid", gap: 10 }}>
        {[
          { label: "Claim", val: claim, set: setClaim, hint: "State what you conclude in one clear sentence." },
          { label: "Evidence", val: evidence, set: setEvidence, hint: "Quote specific numbers from the data." },
          { label: "Reasoning", val: reasoning, set: setReasoning, hint: "Explain the scientific link between your evidence and your claim." },
        ].map(({ label, val, set, hint }) => (
          <div key={label}>
            <label style={{ fontWeight: 700, display: "block", marginBottom: 4 }}>{label}</label>
            <p className="muted" style={{ fontSize: 13, margin: "0 0 4px" }}>{hint}</p>
            <textarea
              value={val}
              onChange={e => set(e.target.value)}
              rows={2}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: 14, resize: "vertical", background: "var(--surface)" }}
              placeholder={`Write your ${label.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 8, borderRadius: 4, background: "var(--border)", overflow: "hidden" }}>
          <div style={{ width: `${(score / 3) * 100}%`, height: "100%", background: colours[score], transition: "width 0.4s, background 0.4s" }} />
        </div>
        <span style={{ fontWeight: 700, color: colours[score], minWidth: 120 }}>{labels[score]}</span>
      </div>
    </Interactive>
  );
}

function SourceEvalTool() {
  const sources = [
    {
      id: "a",
      title: "CSIRO Climate Report 2023",
      authority: "high",
      accuracy: "high",
      purpose: "scientific",
      currency: "recent",
      label: "Reliable"
    },
    {
      id: "b",
      title: "Anonymous blog: 'Vaccines cause autism'",
      authority: "low",
      accuracy: "low",
      purpose: "mislead",
      currency: "old",
      label: "Unreliable"
    },
    {
      id: "c",
      title: "Supplement company: 'Our product boosts immunity (no citation)'",
      authority: "conflict",
      accuracy: "low",
      purpose: "commercial",
      currency: "recent",
      label: "Unreliable"
    },
    {
      id: "d",
      title: "WHO: Global cancer statistics 2022",
      authority: "high",
      accuracy: "high",
      purpose: "scientific",
      currency: "recent",
      label: "Reliable"
    },
  ];
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState({});
  const criteria = ["authority", "accuracy", "purpose", "currency"];
  const colourMap = { high: "#14b8a6", low: "#e74c3c", recent: "#14b8a6", old: "#e74c3c", scientific: "#14b8a6", commercial: "#f59e0b", mislead: "#e74c3c", conflict: "#f59e0b" };
  const labelMap = { high: "High", low: "Low / Red flag", recent: "Current", old: "Outdated", scientific: "Scientific/public", commercial: "Commercial interest", mislead: "Mislead/agenda", conflict: "Conflict of interest" };
  const src = sources.find(s => s.id === selected);
  return (
    <Interactive title="Source Evaluation Tool" subtitle="Click a source to evaluate it against the CRAAP criteria: Currency, Relevance, Authority, Accuracy, Purpose.">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {sources.map(s => (
          <button key={s.id} className={`btn ${selected === s.id ? "btn-accent" : "btn-ghost"}`} onClick={() => setSelected(s.id)} style={{ textAlign: "left", maxWidth: 260 }}>
            {s.title}
          </button>
        ))}
      </div>
      {src && (
        <div style={{ background: "var(--surface)", borderRadius: 12, padding: "12px 16px" }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>{src.title}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {criteria.map(c => (
              <div key={c} style={{ background: "var(--bg)", borderRadius: 8, padding: "8px 12px", borderLeft: `4px solid ${colourMap[src[c]]}` }}>
                <span style={{ textTransform: "capitalize", fontWeight: 700, fontSize: 13 }}>{c}:</span>
                <span style={{ marginLeft: 6, fontSize: 13, color: colourMap[src[c]] }}>{labelMap[src[c]]}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 12, fontWeight: 700 }}>
            Verdict: <span style={{ color: src.label === "Reliable" ? "#14b8a6" : "#e74c3c" }}>{src.label}</span>
          </p>
        </div>
      )}
      {!selected && <p className="muted">Select a source above to see its evaluation.</p>}
    </Interactive>
  );
}

function Section1({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">8.1 Investigating Questions and Claims</div>
        <h1>Asking the right questions</h1>
        <p className="lead">Good science begins with a question that is sharp enough to test and honest enough to abandon if the data say otherwise.</p>
      </div>

      <DotPoint id="8.1.1" title="Investigable and non-investigable questions" progress={progress} setProgress={setProgress}>
        <p>Not every question can be answered by collecting evidence. An <Term def="A question that can be answered by gathering measurable, observable data.">investigable question</Term> involves at least one variable you can measure or change. It must be completable with the equipment, time, and participants available to you.</p>
        <p>Questions that depend on personal values, beliefs, or events beyond any possible measurement are <Term def="A question that cannot be settled by gathering empirical data.">non-investigable</Term>. For example, "Is classical music better than pop?" cannot be answered by measurement alone, but "Does listening to classical music change the time taken to complete a set of maths problems?" can.</p>
        <Callout kind="key" title="Four practical constraints">Time, equipment, sample size, and safety all determine whether a question is investigable with your resources. A question about glacier retreat over 500 years can still be investigable if existing datasets contain that history.</Callout>
        <QuestionSorter />
        <QGroup title="Check yourself">
          <MCQ num={1} question="Which of the following is an investigable question?" options={["Is democracy better than other systems?", "Does fertiliser amount affect bean plant height over four weeks?", "What is the purpose of human life?", "Should animals be used in research?"]} correct={1} explain="Only option B involves measurable variables (fertiliser amount, plant height) and a realistic timeframe. The other options depend on values or cannot be empirically tested." />
          <WrittenQ num={2} question="A student wants to investigate 'whether social media is harmful to teenagers.' Explain why this question is not investigable as stated, then rewrite it as an investigable question." model="'Harmful' is undefined and not measurable, and 'social media' and 'teenagers' are too broad. Investigable version: 'Does using social media for more than three hours per day correlate with self-reported sleep duration in Year 10 students aged 15 to 16?'" />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.1.2" title="Hypothesis testing and peer review" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A specific, testable, falsifiable prediction about the relationship between variables.">hypothesis</Term> makes a clear prediction that experiments could in principle disprove. Writing one in the form "If [independent variable] increases, then [dependent variable] will [change] because [mechanism]" keeps it falsifiable and precise.</p>
        <p>After data are collected and analysed, findings are submitted to a <Term def="A process in which independent experts scrutinise a study's methods, analysis, and conclusions before it is published.">peer-reviewed</Term> journal. Reviewers check whether the design was appropriate, whether statistics were used correctly, and whether conclusions follow from the data. After publication, other labs attempt to <Term def="Repeating a study independently to check whether the same results are obtained.">replicate</Term> the findings. A result that cannot be replicated carries little weight, no matter how well it was reviewed.</p>
        <PeerReviewCycleSVG />
        <Callout kind="fact" title="Science self-corrects">Barry Marshall drank a solution of Helicobacter pylori in 1984 to prove bacteria cause stomach ulcers. The scientific community was sceptical, but the evidence accumulated and the pair won the Nobel Prize in 2005. When evidence demands it, science changes its mind.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={3} question="What is the main purpose of peer review in science?" options={["To guarantee a study is correct", "To allow independent experts to check the study before publication", "To give the author feedback on writing style", "To decide how much funding a study receives"]} correct={1} explain="Peer review lets independent experts assess whether methods, statistics, and conclusions are sound. It does not guarantee correctness, which is why replication is also needed." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.1.3" title="Evaluating online sources" progress={progress} setProgress={setProgress}>
        <p>The internet contains vast amounts of information, but quantity does not equal quality. Evaluating whether content is <Term def="Accurate and supported by evidence.">valid</Term> and <Term def="Consistent and from a trustworthy, appropriately expert source.">reliable</Term> requires applying explicit criteria. The SIFT method helps: Stop before sharing; Investigate the source; Find better coverage from multiple independent sources; Trace claims back to original evidence.</p>
        <p>The CRAAP framework provides five criteria: <Term def="How recently the information was published.">Currency</Term>, Relevance, <Term def="The expertise and credibility of the author or publisher.">Authority</Term>, <Term def="Whether claims are supported by data and citations.">Accuracy</Term>, and <Term def="The reason the information was published, including potential commercial or ideological motives.">Purpose</Term>. Apply all five, not just the ones that are convenient.</p>
        <SourceEvalTool />
        <Callout kind="warn" title="Many websites, one false claim">Many websites can repeat the same false information. The number of sites making a claim does not make it reliable. What counts is whether multiple independent expert sources that investigated the claim independently reached the same conclusion.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={4} question="A health influencer posts on Instagram: 'A recent Harvard study shows this berry extract cures diabetes' with no link provided. Which evaluation criterion is most clearly failed?" options={["Currency", "Accuracy", "Relevance", "Corroboration"]} correct={1} explain="The 'Accuracy' criterion fails because the claim cannot be traced to a named study and no link is provided. Extraordinary claims require citable, verifiable evidence." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.1.4" title="Identifying and testing claims" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A statement asserting that something is true, which can in principle be supported or contradicted by evidence.">scientific claim</Term> is testable when evidence could either support or contradict it. Identifying a testable claim involves: recognising what the claim asserts, determining what evidence would confirm or refute it, and checking whether that evidence is collectable.</p>
        <p>Some claims require a single well-designed experiment. Others, such as "regular exercise reduces the risk of heart disease," require a series of investigations: short-term studies measuring physiological markers, plus analysis of longitudinal datasets tracking outcomes over decades. Understanding the scope needed to properly test a claim prevents premature conclusions.</p>
        <Callout kind="tip" title="Claim vs hypothesis">A claim is a statement that something is true. A hypothesis is a narrower, specific prediction in the form "if X, then Y," derived from the claim to make it testable.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={5} question="Explain why the claim 'this crystal brings good luck' is not scientifically testable." model="'Good luck' cannot be operationalised or measured. There is no defined outcome that would count as luck, no comparison condition, and no way to isolate the crystal's effect from all other variables. The claim is not falsifiable." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.1.5" title="Evidence, reasoning, and conclusions" progress={progress} setProgress={setProgress}>
        <p>A scientific conclusion links data to a claim through explicit reasoning. It has three components: an accurate description of the data pattern, a link between the data and the hypothesis, and reasoning that explains the scientific principle connecting the observation to the claim.</p>
        <p>Conclusions must also acknowledge <Term def="Constraints that reduce the confidence you can place in a conclusion, such as small sample size or uncontrolled variables.">limitations</Term>. Using qualifying language such as "the data suggest," "the results are consistent with," or "further investigation is needed" is not weakness but scientific honesty.</p>
        <Callout kind="key" title="Weak vs strong conclusion">
          Weak: "My hypothesis was correct." Strong: "As temperature increased from 20 to 60 degrees C, mean enzyme activity increased by 42%, supporting the hypothesis that higher temperature increases reaction rate up to a threshold. However, with only 8 trials per condition, further testing with larger samples is needed."
        </Callout>
      </DotPoint>

      <DotPoint id="8.1.6" title="Written scientific arguments (CER)" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A structured written response that connects a claim to evidence through explicit reasoning using the CER framework.">scientific argument</Term> is not an opinion piece. It uses the <Term def="Claim, Evidence, Reasoning: a framework for constructing a written scientific argument.">CER framework</Term>: the Claim states what you assert; the Evidence consists of specific data (numbers, measurements, trends); the Reasoning explains the scientific principle connecting evidence to claim.</p>
        <p>A strong argument also addresses contradictory evidence and explains why the weight of evidence still supports the claim. Confidence in the claim must be proportional to the strength of the evidence.</p>
        <CERBuilder />
        <QGroup title="Check yourself">
          <MCQ num={6} question="What does the 'R' in CER stand for?" options={["Result", "Replication", "Reasoning", "Reference"]} correct={2} explain="Reasoning is the scientific principle that explains why the evidence implies the claim. Without it, the reader cannot see how the data leads to the conclusion." />
          <WrittenQ num={7} question="Use the CER framework to write a scientific argument for the claim: 'Increasing atmospheric CO2 is associated with rising global average temperature.' Use these data: CO2 has risen from 280 ppm in 1750 to 420 ppm in 2023; global mean temperature has risen by approximately 1.1 degrees C over the same period; CO2 absorbs and re-emits infrared radiation." model="Claim: increasing atmospheric CO2 is associated with rising global average temperature. Evidence: CO2 rose from 280 ppm in 1750 to 420 ppm in 2023 (a 50% increase); global mean temperature rose by approximately 1.1 degrees C over the same period. Reasoning: CO2 is a greenhouse gas that absorbs infrared radiation emitted by Earth's surface and re-emits it, reducing heat escaping to space. The correlation between rising CO2 and rising temperature is consistent with this physical mechanism, and the timescale matches increased fossil fuel combustion." />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ================================================================
   SECTION 8.2 -- Pseudoscience
   INTERACTIVES:
     - PseudoscienceChecker: score a claim against 7 criteria
     - DataDistortionSim: interactive axis manipulation demo
   ================================================================ */

function PseudoscienceChecker() {
  const criteria = [
    { id: "falsifiable", label: "Makes a falsifiable prediction", scientific: true },
    { id: "controlled", label: "Tested in controlled experiments", scientific: true },
    { id: "peerreviewed", label: "Published in peer-reviewed journals", scientific: true },
    { id: "replicated", label: "Results independently replicated", scientific: true },
    { id: "mechanism", label: "Mechanism consistent with known science", scientific: true },
    { id: "updates", label: "Updates when contradictory evidence appears", scientific: true },
    { id: "consensus", label: "Accepted by relevant expert community", scientific: true },
  ];
  const [checks, setChecks] = useState({});
  const score = criteria.filter(c => checks[c.id]).length;
  const verdict = score >= 6 ? { label: "Likely scientific", color: "#14b8a6" } :
    score >= 4 ? { label: "Uncertain / needs more investigation", color: "#f59e0b" } :
    { label: "Likely pseudoscientific", color: "#e74c3c" };
  return (
    <Interactive title="Pseudoscience Checker" subtitle="Apply the 7-criterion checklist to any claim. Tick each criterion that the claim satisfies.">
      <div style={{ display: "grid", gap: 8 }}>
        {criteria.map(c => (
          <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 12px", borderRadius: 8, background: checks[c.id] ? "var(--accent-soft)" : "var(--surface)", border: "1.5px solid " + (checks[c.id] ? "var(--accent)" : "var(--border)"), transition: "all 0.2s" }}>
            <input type="checkbox" checked={!!checks[c.id]} onChange={e => setChecks(prev => ({ ...prev, [c.id]: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
            <span style={{ fontSize: 14 }}>{c.label}</span>
          </label>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: "var(--surface)", border: `2px solid ${verdict.color}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: verdict.color }}>{verdict.label}</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{score}/7 criteria met</span>
        </div>
        <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: "var(--border)", overflow: "hidden" }}>
          <div style={{ width: `${(score / 7) * 100}%`, height: "100%", background: verdict.color, transition: "width 0.4s" }} />
        </div>
      </div>
    </Interactive>
  );
}

function DataDistortionSim() {
  const [truncate, setTruncate] = useState(true);
  const before = 130;
  const after = 127;
  const yMin = truncate ? 124 : 0;
  const yMax = truncate ? 133 : 140;
  const svgH = 180;
  const svgW = 320;
  const padL = 48, padR = 20, padT = 20, padB = 36;
  const plotH = svgH - padT - padB;
  const plotW = svgW - padL - padR;
  const toY = v => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
  const barW = plotW / 4;
  const barX1 = padL + plotW * 0.2;
  const barX2 = padL + plotW * 0.6;
  const bars = [{ x: barX1, v: before, label: "Before" }, { x: barX2, v: after, label: "After" }];
  const ticks = [];
  const step = truncate ? 2 : 20;
  for (let y = yMin; y <= yMax; y += step) ticks.push(y);
  return (
    <Interactive title="Axis Manipulation Simulator" subtitle="Toggle between a truncated y-axis and a full-scale axis. Notice how the same data looks dramatically different.">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <SegToggle
          options={[{ value: "trunc", label: "Truncated axis (misleading)" }, { value: "full", label: "Full scale (honest)" }]}
          value={truncate ? "trunc" : "full"}
          onChange={v => setTruncate(v === "trunc")}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ maxWidth: svgW }}>
          <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--ink)" strokeWidth="1.5" />
          <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="var(--ink)" strokeWidth="1.5" />
          {ticks.map(t => (
            <g key={t}>
              <line x1={padL - 4} y1={toY(t)} x2={padL} y2={toY(t)} stroke="var(--ink)" strokeWidth="1" />
              <text x={padL - 6} y={toY(t) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{t}</text>
            </g>
          ))}
          {bars.map(b => {
            const barY = toY(b.v);
            const baseY = toY(yMin);
            return (
              <g key={b.label}>
                <rect x={b.x} y={barY} width={barW} height={baseY - barY} fill="var(--accent)" rx="4" opacity="0.85" />
                <text x={b.x + barW / 2} y={baseY + 14} textAnchor="middle" fontSize="11" fill="var(--ink)">{b.label}</text>
                <text x={b.x + barW / 2} y={barY - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{b.v}</text>
              </g>
            );
          })}
          <text x={padL - 36} y={(padT + padT + plotH) / 2} textAnchor="middle" fontSize="10" fill="var(--muted)" transform={`rotate(-90, ${padL - 36}, ${(padT + padT + plotH) / 2})`}>Blood pressure (mmHg)</text>
          <text x={padL + plotW / 2} y={svgH - 2} textAnchor="middle" fontSize="10" fill="var(--muted)">Treatment group</text>
        </svg>
      </div>
      <p className="muted" style={{ marginBottom: 0, textAlign: "center" }}>
        {truncate
          ? "Truncated axis (starts at 124): the 3 mmHg difference looks enormous."
          : "Full scale (starts at 0): the same 3 mmHg difference is barely visible out of 140 mmHg total."}
      </p>
    </Interactive>
  );
}

function Section2({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">8.2 Pseudoscience</div>
        <h1>Science versus pseudoscience</h1>
        <p className="lead">Pseudoscience wears the costume of science but dodges the one thing that makes science reliable: the willingness to be proved wrong.</p>
      </div>

      <Figure src="img/pseudoscience.png" caption="Sound evidence versus cherry-picked, misleading data." />
      <DotPoint id="8.2.1" title="Distinguishing science from pseudoscience" progress={progress} setProgress={setProgress}>
        <p>Science is a method for generating reliable knowledge through observation, hypothesis testing, peer review, and replication. <Term def="Claims, practices, or systems that appear scientific but lack the key features of reliable science, especially falsifiability.">Pseudoscience</Term> presents the surface features of science without following scientific methods.</p>
        <p>The philosopher Karl Popper identified <Term def="The property of a claim that means it can, in principle, be shown to be false by a specific experiment or observation.">falsifiability</Term> as the central criterion: a scientific claim makes predictions that could be shown to be false. Pseudoscientific claims are typically structured so that no possible evidence could ever refute them. Negative results are explained away by inventing special exceptions.</p>
        <Callout kind="warn" title="Pseudoscience causes real harm">People who rely on pseudoscientific remedies instead of evidence-based medicine may delay effective treatment. Understanding the difference protects you and those around you.</Callout>
        <PseudoscienceChecker />
        <QGroup title="Check yourself">
          <MCQ num={1} question="A psychic claims they can predict the future 'but only when conditions are right.' What makes this claim pseudoscientific?" options={["It is too old to be scientific", "The qualifier means no failed prediction can count as disproof", "Psychics have never been tested in a controlled setting", "The claim is too specific"]} correct={1} explain="When any failed prediction can be dismissed as 'wrong conditions,' the claim can never be falsified. Without the possibility of refutation, it is not scientific." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.2.2" title="Identifying pseudoscientific claims" progress={progress} setProgress={setProgress}>
        <p>Pseudoscientific claims appear in health, wellness, alternative medicine, and paranormal areas. Common warning signs include: undefined jargon such as "quantum healing" or "detoxifying"; anecdotal testimonials as primary evidence; appeals to ancient wisdom; financial interest in the claim; and conspiracy theories to explain why mainstream science does not support it.</p>
        <p>The <Term def="The tendency to accept vague, general statements as personally accurate descriptions of oneself (also called the Forer effect).">Barnum effect</Term> explains why horoscopes and personality readings seem accurate: they use deliberately vague language that almost anyone can identify with. This is not evidence of validity.</p>
        <Callout kind="fact" title="Vaccine safety: the evidence">Over 1.2 million child studies confirm vaccines do not cause autism. The original 1998 Wakefield study was found to be fraudulent, retracted, and the author lost his medical licence in 2010.</Callout>
        <Interactive title="Pseudoscience Spotters: Claim Cards" subtitle="Decide whether each claim is scientific or pseudoscientific.">
          <MatchBuckets
            items={[
              { id: "c1", label: "Homeopathy: no effect in multiple large meta-analyses", bucket: "pseudo" },
              { id: "c2", label: "Vaccine efficacy: tested in double-blind randomised trials", bucket: "sci" },
              { id: "c3", label: "Crystals have healing energy (undefined 'energy')", bucket: "pseudo" },
              { id: "c4", label: "Antibiotic treatment cures H. pylori ulcers (Nobel Prize 2005)", bucket: "sci" },
              { id: "c5", label: "Power bracelets improve athletic performance (blinded trials show no effect)", bucket: "pseudo" },
            ]}
            buckets={[{ id: "sci", label: "Scientific" }, { id: "pseudo", label: "Pseudoscientific" }]}
          />
        </Interactive>
        <QGroup title="Check yourself">
          <WrittenQ num={2} question="Explain why 'it worked for me' is not sufficient evidence that a treatment is effective. Give two alternative explanations for why someone might feel better after using a pseudoscientific remedy." model="'It worked for me' is a single uncontrolled observation. Two alternative explanations: (1) Placebo effect: belief in a treatment causes genuine physiological improvement. (2) Natural recovery: the illness would have resolved without any intervention. Regression to the mean is also acceptable." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.2.3" title="Pseudoscience in popular media" progress={progress} setProgress={setProgress}>
        <p>Pseudoscience appears in television advertising, social media wellness influencers, and news articles that misrepresent preliminary research as definitive findings. <Term def="When news articles give equal weight to two 'sides' of an issue even when the vast majority of evidence supports one side.">False balance</Term> in reporting creates the impression of scientific controversy where there is actually strong consensus.</p>
        <p>Social media algorithms reward engagement over accuracy: emotionally arousing misinformation spreads faster than accurate but less dramatic information. A 2018 MIT study found false news spreads six times faster than true news on social media. Being aware of this helps you pause before sharing.</p>
        <Callout kind="tip" title="Lateral reading">Professional fact-checkers use lateral reading: opening new tabs to search for information about a source before reading its content. This is faster and more reliable than reading the source deeply first.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={3} question="A news headline says: 'New study suggests coffee prevents Alzheimer's.' The study had 120 participants over three months and was funded by a coffee industry group. What is the strongest reason to treat this claim with caution?" options={["Coffee is a well-studied substance so the finding is likely wrong", "Industry funding creates a conflict of interest and the sample is too small for this type of research", "The headline uses the word 'suggests' rather than 'proves'", "Three months is an adequate time period for Alzheimer's research"]} correct={1} explain="Industry funding creates financial incentive to produce positive results, and 120 participants over three months is far too small and short to study a disease that develops over decades." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.2.4" title="How data can be distorted" progress={progress} setProgress={setProgress}>
        <p>Data can be manipulated not only by fabrication but by selective analysis and misleading presentation. Key methods include: <Term def="Selecting only the subset of data that supports a desired conclusion while ignoring contradictory data.">cherry-picking</Term>, <Term def="Running many statistical tests until one gives a significant result by chance, then reporting only that test.">p-hacking</Term>, misleading <Term def="Manipulating graph axes, scale, or visual proportions to exaggerate or minimise differences.">axis manipulation</Term>, and misrepresenting relative versus absolute risk.</p>
        <p>A drug that reduces a 5% risk to a 4% risk has a <Term def="The percentage reduction in risk relative to the original risk. Can make small effects sound large.">relative risk reduction</Term> of 20% (sounds impressive) but an <Term def="The actual difference in risk between two groups, in percentage points.">absolute risk reduction</Term> of only 1 percentage point. Both are mathematically correct but create very different impressions.</p>
        <DataDistortionSim />
        <QGroup title="Check yourself">
          <WrittenQ num={4} question="A pharmaceutical company reports their drug reduces heart attack risk by 33%. The actual data shows: heart attacks in the control group occurred in 3 out of 100 patients; in the drug group, in 2 out of 100. Calculate the absolute risk reduction and explain why the 33% figure may be misleading." model="Absolute risk reduction = 3% minus 2% = 1 percentage point. The relative risk reduction = 1/3 x 100 = 33%. Both are correct, but the 33% figure makes the benefit sound much larger than it is. In practice, 100 patients must be treated to prevent one additional heart attack (Number Needed to Treat = 100)." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.2.5" title="Determining if a claim is pseudoscientific" progress={progress} setProgress={setProgress}>
        <p>Applying the seven-criterion checklist (falsifiability, controlled testing, peer review, replication, consistent mechanism, honest evidence handling, expert consensus) systematically is more reliable than gut feeling. Gut feeling is susceptible to <Term def="The tendency to accept information that confirms existing beliefs.">confirmation bias</Term> and other cognitive shortcuts.</p>
        <p>A claim can be uncertain and still be scientific, as long as it makes specific, testable predictions. "We do not yet understand this phenomenon" is different from pseudoscience: ball lightning was reported for centuries before a physical model was developed, but it was consistently observable by independent witnesses and eventually documented experimentally.</p>
        <Callout kind="key" title="Extraordinary claims require extraordinary evidence">The more a claim contradicts established scientific knowledge, the stronger and more rigorous the evidence required before it should be accepted. This is sometimes called Sagan's Razor.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={5} question="A student argues: 'Mainstream science dismissed continental drift in 1912, so dismissing homeopathy today proves nothing.' What is the key flaw in this analogy?" options={["Continental drift was never dismissed by scientists", "Wegener's hypothesis made specific testable predictions that were later confirmed; homeopathy has been tested in thousands of controlled trials and consistently shows no effect beyond placebo", "Homeopathy is more ancient than continental drift theory", "Scientists always dismiss new ideas initially"]} correct={1} explain="Wegener made specific, testable predictions (matching geological features, fossils) that were confirmed by later evidence. Homeopathy has been tested extensively under controlled conditions and consistently fails. The situations are not comparable." />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ================================================================
   SECTION 8.3 -- Large Datasets and Scientific Argumentation
   INTERACTIVES:
     - ScatterPlotLab: interactive scatter plot with draggable line of best fit and live r estimate
     - CorrelationCausationSorter: sort scenarios by correlation type
     - DescriptiveStatsCalculator: editable dataset with live mean/median/range
   ================================================================ */

function DescriptiveStatsCalc() {
  const defaultValues = "72 68 75 80 71 69 73 74 70 95";
  const [raw, setRaw] = useState(defaultValues);
  const nums = useMemo(() => {
    return raw.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0 && n < 200);
  }, [raw]);
  const sorted = useMemo(() => [...nums].sort((a, b) => a - b), [nums]);
  const mean = nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length) : null;
  const median = nums.length ? (nums.length % 2 === 0 ? (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2 : sorted[Math.floor(nums.length / 2)]) : null;
  const min = nums.length ? sorted[0] : null;
  const max = nums.length ? sorted[sorted.length - 1] : null;
  const range = nums.length ? max - min : null;
  const variance = nums.length > 1 ? nums.reduce((s, x) => s + (x - mean) ** 2, 0) / (nums.length - 1) : null;
  const sd = variance ? Math.sqrt(variance) : null;

  const svgW = 320, svgH = 80, pad = 20;
  const plotW = svgW - 2 * pad;
  const toX = v => pad + ((v - (min || 0)) / ((max - min) || 1)) * plotW;

  return (
    <Interactive title="Descriptive Statistics Calculator" subtitle="Type your own numbers (space or comma separated) to see mean, median, range, and standard deviation update live. The dot plot shows the distribution.">
      <textarea
        value={raw}
        onChange={e => setRaw(e.target.value)}
        rows={2}
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid var(--border)", fontSize: 14, resize: "none", background: "var(--surface)", fontFamily: "monospace" }}
        placeholder="Enter numbers separated by spaces..."
      />
      <p className="muted" style={{ fontSize: 12, margin: "4px 0 12px" }}>n = {nums.length} values loaded</p>
      {nums.length >= 2 && (
        <>
          <div className="stat-readout">
            <Stat value={mean !== null ? mean.toFixed(1) : "--"} label="Mean" />
            <Stat value={median !== null ? median.toFixed(1) : "--"} label="Median" />
            <Stat value={range !== null ? range.toFixed(0) : "--"} label="Range" />
            <Stat value={sd !== null ? sd.toFixed(1) : "--"} label="Std Dev" />
          </div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ marginTop: 12 }}>
            <line x1={pad} y1={svgH / 2} x2={svgW - pad} y2={svgH / 2} stroke="var(--border)" strokeWidth="2" />
            {nums.map((v, i) => (
              <circle key={i} cx={toX(v)} cy={svgH / 2} r="5" fill="var(--accent)" opacity="0.7" />
            ))}
            {mean !== null && (
              <line x1={toX(mean)} y1={padT} x2={toX(mean)} y2={svgH - 10} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3">
                <title>Mean</title>
              </line>
            )}
            {median !== null && (
              <line x1={toX(median)} y1={10} x2={toX(median)} y2={svgH - 10} stroke="#14b8a6" strokeWidth="2" strokeDasharray="4,3">
                <title>Median</title>
              </line>
            )}
            <text x={toX(min)} y={svgH - 2} textAnchor="middle" fontSize="10" fill="var(--muted)">{min}</text>
            <text x={toX(max)} y={svgH - 2} textAnchor="middle" fontSize="10" fill="var(--muted)">{max}</text>
            <text x={toX(mean)} y={12} textAnchor="middle" fontSize="9" fill="#f59e0b">Mean</text>
            <text x={toX(median)} y={22} textAnchor="middle" fontSize="9" fill="#14b8a6">Median</text>
          </svg>
        </>
      )}
    </Interactive>
  );
}

// Compute Pearson r for two arrays
function pearsonR(xs, ys) {
  if (xs.length < 2) return 0;
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
  const den = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0) * ys.reduce((s, y) => s + (y - my) ** 2, 0));
  return den === 0 ? 0 : num / den;
}

function ScatterPlotLab() {
  const datasets = {
    temp_elec: {
      label: "Temperature vs Electricity demand",
      xLabel: "Avg daily temp (degrees C)",
      yLabel: "Electricity demand (GWh)",
      points: [
        [12, 3.1], [15, 2.9], [18, 2.8], [22, 3.2], [26, 3.8], [30, 4.6],
        [33, 5.1], [35, 5.5], [28, 4.1], [20, 3.0], [24, 3.5], [16, 2.8],
        [38, 6.0], [14, 3.0], [31, 4.9]
      ]
    },
    sleep_fatigue: {
      label: "Sleep hours vs Fatigue score",
      xLabel: "Sleep (hours)",
      yLabel: "Fatigue score (1-10)",
      points: [
        [5, 8], [6, 7], [7, 5], [8, 4], [9, 3], [5.5, 7.5], [6.5, 6],
        [7.5, 4.5], [8.5, 3.5], [10, 2], [4.5, 9], [6, 6.5], [8, 4],
        [7, 5.5], [9.5, 2.5]
      ]
    },
    random: {
      label: "Shoe size vs Maths score (no real link)",
      xLabel: "Shoe size",
      yLabel: "Maths score (%)",
      points: [
        [7, 55], [8, 72], [9, 48], [10, 81], [11, 63], [7.5, 44], [9.5, 78],
        [8.5, 69], [10.5, 52], [12, 88], [6, 61], [11.5, 47], [8, 75],
        [9, 67], [10, 58]
      ]
    }
  };

  const [dsKey, setDsKey] = useState("temp_elec");
  const ds = datasets[dsKey];

  const svgW = 380, svgH = 280;
  const padL = 52, padR = 20, padT = 20, padB = 44;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const xs = ds.points.map(p => p[0]);
  const ys = ds.points.map(p => p[1]);
  const xMin = Math.min(...xs) - 1;
  const xMax = Math.max(...xs) + 1;
  const yMin = Math.min(...ys) - 1;
  const yMax = Math.max(...ys) + 1;

  const toSvgX = x => padL + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSvgY = y => padT + (1 - (y - yMin) / (yMax - yMin)) * plotH;

  const r = useMemo(() => pearsonR(xs, ys), [dsKey]);

  // Line of best fit via least squares
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const my = ys.reduce((a, b) => a + b, 0) / ys.length;
  const slope = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  const intercept = my - slope * mx;

  const lineX1 = xMin, lineY1 = slope * lineX1 + intercept;
  const lineX2 = xMax, lineY2 = slope * lineX2 + intercept;

  const rStrength = Math.abs(r) > 0.7 ? "strong" : Math.abs(r) > 0.4 ? "moderate" : "weak";
  const rDirection = r > 0.05 ? "positive" : r < -0.05 ? "negative" : "no";
  const rColour = Math.abs(r) > 0.7 ? "#14b8a6" : Math.abs(r) > 0.4 ? "#f59e0b" : "#94a3b8";

  return (
    <Interactive title="Scatter Plot Explorer" subtitle="Switch between datasets to see how correlation strength and direction change. The line of best fit is calculated automatically.">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {Object.entries(datasets).map(([k, d]) => (
          <button key={k} className={`btn ${dsKey === k ? "btn-accent" : "btn-ghost"}`} onClick={() => setDsKey(k)} style={{ fontSize: 13 }}>
            {d.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ maxWidth: svgW }}>
          <rect x={padL} y={padT} width={plotW} height={plotH} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
          {[0, 0.25, 0.5, 0.75, 1].map(t => {
            const xv = xMin + t * (xMax - xMin);
            const yv = yMin + t * (yMax - yMin);
            return (
              <g key={t}>
                <line x1={toSvgX(xv)} y1={padT} x2={toSvgX(xv)} y2={padT + plotH} stroke="var(--border)" strokeWidth="0.5" />
                <text x={toSvgX(xv)} y={padT + plotH + 14} textAnchor="middle" fontSize="10" fill="var(--muted)">{xv.toFixed(1)}</text>
                <line x1={padL} y1={toSvgY(yv)} x2={padL + plotW} y2={toSvgY(yv)} stroke="var(--border)" strokeWidth="0.5" />
                <text x={padL - 4} y={toSvgY(yv) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{yv.toFixed(1)}</text>
              </g>
            );
          })}
          <line
            x1={toSvgX(lineX1)} y1={toSvgY(Math.max(yMin, Math.min(yMax, lineY1)))}
            x2={toSvgX(lineX2)} y2={toSvgY(Math.max(yMin, Math.min(yMax, lineY2)))}
            stroke={rColour} strokeWidth="2.5" strokeDasharray="6,3"
          />
          {ds.points.map((p, i) => (
            <circle key={i} cx={toSvgX(p[0])} cy={toSvgY(p[1])} r="5" fill="var(--accent)" stroke="white" strokeWidth="1.5" opacity="0.85" />
          ))}
          <text x={padL + plotW / 2} y={svgH - 4} textAnchor="middle" fontSize="11" fill="var(--muted)">{ds.xLabel}</text>
          <text x={14} y={padT + plotH / 2} textAnchor="middle" fontSize="11" fill="var(--muted)" transform={`rotate(-90, 14, ${padT + plotH / 2})`}>{ds.yLabel}</text>
        </svg>
      </div>
      <div className="stat-readout" style={{ marginTop: 12 }}>
        <Stat value={r.toFixed(2)} label="Correlation (r)" />
        <Stat value={rStrength} label="Strength" />
        <Stat value={rDirection} label="Direction" />
      </div>
      <p className="muted" style={{ marginBottom: 0, textAlign: "center", marginTop: 8 }}>
        r = {r.toFixed(2)} indicates a {rStrength} {rDirection} {rDirection !== "no" ? "linear relationship" : "correlation"} between the two variables.
      </p>
    </Interactive>
  );
}

function CorrelationCausationSorter() {
  return (
    <Interactive title="Correlation or Causation?" subtitle="Sort each scenario into the correct category based on whether the relationship is likely causal, a confound, reverse causation, or spurious.">
      <MatchBuckets
        items={[
          { id: "s1", label: "Ice cream sales and drowning deaths both rise in summer", bucket: "confound" },
          { id: "s2", label: "Smoking causes lung cancer (confirmed by RCTs and mechanism)", bucket: "causal" },
          { id: "s3", label: "Countries with more doctors have higher death rates", bucket: "reverse" },
          { id: "s4", label: "Nicolas Cage films per year correlated with pool drownings 1999-2009", bucket: "spurious" },
          { id: "s5", label: "Shoe size and reading ability in children (both increase with age)", bucket: "confound" },
          { id: "s6", label: "Vaccine dose and antibody level (dose-response confirmed)", bucket: "causal" },
        ]}
        buckets={[
          { id: "causal", label: "Causal" },
          { id: "confound", label: "Confounding variable" },
          { id: "reverse", label: "Reverse causation" },
          { id: "spurious", label: "Spurious" },
        ]}
      />
    </Interactive>
  );
}

function AustralianRainfallSVG() {
  const cities = [
    { name: "Darwin", mm: 1727 }, { name: "Brisbane", mm: 1153 },
    { name: "Sydney", mm: 1215 }, { name: "Melbourne", mm: 648 },
    { name: "Hobart", mm: 626 }, { name: "Perth", mm: 869 },
  ];
  const maxMm = 1800;
  const svgW = 400, svgH = 200, padL = 60, padR = 16, padT = 20, padB = 40;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const barW = (plotW / cities.length) * 0.6;
  return (
    <Figure caption="Mean annual rainfall for selected Australian cities. Darwin receives almost three times as much rain as Hobart. Data sourced from Bureau of Meteorology averages.">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ maxWidth: svgW }}>
        {[0, 500, 1000, 1500].map(v => {
          const y = padT + plotH - (v / maxMm) * plotH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="var(--border)" strokeWidth="0.7" />
              <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="var(--muted)">{v}</text>
            </g>
          );
        })}
        {cities.map((c, i) => {
          const x = padL + (i + 0.5) * (plotW / cities.length) - barW / 2;
          const h = (c.mm / maxMm) * plotH;
          const y = padT + plotH - h;
          return (
            <g key={c.name}>
              <rect x={x} y={y} width={barW} height={h} fill="var(--accent)" rx="3" opacity="0.85" />
              <text x={x + barW / 2} y={padT + plotH + 14} textAnchor="middle" fontSize="9" fill="var(--ink)">{c.name}</text>
              <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)">{c.mm}</text>
            </g>
          );
        })}
        <text x={padL - 44} y={padT + plotH / 2} textAnchor="middle" fontSize="9" fill="var(--muted)" transform={`rotate(-90, ${padL - 44}, ${padT + plotH / 2})`}>Rainfall (mm/yr)</text>
      </svg>
    </Figure>
  );
}

const padT = 20;

function Section3({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">8.3 Large Datasets and Scientific Argumentation</div>
        <h1>Making sense of big data</h1>
        <p className="lead">A single measurement tells you almost nothing. A million measurements, properly analysed, can reveal trends that reshape our understanding of the world.</p>
      </div>

      <Figure src="img/correlation.png" caption="Two variables rising together — but does one cause the other?" />
      <DotPoint id="8.3.1" title="Features, collection, and uses of large datasets" progress={progress} setProgress={setProgress}>
        <p>A <Term def="A collection of data containing many records and often many variables, generated from systematic measurement, observation, or recording over time or across a population.">large dataset</Term> is characterised by volume (many records), variety (multiple variable types: numerical, categorical, geographic, temporal), and sometimes velocity (continuous real-time updating). Digital technology transformed data collection: sensors, satellites, and electronic records now generate billions of observations where humans once collected thousands.</p>
        <p>In Australia, the <Term def="Australia's national statistical agency, which conducts the Census and produces economic and social data.">Australian Bureau of Statistics (ABS)</Term>, the Bureau of Meteorology (BOM), and the Australian Institute of Health and Welfare (AIHW) maintain publicly available large datasets used by scientists, policymakers, and the public.</p>
        <AustralianRainfallSVG />
        <Callout kind="fact" title="BOM has over 100 years of climate data">The Bureau of Meteorology maintains records from hundreds of weather stations across Australia going back to the 1800s. This allows scientists to detect long-term trends in temperature and rainfall that would be invisible in any short study.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={1} question="What is 'data cleaning' in the context of large datasets?" options={["Deleting all data that contradicts your hypothesis", "Identifying and correcting or removing errors such as missing values, impossible values, or duplicate records", "Converting data from one unit to another", "Reducing the dataset size to make it easier to work with"]} correct={1} explain="Data cleaning ensures that errors in the raw data do not distort statistical results. It includes removing impossible values, fixing formatting inconsistencies, and handling missing data." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.3.2" title="Using large datasets to develop and test a question" progress={progress} setProgress={setProgress}>
        <p>In data science, scientists often explore what a publicly available dataset contains before deciding what question it can answer. This requires committing to the question before running the analysis: choosing the question after seeing which one "works" is a form of <Term def="Running many analyses and reporting only the one that produces a significant result.">p-hacking</Term> that inflates false positives.</p>
        <p>The process involves: examining the dataset's variables; identifying a comparison that could be investigated; forming a question with a clear <Term def="The variable that is changed or compared between groups.">independent variable</Term> and <Term def="The variable that is measured as the outcome.">dependent variable</Term>; and then testing it using descriptive statistics, graphs, or correlations.</p>
        <Callout kind="tip" title="Temperature anomaly">A temperature anomaly is the difference between the measured temperature for a period and the long-term average for the same period (usually the 1961 to 1990 baseline). A positive anomaly means it was warmer than average.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={2} question="A student has access to ABS data with columns for 'state' and 'Year 12 completion rate (%)' from 2000 to 2022. Write two specific, investigable questions they could ask using these variables." model="(1) Has the mean Year 12 completion rate across all states increased between 2000 and 2022? (Independent: year; dependent: completion rate.) (2) Is there a difference in Year 12 completion rates between states in 2022? (Independent: state; dependent: completion rate.)" />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.3.3" title="Descriptive analysis of a large dataset" progress={progress} setProgress={setProgress}>
        <p><Term def="The process of summarising and describing the main features of a dataset using measures of central tendency, spread, and visualisation.">Descriptive analysis</Term> is always the first step before any statistical inference. It uses measures of <Term def="Measures that describe a typical value: mean, median, and mode.">central tendency</Term> (mean, median, mode) and measures of <Term def="Measures that describe how spread out values are: range, interquartile range, standard deviation.">spread</Term> (range, standard deviation) to summarise the data.</p>
        <p>Mean household income in Australia is higher than <Term def="The middle value when all values are ordered from smallest to largest.">median</Term> household income because a small number of very high incomes pull the mean upward. In such cases, the median better represents the typical household's experience.</p>
        <DescriptiveStatsCalc />
        <QGroup title="Check yourself">
          <MCQ num={3} question="A dataset has a mean of 50 and a standard deviation of 20. Another dataset has a mean of 50 and a standard deviation of 2. What can you conclude?" options={["The first dataset is more reliable", "Both datasets have identical distributions", "The first dataset has values spread much more widely around the mean than the second", "The second dataset has more outliers"]} correct={2} explain="Standard deviation measures how spread out values are around the mean. A SD of 20 means values are widely scattered; a SD of 2 means values are clustered tightly around the mean, even though both means are identical." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.3.4" title="Benefits of descriptive statistical analysis" progress={progress} setProgress={setProgress}>
        <p>Raw data rarely communicates clearly. Descriptive statistics transform raw data into summaries that make patterns visible, communicable, and comparable. The key benefits are: identifying central tendency, identifying variability, spotting outliers, comparing groups or time periods, and communicating to a non-specialist audience through visualisations.</p>
        <p>Graphs are among the most powerful tools for pattern recognition. A line graph of temperature over 100 years shows a warming trend that no table of numbers would reveal intuitively. A bar chart comparing mean rainfall across cities makes differences obvious at a glance. However, graphs can also mislead (see descriptor 8.2.4), so reading them critically is equally important.</p>
        <Callout kind="key" title="Outliers matter">An outlier is a data point far from the main cluster. It may be a genuine extreme event (important scientifically), a measurement error (which should be corrected), or a data entry mistake. Always identify outliers before calculating means.</Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={4} question="A researcher calculates that the mean income in a town is $85,000 per year. Another researcher visits and finds most people earn between $45,000 and $60,000. Explain using descriptive statistics why both could be correct, and what additional statistic would reveal the full picture." model="Both are correct if income is highly skewed. A few very high earners could pull the mean far above where most people earn. The median income would better represent the typical resident and would likely be in the $45,000 to $60,000 range. A standard deviation or income distribution histogram would reveal the extent of skew." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.3.5" title="Univariate and bivariate analysis" progress={progress} setProgress={setProgress}>
        <p><Term def="Analysis that examines one variable at a time to describe its distribution, central tendency, and spread.">Univariate analysis</Term> answers "what does this variable look like?" using means, ranges, and histograms. <Term def="Analysis that examines the relationship between two variables simultaneously.">Bivariate analysis</Term> asks "how does one variable change as the other changes?" using scatter plots and the <Term def="A number between -1 and +1 that measures the strength and direction of a linear relationship between two variables.">correlation coefficient (r)</Term>.</p>
        <p>r ranges from -1 to +1. A value near +1 indicates a strong positive correlation; near -1, a strong negative correlation; near 0, no linear relationship. Importantly, correlation does not establish causation (covered in 8.3.6). The <Term def="The straight line that best summarises the overall direction and slope of a scatter plot relationship.">line of best fit</Term> is placed on a scatter plot to show the trend and allow predictions.</p>
        <ScatterPlotLab />
        <QGroup title="Check yourself">
          <MCQ num={5} question="Four studies report these correlation coefficients: r = -0.12, r = +0.67, r = -0.88, r = +0.34. Which shows the strongest relationship?" options={["r = +0.67", "r = -0.12", "r = -0.88", "r = +0.34"]} correct={2} explain="The strength of a correlation is determined by the absolute value (distance from zero), not the direction. |-0.88| = 0.88 is closest to 1, indicating the strongest relationship." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.3.6" title="Correlation versus causation" progress={progress} setProgress={setProgress}>
        <p>Two variables are <Term def="When changes in one variable are statistically associated with changes in another, but one does not necessarily cause the other.">correlated</Term> when changes in one are associated with changes in the other. A <Term def="When changes in one variable directly and reliably produce changes in the other.">causal</Term> relationship exists when one variable directly produces changes in the other. Correlation does not imply causation: three situations can produce correlation without it.</p>
        <p>First, a <Term def="A third variable that influences both measured variables, creating an apparent correlation between them (also called a lurking variable).">confounding variable</Term> causes both to change together (hot weather causes both ice cream sales and drowning deaths). Second, the direction of causality may be reversed (poor health causes hospitalisation, not the reverse). Third, the correlation may be purely coincidental: Nicolas Cage film appearances per year correlated with swimming pool drowning deaths from 1999 to 2009 with no causal mechanism whatsoever.</p>
        <CorrelationCausationSorter />
        <QGroup title="Check yourself">
          <WrittenQ num={6} question="A study finds that people who drink more coffee have lower rates of depression. Explain why the conclusion 'drinking coffee prevents depression' is flawed. Give two alternative explanations." model="The conclusion is flawed because the study is observational and cannot establish causation. Two alternatives: (1) Reverse causation: depressed people may drink less coffee due to reduced motivation. (2) Confounding: coffee drinkers may have more social interactions in cafes, or higher employment rates, which reduce depression independently of coffee itself." />
        </QGroup>
      </DotPoint>

      <DotPoint id="8.3.7" title="Large datasets and validation of scientific findings" progress={progress} setProgress={setProgress}>
        <p>A single experiment with a small sample can produce a misleading result due to chance. Large datasets enable scientists to test whether a pattern holds across thousands or millions of observations. The link between smoking and lung cancer required large epidemiological datasets tracking hundreds of thousands of people over decades before the statistical strength and consistency across populations established the scientific consensus.</p>
        <p><Term def="The range within which the true population value is likely to fall, given the sample data, at a specified level of confidence.">Confidence intervals</Term> express uncertainty: a wider interval reflects more uncertainty (usually from a smaller sample). <Term def="The probability of observing a result at least as extreme as the one found, if the null hypothesis were true.">P-values</Term> are frequently misinterpreted: p less than 0.05 does not mean there is a 95% chance the hypothesis is true. With very large datasets, even tiny and practically irrelevant differences produce p less than 0.05. This is why <Term def="The magnitude of a difference or relationship, showing how large it is in practice rather than just whether it exists.">effect size</Term> must always accompany statistical significance.</p>
        <Callout kind="warn" title="Statistically significant does not mean practically important">A drug that lowers blood pressure by 0.3 mmHg with p less than 0.001 (from a trial of 100,000 patients) is a real effect, but is clinically meaningless. Always ask: how large is the effect, not just whether it is detectable.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={7} question="A clinical trial of 20 patients finds a drug reduces blood pressure by a mean of 8 mmHg (95% CI: 1 to 15 mmHg). A second trial of 2,000 patients finds a mean reduction of 2 mmHg (95% CI: 1.5 to 2.5 mmHg). Which result is more useful for clinical decision-making, and why?" options={["The first: the mean reduction of 8 mmHg is larger and more impressive", "The second: the large sample size means the narrow confidence interval precisely characterises the true effect, revealing it is likely too small to be clinically meaningful", "Both are equally useful because both show a reduction", "Neither: you need p-values to decide"]} correct={1} explain="The second trial's large sample size produces a very narrow confidence interval (1.5 to 2.5 mmHg), meaning the true effect is precisely estimated. A 2 mmHg reduction is clinically small; standard medications reduce pressure by 10 to 15 mmHg. The first trial's wide CI (1 to 15 mmHg) means the true effect is highly uncertain despite the impressive mean." />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ================================================================
   SECTION 8.4 -- Data Science 2 in Context
   INTERACTIVES:
     - EvidenceDecisionTool: step-through evidence-based decision framework
     - PredictionTool: linear extrapolation from a trend model
   ================================================================ */

function PredictionTool() {
  const baseData = [
    { year: 1910, anomaly: -0.4 },
    { year: 1930, anomaly: -0.1 },
    { year: 1950, anomaly: 0.0 },
    { year: 1970, anomaly: 0.1 },
    { year: 1990, anomaly: 0.3 },
    { year: 2010, anomaly: 0.7 },
    { year: 2023, anomaly: 1.1 },
  ];
  const [predictYear, setPredictYear] = useState(2040);

  const xs = baseData.map(d => d.year);
  const ys = baseData.map(d => d.anomaly);
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const my = ys.reduce((a, b) => a + b, 0) / ys.length;
  const slope = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  const intercept = my - slope * mx;
  const predicted = slope * predictYear + intercept;

  const svgW = 380, svgH = 220;
  const pL = 52, pR = 20, pT = 20, pB = 40;
  const plotW = svgW - pL - pR;
  const plotH = svgH - pT - pB;
  const xMin = 1900, xMax = 2080;
  const yMin = -0.8, yMax = 2.0;
  const toX = x => pL + ((x - xMin) / (xMax - xMin)) * plotW;
  const toY = y => pT + (1 - (y - yMin) / (yMax - yMin)) * plotH;

  const lineXs = [1900, 2080];
  const lineYs = lineXs.map(x => slope * x + intercept);

  return (
    <Interactive title="Climate Prediction Tool" subtitle="This tool fits a linear trend to Australian temperature anomaly data and lets you extrapolate to any year. Use it to explore the model's prediction, and to think about what limitations extrapolation has.">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ maxWidth: svgW }}>
          <rect x={pL} y={pT} width={plotW} height={plotH} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
          {[1920, 1940, 1960, 1980, 2000, 2020, 2040, 2060].map(yr => (
            <g key={yr}>
              <line x1={toX(yr)} y1={pT} x2={toX(yr)} y2={pT + plotH} stroke="var(--border)" strokeWidth="0.5" />
              <text x={toX(yr)} y={pT + plotH + 13} textAnchor="middle" fontSize="9" fill="var(--muted)">{yr}</text>
            </g>
          ))}
          {[-0.5, 0, 0.5, 1.0, 1.5].map(v => (
            <g key={v}>
              <line x1={pL} y1={toY(v)} x2={pL + plotW} y2={toY(v)} stroke="var(--border)" strokeWidth="0.5" />
              <text x={pL - 4} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="var(--muted)">{v.toFixed(1)}</text>
            </g>
          ))}
          <line x1={toX(lineXs[0])} y1={toY(lineYs[0])} x2={toX(lineXs[1])} y2={toY(lineYs[1])} stroke="#f59e0b" strokeWidth="2" strokeDasharray="7,4" />
          {predictYear > 2025 && (
            <g>
              <line x1={toX(predictYear)} y1={pT} x2={toX(predictYear)} y2={toY(predicted)} stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4,3" />
              <line x1={pL} y1={toY(predicted)} x2={toX(predictYear)} y2={toY(predicted)} stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4,3" />
              <circle cx={toX(predictYear)} cy={toY(predicted)} r="7" fill="#14b8a6" opacity="0.9" />
              <text x={toX(predictYear) + 10} y={toY(predicted) + 4} fontSize="11" fontWeight="700" fill="#14b8a6">{predicted.toFixed(2)} C</text>
            </g>
          )}
          {baseData.map((d, i) => (
            <circle key={i} cx={toX(d.year)} cy={toY(d.anomaly)} r="5" fill="var(--accent)" stroke="white" strokeWidth="1.5" opacity="0.9" />
          ))}
          <line x1={toX(2023)} y1={pT + 2} x2={toX(2023)} y2={pT + plotH} stroke="#e74c3c" strokeWidth="1" strokeDasharray="3,3" />
          <text x={toX(2023) + 4} y={pT + 14} fontSize="9" fill="#e74c3c">2023</text>
          <text x={pL - 40} y={pT + plotH / 2} textAnchor="middle" fontSize="9" fill="var(--muted)" transform={`rotate(-90, ${pL - 40}, ${pT + plotH / 2})`}>Temp anomaly (deg C)</text>
          <text x={pL + plotW / 2} y={svgH - 2} textAnchor="middle" fontSize="9" fill="var(--muted)">Year</text>
        </svg>
      </div>
      <div style={{ marginTop: 12 }}>
        <Slider label="Predict year" min={2024} max={2080} step={1} value={predictYear} onChange={setPredictYear} unit="" />
        <div className="stat-readout" style={{ marginTop: 8 }}>
          <Stat value={predictYear} label="Prediction year" />
          <Stat value={predicted.toFixed(2) + " C"} label="Model prediction" />
        </div>
      </div>
      <Callout kind="warn" title="Extrapolation has real limits">This is a simple linear model. Real climate modelling uses far more complex physics-based simulations, not just trend lines. A straight-line extrapolation works reasonably over short ranges, but becomes less reliable further from the data. Always state the assumptions and limitations of your model.</Callout>
    </Interactive>
  );
}

function EvidenceDecisionSim() {
  const steps = [
    {
      num: 1,
      label: "Define the issue",
      content: "A local council asks: 'Should we reduce traffic on School Street to improve air quality for students and residents?'",
      action: "Write a specific, bounded question. Identify what decision you need the data to inform."
    },
    {
      num: 2,
      label: "Gather data",
      content: "EPA monitoring data shows mean PM2.5 on School Street = 28 micrograms per cubic metre. WHO guideline = 15 micrograms per cubic metre. The alternative route currently reads 12 micrograms per cubic metre.",
      action: "Check your data source for authority, accuracy, currency, and purpose."
    },
    {
      num: 3,
      label: "Analyse data",
      content: "School Street PM2.5 is 87% above the WHO guideline. Three schools and two aged care facilities are on the street. Peak readings occur between 8 am and 9 am, matching school drop-off.",
      action: "Calculate means, identify outliers, and visualise the data. Compare to relevant benchmarks."
    },
    {
      num: 4,
      label: "Evaluate evidence",
      content: "The data support the claim that air quality on School Street poses a health risk to vulnerable populations. The evidence is from a credible government source and the pattern is clear.",
      action: "Use the CER framework. Does the data support the recommended decision?"
    },
    {
      num: 5,
      label: "Assess implications",
      content: "Diverting traffic may increase PM2.5 on the alternative route above safe levels. Local businesses on School Street may lose customers. Cyclists and pedestrians would benefit. Monitoring both streets after the change would be needed.",
      action: "Who benefits? Who may be disadvantaged? What unintended consequences could arise? What monitoring is needed?"
    },
  ];
  const [step, setStep] = useState(0);
  const s = steps[step];
  return (
    <Interactive title="Evidence-Based Decision Framework" subtitle="Step through the five stages of evidence-based decision making using an air quality example.">
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {steps.map((st, i) => (
          <button key={i} className={`btn ${step === i ? "btn-accent" : "btn-ghost"}`} onClick={() => setStep(i)} style={{ fontSize: 13 }}>
            {st.num}. {st.label}
          </button>
        ))}
      </div>
      <div style={{ background: "var(--accent-soft)", borderRadius: 12, padding: "14px 16px", border: "1.5px solid var(--accent)" }}>
        <p style={{ fontWeight: 700, marginBottom: 6 }}>Step {s.num}: {s.label}</p>
        <p style={{ marginBottom: 10 }}>{s.content}</p>
        <div style={{ background: "var(--surface)", borderRadius: 8, padding: "8px 12px" }}>
          <p className="muted" style={{ marginBottom: 0, fontSize: 13 }}><strong>What to do:</strong> {s.action}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <button className="btn btn-ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Previous</button>
        <button className="btn btn-accent" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>Next step</button>
      </div>
    </Interactive>
  );
}

function Section4({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">8.4 Data Science 2 in Context</div>
        <h1>Data for real decisions</h1>
        <p className="lead">Every data skill you have built comes together here: take a real issue, gather reliable data, analyse it honestly, and make a decision you can defend.</p>
      </div>

      <DotPoint id="8.4.1" title="Using data to make evidence-based decisions" progress={progress} setProgress={setProgress}>
        <p><Term def="Using the best available data and scientific knowledge to guide choices, rather than relying on opinion, tradition, or anecdote.">Evidence-based decision making</Term> applies all data skills together: identifying a clear question, evaluating source reliability, analysing data with appropriate statistical tools, distinguishing correlation from causation, and writing a well-reasoned argument that acknowledges uncertainty.</p>
        <p>Assessing the implications of a data-based decision means thinking beyond the data. A decision may have intended effects and <Term def="An effect of a decision that was not planned or anticipated.">unintended consequences</Term>. It may affect different groups differently: a policy that improves average health outcomes may still leave some communities worse off. A critical data scientist acknowledges what the data show clearly, what remains uncertain, who benefits, who may be disadvantaged, and what further monitoring is needed.</p>
        <EvidenceDecisionSim />
        <PredictionTool />
        <Callout kind="key" title="Data equity">Datasets fairly represent all groups only when all groups are systematically included in data collection. Clinical trials historically enrolled predominantly male participants; drugs approved on this data sometimes had different effects in women. Data equity means checking whose voices are in your dataset and whose are missing.</Callout>
        <QGroup title="Check yourself">
          <MCQ num={1} question="A student analyses data on average daily screen time and Year 10 test scores and finds r = -0.61. They conclude: 'Students should limit screen time to improve their test scores.' What is the main flaw in this conclusion?" options={["r = -0.61 means there is no relationship", "The study has too many participants", "Correlation does not establish causation; confounding variables (such as study time) could explain the relationship", "The student should have used the mean instead of the correlation"]} correct={2} explain="r = -0.61 shows a moderate negative correlation, not causation. Confounders (e.g. less study time in high-screen-time students) could explain the relationship. A controlled study would be needed to support the causal recommendation." />
          <WrittenQ num={2} question="Explain why a data-based recommendation can be justified by evidence and yet still involve a value judgement. Give an example from a public health context." model="Data can show that an intervention reduces disease incidence. However, implementing it also involves values: how much cost is acceptable? Are restrictions on individual freedom justifiable? Data show that mandatory seatbelt laws reduce road fatalities. The policy decision requires both the effectiveness evidence and a values judgement that public safety justifies limiting individual choice." />
          <WrittenQ num={3} question="A council diverts heavy trucks away from a residential street to improve air quality. Identify one intended benefit and two unintended consequences they should monitor after the decision." model="Intended benefit: reduced PM2.5 on the residential street, improving health for residents and school students. Unintended consequences: (1) the alternative route may see increased PM2.5, affecting residents there; (2) local businesses on the original route may lose customers if passing traffic drops. Both routes should be monitored and data reviewed after a set period." />
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ================================================================
   MOUNT
   ================================================================ */

mountTopicApp({
  year: 10,
  topicTitle: "Data Science 2",
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
    "false balance": "When news articles give equal weight to two sides of an issue even when the vast majority of evidence supports one side, creating a false impression of scientific controversy.",
  },
  sections: [
    {
      id: "8.1",
      label: "Investigating Questions",
      accent: "teal",
      points: ["8.1.1", "8.1.2", "8.1.3", "8.1.4", "8.1.5", "8.1.6"],
      blurb: "How to ask sharp, testable questions and construct evidence-based arguments.",
      render: (p) => <Section1 {...p} />
    },
    {
      id: "8.2",
      label: "Pseudoscience",
      accent: "teal",
      points: ["8.2.1", "8.2.2", "8.2.3", "8.2.4", "8.2.5"],
      blurb: "Distinguishing science from pseudoscience and spotting data distortion.",
      render: (p) => <Section2 {...p} />
    },
    {
      id: "8.3",
      label: "Large Datasets",
      accent: "teal",
      points: ["8.3.1", "8.3.2", "8.3.3", "8.3.4", "8.3.5", "8.3.6", "8.3.7"],
      blurb: "Collecting, analysing, and interpreting large datasets. Correlation vs causation.",
      render: (p) => <Section3 {...p} />
    },
    {
      id: "8.4",
      label: "Data in Context",
      accent: "teal",
      points: ["8.4.1"],
      blurb: "Applying data science skills to make evidence-based decisions about real issues.",
      render: (p) => <Section4 {...p} />
    },
  ],
});
