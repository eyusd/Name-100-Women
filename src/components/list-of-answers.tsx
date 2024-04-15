"use client";

import { useStore } from "@/app/store"
import { ScrollArea } from "@/components/ui/scroll-area"
import AnswerElement from "./answer-element"
import ListOfCheckings from "./list-of-checkings";
import StopWatch from "./stopwatch";
import { useEffect } from "react";

export default function ListOfAnswers() {

  const { answers, endGame } = useStore((state) => ({
    answers: state.answers,
    endGame: state.endGame,
  }));

  useEffect(() => {
    if (answers.length >= 100) {
      endGame();
    }
  }, [answers.length]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden w-full">
      <div className="flex flex-row justify-between p-4">
        <h2 className="text-lg font-semibold">Your list</h2>
        <span className="text-sm text-gray-400">{answers.length}/100</span>
      </div>
      <ScrollArea className="rounded-md border p-4 flex-1">
        <div className="flex flex-row flex-wrap gap-2">
          {answers.map((answer, index) => (
            <div key={index}>
              <AnswerElement {...answer} />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-row justify-between">
        <ListOfCheckings />
        <StopWatch />
      </div>
    </div>
  )
}