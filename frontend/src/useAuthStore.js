import {create} from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  notes: [],

  setToken: (token) => set({ token }),
  
  setNotes: (notes) => set({ notes }),

  fetchNotes: async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ notes: response.data.notes });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  },

  deleteNote: async (id, token) => {
    try {
      await axios.delete(`http://localhost:3000/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  },

  addNote: (newNote) => set((state) => ({ notes: [...state.notes, newNote] })),
}));

export default useAuthStore;