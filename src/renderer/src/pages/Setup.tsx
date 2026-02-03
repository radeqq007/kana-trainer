import { Button } from "@components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@components/ui/field";
import { Input } from "@components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@renderer/components/ui/radio-group";
import { useState } from "react";
import { Link } from "react-router-dom";

type GameType = "romaji" | "choice";

const Setup = (): React.JSX.Element => {
  const [numberOfChars, setNumberOfChars] = useState(1);
  const [gameType, setGameType] = useState<GameType>("romaji");

  return (
    <div>
      <div className="flex flex-col p-4 gap-10">
        <span className="flex items-center gap-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              &lt;
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Play</h1>
        </span>

        <div className="flex flex-col gap-15 items-center min-w-1/3 m-auto">
          <Field>
            <FieldLabel className="text-xl">Number of characters in one question: </FieldLabel>
            <FieldContent>
              <Input
                type="number"
                required
                min={1}
                value={numberOfChars}
                onChange={(e) => setNumberOfChars(Math.max(1, Number(e.target.value)))}
              />
            </FieldContent>
          </Field>

          <div>
            <Label className="text-xl font-medium">Game type: </Label>
            <RadioGroup
              className="flex gap-4 *:border-secondary md:flex-row flex-col"
              defaultValue="romaji"
              onChange={(e) => setGameType((e.target as HTMLInputElement).value as GameType)}
            >
              <FieldLabel htmlFor="romaji">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Romaji</FieldTitle>
                    <FieldDescription>See the kana and answer in romaji.</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="romaji" id="romaji" />
                </Field>
              </FieldLabel>

              <FieldLabel htmlFor="choice">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Choice</FieldTitle>
                    <FieldDescription>
                      See the romaji and select the correct answer.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="choice" id="choice" />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </div>

          <Link
            to="/play"
            className="w-full *:w-full"
            state={{ charCount: numberOfChars, gameType: gameType }}
          >
            <Button variant="default">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setup;
