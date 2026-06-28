import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setItems, addItem, removeItem, updateItem, setLoading, setError } = wardrobeSlice.actions;
export default wardrobeSlice.reducer;
