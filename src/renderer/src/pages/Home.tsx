import { Button } from "@renderer/components/ui/button";
import { Link } from "react-router-dom";

const Home = (): React.JSX.Element => {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-9xl font-bold">あ</h1>
      <h2 className="text-7xl font-medium">Kana Trainer</h2>
      <span className="flex gap-2 mt-10">
        <Button variant="secondary">
          <Link to="/characters">Change Characters</Link>
        </Button>
        <Button variant="default">
          <Link to="/play">Start</Link>
        </Button>
      </span>
    </div>
  );
};

export default Home;
