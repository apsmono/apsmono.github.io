import { MotionConfig } from 'motion/react'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { PortfolioPage } from '@/components/portfolio/PortfolioPage'

export default function App() {
  return (
    // reducedMotion="user" strips transform/layout animation for users with
    // prefers-reduced-motion while keeping opacity fades.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <PortfolioPage />
      </ThemeProvider>
    </MotionConfig>
  )
}
