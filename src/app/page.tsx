'use client'

import FilterControls from '@/components/FilterControls/FilterControls'
import Statistics from '@/components/Statistics/Statistics'
import TaskForm from '@/components/TaskForm/TaskForm'
import TaskList from '@/components/TaskList/TaskList'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTheme } from '@/store/themeSlice'
import { useEffect } from 'react'
import styles from './page.module.scss'

export default function Home() {
	const dispatch = useAppDispatch()
	const { isDark } = useAppSelector(state => state.theme)

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
	}, [isDark])

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			dispatch(setTheme(savedTheme === 'dark'))
		}
	}, [dispatch])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Task Manager</h1>
				<ThemeToggle />
			</div>

			<div className={styles.content}>
				<div className={styles.main}>
					<TaskForm />
					<FilterControls />
					<TaskList />
				</div>

				<aside className={styles.sidebar}>
					<Statistics />
				</aside>
			</div>
		</div>
	)
}
