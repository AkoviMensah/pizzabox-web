import Footer from './app/layout/Footer';
import Header from './app/layout/Header';
import Pizzas from './pages/pizzas/Pizzas';

function App() {
  return (
    <div>
      <Header />
      <main>
        <h1> Pizzas </h1>
        <Pizzas />
      </main>
      <Footer />
    </div>
  );
}

export default App;
