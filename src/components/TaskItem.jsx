function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="group flex items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-5">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-sm transition ${
          task.done
            ? 'border-teal-500 bg-teal-500 text-white'
            : 'border-slate-300 text-transparent hover:border-teal-400'
        }`}
        aria-label={task.done ? `${task.text}を未完了に戻す` : `${task.text}を完了にする`}
      >
        ✓
      </button>
      <span className={`min-w-0 flex-1 break-words text-sm sm:text-base ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
        {task.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="rounded-lg px-2 py-1 text-xs font-bold text-slate-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-500 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={`${task.text}を削除`}
      >
        削除
      </button>
    </li>
  )
}

export default TaskItem
