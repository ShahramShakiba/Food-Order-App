import { useContext, useState } from 'react';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import CartContext from '../../context/CartContext';

export default function MealItem({ meal }) {
  const [addToCart, setAddToCart] = useState(false);
  const { addItem } = useContext(CartContext);

  const handleAddingMeal = () => {
    addItem(meal);
    setAddToCart((prevState) => !prevState);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        <div>
          <h3> {meal.name} </h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description"> {meal.description} </p>
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
