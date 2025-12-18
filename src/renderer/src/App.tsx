import "@renderer/assets/main.css";
import { Route, Routes } from "react-router-dom";

function App(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4">
              <h1>Hello, world!</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
