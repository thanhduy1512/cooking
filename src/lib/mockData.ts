import { Recipe } from './types'

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Mushroom Pasta',
    description: 'A rich and creamy pasta dish with sautéed mushrooms and herbs',
    ingredients: [
      { id: '1', name: 'Pasta', amount: '400', unit: 'g', notes: 'Any type you prefer' },
      { id: '2', name: 'Mushrooms', amount: '300', unit: 'g', notes: 'Mixed varieties' },
      { id: '3', name: 'Heavy cream', amount: '200', unit: 'ml' },
      { id: '4', name: 'Garlic', amount: '3', unit: 'cloves', notes: 'Minced' },
      { id: '5', name: 'Parmesan cheese', amount: '50', unit: 'g', notes: 'Grated' },
      { id: '6', name: 'Fresh thyme', amount: '2', unit: 'tbsp', notes: 'Chopped' },
      { id: '7', name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { id: '8', name: 'Salt and pepper', amount: 'to taste', unit: '' }
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Bring a large pot of salted water to boil and cook pasta according to package directions',
        timeMinutes: 10
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Heat olive oil in a large pan over medium heat. Add minced garlic and cook for 1 minute',
        timeMinutes: 1
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Add mushrooms and cook until golden brown, about 8-10 minutes',
        timeMinutes: 10
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Pour in heavy cream and bring to a simmer. Add thyme and season with salt and pepper',
        timeMinutes: 3
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Drain pasta and add to the pan. Toss with sauce and parmesan cheese',
        timeMinutes: 2
      }
    ],
    timeMinutes: 25,
    difficulty: 'Easy',
    servings: 4,
    tags: ['vegetarian', 'comfort-food', 'quick'],
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 52,
      fat: 22,
      fiber: 3
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Chocolate Chip Cookies',
    description: 'Classic soft and chewy chocolate chip cookies',
    ingredients: [
      { id: '1', name: 'All-purpose flour', amount: '2', unit: 'cups' },
      { id: '2', name: 'Butter', amount: '1', unit: 'cup', notes: 'Softened' },
      { id: '3', name: 'Brown sugar', amount: '3/4', unit: 'cup' },
      { id: '4', name: 'White sugar', amount: '1/2', unit: 'cup' },
      { id: '5', name: 'Eggs', amount: '2', unit: 'large' },
      { id: '6', name: 'Vanilla extract', amount: '2', unit: 'tsp' },
      { id: '7', name: 'Baking soda', amount: '1', unit: 'tsp' },
      { id: '8', name: 'Salt', amount: '1', unit: 'tsp' },
      { id: '9', name: 'Chocolate chips', amount: '2', unit: 'cups' }
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Preheat oven to 375°F (190°C)',
        timeMinutes: 5
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'In a large bowl, cream together butter and both sugars until light and fluffy',
        timeMinutes: 3
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Beat in eggs one at a time, then stir in vanilla',
        timeMinutes: 2
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Combine flour, baking soda, and salt; gradually blend into creamed mixture',
        timeMinutes: 3
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Stir in chocolate chips',
        timeMinutes: 1
      },
      {
        id: '6',
        stepNumber: 6,
        instruction: 'Drop rounded tablespoons onto ungreased cookie sheets',
        timeMinutes: 5
      },
      {
        id: '7',
        stepNumber: 7,
        instruction: 'Bake for 9 to 11 minutes or until golden brown',
        timeMinutes: 11
      }
    ],
    timeMinutes: 45,
    difficulty: 'Medium',
    servings: 24,
    tags: ['dessert', 'baking', 'sweet'],
    nutrition: {
      calories: 120,
      protein: 2,
      carbs: 16,
      fat: 6,
      fiber: 1
    },
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Avocado Toast',
    description: 'Simple and healthy breakfast with mashed avocado on toast',
    ingredients: [
      { id: '1', name: 'Bread', amount: '2', unit: 'slices', notes: 'Whole grain preferred' },
      { id: '2', name: 'Avocado', amount: '1', unit: 'large', notes: 'Ripe' },
      { id: '3', name: 'Lemon juice', amount: '1', unit: 'tbsp' },
      { id: '4', name: 'Salt', amount: '1/4', unit: 'tsp' },
      { id: '5', name: 'Black pepper', amount: '1/8', unit: 'tsp' },
      { id: '6', name: 'Red pepper flakes', amount: '1', unit: 'pinch', notes: 'Optional' },
      { id: '7', name: 'Cherry tomatoes', amount: '4', unit: 'halved', notes: 'Optional' }
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Toast the bread slices until golden brown',
        timeMinutes: 3
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl',
        timeMinutes: 1
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Mash the avocado with lemon juice, salt, and pepper',
        timeMinutes: 2
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Spread the mashed avocado evenly on the toast',
        timeMinutes: 1
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Top with cherry tomatoes and red pepper flakes if desired',
        timeMinutes: 1
      }
    ],
    timeMinutes: 8,
    difficulty: 'Easy',
    servings: 1,
    tags: ['breakfast', 'healthy', 'quick', 'vegetarian'],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 28,
      fat: 16,
      fiber: 12
    },
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z'
  },
  {
    id: '4',
    title: 'Beef Stir Fry',
    description: 'Quick and flavorful beef stir fry with vegetables',
    ingredients: [
      { id: '1', name: 'Beef sirloin', amount: '400', unit: 'g', notes: 'Thinly sliced' },
      { id: '2', name: 'Broccoli', amount: '200', unit: 'g', notes: 'Cut into florets' },
      { id: '3', name: 'Bell peppers', amount: '2', unit: 'medium', notes: 'Sliced' },
      { id: '4', name: 'Carrots', amount: '2', unit: 'medium', notes: 'Julienned' },
      { id: '5', name: 'Garlic', amount: '3', unit: 'cloves', notes: 'Minced' },
      { id: '6', name: 'Ginger', amount: '1', unit: 'tbsp', notes: 'Minced' },
      { id: '7', name: 'Soy sauce', amount: '3', unit: 'tbsp' },
      { id: '8', name: 'Sesame oil', amount: '1', unit: 'tbsp' },
      { id: '9', name: 'Vegetable oil', amount: '2', unit: 'tbsp' },
      { id: '10', name: 'Cornstarch', amount: '1', unit: 'tbsp' }
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Mix beef with soy sauce and cornstarch. Let marinate for 10 minutes',
        timeMinutes: 10
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Heat vegetable oil in a large wok or pan over high heat',
        timeMinutes: 1
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Add beef and stir-fry for 2-3 minutes until browned. Remove and set aside',
        timeMinutes: 3
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Add garlic and ginger to the pan, stir for 30 seconds',
        timeMinutes: 1
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Add vegetables and stir-fry for 4-5 minutes until crisp-tender',
        timeMinutes: 5
      },
      {
        id: '6',
        stepNumber: 6,
        instruction: 'Return beef to the pan, add sesame oil, and toss everything together',
        timeMinutes: 1
      }
    ],
    timeMinutes: 30,
    difficulty: 'Medium',
    servings: 4,
    tags: ['dinner', 'asian', 'protein', 'quick'],
    nutrition: {
      calories: 320,
      protein: 28,
      carbs: 15,
      fat: 18,
      fiber: 4
    },
    createdAt: '2024-01-12T18:00:00Z',
    updatedAt: '2024-01-12T18:00:00Z'
  },
  {
    id: '5',
    title: 'Greek Salad',
    description: 'Fresh and healthy Mediterranean salad with feta cheese',
    ingredients: [
      { id: '1', name: 'Cucumber', amount: '1', unit: 'large', notes: 'Diced' },
      { id: '2', name: 'Tomatoes', amount: '4', unit: 'medium', notes: 'Diced' },
      { id: '3', name: 'Red onion', amount: '1/2', unit: 'medium', notes: 'Thinly sliced' },
      { id: '4', name: 'Green bell pepper', amount: '1', unit: 'medium', notes: 'Diced' },
      { id: '5', name: 'Kalamata olives', amount: '1/2', unit: 'cup', notes: 'Pitted' },
      { id: '6', name: 'Feta cheese', amount: '200', unit: 'g', notes: 'Cubed' },
      { id: '7', name: 'Olive oil', amount: '1/4', unit: 'cup' },
      { id: '8', name: 'Red wine vinegar', amount: '2', unit: 'tbsp' },
      { id: '9', name: 'Dried oregano', amount: '1', unit: 'tsp' },
      { id: '10', name: 'Salt and pepper', amount: 'to taste', unit: '' }
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Combine cucumber, tomatoes, red onion, and bell pepper in a large bowl',
        timeMinutes: 5
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Add olives and feta cheese to the vegetables',
        timeMinutes: 2
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Whisk together olive oil, vinegar, oregano, salt, and pepper',
        timeMinutes: 2
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Pour dressing over the salad and toss gently',
        timeMinutes: 1
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Let the salad sit for 10 minutes before serving to allow flavors to meld',
        timeMinutes: 10
      }
    ],
    timeMinutes: 20,
    difficulty: 'Easy',
    servings: 6,
    tags: ['salad', 'healthy', 'vegetarian', 'mediterranean'],
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 12,
      fat: 12,
      fiber: 3
    },
    createdAt: '2024-01-11T12:00:00Z',
    updatedAt: '2024-01-11T12:00:00Z'
  }
]
