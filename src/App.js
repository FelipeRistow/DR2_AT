import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import React from "react";
import Inicio from "./components/Inicio";
import Gerenciamento from "./components/Gerenciamento";
import DetalhesHotel from "./components/DetalhesHotel";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to={"/"}>Dashboard</Link>
                                <Link to={"gerenciamento/"}>Gerenciamento</Link>
                                <button onClick={() => localStorage.clear()}>LIMPAR</button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className={"AppConteudo"}>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/gerenciamento/" element={<Gerenciamento />} />
                        <Route path="/hoteis/:id/" element={<DetalhesHotel />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
