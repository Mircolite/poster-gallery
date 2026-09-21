import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function PosterCard({ poster, index, onClick, viewMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  const { title, author, studentId, gradient } = poster

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.03 }}
        onClick={() => onClick(poster)}
        className="flex gap-4 bg-card rounded-xl p-3 cursor-pointer
                   hover:shadow-lg transition-shadow border border-gray-100"
      >
        <div className={`w-20 h-20 rounded-lg shrink-0 bg-gradient-to-br ${gradient}`} />
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-medium text-sm truncate">{title}</h3>
          <p className="text-xs text-text-secondary mt-1">{author} · {studentId}</p>
        </div>
      </motion.div>
    )
  }

  const isLarge = viewMode === 'large'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      layout
      onClick={() => onClick(poster)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-card rounded-2xl overflow-hidden cursor-pointer
                  border border-gray-100 hover:border-gray-200
                  transition-all duration-300 hover:shadow-xl hover:shadow-black/10
                  ${isLarge ? 'col-span-2 row-span-2' : ''}`}
    >
      <div className="relative overflow-hidden">
        <div
          className="w-full aspect-[3/4] transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                     flex items-end p-4"
        >
          <motion.div
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-white text-sm font-medium"
          >
            查看详情 <ArrowRight size={16} />
          </motion.div>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">{author}</p>
          <span className="text-xs text-text-secondary font-mono">#{String(poster.id).padStart(3, '0')}</span>
        </div>
      </div>
    </motion.div>
  )
}
