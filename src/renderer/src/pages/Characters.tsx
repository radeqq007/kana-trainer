import { Button } from "@renderer/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@renderer/components/ui/toggle-group";
import chars from "@renderer/data/characters.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = (): React.JSX.Element => {
  const [hiragana, setHiragana] = useState<string[]>([]);
  const [katakana, setKatakana] = useState<string[]>([]);
  useEffect(() => {
    // @ts-ignore for now
    window.store.get("hiragana").then((val) => setHiragana(val));

    // @ts-ignore for now
    window.store.get("katakana").then((val) => setKatakana(val));
  }, []);

  const handleHiraganaChange = (value: string[]): void => {
    setHiragana(value);
    // @ts-ignore for now
    window.store.set("hiragana", value);
  };

  const handleKatakanaChange = (value: string[]): void => {
    // @ts-ignore for now
    window.store.set("katakana", value);
    setKatakana(value);
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
        <h2 className="text-2xl font-medium w-full">Hiragana:</h2>
        <ToggleGroup
          type="multiple"
          variant="default"
          size="lg"
          className="flex flex-wrap"
          value={hiragana}
          onValueChange={handleHiraganaChange}
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
        <h2 className="text-2xl font-medium w-full">Katakana:</h2>
        <ToggleGroup
          type="multiple"
          variant="default"
          size="lg"
          className="flex flex-wrap"
          value={katakana}
          onValueChange={handleKatakanaChange}
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
