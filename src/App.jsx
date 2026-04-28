import { useState } from 'react';
import { ChevronRight, ChevronLeft, BarChart3, Sparkles } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "Wie ist die aktuelle Auslastung deines Ferienhauses?",
    options: ["Unter 30 %", "30–50 %", "50–70 %", "Über 70 %", "Ich weiß es nicht"],
    scores: [
      { occupancy: 3, visibility: 0, offer: 0, pricing: 0, strategy: 1 },
      { occupancy: 2, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 1, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 2, visibility: 0, offer: 0, pricing: 0, strategy: 2 }
    ]
  },
  {
    id: 2,
    text: "Was ist aktuell das größte Problem?",
    options: ["Zu wenig Buchungen", "Zu wenig Anfragen", "Zu niedrige Preise", "Zu viele Lücken", "Ich weiß nicht"],
    scores: [
      { occupancy: 2, visibility: 1, offer: 1, pricing: 0, strategy: 1 },
      { occupancy: 1, visibility: 3, offer: 1, pricing: 0, strategy: 1 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 3, strategy: 1 },
      { occupancy: 3, visibility: 0, offer: 0, pricing: 1, strategy: 1 },
      { occupancy: 1, visibility: 1, offer: 1, pricing: 1, strategy: 3 }
    ]
  },
  {
    id: 3,
    text: "Über welche Kanäle kommen deine Buchungen?",
    options: ["Nur Airbnb", "Nur Booking.com", "Beide Plattformen", "Direktbuchungen", "Ohne Strategie"],
    scores: [
      { occupancy: 0, visibility: 1, offer: 1, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 1, offer: 1, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 1, visibility: 2, offer: 1, pricing: 0, strategy: 3 }
    ]
  },
  {
    id: 4,
    text: "Wie gut wird dein Ferienhaus online gefunden?",
    options: ["Sehr schlecht", "Mittelmäßig", "Ganz gut", "Sehr gut", "Unsicher"],
    scores: [
      { occupancy: 1, visibility: 3, offer: 0, pricing: 0, strategy: 1 },
      { occupancy: 0, visibility: 2, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 1, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 2, offer: 0, pricing: 0, strategy: 2 }
    ]
  },
  {
    id: 5,
    text: "Wie stark wirkt dein Inserat im Vergleich?",
    options: ["Eher schwach", "Durchschnitt", "Ganz gut", "Sehr professionell", "Kein Vergleich"],
    scores: [
      { occupancy: 1, visibility: 1, offer: 3, pricing: 0, strategy: 1 },
      { occupancy: 0, visibility: 0, offer: 2, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 1, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 1, offer: 2, pricing: 0, strategy: 2 }
    ]
  },
  {
    id: 6,
    text: "Wie sicher bist du bei der Preisstrategie?",
    options: ["Sehr unsicher", "Orientiere mich an anderen", "Passe gelegentlich an", "Durchdachte Strategie", "Weiß nicht"],
    scores: [
      { occupancy: 0, visibility: 0, offer: 0, pricing: 3, strategy: 1 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 2, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 1, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 2, strategy: 2 }
    ]
  },
  {
    id: 7,
    text: "Was ist dir das wichtigste Ziel?",
    options: ["Mehr Buchungen", "Höhere Auslastung", "Bessere Preise", "Weniger Leerstand", "Gesamtstrategie"],
    scores: [
      { occupancy: 2, visibility: 1, offer: 1, pricing: 0, strategy: 0 },
      { occupancy: 3, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 3, strategy: 0 },
      { occupancy: 2, visibility: 1, offer: 0, pricing: 1, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 3 }
    ]
  },
  {
    id: 8,
    text: "Wie dringend möchtest du verbessern?",
    options: ["Sofort", "Nächste Wochen", "1–3 Monate", "Langfristig", "Erst verstehen"],
    scores: [
      { occupancy: 1, visibility: 1, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 },
      { occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 2 }
    ]
  }
];

const diagnoses = {
  occupancy: {
    title: "Auslastungsproblem",
    text: "Dein Ferienhaus schöpft sein Potenzial nicht konstant aus. Entscheidend ist jetzt ein strukturierter Plan, der Kalenderlücken, Buchungsphasen und Angebotswirkung zusammen betrachtet."
  },
  visibility: {
    title: "Sichtbarkeitsproblem",
    text: "Dein Ferienhaus muss erst von passenden Gästen gefunden werden. Hier entscheidet nicht ein einzelner Plattform-Eintrag, sondern die gesamte Auffindbarkeit und Positionierung."
  },
  offer: {
    title: "Angebotsproblem",
    text: "Dein Ferienhaus kann gut sein und trotzdem zu wenig Buchungen erzielen, wenn Bilder, Texte und Vertrauen nicht stark genug wirken."
  },
  pricing: {
    title: "Preisstrategieproblem",
    text: "Wenn Preise nicht zur Nachfrage, Saison und Zielgruppe passen, entstehen entweder Leerstand oder verschenktes Umsatzpotenzial."
  },
  strategy: {
    title: "Strategieproblem",
    text: "Ohne strukturierten Handlungsplan bleibt oft unklar, welche Maßnahme zuerst den größten Effekt bringt."
  }
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({ occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 });
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState('next');

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const question = questions[currentQuestion];
    const scoreUpdate = question.scores[selectedOption];
    
    setScores(prev => ({
      occupancy: prev.occupancy + scoreUpdate.occupancy,
      visibility: prev.visibility + scoreUpdate.visibility,
      offer: prev.offer + scoreUpdate.offer,
      pricing: prev.pricing + scoreUpdate.pricing,
      strategy: prev.strategy + scoreUpdate.strategy
    }));

    setAnswers([...answers, selectedOption]);

    if (currentQuestion < questions.length - 1) {
      setDirection('next');
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      }, 300);
    } else {
      setDirection('next');
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection('prev');
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
      
      const question = questions[currentQuestion - 1];
      const lastAnswer = answers[answers.length - 1];
      const scoreUpdate = question.scores[lastAnswer];
      
      setScores(prev => ({
        occupancy: prev.occupancy - scoreUpdate.occupancy,
        visibility: prev.visibility - scoreUpdate.visibility,
        offer: prev.offer - scoreUpdate.offer,
        pricing: prev.pricing - scoreUpdate.pricing,
        strategy: prev.strategy - scoreUpdate.strategy
      }));
      
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setSelectedOption(answers[answers.length - 1]);
      }, 300);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers([]);
    setScores({ occupancy: 0, visibility: 0, offer: 0, pricing: 0, strategy: 0 });
    setShowResults(false);
    setDirection('next');
  };

  const getTopDiagnosis = () => {
    const entries = Object.entries(scores);
    const max = entries.reduce((a, b) => a[1] > b[1] ? a : b);
    return max[0];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col max-w-xl mx-auto px-6">
        {/* Header */}
        {!showResults && (
          <div className="flex items-center justify-between py-6 border-b border-white/10">
            <div className="text-sm font-bold tracking-wider bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">
              OSION
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50 font-medium">
                {currentQuestion + 1}<span className="text-white/30">/8</span>
              </span>
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-violet-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center relative">
          {!showResults ? (
            <div 
              key={currentQuestion}
              className={`${direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
            >
              {/* Question Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse-glow"></div>
                <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
                  Frage {currentQuestion + 1}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-semibold leading-tight mb-8">
                {questions[currentQuestion].text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left
                      ${selectedOption === idx 
                        ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${selectedOption === idx 
                        ? 'border-violet-500 bg-violet-500' 
                        : 'border-white/30'
                      }`}
                    >
                      {selectedOption === idx && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-sm md:text-base font-medium">{option}</span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className="flex-1 py-4 rounded-xl border border-white/20 text-white/70 font-semibold 
                    hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Zurück
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-rose-500 via-violet-500 to-purple-500 
                    text-white font-semibold hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)] transition-all 
                    disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Weiter
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col animate-fade-in">
              {/* Results Header */}
              <div className="text-center pt-4 pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-500 
                  flex items-center justify-center shadow-[0_12px_40px_rgba(139,92,246,0.3)] animate-float"
                >
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Deine Ergebnisse
                </h2>
                <p className="text-sm text-white/50 mt-1">Basierend auf deinen Antworten</p>
              </div>

              {/* Scrollable Results */}
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-1">
                {/* Diagnosis Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-2">
                    Hauptdiagnose
                  </div>
                  <h3 className="text-lg font-bold mb-3">{diagnoses[getTopDiagnosis()].title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {diagnoses[getTopDiagnosis()].text}
                  </p>
                </div>

                {/* Consequence */}
                <div className="border-l-2 border-rose-500 bg-rose-500/5 rounded-r-xl p-4">
                  <p className="text-sm text-white/70 italic">
                    Ohne strukturierten Plan werden einzelne Änderungen ausprobiert, ohne die Ursache zu bearbeiten.
                  </p>
                </div>

                {/* CTA Box */}
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/20 via-violet-500/20 to-purple-500/20 opacity-50"></div>
                  
                  <div className="relative">
                    <h3 className="text-lg font-bold mb-2">OSION-Handlungsplan</h3>
                    <p className="text-sm text-white/70 mb-4">
                      Zeigt dir, welche Hebel du in welcher Reihenfolge angebst.
                    </p>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                        <Sparkles className="w-4 h-4" />
                        Eine Buchung bezahlt den Plan mehrfach
                      </div>
                    </div>
                    
                    <a
                      href="#angebot"
                      className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-violet-500 to-purple-500 
                        text-white font-semibold text-center hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)] transition-all"
                    >
                      Handlungsplan ansehen →
                    </a>
                  </div>
                </div>
              </div>

              {/* Restart Button */}
              <div className="pt-4 pb-2">
                <button
                  onClick={handleRestart}
                  className="w-full py-3 rounded-xl border border-white/20 text-white/70 font-medium 
                    hover:bg-white/5 hover:text-white transition-all text-sm"
                >
                  ↻ Neu starten
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;