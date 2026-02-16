import { create } from "zustand"

const useThemeStore = create((set) => ({
	//theme: "forest",
	theme: localStorage.getItem("theme") || "forest",
	/* set function provided by zustand takes an object as an argument */
	//updateTheme: (theme) => set({ theme }),
	updateTheme: (theme) => {
		set({ theme });
		localStorage.setItem('theme', theme)
	}
}))

export default useThemeStore