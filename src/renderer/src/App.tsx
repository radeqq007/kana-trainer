import Characters from "@renderer/pages/Characters";
import Home from "@renderer/pages/Home";
import Play from "@renderer/pages/Play";
import Setup from "@renderer/pages/Setup";
import { Route, Routes } from "react-router-dom";

function App(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;
