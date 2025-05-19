"use client"

import type React from "react"
import { TableHead } from "@/components/ui/table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SortableHeaderProps {
  field: string
  currentSortField: string | null
  currentSortDirection: "asc" | "desc" | null
  onSort: (field: string) => void
  className?: string
  children: React.ReactNode
}

export function SortableHeader({
  field,
  currentSortField,
  currentSortDirection,
  onSort,
  className,
  children,
}: SortableHeaderProps) {
  const isActive = currentSortField === field

  return (
    <TableHead className={cn("text-gray-400 cursor-pointer select-none", className)} onClick={() => onSort(field)}>
      <div className="flex items-center justify-between">
        <span>{children}</span>
        <span className="ml-2">
          {isActive ? (
            currentSortDirection === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-50" />
          )}
        </span>
      </div>
    </TableHead>
  )
}
