"use client";

import { useStore } from "@/app/store";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import CheckingElement from "./checking-element";

export default function ListOfCheckings() {
  const { checkings } = useStore((state) => ({ checkings: state.checkings }))

  return (
    <ScrollArea className="w-full min-h-12 h-12">
      <ul className="flex flex-row flex-nowrap">
        {checkings.map((checking, index) => (
          <li key={index} className="text-sm">
            <CheckingElement {...checking} />
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}