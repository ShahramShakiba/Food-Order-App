import { useContext, useState } from 'react';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import CartContext from '../../context/CartContext';

export default function MealItem({ image, name, price, description }) {
  const [addToCart, setAddToCart] = useState(false);
  const { addItem } = useContext(CartContext);
  const meal = {
    image,
    name,
    price,
    description,
  };

  const handleAddingMeal = () => {
    addItem(meal);
    setAddToCart(true);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />

        <div>
          <h3> {name} </h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description"> {description} </p>
        </div>

        <div className="meal-item-actions">
          <Button onClick={handleAddingMeal} disabled={addToCart}>
            Add to Cart
          </Button>
        </div>
      </article>
    </li>
  );
}