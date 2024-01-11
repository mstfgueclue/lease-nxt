import "./App.css";
import { RegisterProperty } from "./property/components/RegisterProperty";

function App() {
  const handleRegister = (name: string, rent: number) => {
    console.log("Registering property:", name, rent);
    // Integrate with backend here
  };

  return (
    <div className="App">
      <header className="App-header mb-20">
        <h1>Real Estate Rental</h1>
      </header>
      <RegisterProperty onRegister={handleRegister} />
    </div>
  );
}

export default App;
