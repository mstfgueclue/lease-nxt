import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./common/components/Footer";
import { Header } from "./common/components/Header";
import { Home } from "./common/components/Home";

function App() {
  return (
    <div className="max-w-[1440p] mx-auto bg-white">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
