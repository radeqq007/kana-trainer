import { Button } from "@components/ui/button";
import { Field, FieldContent } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Progress } from "@renderer/components/ui/progress";
import Characters from "@renderer/data/characters.json";
import { cn } from "@renderer/lib/utils";
import { useCallback, useEffect, useState } from "react";
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

type System = "hiragana" | "katakana";

const Play = (): React.JSX.Element => {
  const location = useLocation();
  const charCount: number = location.state?.charCount;

  const [enabled, setEnabled] = useState<Record<System, string[]>>({
    hiragana: [],
    katakana: [],
  });
  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState<Question>({
    q: "",
    a: "",
  });
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });

  const [msg, setMsg] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);
  const [inputLocked, setInputLocked] = useState(false);

  const generateQuestion = useCallback(
    (count: number, currentEnabled: Record<System, string[]>): { q: string; a: string } => {
      const systems = (["hiragana", "katakana"] as System[]).filter(
        (s) => currentEnabled[s].length > 0,
      );
      console.log(systems);
      if (systems.length === 0) return { q: "None Selected", a: "" };

      const system = systems[Math.floor(Math.random() * systems.length)];
      const keys = currentEnabled[system];

      let q = "";
      let a = "";

      for (let i = 0; i < count; i++) {
        const romaji = keys[Math.floor(Math.random() * keys.length)];
        const kana = (Characters as Record<System, Record<string, string>>)[system][romaji];
        q += kana;
        a += romaji;
      }

      return { q, a };
    },
    [],
  );

  const nextQuestion = useCallback((): void => {
    const { q, a } = generateQuestion(charCount, enabled);
    setQuestion({ q, a });
    setUserAnswer("");
  }, [charCount, enabled, generateQuestion]);

  const checkAnswer = (): void => {
    if (userAnswer == question.a) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setMsg(`${userAnswer} is correct!`);
      setCorrect(true);
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setMsg(`Wrong! Correct answer: ${question.a}`);
      setCorrect(false);
    }
    setInputLocked(true)
    setTimeout(() => {
      nextQuestion()
      setInputLocked(false)
    }, 800);
  };

  const total = score.correct + score.incorrect;
  const accuracy = total === 0 ? 50 : (score.correct / total) * 100;

  useEffect(() => {
    (async () => {
      // @ts-ignore imma fix that later
      const h = await window.store.get("hiragana");
      // @ts-ignore imma fix that later
      const k = await window.store.get("katakana");

      const fetchedEnabled = {
        hiragana: h || [],
        katakana: k || [],
      };

      setEnabled(fetchedEnabled);

      // Immediately generate the first question using the fetched data
      const q = generateQuestion(charCount, fetchedEnabled);
      setQuestion(q);

      setLoading(false);
    })();
  }, [charCount, generateQuestion]);

  if (loading) return <div>Loading...</div>;

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
                  readOnly={inputLocked}
                  type="text"
                  required
                  value={userAnswer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !inputLocked) checkAnswer();
                  }}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  autoFocus
                />
              </FieldContent>
            </Field>

            <Button
              onClick={() => {
                if (!inputLocked) checkAnswer();
              }}
              variant="default"
            >
              Check
            </Button>
          </span>

          <Progress value={accuracy} className="w-full" />

          <span className="flex flex-col justify-center items-center *:text-center">
            <span className="text-2xl font-semibold mt-4">
              {score.correct} / {score.correct + score.incorrect}
            </span>
            <span className="text-md text-gray-300">{accuracy.toFixed(2)}%</span>
          </span>

          <span
            className={cn(
              "text-lg",
              correct ? "border-green-800" : "border-red-900",
              total > 0 ? "border" : "",
              "px-4 py-1 rounded-lg",
            )}
          >
            {msg}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Play;
