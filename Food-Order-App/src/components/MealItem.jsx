import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';

export default function MealItem({ image, name, price, description }) {
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
          <Button> Add to Cart </Button>
        </div>
      </article>
    </li>
  );
}
