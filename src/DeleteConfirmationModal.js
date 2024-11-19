import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './Alert';

const DeleteConfirmationModal = ({ isOpen, onClose, recipe, onDelete }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setError('');
        setIsLoading(true);

        try {
            // const response = await fetch(`http://127.0.0.1:8000/api/admin/recipes/${recipe.id}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     }
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to delete recipe');
            // }

            onDelete(recipe.id);
            // setError({ type: 'success', message: 'Recipe deleted successfully' });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-red-100 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Delete Recipe</h3>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{recipe.name}"? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Deleting...' : 'Delete Recipe'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;