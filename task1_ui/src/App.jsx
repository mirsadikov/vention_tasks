import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main__title">Popular wordpress plugins</h1>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
