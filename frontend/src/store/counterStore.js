import { create } from 'zustand';

/* returns an object which has access to the set and get functions for managing state */
/* so zustand is used to create a global store(an object) within my react app. A set and get function is injected by zustand into the object/store methods which is then used to manage the state without the need for props drilling */
/* CLEANER EXPLANATION FROM CHATGPT:
Zustand is used to create a global store within a React app.
Zustand injects set (and get) into the store creator function, which you then use inside your store methods to read and update state. Components can subscribe directly to the store, avoiding prop drilling. */
const counterStore = create((set) => ({
	count: 0,
	increment: () => set((state) => ({ count: state.count + 1 })),
	decrement: () => set((state) => {
		if (state.count == 0)
			return { count: state.count }
		else
			return { count: state.count - 1 }
	})
}));

export default counterStore;