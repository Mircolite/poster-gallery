import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero({ total, year }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl bg-gradient-to-br ${
              ['from-blue-400 to-indigo-500', 'from-emerald-400 to-teal-500',
               'from-violet-400 to-purple-500', 'from-rose-400 to-pink-500',
               'from-amber-400 to-orange-500', 'from-cyan-400 to-sky-500'][i]
            }`}
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-text mb-4 tracking-tight">
          医学人工智能
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-2">
          {year}年 · 学生海报作品展
        </p>
        <div className="flex items-center gap-3 justify-center mt-6 text-text-secondary">
          <span className="px-3 py-1 bg-tag-bg text-primary rounded-full text-sm font-medium">
            {total} 件作品
          </span>
        </div>
      </motion.div>

      <motion.a
        href="#gallery"
        className="relative z-10 mt-12 flex flex-col items-center text-text-secondary hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-sm mb-2">浏览全部作品</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  )
}
