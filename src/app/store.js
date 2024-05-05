import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product/productSlice';
import categoryReducer from '../features/Category/categorySlice';
import brandReducer from '../features/Brand/BrandSlice';
import SingleProductReducer from '../features/Detail/proDetailSlice';
import AuthReducer from '../features/Auth/authSlice';
import CartReducer from '../features/Cart/cartSlice';
import OrderReducer from '../features/Order/orderSlice';
import AddressReducer from '../features/Checkout/checkoutSlice';
import AdminproductReducer from '../features/Admin/adminProductSlice';

export const store = configureStore({
  reducer: {
    products:productReducer,
    categories:categoryReducer,
    brands:brandReducer,
    Singleproducts:SingleProductReducer,
    AuthUser:AuthReducer,
    carts:CartReducer,
    orders:OrderReducer,
    addresses:AddressReducer,
    Adminproducts:AdminproductReducer,
  },
});
