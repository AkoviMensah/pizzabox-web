import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Footer from './app/layout/Footer';
import Header from './app/layout/Header';
import AboutPage from './pages/about/AboutPage';
import Login from './pages/account/Login';
import ContactPage from './pages/contact/ContactPage';
import Pizzas from './pages/pizzas/Pizzas';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Pizzas />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
