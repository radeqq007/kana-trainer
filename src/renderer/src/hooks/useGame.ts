import { useState, useCallback, useEffect } from "react";
import { pickUnique } from "@renderer/lib/utils";
import Characters from "@renderer/data/characters.json";

type System = "hiragana" | "katakana";

type Question = {
  q: string[];
  a: string[];
};

type Score = {
  correct: number;
  incorrect: number;
};

type Feedback = {
  msg: string;
  correct: boolean;
  inputLocked: boolean;
};

type UseGameReturn = {
  loading: boolean;
  question: Question;
  userAnswer: string;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
  score: Score;
  feedback: Feedback;
  checkAnswer: () => void;
};

export function useGame(charCount: number): UseGameReturn {
  const [enabled, setEnabled] = useState<Record<System, string[]>>({
    hiragana: [],
    katakana: [],
  });
  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState<Question>({
    q: [],
    a: [],
  });
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });

  const [feedback, setFeedback] = useState<Feedback>({
    msg: "",
    correct: false,
    inputLocked: false,
  });

  const generateQuestion = useCallback(
    (count: number, systemsAvaiable: Record<System, string[]>): { q: string[]; a: string[] } => {
      const systems = (["hiragana", "katakana"] as System[]).filter(
        (s) => systemsAvaiable[s].length > 0,
      );

      if (systems.length === 0) return { q: ["None Selected"], a: [""] };

      const system = systems[Math.floor(Math.random() * systems.length)];
      const keys = systemsAvaiable[system];

      const safeCount = Math.min(count, keys.length);

      const a: string[] = pickUnique(keys, safeCount);
      const q: string[] = a.map(
        (key) => (Characters as Record<System, Record<string, string>>)[system][key],
      );

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
    if (userAnswer.trim().toLowerCase() == question.a.join("")) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback({ msg: `${userAnswer} is correct!`, correct: true, inputLocked: true });
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));

      setFeedback({
        msg: `Wrong! Correct answer: ${question.a.join("")}`,
        correct: false,
        inputLocked: true,
      });
    }

    setTimeout(() => {
      nextQuestion();
      setFeedback((prev) => ({ ...prev, inputLocked: false }));
    }, 800);
  };

  useEffect(() => {
    (async () => {
      const h = await window.store.get("hiragana");
      const k = await window.store.get("katakana");

      const fetchedEnabled: Record<System, string[]> = {
        hiragana: Array.isArray(h) ? h : [],
        katakana: Array.isArray(k) ? k : [],
      };

      setQuestion({ q: ["Not enough characters enabled"], a: [""] });
      setEnabled(fetchedEnabled);

      // Immediately generate the first question using the fetched data
      const q = generateQuestion(charCount, fetchedEnabled);
      setQuestion(q);
      setLoading(false);
    })();
  }, [charCount, generateQuestion]);

  return {
    loading,
    question,
    userAnswer,
    setUserAnswer,
    score,
    feedback,
    checkAnswer,
  };
}
