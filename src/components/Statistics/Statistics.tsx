'use client'

import { useAppSelector } from '@/store/hooks'
import styles from './Statistics.module.scss'

const Statistics: React.FC = () => {
	const { tasks } = useAppSelector(state => state.tasks)

	const totalTasks = tasks.length
	const completedTasks = tasks.filter(task => task.completed).length
	const activeTasks = totalTasks - completedTasks
	const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

	const highPriorityTasks = tasks.filter(task => task.priority === 'high').length
	const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length
	const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length

	return (
		<div className={styles.statistics}>
			<h2 className={styles.title}>📊 Statistics</h2>

			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.statNumber}>{totalTasks}</div>
					<div className={styles.statLabel}>Total Tasks</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statNumber}>{activeTasks}</div>
					<div className={styles.statLabel}>Active</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statNumber}>{completedTasks}</div>
					<div className={styles.statLabel}>Completed</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statNumber}>{completionRate}%</div>
					<div className={styles.statLabel}>Completion Rate</div>
				</div>
			</div>

			<div className={styles.priorityStats}>
				<h3 className={styles.subtitle}>Priority Distribution</h3>

				<div className={styles.priorityItem}>
					<span className={styles.priorityLabel}>High</span>
					<div className={styles.priorityBarContainer}>
						<div
							className={`${styles.priorityBar} ${styles.high}`}
							style={{ width: `${totalTasks > 0 ? (highPriorityTasks / totalTasks) * 100 : 0}%` }}
						/>
					</div>
					<span className={styles.priorityCount}>{highPriorityTasks}</span>
				</div>

				<div className={styles.priorityItem}>
					<span className={styles.priorityLabel}>Medium</span>
					<div className={styles.priorityBarContainer}>
						<div
							className={`${styles.priorityBar} ${styles.medium}`}
							style={{ width: `${totalTasks > 0 ? (mediumPriorityTasks / totalTasks) * 100 : 0}%` }}
						/>
					</div>
					<span className={styles.priorityCount}>{mediumPriorityTasks}</span>
				</div>

				<div className={styles.priorityItem}>
					<span className={styles.priorityLabel}>Low</span>
					<div className={styles.priorityBarContainer}>
						<div
							className={`${styles.priorityBar} ${styles.low}`}
							style={{ width: `${totalTasks > 0 ? (lowPriorityTasks / totalTasks) * 100 : 0}%` }}
						/>
					</div>
					<span className={styles.priorityCount}>{lowPriorityTasks}</span>
				</div>
			</div>

			{totalTasks > 0 && (
				<div className={styles.productivity}>
					<h3 className={styles.subtitle}>Productivity</h3>
					<div className={styles.productivityMeter}>
						<div className={styles.productivityFill} style={{ width: `${completionRate}%` }} />
					</div>
					<div className={styles.productivityText}>
						{completionRate >= 75
							? 'Excellent progress! 🎉'
							: completionRate >= 50
							? 'Good job! Keep going! 👍'
							: completionRate >= 25
							? 'Making progress! 💪'
							: 'Getting started! 🚀'}
					</div>
				</div>
			)}
		</div>
	)
}

export default Statistics
