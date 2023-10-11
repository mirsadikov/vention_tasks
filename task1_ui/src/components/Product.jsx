export default function Product({ product }) {
  return (
    <div className="product">
      <img className="product__img" src={`/img/product_images/${product.image}`} alt="product" />
      <h2 className="product__name">{product.name}</h2>
      <p className="product__price">${product.price}</p>
      <a className="product__btn" href={`/products/${product.id}`}>
        Buy
      </a>
    </div>
  );
}
