import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface ParticleFieldProps {
  count?: number
  className?: string
}

export function ParticleField({ count = 30, className = "" }: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: "-20px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `var(--landing-particle)`,
            boxShadow: `0 0 ${particle.size * 2}px var(--landing-glow-cyan)`,
            animation: `particle-drift ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}
