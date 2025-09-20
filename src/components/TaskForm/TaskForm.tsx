import { useAppDispatch } from '@/store/hooks'
import { addTask } from '@/store/tasksSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './TaskForm.module.scss'

const taskSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().optional(),
	priority: z.enum(['low', 'medium', 'high']),
})

type TaskFormData = z.infer<typeof taskSchema>

const TaskForm: React.FC = () => {
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskFormData>({
		resolver: zodResolver(taskSchema),
	})

	const onSubmit = (data: TaskFormData) => {
		dispatch(addTask({ ...data, completed: false }))
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.inputGroup}>
				<input {...register('title')} placeholder='Enter task title...' className={styles.input} />
				{errors.title && <span className={styles.error}>{errors.title.message}</span>}
			</div>

			<textarea {...register('description')} placeholder='Description (optional)' className={styles.textarea} />

			<div className={styles.priorityGroup}>
				<label>Priority:</label>
				<select {...register('priority')} className={styles.select}>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>
			</div>

			<button type='submit' className={styles.button}>
				Add Task
			</button>
		</form>
	)
}

export default TaskForm
