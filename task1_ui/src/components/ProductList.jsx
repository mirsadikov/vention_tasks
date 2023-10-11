import Product from './Product';

const products = [
  {
    id: 1,
    name: 'RubIcon',
    price: 100,
    image: 'rubicon.png',
  },
  {
    id: 2,
    name: 'Camera',
    price: 200,
    image: 'camera.png',
  },
  {
    id: 3,
    name: 'G Generator',
    price: 1000,
    image: 'g_generator.png',
  },
  {
    id: 4,
    name: 'Invoice Creator',
    price: 100,
    image: 'invoice_creator.png',
  },
];

export default function ProductList() {
  return (
    <section className="products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
}
