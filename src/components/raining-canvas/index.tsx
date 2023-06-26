import React, { useEffect, useRef } from 'react'

type Props = {
  amount?: number
  speed?: number
  color?: string
  isThunder?: boolean
  thunderRate?: number
  containerRef?: React.RefObject<HTMLDivElement>
}

const RainingCanvas: React.FC<Props> = ({
  amount = 40,
  speed = 20,
  color = '#ffffff',
  isThunder = true,
  thunderRate = 0.1,
  containerRef = null,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rainDropArray = []
    let rainSplashArray = []
    let thunder = null
    if (isThunder) {
      thunder = new Thunder()
    }

    console.log(containerRef.current)

    const mouse = { x: 0, y: 0, isActive: false } // 마우스 정보

    // canvas 초기화 함수
    const init = () => {
      rainDropArray = []
      rainSplashArray = [] // 이거는 RainDrop 클래스에서 채워진다
      const innerWidth = containerRef
        ? containerRef.current.offsetWidth
        : window.innerWidth
      const innerHeight = containerRef
        ? containerRef.current.offsetHeight
        : window.innerHeight
      canvas.width = innerWidth
      canvas.height = innerHeight
      const total = Math.floor((innerWidth * innerHeight * amount) / 400000)

      for (let i = 0; i < total; i++) {
        const x = Math.random() * innerWidth
        const y = Math.random() * innerHeight
        // const dx = Math.random() * 2 - 1 // -1 ~ 1 // 속도에 따라 달라지므로 animate 함수에서 계산
        const dy = Math.random() * 5 + speed // 13 ~ 18
        rainDropArray.push(new RainDrop(x, y, dy, color, rainSplashArray))
      }
    }

    // cavnas 렌더링(애니메이션) 함수
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rainDropArray.forEach((rainDrop) => rainDrop.animate(ctx, mouse))
      rainSplashArray.forEach((rainSplash, index) => {
        rainSplash.animate(ctx)
        // 튀기는 물방울은 1회성으로 제거
        if (rainSplash.y > canvas.height) {
          rainSplashArray.splice(index, 1)
        }
      })
      if (thunder) {
        if (Math.random() < thunderRate * 0.05) {
          thunder.opacity = 0.3
        }
        thunder.animate(ctx)
      }
      requestAnimationFrame(render)
    }

    window.addEventListener('resize', init)
    canvas.addEventListener('mouseenter', () => (mouse.isActive = true))
    canvas.addEventListener('mouseleave', () => (mouse.isActive = false))
    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX // 마우스 좌표를 넣어줌
      mouse.y = e.clientY
    })

    init()
    render()

    return () => {
      window.removeEventListener('resize', init)
    }
  }, [color, amount, speed, isThunder, thunderRate, containerRef])

  return <canvas ref={canvasRef} />
}

export default RainingCanvas

// 떨어지는 빗방울
class RainDrop {
  // 생성자 (위치 좌표, 이동 속도)
  constructor(x, y, dy, color, splashArray) {
    this.x = x
    this.y = y
    this.dy = dy
    this.color = color
    this.splashArray = splashArray
  }

  // 빗줄기 그리기
  draw(ctx) {
    const { x, y, dx, dy, color } = this
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 2 * dx, y + 2 * dy)
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // 튀기는 물방울 그리기
  splash() {
    const { x, y, dx, dy, color, splashArray } = this
    for (let i = 0; i < 3; i++) {
      const splash_dx = -dx + Math.random() * 6 - 3
      const splash_dy = -dy + Math.random() * 3 + 11
      splashArray.push(new RainSplash(x, y, splash_dx, splash_dy, color))
    }
  }

  // 빗줄기 이동
  animate(ctx, mouse) {
    if (this.y > ctx.canvas.height) {
      this.splash()
      this.x = Math.random() * ctx.canvas.width * 1.4 - ctx.canvas.width * 0.2 // 아니면 시간이 지날 수록, 언젠가는 빗줄기가 캔버스 바깥으로 사라진다
      this.y = -20
    }
    this.dx = mouse.isActive
      ? Math.random() * 2 - 1 + (mouse.x - ctx.canvas.width / 2) / 80
      : Math.random() * 2 - 1
    this.x += this.dx
    this.y += this.dy
    this.draw(ctx)
  }
}

// 빗방울 떨어졌을 때 튀기는 물방울
class RainSplash {
  // 생성자 (위치 좌표, 이동 속도)
  constructor(x, y, dx, dy, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.color = color
    this.gravity = 1.5
  }

  // 물방울 그리기
  draw(ctx) {
    const { x, y, color } = this
    ctx.beginPath()
    ctx.arc(x, y, 1.5, 0, Math.PI * 2) // 원형
    ctx.fillStyle = color
    ctx.fill()
  }

  // 물방울 애니메이션 (포물선 형태로 올라갔다가 떨어짐)
  animate(ctx) {
    this.dy += this.gravity
    this.x += this.dx
    this.y += this.dy
    this.draw(ctx)
  }
}

class Thunder {
  // 생성자
  constructor() {
    this.opacity = 0
  }

  // 천둥 그리기
  draw(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height) // gradient 좌표정보
    gradient.addColorStop(0, `rgba(180, 190, 255, ${this.opacity})`) // 시작 색상 (offset, color)
    gradient.addColorStop(1, `rgba(0, 0, 0, 0)`) // 끝 색상(offset, color)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  // 천둥 애니메이션
  animate(ctx) {
    if (this.opacity < 0) return
    this.opacity -= 0.003
    this.draw(ctx)
  }
}
