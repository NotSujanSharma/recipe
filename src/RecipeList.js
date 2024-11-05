import React, { useState } from "react";

// Enhanced sample recipe data with ingredients and steps
const sampleRecipes = [
  {
    id: 1,
    title: "Best Potato Salad",
    category: "Salad",
    description: "Fresh and healthy patato salad",
    ingredients: [
      "4 cups Potatoes, cooked, peeled and cubed",
      "1 cup mayonnaise",
      "1 tsp mustard",
      "½ tsp celery seeds",
      "½ tsp salt",
      "Pepper",
      "½ cup onion, white, chopped",
      "½ cup celery, chopped",
      "½ cup sweet pickles, chopped",
    ],
    steps: [""],
  },
  {
    id: 2,
    title: "Asian Black Bean Sauce",
    category: "Sacue",
    description: "Classic Asian Black Bean Sauce",
    ingredients: [
      "Peanut oil 2 tb",
      "2 tb black beans, fermented, rinsed and dried",
      "1 tb Garlic, minced",
      "½ c Chicken broth",
      "1tb Soy sauce",
      "2 tb Rice wine",
      "1 ts Sugar",
      "1 ½ ts cornstarch",
    ],
    steps: [""],
  },
  {
    id: 3,
    title: "Chocolate Bread Pudding",
    category: "Pudding",
    description: "Refreshing Chocolate Bread Pudding",
    ingredients: [
      "2 ½ cups cut up stale bread",
      "1 tsp vanilla",
      "2 eggs",
      "2 tbsp cocoa",
      "2 cups milk",
      "1 tsp cinnamon",
      "1/4 cup sugar",
      "¾ cup chocolate chips",
    ],
    steps: [
      "Pre heat oven 350 f",
      "DPour mixture over bread.",
      "Let sit fot 15 minutes",
      "Bake for 30-40 minutes until firm but not dry.",
    ],
  },
  {
    id: 4,
    title: "Beaver Tails",
    category: "uncategorized",
    description: "Beave Tails",
    ingredients: [
      "½ cup warm water",
      "5 tspns dry yeast",
      "Pinch of sugar",
      "1 cup warm milk",
      "1/3 cup sugar",
      "1 ½ tspn salt",
      "1 tspn vanilla",
      "2 large eggs",
      "1/3 cup oil",
      "5 cups flour",
      "Cinnamon sugar",
    ],
    steps: [""],
  },
  {
    id: 5,
    title: "Beef Burger",
    category: "Burger",
    description: "Delicious Beef burger",
    ingredients: [
      "2 lbs Ground beef",
      "1 small onion chopped",
      "1 garlic finely chopped",
      "2 tspn thyme",
      "2 tb Dijon mustard",
      "2 tsp lea and perrin",
    ],
    steps: [""],
  },
  {
    id: 6,
    title: "Five-Spice Chicken",
    category: "Chicken",
    description: "Five Spice Chicken",
    ingredients: [
      "hicken Thighs or Drumsticks: 20 pieces (about 5–6 pounds)",
      "Chinese Five-Spice Powder: 5 tablespoons",
      "Soy Sauce: 1 cup",
      "Hoisin Sauce: ½ cup",
      "Honey or Brown Sugar: ½ cup",
      "Garlic: 10 cloves, minced",
      "Ginger: 5 tablespoons, freshly grated",
      "Sesame Oil: 5 tablespoons",
      "Rice Vinegar or Lime Juice: ¼ cup",
      "Scallions: ½ cup, finely chopped (for garnish)",
      "Sesame Seeds: 2 tablespoons (optional, for garnish)",
      "Salt and Pepper: to taste",
    ],
    steps: [
      "Marinate the Chicken: In a large mixing bowl, combine the soy sauce, hoisin sauce, honey (or brown sugar), minced garlic, grated ginger, sesame oil, rice vinegar, and five-spice powder. Mix well.",
      "Add the Chicken: Add chicken pieces to the marinade, ensuring they are well-coated. Cover and refrigerate for at least 2 hours or, preferably, overnight for deeper flavor.",
      "Prepare for Baking: Preheat the oven to 400°F (200°C). Arrange the marinated chicken pieces on large baking sheets lined with parchment paper or foil.",
      "Bake: Bake in the preheated oven for 30-35 minutes, turning once halfway through, until the chicken is cooked through and has a deep caramelized color. For added crispiness, broil on high for 2-3 minutes at the end.",
    ],
  },
  {
    id: 7,
    title: "Roast Chicken Spice Rub",
    category: "Chicken",
    description: "Roast Chicken Spice Rub (20 portions)",
    ingredients: [
      "Paprika 4 tbsp",
      "Onion Powder 4 tbsp",
      "Garlic Powder 4 tbsp",
      "Celery Seed 4 tbsp",
      "Dried Thyme 2 tbsp",
      "Ground Bay leaves 1 tbsp",
      "Salt 1 tspn",
      "Pepper 1 tspn",
    ],
    steps: [""],
  },
  {
    id: 8,
    title: "Chicken Shish Kabob",
    category: "Chicken",
    description: "Chicken Shish Kabob",
    ingredients: [
      "Cumin 3 ts",
      "Crushed red pepper 1 ts",
      "Corn starch ½ tsp",
      "Paprika ½ ts",
      "Salt ½",
      "Dill ½",
      "Ginger ¼",
      "Coriander ¼",
      "Anise 1/16",
      "Cayenne pepper",
      "Oregano",
      "Thyme",
      "Rosemary",
      "Sugar",
      "Basil",
      "Black pepper",
      "Garlic powder",
      "Onion powder",
    ],
    steps: ["All the above 1/16 tspn"],
  },
  {
    id: 9,
    title: "Lavache",
    category: "uncategorized",
    description: "Lavache",
    ingredients: [
      "Flour 5 cups",
      "Waer 1.5 cups",
      "Eggs 3",
      "Salt 2tsp",
      "Sugar 2 tsp",
      "Yeast 2 tsp",
      "Season with herbs and sea salt, bake at 350 until lightly toasted",
    ],
    steps: [""],
  },
  {
    id: 10,
    title: "Crème Fraiche",
    category: "uncategorized",
    description: "Cream Fraiche",
    ingredients: ["1 cup heavy cream", "1 cup sour cream", "1/4 cup sugar"],
    steps: [
      "Whist the 2 creams together in a bow until thoroughly blended",
      "Pour into a jar, cover and let stand in a warm place until thickened about 12 hours.",
      "Refrigerate.",
    ],
  },
  {
    id: 11,
    title: "Blintzes",
    category: "uncategorized",
    description: "Blintzes",
    ingredients: [
      "4 eggs, lightly beaten (crepse)",
      "2 cups milk (crepse)",
      "2 ½ cups flour (crepse)",
      "1 tspn salt (crepse)",
      "Butter for frying (crepse)",
      "1 EGG (filling)",
      "1 TS SALT (filling)",
      "½ Cup sugar (filling)",
      "1 lb pressed cottage cheese or quark cheese (filling)",
      "½ lb cream cheese (filling)",
    ],
    steps: [""],
  },
  {
    id: 12,
    title: "Spicy Tamarind Dip",
    category: "uncategorized",
    description: "Spicy Tamarind Dip",
    ingredients: [
      "Tamarind pulp 1 tb",
      "Ginger, grated, 2 ts",
      "Brown sugar or palm sugar 2 ts",
      "Salt ½ ts",
      "Ground cumin 1 ts",
      "Ground fennel ½ ts",
    ],
    steps: [""],
  },
  {
    id: 13,
    title: "Champagne Vinaigrette Dressing",
    category: "Dressing",
    description: "Chanpagne Vinaigrette Dressing",
    ingredients: [
      "1 Shallot",
      "¼ cup champagne vinegar or white wine vinegar",
      "¼ cup olive oil",
      "1 tb Dijon mustard",
      "¾ ts salt",
      "Black pepper",
    ],
    steps: [""],
  },
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
          ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>

        <h2>Instructions</h2>
        <ol>
          ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
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
          <div className="flex justify-between">
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Filter recipes based on search term and selected category
  const filteredRecipes = sampleRecipes.filter((recipe) => {
    const searchMatch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  // Get unique categories from the sample data
  const categories = [
    "All",
    ...new Set(sampleRecipes.map((recipe) => recipe.category)),
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Big City Catering
        </h1>

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
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
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
              <div
                className="p-4 cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{recipe.category}</p>
                <p className="text-sm text-gray-600">{recipe.description}</p>
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
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Ingredients
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Instructions
              </h3>
              <ol className="list-decimal pl-6 space-y-3">
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index} className="text-gray-600">
                    {step}
                  </li>
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
