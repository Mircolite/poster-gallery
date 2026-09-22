const hues = [
  'from-blue-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-violet-400 to-purple-600',
  'from-rose-400 to-pink-600',
  'from-amber-400 to-orange-600',
  'from-cyan-400 to-sky-600',
  'from-lime-400 to-green-600',
  'from-fuchsia-400 to-pink-600',
  'from-red-400 to-rose-600',
  'from-teal-400 to-cyan-600',
]

export const posters = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  title: '待填写',
  author: '待填写',
  studentId: '待填写',
  className: '待填写',
  description: '待填写',
  gradient: hues[i % hues.length],
  year: 2026,
}))
