import { useStore } from "@/app/store";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { RotateCcwIcon } from "lucide-react";
import { displayTime } from "@/lib/utils";


export default function StopWatch() {
  const { gameState, gameStart, resetGame } = useStore((state) => ({
    gameState: state.gameState,
    gameStart: state.gameStart,
    resetGame: state.resetGame,
  }));

  if (gameState === "not-started" || gameState === "finished") {
    return null;
  }

  const [elapsedTime, setElapsedTime] = useState(0);


  useEffect(() => {
    if (gameStart === null) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - gameStart);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameStart]);

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <span className="text-sm text-gray-400 font-mono">
        {displayTime(elapsedTime)}
      </span>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <RotateCcwIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to reset?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will reset the game and all your progress.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              type="button"
              variant="default"
              onClick={resetGame}
            >
              Confirm
            </Button>
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="secondary"
              >
                Close
              </Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
