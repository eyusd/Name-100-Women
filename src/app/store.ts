import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SubmitSuccess } from '@/app/api/submit/types'

export enum GameState {
  NotStarted = "not-started",
  Started = "started",
  Finished = "finished",
}

export type Checking = {
  name: string;
  id: string;
}

export type Store = {
  gameState: GameState;
  gameStart: number | null;
  gameEnd: number | null;
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  answers: SubmitSuccess[];
  addAnswer: (answer: SubmitSuccess) => void;
  checkings: Checking[];
  addChecking: (checking: Checking) => void;
  removeChecking: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      gameState: GameState.NotStarted,
      gameStart: null,
      gameEnd: null,
      startGame: () => set({ gameState: GameState.Started, gameStart: Date.now(), answers: [], checkings: [] }),
      endGame: () => set({ gameState: GameState.Finished, gameEnd: Date.now(), checkings: [] }),
      resetGame: () => set({ gameState: GameState.NotStarted, gameStart: null, gameEnd: null, answers: [], checkings: [] }),
      answers: [],
      addAnswer: (answer) => set((state) => {
        if (!Boolean(state.answers.find((item) => item.id === answer.id))) {
          return { answers: [...state.answers, answer]}
        } else {
          return { answers: state.answers }
        }
      }),
      checkings: [],
      addChecking: (checking) => set((state) => ({ checkings: [...state.checkings, checking] })),
      removeChecking: (id) => set((state) => ({ checkings: state.checkings.filter((checking) => checking.id !== id) })),
    }),
    {
      name: 'name100women',
      storage: createJSONStorage(() => sessionStorage),
    },
  )
)