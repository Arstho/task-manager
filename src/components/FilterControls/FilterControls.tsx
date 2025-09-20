'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setFilter, setSearchQuery } from '@/store/tasksSlice'
import styles from './FilterControls.module.scss'

const FilterControls: React.FC = () => {
	const dispatch = useAppDispatch()
	const { filter, searchQuery } = useAppSelector(state => state.tasks)

	return (
		<div className={styles.controls}>
			<div className={styles.filterGroup}>
				<button
					onClick={() => dispatch(setFilter('all'))}
					className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
				>
					All
				</button>
				<button
					onClick={() => dispatch(setFilter('active'))}
					className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
				>
					Active
				</button>
				<button
					onClick={() => dispatch(setFilter('completed'))}
					className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
				>
					Completed
				</button>
			</div>

			<div className={styles.searchGroup}>
				<input
					type='text'
					placeholder='Search tasks...'
					value={searchQuery}
					onChange={e => dispatch(setSearchQuery(e.target.value))}
					className={styles.searchInput}
				/>
			</div>
		</div>
	)
}

export default FilterControls
