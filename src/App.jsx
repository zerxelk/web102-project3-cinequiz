import { useState } from "react";
import GameCard from "./components/GameCard";
import ResultScreen from "./components/ResultScreen";
import "./App.css";

const CLEAN_CARDS = [
  {
    id: 1,
    quote: "Why so serious?",
    answer: "The Dark Knight",
    altAnswers: ["dark knight", "batman dark knight"],
    year: 2008,
    hints: [
      "This film is a superhero movie directed by Christopher Nolan.",
      "The villain who delivers this line is played by Heath Ledger.",
      "The hero is a billionaire who fights crime in Gotham City.",
    ],
    funFact: "Heath Ledger won a posthumous Academy Award for his role in this film.",
  },
  {
    id: 2,
    quote: "To infinity and beyond!",
    answer: "Toy Story",
    altAnswers: ["toy story 1"],
    year: 1995,
    hints: [
      "This was the first fully computer-animated feature film.",
      "The character who says this believes he is a real space ranger, not a toy.",
      "The film follows toys that come to life when humans aren't watching.",
    ],
    funFact: "Tom Hanks and Tim Allen voiced the two main characters.",
  },
  {
    id: 3,
    quote: "Just keep swimming.",
    answer: "Finding Nemo",
    altAnswers: ["nemo"],
    year: 2003,
    hints: [
      "This is an animated Pixar film set mostly underwater.",
      "The character who says this has short-term memory loss.",
      "A father crosses the entire ocean to find his missing son.",
    ],
    funFact: "The film made clownfish so popular as pets that wild clownfish populations dropped significantly after release.",
  },
  {
    id: 4,
    quote: "I see dead people.",
    answer: "The Sixth Sense",
    altAnswers: ["sixth sense"],
    year: 1999,
    hints: [
      "This is a supernatural thriller with one of cinema's most famous twist endings.",
      "A child psychologist tries to help a young boy with a frightening ability.",
      "The director is M. Night Shyamalan.",
    ],
    funFact: "The film was marketed with almost no mention of its twist, which still shocked audiences worldwide.",
  },
  {
    id: 5,
    quote: "You can't handle the truth!",
    answer: "A Few Good Men",
    altAnswers: ["few good men"],
    year: 1992,
    hints: [
      "This is a courtroom drama directed by Rob Reiner.",
      "The line is delivered by a senior military officer under cross-examination.",
      "Tom Cruise plays a young lawyer taking on a powerful Marine colonel.",
    ],
    funFact: "Jack Nicholson's entire courtroom performance was shot in just five days.",
  },
  {
    id: 6,
    quote: "There's no place like home.",
    answer: "The Wizard of Oz",
    altAnswers: ["wizard of oz"],
    year: 1939,
    hints: [
      "This classic fantasy film is one of the most watched movies in history.",
      "The main character clicks her heels together three times while saying this.",
      "A girl from Kansas is swept away to a magical land and tries to find her way back.",
    ],
    funFact: "The ruby slippers worn in this film sold at auction for over 3 million dollars.",
  },
  {
    id: 7,
    quote: "Life is like a box of chocolates — you never know what you're gonna get.",
    answer: "Forrest Gump",
    altAnswers: ["forest gump"],
    year: 1994,
    hints: [
      "This film spans several decades of American history.",
      "The main character accidentally influences many major historical events.",
      "Tom Hanks won his second consecutive Oscar for this role.",
    ],
    funFact: "The famous bench scenes were filmed in Savannah, Georgia.",
  },
  {
    id: 8,
    quote: "I'm going to make him an offer he can't refuse.",
    answer: "The Godfather",
    altAnswers: ["godfather"],
    year: 1972,
    hints: [
      "This is widely considered one of the greatest films ever made.",
      "It follows a powerful Italian-American crime family in New York.",
      "Marlon Brando plays the aging patriarch in this Francis Ford Coppola classic.",
    ],
    funFact: "Marlon Brando stuffed his cheeks with cotton during his audition to look more intimidating — it became the character.",
  },
  {
    id: 9,
    quote: "Here's looking at you, kid.",
    answer: "Casablanca",
    altAnswers: ["casa blanca"],
    year: 1942,
    hints: [
      "This classic black-and-white film is set during World War II.",
      "It takes place in a Moroccan city where refugees try to escape to America.",
      "Humphrey Bogart plays a cynical nightclub owner who reunites with a lost love.",
    ],
    funFact: "This film appears on more 'greatest movies ever made' lists than almost any other.",
  },
  {
    id: 10,
    quote: "You talking to me?",
    answer: "Taxi Driver",
    altAnswers: ["taxi driver"],
    year: 1976,
    hints: [
      "This Martin Scorsese film is set in a gritty, crime-ridden New York City.",
      "The main character is a lonely, insomniac cab driver who becomes increasingly unstable.",
      "Robert De Niro delivers this line while practising in front of a mirror.",
    ],
    funFact: "Robert De Niro actually worked as a real taxi driver in New York to prepare for this role.",
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scoreForHints(hintsUsed) {
  return Math.max(1, 3 - hintsUsed);
}

export default function App() {
  const [deck, setDeck] = useState(CLEAN_CARDS);          // ordered deck (shuffle changes this)
  const [cardIndex, setCardIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([]);

  // NEW: streak counters
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const currentCard = deck[cardIndex];
  const totalCards = deck.length;

  function handleCorrect(usedHints) {
    const pts = scoreForHints(usedHints);
    const newHistory = [...history, { card: currentCard, hintsUsed: usedHints, correct: true, points: pts }];
    setTotalScore(s => s + pts);
    setHistory(newHistory);

    // update streaks
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);
    if (newStreak > longestStreak) setLongestStreak(newStreak);
  }

  function handleSkip(usedHints) {
    const newHistory = [...history, { card: currentCard, hintsUsed: usedHints, correct: false, points: 0 }];
    setHistory(newHistory);
    setCurrentStreak(0);  // break streak on give up
  }

  // NEW: go to next card (or end game if on last)
  function goNext() {
    if (cardIndex + 1 >= totalCards) {
      setGameOver(true);
    } else {
      setCardIndex(i => i + 1);
    }
  }

  // NEW: go to previous card
  function goPrev() {
    if (cardIndex > 0) setCardIndex(i => i - 1);
  }

  // NEW: shuffle the deck and reset position
  function handleShuffle() {
    setDeck(shuffleArray(CLEAN_CARDS));
    setCardIndex(0);
    setCurrentStreak(0);
  }

  function handleRestart() {
    setDeck(CLEAN_CARDS);
    setCardIndex(0);
    setTotalScore(0);
    setGameOver(false);
    setHistory([]);
    setCurrentStreak(0);
    setLongestStreak(0);
  }

  if (gameOver) {
    return (
      <ResultScreen
        history={history}
        totalScore={totalScore}
        totalCards={totalCards}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">🎬</span>
          <span className="brand-name">CineQuiz</span>
        </div>
        <div className="scorebar">
          <span className="scorebar-item">
            <span className="scorebar-label">Card</span>
            <span className="scorebar-val">{cardIndex + 1} / {totalCards}</span>
          </span>
          <span className="scorebar-divider" />
          <span className="scorebar-item">
            <span className="scorebar-label">Score</span>
            <span className="scorebar-val">{totalScore}</span>
          </span>
          <span className="scorebar-divider" />
          {/* NEW: streak display */}
          <span className="scorebar-item">
            <span className="scorebar-label">Streak</span>
            <span className="scorebar-val">🔥 {currentStreak}</span>
          </span>
          <span className="scorebar-divider" />
          <span className="scorebar-item">
            <span className="scorebar-label">Best</span>
            <span className="scorebar-val">🏆 {longestStreak}</span>
          </span>
        </div>
      </header>

      <main className="app-main">
        {/* NEW: shuffle button */}
        <button className="shuffle-btn" onClick={handleShuffle}>🔀 Shuffle</button>

        <GameCard
          key={cardIndex}           // remounts GameCard on every card change, resetting its state
          card={currentCard}
          onCorrect={handleCorrect}
          onSkip={handleSkip}
          onNext={goNext}
          onPrev={goPrev}
          cardIndex={cardIndex}
          totalCards={totalCards}
          maxPoints={3}
        />

        {/* NEW: prev / next navigation */}
        <div className="nav-buttons">
          <button
            className="nav-btn"
            onClick={goPrev}
            disabled={cardIndex === 0}
          >
            ← Back
          </button>
          <button
            className="nav-btn"
            onClick={goNext}
            disabled={cardIndex === totalCards - 1 && history.length < totalCards}
          >
            {cardIndex === totalCards - 1 ? "Finish ✓" : "Next →"}
          </button>
        </div>
      </main>

      <footer className="app-footer">
        Fewer hints = more points · 3 pts → 2 pts → 1 pt
      </footer>
    </div>
  );
}