class CalorieTracker {
	constructor() {
		this._calorieLimit = 2;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		this._dislpayCaloriesLimit();
		this._dislpayCaloriesTotal();
		this._dislpayCaloriesConsumed();
		this._dislpayCaloriesBurned();
		this._displayCaloriesReamining();
	}
	// public methods/API
	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
		this._render();
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		this._render();
	}

	// private methods

	_dislpayCaloriesTotal() {
		const totalCaloriesElement = document.getElementById('calories-total');
		totalCaloriesElement.innerHTML = this._totalCalories;
	}

	_dislpayCaloriesLimit() {
		const limitCaloriesElement = document.getElementById('calories-limit');
		limitCaloriesElement.innerHTML = this._calorieLimit;
	}

	_dislpayCaloriesConsumed() {
		const caloriesConsumedElement =
			document.getElementById('calories-consumed');

		const consumed = this._meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);

		caloriesConsumedElement.innerHTML = consumed;
	}

	_dislpayCaloriesBurned() {
		const caloriesBurnedElement = document.getElementById('calories-burned');

		const burned = this._workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		);

		caloriesBurnedElement.innerHTML = burned;
	}

	_displayCaloriesReamining() {
		const caloriesReaminingElement =
			document.getElementById('calories-remaining');

		const remaining = this._calorieLimit - this._totalCalories;

		caloriesReaminingElement.innerHTML = remaining;
	}

	_render() {
		this._dislpayCaloriesTotal();
		this._dislpayCaloriesConsumed();
		this._dislpayCaloriesBurned();
		this._displayCaloriesReamining();
	}
}

class Meal {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}
class Workout {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 4230);
tracker.addMeal(breakfast);

const run = new Workout('Morning Run', 123);
tracker.addWorkout(run);

console.log(tracker._meals);
console.log(tracker._workouts);
