import { ThemeState } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ThemeState = {
	isDark: typeof window !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false,
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: state => {
			state.isDark = !state.isDark
			if (typeof window !== 'undefined') {
				localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
			}
		},
		setTheme: (state, action: PayloadAction<boolean>) => {
			state.isDark = action.payload
			if (typeof window !== 'undefined') {
				localStorage.setItem('theme', action.payload ? 'dark' : 'light')
			}
		},
	},
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
