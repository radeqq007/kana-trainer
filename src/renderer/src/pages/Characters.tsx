import { Button } from "@renderer/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@renderer/components/ui/toggle-group";
import chars from "@renderer/data/characters.json";
import { Link } from "react-router-dom";

const Characters = (): React.JSX.Element => {
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
        <ToggleGroup type="multiple" variant="default" size="lg" className="flex flex-wrap">
          {Object.entries(chars.hiragana).map(([key, value]) => (
            <ToggleGroupItem key={key} value={key} className="grow">
              <span className="font-medium">{value}</span>({key})
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </span>

      <span className="flex flex-col gap-3 justify-center items-center w-2/3 m-auto">
        <h2 className="text-2xl font-medium w-full">Katakana:</h2>
        <ToggleGroup type="multiple" variant="default" size="lg" className="flex flex-wrap">
          {Object.entries(chars.katakana).map(([key, value]) => (
            <ToggleGroupItem key={key} value={key} className="grow">
              <span className="font-medium">{value}</span>({key})
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </span>
    </div>
  );
};

export default Characters;
