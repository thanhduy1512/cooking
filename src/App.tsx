import { useState } from "react"
import { Recipe } from "./lib/types"
import { Home } from "./pages/Home"
import { RecipeView } from "./pages/RecipeView"
import { CookingMode } from "./pages/CookingMode"
import { Saved } from "./pages/Saved"
import { Navbar } from "./components/Navbar"

type Page = 'home' | 'saved' | 'cooking' | 'recipes'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null)

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    if (page !== 'recipes') {
      setCurrentRecipe(null)
    }
  }

  const handleViewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe)
    setCurrentPage('recipes')
  }

  const handleCookRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe)
    setCurrentPage('cooking')
  }

  const handleBack = () => {
    if (currentRecipe) {
      setCurrentRecipe(null)
      setCurrentPage('home')
    } else {
      setCurrentPage('home')
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            onViewRecipe={handleViewRecipe}
            onCookRecipe={handleCookRecipe}
          />
        )
      case 'saved':
        return (
          <Saved
            onViewRecipe={handleViewRecipe}
            onCookRecipe={handleCookRecipe}
          />
        )
      case 'cooking':
        return <CookingMode onBack={handleBack} />
      case 'recipes':
        return currentRecipe ? (
          <RecipeView
            recipe={currentRecipe}
            onBack={handleBack}
            onCook={handleCookRecipe}
          />
        ) : (
          <Home
            onViewRecipe={handleViewRecipe}
            onCookRecipe={handleCookRecipe}
          />
        )
      default:
        return (
          <Home
            onViewRecipe={handleViewRecipe}
            onCookRecipe={handleCookRecipe}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  )
}

export default App