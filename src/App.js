import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import RecipeList from './RecipeList';
import LocationCheck from './LocationCheck';
import Home from './Home';
import AdminDashboard from './AdminDashboard';

const LoginRoute = ({ children }) => {
    const { token } = useAuth();
    if (token) {
        return <Navigate to="/home" />;
    }
    return children;
};

const PrivateRoute = ({ children }) => {
    const { token, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <LocationCheck>{children}</LocationCheck>;
};

const AdminRoute = ({ children }) => {
    const { token, user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!user?.is_superuser) {
        return <Navigate to="/admin" />;
    }

    return <LocationCheck>{children}</LocationCheck>;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                    <Route path="/login" element={
                        <LoginRoute>
                            <Login />
                        </LoginRoute>
                    } />
                    <Route
                        path="/recipes"
                        element={
                            <PrivateRoute>
                                <RecipeList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/home" element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;