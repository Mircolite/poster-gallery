import { motion } from 'framer-motion'

export default function YearSelector({ years, selectedYear, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {years.map(year => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedYear === year
              ? 'text-white'
              : 'text-text-secondary hover:text-text bg-card border border-gray-200'
          }`}
        >
          {selectedYear === year && (
            <motion.div
              layoutId="year-indicator"
              className="absolute inset-0 bg-primary rounded-xl"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{year}年</span>
        </button>
      ))}
    </div>
  )
}
