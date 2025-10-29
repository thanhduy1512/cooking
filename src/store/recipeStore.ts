import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Recipe, FilterState, CookingState, Notification } from '../lib/types'
import { mockRecipes } from '../lib/mockData'

interface RecipeStore {
  // Recipe data
  recipes: Recipe[]
  savedRecipes: Recipe[]
  currentRecipe: Recipe | null
  
  // Search and filters
  searchQuery: string
  filters: FilterState
  
  // Cooking state
  cookingState: CookingState
  
  // Notifications
  notifications: Notification[]
  
  // Actions
  setRecipes: (recipes: Recipe[]) => void
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<FilterState>) => void
  setCurrentRecipe: (recipe: Recipe | null) => void
  
  // Recipe actions
  saveRecipe: (recipe: Recipe) => void
  unsaveRecipe: (recipeId: string) => void
  isRecipeSaved: (recipeId: string) => boolean
  
  // Cooking actions
  startCooking: (recipe: Recipe) => void
  nextStep: () => void
  previousStep: () => void
  completeStep: (stepId: string) => void
  stopCooking: () => void
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (notificationId: string) => void
  clearNotifications: () => void
  
  // Filtered recipes
  getFilteredRecipes: () => Recipe[]
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      recipes: mockRecipes,
      savedRecipes: [],
      currentRecipe: null,
      searchQuery: '',
      filters: {
        difficulty: [],
        timeRange: [0, 120],
        tags: [],
        searchQuery: ''
      },
      cookingState: {
        currentRecipe: null,
        currentStep: 0,
        isCooking: false,
        startTime: null,
        completedSteps: []
      },
      notifications: [],
      
      // Actions
      setRecipes: (recipes) => set({ recipes }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      
      setCurrentRecipe: (recipe) => set({ currentRecipe: recipe }),
      
      // Recipe actions
      saveRecipe: (recipe) => set((state) => {
        const isAlreadySaved = state.savedRecipes.some(r => r.id === recipe.id)
        if (isAlreadySaved) return state
        
        return {
          savedRecipes: [...state.savedRecipes, recipe],
          notifications: [...state.notifications, {
            id: Date.now().toString(),
            type: 'success',
            title: 'Recipe Saved',
            message: `${recipe.title} has been saved to your collection`,
            timestamp: new Date().toISOString()
          }]
        }
      }),
      
      unsaveRecipe: (recipeId) => set((state) => ({
        savedRecipes: state.savedRecipes.filter(r => r.id !== recipeId),
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'info',
          title: 'Recipe Removed',
          message: 'Recipe has been removed from your collection',
          timestamp: new Date().toISOString()
        }]
      })),
      
      isRecipeSaved: (recipeId) => {
        const state = get()
        return state.savedRecipes.some(r => r.id === recipeId)
      },
      
      // Cooking actions
      startCooking: (recipe) => set({
        cookingState: {
          currentRecipe: recipe,
          currentStep: 0,
          isCooking: true,
          startTime: new Date().toISOString(),
          completedSteps: []
        }
      }),
      
      nextStep: () => set((state) => {
        if (!state.cookingState.currentRecipe) return state
        
        const maxSteps = state.cookingState.currentRecipe.steps.length
        const nextStep = Math.min(state.cookingState.currentStep + 1, maxSteps - 1)
        
        return {
          cookingState: {
            ...state.cookingState,
            currentStep: nextStep
          }
        }
      }),
      
      previousStep: () => set((state) => {
        const prevStep = Math.max(state.cookingState.currentStep - 1, 0)
        
        return {
          cookingState: {
            ...state.cookingState,
            currentStep: prevStep
          }
        }
      }),
      
      completeStep: (stepId) => set((state) => {
        const completedSteps = [...state.cookingState.completedSteps]
        if (!completedSteps.includes(stepId)) {
          completedSteps.push(stepId)
        }
        
        return {
          cookingState: {
            ...state.cookingState,
            completedSteps
          }
        }
      }),
      
      stopCooking: () => set({
        cookingState: {
          currentRecipe: null,
          currentStep: 0,
          isCooking: false,
          startTime: null,
          completedSteps: []
        }
      }),
      
      // Notification actions
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        }]
      })),
      
      removeNotification: (notificationId) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== notificationId)
      })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      // Filtered recipes
      getFilteredRecipes: () => {
        const state = get()
        let filtered = state.recipes
        
        // Filter by search query
        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase()
          filtered = filtered.filter(recipe =>
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query))
          )
        }
        
        // Filter by difficulty
        if (state.filters.difficulty.length > 0) {
          filtered = filtered.filter(recipe =>
            state.filters.difficulty.includes(recipe.difficulty)
          )
        }
        
        // Filter by time range
        filtered = filtered.filter(recipe =>
          recipe.timeMinutes >= state.filters.timeRange[0] &&
          recipe.timeMinutes <= state.filters.timeRange[1]
        )
        
        // Filter by tags
        if (state.filters.tags.length > 0) {
          filtered = filtered.filter(recipe =>
            state.filters.tags.some(tag => recipe.tags.includes(tag))
          )
        }
        
        return filtered
      }
    }),
    {
      name: 'cooking-app-store',
      partialize: (state) => ({
        savedRecipes: state.savedRecipes,
        filters: state.filters
      })
    }
  )
)
