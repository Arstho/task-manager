import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, TasksState } from '@/types'

const loadTasksFromStorage = (): Task[] => {
	if (typeof window === 'undefined') return []
	const saved = localStorage.getItem('tasks')
	return saved ? JSON.parse(saved) : []
}

const saveTasksToStorage = (tasks: Task[]) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}
}

const initialState: TasksState = {
	tasks: loadTasksFromStorage(),
	filter: 'all',
	searchQuery: '',
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
			const newTask: Task = {
				...action.payload,
				id: Date.now().toString(),
				createdAt: new Date().toISOString(),
			}
			state.tasks.unshift(newTask)
			saveTasksToStorage(state.tasks)
		},
		toggleTask: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find(t => t.id === action.payload)
			if (task) {
				task.completed = !task.completed
				saveTasksToStorage(state.tasks)
			}
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload)
			saveTasksToStorage(state.tasks)
		},
		setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
			state.filter = action.payload
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
	},
})

export const { addTask, toggleTask, deleteTask, setFilter, setSearchQuery } = tasksSlice.actions
export default tasksSlice.reducer
