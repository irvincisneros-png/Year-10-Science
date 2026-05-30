/* global React, DotPoint, Callout, Figure, Term, MCQ, WrittenQ, QGroup, Interactive,
   Slider, SegToggle, Stat, Reveal, FlipCard, MatchBuckets, Ring, mountTopicApp */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ============================================================
   SECTION 5.1 INTERACTIVES
   ============================================================ */

function DNABaseBuilder() {
  const PAIRS = { A: "T", T: "A", C: "G", G: "C" };
  const BASE_COLORS = { A: "#f87171", T: "#60a5fa", C: "#a78bfa", G: "#34d399" };
  const NAMES = { A: "Adenine", T: "Thymine", C: "Cytosine", G: "Guanine" };
  const STRAND_LENGTH = 8;

  const [strand, setStrand] = useState(["A","T","G","C","A","G","T","C"]);
  const [highlighted, setHighlighted] = useState(null);

  function setBase(i, b) {
    const next = [...strand];
    next[i] = b;
    setStrand(next);
  }

  const complement = strand.map(b => PAIRS[b]);

  return (
    <Interactive title="DNA Base Pairing Builder" subtitle="Change any base on the top strand and watch the complementary strand update instantly." takeaway="DNA base pairing is complementary and specific: A always pairs with T (2 hydrogen bonds) and C always pairs with G (3 hydrogen bonds), ensuring that each strand is an exact template for the other.">
      <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${STRAND_LENGTH * 62 + 20} 200`} width="100%" style={{ maxWidth: 560, display: "block", margin: "0 auto" }}>
          {/* Backbone lines */}
          <line x1="10" y1="30" x2={STRAND_LENGTH * 62 + 10} y2="30" stroke="var(--accent-deep)" strokeWidth="4" strokeLinecap="round"/>
          <line x1="10" y1="170" x2={STRAND_LENGTH * 62 + 10} y2="170" stroke="var(--accent-deep)" strokeWidth="4" strokeLinecap="round"/>
          {strand.map((base, i) => {
            const x = i * 62 + 40;
            const comp = PAIRS[base];
            const isHigh = highlighted === i;
            return (
              <g key={i} onMouseEnter={() => setHighlighted(i)} onMouseLeave={() => setHighlighted(null)}>
                {/* Top base */}
                <rect x={x - 16} y="10" width="32" height="32" rx="6"
                  fill={BASE_COLORS[base]} stroke={isHigh ? "var(--ink)" : "transparent"} strokeWidth="2"/>
                <text x={x} y="31" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{base}</text>
                {/* Bond lines */}
                <line x1={x} y1="42" x2={x} y2="75" stroke={BASE_COLORS[base]} strokeWidth="2" strokeDasharray="4 3"/>
                <line x1={x} y1="125" x2={x} y2="158" stroke={BASE_COLORS[comp]} strokeWidth="2" strokeDasharray="4 3"/>
                {/* Bond label */}
                <text x={x} y="102" textAnchor="middle" fontSize="9" fill="var(--muted)" fontWeight="600">
                  {(base === "A" || base === "T") ? "A-T" : "C-G"}
                </text>
                <text x={x} y="114" textAnchor="middle" fontSize="8" fill="var(--muted)">
                  {(base === "A" || base === "T") ? "2 bonds" : "3 bonds"}
                </text>
                {/* Bottom base */}
                <rect x={x - 16} y="158" width="32" height="32" rx="6"
                  fill={BASE_COLORS[comp]} stroke={isHigh ? "var(--ink)" : "transparent"} strokeWidth="2"/>
                <text x={x} y="179" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{comp}</text>
              </g>
            );
          })}
          {/* Labels */}
          <text x="8" y="56" fontSize="10" fill="var(--muted)" fontWeight="700" writingMode="tb">5'</text>
          <text x="8" y="148" fontSize="10" fill="var(--muted)" fontWeight="700" writingMode="tb">3'</text>
        </svg>
      </div>
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: 8 }}>
        {strand.map((base, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>Pos {i + 1}</div>
            <SegToggle
              options={["A","T","C","G"]}
              value={base}
              onChange={b => setBase(i, b)}
            />
          </div>
        ))}
      </div>
      {highlighted !== null && (
        <Callout kind="tip" title={`Position ${highlighted + 1}: ${NAMES[strand[highlighted]]} pairs with ${NAMES[PAIRS[strand[highlighted]]]}`}>
          {strand[highlighted] === "A" || strand[highlighted] === "T"
            ? "A-T pairs form 2 hydrogen bonds, making them slightly easier to separate."
            : "C-G pairs form 3 hydrogen bonds, making this bond a little stronger."}
        </Callout>
      )}
      <p className="muted" style={{ marginBottom: 0 }}>
        Top strand runs 5' to 3' (left to right). Complementary strand runs antiparallel, 3' to 5'.
      </p>
    </Interactive>
  );
}

function GeneticOrganisationSVG() {
  const levels = [
    { label: "Nucleotide", desc: "base + sugar + phosphate", color: "#f87171" },
    { label: "DNA double helix", desc: "sequence of base pairs", color: "#fb923c" },
    { label: "Gene", desc: "section encoding one protein", color: "#fbbf24" },
    { label: "Chromosome", desc: "coiled DNA + histones", color: "#34d399" },
    { label: "Genome", desc: "all chromosomes combined", color: "#60a5fa" },
  ];
  return (
    <Figure caption="Levels of genetic organisation from the smallest nucleotide to the complete genome.">
      <svg viewBox="0 0 560 80" width="100%" style={{ maxWidth: 560 }}>
        {levels.map((lv, i) => (
          <g key={lv.label} transform={`translate(${i * 112 + 4}, 6)`}>
            <rect width="104" height="64" rx="10" fill={lv.color} opacity="0.18" stroke={lv.color} strokeWidth="1.5"/>
            <text x="52" y="26" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--ink)">{lv.label}</text>
            <text x="52" y="42" textAnchor="middle" fontSize="9" fill="var(--muted)">{lv.desc}</text>
            {i < levels.length - 1 && (
              <text x="116" y="36" textAnchor="middle" fontSize="20" fill={lv.color} fontWeight="700">›</text>
            )}
          </g>
        ))}
      </svg>
    </Figure>
  );
}

function DNADiscoverySorter() {
  const scientists = [
    { id: "franklin", name: "Rosalind Franklin", clue: "Produced Photograph 51 using X-ray crystallography" },
    { id: "wilkins", name: "Maurice Wilkins", clue: "Showed Franklin's data to Watson; shared 1962 Nobel Prize" },
    { id: "crick", name: "Francis Crick", clue: "Built the double helix model with Watson; Nobel Laureate" },
    { id: "watson", name: "James Watson", clue: "Built the double helix model with Crick; Nobel Laureate" },
  ];
  const contributions = [
    { id: "xray", text: "X-ray crystallography at King's College London", correct: ["franklin","wilkins"] },
    { id: "photo51", text: "Produced the clearest X-ray image of DNA (Photograph 51)", correct: ["franklin"] },
    { id: "model", text: "Built the first correct physical double helix model", correct: ["crick","watson"] },
    { id: "nature", text: "Co-authored the 1953 Nature paper announcing the double helix", correct: ["crick","watson"] },
    { id: "nobel", text: "Received the 1962 Nobel Prize in Physiology or Medicine", correct: ["wilkins","crick","watson"] },
  ];

  const [selected, setSelected] = useState({});
  const [checked, setChecked] = useState(false);

  function toggle(contribId, sciId) {
    setChecked(false);
    setSelected(prev => {
      const curr = prev[contribId] || [];
      if (curr.includes(sciId)) return { ...prev, [contribId]: curr.filter(x => x !== sciId) };
      return { ...prev, [contribId]: [...curr, sciId] };
    });
  }

  function score() {
    let correct = 0;
    contributions.forEach(c => {
      const sel = selected[c.id] || [];
      const rightSet = new Set(c.correct);
      const selSet = new Set(sel);
      if (sel.length === c.correct.length && [...rightSet].every(x => selSet.has(x))) correct++;
    });
    return correct;
  }

  return (
    <Interactive title="DNA Discovery: Who Did What?" subtitle="Tick every scientist who made each contribution. Some have more than one answer." takeaway="The discovery of the DNA double helix depended on contributions from multiple scientists, and Rosalind Franklin's X-ray data was essential to the final model even though she did not share the Nobel Prize.">
      <div style={{ overflowX: "auto" }}>
        <table className="data-table" style={{ minWidth: 440 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Contribution</th>
              {scientists.map(s => <th key={s.id} style={{ minWidth: 80 }}>{s.name.split(" ")[0]}</th>)}
            </tr>
          </thead>
          <tbody>
            {contributions.map(c => (
              <tr key={c.id}>
                <td style={{ fontSize: 13 }}>{c.text}</td>
                {scientists.map(s => {
                  const sel = (selected[c.id] || []).includes(s.id);
                  let bg = sel ? "var(--accent-soft)" : "transparent";
                  if (checked) {
                    if (sel && c.correct.includes(s.id)) bg = "#bbf7d0";
                    else if (sel && !c.correct.includes(s.id)) bg = "#fecaca";
                    else if (!sel && c.correct.includes(s.id)) bg = "#fef9c3";
                  }
                  return (
                    <td key={s.id} style={{ textAlign: "center", background: bg, cursor: "pointer", borderRadius: 4 }}
                      onClick={() => toggle(c.id, s.id)}>
                      <span style={{ fontSize: 20 }}>{sel ? "✓" : "○"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ctrl-row" style={{ marginTop: 12 }}>
        <button className="btn btn-accent" onClick={() => setChecked(true)}>Check answers</button>
        <button className="btn btn-ghost" onClick={() => { setSelected({}); setChecked(false); }}>Reset</button>
        {checked && (
          <div className="stat-readout" style={{ marginLeft: "auto" }}>
            <Stat value={`${score()}/${contributions.length}`} label="Correct rows"/>
          </div>
        )}
      </div>
      {checked && (
        <Callout kind={score() === contributions.length ? "success" : "tip"} title={score() === contributions.length ? "Perfect!" : "Check the highlighted cells"}>
          Green = correct tick. Red = wrong tick. Yellow = missed correct answer.
        </Callout>
      )}
    </Interactive>
  );
}

/* ============================================================
   SECTION 5.2 INTERACTIVES
   ============================================================ */

function PunnettSquareTool() {
  const TRAITS = [
    { name: "Pea plant height", dom: "T (Tall)", rec: "t (Short)", letter: "T" },
    { name: "Pea seed colour", dom: "Y (Yellow)", rec: "y (Green)", letter: "Y" },
    { name: "Guinea pig coat", dom: "B (Black)", rec: "b (White)", letter: "B" },
    { name: "Eye colour (simple)", dom: "B (Brown)", rec: "b (Blue)", letter: "B" },
    { name: "Cystic fibrosis (CF)", dom: "F (Normal)", rec: "f (CF)", letter: "F" },
  ];

  const GENO_OPTIONS = ["Homozygous dominant (XX)", "Heterozygous (Xx)", "Homozygous recessive (xx)"];
  const GENO_VALS = ["XX", "Xx", "xx"];

  const [traitIdx, setTraitIdx] = useState(0);
  const [parent1, setParent1] = useState("Xx");
  const [parent2, setParent2] = useState("Xx");

  const trait = TRAITS[traitIdx];
  const letter = trait.letter;
  const dom = letter.toUpperCase();
  const rec = letter.toLowerCase();

  function alleles(g) {
    const L = letter.toUpperCase();
    const l = letter.toLowerCase();
    if (g === "XX") return [L, L];
    if (g === "Xx") return [L, l];
    return [l, l];
  }

  const a1 = alleles(parent1);
  const a2 = alleles(parent2);
  const cells = [
    a1[0] + a2[0], a1[0] + a2[1],
    a1[1] + a2[0], a1[1] + a2[1],
  ];

  function sortGeno(g) {
    const chars = g.split("").sort((a, b) => {
      if (a.toUpperCase() === b.toUpperCase()) return a < b ? -1 : 1;
      return a.toUpperCase() < b.toUpperCase() ? -1 : 1;
    });
    return chars.join("");
  }

  const sortedCells = cells.map(sortGeno);
  const counts = {};
  sortedCells.forEach(g => { counts[g] = (counts[g] || 0) + 1; });

  const domPheno = sortedCells.filter(g => g.includes(dom)).length;
  const recPheno = 4 - domPheno;

  const dominantLabel = trait.dom.split("(")[1]?.replace(")", "") || "Dominant";
  const recessiveLabel = trait.rec.split("(")[1]?.replace(")", "") || "Recessive";

  function cellColor(g) {
    const sorted = sortGeno(g);
    if (sorted === dom + dom) return "#bbf7d0";
    if (sorted.includes(dom)) return "#d1fae5";
    return "#fecaca";
  }

  function genoDisplay(g) {
    return g.replace(/(.)(.)/, (_, a, b) => {
      if (a === dom && b === dom) return `${dom}${dom}`;
      if (a === dom) return `${dom}${rec}`;
      return `${rec}${rec}`;
    });
  }

  const parent1Display = parent1.replace("X", dom).replace("x", rec);
  const parent2Display = parent2.replace("X", dom).replace("x", rec);

  return (
    <Interactive title="Interactive Punnett Square" subtitle="Pick a trait and both parent genotypes, then read off the offspring ratios." takeaway="A Punnett square predicts the probability of each offspring genotype and phenotype; two heterozygous parents (Xx x Xx) give a 3:1 dominant to recessive phenotype ratio.">
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Trait</div>
          <SegToggle
            options={TRAITS.map((t, i) => ({ value: String(i), label: t.name }))}
            value={String(traitIdx)}
            onChange={v => { setTraitIdx(Number(v)); setParent1("Xx"); setParent2("Xx"); }}
          />
        </div>
      </div>
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: 16, marginTop: 8 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Parent 1 genotype</div>
          <SegToggle
            options={GENO_VALS.map((v, i) => ({ value: v, label: GENO_VALS[i].replace("X", dom).replace("x", rec) }))}
            value={parent1}
            onChange={setParent1}
          />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Parent 2 genotype</div>
          <SegToggle
            options={GENO_VALS.map((v, i) => ({ value: v, label: GENO_VALS[i].replace("X", dom).replace("x", rec) }))}
            value={parent2}
            onChange={setParent2}
          />
        </div>
      </div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
          <thead>
            <tr>
              <th style={{ width: 80, height: 40, border: "2px solid var(--border)" }}></th>
              {a2.map((a, i) => (
                <th key={i} style={{ width: 80, height: 40, border: "2px solid var(--border)",
                  background: "var(--accent-soft)", fontSize: 22, fontWeight: 800, color: "var(--accent-deep)" }}>
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {a1.map((aa, ri) => (
              <tr key={ri}>
                <td style={{ width: 80, height: 64, border: "2px solid var(--border)",
                  background: "var(--accent-soft)", fontSize: 22, fontWeight: 800,
                  textAlign: "center", color: "var(--accent-deep)" }}>
                  {aa}
                </td>
                {a2.map((ab, ci) => {
                  const cell = sortGeno(aa + ab);
                  return (
                    <td key={ci} style={{ width: 80, height: 64, border: "2px solid var(--border)",
                      background: cellColor(cell), textAlign: "center", fontSize: 20, fontWeight: 700 }}>
                      {cell.replace(/./g, c => c === dom ? dom : rec)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stat-readout" style={{ marginTop: 16 }}>
        <Stat value={`${domPheno}:${recPheno}`} label="Phenotype ratio"/>
        <Stat value={domPheno} label={`${dominantLabel} phenotype`}/>
        <Stat value={recPheno} label={`${recessiveLabel} phenotype`}/>
      </div>

      <div style={{ marginTop: 8, fontSize: 13 }}>
        <strong>Genotype breakdown: </strong>
        {Object.entries(counts).map(([g, n]) => (
          <span key={g} style={{ marginRight: 12 }}>
            {g.replace(/./g, c => c === dom ? dom : rec)}: {n}/4
          </span>
        ))}
      </div>

      <Callout kind="key" title="Reading the grid">
        Green = homozygous dominant ({dom+dom}). Light green = heterozygous ({dom+rec}, shows dominant trait).
        Red = homozygous recessive ({rec+rec}, shows recessive trait).
      </Callout>
    </Interactive>
  );
}

function MutationSimulator() {
  const ORIGINAL = "ATG GCA TTC GAA TAG";
  const original = ORIGINAL.replace(/ /g, "");
  const [mutType, setMutType] = useState("none");
  const [pos, setPos] = useState(4);
  const [subBase, setSubBase] = useState("A");

  const CODON_TABLE = {
    ATG:"Met(Start)",ATA:"Ile",ATC:"Ile",ATT:"Ile",
    GCA:"Ala",GCG:"Ala",GCC:"Ala",GCT:"Ala",
    TTC:"Phe",TTT:"Phe",TTA:"Leu",TTG:"Leu",
    GAA:"Glu",GAG:"Glu",GAT:"Asp",GAC:"Asp",
    TAG:"STOP",TAA:"STOP",TGA:"STOP",
    AAA:"Lys",AAG:"Lys",AAT:"Asn",AAC:"Asn",
    AGA:"Arg",AGG:"Arg",AGT:"Ser",AGC:"Ser",
    CAA:"Gln",CAG:"Gln",CAT:"His",CAC:"His",
    CCA:"Pro",CCG:"Pro",CCC:"Pro",CCT:"Pro",
    CGA:"Arg",CGG:"Arg",CGC:"Arg",CGT:"Arg",
    TCA:"Ser",TCG:"Ser",TCC:"Ser",TCT:"Ser",
    TAT:"Tyr",TAC:"Tyr",TGG:"Trp",TGT:"Cys",TGC:"Cys",
    GGA:"Gly",GGG:"Gly",GGC:"Gly",GGT:"Gly",
    GTA:"Val",GTG:"Val",GTC:"Val",GTT:"Val",
  };

  function decode(seq) {
    const codons = [];
    for (let i = 0; i < seq.length - 2; i += 3) {
      const c = seq.slice(i, i + 3);
      codons.push({ codon: c, aa: CODON_TABLE[c] || "???" });
    }
    return codons;
  }

  function getMutated() {
    const idx = pos - 1;
    if (mutType === "none") return original;
    if (mutType === "sub") {
      return original.slice(0, idx) + subBase + original.slice(idx + 1);
    }
    if (mutType === "del") {
      return original.slice(0, idx) + original.slice(idx + 1);
    }
    if (mutType === "ins") {
      return original.slice(0, idx) + subBase + original.slice(idx);
    }
    return original;
  }

  const mutated = getMutated();
  const origCodons = decode(original);
  const mutCodons = decode(mutated);

  function formatSeq(seq) {
    const chunks = [];
    for (let i = 0; i < seq.length; i += 3) chunks.push(seq.slice(i, i + 3));
    return chunks;
  }

  const origChunks = formatSeq(original);
  const mutChunks = formatSeq(mutated);

  return (
    <Interactive title="Mutation Simulator" subtitle="Apply a point substitution, deletion, or insertion and see how the amino acid sequence changes." takeaway="A single base deletion or insertion causes a frameshift that alters every amino acid downstream and is usually far more damaging than a point substitution, which may change only one codon or be silent.">
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Mutation type</div>
          <SegToggle
            options={[{value:"none",label:"None"},{value:"sub",label:"Substitution"},{value:"del",label:"Deletion"},{value:"ins",label:"Insertion"}]}
            value={mutType}
            onChange={setMutType}
          />
        </div>
        {mutType !== "none" && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Position (1-{original.length})</div>
            <Slider min={1} max={original.length} value={pos} onChange={setPos} label=""/>
          </div>
        )}
        {(mutType === "sub" || mutType === "ins") && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>New base</div>
            <SegToggle options={["A","T","C","G"]} value={subBase} onChange={setSubBase}/>
          </div>
        )}
      </div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table className="data-table">
          <thead>
            <tr><th>Strand</th><th>DNA sequence</th><th>Amino acid sequence</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Original</strong></td>
              <td style={{ fontFamily: "monospace", fontSize: 14, letterSpacing: 1 }}>
                {origChunks.map((c, i) => <span key={i} style={{ marginRight: 4 }}>{c}</span>)}
              </td>
              <td style={{ fontSize: 12 }}>{origCodons.map(x => x.aa).join(" - ")}</td>
            </tr>
            <tr>
              <td><strong>Mutated</strong></td>
              <td style={{ fontFamily: "monospace", fontSize: 14, letterSpacing: 1 }}>
                {mutChunks.map((c, i) => {
                  const changed = origChunks[i] !== c;
                  return <span key={i} style={{ marginRight: 4, background: changed ? "#fef08a" : "transparent",
                    borderRadius: 3, padding: "0 2px" }}>{c}</span>;
                })}
              </td>
              <td style={{ fontSize: 12 }}>
                {mutCodons.map((x, i) => {
                  const origAA = origCodons[i]?.aa;
                  const changed = origAA !== x.aa;
                  return <span key={i} style={{ marginRight: 4, background: changed ? "#fecaca" : "transparent",
                    borderRadius: 3, padding: "0 2px" }}>{x.aa}</span>;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {mutType === "del" && (
        <Callout kind="warn" title="Frameshift detected">
          A single base deletion shifts every codon after position {pos}, changing all downstream amino acids. This is usually much more damaging than a substitution.
        </Callout>
      )}
      {mutType === "sub" && (
        <Callout kind="tip" title="Point substitution">
          Only one codon changes. If the new codon encodes the same amino acid, this is a silent (synonymous) mutation with no effect on the protein.
        </Callout>
      )}
    </Interactive>
  );
}

/* ============================================================
   SECTION 5.3 INTERACTIVES
   ============================================================ */

function GeneticTechSorter() {
  const items = [
    { id: "a", label: "Producing human insulin in bacteria", bucket: "medicine" },
    { id: "b", label: "PCR test for COVID-19", bucket: "medicine" },
    { id: "c", label: "Bt cotton resisting insect pests", bucket: "agriculture" },
    { id: "d", label: "DNA profiling of endangered Tasmanian devils", bucket: "conservation" },
    { id: "e", label: "Engineered yeast producing bioethanol", bucket: "industry" },
    { id: "f", label: "CRISPR editing of CFTR gene in cells", bucket: "medicine" },
    { id: "g", label: "Golden rice with vitamin A precursor", bucket: "agriculture" },
    { id: "h", label: "Tracking illegal ivory using DNA", bucket: "conservation" },
    { id: "i", label: "Enzymes from GM bacteria in washing powder", bucket: "industry" },
    { id: "j", label: "Sequencing tumour genome to guide chemotherapy", bucket: "medicine" },
  ];
  const buckets = [
    { id: "medicine", label: "Medicine" },
    { id: "agriculture", label: "Agriculture" },
    { id: "industry", label: "Industry" },
    { id: "conservation", label: "Conservation" },
  ];
  return (
    <Interactive title="Genetic Technologies: Sort by Application" subtitle="Drag or click each application into the correct sector." takeaway="Genetic technologies such as PCR, recombinant DNA, and CRISPR are applied across medicine, agriculture, industry, and conservation to solve problems that were previously impossible to address.">
      <MatchBuckets items={items} buckets={buckets}/>
    </Interactive>
  );
}

function EthicsDebateTool() {
  const scenarios = [
    {
      title: "HeLa cells in medical research",
      benefit: "HeLa cells have enabled thousands of advances including the polio vaccine, cancer research, and IVF development.",
      concern: "Cells were taken from Henrietta Lacks without her consent. Her family received no compensation while corporations profited.",
      utilitarian: "The vast benefit to millions may outweigh harm to one person, but the precedent of non-consent harms trust in research.",
      rights: "Henrietta's right to autonomy and informed consent was violated. The ends do not justify the means.",
      justice: "An African American woman in a segregated hospital bore the cost; mainly wealthy institutions gained the benefit. This is unjust.",
    },
    {
      title: "Genetic testing by insurance companies",
      benefit: "Insurance companies argue that access to genetic data reduces 'adverse selection' and helps calculate fair premiums.",
      concern: "People could be denied coverage or charged more for factors outside their control, creating genetic discrimination.",
      utilitarian: "If it lowers premiums for most, utilitarian analysis might support it. But if it makes coverage unaffordable for many, the net harm may be greater.",
      rights: "Genetic information is personal. People have a right to privacy and should not be penalised for their DNA.",
      justice: "Makes insurance unaffordable for those with risk variants, creating inequity. Not a fair distribution of benefits.",
    },
    {
      title: "CRISPR editing of human embryos",
      benefit: "Could prevent serious inherited diseases (e.g. cystic fibrosis) before birth, reducing suffering.",
      concern: "Germline edits are heritable. Unknown off-target effects could harm future generations who cannot consent.",
      utilitarian: "Preventing serious suffering in future people has large potential benefit, but risks to many future generations must also count.",
      rights: "Future children cannot consent to genetic changes. Editing embryos for non-medical traits ('designer babies') violates autonomy.",
      justice: "Only wealthy individuals could access this technology, creating a genetic advantage for the rich.",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [frame, setFrame] = useState("utilitarian");
  const s = scenarios[idx];
  const frameContent = { utilitarian: s.utilitarian, rights: s.rights, justice: s.justice };
  const frameLabel = { utilitarian: "Utilitarian (greatest good)", rights: "Rights-based (deontological)", justice: "Justice and fairness" };

  return (
    <Interactive title="Ethics Framework Explorer" subtitle="Choose a scenario and an ethical framework to see how the analysis differs." takeaway="Different ethical frameworks (utilitarian, rights-based, justice) can lead to different conclusions about the same genetic technology scenario, which is why ethical debates require considering more than one perspective.">
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Scenario</div>
          <SegToggle
            options={scenarios.map((s, i) => ({ value: String(i), label: `${i + 1}` }))}
            value={String(idx)}
            onChange={v => setIdx(Number(v))}
          />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--muted)" }}>Ethical framework</div>
          <SegToggle
            options={[{value:"utilitarian",label:"Utilitarian"},{value:"rights",label:"Rights-based"},{value:"justice",label:"Justice"}]}
            value={frame}
            onChange={setFrame}
          />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 8 }}>{s.title}</h3>
        <div className="grid-2" style={{ gap: 12 }}>
          <div className="card" style={{ background: "#d1fae5" }}>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>Potential benefit</div>
            <div style={{ fontSize: 13 }}>{s.benefit}</div>
          </div>
          <div className="card" style={{ background: "#fecaca" }}>
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>Potential concern</div>
            <div style={{ fontSize: 13 }}>{s.concern}</div>
          </div>
        </div>
        <div className="card" style={{ marginTop: 12, background: "var(--accent-soft)", border: "2px solid var(--accent-deep)" }}>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4, color: "var(--accent-deep)" }}>
            {frameLabel[frame]} analysis
          </div>
          <div style={{ fontSize: 13 }}>{frameContent[frame]}</div>
        </div>
      </div>
    </Interactive>
  );
}

/* ============================================================
   SECTION 5.4 INTERACTIVES
   ============================================================ */

function NaturalSelectionSim() {
  const GENS = 10;
  const [camouflage, setCamouflage] = useState(0.7);
  const [predation, setPredation] = useState(0.5);
  const [running, setRunning] = useState(false);
  const [gen, setGen] = useState(0);
  const [history, setHistory] = useState([{ camou: 50, plain: 50 }]);
  const intervalRef = useRef(null);

  function nextGen(prev) {
    const last = prev[prev.length - 1];
    const total = last.camou + last.plain;
    const camouSurv = last.camou * (1 - predation * (1 - camouflage));
    const plainSurv = last.plain * (1 - predation * 1.0);
    const survTotal = camouSurv + plainSurv;
    const scale = total / Math.max(survTotal, 1);
    const newCamou = Math.min(95, Math.max(5, Math.round(camouSurv * scale)));
    const newPlain = 100 - newCamou;
    return [...prev, { camou: newCamou, plain: newPlain }];
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setGen(g => {
          if (g >= GENS - 1) { setRunning(false); return g; }
          setHistory(h => nextGen(h));
          return g + 1;
        });
      }, 600);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, camouflage, predation]);

  function reset() {
    setRunning(false);
    setGen(0);
    setHistory([{ camou: 50, plain: 50 }]);
  }

  const current = history[history.length - 1];
  const chartH = 120;
  const chartW = 340;
  const barW = chartW / (GENS + 1);

  return (
    <Interactive title="Natural Selection Simulation" subtitle="Adjust camouflage effectiveness and predation pressure, then run the simulation across 10 generations." takeaway="When a heritable trait such as camouflage gives a survival advantage under predation pressure, the frequency of that trait increases through the population across generations as less-suited individuals are removed.">
      <div className="ctrl-row" style={{ flexWrap: "wrap", gap: 16 }}>
        <Slider label="Camouflage effectiveness" min={0} max={1} step={0.05} value={camouflage}
          onChange={v => { setCamouflage(v); reset(); }} fmt={v => `${Math.round(v*100)}%`} unit=""/>
        <Slider label="Predation pressure" min={0.1} max={1} step={0.05} value={predation}
          onChange={v => { setPredation(v); reset(); }} fmt={v => `${Math.round(v*100)}%`} unit=""/>
      </div>
      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <svg viewBox={`0 0 ${chartW + 60} ${chartH + 50}`} width="100%" style={{ maxWidth: 420, display: "block", margin: "0 auto" }}>
          {/* Y axis */}
          {[0,25,50,75,100].map(y => (
            <g key={y}>
              <line x1="50" y1={chartH - y * chartH / 100 + 10} x2={chartW + 52} y2={chartH - y * chartH / 100 + 10}
                stroke="var(--border)" strokeWidth="0.5"/>
              <text x="46" y={chartH - y * chartH / 100 + 14} textAnchor="end" fontSize="9" fill="var(--muted)">{y}%</text>
            </g>
          ))}
          {/* Bars */}
          {history.map((h, i) => (
            <g key={i}>
              <rect x={52 + i * barW} y={chartH - h.camou * chartH / 100 + 10} width={barW - 2} height={h.camou * chartH / 100}
                fill="#34d399" rx="2"/>
              <rect x={52 + i * barW} y={10} width={barW - 2} height={(100 - h.camou) * chartH / 100}
                fill="#fca5a5" rx="2" opacity="0.7"/>
              <text x={52 + i * barW + barW / 2} y={chartH + 28} textAnchor="middle" fontSize="9" fill="var(--muted)">{i}</text>
            </g>
          ))}
          <text x={chartW / 2 + 52} y={chartH + 42} textAnchor="middle" fontSize="10" fill="var(--muted)">Generation</text>
          <text x="8" y={chartH / 2 + 10} textAnchor="middle" fontSize="10" fill="var(--muted)"
            transform={`rotate(-90, 8, ${chartH / 2 + 10})`}>% of population</text>
        </svg>
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 8 }}>
        <span><span style={{ background: "#34d399", borderRadius: 3, padding: "2px 8px" }}>&nbsp;</span> Camouflaged</span>
        <span><span style={{ background: "#fca5a5", borderRadius: 3, padding: "2px 8px" }}>&nbsp;</span> Non-camouflaged</span>
      </div>
      <div className="stat-readout">
        <Stat value={`${current.camou}%`} label="Camouflaged"/>
        <Stat value={`${current.plain}%`} label="Non-camouflaged"/>
        <Stat value={gen} label="Generation"/>
      </div>
      <div className="ctrl-row" style={{ marginTop: 8 }}>
        <button className="btn btn-accent" onClick={() => setRunning(true)} disabled={running || gen >= GENS - 1}>
          Run simulation
        </button>
        <button className="btn btn-ghost" onClick={reset}>Reset</button>
      </div>
    </Interactive>
  );
}

function EvidenceEvolutionSorter() {
  const items = [
    { id: "a", label: "Whale pelvic bones that no longer attach to hind limbs", bucket: "anatomy" },
    { id: "b", label: "Tiktaalik fossil showing fish and tetrapod features", bucket: "fossil" },
    { id: "c", label: "Human and chimpanzee DNA is 98.8% identical", bucket: "molecular" },
    { id: "d", label: "Galapagos finches with different beak shapes on different islands", bucket: "biogeography" },
    { id: "e", label: "Same humerus-radius-ulna arrangement in human arm, bat wing, and whale flipper", bucket: "anatomy" },
    { id: "f", label: "Horse evolution traced through 50 million years of fossils", bucket: "fossil" },
    { id: "g", label: "Cytochrome c protein sequences match evolutionary trees", bucket: "molecular" },
    { id: "h", label: "Related marsupials found only in Australia and South America", bucket: "biogeography" },
    { id: "i", label: "Human coccyx (tailbone) is vestigial", bucket: "anatomy" },
    { id: "j", label: "Burgess Shale fossils document Cambrian animal diversity", bucket: "fossil" },
  ];
  const buckets = [
    { id: "fossil", label: "Fossil record" },
    { id: "anatomy", label: "Comparative anatomy" },
    { id: "molecular", label: "Molecular evidence" },
    { id: "biogeography", label: "Biogeography" },
  ];
  return (
    <Interactive title="Evidence for Evolution: Sort by Type" subtitle="Match each piece of evidence to the correct category." takeaway="Multiple independent lines of evidence, including the fossil record, comparative anatomy, molecular biology, and biogeography, all point to the same conclusion that species share common ancestors and have changed over time.">
      <MatchBuckets items={items} buckets={buckets}/>
    </Interactive>
  );
}

/* ============================================================
   SECTION 5.1: DNA Structure and Function
   ============================================================ */
function Section1({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.1 DNA Structure and Function</div>
        <h1>The molecule of life</h1>
        <p className="lead">Every living thing carries a chemical instruction manual inside its cells. Let's unpack what DNA is, how it is organised, and how its shape makes everything work.</p>
      </div>

      <Figure src="img/dna.png" caption="The DNA double helix — paired bases form the rungs of a twisted ladder." />
      <DotPoint id="5.1.1" title="Genetic material across all living things" progress={progress} setProgress={setProgress}>
        <p>Every living organism, from single-celled bacteria to blue whales, contains <Term def="A molecule (usually DNA) that stores the instructions for building, maintaining, and reproducing an organism.">genetic material</Term> inside its cells. In most organisms these instructions are encoded in <Term def="Deoxyribonucleic acid. A long molecule that carries the genetic code as a sequence of four chemical bases.">DNA</Term>. The information stored in DNA controls which <Term def="Large molecules made of amino acids that carry out almost every function in a cell.">proteins</Term> a cell produces, and proteins determine the structure and function of every cell.</p>
        <p>DNA uses four chemical building blocks called <Term def="The four 'letters' of the DNA code: adenine (A), thymine (T), cytosine (C), and guanine (G).">nucleotide bases</Term>, often written as A, T, C, and G. Just as the 26 letters of the English alphabet can encode a whole library, the four-letter DNA alphabet can encode all the information needed to build any living organism. The human genome contains approximately 3.2 billion base pairs encoding around 20,000 to 25,000 genes.</p>
        <Callout kind="fact" title="Did you know?">
          If you unravelled all the DNA from a single human cell and laid it end to end, it would stretch about 2 metres. Yet it is packed inside a nucleus only about 6 micrometres across.
        </Callout>
        <GeneticOrganisationSVG/>
        <Callout kind="key" title="Prokaryotes vs Eukaryotes">
          In bacteria (prokaryotes) DNA is a single circular molecule in the cytoplasm with no nucleus. In plants and animals (eukaryotes) DNA is linear, packaged into chromosomes, and enclosed in a membrane-bound nucleus. Viruses can use DNA or RNA as their genetic material.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={1} question="What molecule carries the genetic code in most living organisms?"
            options={["RNA","DNA","Protein","Glucose"]} correct={1}
            explain="DNA (deoxyribonucleic acid) is the genetic material in most organisms."/>
          <WrittenQ num={2} question="Why is the genetic code compared to an alphabet?"
            model="Just as letters combine into words and sentences, the four DNA bases (A, T, C, G) combine in sequences to spell out instructions (genes) for building proteins."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.1.2" title="DNA, gene, chromosome and genome" progress={progress} setProgress={setProgress}>
        <p>Genetic information is organised at several levels of increasing size. A <Term def="A specific segment of DNA that carries the instructions for making one protein or functional RNA molecule. The basic unit of inheritance.">gene</Term> is a short section of DNA that encodes one protein. A single DNA molecule is wound tightly around <Term def="Proteins that act as spools around which DNA is coiled to help compact it into chromosomes.">histone</Term> proteins and further coiled to form a <Term def="A tightly coiled structure made of one DNA molecule and histone proteins. Humans have 46 in each body cell.">chromosome</Term>. The complete set of genetic information in an organism, all its chromosomes combined, is called the <Term def="The complete set of genetic information in an organism, covering all chromosomes.">genome</Term>.</p>
        <p>Human body cells contain 46 chromosomes arranged in 23 pairs. One chromosome in each pair is inherited from the mother and one from the father. These are called <Term def="Pairs of chromosomes carrying genes for the same traits, one from each parent.">homologous chromosomes</Term>. Sex cells (eggs and sperm) contain only 23 chromosomes so that when fertilisation occurs the resulting <Term def="The cell formed when a sperm and egg fuse. It contains the full set of 46 chromosomes.">zygote</Term> has the correct total of 46.</p>
        <Callout kind="key" title="Key comparison">
          A chromosome is like a whole cookbook; a gene is a single recipe in that cookbook; the genome is the entire library of all your cookbooks.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={3} question="How many chromosomes does a typical human body cell contain?"
            options={["23","46","64","92"]} correct={1}
            explain="Human body cells contain 46 chromosomes arranged in 23 homologous pairs."/>
          <WrittenQ num={4} question="Explain the difference between a gene and a chromosome."
            model="A gene is a short segment of DNA encoding one protein. A chromosome is the entire coiled DNA molecule (plus histones) and contains thousands of genes. One chromosome holds many genes."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.1.3" title="The DNA double helix: structure and function" progress={progress} setProgress={setProgress}>
        <p>DNA has a distinctive <Term def="The twisted-ladder shape of the DNA molecule, formed by two antiparallel strands coiled around each other.">double helix</Term> structure. The two 'sides' of the ladder are made of alternating <Term def="The five-carbon sugar found in DNA nucleotides.">deoxyribose</Term> sugar and phosphate groups. The 'rungs' are pairs of nitrogenous bases held by weak <Term def="Attractive forces between a hydrogen atom and an electronegative atom such as oxygen or nitrogen. They hold the two DNA strands together.">hydrogen bonds</Term>: adenine (A) always pairs with thymine (T), and cytosine (C) always pairs with guanine (G). This is called <Term def="The rule that A always pairs with T, and C always pairs with G, in a DNA double helix.">complementary base pairing</Term>.</p>
        <p>This structure serves three key functions. First, the base sequence stores genetic information. Second, because each strand is the complement of the other, each can act as a template for making an exact copy during cell division. Third, the double-stranded helical form protects the bases inside and provides chemical stability.</p>
        <DNABaseBuilder/>
        <Callout kind="tip" title="Chargaff's rule">
          In any DNA sample, the percentage of A equals the percentage of T, and the percentage of C equals the percentage of G. If adenine is 30%, thymine is 30%, and the remaining 40% is split equally between cytosine and guanine (20% each).
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={5} question="Which base pairs with guanine (G) in a DNA double helix?"
            options={["Adenine (A)","Thymine (T)","Cytosine (C)","Another guanine (G)"]} correct={2}
            explain="Cytosine (C) always pairs with guanine (G), forming 3 hydrogen bonds. Adenine pairs with thymine."/>
          <WrittenQ num={6} question="Explain how the structure of DNA allows it to be accurately copied."
            model="The two strands separate and each acts as a template. Free nucleotides bond to their complementary bases (A-T, C-G) on each strand, producing two new identical DNA molecules."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.1.4" title="The race to discover DNA's structure" progress={progress} setProgress={setProgress}>
        <p>The discovery of the DNA double helix in 1953 involved many scientists and raises important questions about credit, ethics, and collaboration. <Term def="X-ray crystallographer whose Photograph 51 provided crucial data on DNA's structure.">Rosalind Franklin</Term> at King's College London produced extraordinarily precise X-ray diffraction images, most famously Photograph 51, which showed DNA's helical shape and dimensions. <Term def="Physicist and molecular biologist who, with Watson, built the correct double helix model in 1953.">Francis Crick</Term> and <Term def="Molecular biologist who, with Crick, built the first correct double helix model using Franklin's data.">James Watson</Term> at Cambridge built physical models of DNA. Watson saw Photograph 51 (shown to him by Maurice Wilkins without Franklin's knowledge) and used its data to build the correct model.</p>
        <p>Crick and Watson published their model in the journal <em>Nature</em> in April 1953. In 1962, Watson, Crick, and Wilkins received the Nobel Prize in Physiology or Medicine. Franklin had died from cancer in 1958 and was not eligible, as the Nobel Prize is not awarded to people posthumously. Her contribution is now widely recognised as essential to the discovery.</p>
        <DNADiscoverySorter/>
        <Callout kind="key" title="Nature of science">
          Scientific discoveries rarely come from one person alone. They build on prior work, involve competition, and can raise ethical questions about how data is shared and how credit is given. The scientific community can reassess historical contributions over time.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={7} question="Which scientist produced Photograph 51?"
            options={["Francis Crick","James Watson","Maurice Wilkins","Rosalind Franklin"]} correct={3}
            explain="Rosalind Franklin used X-ray crystallography to produce Photograph 51 in 1952, which showed DNA's helical structure."/>
          <WrittenQ num={8} question="Discuss one ethical issue raised by the DNA discovery story."
            model="Watson saw Franklin's Photograph 51 without her knowledge or consent. Using someone's unpublished data without permission violates research ethics and professional courtesy. Franklin deserved greater credit during her lifetime."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.2: Variation and Inheritance
   ============================================================ */
function Section2({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.2 Variation and Inheritance</div>
        <h1>Why you look like (but not exactly like) your parents</h1>
        <p className="lead">How does genetic information pass from parent to child? Why do siblings look different? And how do mutations create the raw material for evolution?</p>
      </div>

      <Figure src="img/inheritance.png" caption="A Punnett square predicts how traits pass to offspring." />
      <DotPoint id="5.2.1" title="Passing genetic information to offspring" progress={progress} setProgress={setProgress}>
        <p>All organisms reproduce, and in doing so they pass copies of their genetic information to their offspring. In <Term def="Reproduction involving a single parent, producing offspring that are genetically identical (clones) to the parent.">asexual reproduction</Term>, one parent produces offspring that are genetically identical copies. Bacteria split by <Term def="Asexual reproduction in bacteria: the cell copies its DNA and splits into two equal daughter cells.">binary fission</Term>; yeast buds; plants can grow from cuttings. Because only one parent is involved and no shuffling of DNA occurs, all offspring carry exactly the same genetic information.</p>
        <p>In <Term def="Reproduction involving two parents, each contributing half their genetic information through specialised sex cells (gametes).">sexual reproduction</Term>, two parents each contribute half their genetic information through <Term def="Specialised sex cells (sperm and egg) that carry half the chromosome number, produced by meiosis.">gametes</Term>. Gametes are produced by <Term def="A type of cell division that halves the chromosome number and shuffles genetic information, producing four genetically unique sex cells.">meiosis</Term>, which halves the chromosome number and shuffles alleles through a process called crossing over. When two gametes fuse in <Term def="The fusion of sperm and egg to form a zygote with the full chromosome number.">fertilisation</Term>, the resulting zygote inherits a unique combination of genes from both parents, generating the <Term def="Differences between individuals in a population in their genes, traits, or appearance.">genetic variation</Term> that drives natural selection.</p>
        <Callout kind="key" title="Asexual vs sexual">
          Asexual reproduction is fast and needs no partner, but produces no variation. Sexual reproduction generates variation, giving populations more raw material to adapt to changing environments.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={9} question="Which type of reproduction produces offspring that are genetically identical to the parent?"
            options={["Sexual","Asexual","Both","Neither"]} correct={1}
            explain="Asexual reproduction involves only one parent and no DNA shuffling, so all offspring are clones."/>
          <WrittenQ num={10} question="Explain why sexually produced offspring are never genetically identical to either parent."
            model="Meiosis shuffles alleles through crossing over and random chromosome sorting. Fertilisation then combines unique gametes from two different individuals, creating a genotype not found in either parent."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.2.2" title="Genes, environment and trait development" progress={progress} setProgress={setProgress}>
        <p>Most observable characteristics, called <Term def="The observable characteristics of an organism, produced by the interaction of genotype and environment.">phenotypes</Term>, result from the combined effect of many genes working together (called <Term def="Inheritance in which a single trait is influenced by many genes, each making a small contribution.">polygenic inheritance</Term>) plus the influence of environmental factors. Human height, for example, is influenced by more than 700 identified gene variants, but also by nutrition, physical activity, and general health during childhood.</p>
        <p>The interaction between an organism's <Term def="The specific alleles an organism carries at its gene loci.">genotype</Term> (its genetic makeup) and the environment produces the phenotype. Two organisms with identical genotypes can develop different phenotypes if raised in different environments. This is why identical twins, who share the same DNA, often develop differences in height, weight, and health over time. Rather than 'nature versus nurture', most biologists today recognise that genes and environment always work together.</p>
        <Callout kind="fact" title="Hydrangea flowers">
          Hydrangea flowers change colour depending on soil pH. The same genotype produces blue flowers in acidic soil and pink flowers in alkaline soil. The gene for pigment production does not change; what changes is the chemical environment that affects the pigment pathway.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={11} question="Which of the following traits is MOST strongly influenced by environment?"
            options={["ABO blood type","Human height","Number of chromosomes","Eye shape"]} correct={1}
            explain="Height is influenced by over 700 genes AND environmental factors like nutrition. Blood type is entirely genetic."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.2.3" title="DNA mutations and genetic variation" progress={progress} setProgress={setProgress}>
        <p>A <Term def="Any change to the sequence of bases in a DNA molecule.">mutation</Term> is any change to the base sequence in a DNA molecule. Mutations arise spontaneously as errors during DNA replication, or they can be caused by <Term def="Environmental agents that cause mutations in DNA, such as UV radiation, X-rays, or certain chemicals.">mutagens</Term> such as ultraviolet radiation, X-rays, and chemicals in tobacco smoke. A <Term def="A change to a single base pair in a DNA sequence.">point mutation</Term> involves one base; insertions and deletions add or remove one or more bases.</p>
        <p>The effect of a mutation depends on where it occurs and what change it makes. Most mutations are neutral: they fall in non-coding regions or produce the same amino acid (thanks to redundancy in the genetic code). A small proportion are harmful, causing non-functional proteins and conditions like cystic fibrosis or sickle cell anaemia. An even smaller proportion are beneficial: the CCR5 delta-32 mutation, for example, confers strong resistance to HIV infection. Beneficial mutations are the raw material for natural selection and evolutionary change.</p>
        <MutationSimulator/>
        <Callout kind="warn" title="Frameshift mutations">
          Inserting or deleting a number of bases that is not a multiple of three shifts the entire reading frame for all codons downstream. This changes every amino acid from that point on and almost always destroys protein function. This is why a deletion is generally more damaging than a point substitution.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={12} question="A single-base insertion causes what type of mutation?"
            options={["Point substitution","Silent mutation","Frameshift mutation","Deletion"]} correct={2}
            explain="Adding or removing one base shifts the reading frame for all downstream codons, a frameshift mutation."/>
          <WrittenQ num={13} question="Explain why most mutations are neutral rather than harmful."
            model="Most of the genome is non-coding, so mutations there rarely affect proteins. The genetic code is also redundant: several codons can encode the same amino acid, meaning many base changes do not alter the protein sequence."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.2.4" title="Genotype, phenotype and Mendelian inheritance" progress={progress} setProgress={setProgress}>
        <p>In the 1860s, the Austrian monk <Term def="The founder of genetics, whose pea plant experiments revealed the laws of inheritance.">Gregor Mendel</Term> performed careful breeding experiments with pea plants and discovered that traits are determined by discrete units (now called genes) inherited in predictable patterns. At each gene <Term def="The position of a gene on a chromosome.">locus</Term> an organism inherits two versions of the gene, called <Term def="Different versions of the same gene. At each locus, an organism carries two alleles (one from each parent).">alleles</Term>, one from each parent.</p>
        <p>A <Term def="An allele that produces its phenotype whenever it is present, whether paired with another dominant allele or with a recessive allele.">dominant allele</Term> (uppercase letter, e.g. T) produces its phenotype whenever it is present. A <Term def="An allele that only produces its phenotype when two copies are present (homozygous recessive).">recessive allele</Term> (lowercase letter, e.g. t) only shows its phenotype when two copies are present. An organism with two identical alleles is <Term def="Having two identical alleles at a gene locus (e.g. TT or tt).">homozygous</Term>; one with two different alleles is <Term def="Having two different alleles at a gene locus (e.g. Tt).">heterozygous</Term>. Mendel's <Term def="The principle that the two alleles for a gene separate during gamete formation, so each gamete carries only one allele.">Law of Segregation</Term> states that alleles separate during gamete formation.</p>
        <Callout kind="key" title="Genotype notation">
          Use uppercase for dominant alleles (T) and lowercase for recessive alleles (t). TT = homozygous dominant. Tt = heterozygous. tt = homozygous recessive.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={14} question="A dog has genotype Bb (B = black coat, dominant; b = white coat, recessive). What is its phenotype?"
            options={["White","Black and white","Black","White with black spots"]} correct={2}
            explain="The dominant B allele is expressed whenever present. One copy is enough to produce the dominant phenotype (black)."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.2.5" title="Punnett squares and pedigrees" progress={progress} setProgress={setProgress}>
        <p>Geneticists use two main tools to predict and analyse inheritance patterns. A <Term def="A grid used to predict the possible genotypes and phenotypes of offspring from a specific cross.">Punnett square</Term> is a grid where you place each parent's possible gametes along the top and side. Each cell in the grid shows one possible offspring genotype combination. By counting outcomes, you calculate the probability of each genotype and phenotype.</p>
        <p>A <Term def="A family tree diagram that tracks the inheritance of a specific trait across multiple generations, using standard symbols.">pedigree</Term> is a family tree that tracks a trait across generations. Squares represent males; circles represent females; filled (shaded) symbols indicate affected individuals. Pedigrees allow you to determine whether a trait is dominant or recessive, and whether it is <Term def="Carried on chromosomes 1 to 22 (non-sex chromosomes).">autosomal</Term> or <Term def="Carried on a sex chromosome, usually the X chromosome.">sex-linked</Term>.</p>
        <PunnettSquareTool/>
        <Callout kind="key" title="Punnett square rules">
          1. Identify both parents' genotypes. 2. Write each parent's possible gametes along the top and side. 3. Fill each cell by combining one allele from the top with one from the side. 4. Count genotypes and phenotypes and express as ratios.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={15} question="Two carriers (Ff x Ff) for cystic fibrosis cross. What fraction of offspring are expected to have cystic fibrosis (ff)?"
            options={["1/4 (25%)","1/2 (50%)","3/4 (75%)","1/1 (100%)"]} correct={0}
            explain="Ff x Ff gives: FF (25%), Ff (50%), ff (25%). Only ff develops cystic fibrosis, so 1 in 4 (25%)."/>
          <WrittenQ num={16} question="A pedigree shows that two unaffected parents have an affected child. What can you conclude about the inheritance pattern?"
            model="The condition must be autosomal recessive. The affected child (homozygous recessive) received one recessive allele from each parent. Both unaffected parents must be heterozygous carriers."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.3: Genetic Technologies
   ============================================================ */
function Section3({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.3 Genetic Technologies</div>
        <h1>Reading, copying, and editing the code of life</h1>
        <p className="lead">Scientists can now read DNA sequences, amplify tiny samples, and edit genes with precision. These tools are transforming medicine, agriculture, conservation, and industry and raising profound ethical questions.</p>
      </div>

      <DotPoint id="5.3.1" title="Current and emerging genetic technologies" progress={progress} setProgress={setProgress}>
        <p>Genetic technologies are tools and techniques that allow scientists to analyse, copy, or alter DNA. <Term def="A technique that reads the exact order of bases (A, T, C, G) in a DNA molecule.">DNA sequencing</Term> reads the base sequence of a sample, enabling identification of genes, mutations, and organisms. The <Term def="Polymerase chain reaction. A technique that rapidly copies a specific DNA sequence from a tiny sample, producing millions of copies for analysis.">polymerase chain reaction (PCR)</Term> amplifies tiny amounts of DNA millions of times, making it possible to analyse trace samples in forensics, disease testing, and research. <Term def="Technology that inserts a gene from one organism into the DNA of another organism, which then produces the encoded protein.">Recombinant DNA technology</Term> combines DNA from different organisms to produce useful proteins in bacteria or yeast.</p>
        <p>Emerging technologies include <Term def="A precise gene-editing tool that uses a guide RNA to locate a specific DNA sequence and a Cas9 enzyme to cut and edit it.">CRISPR-Cas9</Term>, which can precisely cut and edit DNA at a chosen target sequence. CRISPR is cheaper, faster, and more accessible than older editing methods, making it a revolution in genetic technology. <Term def="The field of designing and building new biological parts and systems from scratch, applying engineering principles to biology.">Synthetic biology</Term> takes this further, designing entirely new biological systems for applications like biofuel production.</p>
        <GeneticTechSorter/>
        <Callout kind="fact" title="CRISPR Nobel Prize">
          Jennifer Doudna and Emmanuelle Charpentier were awarded the 2020 Nobel Prize in Chemistry for developing CRISPR-Cas9 as a gene-editing tool, building on research into bacterial immune systems.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={17} question="Which technique amplifies tiny DNA samples for further analysis?"
            options={["DNA sequencing","PCR","CRISPR-Cas9","Karyotyping"]} correct={1}
            explain="PCR (polymerase chain reaction) copies a specific DNA sequence millions of times from a very small starting sample."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.3.2" title="Applications in conservation, agriculture, industry and medicine" progress={progress} setProgress={setProgress}>
        <p>In conservation, <Term def="A technique using specific DNA sequences to identify individual organisms or determine their genetic relationships.">DNA profiling</Term> helps track endangered species, detect illegal wildlife trade, and measure genetic diversity in small populations. In agriculture, <Term def="Crops or animals whose DNA has been altered using recombinant DNA technology to introduce a useful gene from another organism.">genetically modified (GM)</Term> crops like Bt cotton (carrying a bacterial toxin gene) resist insect pests, reducing pesticide use. In industry, GM bacteria and yeasts produce enzymes for detergents, bioethanol, and other products. In medicine, recombinant human insulin (first approved in 1982) is now virtually the only insulin used worldwide, replacing animal-derived insulin that could trigger immune reactions.</p>
        <p><Term def="A medical approach that corrects or replaces a faulty gene in a patient's cells to treat a genetic disease, often using a viral vector to deliver the correct gene.">Gene therapy</Term> targets the root cause of genetic diseases. For example, a therapy for an inherited form of blindness (LCA2) restored vision in clinical trials by delivering a working copy of the faulty gene directly to cells in the retina. As costs fall, whole-genome sequencing is increasingly used to guide personalised cancer treatment by identifying which mutations drive a patient's tumour.</p>
        <Callout kind="key" title="Recombinant insulin">
          Before 1982, people with Type 1 diabetes relied on insulin extracted from pig or cow pancreases. Now, the human insulin gene inserted into bacteria produces insulin that is identical to human insulin, available in unlimited quantities, and less likely to cause immune reactions.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={18} question="What does 'Bt' stand for in Bt cotton crops?"
            options={["Biotech","Bacillus thuringiensis","Base transfer","Binary transformation"]} correct={1}
            explain="Bt stands for Bacillus thuringiensis, a bacterium whose toxin gene has been inserted into the plant's DNA to kill insect pests."/>
          <WrittenQ num={19} question="Explain one benefit and one risk of using Bt crops in Australian agriculture."
            model="Benefit: Bt crops kill target insect pests, reducing chemical pesticide use and costs. Risk: target pests may develop resistance over time, or non-target beneficial insects may be affected."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.3.3" title="Genetic testing: applications and implications" progress={progress} setProgress={setProgress}>
        <p>Genetic testing analyses a person's DNA to identify specific gene variants, mutations, or chromosomal abnormalities. <Term def="A program that tests newborn babies (usually by a heel-prick blood spot) for treatable conditions such as PKU and cystic fibrosis.">Newborn screening</Term> allows early treatment before symptoms develop. <Term def="Genetic testing that determines whether a healthy individual carries one recessive allele for a genetic condition.">Carrier testing</Term> helps people understand the risk of passing a condition to their children. <Term def="Genetic testing that identifies risk variants before disease onset, enabling preventive action.">Predictive testing</Term> can identify variants like BRCA1/2 that increase breast and ovarian cancer risk. <Term def="The use of a patient's genetic variants to predict their response to specific drugs, enabling personalised prescribing.">Pharmacogenomics</Term> matches drug prescriptions to a patient's genotype.</p>
        <p>While genetic testing offers significant benefits, it also raises complex social, economic, and ethical questions. Knowing you carry a high-risk variant can cause psychological distress. If insurers or employers access genetic data, individuals could face discrimination. Direct-to-consumer testing bypasses medical oversight, raising questions about how results are communicated. For conditions detected prenatally, results may lead to difficult decisions about pregnancy.</p>
        <EthicsDebateTool/>
        <Callout kind="warn" title="Privacy and discrimination">
          Australia's Privacy Act 1988 and the Disability Discrimination Act 1992 provide some protections for genetic information, but gaps remain. In 2019, life insurance companies agreed to a voluntary moratorium on using predictive genetic test results for policies up to certain thresholds. Debate about stronger legal protections continues.
        </Callout>
        <QGroup title="Check yourself">
          <WrittenQ num={20} question="A life insurance company proposes using genetic test results when setting premiums. Give one argument for and one argument against this proposal."
            model="For: insurers argue genetic data allows fairer pricing by identifying high-risk individuals. Against: penalising people for their DNA (which they cannot control) raises serious ethical concerns about privacy and fairness, and could deter people from being tested."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.4: Theory of Evolution and Evidence
   ============================================================ */
function Section4({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.4 The Theory of Evolution and Evidence of Natural Selection</div>
        <h1>Why there are so many species</h1>
        <p className="lead">Natural selection, geographic isolation, and deep time have shaped every living thing on Earth. Explore the evidence and the history of ideas that led to one of biology's greatest unifying theories.</p>
      </div>

      <Figure src="img/natural-selection.png" caption="Better-camouflaged individuals survive and pass on their traits." />
      <DotPoint id="5.4.1" title="Natural selection and isolation drive evolutionary change" progress={progress} setProgress={setProgress}>
        <p><Term def="The process by which individuals with heritable traits better suited to their environment tend to survive and reproduce more, causing those traits to become more common in the population over generations.">Natural selection</Term> operates on the genetic variation that exists within a population. Four conditions are required: variation in traits, a genetic basis for that variation (<Term def="The ability of a trait to be passed from parents to offspring because it has a genetic basis.">heritability</Term>), differential survival and reproduction, and a <Term def="Any environmental factor (predation, disease, food scarcity, climate) that makes some traits more advantageous than others.">selection pressure</Term>. Over generations, advantageous traits become more common; less advantageous traits become rarer.</p>
        <p><Term def="Separation of a population by a physical barrier so that the two groups can no longer interbreed, allowing them to evolve independently.">Geographic isolation</Term> is crucial for <Term def="The process by which one species splits into two or more distinct species, usually following geographic isolation.">speciation</Term>. A barrier such as a mountain range, river, or ocean separates a population into two groups that evolve independently under different selection pressures, accumulating different genetic changes through mutation and natural selection. Over millions of years the two populations may become so different that they can no longer interbreed, making them separate species. Darwin's Galapagos finches are a classic example: one ancestral finch diversified into more than a dozen species across different islands.</p>
        <NaturalSelectionSim/>
        <Callout kind="key" title="Individuals do not evolve">
          A common misconception is that individual organisms evolve during their lifetime. In fact, evolution is a change in allele frequencies across a population over many generations. Individuals are selected for or against, but the population evolves.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={21} question="What must be true of a trait for natural selection to change allele frequencies in a population?"
            options={["The trait must be visible","The trait must be heritable (genetically based)","The trait must be rare","The trait must be beneficial"]} correct={1}
            explain="Only genetic variation can be passed to offspring. Non-genetic changes (like a scar) cannot change allele frequencies across generations."/>
          <WrittenQ num={22} question="Explain why antibiotic resistance in bacteria evolves so much faster than most evolutionary change in animals."
            model="Bacteria have very short generation times (some divide every 20 minutes) and huge population sizes. Resistance mutations arise by chance in large populations. When antibiotics kill susceptible bacteria, resistant ones survive and reproduce rapidly. Within hours or days the whole population can be descended from resistant individuals."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.4.2" title="Evidence for change across geological time" progress={progress} setProgress={setProgress}>
        <p>The history of life on Earth spans approximately 3.8 billion years. The <Term def="The collection of preserved remains and traces of organisms found in sedimentary rock layers, providing a record of past life.">fossil record</Term> is the most direct evidence: fossils form when organisms are buried in <Term def="Rock formed from layers of sediment (sand, silt, or mud) that compact over time. Most fossils are found in sedimentary rock.">sedimentary rock</Term> and their remains are gradually replaced by minerals. By reading rock layers from oldest (deepest) to youngest (shallowest), scientists trace the appearance, change, and disappearance of species over time. <Term def="Fossils that show features intermediate between an ancestral group and a derived group, providing evidence of gradual evolutionary change.">Transitional fossils</Term> such as Tiktaalik (showing fish and tetrapod features) provide direct evidence of gradual change.</p>
        <p>Multiple other lines of evidence support evolution. <Term def="Body structures with the same underlying bone arrangement in different species, indicating descent from a common ancestor. Example: the forelimbs of humans, bats, and whales.">Homologous structures</Term> reveal common ancestry. <Term def="Reduced, non-functional remnants of structures that had clear functions in ancestors. Example: the human tailbone (coccyx) or whale pelvic bones.">Vestigial structures</Term> are evolutionary relics. Molecular evidence shows that the more similar two species' DNA sequences are, the more recently they shared a common ancestor. <Term def="The study of how species are distributed across the planet, which reflects evolutionary history and continental movement.">Biogeography</Term> shows that related species tend to be found in nearby geographic regions.</p>
        <EvidenceEvolutionSorter/>
        <Callout kind="fact" title="Age of life on Earth">
          The earliest fossil evidence of life (single-celled prokaryotes) has been found in ancient Australian rock formations (the Pilbara region) dating to approximately 3.5 billion years ago.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={23} question="Homologous structures in different species are evidence of..."
            options={["Convergent evolution","A common ancestor","Environmental adaptation","Vestigial organs"]} correct={1}
            explain="Homologous structures share the same underlying bone arrangement because species inherited them from a common ancestor, even if the structures now serve different functions."/>
          <WrittenQ num={24} question="Compare the fossil record and molecular evidence as two ways of supporting evolutionary theory. Give one strength and one limitation of each."
            model="Fossil record strength: direct physical evidence with approximate ages from radiometric dating. Limitation: gaps exist as soft-bodied organisms rarely fossilise. Molecular evidence strength: covers all living organisms and provides quantitative comparison. Limitation: only living species can be compared; cannot reveal extinct intermediate forms."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.4.3" title="Aboriginal and Torres Strait Islander knowledge of changing life" progress={progress} setProgress={setProgress}>
        <p>Aboriginal and Torres Strait Islander peoples have lived on the Australian continent for at least 65,000 years, making them the custodians of the world's oldest continuous cultures. Their rock art, cave paintings, and oral traditions record detailed observations of the natural world accumulated over tens of thousands of years. Rock art at sites across Australia depicts animals that are now extinct, providing an independent cultural record that complements scientific fossil evidence.</p>
        <p>Australian <Term def="Large animals (generally over 44 kg) that lived in the past but are now extinct. Australian examples include Diprotodon and the giant kangaroo Procoptodon.">megafauna</Term> were giant animals including <em>Diprotodon optatum</em> (a wombat-like marsupial roughly the size of a hippopotamus) and <em>Procoptodon goliah</em> (a giant short-faced kangaroo about 2 metres tall). These animals became extinct approximately 46,000 to 40,000 years ago. Aboriginal rock art depicting large animals consistent with megafauna species suggests that early Aboriginal peoples encountered these animals, contributing to ongoing scientific debate about the causes of megafauna extinctions (climate change, human hunting, or both).</p>
        <Callout kind="key" title="Respecting First Nations knowledge">
          Aboriginal and Torres Strait Islander ecological knowledge represents tens of thousands of years of systematic observation and should be treated with equal respect to Western scientific knowledge. Interpretations of rock art must be made in consultation with, and with respect for, the communities whose cultural heritage it represents.
        </Callout>
        <Callout kind="tip" title="Cultural burning">
          Aboriginal peoples used controlled burning to manage Australian landscapes for tens of thousands of years, creating a mosaic of vegetation that promoted biodiversity and reduced fuel loads. This practice shaped much of the landscape we see today. Cultural burning is being revived in collaboration with land managers and scientists.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={25} question="Approximately when did Australian megafauna become extinct?"
            options={["5,000 to 10,000 years ago","46,000 to 40,000 years ago","250 million years ago","1 million years ago"]} correct={1}
            explain="Australian megafauna became extinct approximately 46,000 to 40,000 years ago, around the time Aboriginal peoples arrived on the continent."/>
          <WrittenQ num={26} question="Explain how Aboriginal rock art contributes to the scientific understanding of megafauna extinctions."
            model="If Aboriginal rock art depicts animals now known only from fossils (megafauna), it suggests those animals were still alive during the period of human occupation (at least 65,000 years ago). This supports the view that extinctions occurred after human arrival, contributing to debate about whether hunting played a role alongside climate change."/>
        </QGroup>
      </DotPoint>

      <DotPoint id="5.4.4" title="Development of evolutionary theory" progress={progress} setProgress={setProgress}>
        <p>The theory of evolution developed over more than a century of scientific debate. <Term def="French naturalist who proposed one of the first systematic theories of evolution, suggesting organisms changed during their lifetimes and passed acquired characteristics to offspring.">Jean-Baptiste Lamarck</Term> (1744-1829) proposed that organisms changed during their lifetimes in response to the environment and passed these acquired characteristics to offspring. Although his specific mechanism was incorrect (acquired traits are not inherited genetically), he made the important contribution of arguing that species change over time.</p>
        <p><Term def="English naturalist who developed the theory of evolution by natural selection, published in 'On the Origin of Species' in 1859.">Charles Darwin</Term> (1809-1882) and <Term def="British naturalist who independently developed the theory of evolution by natural selection at the same time as Darwin.">Alfred Russel Wallace</Term> (1823-1913) independently developed the theory of evolution by natural selection. Darwin's five-year voyage on HMS Beagle (1831-1836) gave him observations from the Galapagos Islands and South America that led him to question whether species were fixed. In 1858, Darwin and Wallace jointly presented their ideas to the Linnean Society. Darwin published his landmark book <em>On the Origin of Species</em> in 1859. The <Term def="The synthesis in the 1930s to 1940s that united Darwin's natural selection with Mendelian genetics, explaining evolution at the population level.">Modern Evolutionary Synthesis</Term> in the 1930s to 1940s united Darwinian natural selection with Mendelian genetics, creating the foundation for modern evolutionary biology.</p>
        <Callout kind="key" title="Why evolutionary theory matters">
          Evolutionary theory explains why antibiotic resistance arises and informs strategies to slow it. It guides medical research using animal models. It underpins conservation biology, agriculture, and evolutionary medicine. It provides a unified framework connecting genetics, ecology, palaeontology, and molecular biology.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={27} question="What was the main error in Lamarck's theory of evolution?"
            options={["He said species change over time","He thought acquired characteristics are inherited","He believed natural selection drives change","He proposed that variation exists within populations"]} correct={1}
            explain="Lamarck thought traits gained during an organism's lifetime (such as strengthened muscles) could be passed to offspring. This is incorrect: only genetic changes are heritable."/>
          <WrittenQ num={28} question="Explain how the discovery of DNA in the 20th century strengthened rather than replaced Darwin's theory."
            model="Darwin's theory required heritable variation but he did not know how heredity worked. DNA showed that genes are the units of heredity, mutations create heritable variation, and natural selection acts on gene frequencies. Genetics provided the molecular mechanism for everything Darwin described observationally, confirming and extending the theory."/>
        </QGroup>
      </DotPoint>
    </>
  );
}

/* ============================================================
   SECTION 5.5: Genetics and Evolutionary Change in Context
   ============================================================ */
function Section5({ progress, setProgress }) {
  return (
    <>
      <div className="topic-head">
        <div className="eyebrow">5.5 Genetics and Evolutionary Change in Context</div>
        <h1>Science, society and ethical responsibility</h1>
        <p className="lead">Scientific knowledge does not exist in isolation from society. In this section you will use ethical frameworks to build evidence-based arguments about genetic technologies and the remarkable, troubling story of the HeLa cell line.</p>
      </div>

      <DotPoint id="5.5.1" title="Ethical frameworks and the HeLa cell line" progress={progress} setProgress={setProgress}>
        <p>Ethical frameworks provide structured ways to evaluate the implications of scientific actions. <Term def="An ethical approach that evaluates actions based on whether they produce the greatest benefit for the greatest number of people.">Utilitarianism</Term> asks whether an action produces the greatest benefit for the greatest number. <Term def="An ethical approach (deontology) that focuses on whether individuals' fundamental rights to privacy, autonomy, and informed consent are respected, regardless of outcomes.">Rights-based ethics</Term> focuses on whether individual rights (to privacy, autonomy, <Term def="The principle that research participants must be given accurate information and must voluntarily agree before their biological materials are used.">informed consent</Term>) are respected, regardless of outcomes. A justice framework asks whether benefits and burdens are distributed fairly across different groups in society.</p>
        <p>In January 1951, Henrietta Lacks, a 31-year-old African American woman, was treated for cervical cancer at Johns Hopkins Hospital in Baltimore, USA. Without her knowledge or consent, a sample of her tumour cells was taken by researcher George Gey. These cells, named <Term def="The first immortal human cell line, taken from Henrietta Lacks in 1951 without her consent. Used in thousands of medical advances including the polio vaccine.">HeLa cells</Term>, could divide indefinitely in laboratory culture, the first human cells to do so. Henrietta Lacks died in October 1951. HeLa cells went on to contribute to the development of the polio vaccine, cancer research, virology, drug testing, in vitro fertilisation, and thousands of other advances. Pharmaceutical companies have profited significantly. The Lacks family knew nothing of the cells until the 1970s and received no compensation.</p>
        <p>In 2013, a German research group published the full HeLa genome online, making the Lacks family's genetic information publicly accessible without their consent. This renewed concerns about genetic privacy. The case has become a landmark in discussions about <Term def="The right of research participants to give voluntary, informed agreement before their tissue is used in research.">informed consent</Term>, racial justice in medical research, who owns human biological materials, and the responsibilities of scientists and institutions toward research participants.</p>
        <Callout kind="key" title="Constructing an evidence-based ethical argument">
          A strong ethical argument: (1) states your position clearly, (2) applies at least one named ethical framework, (3) uses specific factual evidence, (4) acknowledges and responds to counterarguments, (5) considers whose interests are affected, and (6) reaches a reasoned conclusion.
        </Callout>
        <Callout kind="warn" title="Racial and social context">
          Henrietta Lacks was an African American woman treated at a segregated public hospital. Her community disproportionately bore the costs (cells taken without consent, no compensation) while institutions in predominantly white settings reaped the benefits. An ethical analysis that ignores race and class fails to account for the full pattern of injustice in the case.
        </Callout>
        <QGroup title="Check yourself">
          <MCQ num={29} question="Which ethical framework argues that actions should be judged by whether individual rights to autonomy and consent are respected?"
            options={["Utilitarianism","Rights-based (deontological) ethics","Justice framework","Virtue ethics"]} correct={1}
            explain="Rights-based (deontological) ethics focuses on whether individual rights are respected, regardless of the overall outcome."/>
          <WrittenQ num={30} question="Apply a utilitarian framework to evaluate whether the continued use of HeLa cells in medical research today is ethically justifiable."
            model="A utilitarian analysis weighs total benefits against total harms. Benefits: HeLa cells have enabled lifesaving advances (polio vaccine, cancer research) benefiting millions globally. Harms: the Lacks family received no compensation; the precedent undermines trust in medical research. A strict utilitarian might justify continued use given the vast benefit, but a nuanced analysis notes that normalising non-consent has broader costs to public trust."/>
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
  topicTitle: "Genetics and Evolutionary Change",
  heroImage: "img/hero.png",
  strand: "Stage 5 · NSW Science",
  accent: "pink",
  storageKey: "y10.genetics",
  hubHref: "../",
  intro: "From the twisted ladder of DNA to the diversity of life across billions of years, genetics and evolution are connected stories. In this topic you will uncover how genetic information is structured, copied, and inherited; how mutations and natural selection drive evolutionary change; how genetic technologies are transforming medicine and agriculture; and how we weigh the benefits of scientific discovery against our ethical responsibilities to individuals and communities.",
  glossary: {
    "DNA": "Deoxyribonucleic acid. The molecule that carries the genetic code as a sequence of four chemical bases (A, T, C, G).",
    "nucleotide": "The building block of DNA, consisting of a deoxyribose sugar, a phosphate group, and a nitrogenous base.",
    "complementary base pairing": "The rule that adenine (A) always pairs with thymine (T), and cytosine (C) always pairs with guanine (G) in a DNA double helix.",
    "double helix": "The twisted-ladder shape of the DNA molecule, formed by two antiparallel strands coiled around each other.",
    "gene": "A specific segment of DNA that encodes instructions for making one protein or functional RNA. The basic unit of inheritance.",
    "chromosome": "A tightly coiled structure of one DNA molecule and histone proteins. Human body cells contain 46.",
    "genome": "The complete set of genetic information in an organism, covering all its chromosomes.",
    "allele": "One version of a gene. At each gene locus, an organism carries two alleles, one from each parent.",
    "genotype": "The specific alleles an organism carries at a gene locus.",
    "phenotype": "The observable characteristics of an organism, produced by the interaction of genotype and environment.",
    "dominant allele": "An allele that produces its phenotype whenever it is present, masking the effect of a recessive allele.",
    "recessive allele": "An allele that only produces its phenotype when two copies are present (homozygous recessive).",
    "homozygous": "Having two identical alleles at a gene locus (e.g. TT or tt).",
    "heterozygous": "Having two different alleles at a gene locus (e.g. Tt).",
    "mutation": "Any change to the sequence of bases in a DNA molecule.",
    "mutagen": "An environmental agent that causes mutations in DNA, such as UV radiation, X-rays, or certain chemicals.",
    "natural selection": "The process by which individuals with heritable traits better suited to their environment tend to survive and reproduce more, causing those traits to become more common over generations.",
    "evolution": "Change in the heritable characteristics of a population over successive generations.",
    "speciation": "The process by which one species splits into two or more distinct species, usually following geographic isolation.",
    "fossil record": "The collection of preserved remains and traces of organisms found in sedimentary rock layers.",
    "homologous structures": "Body parts with the same underlying structural arrangement in different species, indicating descent from a common ancestor.",
    "vestigial structures": "Reduced, non-functional remnants of structures that had clear functions in ancestors.",
    "meiosis": "Cell division that halves the chromosome number and shuffles genetic information, producing four genetically unique gametes.",
    "gamete": "A specialised sex cell (sperm or egg) carrying half the chromosome number, produced by meiosis.",
    "CRISPR-Cas9": "A precise gene-editing tool that uses a guide RNA to locate a specific DNA sequence and a Cas9 enzyme to cut and modify it.",
    "recombinant DNA": "DNA formed by combining genetic material from two different organisms using molecular biology techniques.",
    "informed consent": "The principle that research participants must be given accurate information and must voluntarily agree before their biological materials are used.",
    "HeLa cells": "The first immortal human cell line, taken from Henrietta Lacks in 1951 without her consent. Widely used in medical research.",
    "pedigree": "A family tree diagram that tracks the inheritance of a specific trait across multiple generations using standard symbols.",
    "polygenic inheritance": "Inheritance in which a single trait is influenced by the combined effects of many genes.",
  },
  sections: [
    {
      id: "5.1",
      label: "DNA Structure",
      accent: "pink",
      blurb: "From nucleotides to the double helix, and the story of its discovery.",
      points: ["5.1.1","5.1.2","5.1.3","5.1.4"],
      render: (p) => <Section1 {...p}/>,
    },
    {
      id: "5.2",
      label: "Variation and Inheritance",
      accent: "violet",
      blurb: "How traits are passed on, predicted, and changed by mutation.",
      points: ["5.2.1","5.2.2","5.2.3","5.2.4","5.2.5"],
      render: (p) => <Section2 {...p}/>,
    },
    {
      id: "5.3",
      label: "Genetic Technologies",
      accent: "blue",
      blurb: "PCR, CRISPR, GM crops, gene therapy, and the ethics of testing.",
      points: ["5.3.1","5.3.2","5.3.3"],
      render: (p) => <Section3 {...p}/>,
    },
    {
      id: "5.4",
      label: "Evolution",
      accent: "emerald",
      blurb: "Natural selection, the fossil record, and the history of evolutionary theory.",
      points: ["5.4.1","5.4.2","5.4.3","5.4.4"],
      render: (p) => <Section4 {...p}/>,
    },
    {
      id: "5.5",
      label: "Ethics in Context",
      accent: "amber",
      blurb: "Ethical frameworks and the HeLa cell line case study.",
      points: ["5.5.1"],
      render: (p) => <Section5 {...p}/>,
    },
  ],
});
