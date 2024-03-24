import useHTTP from '../../hooks/useHTTP';
import MealItem from './MealItem';

export default function Meals() {
  
  return (
    <ul id="meals">
      {mealList.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

/* FIRST STEP TO FETCH DATA
* open separate TERMINAL
  - cd backend
  - npm install
  - node app.js

* so the backend can runs with the frontend
*/

/* useEffect
const [mealList, setMealList] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
         throw new Error(
          `Failed to fetch meals. HTTP error! status: ${response.status}`
         );
      }

      const meals = await response.json();
      setMealList(meals);
      /// console.log('Fetched meals:', meals);
    }

    fetchMeals();
  }, []);
*/
