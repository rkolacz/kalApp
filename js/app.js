class CalorieTracker {
	constructor() {
		this._calorieLimit = 2000;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		this._dislpayCaloriesLimit();
		this._dislpayCaloriesTotal();
		this._dislpayCaloriesConsumed();
		this._dislpayCaloriesBurned();
		this._displayCaloriesReamining();
		this._dislpayCaloriesProgress();
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
		const progressElement = document.getElementById('calorie-progress');

		const remaining = this._calorieLimit - this._totalCalories;

		caloriesReaminingElement.innerHTML = remaining;

		if (remaining <= 0) {
			caloriesReaminingElement.parentElement.parentElement.classList.remove(
				'bg-light'
			);
			caloriesReaminingElement.parentElement.parentElement.classList.add(
				'bg-danger'
			);
			progressElement.classList.remove('bg-success');
			progressElement.classList.add('bg-danger');
		} else {
			caloriesReaminingElement.parentElement.parentElement.classList.remove(
				'bg-danger'
			);
			caloriesReaminingElement.parentElement.parentElement.classList.add(
				'bg-light'
			);
			progressElement.classList.remove('bg-danger');
			progressElement.classList.add('bg-success');
		}
	}

	_dislpayCaloriesProgress() {
		const progressElement = document.getElementById('calorie-progress');
		const percentage = (this._totalCalories / this._calorieLimit) * 100;
		const width = Math.min(percentage, 100);
		progressElement.style.width = `${width}%`;
	}
	_render() {
		this._dislpayCaloriesTotal();
		this._dislpayCaloriesConsumed();
		this._dislpayCaloriesBurned();
		this._displayCaloriesReamining();
		this._dislpayCaloriesProgress();
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

class App {
	constructor() {
		this._tracker = new CalorieTracker();
		document
			.getElementById('meal-form')
			.addEventListener('submit', this._newMeal.bind(this));

		document
			.getElementById('workout-form')
			.addEventListener('submit', this._newWorkout.bind(this));
	}

	_newMeal(e) {
		e.preventDefault();

		const name = document.getElementById('meal-name');
		const calories = document.getElementById('meal-calories');

		// validate inputs
		if (name.value === '' || calories.value === '') {
			alert('Wypełnij puste pola');
			return;
		}

		const meal = new Meal(name.value, +calories.value);

		this._tracker.addMeal(meal);

		name.value = '';
		calories.value = '';

		const collapseMeal = document.getElementById('collapse-meal');
		const bsCollapse = new bootstrap.Collapse(collapseMeal, { toggle: true });
	}

	_newWorkout(e) {
		e.preventDefault();

		const name = document.getElementById('workout-name');
		const calories = document.getElementById('workout-calories');

		// validate inputs
		if (name.value === '' || calories.value === '') {
			alert('Wypełnij puste pola');
			return;
		}

		const workout = new Workout(name.value, +calories.value);

		this._tracker.addWorkout(workout);

		name.value = '';
		calories.value = '';

		const collapseWorkout = document.getElementById('collapse-workout');
		const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
			toggle: true,
		});
	}
}

const app = new App();
