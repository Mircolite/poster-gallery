import { motion } from 'framer-motion'
import { Search, X, LayoutGrid, List, Maximize2 } from 'lucide-react'

const viewModes = [
  { icon: LayoutGrid, key: 'grid', label: '网格' },
  { icon: List, key: 'list', label: '列表' },
  { icon: Maximize2, key: 'large', label: '大图' },
]

export default function FilterBar({
  searchQuery, onSearchChange,
  viewMode, onViewModeChange, resultCount, totalCount
}) {
  return (
    <div className="border-b border-gray-200/50 bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索作品..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-card rounded-xl border border-gray-200
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-card rounded-xl border border-gray-200 p-1">
            {viewModes.map(({ icon: Icon, key, label }) => (
              <button
                key={key}
                onClick={() => onViewModeChange(key)}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === key ? 'bg-primary text-white' : 'text-text-secondary hover:text-text'
                }`}
                title={label}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={resultCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-0"
        >
          {searchQuery.trim() && resultCount !== totalCount && (
            <p className="text-xs text-text-secondary mt-2">
              找到 <span className="text-primary font-medium">{resultCount}</span> 件作品
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
