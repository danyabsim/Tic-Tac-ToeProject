import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import MyRoutes from "./components/MyRoutes/MyRoutes";
import store from "./redux/store";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <div className="text-center text-4xl bg-black text-white h-screen">
                <h1 className="border-b-0 bg-green-500 text-black mb-10 p-2">Tic-Tac-Toe</h1>
                <div className="flex items-center justify-center text-center">
                    <Router>
                        <MyRoutes/>
                    </Router>
                </div>
            </div>
        </Provider>
    );
}

export default App;