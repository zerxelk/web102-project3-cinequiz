import { useState, useRef, useEffect } from "react";
import "./GameCard.css";

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function isCorrect(input, card) {
  const norm = normalize(input);
  if (!norm) return false;
  const targets = [card.answer, ...card.altAnswers].map(normalize);
  return targets.some(t => norm === t || t.includes(norm) || norm.includes(t));
}

export default function GameCard({ card, onCorrect, onSkip, onNext, onPrev, cardIndex, totalCards, maxPoints }) {
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [guess, setGuess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function handleRevealHint() {
    if (hintsRevealed < card.hints.length) {
      setHintsRevealed(h => h + 1);
    }
  }

  function handleSubmit(e) {
    e?.preventDefault();
    if (submitted || !guess.trim()) return;

    if (isCorrect(guess, card)) {
      setCorrect(true);
      setSubmitted(true);
      onCorrect(hintsRevealed);     // no more setTimeout — user navigates manually
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
      setGuess("");
    }
  }

  function handleSkip() {
    setSubmitted(true);
    setCorrect(false);
    onSkip(hintsRevealed);          // no more setTimeout
  }

  const pointsLeft = Math.max(1, maxPoints - hintsRevealed);
  const hintsLeft = card.hints.length - hintsRevealed;

  return (
    <div className={`gc ${submitted ? (correct ? "gc--correct" : "gc--skip") : ""}`}>

      {/* Quote */}
      <div className="gc-quote-wrap">
        <span className="gc-quote-mark">"</span>
        <p className="gc-quote">{card.quote}</p>
        <span className="gc-quote-mark gc-quote-mark--close">"</span>
        <div className="gc-year">{card.year}</div>
        {!submitted && (
          <div className="gc-pts-badge">{pointsLeft} {pointsLeft === 1 ? "pt" : "pts"}</div>
        )}
        {submitted && (
          <div className={`gc-answer-overlay ${correct ? "gc-answer-overlay--correct" : "gc-answer-overlay--skip"}`}>
            <span className="gc-answer-icon">{correct ? "✓" : "✗"}</span>
            <span className="gc-answer-text">{card.answer}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="gc-body">
        <div className="gc-hints">
          {Array.from({ length: hintsRevealed }).map((_, i) => (
            <div className="gc-hint" key={i}>
              <span className="gc-hint-num">{i + 1}</span>
              <span className="gc-hint-text">{card.hints[i]}</span>
            </div>
          ))}

          {!submitted && hintsLeft > 0 && (
            <button className="gc-hint-btn" onClick={handleRevealHint}>
              Reveal hint {hintsRevealed + 1} of {card.hints.length}
              <span className="gc-hint-cost">−1 pt</span>
            </button>
          )}

          {!submitted && hintsLeft === 0 && (
            <p className="gc-no-hints">No more hints — take your best guess!</p>
          )}
        </div>

        {!submitted ? (
          <form className="gc-form" onSubmit={handleSubmit}>
            <div className={`gc-input-wrap ${wrong ? "gc-input-wrap--wrong" : ""}`}>
              <input
                ref={inputRef}
                className="gc-input"
                type="text"
                placeholder="Name that movie..."
                value={guess}
                onChange={e => setGuess(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div className="gc-actions">
              <button type="submit" className="gc-btn-primary" disabled={!guess.trim()}>
                Guess
              </button>
              <button type="button" className="gc-btn-skip" onClick={handleSkip}>
                Give up
              </button>
            </div>
          </form>
        ) : (
          <div className="gc-result">
            {correct
              ? <div className="gc-result-correct">Correct! +{Math.max(1, maxPoints - hintsRevealed)} pts</div>
              : <div className="gc-result-skip">The answer was <strong>{card.answer}</strong></div>
            }
            <div className="gc-result-fact">💡 {card.funFact}</div>
            <div className="gc-nav-buttons">
              <button 
                className="gc-nav-btn gc-nav-btn--back" 
                onClick={onPrev}
                disabled={cardIndex === 0}
              >
                ← Back
              </button>
              <button 
                className="gc-nav-btn gc-nav-btn--next" 
                onClick={onNext}
              >
                {cardIndex === totalCards - 1 ? "See Results →" : "Next Card →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}