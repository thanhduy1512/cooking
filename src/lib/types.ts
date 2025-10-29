export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  steps: CookingStep[]
  timeMinutes: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  servings: number
  tags: string[]
  imageUrl?: string
  nutrition?: NutritionInfo
  createdAt: string
  updatedAt: string
}

export interface Ingredient {
  id: string
  name: string
  amount: string
  unit: string
  notes?: string
}

export interface CookingStep {
  id: string
  stepNumber: number
  instruction: string
  timeMinutes?: number
  temperature?: string
  tips?: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

export interface FilterState {
  difficulty: string[]
  timeRange: [number, number]
  tags: string[]
  searchQuery: string
}

export interface CookingState {
  currentRecipe: Recipe | null
  currentStep: number
  isCooking: boolean
  startTime: string | null
  completedSteps: string[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  timestamp: string
}
