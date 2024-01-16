import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterProperty from "./property/components/RegisterProperty";
import { ViewProperties } from "./property/components/ViewProperties";
import { Login } from "./auth/components/Login";
import { SignUp } from "./auth/components/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/list-properties" element={<RegisterProperty />} />
          <Route path="/view-properties" element={<ViewProperties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
