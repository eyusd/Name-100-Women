"use client";

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button";
import { Checking } from "@/app/store";

export type CheckingProps = { name: Checking["name"] };

export default function CheckingElement({ name }: CheckingProps) {
  return (
    <Button 
      variant="link"
      className="flex items-center"
      disabled
    >
      {name}
      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
    </Button>
  )
}