import { useState } from "react"
import { Recipe } from "@/lib/types"
import { useRecipeStore } from "@/store/recipeStore"
import { RecipeCard } from "@/components/RecipeCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Filter, Grid, List } from "lucide-react"

interface SavedProps {
  onViewRecipe: (recipe: Recipe) => void
  onCookRecipe: (recipe: Recipe) => void
}

export function Saved({ onViewRecipe, onCookRecipe }: SavedProps) {
  const { savedRecipes, setSearchQuery } = useRecipeStore()
  const [searchQuery, setSearchQueryLocal] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'time'>('newest')

  const handleSearch = (query: string) => {
    setSearchQueryLocal(query)
    setSearchQuery(query)
  }

  const filteredRecipes = savedRecipes.filter(recipe => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'name':
        return a.title.localeCompare(b.title)
      case 'time':
        return a.timeMinutes - b.timeMinutes
      default:
        return 0
    }
  })

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'name', label: 'Name' },
    { value: 'time', label: 'Time' },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Saved Recipes
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="h-8 w-8"
            >
              {viewMode === 'grid' ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search saved recipes..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-background border border-input rounded-md px-2 py-1 text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>
          <Badge variant="secondary" className="text-xs">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {savedRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved recipes yet</h3>
            <p className="text-muted-foreground mb-4">
              Save recipes you love to find them easily later
            </p>
            <Button onClick={() => window.location.href = '#home'}>
              Browse Recipes
            </Button>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQueryLocal("")
                setSearchQuery("")
              }}
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className={cn(
            "space-y-4",
            viewMode === 'grid' && "grid gap-4",
            viewMode === 'list' && "space-y-2"
          )}>
            {sortedRecipes.map((recipe) => (
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

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
