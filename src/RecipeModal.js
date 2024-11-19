import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from './Alert';

const RecipeModal = ({ isOpen, onClose, recipe, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        file: '',
        photo: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name || '',
                category: recipe.category || '',
                file: recipe.file || '',
                photo: recipe.photo || ''
            });
        } else {
            // Reset form when creating new recipe
            setFormData({
                name: '',
                category: '',
                file: '',
                photo: ''
            });
        }
    }, [recipe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Instead of making the API call here, pass the form data to parent
            onSave(formData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {recipe ? 'Edit Recipe' : 'New Recipe'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recipe Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recipe Content (HTML)
                        </label>
                        <textarea
                            value={formData.file}
                            onChange={(e) => setFormData({ ...formData, file: e.target.value })}
                            className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo URL (optional)
                        </label>
                        <input
                            type="text"
                            value={formData.photo}
                            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecipeModal;