import { useSelector, useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isLoading,
    error,
    dispatch,
    isAuthenticated: !!token,
  };
};

export const useWardrobe = () => {
  const { items, isLoading, error } = useSelector((state) => state.wardrobe);
  return { items, isLoading, error };
};

export const useProducts = () => {
  const { products, filteredProducts, selectedProduct, filters, isLoading, error } = useSelector(
    (state) => state.products
  );
  return { products, filteredProducts, selectedProduct, filters, isLoading, error };
};

export const useCart = () => {
  const { items, total, isLoading, error } = useSelector((state) => state.cart);
  return { items, total, isLoading, error };
};

export const useOrders = () => {
  const { orders, selectedOrder, isLoading, error } = useSelector((state) => state.orders);
  return { orders, selectedOrder, isLoading, error };
};
