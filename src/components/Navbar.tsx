import { Home, BookOpen, ChefHat, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'cooking', label: 'Cooking', icon: ChefHat },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3",
                isActive && "text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
