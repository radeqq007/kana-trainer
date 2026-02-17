import { Button } from "@components/ui/button";
import { Field, FieldContent } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@components/ui/progress";
import { cn, getAccuracy } from "@renderer/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useGame } from "@renderer/hooks/useGame";

const Play = (): React.JSX.Element => {
  const { state } = useLocation();

  const { loading, question, userAnswer, setUserAnswer, score, feedback, checkAnswer } = useGame(
    state?.charCount || 1,
  );
  const accuracy = getAccuracy(score.correct, score.incorrect);

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
          <AnimatePresence mode="wait">
            <motion.h1
              key={question.q.join("")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="text-6xl text-center"
            >
              {question.q.map((ch, i) => {
                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <span>{ch}</span>
                    </TooltipTrigger>
                    <TooltipContent className="text-center border">{question.a[i]}</TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.h1>
          </AnimatePresence>
          <span className="flex align-center items-end gap-2">
            <Field>
              <FieldContent>
                <Input
                  readOnly={feedback.inputLocked}
                  type="text"
                  required
                  value={userAnswer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !feedback.inputLocked) checkAnswer();
                  }}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  autoFocus
                />
              </FieldContent>
            </Field>

            <Button
              onClick={() => {
                if (!feedback.inputLocked) checkAnswer();
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

          <AnimatePresence mode="wait">
            <motion.span
              key={`${feedback.msg}-${feedback.correct}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cn(
                "text-lg",
                feedback.correct
                  ? "border-green-800 bg-green-800/10"
                  : "border-red-900 bg-red-900/20",
                score.correct + score.incorrect > 0
                  ? "border"
                  : "border-transparent bg-transparent",
                "px-4 py-1 rounded-lg",
              )}
            >
              {feedback.msg}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Play;
