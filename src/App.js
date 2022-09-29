import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Footer from './app/layout/Footer';
import Header from './app/layout/Header';
import AboutPage from './pages/about/AboutPage';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import BasketPage from './pages/basket/BasketPage';
import ContactPage from './pages/contact/ContactPage';
import PizzaDetails from './pages/menu/PizzaDetails';
import { useCallback, useEffect, useState } from 'react';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { useDispatch } from 'react-redux';
import { fetchBasketAsync } from './pages/basket/basketSlice';
import { fetchCurrentUser } from './pages/account/accountSlice';
import Menu from './pages/menu/Menu';
import Orders from './pages/orders/Orders';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      if (localStorage.getItem('user')) {
        await dispatch(fetchCurrentUser());
      } else {
        await dispatch(fetchBasketAsync());
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <h1>loading ...</h1>;

  return (
    <>
      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/pizza/:id' element={<PizzaDetails />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </Container>

      <Footer />
    </>
  );
}

export default App;
