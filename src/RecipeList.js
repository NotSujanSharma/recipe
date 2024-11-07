import React, { useState, useEffect } from 'react';

import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://api.bigcityops.ca/recipes/');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const categories = ["All", ...new Set(recipes.map(recipe => recipe.category))];

  const filteredRecipes = recipes.filter(recipe => {
    const searchWords = searchTerm.toLowerCase().split(" ");
    const recipeTitle = recipe.name.toLowerCase();

    return searchWords.every(word => recipeTitle.includes(word));
  });



  const handlePrint = (recipe) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${recipe.name} - Recipe</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #1a202c; margin-bottom: 10px; }
            .category { color: #718096; margin-bottom: 20px; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${recipe.name}</h1>
          <div class="category">Category: ${recipe.category}</div>
          ${recipe.file}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const Modal = ({ isOpen, onClose, recipe }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
            <div className="mb-4">
              {recipe.photo !== "null" && (
                <img
                  src={recipe.photo}
                  alt={recipe.name}
                  className="max-w-full h-auto rounded-md"
                />
              )}
            </div>
            <div
              className="recipe-content"
              dangerouslySetInnerHTML={{ __html: recipe.file }}
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handlePrint(recipe)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Print Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading recipes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Big City Catering
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{recipe.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No recipes found matching your criteria.
          </div>
        )}
      </div>

      <Modal
        isOpen={selectedRecipe !== null}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default RecipeList;