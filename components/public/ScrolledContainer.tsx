'use client'
import { useState, useEffect, useRef } from 'react'

export type TScrolledContainerProps = {
  children: React.ReactNode
  scrollDirection?: 'up' | 'down'
  scrollSpeed?: number
  className?: string
}

export const ScrolledContainer = ({
  children,
  scrollDirection: initialScrollDirection = 'down',
  scrollSpeed = 50,
  className = '',
}: TScrolledContainerProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [animationDuration, setAnimationDuration] = useState(0)

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerHeight = containerRef.current.offsetHeight
      const contentHeight = contentRef.current.offsetHeight
      const totalHeight = contentHeight + containerHeight

      const duration = totalHeight / scrollSpeed
      setAnimationDuration(duration)
    }
  }, [scrollSpeed])

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-hidden flex-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={contentRef}
        className={`flex flex-col flex-1 gap-6 box-border pb-6`}
        style={{
          animation: `${animationDuration}s linear infinite ${
            initialScrollDirection === 'up' ? 'reverse' : 'normal'
          } ${isHovered ? 'paused' : 'running'} scroll`,
        }}
      >
        {children}
      </div>
      <div
        className={`flex flex-col flex-1 gap-6 box-border pb-6`}
        style={{
          animation: `${animationDuration}s linear infinite ${
            initialScrollDirection === 'up' ? 'reverse' : 'normal'
          } ${isHovered ? 'paused' : 'running'} scroll`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

ScrolledContainer.displayName = 'ScrolledContainer'
