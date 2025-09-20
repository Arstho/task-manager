import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import themeReducer from './themeSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			tasks: tasksReducer,
			theme: themeReducer,
		},
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
