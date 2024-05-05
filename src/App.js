import React, { useEffect} from 'react';
import {Routes,Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ProDetailPage from './Pages/ProDetailPage';
import Protect from './features/Protect';
import OrderPage from './Pages/OrderPage';
import MyOrderPage from './Pages/MyOrderPage';
import MyProfilePage from './Pages/MyProfilePage';
import MyPasswordPage from './Pages/MyPasswordPage';
import ForgotPage from './Pages/ForgotPage';
import NotFoundPage from './Pages/NotFoundPage';
import AdminProtect from './features/AdminProtect';
import AdminProductPage from './AdminPages/AdminProductPage';
import AdminProductEditPage from './AdminPages/AdminProductEditPage';
import AdminProductAddPage from './AdminPages/AdminAddProductPage';
import AdminOrderPage from './AdminPages/AdminOrderPage';
import {useDispatch} from 'react-redux';
import {fetchgetUser} from './features/Auth/authSlice';
import ResetPage from './Pages/ResetPage';
import Logoutt from './features/Auth/Logoutt';
import Card from './features/Card/Card';



export default function App() {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')

  
  useEffect(() => {
    if (token) {
      dispatch(fetchgetUser())
    }

  }, [token,dispatch]);

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route path={'/login/page'} element={<LoginPage/>}/>
        <Route path={'/logout/page'} element={<Logoutt/>}/>
        <Route path={'/register/page'} element={<RegisterPage/>}/>
        <Route path={'/cart/page'} element={<Protect><CartPage/></Protect>}/>
        <Route path={'/checkout/page'} element={<Protect><CheckoutPage/></Protect>}/>
        <Route path={'/product/detail/:id'} element={<ProDetailPage/>}/>
        <Route path={'/card/payment/:ordercode'} element={<Protect><Card/></Protect>}/>
        <Route path={'/order/page/:ordercode'} element={<Protect><OrderPage/></Protect>}/>
        <Route path={'/order/detail/page'} element={<Protect><MyOrderPage/></Protect>}/>
        <Route path={'/profile/page'} element={<Protect><MyProfilePage/></Protect>}/>
        <Route path={'/password/page'} element={<Protect><MyPasswordPage/></Protect>}/>
        <Route path={'/forgot/password/page'} element={<ForgotPage/>}/>
        <Route path={'/reset/password/:restoken'} element={<ResetPage/>}/>
        <Route path={'/admin/product/page'} element={<AdminProtect><AdminProductPage/></AdminProtect>}/>
        <Route path={'/admin/product/edit/page/:id'} element={<AdminProtect><AdminProductEditPage/></AdminProtect>}/>
        <Route path={'/admin/product/add/page'} element={<AdminProtect><AdminProductAddPage/></AdminProtect>}/>
        <Route path={'/admin/order/page'} element={<AdminProtect><AdminOrderPage/></AdminProtect>}/>
        <Route path={'*'} element={<NotFoundPage/>}/>        
      </Routes>
    </div>
  )
}
