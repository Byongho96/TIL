import * as React from 'react'
import TypeAnimation from '@components/type-animation'

const SsrPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TypeAnimation
        phrases={['I love chicken', 'Do you like chicken?', 'Of course!!!']}
        speed={7}
        style={{
          color: 'gray',
          fontSize: '4rem',
          fontWeight: 'bold',
        }}
        pause={2000}
        isInfinite={true}
      />
    </div>
  )
}

export default SsrPage
