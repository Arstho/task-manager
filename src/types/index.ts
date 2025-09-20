export interface Task {
	id: string
	title: string
	description?: string
	completed: boolean
	createdAt: string
	priority: 'low' | 'medium' | 'high'
}

export interface TasksState {
	tasks: Task[]
	filter: 'all' | 'active' | 'completed'
	searchQuery: string
}

export interface ThemeState {
	isDark: boolean
}

export type TaskFormData = {
	title: string
	description?: string
	priority: 'low' | 'medium' | 'high'
}
