"use client";

import InputForm from "@/components/input-form";
import ListOfAnswers from "@/components/list-of-answers";
import { Button } from "@/components/ui/button";
import { useStore } from "./store";
import { SubmitSuccess } from "./api/submit/types";
import { displayTime } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnswerElement from "@/components/answer-element";

function GameNotStarted() {

  const { startGame } = useStore((state) => ({
    startGame: state.startGame,
  }));

  return (
    <div className="flex-1 flex flex-col items-center justify-around gap-4">
      <p>
        The goal of the game is simple : name 100 famous women.<br/>
        There are no restriction of occupation, age, ethnicity, and you can name dead or living persons.
        A woman is considered famous if she has a Wikipedia page that is referenced in the database. 
        You can also add a disambiguation with parenthesis if that's needed.<br/>
        Also, the gender of the persons have been inferred from the Wikipedia page, based on the context of the
        words, and the pronouns used.<br/>
        Be kind, mistakes can happen, and the game is here to have fun and learn.<br/>
        <br/>
        Good luck !
      </p>
      <Button onClick={startGame} variant="default">
        Start
      </Button>
    </div>
  );
}

function GameStarted() {
  return (
    <>
      <ListOfAnswers />
      <InputForm />
    </>
  );
}

function GameEnded() {

  const { answers, gameStart, gameEnd, resetGame } = useStore((state) => ({
    answers: state.answers,
    gameStart: state.gameStart ?? Date.now(),
    gameEnd: state.gameEnd ?? Date.now(),
    resetGame: state.resetGame,
  }));

  const randomSelection = answers.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div className="flex-1 flex flex-col items-center justify-around gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Congratulations !</h2>
        <p>{`${randomSelection.map((answer) => answer.title).join(", ")}... You completed the list !`}</p>
        <h3 className="text-lg font-semibold">{`Your time: ${displayTime(gameEnd - gameStart)}`}</h3>
      </div>

      <div className="flex flex-row gap-4">
        <Button onClick={resetGame} variant="default">
          Replay
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              List
            </Button>
          </DialogTrigger>
          <DialogContent className="h-5/6 w-5/6">
            <DialogHeader>
              <DialogTitle>Your answers</DialogTitle>
            </DialogHeader>
            <ScrollArea className="rounded-md border p-4">
              <div className="flex flex-row flex-wrap gap-2">
                {answers.map((answer, index) => (
                  <div key={index}>
                    <AnswerElement {...answer} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function Home() {

  const { gameState } = useStore((state) => ({
    gameState: state.gameState
  }));

  return (
    <main className="h-full w-full flex flex-col items-center justify-between transition-all p-4 lg:p-8 xl:px-24 xl:max-w-screen-xl">
      <h1 className="text-4xl font-bold">Name 100 Women</h1>
      {gameState === "not-started" && <GameNotStarted/>}
      {gameState === "started" && <GameStarted />}
      {gameState === "finished" && <GameEnded />}
    </main>
  );
}
