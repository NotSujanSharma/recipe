import React, { useState, useEffect } from 'react';
import { AlertCircle, Edit3, Trash2, Upload, Plus, MapPin, FileText, Settings } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './Alert';

import RecipeModal from './RecipeModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('recipes');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [locationSettings, setLocationSettings] = useState({
        latitude: 43.67671032048767,
        longitude: -79.47068943825747,
        radius_km: 9
    });
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipes();
        fetchLocationSettings();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('https://api.bigcityops.ca/recipes', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            setError(err.message);
        } finally {
        }
    };

    const fetchLocationSettings = async () => {
        try {
            const response = await fetch('https://api.bigcityops.ca/api/admin/location-settings', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch location settings');
            }

            const data = await response.json();
            setLocationSettings(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleDeleteRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsDeleteModalOpen(true);
    };

    const handleSaveLocationSettings = async () => {
        try {
            const response = await fetch('https://api.bigcityops.ca/api/admin/location-settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(locationSettings)
            });

            if (!response.ok) {
                throw new Error('Failed to update location settings');
            }

            // Show success message
            setError({ type: 'success', message: 'Location settings updated successfully' });
        } catch (err) {
            setError({ type: 'error', message: err.message });
        }
    };

    // const [formData, setFormData] = useState({
    //     name: '',
    //     category: '',
    //     file: '',
    //     photo: ''
    // });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show loading state
        setError({ type: 'info', message: 'Uploading recipe...' });

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://api.bigcityops.ca/api/admin/upload-recipe', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload recipe');
            }

            // Show success message and refresh recipes
            setError({ type: 'success', message: 'Recipe uploaded successfully' });
            fetchRecipes();
        } catch (err) {
            setError({ type: 'error', message: err.message });
        }
    };

    const handleSaveRecipe = async (recipeData) => {
        try {
            const response = await fetch(
                selectedRecipe
                    ? `https://api.bigcityops.ca/api/admin/recipes/${selectedRecipe.id}`
                    : 'https://api.bigcityops.ca/api/admin/recipes',
                {
                    method: selectedRecipe ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(recipeData)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }

            // Show success message and refresh recipes
            setError({ type: 'success', message: `Recipe ${selectedRecipe ? 'updated' : 'created'} successfully` });
            fetchRecipes();
            setIsModalOpen(false);
            setSelectedRecipe(null);
        } catch (err) {
            setError({ type: 'error', message: err.message });
        }
    };

    const handleDeleteConfirm = async (recipeId) => {
        try {
            const response = await fetch(`https://api.bigcityops.ca/api/admin/recipes/${recipeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }

            // Show success message and refresh recipes
            setError({ type: 'success', message: 'Recipe deleted successfully' });
            fetchRecipes();
            setIsDeleteModalOpen(false);
            setSelectedRecipe(null);
        } catch (err) {
            setError({ type: 'error', message: err.message });
        }
    };

    const RecipeCard = ({ recipe }) => (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{recipe.category}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEditRecipe(recipe)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={() => handleDeleteRecipe(recipe)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            {recipe.photo !== "null" && (
                <img
                    src={recipe.photo}
                    alt={recipe.name}
                    className="mt-3 w-full h-32 object-cover rounded-md"
                />
            )}
        </div>
    );

    const Sidebar = () => (
        <div className="w-64 bg-white h-full shadow-lg border-r border-gray-200">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <nav className="mt-6">
                <SidebarLink
                    icon={<FileText size={20} />}
                    label="Recipes"
                    active={activeTab === 'recipes'}
                    onClick={() => setActiveTab('recipes')}
                />
                <SidebarLink
                    icon={<MapPin size={20} />}
                    label="Location Settings"
                    active={activeTab === 'location'}
                    onClick={() => setActiveTab('location')}
                />
                <SidebarLink
                    icon={<Settings size={20} />}
                    label="Settings"
                    active={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                />
            </nav>
        </div>
    );

    const SidebarLink = ({ icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-6 py-3 transition-colors ${active
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    const LocationSettingsPanel = () => (
        <div className="p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Location Settings</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Latitude
                    </label>
                    <input
                        type="number"
                        value={locationSettings.latitude}
                        onChange={(e) => setLocationSettings({
                            ...locationSettings,
                            latitude: parseFloat(e.target.value)
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Longitude
                    </label>
                    <input
                        type="number"
                        value={locationSettings.longitude}
                        onChange={(e) => setLocationSettings({
                            ...locationSettings,
                            longitude: parseFloat(e.target.value)
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Radius (km)
                    </label>
                    <input
                        type="number"
                        value={locationSettings.radius_km}
                        onChange={(e) => setLocationSettings({
                            ...locationSettings,
                            radius_km: parseFloat(e.target.value)
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    onClick={handleSaveLocationSettings}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );

    const RecipePanel = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recipes</h2>
                <div className="flex gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                        <Upload size={20} />
                        Upload DOCX
                        <input
                            type="file"
                            accept=".docx"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                    <button
                        onClick={() => {
                            setSelectedRecipe(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <Plus size={20} />
                        New Recipe
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            {recipes.length === 0 && (
                <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No recipes found</AlertTitle>
                    <AlertDescription>
                        Start by uploading a DOCX file or creating a new recipe manually.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto relative">
                {/* Status Messages */}
                {error && (
                    <div className={`absolute top-4 right-4 z-50 ${error.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' :
                        error.type === 'error' ? 'bg-red-50 text-red-800 border-red-500' :
                            'bg-blue-50 text-blue-800 border-blue-500'
                        } border rounded-lg p-4 shadow-lg max-w-md`}>
                        {error.message}
                        <button
                            onClick={() => setError(null)}
                            className="ml-2 text-current opacity-50 hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Main Content */}
                {activeTab === 'recipes' && <RecipePanel />}
                {activeTab === 'location' && <LocationSettingsPanel />}
                {activeTab === 'settings' && (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
                        <p className="text-gray-600">Additional settings will be added here.</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <RecipeModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedRecipe(null);
                }}
                recipe={selectedRecipe}
                onSave={handleSaveRecipe}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedRecipe(null);
                }}
                recipe={selectedRecipe}
                onDelete={handleDeleteConfirm}
            />
        </div>
    );
};

export default AdminDashboard;