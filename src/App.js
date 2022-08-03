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
import { useEffect, useState } from 'react';
import { getCookie } from './app/util/util';
import agent from './app/api/agent';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { useDispatch } from 'react-redux';
import { setBasket } from './pages/basket/basketSlice';
import Store from './pages/menu/Menu';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <h1>loading ...</h1>;

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Store />} />
            <Route path='/pizza/:id' element={<PizzaDetails />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/basket' element={<BasketPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
