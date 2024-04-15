import { SubmitSuccess } from "@/app/api/submit/types";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type AnswerProps = SubmitSuccess

export default function AnswerElement({ title, summary, fullUrl, thumbnail }: AnswerProps) {

  const shortenedTitle = useMemo(() => title.split("(")[0], [title])

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button 
          variant="outline"
        >
          {shortenedTitle}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 h-60 overflow-hidden">
        <div className="flex justify-between space-x-4 h-full">
          { thumbnail && (
            <div className="flex flex-col justify-between min-w-20">
              <Image
                src={thumbnail.source}
                alt={title}
                width={thumbnail.width}
                height={thumbnail.height}
                className="rounded-md"
              />
            </div>
          )}
          <div className="space-y-1 flex flex-col">
            <h4 className="text-sm font-semibold">{title}</h4>
            <div className="flex-1 overflow-hidden text-ellipsis break-words">
              <p className="text-sm">
                {summary}
              </p>
            </div>
            <Link
              href={fullUrl}
              referrerPolicy="no-referrer"
              target="_blank"
              legacyBehavior
            >
              <a
                className={cn(
                  "text-sm font-semibold",
                  "text-blue-600 hover:underline"
                )}
              >
                Read more
              </a>
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
