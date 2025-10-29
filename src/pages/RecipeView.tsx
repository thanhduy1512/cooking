import { useState } from "react"
import { Recipe } from "@/lib/types"
import { useRecipeStore } from "@/store/recipeStore"
import { IngredientList } from "@/components/IngredientList"
import { StepList } from "@/components/StepList"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  ChefHat, 
  Heart, 
  HeartOff, 
  Share2,
  Utensils,
  Flame
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RecipeViewProps {
  recipe: Recipe
  onBack: () => void
  onCook: (recipe: Recipe) => void
}

export function RecipeView({ recipe, onBack, onCook }: RecipeViewProps) {
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useRecipeStore()
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
  
  const isSaved = isRecipeSaved(recipe.id)

  const handleSave = () => {
    if (isSaved) {
      unsaveRecipe(recipe.id)
    } else {
      saveRecipe(recipe)
    }
  }

  const handleToggleIngredient = (ingredientId: string) => {
    setCheckedIngredients(prev => 
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    )
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold flex-1 truncate">
            {recipe.title}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="h-8 w-8"
          >
            {isSaved ? (
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            ) : (
              <HeartOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Recipe Image Placeholder */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <Utensils className="h-16 w-16 text-muted-foreground" />
        </div>

        {/* Recipe Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{recipe.title}</CardTitle>
            <p className="text-muted-foreground">{recipe.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.timeMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
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
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Nutrition Info */}
            {recipe.nutrition && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold">{recipe.nutrition.calories}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{recipe.nutrition.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{recipe.nutrition.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{recipe.nutrition.fat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={() => onCook(recipe)}
                className="flex-1"
                size="lg"
              >
                <Flame className="h-4 w-4 mr-2" />
                Start Cooking
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <IngredientList
          ingredients={recipe.ingredients}
          checkedIngredients={checkedIngredients}
          onToggleIngredient={handleToggleIngredient}
          showCheckboxes={true}
        />

        {/* Instructions */}
        <StepList
          steps={recipe.steps}
          completedSteps={[]}
          showCheckboxes={true}
        />
      </div>
    </div>
  )
}
