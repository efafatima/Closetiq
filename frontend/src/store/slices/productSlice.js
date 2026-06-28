import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    color: '',
    size: '',
    priceRange: [0, 1000],
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      state.filteredProducts = state.products.filter(product => {
        const matchCategory = !state.filters.category || product.category === state.filters.category;
        const matchColor = !state.filters.color || product.colors.includes(state.filters.color);
        const matchSize = !state.filters.size || product.sizes.includes(state.filters.size);
        const matchPrice = product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1];
        return matchCategory && matchColor && matchSize && matchPrice;
      });
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct, setFilters, applyFilters, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
