import React, { useContext, useRef, useState, useMemo } from 'react'
import './404.scss'
import rainAudio from '@assets/audio/rain-audio.wav'
import RainingCanvas from '@components/raining-canvas'
import SEO from '@components/seo'
import { ThemeContext } from '@contexts/theme-context'

const NotFoundPage: React.FC<PageProps> = () => {
  const { theme } = useContext(ThemeContext)
  const containerRef = useRef<HTMLDivElement>(null)

  const [amount, setAmount] = useState(30)
  const [speed, setSpeed] = useState(15)
  const [thunderRate, setThunderRate] = useState(0.1)

  console.log(speed)

  const { color, isThunder } = useMemo(() => {
    let color = '#eeeeee'
    let isThunder = true
    if (theme === 'light') {
      color = '#888888'
      isThunder = false
    }
    return { color, isThunder }
  }, [theme])

  return (
    <div className="not-found--layout" ref={containerRef}>
      <RainingCanvas
        containerRef={containerRef}
        color={color}
        isThunder={isThunder}
        amount={amount}
        speed={speed}
        thunderRate={thunderRate}
      />
      <div className="not-found__content">
        <audio src={rainAudio} autoplay loop />
        <div className="not-found__text">404</div>
        <div className="not-found__input">
          <label htmlFor="rain-amount-input">Rain Amount</label>
          <input
            type="range"
            id="rain-amount-input"
            name="rain-amount"
            min="1"
            max="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="not-found__input">
          <label htmlFor="rain-speed-input">Rain Speed</label>
          <input
            type="range"
            id="rain-speed-input"
            name="rain-speed"
            min="1"
            max="50"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="not-found__input">
          <label htmlFor="rain-amount-input">Thunder Rate</label>
          <input
            type="range"
            id="thunder-rate-input"
            name="thunder-rate"
            min="1"
            max="10"
            value={thunderRate * 10}
            onChange={(e) => setThunderRate(e.target.value / 10)}
          />
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

export const Head = () => (
  <SEO title="Not found" decription="Not found" pathname="/404" />
)
