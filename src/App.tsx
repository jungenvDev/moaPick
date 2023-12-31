import React from 'react';

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";

const isAuthenticated = true; // 로그인 여부에 따라 변경

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
