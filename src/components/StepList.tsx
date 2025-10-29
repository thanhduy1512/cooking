import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock, Thermometer, Lightbulb } from "lucide-react"
import { CookingStep } from "@/lib/types"
import { cn } from "@/lib/utils"

interface StepListProps {
  steps: CookingStep[]
  currentStep?: number
  completedSteps?: string[]
  onToggleStep?: (stepId: string) => void
  showCheckboxes?: boolean
  className?: string
}

export function StepList({ 
  steps, 
  currentStep = 0,
  completedSteps = [], 
  onToggleStep,
  showCheckboxes = false,
  className 
}: StepListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">Instructions</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = index === currentStep
          
          return (
            <div 
              key={step.id}
              className={cn(
                "flex gap-4 p-4 rounded-lg border transition-all",
                isCurrent && "border-primary bg-primary/5",
                isCompleted && "opacity-75",
                showCheckboxes && "hover:bg-muted/50"
              )}
            >
              {showCheckboxes && (
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => onToggleStep?.(step.id)}
                  className="mt-1"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={isCurrent ? "default" : "secondary"}
                    className="text-xs"
                  >
                    Step {step.stepNumber}
                  </Badge>
                  
                  {step.timeMinutes && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{step.timeMinutes}min</span>
                    </div>
                  )}
                  
                  {step.temperature && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Thermometer className="h-3 w-3" />
                      <span>{step.temperature}</span>
                    </div>
                  )}
                </div>
                
                <p className={cn(
                  "text-sm leading-relaxed",
                  isCompleted && "line-through"
                )}>
                  {step.instruction}
                </p>
                
                {step.tips && (
                  <div className="mt-2 p-2 bg-muted/50 rounded-md">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        <strong>Tip:</strong> {step.tips}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
