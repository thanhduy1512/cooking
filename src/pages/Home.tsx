import { useState } from "react"
import { Recipe } from "@/lib/types"
import { useRecipeStore } from "@/store/recipeStore"
import { RecipeCard } from "@/components/RecipeCard"
import { ChatInput } from "@/components/ChatInput"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, ChefHat } from "lucide-react"

interface HomeProps {
  onViewRecipe: (recipe: Recipe) => void
  onCookRecipe: (recipe: Recipe) => void
}

export function Home({ onViewRecipe, onCookRecipe }: HomeProps) {
  const { getFilteredRecipes, filters, setFilters } = useRecipeStore()
  const [showFilters, setShowFilters] = useState(false)
  
  const filteredRecipes = getFilteredRecipes()
  
  const quickFilters = [
    { label: 'Quick', value: 'quick', icon: Clock },
    { label: 'Easy', value: 'Easy', icon: ChefHat },
    { label: 'Healthy', value: 'healthy', icon: Search },
  ]

  const handleQuickFilter = (filterValue: string) => {
    if (filterValue === 'quick') {
      setFilters({ timeRange: [0, 30] })
    } else if (filterValue === 'Easy') {
      setFilters({ difficulty: ['Easy'] })
    } else if (filterValue === 'healthy') {
      setFilters({ tags: ['healthy'] })
    }
  }

  const clearFilters = () => {
    setFilters({
      difficulty: [],
      timeRange: [0, 120],
      tags: [],
      searchQuery: ''
    })
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <h1 className="text-2xl font-bold mb-4">What's Cooking?</h1>
        
        {/* Search */}
        <ChatInput 
          placeholder="Search recipes, ingredients, or cuisines..."
          onSearch={(query) => setFilters({ searchQuery: query })}
        />
        
        {/* Quick Filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {quickFilters.map((filter) => {
            const Icon = filter.icon
            return (
              <Button
                key={filter.value}
                variant="outline"
                size="sm"
                onClick={() => handleQuickFilter(filter.value)}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                <Icon className="h-3 w-3" />
                {filter.label}
              </Button>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1"
          >
            <Filter className="h-3 w-3" />
            More
          </Button>
        </div>
        
        {/* Active Filters */}
        {(filters.difficulty.length > 0 || filters.tags.length > 0 || filters.timeRange[0] > 0 || filters.timeRange[1] < 120) && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.difficulty.map((diff) => (
              <Badge key={diff} variant="secondary" className="text-xs">
                {diff}
              </Badge>
            ))}
            {filters.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {filters.timeRange[0] > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.timeRange[0]}+ min
              </Badge>
            )}
            {filters.timeRange[1] < 120 && (
              <Badge variant="secondary" className="text-xs">
                Under {filters.timeRange[1]} min
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs h-6 px-2"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Recipe Grid */}
      <div className="p-4">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onCook={onCookRecipe}
                onView={onViewRecipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
