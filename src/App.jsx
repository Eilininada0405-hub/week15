import { useEffect, useState } from 'react'
import TaskItem from './components/TaskItem'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my-tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (event) => {
    event.preventDefault()
    const text = input.trim()
    if (!text) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: `${Date.now()}-${text}`, text, done: false },
    ])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done
    if (filter === 'completed') return task.done
    return true
  })

  const remainingCount = tasks.filter((task) => !task.done).length

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="mb-3 text-sm font-black tracking-[0.25em] text-teal-600">FOCUS BOARD</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">今日のタスク</h1>
          <p className="mt-3 text-sm text-slate-500">小さく分けて、ひとつずつ片付けよう。</p>
        </header>

        <form onSubmit={addTask} className="flex gap-2 rounded-2xl bg-white p-2 shadow-lg shadow-slate-200/70">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="新しいタスクを入力"
            className="min-w-0 flex-1 rounded-xl px-3 py-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-teal-200 sm:px-4 sm:text-base"
          />
          <button type="submit" className="rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-700 sm:px-6">
            追加
          </button>
        </form>

        <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/70" aria-label="タスク一覧">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
            <p className="text-sm font-bold text-slate-600">未完了 {remainingCount}件</p>
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1" aria-label="表示フィルター">
              {[
                ['all', 'すべて'],
                ['active', '未完了'],
                ['completed', '完了'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${filter === value ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {visibleTasks.length > 0 ? (
            <ul>
              {visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </ul>
          ) : (
            <p className="px-5 py-12 text-center text-sm text-slate-400">表示するタスクはありません。</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
