import MemoryGame from "./components/MemoryGame";
import "./App.css";

function App() {
  return (
    <>
      <div className="w-auto mt-24 appMoje">
        <MemoryGame deckSize={12} />
      </div>
    </>
  );
}

export default App;
