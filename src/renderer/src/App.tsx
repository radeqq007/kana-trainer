import Characters from "@renderer/pages/Characters";
import Home from "@renderer/pages/Home";
import Play from "@renderer/pages/Play";
import Setup from "@renderer/pages/Setup";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/PageTransition";

function App(): React.JSX.Element {
  const location = useLocation();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/characters"
            element={
              <PageTransition>
                <Characters />
              </PageTransition>
            }
          />
          <Route
            path="/setup"
            element={
              <PageTransition>
                <Setup />
              </PageTransition>
            }
          />
          <Route
            path="/play"
            element={
              <PageTransition>
                <Play />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
