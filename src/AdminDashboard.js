import React, { useState, useEffect } from 'react';
import { useMemo, useCallback } from 'react';
import { AlertCircle, Edit3, Trash2, Upload, Plus, MapPin, FileText, Settings, Menu, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './Alert';

import RecipeModal from './RecipeModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('recipes');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const filteredRecipes = useMemo(() =>
        recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
        ), [recipes, searchTerm]
    );

    const handleSearchChange = useCallback((e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }, []);
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
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 truncate">{recipe.category}</p>
                </div>
                <div className="flex gap-2 ml-2 shrink-0">
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
        <div className={`
            fixed inset-y-0 left-0 z-30 transform
            lg:relative lg:translate-x-0
            w-64 bg-white shadow-lg border-r border-gray-200
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
            </div>
            <nav className="mt-6">
                <SidebarLink
                    icon={<FileText size={20} />}
                    label="Recipes"
                    active={activeTab === 'recipes'}
                    onClick={() => {
                        setActiveTab('recipes');
                        setIsSidebarOpen(false);
                    }}
                />
                <SidebarLink
                    icon={<MapPin size={20} />}
                    label="Location Settings"
                    active={activeTab === 'location'}
                    onClick={() => {
                        setActiveTab('location');
                        setIsSidebarOpen(false);
                    }}
                />
                <SidebarLink
                    icon={<Settings size={20} />}
                    label="Settings"
                    active={activeTab === 'settings'}
                    onClick={() => {
                        setActiveTab('settings');
                        setIsSidebarOpen(false);
                    }}
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
        <div className="p-4 sm:p-6 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Location Settings</h2>
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
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recipes</h2>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer flex-1 sm:flex-none justify-center">
                        <Upload size={20} />
                        <span className="whitespace-nowrap">Upload DOCX</span>
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
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1 sm:flex-none justify-center"
                    >
                        <Plus size={20} />
                        <span className="whitespace-nowrap">New Recipe</span>
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search recipes by name or category..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoComplete="off"
                        autoFocus
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            {filteredRecipes.length === 0 && (
                <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>
                        {searchTerm
                            ? 'No recipes found matching your search'
                            : 'No recipes found'}
                    </AlertTitle>
                    <AlertDescription>
                        {searchTerm
                            ? 'Try adjusting your search terms or clear the search'
                            : 'Start by uploading a DOCX file or creating a new recipe manually.'}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 relative">
                {/* Status Messages */}
                {error && (
                    <div className={`fixed top-4 right-4 z-50 ${error.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' :
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

                {/* Content Panels */}
                {activeTab === 'recipes' && <RecipePanel />}
                {activeTab === 'location' && <LocationSettingsPanel />}
                {activeTab === 'settings' && (
                    <div className="p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Settings</h2>
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