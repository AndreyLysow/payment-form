import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import Confirm from './Confirm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaymentForm />} />
                <Route path="/confirm" element={<Confirm />} />
            </Routes>
        </Router>
    );
}

export default App;
