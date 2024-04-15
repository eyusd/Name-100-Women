"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SubmitResponse, SubmitSuccess, isSubmitError } from "@/app/api/submit/types"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checking, useStore } from "@/app/store"
import {v4 as uuidv4} from 'uuid';
import { useCallback } from "react"
import { useToast } from "./ui/use-toast"
import { not } from "@/lib/utils"


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export default function InputForm() {

  const { toast } = useToast()
  const { addChecking, removeChecking, addAnswer } = useStore((state) => ({ 
    addChecking: state.addChecking,
    removeChecking: state.removeChecking,
    addAnswer: state.addAnswer
  }))

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    }
  })

  const failed = (id: Checking["id"], title: string, description: string) => {
    toast({ title, description })
    removeChecking(id)
  }

  const success = (id: Checking["id"], res: SubmitSuccess) => {
    addAnswer(res)
    removeChecking(id)
  }

  const checkAnswer = (name: string, id: string) => fetch(`/api/submit?name=${name}`)
    .then((response) => {
      if (not(response.ok) || not(response.status == 200)) {
        return failed(id, "Network error", `Could not check ${name}.`)
      }

      return response.json().then((json: SubmitResponse) => {
        if (isSubmitError(json)) {
          return failed(id, "No match", `${name} has no matching entry in the database.`)
        }

        return success(id, json)
      })
    })

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    const id = uuidv4()
    addChecking({ name: data.name, id })

    form.setValue("name", "")
    form.setFocus("name")

    checkAnswer(data.name, id)

  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full xl:w-2/3 space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <div className="flex flex-row items-center gap-3">
                <FormControl>
                  <Input 
                    placeholder="Enter a name" 
                    autoComplete="off"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
