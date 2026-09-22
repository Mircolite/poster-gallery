import { useState, useMemo } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import YearSelector from './components/YearSelector'
import PosterCard from './components/PosterCard'
import Lightbox from './components/Lightbox'
import ScrollToTop from './components/ScrollToTop'
import { posters as posters2026 } from './data/posters'
import { posters2025 } from './data/posters2025'

const allPosters = [...posters2025, ...posters2026]
const years = [...new Set(allPosters.map(p => p.year))].sort((a, b) => b - a)

export default function App() {
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedPoster, setSelectedPoster] = useState(null)

  const yearPosters = useMemo(() => allPosters.filter(p => p.year === selectedYear), [selectedYear])

  const filteredPosters = useMemo(() => {
    let result = [...yearPosters]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [searchQuery, yearPosters])

  const gridClass = viewMode === 'large'
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
    : viewMode === 'list'
    ? 'grid-cols-1 gap-3 max-w-3xl mx-auto'
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'

  return (
    <div className="min-h-screen bg-bg">
      <Hero total={yearPosters.length} year={selectedYear} />

      <div id="gallery">
        <div className="sticky top-0 z-30 bg-bg/80 backdrop-blur-xl border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            <YearSelector years={years} selectedYear={selectedYear} onChange={setSelectedYear} />
          </div>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={filteredPosters.length}
          totalCount={yearPosters.length}
        />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <LayoutGroup>
            <div className={`grid ${gridClass}`}>
              <AnimatePresence mode="popLayout">
                {filteredPosters.map((poster, i) => (
                  <PosterCard
                    key={poster.id}
                    poster={poster}
                    index={i}
                    onClick={setSelectedPoster}
                    viewMode={viewMode}
                  />
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>

          {filteredPosters.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <p className="text-text-secondary text-lg">没有找到匹配的作品</p>
              <p className="text-text-secondary text-sm mt-2">试试其他关键词</p>
            </div>
          )}
        </main>
      </div>

      <ScrollToTop />

      <AnimatePresence>
        {selectedPoster && (
          <Lightbox
            poster={selectedPoster}
            posters={filteredPosters}
            onClose={() => setSelectedPoster(null)}
            onNavigate={setSelectedPoster}
          />
        )}
      </AnimatePresence>

      <footer className="text-center py-8 text-sm text-text-secondary border-t border-gray-200/50">
        <p>医学人工智能 · 学生海报作品展</p>
      </footer>
    </div>
  )
}
