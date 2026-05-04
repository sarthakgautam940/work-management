export const SAT_TEST_DATE = "2026-10-03";

export type SATModule = {
  id: string;
  section: "math" | "rw";
  title: string;
  detail: string;
  hours: number;
};

export const SAT_MATH: SATModule[] = [
  { id: "sm1", section: "math", title: "Algebra", detail: "Linear equations, systems, inequalities, linear functions", hours: 8 },
  { id: "sm2", section: "math", title: "Advanced Math", detail: "Quadratics, polynomials, exponentials, radical/rational equations", hours: 10 },
  { id: "sm3", section: "math", title: "Problem Solving + Data", detail: "Ratios, percentages, statistics, probability, tables", hours: 8 },
  { id: "sm4", section: "math", title: "Geometry + Trig", detail: "Area, volume, circles, right triangles, coordinates", hours: 8 },
  { id: "sm5", section: "math", title: "Full Math Practice Tests", detail: "Timed sections, official tests, error log", hours: 10 },
];

export const SAT_RW: SATModule[] = [
  { id: "sr1", section: "rw", title: "Information & Ideas", detail: "Central ideas, evidence, inferences", hours: 6 },
  { id: "sr2", section: "rw", title: "Craft & Structure", detail: "Words in context, text structure, cross-text", hours: 6 },
  { id: "sr3", section: "rw", title: "Expression of Ideas", detail: "Rhetorical synthesis, transitions", hours: 5 },
  { id: "sr4", section: "rw", title: "Standard English", detail: "Run-ons, fragments, agreement, punctuation", hours: 7 },
  { id: "sr5", section: "rw", title: "Full RW Practice Tests", detail: "Timed sections, annotation, elimination", hours: 8 },
];

export type VocabCard = {
  word: string;
  definition: string;
  example: string;
};

export const VOCAB: VocabCard[] = [
  { word: "Abate", definition: "To reduce in intensity or amount", example: "The storm gradually abated." },
  { word: "Aberration", definition: "A departure from what is normal", example: "The result was an aberration." },
  { word: "Acumen", definition: "Keenness of judgment", example: "Business acumen made her successful." },
  { word: "Ameliorate", definition: "To make something bad better", example: "New policies ameliorated the crisis." },
  { word: "Ambiguous", definition: "Open to multiple interpretations", example: "The wording was frustratingly ambiguous." },
  { word: "Ambivalent", definition: "Having mixed feelings", example: "She felt ambivalent about the decision." },
  { word: "Apathetic", definition: "Showing no interest or concern", example: "He was apathetic about politics." },
  { word: "Arbitrary", definition: "Based on random choice rather than reason", example: "The rule seemed arbitrary." },
  { word: "Austere", definition: "Severe, plain, or without luxury", example: "The room had an austere simplicity." },
  { word: "Banal", definition: "Lacking originality; obvious", example: "His speech was banal and forgettable." },
  { word: "Bolster", definition: "To support or strengthen", example: "Evidence bolstered her argument." },
  { word: "Brevity", definition: "Concise expression; shortness", example: "Brevity is the soul of wit." },
  { word: "Cacophony", definition: "Harsh, jarring noise", example: "A cacophony of horns filled the street." },
  { word: "Candid", definition: "Truthful and straightforward", example: "She gave a candid assessment." },
  { word: "Capricious", definition: "Given to sudden changes of mood", example: "His capricious nature confused everyone." },
  { word: "Circumspect", definition: "Careful and cautious", example: "He was circumspect before committing." },
  { word: "Coalesce", definition: "To come together to form one", example: "The groups coalesced around the cause." },
  { word: "Cogent", definition: "Clear, logical, convincing", example: "She made a cogent argument." },
  { word: "Conciliate", definition: "To pacify or appease", example: "He tried to conciliate the angry crowd." },
  { word: "Contentious", definition: "Causing controversy or argument", example: "It remains a contentious topic." },
  { word: "Corroborate", definition: "To confirm with evidence", example: "Witnesses corroborated her story." },
  { word: "Deference", definition: "Respectful submission to another", example: "He bowed in deference to the elder." },
  { word: "Deleterious", definition: "Causing harm or damage", example: "Smoking has deleterious effects." },
  { word: "Didactic", definition: "Intended to teach or instruct", example: "The novel had a didactic tone." },
  { word: "Disparate", definition: "Fundamentally different or unrelated", example: "The data came from disparate sources." },
  { word: "Eclectic", definition: "Drawn from many sources", example: "She had eclectic taste in music." },
  { word: "Eloquent", definition: "Fluent and persuasive in expression", example: "An eloquent speech moved the crowd." },
  { word: "Empirical", definition: "Based on observation or experience", example: "Empirical evidence supports the theory." },
  { word: "Ephemeral", definition: "Lasting a very short time", example: "Social trends are often ephemeral." },
  { word: "Equivocal", definition: "Open to more than one interpretation", example: "His equivocal answer raised suspicions." },
  { word: "Erudite", definition: "Having or showing great knowledge", example: "The professor was deeply erudite." },
  { word: "Esoteric", definition: "Understood by only a few", example: "The lecture was too esoteric." },
  { word: "Exacerbate", definition: "To make a problem worse", example: "Stress exacerbates most conditions." },
  { word: "Extol", definition: "To praise enthusiastically", example: "Critics extolled the film." },
  { word: "Fastidious", definition: "Very attentive to detail", example: "He was fastidious about cleanliness." },
  { word: "Fortuitous", definition: "Happening by chance", example: "Their meeting was fortuitous." },
  { word: "Garrulous", definition: "Excessively talkative", example: "The garrulous host wouldn't stop talking." },
  { word: "Hackneyed", definition: "Lacking freshness, overused", example: "The plot was hackneyed and predictable." },
  { word: "Iconoclast", definition: "One who attacks tradition", example: "She was an iconoclast in her field." },
  { word: "Indolent", definition: "Habitually lazy", example: "His indolent attitude annoyed his boss." },
  { word: "Lucid", definition: "Clearly expressed; easy to understand", example: "A lucid explanation helped everyone." },
  { word: "Magnanimous", definition: "Generous, especially to a rival", example: "The winner was magnanimous in victory." },
  { word: "Mitigate", definition: "To lessen severity or impact", example: "Preparation mitigates exam anxiety." },
  { word: "Nefarious", definition: "Wicked or criminal", example: "Their nefarious plot was uncovered." },
  { word: "Obstinate", definition: "Stubbornly refusing to change", example: "His obstinate refusal frustrated her." },
  { word: "Pragmatic", definition: "Dealing with things practically", example: "She took a pragmatic view." },
  { word: "Quixotic", definition: "Idealistic and impractical", example: "His quixotic plan was doomed." },
  { word: "Reticent", definition: "Reserved or restrained", example: "He was reticent about his past." },
  { word: "Tenacious", definition: "Holding firmly; persistent", example: "Her tenacious effort paid off." },
  { word: "Vindicate", definition: "To clear from blame", example: "New evidence vindicated him." },
];
