import { useCallback, useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = (canvas.width  = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    // ── Particle factory ────────────────────────────────────────
    const COLORS = ['#a855f7', '#3b82f6', '#06b6d4', '#ec4899', '#ffffff']
    const rand = (min, max) => Math.random() * (max - min) + min

    const makeParticle = () => ({
      x:    rand(0, W),
      y:    rand(0, H),
      r:    rand(0.3, 1.8),
      dx:   rand(-0.12, 0.12),
      dy:   rand(-0.08, 0.08),
      alpha: rand(0.3, 1),
      dAlpha: rand(0.002, 0.006) * (Math.random() > 0.5 ? 1 : -1),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const PARTICLE_COUNT = Math.min(200, Math.floor((W * H) / 8000))
    let particles = Array.from({ length: PARTICLE_COUNT }, makeParticle)

    // ── Shooting stars ──────────────────────────────────────────
    const makeShooter = () => ({
      x: rand(0, W),
      y: rand(0, H * 0.5),
      len: rand(80, 160),
      speed: rand(6, 14),
      angle: rand(20, 50) * (Math.PI / 180),
      alpha: 1,
      active: true,
    })

    let shooters = []
    const spawnShooter = () => {
      if (shooters.length < 3) shooters.push(makeShooter())
    }
    const shooterInterval = setInterval(spawnShooter, 3000)

    // ── Draw loop ────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Stars
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle   = p.color
        ctx.fill()

        p.x += p.dx
        p.y += p.dy
        p.alpha += p.dAlpha
        if (p.alpha <= 0.2 || p.alpha >= 1) p.dAlpha *= -1
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      })

      // Shooting stars
      shooters = shooters.filter((s) => s.alpha > 0)
      shooters.forEach((s) => {
        ctx.save()
        ctx.globalAlpha = s.alpha
        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        )
        grad.addColorStop(0, '#ffffff')
        grad.addColorStop(1, 'transparent')
        ctx.strokeStyle = grad
        ctx.lineWidth   = 1.5
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        ctx.stroke()
        ctx.restore()

        s.x    += Math.cos(s.angle) * s.speed
        s.y    += Math.sin(s.angle) * s.speed
        s.alpha -= 0.02
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      particles = Array.from({ length: PARTICLE_COUNT }, makeParticle)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(shooterInterval)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const cleanup = init()
    return cleanup
  }, [init])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
