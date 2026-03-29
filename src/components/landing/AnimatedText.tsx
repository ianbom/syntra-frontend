import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Component = "span"
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const words = text.split(" ")

  return (
    <Component className={cn("inline-block", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className={cn(
              "inline-block transition-all duration-500 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            )}
            style={{
              transitionDelay: `${wordIndex * 60}ms`
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypewriterText({
  text,
  className,
  speed = 30,
  delay = 0
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    
    const startTyping = () => {
      let currentIndex = 0
      
      const type = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeout = setTimeout(type, speed)
        } else {
          setIsComplete(true)
        }
      }
      
      type()
    }

    const delayTimeout = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeout)
      clearTimeout(delayTimeout)
    }
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayText}
      <span
        className={cn(
          "inline-block w-[2px] h-[1em] ml-0.5 bg-[var(--landing-accent)]",
          isComplete ? "opacity-0" : "animate-[blink-caret_0.8s_step-end_infinite]"
        )}
      />
    </span>
  )
}
