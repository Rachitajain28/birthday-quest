import { useEffect, useState } from "react";
import "./BirthdayClock.css";

interface BirthdayClockProps {
  onComplete: () => void;
}

const memories = Array.from({ length: 12 }, (_, index) =>
  new URL(
    `../assets/memories/${index + 1}.jpeg`,
    import.meta.url
  ).href
);

const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

function BirthdayClock({ onComplete }: BirthdayClockProps) {
  const [currentHour, setCurrentHour] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showBirthday, setShowBirthday] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showIntro || currentHour >= 12) return;

    const timer = setTimeout(() => {
      setCurrentHour((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentHour, showIntro]);

  useEffect(() => {
  if (currentHour !== 12) return;

  const timer = setTimeout(() => {
    setShowBirthday(true);
  }, 1500);

  return () => clearTimeout(timer);
}, [currentHour]);

  // 12 = 0°, 1 = 30°, 2 = 60° ... 11 = 330°
  const handRotation = currentHour === 12 ? 0 : currentHour * 30;

  return (
    <main className="birthday-clock-screen">

      {/* ================= INTRO ================= */}

      {showIntro && (
        <div className="clock-intro">
          <p className="clock-level">LEVEL 3</p>

          <h1>12 Memories</h1>

          <p>
            One clock.
            <br />
            Twelve memories.
          </p>

          <div className="intro-line" />
        </div>
      )}

      {/* ================= CLOCK ================= */}

      {!showIntro && !showBirthday && (
        <div className="clock-stage">

          <div className="clock-heading">
            <p>TURNING BACK TIME...</p>

            <h1>
              {currentHour === 0
                ? "Ready?"
                : `Memory ${currentHour}`}
            </h1>
          </div>

          <div className="clock-scene">

            {/* ================= PHOTOS ================= */}

            <div className="memory-layer">

              {memories.map((photo, index) => {
                const number = index + 1;

                if (number > currentHour) return null;

                /*
                  Convert clock number to angle.

                  12 → -90°
                  1  → -60°
                  2  → -30°
                  3  → 0°
                  ...
                */

                const angle =
                  number === 12
                    ? -90
                    : number * 30 - 90;

                const radius = 300;

                const x =
                  Math.cos((angle * Math.PI) / 180) *
                  radius;

                const y =
                  Math.sin((angle * Math.PI) / 180) *
                  radius;

                return (
                  <div
                    key={photo}
                    className="memory-photo"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Memory ${number}`}
                    />

                    <span>{number}</span>
                  </div>
                );
              })}

            </div>

            {/* ================= CLOCK ================= */}

            <div className="clock-face">

              {/* Numbers */}

              {clockNumbers.map((number) => {
                const angle =
                  number === 12
                    ? -90
                    : number * 30 - 90;

                const radius = 185;

                const x =
                  Math.cos((angle * Math.PI) / 180) *
                  radius;

                const y =
                  Math.sin((angle * Math.PI) / 180) *
                  radius;

                return (
                  <span
                    key={number}
                    className={`clock-number ${
                      number <= currentHour
                        ? "visited-number"
                        : ""
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    {number}
                  </span>
                );
              })}

              {/* ================= HAND ================= */}

              <div
                className="clock-hand"
                style={{
                  transform: `translate(-50%, -100%) rotate(${handRotation}deg)`,
                }}
              />

              {/* EXACT CENTER PIN */}

              <div className="clock-center">
                <div className="clock-center-dot" />
              </div>

            </div>

          </div>

          <p className="clock-instruction">
            ✨ Watch the memories unfold...
          </p>

        </div>
      )}

      {/* ================= FINAL BIRTHDAY ================= */}

      {showBirthday && (
        <div className="birthday-reveal">

          <div className="confetti-container">
            {Array.from({ length: 70 }).map((_, index) => (
              <span
                key={index}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="birthday-content">

            <p className="birthday-small">
              THE CLOCK STRUCK TWELVE...
            </p>

            <h1>
              HAPPY
              <br />
              BIRTHDAY! 🎂
            </h1>

            <p className="birthday-name">
              Here's to another year of memories ❤️
            </p>

            <div className="final-memories">
              {memories.map((photo, index) => (
                <img
                  key={photo}
                  src={photo}
                  alt={`Memory ${index + 1}`}
                  className="final-memory"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                />
              ))}
            </div>

            <button
            className="continue-level23-button"
            onClick={onComplete}
            >
            CONTINUE → LEVEL 23 🚀
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default BirthdayClock;