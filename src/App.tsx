import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import store from "./redux/store";
import {Provider} from "react-redux";
import MyRoutes from "./components/MyRoutes/MyRoutes";

function App() {
    return (
        <Provider store={store}>
            <div className="flex items-center justify-center h-screen bg-black text-white text-center">
                <Router>
                    <MyRoutes/>
                </Router>
            </div>
        </Provider>
    );
}

export default App;