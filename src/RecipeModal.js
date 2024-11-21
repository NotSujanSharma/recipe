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
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 shrink-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {recipe ? 'Edit Recipe' : 'New Recipe'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
                    <div className="p-4 sm:p-6 space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
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
                                    placeholder="Enter recipe name"
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
                                    placeholder="Enter category"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipe Content (HTML)
                                </label>
                                <textarea
                                    value={formData.file}
                                    onChange={(e) => setFormData({ ...formData, file: e.target.value })}
                                    className="w-full h-48 sm:h-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    placeholder="Enter recipe content in HTML format"
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
                                    placeholder="Enter photo URL"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 shrink-0">
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : 'Save Recipe'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecipeModal;