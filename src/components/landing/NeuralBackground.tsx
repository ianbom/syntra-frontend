import { useEffect, useState } from "react"

interface GridLine {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}

export function NeuralBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [lines, setLines] = useState<GridLine[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Create minimal grid lines
    const gridLines: GridLine[] = []
    const spacing = 80
    let id = 0

    // Horizontal lines
    for (let y = spacing; y < window.innerHeight; y += spacing) {
      gridLines.push({
        id: id++,
        x1: 0,
        y1: y,
        x2: window.innerWidth,
        y2: y,
        delay: Math.random() * 2
      })
    }

    // Vertical lines
    for (let x = spacing; x < window.innerWidth; x += spacing) {
      gridLines.push({
        id: id++,
        x1: x,
        y1: 0,
        x2: x,
        y2: window.innerHeight,
        delay: Math.random() * 2
      })
    }

    setLines(gridLines)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Radial gradient for mouse glow */}
        <radialGradient id="mouse-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--landing-neural-node)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--landing-neural-node)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grid lines */}
      <g className="grid-lines">
        {lines.map(line => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--landing-neural-line)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Mouse follow glow */}
      <circle
        cx={mousePos.x}
        cy={mousePos.y}
        r="200"
        fill="url(#mouse-glow)"
        className="transition-all duration-300 ease-out"
      />

      {/* Intersection dots */}
      {lines
        .filter(l => l.x1 === l.x2) // vertical lines only
        .slice(0, 20)
        .map((line, i) => (
          <circle
            key={`dot-${i}`}
            cx={line.x1}
            cy={(i * 80) + 80}
            r="2"
            fill="var(--landing-neural-node)"
            className="animate-pulse"
            style={{ animationDelay: `${line.delay}s` }}
          />
        ))}
    </svg>
  )
}
