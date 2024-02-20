import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import MyRoutes from "./components/MyRoutes/MyRoutes";
import store from "./redux/store";
import {Provider} from "react-redux";
// import {persistor, store} from "./redux/store";
// import {PersistGate} from "redux-persist/integration/react";

function App() {
    return (
        <Provider store={store}>
            <div className="text-center text-4xl bg-black text-white h-screen">
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                    <h1 className="border-b-0 bg-green-500 text-black mb-10">Tic-Tac-Toe</h1>
                    <div className="flex items-center justify-center text-center">
                        <Router>
                            <MyRoutes/>
                        </Router>
                    </div>
                {/*</PersistGate>*/}
            </div>
        </Provider>
    );
}

export default App;