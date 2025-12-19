import Home from "@renderer/pages/Home";
import { Route, Routes } from "react-router-dom";

function App(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
