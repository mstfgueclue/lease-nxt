import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./common/components/Footer";
import { Header } from "./common/components/Header";
import { Home } from "./common/components/Home";
import { PropertyDetails } from "./property/components/PropertyDetails";
import { Login } from "./auth/Login";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-white">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
