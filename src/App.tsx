import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { PortfolioPage } from '@/components/portfolio/PortfolioPage'

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioPage />
    </ThemeProvider>
  )
}
