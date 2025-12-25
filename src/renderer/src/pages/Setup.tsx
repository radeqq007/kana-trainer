import { Button } from "@components/ui/button";
import { Field, FieldContent, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Setup = (): React.JSX.Element => {
  const [numberOfChars, setNumberOfChars] = useState(1);

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

        <div className="flex flex-col gap-6 items-center w-2/3 m-auto">
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

          <Link to="/play" state={{ charCount: numberOfChars }}>
            <Button variant="default">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setup;
