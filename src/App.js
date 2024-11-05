import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import RecipeList from './RecipeList';
import LocationCheck from './LocationCheck';

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <LocationCheck>{children}</LocationCheck>;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/recipes"
                        element={
                            <PrivateRoute>
                                <RecipeList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/recipes" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;