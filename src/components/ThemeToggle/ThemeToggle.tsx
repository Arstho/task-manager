'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleTheme } from '@/store/themeSlice'
import styles from './ThemeToggle.module.scss'

const ThemeToggle: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isDark } = useAppSelector(state => state.theme)

	return (
		<button onClick={() => dispatch(toggleTheme())} className={styles.toggle} aria-label='Toggle theme'>
			{isDark ? '🌙' : '☀️'}
		</button>
	)
}

export default ThemeToggle
