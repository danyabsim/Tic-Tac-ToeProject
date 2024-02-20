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
            {/*<PersistGate loading={null} persistor={persistor}>*/}
                <div className="flex items-center justify-center h-screen bg-black text-white text-center">
                    <Router>
                        <MyRoutes/>
                    </Router>
                </div>
            {/*</PersistGate>*/}
        </Provider>
    );
}

export default App;