import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ExpensePage";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Counter from "./components/Counter";
import useThemeStore from "./store/themeStore";
import ExpensesPage from "./pages/ExpensesPage";
import ExpensePage from "./pages/ExpensePage";
import Toaster from "react-hot-toast";
//localStorage.getItem("theme")

function App() {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <Toaster />
      <NavBar />
      <Counter />
      <Routes>
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/expenses/:id" element={<ExpensePage />} />
      </Routes>
    </div>
  );
}

export default App;
