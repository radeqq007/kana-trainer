import { Button } from "@components/ui/button";
import { Field, FieldContent } from "@components/ui/field";
import { Input } from "@components/ui/input";
import Characters from "@renderer/data/characters.json";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface Question {
  q: string;
  a: string;
}

interface Score {
  correct: number;
  incorrect: number;
  // streak: number;
}

const Play = (): React.JSX.Element => {
  const location = useLocation();
  const charCount: number = location.state?.charCount;

  const generateQuestion = (count: number): { q: string; a: string } => {
    const system = ["hiragana", "katakana"][Math.floor(Math.random() * 2)];
    const keys = Object.keys(Characters[system]);

    let q = "";
    let a = "";

    for (let i = 0; i < count; i++) {
      const ch = keys[Math.floor(Math.random() * keys.length)];
      q += Characters[system][ch];
      a += ch;
    }

    return { q, a };
  };

  const nextQuestion = (): void => {
    const { q, a } = generateQuestion(charCount);
    setQuestion({ q, a });
    setUserAnswer("");
  };

  const checkAnswer = (): void => {
    if (userAnswer == question.a) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    nextQuestion();
  };

  const [initialGameData] = useState(() => generateQuestion(charCount));

  const [question, setQuestion] = useState<Question>({
    q: initialGameData.q,
    a: initialGameData.a,
  });
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });

  return (
    <div>
      <div className="flex flex-col p-4 h-screen">
        <span className="flex items-center gap-6">
          <Link to="/setup">
            <Button variant="outline" size="sm">
              &lt;
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Play</h1>
        </span>

        <div className="flex flex-col items-center gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-6xl">{question.q}</h1>
          <span className="flex align-center items-end gap-2">
            <Field>
              <FieldContent>
                <Input
                  type="text"
                  required
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              </FieldContent>
            </Field>

            <Button onClick={checkAnswer} variant="default">
              Check
            </Button>
          </span>
          <div className="mt-4 text-lg">
            ✅ Correct: {score.correct} | ❌ Incorrect: {score.incorrect}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
