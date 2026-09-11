
import { useState } from "react";
import Puzzle from "./components/Puzzle";
import puzzleImage from "./assets/puzzle.jpeg";
import BirthdayClock from "./components/BirthdayClock";
import Level23 from "./components/Level23";
import "./App.css";

type Screen =
  | "welcome"
  | "map"
  | "level1"
  | "level2"
  | "level3"
  | "level23";

function App() {

  const [unlockedLevel, setUnlockedLevel] = useState(1);

  const [level1Completed, setLevel1Completed] =
    useState(false);

  const [level2Completed, setLevel2Completed] =
    useState(false);

  const [screen, setScreen] =
    useState<Screen>("welcome");


  // ================= LEVEL 1 STATES =================

  const [question, setQuestion] = useState(1);

  const [answer, setAnswer] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [showHint, setShowHint] =
    useState(false);


  // ================= LEVEL 1 =================

  const handleBirthdate = () => {

    const cleanAnswer =
      answer.trim();

    if (
      cleanAnswer === "28/11/05" ||
      cleanAnswer === "28/11/2005"
    ) {

      setMessage(
        "✅ Finally! You remembered 😌"
      );

    } else {

      setMessage(
        "❌ Yee nhi yaadd???? pita tu to!! 😡"
      );

    }
  };


  const handleFood = (option: string) => {

    if (
      option === "peri peri fries"
    ) {

      setMessage(
        "✅ Correct! Your memory is still working 😂"
      );

    } else if (
      option === "khajur shake" ||
      option === "dark choco shake"
    ) {

      setMessage(
        "eat mtlb KHANA pagall 😭"
      );

    } else if (
      option === "cheesecake"
    ) {

      setMessage(
        "Sharam aa rhi hai? 😭"
      );

    }

  };


  const nextQuestion = () => {

    setAnswer("");

    setMessage("");

    setShowHint(false);

    setQuestion(
      (prev) => prev + 1
    );

  };


  const completeQuiz = () => {

    setLevel1Completed(true);

    setUnlockedLevel(2);

  };


  // ================= LEVEL 2 =================

  const completePuzzle = () => {

    setLevel2Completed(true);

    setUnlockedLevel(3);

    setScreen("level3");

  };


  // ================= START =================

  const startQuest = () => {

    setScreen("level1");

  };


  return (

    <div className="app">


      {/* =====================================================
          WELCOME SCREEN
      ===================================================== */}

      {screen === "welcome" && (

        <main className="welcome-screen">

          <div className="sparkle">
            ✦
          </div>

          <p className="small-heading">
            A LITTLE SURPRISE FOR YOU
          </p>

          <h1>
            Birthday
            <br />
            Quest 🎂
          </h1>

          <p className="subtitle">
            Your birthday surprise is locked.
            <br />
            Think you can unlock it?
          </p>

          <button
            className="start-button"
            onClick={startQuest}
          >
            START THE QUEST
          </button>

          <p className="year">
            2026 • MADE JUST FOR YOU
          </p>

        </main>

      )}



      {/* =====================================================
          QUEST MAP
      ===================================================== */}

      {screen === "map" && (

        <main className="level-screen">

          <p className="small-heading">
            YOUR BIRTHDAY QUEST
          </p>

          <h1>
            Choose a Level 🎮
          </h1>


          <div className="level-buttons">


            {/* LEVEL 1 */}

            <button
              className="level-map-button"
              onClick={() =>
                setScreen("level1")
              }
            >

              <strong>
                🔓 LEVEL 1
              </strong>

              <span>
                Friendship Quiz
              </span>

              {level1Completed && (
                <small>
                  ✓ Completed
                </small>
              )}

            </button>



            {/* LEVEL 2 */}

            <button
              className="level-map-button"
              disabled={
                unlockedLevel < 2
              }
              onClick={() =>
                setScreen("level2")
              }
            >

              <strong>

                {unlockedLevel >= 2
                  ? "🔓 LEVEL 2"
                  : "🔒 LEVEL 2"}

              </strong>

              <span>
                Memory Puzzle
              </span>

              {level2Completed && (
                <small>
                  ✓ Completed
                </small>
              )}

            </button>



            {/* LEVEL 3 */}

            <button
              className="level-map-button"
              disabled={
                unlockedLevel < 3
              }
              onClick={() =>
                setScreen("level3")
              }
            >

              <strong>

                {unlockedLevel >= 3
                  ? "🔓 LEVEL 3"
                  : "🔒 LEVEL 3"}

              </strong>

              <span>
                12 Memories
              </span>

            </button>



            {/* LEVEL 23 */}

            <button
              className="level-map-button"
              disabled={
                unlockedLevel < 3
              }
              onClick={() =>
                setScreen("level23")
              }
            >

              <strong>
                🚀 LEVEL 23
              </strong>

              <span>
                Your Next Chapter
              </span>

            </button>

          </div>

        </main>

      )}



      {/* =====================================================
          LEVEL 1
      ===================================================== */}

      {screen === "level1" && (

        <main className="quiz-screen">


          {/* ================= HEADER ================= */}

          <div className="quiz-top">

            <p className="level-label">
              LEVEL 1 • THE FRIENDSHIP TEST
            </p>

            <h1>
              How well do you actually
              know me? 👀
            </h1>

            <p className="quiz-subtitle">
              3 questions. No cheating. 😌
            </p>


            {/* PROGRESS */}

            <div className="quiz-progress">

              <div
                className={`progress-dot ${
                  question >= 1
                    ? "active"
                    : ""
                } ${
                  question > 1
                    ? "done"
                    : ""
                }`}
              >

                {question > 1
                  ? "✓"
                  : "1"}

              </div>


              <div className="progress-line" />


              <div
                className={`progress-dot ${
                  question >= 2
                    ? "active"
                    : ""
                } ${
                  question > 2
                    ? "done"
                    : ""
                }`}
              >

                {question > 2
                  ? "✓"
                  : "2"}

              </div>


              <div className="progress-line" />


              <div
                className={`progress-dot ${
                  question >= 3
                    ? "active"
                    : ""
                } ${
                  level1Completed
                    ? "done"
                    : ""
                }`}
              >

                {level1Completed
                  ? "✓"
                  : "3"}

              </div>

            </div>

          </div>



          {/* ================= QUESTIONS ================= */}

          <div className="quiz-container">


            {/* =================================================
                QUESTION 1
            ================================================= */}

            <div
              className={`quiz-question-card ${
                question >= 1
                  ? "unlocked"
                  : "locked"
              } ${
                question > 1
                  ? "answered"
                  : ""
              }`}
            >

              <div className="question-number">

                <span>
                  01
                </span>

                {question > 1 ? (

                  <b>✓</b>

                ) : (

                  <small>
                    MEMORY
                  </small>

                )}

              </div>


              <div className="question-content">

                <p className="question-tag">
                  LET'S START EASY...
                </p>

                <h2>
                  What is your sweetest
                  friend's birthdate? 🎂
                </h2>


                {question === 1 ? (

                  <>

                    <p className="format-hint">
                      Enter in DD/MM/YY format
                    </p>


                    <input
                      type="text"
                      placeholder="DD/MM/YY"
                      value={answer}
                      onChange={(e) =>
                        setAnswer(
                          e.target.value
                        )
                      }
                      className="answer-input"
                    />


                    <div className="quiz-actions">

                      <button
                        className="submit-button"
                        onClick={
                          handleBirthdate
                        }
                      >
                        CHECK ANSWER →
                      </button>


                      <button
                        className="hint-button"
                        onClick={() =>
                          setShowHint(
                            !showHint
                          )
                        }
                      >
                        💡 Need a hint?
                      </button>

                    </div>


                    {showHint && (

                      <div className="hint">
                        Oyye tujhe ye yaad nhi?
                        Pitega tu 😭
                      </div>

                    )}


                    {message && (

                      <div className="feedback">

                        {message}


                        {message.startsWith(
                          "✅"
                        ) && (

                          <button
                            className="unlock-button"
                            onClick={
                              nextQuestion
                            }
                          >
                            UNLOCK QUESTION 2 🔓
                          </button>

                        )}

                      </div>

                    )}

                  </>

                ) : (

                  <div className="answered-message">

                    <div className="answered-icon">
                      🎂
                    </div>

                    <div>

                      <strong>
                        28/11/2005
                      </strong>

                      <span>
                        Okay... you actually
                        remembered. 😌
                      </span>

                    </div>

                  </div>

                )}

              </div>

            </div>



            {/* =================================================
                QUESTION 2
            ================================================= */}

            <div
              className={`quiz-question-card ${
                question >= 2
                  ? "unlocked"
                  : "locked"
              } ${
                question > 2
                  ? "answered"
                  : ""
              }`}
            >

              <div className="question-number">

                <span>
                  02
                </span>


                {question > 2 ? (

                  <b>✓</b>

                ) : question >= 2 ? (

                  <small>
                    FOOD
                  </small>

                ) : (

                  <b>🔒</b>

                )}

              </div>


              <div className="question-content">

                <p className="question-tag">
                  LET'S TEST YOUR MEMORY...
                </p>

                <h2>
                  What did we eat last time? 🍟
                </h2>


                {question >= 2 ? (

                  <>

                    {question === 2 ? (

                      <div className="options">

                        {[
                          "Khajur Shake",
                          "Dark Choco Shake",
                          "Peri Peri Fries",
                          "Cheesecake",
                        ].map(
                          (option) => (

                            <button
                              key={option}
                              className="option-button"
                              onClick={() =>
                                handleFood(
                                  option.toLowerCase()
                                )
                              }
                            >
                              {option}
                            </button>

                          )
                        )}

                      </div>

                    ) : (

                      <div className="answered-message">

                        <div className="answered-icon">
                          🍟
                        </div>

                        <div>

                          <strong>
                            Peri Peri Fries
                          </strong>

                          <span>
                            Apparently your memory
                            isn't completely broken. 😂
                          </span>

                        </div>

                      </div>

                    )}


                    {question === 2 &&
                      message && (

                        <div className="feedback">

                          {message}


                          {message.startsWith(
                            "✅"
                          ) && (

                            <button
                              className="unlock-button"
                              onClick={
                                nextQuestion
                              }
                            >
                              UNLOCK QUESTION 3 🔓
                            </button>

                          )}

                        </div>

                      )}

                  </>

                ) : (

                  <div className="locked-message">

                    <span className="lock-icon">
                      🔒
                    </span>

                    <span>
                      Answer Question 1
                      to unlock this
                    </span>

                  </div>

                )}

              </div>

            </div>



            {/* =================================================
                QUESTION 3
            ================================================= */}

            <div
              className={`quiz-question-card ${
                question >= 3
                  ? "unlocked"
                  : "locked"
              } ${
                level1Completed
                  ? "answered"
                  : ""
              }`}
            >

              <div className="question-number">

                <span>
                  03
                </span>


                {level1Completed ? (

                  <b>✓</b>

                ) : question >= 3 ? (

                  <small>
                    OBVIOUS
                  </small>

                ) : (

                  <b>🔒</b>

                )}

              </div>


              <div className="question-content">

                <p className="question-tag">
                  VERY IMPORTANT QUESTION...
                </p>

                <h2>
                  Who is your most intelligent,
                  innocent, sweet & cute friend? 😌
                </h2>


                {question >= 3 ? (

                  <>

                    {!level1Completed ? (

                      <div className="options">

                        {[
                          "Rachita Jain",
                          "Rachita Jain",
                          "Rachita Jain",
                          "Rachita Jain",
                        ].map(
                          (option, index) => (

                            <button
                              key={index}
                              className="option-button"
                              onClick={() => {

                                setMessage(
                                  "✅ Obviously! There was literally no wrong answer 😂❤️"
                                );

                                setTimeout(
                                  () => {
                                    completeQuiz();
                                  },
                                  700
                                );

                              }}
                            >
                              {option}
                            </button>

                          )
                        )}

                      </div>

                    ) : (

                      <div className="level-complete">

                        <div className="complete-icon">
                          🎉
                        </div>

                        <h3>
                          LEVEL 1 COMPLETE!
                        </h3>

                        <p>
                          Apparently you know
                          your friend pretty well. 😂❤️
                        </p>


                        <button
                          className="next-button"
                          onClick={() =>
                            setScreen("map")
                          }
                        >
                          VIEW QUEST MAP →
                        </button>

                      </div>

                    )}


                    {!level1Completed &&
                      message && (

                        <div className="feedback">
                          {message}
                        </div>

                      )}

                  </>

                ) : (

                  <div className="locked-message">

                    <span className="lock-icon">
                      🔒
                    </span>

                    <span>
                      Answer Question 2
                      to unlock this
                    </span>

                  </div>

                )}

              </div>

            </div>


          </div>

        </main>

      )}



      {/* =====================================================
          LEVEL 2
      ===================================================== */}

      {screen === "level2" && (

        <>

          {level2Completed ? (

            <main className="level-screen">

              <p className="small-heading">
                LEVEL 2 ✓ COMPLETED
              </p>

              <h1>
                Memory Unlocked ❤️
              </h1>

              <p>
                You solved the puzzle!
              </p>


              <div className="completed-puzzle-wrapper">

                <img
                  src={puzzleImage}
                  alt="Our memory"
                  className="completed-puzzle"
                />

              </div>


              <button
                className="next-button"
                onClick={() =>
                  setScreen("map")
                }
              >
                ← QUEST MAP
              </button>

            </main>

          ) : (

            <Puzzle
              onComplete={
                completePuzzle
              }
            />

          )}

        </>

      )}



      {/* =====================================================
          LEVEL 3
      ===================================================== */}

      {screen === "level3" && (

        <div className="level3-wrapper">

          <button
            className="quest-map-button"
            onClick={() =>
              setScreen("map")
            }
          >
            ← QUEST MAP
          </button>


          <BirthdayClock
            onComplete={() => {
              setScreen("level23");
            }}
          />

        </div>

      )}



      {/* =====================================================
          LEVEL 23
      ===================================================== */}

      {screen === "level23" && (

        <Level23
          onBack={() =>
            setScreen("map")
          }
        />

      )}

    </div>

  );

}

export default App;

