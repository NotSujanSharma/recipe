import React, { useState, useEffect } from 'react';

const RecipeSearchAutocomplete = ({ recipes, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const filterSuggestions = () => {
            if (searchTerm.trim() === '') {
                setSuggestions([]);
                onSearch(''); // Clear search when input is empty
                return;
            }

            const searchWords = searchTerm.toLowerCase().split(' ');
            const filteredRecipes = recipes.filter(recipe => {
                const recipeName = recipe.name.toLowerCase();
                return searchWords.every(word => recipeName.includes(word));
            });

            setSuggestions(filteredRecipes.slice(0, 5));
        };

        filterSuggestions();
    }, [searchTerm, recipes, onSearch]);

    const handleSearch = (suggestion) => {
        setSearchTerm(suggestion.name);
        onSearch(suggestion.name);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Update search results as user types
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            {suggestions.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full mt-2 max-h-40 overflow-y-auto">
                    {suggestions.map(suggestion => (
                        <div
                            key={suggestion.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSearch(suggestion)}
                        >
                            {suggestion.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeSearchAutocomplete;