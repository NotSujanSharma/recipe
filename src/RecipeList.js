import React, { useState } from 'react';

// Enhanced sample recipe data with ingredients and steps
const sampleRecipes = [
  {
    "id": 1,
    "title": "Grilled Chicken Salad",
    "category": "Salad",
    "description": "Fresh and healthy salad with grilled chicken breast",
    "ingredients": [
      "2 chicken breasts",
      "4 cups mixed salad greens",
      "1 cucumber, sliced",
      "2 tomatoes, diced",
      "1/4 cup olive oil",
      "2 tablespoons balsamic vinegar",
      "Salt and pepper to taste"
    ],
    "steps": [
      "Season chicken breasts with salt and pepper.",
      "Grill chicken for 6-8 minutes per side until cooked through.",
      "Let chicken rest for 5 minutes, then slice.",
      "In a large bowl, combine salad greens, cucumber, and tomatoes.",
      "Whisk together olive oil and balsamic vinegar.",
      "Add sliced chicken to the salad.",
      "Drizzle with dressing and serve."
    ]
  },
  {
    "id": 2,
    "title": "Caesar Salad",
    "category": "Salad",
    "description": "Classic Caesar salad with homemade dressing",
    "ingredients": [
      "4 cups romaine lettuce, chopped",
      "1/2 cup croutons",
      "1/4 cup grated Parmesan cheese",
      "1/4 cup olive oil",
      "1 tablespoon lemon juice",
      "1 clove garlic, minced",
      "Salt and pepper to taste"
    ],
    "steps": [
      "In a small bowl, whisk together olive oil, lemon juice, garlic, salt, and pepper.",
      "In a large bowl, combine romaine lettuce, croutons, and Parmesan cheese.",
      "Drizzle the dressing over the salad.",
      "Toss to coat and serve immediately."
    ]
  },
  {
    "id": 3,
    "title": "Greek Salad",
    "category": "Salad",
    "description": "Refreshing salad with cucumbers, tomatoes, and feta cheese",
    "ingredients": [
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1/2 red onion, thinly sliced",
      "1/4 cup black olives",
      "1/4 cup feta cheese, crumbled",
      "2 tablespoons olive oil",
      "1 tablespoon red wine vinegar",
      "Salt and pepper to taste"
    ],
    "steps": [
      "In a large bowl, combine cucumber, tomatoes, red onion, and olives.",
      "Drizzle with olive oil and red wine vinegar.",
      "Season with salt and pepper, then toss gently.",
      "Top with crumbled feta cheese and serve."
    ]
  },
  {
    "id": 4,
    "title": "Spaghetti Bolognese",
    "category": "Pasta",
    "description": "Classic Italian pasta with meat sauce",
    "ingredients": [
      "1 lb ground beef",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 cans crushed tomatoes",
      "1 lb spaghetti",
      "Parmesan cheese",
      "Salt and pepper to taste"
    ],
    "steps": [
      "Brown ground beef in a large pan.",
      "Add onions and garlic, cook until softened.",
      "Add crushed tomatoes and simmer for 30 minutes.",
      "Cook spaghetti according to package instructions.",
      "Combine pasta with sauce.",
      "Serve with grated Parmesan cheese."
    ]
  },
  {
    "id": 5,
    "title": "Pasta Carbonara",
    "category": "Pasta",
    "description": "Creamy pasta with pancetta and Parmesan",
    "ingredients": [
      "1 lb spaghetti",
      "4 oz pancetta, diced",
      "2 large eggs",
      "1 cup grated Parmesan cheese",
      "Salt and pepper to taste",
      "Parsley for garnish"
    ],
    "steps": [
      "Cook spaghetti according to package instructions.",
      "In a skillet, cook pancetta until crispy.",
      "In a bowl, whisk together eggs and Parmesan cheese.",
      "Drain pasta and return to the pot.",
      "Quickly toss pasta with egg mixture and pancetta.",
      "Season with salt and pepper, garnish with parsley, and serve."
    ]
  },
  {
    "id": 6,
    "title": "Shrimp Scampi",
    "category": "Pasta",
    "description": "Pasta with garlic butter shrimp",
    "ingredients": [
      "1 lb linguine",
      "1 lb shrimp, peeled and deveined",
      "3 cloves garlic, minced",
      "1/4 cup olive oil",
      "1/4 cup butter",
      "1/4 cup white wine",
      "Parsley for garnish",
      "Salt and pepper to taste"
    ],
    "steps": [
      "Cook linguine according to package instructions.",
      "In a skillet, heat olive oil and butter over medium heat.",
      "Add garlic and cook until fragrant.",
      "Add shrimp and cook until pink, then add white wine.",
      "Toss cooked linguine with shrimp mixture.",
      "Garnish with parsley and serve."
    ]
  },
  {
    "id": 7,
    "title": "Chocolate Cake",
    "category": "Dessert",
    "description": "Rich and moist chocolate cake",
    "ingredients": [
      "1 3/4 cups flour",
      "3/4 cup cocoa powder",
      "2 cups sugar",
      "1 1/2 teaspoons baking soda",
      "1 1/2 teaspoons baking powder",
      "2 large eggs",
      "1 cup milk",
      "1/2 cup vegetable oil",
      "1 cup boiling water"
    ],
    "steps": [
      "Preheat oven to 350°F (175°C).",
      "In a large bowl, mix flour, cocoa powder, sugar, baking soda, and baking powder.",
      "Add eggs, milk, and oil, then mix until smooth.",
      "Stir in boiling water until well combined.",
      "Pour batter into greased cake pan and bake for 30-35 minutes.",
      "Cool before serving."
    ]
  },
  {
    "id": 8,
    "title": "Cheesecake",
    "category": "Dessert",
    "description": "Creamy classic cheesecake",
    "ingredients": [
      "1 1/2 cups graham cracker crumbs",
      "1/4 cup melted butter",
      "4 8-oz packages cream cheese",
      "1 cup sugar",
      "1 teaspoon vanilla extract",
      "4 large eggs"
    ],
    "steps": [
      "Preheat oven to 325°F (165°C).",
      "Combine graham cracker crumbs and melted butter, then press into a springform pan.",
      "In a large bowl, beat cream cheese, sugar, and vanilla extract until smooth.",
      "Add eggs one at a time, mixing well after each.",
      "Pour filling into crust and bake for 50-60 minutes.",
      "Cool and refrigerate before serving."
    ]
  },
  {
    "id": 9,
    "title": "Tiramisu",
    "category": "Dessert",
    "description": "Classic Italian dessert with coffee and mascarpone",
    "ingredients": [
      "1 cup strong brewed coffee",
      "3 tablespoons coffee liqueur",
      "3 large eggs, separated",
      "1/2 cup sugar",
      "1 cup mascarpone cheese",
      "1 cup heavy cream",
      "24 ladyfingers",
      "Cocoa powder for dusting"
    ],
    "steps": [
      "Mix coffee and liqueur in a shallow dish.",
      "In a bowl, beat egg yolks and sugar until pale and creamy.",
      "Fold in mascarpone cheese.",
      "In another bowl, whip heavy cream until stiff peaks form, then fold into mascarpone mixture.",
      "Dip ladyfingers in coffee mixture and layer in a dish.",
      "Spread mascarpone mixture over the ladyfingers and repeat layers.",
      "Dust with cocoa powder and refrigerate before serving."
    ]
  },
  {
    "id": 10,
    "title": "Lemon Bars",
    "category": "Dessert",
    "description": "Tangy and sweet lemon bars with a buttery crust",
    "ingredients": [
      "1 cup flour",
      "1/2 cup butter, softened",
      "1/4 cup sugar",
      "3/4 cup sugar",
      "2 large eggs",
      "2 tablespoons lemon zest",
      "1/4 cup lemon juice"
    ],
    "steps": [
      "Preheat oven to 350°F (175°C).",
      "In a bowl, mix flour, butter, and 1/4 cup sugar until crumbly.",
      "Press mixture into a baking pan and bake for 15 minutes.",
      "In another bowl, beat eggs, 3/4 cup sugar, lemon zest, and lemon juice until combined.",
      "Pour lemon mixture over baked crust.",
      "Bake for an additional 20 minutes and cool before serving."
    ]
  }
];

const handlePrint = (recipe) => {
  const printContent = `
    <html>
      <head>
        <title>${recipe.title} - Recipe</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          h1 { color: #1a202c; margin-bottom: 10px; }
          h2 { color: #2d3748; margin: 20px 0 10px 0; }
          ul, ol { margin-left: 20px; margin-bottom: 20px; }
          li { margin-bottom: 8px; }
          .description { color: #4a5568; margin-bottom: 20px; font-style: italic; }
          .category { color: #718096; margin-bottom: 20px; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${recipe.title}</h1>
        <div class="category">Category: ${recipe.category}</div>
        <div class="description">${recipe.description}</div>
        
        <h2>Ingredients</h2>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        
        <h2>Instructions</h2>
        <ol>
          ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};

const Modal = ({ isOpen, onClose, sR, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {children}
          <div className='flex justify-between'>

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => handlePrint(sR)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Print Recipe
            </button>
          </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Filter recipes based on search term and selected category
  const filteredRecipes = sampleRecipes.filter((recipe) => {
    const searchMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || recipe.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  // Get unique categories from the sample data
  const categories = ['All', ...new Set(sampleRecipes.map((recipe) => recipe.category))];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Big City Catering</h1>

        <div className="mb-6">
          
          <input
            id="search"
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category:
          </label>
          <select
            id="category"
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
              <div className="p-4 cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {recipe.category}
                </p>
                <p className="text-sm text-gray-600">
                  {recipe.description}
                </p>
                
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
        sR={selectedRecipe}
      >
        {selectedRecipe && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
            <p className="text-gray-600 mb-6">{selectedRecipe.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h3>
              <ul className="list-disc pl-6 space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h3>
              <ol className="list-decimal pl-6 space-y-3">
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index} className="text-gray-600">{step}</li>
                ))}
              </ol>
            </div>
            
          </div>
          
        )}
      </Modal>
    </div>
  );
};

export default RecipeList;