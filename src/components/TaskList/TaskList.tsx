'use client'

import { useAppSelector } from '@/store/hooks'
import TaskItem from '../TaskItem/TaskItem'
import styles from './TaskList.module.scss'

const TaskList: React.FC = () => {
	const { tasks, filter, searchQuery } = useAppSelector(state => state.tasks)

	const filteredTasks = tasks.filter(task => {
		const matchesFilter =
			filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed)

		const matchesSearch =
			task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))

		return matchesFilter && matchesSearch
	})

	if (tasks.length === 0) {
		return (
			<div className={styles.emptyState}>
				<div className={styles.emptyIcon}>📝</div>
				<h3>No tasks yet</h3>
				<p>Add your first task to get started!</p>
			</div>
		)
	}

	if (filteredTasks.length === 0) {
		return (
			<div className={styles.emptyState}>
				<div className={styles.emptyIcon}>🔍</div>
				<h3>No tasks found</h3>
				<p>Try changing your filters or search query</p>
			</div>
		)
	}

	return (
		<div className={styles.taskList}>
			<div className={styles.header}>
				<h2 className={styles.title}>
					{filter === 'all' && 'All Tasks'}
					{filter === 'active' && 'Active Tasks'}
					{filter === 'completed' && 'Completed Tasks'}
					<span className={styles.count}>({filteredTasks.length})</span>
				</h2>

				{searchQuery && <div className={styles.searchInfo}>Searching for: {searchQuery}</div>}
			</div>

			<div className={styles.tasks}>
				{filteredTasks.map(task => (
					<TaskItem key={task.id} task={task} />
				))}
			</div>
		</div>
	)
}

export default TaskList
