import { useState } from "react";
import "./Level23.css";

type Level23Props = {
  onBack: () => void;
};

type FutureResult = {
  question: string;
  answer: string;
};

function Level23({ onBack }: Level23Props) {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<FutureResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askFuture = async () => {
    const finalQuestion = question.trim();

    if (!finalQuestion || loading) return;

    setResult(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/ask-future`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: finalQuestion,
          }),
        }
      );

      const data = await response.json();

      console.log("QUESTION SENT:", finalQuestion);
      console.log("BACKEND RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Something went wrong"
        );
      }

      if (!data.answer || !data.answer.trim()) {
        throw new Error("No answer received");
      }

      setResult({
        question: finalQuestion,
        answer: data.answer.trim(),
      });

    } catch (error) {
      console.error("Future API error:", error);

      setError(
        "Future thoda confused ho gaya 😂🔮 Ek baar phir try kar!"
      );

    } finally {
      setLoading(false);
    }
  };

  const askAgain = () => {
    setQuestion("");
    setResult(null);
    setError("");
  };

  return (
    <main className="level23-screen">

      {/* BACK */}

      <button
        className="level23-back"
        onClick={onBack}
      >
        ← QUEST MAP
      </button>

      {/* HERO */}

      <section className="future-hero">

        <div className="floating-star star-one">✦</div>
        <div className="floating-star star-two">✧</div>
        <div className="floating-star star-three">✦</div>

        <div className="future-icon">
          🔮
        </div>

        <p className="future-label">
          SECRET BONUS
        </p>

        <h1>
          Your Future,
          <br />
          <span>Maybe. 👀</span>
        </h1>

        <p className="future-intro">
          Abhishek's new chapter 23 starts now...
          <br />
          dekhte hain future kya bolta hai 🔮
        </p>

      </section>

      {/* MAIN CARD */}

      <section className="oracle-card">

        <div className="card-top">
          <div>
            <span className="card-eyebrow">
              FUTURE ORACLE
            </span>

            <h2>
              Kuch bhi poochoooo. 👀
            </h2>
          </div>

          <div className="mini-crystal">
            ✨
          </div>
        </div>

        <p className="card-description">
          Business? Paisa? Travel? Life?
          <br />
          Jo mann mein aaye, poochlee🤓.
        </p>

        {/* INPUT */}

        <textarea
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setResult(null);
            setError("");
          }}
          placeholder="Like: Mera business kaisa chalega? 💼"
          disabled={loading}
        />

        <div className="character-count">
          {question.length}/200
        </div>

        {/* ASK BUTTON */}

        <button
          className="future-button"
          onClick={askFuture}
          disabled={!question.trim() || loading}
        >
          {loading ? (
            <>
              <span className="loading-dot">●</span>
              Future check ho raha hai...
            </>
          ) : (
            <>
              🔮 BATAO FUTURE
            </>
          )}
        </button>

        {/* ERROR */}

        {error && (
          <div className="future-error">
            {error}
          </div>
        )}

        {/* RESULT */}

        {result && (
          <div className="future-result">

            <div className="result-header">
              <span>✦</span>
              <p>FUTURE YOU SAYS</p>
              <span>✦</span>
            </div>

            <div className="asked-question">
              "{result.question}"
            </div>

            <div className="answer">
              {result.answer}
            </div>

            <div className="signature">
              — Future Abhishek 🔮
            </div>

            <button
              className="ask-again"
              onClick={askAgain}
            >
              ASK SOMETHING ELSE →
            </button>

          </div>
        )}

      </section>

      {/* FOOTER */}

      <p className="future-footer">
        ✨ Chapter 23 is yours to write.
      </p>

    </main>
  );
}

export default Level23;