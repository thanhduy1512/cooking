import { Checkbox } from "@/components/ui/checkbox"
import { Ingredient } from "@/lib/types"
import { cn } from "@/lib/utils"

interface IngredientListProps {
  ingredients: Ingredient[]
  checkedIngredients?: string[]
  onToggleIngredient?: (ingredientId: string) => void
  showCheckboxes?: boolean
  className?: string
}

export function IngredientList({ 
  ingredients, 
  checkedIngredients = [], 
  onToggleIngredient,
  showCheckboxes = false,
  className 
}: IngredientListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-lg font-semibold">Ingredients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient) => {
          const isChecked = checkedIngredients.includes(ingredient.id)
          
          return (
            <li 
              key={ingredient.id}
              className={cn(
                "flex items-start gap-3 p-2 rounded-md transition-colors",
                showCheckboxes && "hover:bg-muted/50",
                isChecked && "opacity-60"
              )}
            >
              {showCheckboxes && (
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggleIngredient?.(ingredient.id)}
                  className="mt-0.5"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-medium",
                    isChecked && "line-through"
                  )}>
                    {ingredient.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
                {ingredient.notes && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {ingredient.notes}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
