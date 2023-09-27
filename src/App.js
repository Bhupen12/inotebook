import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/note/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Navbar />
        <Alert message="Nice react course" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
