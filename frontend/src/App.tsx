import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import ToggleSwitch from "./components/ToggleSwitch";

function App() {
  return (
    <>
      <ToggleSwitch onToggle={() => { }} />
      <SearchBar onSearch={() => { }} />
      <SearchResults />
    </>
  );
}

export default App;
