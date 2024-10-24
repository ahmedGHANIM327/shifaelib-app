import * as React from "react"
import { Search } from "lucide-react"
import { FC } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import debounce from 'debounce';

export const SearchInput:FC<{className?:string;handleSearch: (search: string) => void;containerClassName?:string;disabled?:boolean;label?:string; iconeClassName?: string}> = ({className,containerClassName,handleSearch, disabled = false, label, iconeClassName}) => {

  const debouncedHandleSearch = debounce(handleSearch, 500);

  return (
    <div className={cn("relative", containerClassName)}>
      <Input
        className={cn(
          "flex h-10 w-full rounded-md bg-background px-3 pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        type={'search'}
        disabled={disabled}
        placeholder={label || "rechercher..."}
        onChange={(e)=>debouncedHandleSearch(e.target.value)}
      />
      <Search
        className={cn("absolute left-2 top-0 w-4 h-full text-muted-foreground", iconeClassName)}
        aria-hidden="true"/>
    </div>
  )
}
