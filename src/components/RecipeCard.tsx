import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, ChefHat, Heart, HeartOff } from "lucide-react"
import { Recipe } from "@/lib/types"
import { useRecipeStore } from "@/store/recipeStore"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
  onCook: (recipe: Recipe) => void
  onView: (recipe: Recipe) => void
}

export function RecipeCard({ recipe, onCook, onView }: RecipeCardProps) {
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useRecipeStore()
  const isSaved = isRecipeSaved(recipe.id)

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSaved) {
      unsaveRecipe(recipe.id)
    } else {
      saveRecipe(recipe)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card 
      className="w-full cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onView(recipe)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {recipe.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="ml-2 h-8 w-8"
          >
            {isSaved ? (
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            ) : (
              <HeartOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Recipe stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.timeMinutes}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <Badge 
            variant="secondary" 
            className={cn("flex items-center gap-1", getDifficultyColor(recipe.difficulty))}
          >
            <ChefHat className="h-3 w-3" />
            {recipe.difficulty}
          </Badge>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation()
              onCook(recipe)
            }} 
            className="flex-1"
          >
            Cook Now
          </Button>
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation()
              onView(recipe)
            }}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
