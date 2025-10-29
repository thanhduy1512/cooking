import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRecipeStore } from "@/store/recipeStore"

interface ChatInputProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function ChatInput({ 
  placeholder = "What would you like to cook?", 
  onSearch 
}: ChatInputProps) {
  const [query, setQuery] = useState("")
  const { setSearchQuery } = useRecipeStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchQuery(query.trim())
      onSearch?.(query.trim())
    }
  }

  const handleClear = () => {
    setQuery("")
    setSearchQuery("")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  )
}
