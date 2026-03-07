"use client"

import { useEffect, useRef } from "react"

// Simplex noise implementation for organic flow
class SimplexNoise {
  private perm: number[] = []
  private grad3: number[][] = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
  ]

  constructor(seed = Math.random() * 1000) {
    const p: number[] = []
    for (let i = 0; i < 256; i++) p[i] = i
    
    // Shuffle using seed
    let n = seed
    for (let i = 255; i > 0; i--) {
      n = (n * 16807) % 2147483647
      const j = n % (i + 1)
      ;[p[i], p[j]] = [p[j], p[i]]
    }
    
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255]
  }

  noise2D(x: number, y: number): number {
    const F2 = 0.5 * (Math.sqrt(3) - 1)
    const G2 = (3 - Math.sqrt(3)) / 6

    const s = (x + y) * F2
    const i = Math.floor(x + s)
    const j = Math.floor(y + s)
    const t = (i + j) * G2
    const X0 = i - t
    const Y0 = j - t
    const x0 = x - X0
    const y0 = y - Y0

    const i1 = x0 > y0 ? 1 : 0
    const j1 = x0 > y0 ? 0 : 1
    const x1 = x0 - i1 + G2
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1 + 2 * G2
    const y2 = y0 - 1 + 2 * G2

    const ii = i & 255
    const jj = j & 255

    let n0 = 0, n1 = 0, n2 = 0

    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 >= 0) {
      const gi0 = this.perm[ii + this.perm[jj]] % 12
      t0 *= t0
      n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0)
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 >= 0) {
      const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12
      t1 *= t1
      n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1)
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 >= 0) {
      const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12
      t2 *= t2
      n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2)
    }

    return 70 * (n0 + n1 + n2)
  }

  // Fractal Brownian Motion for more detail
  fbm(x: number, y: number, octaves: number = 4): number {
    let value = 0
    let amplitude = 1
    let frequency = 1
    let maxValue = 0

    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, y * frequency)
      maxValue += amplitude
      amplitude *= 0.5
      frequency *= 2
    }

    return value / maxValue
  }
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Create multiple noise generators for layered movement
    const noise1 = new SimplexNoise(42)
    const noise2 = new SimplexNoise(137)
    const noise3 = new SimplexNoise(256)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    // Pre-generate static grain particles
    let grainParticles: { x: number; y: number; opacity: number; size: number }[] = []
    
    const generateGrain = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const grainDensity = 0.025
      const grainCount = Math.floor(width * height * grainDensity)
      
      grainParticles = []
      for (let g = 0; g < grainCount; g++) {
        grainParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          opacity: Math.random() * 0.06 + 0.02,
          size: Math.random() * 1.2 + 0.3
        })
      }
    }

    const handleResize = () => {
      resize()
      generateGrain()
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

      // Moderate spacing - between previous versions
      const dotSpacing = Math.max(14, Math.min(20, width / 80))
      const minRadius = 0.8
      const maxRadius = dotSpacing * 0.32

      const cols = Math.ceil(width / dotSpacing) + 2
      const rows = Math.ceil(height / dotSpacing) + 2

      // Slow, gentle time progression
      const slowTime = time * 0.12

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * dotSpacing
          const baseY = j * dotSpacing

          // Normalize coordinates for noise
          const nx = baseX / width
          const ny = baseY / height

          // High-frequency noise for grainy texture
          const grain1 = noise1.noise2D(nx * 20 + slowTime * 0.6, ny * 20 - slowTime * 0.5)
          const grain2 = noise2.noise2D(nx * 30 - slowTime * 0.4, ny * 30 + slowTime * 0.5)
          
          // Broader noise to create larger "patches" of fewer dots
          const broad = noise1.fbm(nx * 4 + slowTime * 0.15, ny * 4 - slowTime * 0.1, 3)

          const x = baseX
          const y = baseY

          // Combine noise - broad controls whether dots appear at all
          const grainCombined = (grain1 * 0.5 + grain2 * 0.5)
          
          // Use broad noise as a threshold - creates sparse areas
          const threshold = broad * 0.5 + 0.5
          
          // Skip dots based on threshold - creates empty patches (slightly less aggressive)
          if (threshold < 0.4) continue

          // Intensity from grain
          let intensity = grainCombined * 0.5 + 0.5
          
          // Modulate by threshold so edge dots are dimmer
          intensity *= (threshold - 0.4) / 0.6

          // Clamp intensity
          intensity = Math.max(0, Math.min(1, intensity))
          
          // Darker opacity range
          const opacity = 0.08 + intensity * 0.16

          // Size varies with intensity
          const sizeNoise = noise3.noise2D(nx * 15 + slowTime * 0.3, ny * 15 - slowTime * 0.25) * 0.5 + 0.5
          const radius = minRadius + (maxRadius - minRadius) * intensity * (0.6 + sizeNoise * 0.4)

          // Skip tiny dots
          if (radius < 0.5 || opacity < 0.05) continue

          // Draw dot
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
        }
      }

      // Draw static film grain overlay
      for (const grain of grainParticles) {
        ctx.beginPath()
        ctx.arc(grain.x, grain.y, grain.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${grain.opacity})`
        ctx.fill()
      }

      time += 0.016
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ background: "#000000", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: -1 }}
    />
  )
}
