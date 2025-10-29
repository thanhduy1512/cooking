import { useState, useEffect } from "react"
import { Recipe } from "@/lib/types"
import { useRecipeStore } from "@/store/recipeStore"
import { IngredientList } from "@/components/IngredientList"
import { StepList } from "@/components/StepList"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  Pause, 
  RotateCcw,
  Clock,
  ChefHat
} from "lucide-react"

interface CookingModeProps {
  onBack: () => void
}

export function CookingMode({ onBack }: CookingModeProps) {
  const { cookingState, nextStep, previousStep, completeStep, stopCooking } = useRecipeStore()
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  const recipe = cookingState.currentRecipe
  const currentStepIndex = cookingState.currentStep
  const currentStep = recipe?.steps[currentStepIndex]
  const progress = recipe ? ((currentStepIndex + 1) / recipe.steps.length) * 100 : 0

  // Timer effect
  useEffect(() => {
    if (!cookingState.isCooking || isPaused) return

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [cookingState.isCooking, isPaused])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleToggleIngredient = (ingredientId: string) => {
    setCheckedIngredients(prev => 
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const handleCompleteStep = (stepId: string) => {
    completeStep(stepId)
  }

  const handleNext = () => {
    if (currentStepIndex < (recipe?.steps.length || 0) - 1) {
      nextStep()
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      previousStep()
    }
  }

  const handleStop = () => {
    stopCooking()
    onBack()
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Active Cooking Session</h2>
          <p className="text-muted-foreground mb-4">
            Start cooking a recipe to see the guided mode
          </p>
          <Button onClick={onBack}>
            Back to Recipes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold truncate">{recipe.title}</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {recipe.steps.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="h-8 w-8"
          >
            {isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-lg font-mono">{formatTime(elapsedTime)}</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Step */}
        {currentStep && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Step {currentStep.stepNumber}</span>
                {cookingState.completedSteps.includes(currentStep.id) && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">{currentStep.instruction}</p>
              
              {currentStep.timeMinutes && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Estimated time: {currentStep.timeMinutes} minutes</span>
                </div>
              )}

              {currentStep.tips && (
                <div className="p-3 bg-muted/50 rounded-md">
                  <p className="text-sm">
                    <strong>Tip:</strong> {currentStep.tips}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleCompleteStep(currentStep.id)}
                  disabled={cookingState.completedSteps.includes(currentStep.id)}
                  className="flex-1"
                >
                  {cookingState.completedSteps.includes(currentStep.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark Complete'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ingredients */}
        <IngredientList
          ingredients={recipe.ingredients}
          checkedIngredients={checkedIngredients}
          onToggleIngredient={handleToggleIngredient}
          showCheckboxes={true}
        />

        {/* All Steps */}
        <div>
          <h3 className="text-lg font-semibold mb-4">All Steps</h3>
          <StepList
            steps={recipe.steps}
            currentStep={currentStepIndex}
            completedSteps={cookingState.completedSteps}
            onToggleStep={handleCompleteStep}
            showCheckboxes={true}
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStepIndex === recipe.steps.length - 1}
            className="flex-1"
          >
            Next
          </Button>
        </div>

        {/* Stop Cooking */}
        <Button
          variant="destructive"
          onClick={handleStop}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Stop Cooking
        </Button>
      </div>
    </div>
  )
}
