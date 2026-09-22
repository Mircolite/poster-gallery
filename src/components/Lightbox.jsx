import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

export default function Lightbox({ poster, posters, onClose, onNavigate }) {
  const [zoom, setZoom] = useState(1)
  const [showInfo, setShowInfo] = useState(true)

  const currentIndex = posters.findIndex(p => p.id === poster.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < posters.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) { onNavigate(posters[currentIndex - 1]); setZoom(1) }
  }, [hasPrev, currentIndex, posters, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) { onNavigate(posters[currentIndex + 1]); setZoom(1) }
  }, [hasNext, currentIndex, posters, onNavigate])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  const { title, author, studentId, className, description, gradient, image } = poster

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-overlay"
        />

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center relative p-4 md:p-8">
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <span className="text-white/60 text-sm font-mono">
                {currentIndex + 1} / {posters.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(z => Math.min(3, z + 0.5))}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="放大"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.5))}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="缩小"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={() => setShowInfo(v => !v)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors md:hidden"
                  title="信息"
                >
                  {showInfo ? '×' : 'ℹ'}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <motion.div
              key={poster.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full flex items-center justify-center"
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
            >
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="max-h-[80vh] rounded-2xl shadow-2xl object-contain"
                />
              ) : (
                <div className={`w-80 md:w-96 aspect-[3/4] bg-gradient-to-br ${gradient} rounded-2xl shadow-2xl`} />
              )}
            </motion.div>

            {hasPrev && (
              <button
                onClick={goPrev}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full
                           bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={goNext}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full
                           bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`w-full md:w-80 lg:w-96 bg-card md:bg-card/95 md:backdrop-blur-xl
                        border-t md:border-t-0 md:border-l border-gray-200/20
                        overflow-y-auto p-6 md:p-8
                        ${showInfo ? 'block' : 'hidden md:block'}`}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-text leading-snug">{title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="作者" value={author} />
                {studentId && <InfoItem label="学号" value={studentId} />}
                {className && <InfoItem label="班级" value={className} />}
              </div>

              <div>
                <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                  描述
                </h4>
                <p className="text-sm text-text leading-relaxed">{description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div className="text-xs text-text-secondary mb-0.5">{label}</div>
      <div className="text-sm font-medium text-text">{value}</div>
    </div>
  )
}
