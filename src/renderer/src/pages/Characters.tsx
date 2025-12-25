import { Checkbox } from "@components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@renderer/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@renderer/components/ui/toggle-group";
import chars from "@renderer/data/characters.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type KanaType = "hiragana" | "katakana";

const Characters = (): React.JSX.Element => {
  const [hiragana, setHiragana] = useState<string[]>([]);
  const [katakana, setKatakana] = useState<string[]>([]);

  const hiraganaChecked: CheckedState =
    hiragana.length === 0
      ? false
      : hiragana.length === Object.keys(chars.hiragana).length
        ? true
        : "indeterminate";

  const katakanaChecked: CheckedState =
    katakana.length === 0
      ? false
      : katakana.length === Object.keys(chars.katakana).length
        ? true
        : "indeterminate";

  useEffect(() => {
    window.store.get("hiragana").then((val) => setHiragana(val as string[]));
    window.store.get("katakana").then((val) => setKatakana(val as string[]));
  }, []);

  const handleKanaChange = (type: KanaType, value: string[]): void => {
    if (type === "hiragana") {
      setHiragana(value);
      window.store.set("hiragana", value);
    } else {
      setKatakana(value);
      window.store.set("katakana", value);
    }
  };

  const handleCheck = (type: KanaType, state: CheckedState): void => {
    if (state === true || state === "indeterminate") {
      if (type === "hiragana") {
        setHiragana(Object.keys(chars.hiragana));
      } else {
        setKatakana(Object.keys(chars.katakana));
      }
    } else {
      if (type === "hiragana") {
        setHiragana([]);
      } else {
        setKatakana([]);
      }
    }
  };

  return (
    <div className="flex flex-col p-4 gap-10">
      <span className="flex items-center gap-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            &lt;
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Characters</h1>
      </span>

      <span className="flex flex-col gap-3 justify-center items-center w-2/3 m-auto">
        <span className="flex gap-2 w-full items-center">
          <Checkbox
            onCheckedChange={(state) => handleCheck("hiragana", state)}
            checked={hiraganaChecked}
          />
          <h2 className="text-2xl font-medium w-full">Hiragana:</h2>
        </span>
        <ToggleGroup
          type="multiple"
          variant="default"
          size="lg"
          className="flex flex-wrap"
          value={hiragana}
          onValueChange={(value) => handleKanaChange("hiragana", value)}
        >
          {Object.entries(chars.hiragana).map(([key, value]) => (
            <ToggleGroupItem
              key={key}
              value={key}
              className="grow"
              data-state={hiragana.includes(key as string) ? "on" : "off"}
            >
              <span className="font-medium">{value}</span>({key})
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </span>

      <span className="flex flex-col gap-3 justify-center items-center w-2/3 m-auto">
        <span className="flex gap-2 w-full items-center">
          <Checkbox
            onCheckedChange={(state) => handleCheck("katakana", state)}
            checked={katakanaChecked}
          />
          <h2 className="text-2xl font-medium w-full">Katakana:</h2>
        </span>
        <ToggleGroup
          type="multiple"
          variant="default"
          size="lg"
          className="flex flex-wrap"
          value={katakana}
          onValueChange={(value) => handleKanaChange("katakana", value)}
        >
          {Object.entries(chars.katakana).map(([key, value]) => (
            <ToggleGroupItem
              key={key}
              value={key}
              className="grow"
              data-state={katakana.includes(key as string) ? "on" : "off"}
            >
              <span className="font-medium">{value}</span>({key})
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </span>
    </div>
  );
};

export default Characters;
