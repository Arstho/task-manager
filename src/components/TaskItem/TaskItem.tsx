'use client'

import { useAppDispatch } from '@/store/hooks'
import { deleteTask, toggleTask } from '@/store/tasksSlice'
import { Task } from '@/types'
import styles from './TaskItem.module.scss'

interface TaskItemProps {
	task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
	const dispatch = useAppDispatch()

	const handleToggle = () => {
		dispatch(toggleTask(task.id))
	}

	const handleDelete = () => {
		dispatch(deleteTask(task.id))
	}

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high':
				return styles.high
			case 'medium':
				return styles.medium
			case 'low':
				return styles.low
			default:
				return styles.low
		}
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	}

	return (
		<div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
			<div className={styles.taskContent}>
				<div className={styles.taskHeader}>
					<div className={styles.priorityBadge}>
						<span className={`${styles.priorityDot} ${getPriorityColor(task.priority)}`} />
						{task.priority}
					</div>
					<span className={styles.date}>{formatDate(task.createdAt)}</span>
				</div>

				<div className={styles.taskMain}>
					<label className={styles.checkboxContainer}>
						<input type='checkbox' checked={task.completed} onChange={handleToggle} className={styles.checkbox} />
						<span className={styles.checkmark}></span>
					</label>

					<div className={styles.taskInfo}>
						<h3 className={styles.taskTitle}>{task.title}</h3>
						{task.description && <p className={styles.taskDescription}>{task.description}</p>}
					</div>
				</div>

				<div className={styles.taskActions}>
					<button onClick={handleDelete} className={styles.deleteButton} aria-label='Delete task'>
						🗑️
					</button>
				</div>
			</div>
		</div>
	)
}

export default TaskItem
