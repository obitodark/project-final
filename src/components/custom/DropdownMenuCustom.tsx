import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

interface Props {
  children: React.ReactNode;
  label?: string;
  name?: string;
  icon?: React.ReactElement;
}
export const DropdownMenuCustom = ({ children, label, name, icon }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" p-2">
          {name && name}
          {icon && icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

