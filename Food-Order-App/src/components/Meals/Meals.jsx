import useHTTP from '../../hooks/useHTTP';
import MealItem from './MealItem';

//since it's GET-Request we don't need to mention "config" obj
// to prevent infinite-loop we declare it outside of our Component
// create this obj once only at the first render and thereafter
// we're always using the same obj in the memory
const requestConfig = {};

export default function Meals() {
  const {
    data: mealList,
    isLoading,
    error,
  } = useHTTP('http://localhost:3000/meals', requestConfig, []);
  console.log(mealList);
  if (isLoading) {
    return <p> Fetching Meals... 🍽️🍴 </p>;
  }
  if (!mealList) {
    return <p> No Meals Found 🔍 </p>;
  }

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
