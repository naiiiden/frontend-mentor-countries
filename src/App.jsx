import "./style/general.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
