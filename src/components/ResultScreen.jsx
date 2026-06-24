import "./ResultScreen.css";

function grade(score, max) {
  const pct = score / max;
  if (pct >= 0.9) return { label: "Film Critic", emoji: "🏆" };
  if (pct >= 0.7) return { label: "Cinephile", emoji: "🎬" };
  if (pct >= 0.5) return { label: "Casual Viewer", emoji: "🍿" };
  return { label: "First Timer", emoji: "🎟️" };
}

export default function ResultScreen({ history, totalScore, totalCards, onRestart }) {
  const maxScore = totalCards * 3;
  const correct = history.filter(h => h.correct).length;
  const g = grade(totalScore, maxScore);

  return (
    <div className="rs">
      <div className="rs-card">
        <div className="rs-emoji">{g.emoji}</div>
        <h1 className="rs-title">{g.label}</h1>
        <div className="rs-score">
          <span className="rs-score-val">{totalScore}</span>
          <span className="rs-score-max">/ {maxScore} pts</span>
        </div>
        <p className="rs-subtitle">{correct} of {totalCards} movies guessed correctly</p>

        <div className="rs-breakdown">
          {history.map((h, i) => (
            <div className="rs-row" key={i}>
              <span className={h.correct ? "rs-icon-ok" : "rs-icon-no"}>
                {h.correct ? "✓" : "✗"}
              </span>
              <span className="rs-name">{h.card.answer}</span>
              <span className="rs-hint">{h.hintsUsed > 0 ? `${h.hintsUsed} hint${h.hintsUsed > 1 ? "s" : ""}` : "No hints"}</span>
              <span className={h.correct ? "rs-pts-ok" : "rs-pts-no"}>+{h.points}</span>
            </div>
          ))}
        </div>

        <button className="rs-btn" onClick={onRestart}>Play again</button>
      </div>
    </div>
  );
}