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
		this._displayNewMeal(meal);
		this._render();
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		this._displayNewWorkout(workout);
		this._render();
	}

	removeMeal(id) {
		const index = this._meals.findIndex((meal) => meal.id === id);

		if (index !== -1) {
			const meal = this._meals[index];
			this._totalCalories -= meal.calories;
			this._meals.splice(index, 1);
			this._render();
		}
	}

	removeWorkout(id) {
		const index = this._workouts.findIndex((workout) => workout.id === id);

		if (index !== -1) {
			const workout = this._workouts[index];
			this._totalCalories += workout.calories;
			this._workouts.splice(index, 1);
			this._render();
		}
	}

	reset() {
		this._totalCalories = 0;
		this._meals - [];
		this._workouts = [];
		this._render();
	}

	setLimit(calorieLimit) {
		this._calorieLimit = calorieLimit;
		this._dislpayCaloriesLimit();
		this._render;
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

	_displayNewMeal(meal) {
		const mealsElements = document.getElementById('meal-items');
		const oneMealElement = document.createElement('div');
		oneMealElement.classList.add('card', 'my-2');
		oneMealElement.setAttribute('data-id', meal.id);
		oneMealElement.innerHTML = `
		<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
			  `;

		mealsElements.appendChild(oneMealElement);
	}

	_displayNewWorkout(workout) {
		const workoutsElements = document.getElementById('workout-items');
		const oneWorkoutElement = document.createElement('div');
		oneWorkoutElement.classList.add('card', 'my-2');
		oneWorkoutElement.setAttribute('data-id', workout.id);
		oneWorkoutElement.innerHTML = `
		<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
			  `;

		workoutsElements.appendChild(oneWorkoutElement);
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
			.addEventListener('submit', this._newItem.bind(this, 'meal'));

		document
			.getElementById('workout-form')
			.addEventListener('submit', this._newItem.bind(this, 'workout'));

		document
			.getElementById('meal-items')
			.addEventListener('click', this._removeItem.bind(this, 'meal'));

		document
			.getElementById('workout-items')
			.addEventListener('click', this._removeItem.bind(this, 'workout'));

		document
			.getElementById('filter-meals')
			.addEventListener('keyup', this._filterItems.bind(this, 'meal'));

		document
			.getElementById('filter-workouts')
			.addEventListener('keyup', this._filterItems.bind(this, 'workout'));

		document
			.getElementById('reset')
			.addEventListener('click', this._reset.bind(this));

		document
			.getElementById('limit-form')
			.addEventListener('submit', this._setLimit.bind(this));
	}

	_newItem(type, e) {
		e.preventDefault();

		const name = document.getElementById(`${type}-name`);
		const calories = document.getElementById(`${type}-calories`);

		// validate inputs
		if (name.value === '' || calories.value === '') {
			alert('Wypełnij puste pola');
			return;
		}

		if (type === 'meal') {
			const meal = new Meal(name.value, +calories.value);
			this._tracker.addMeal(meal);
		} else {
			const workout = new Workout(name.value, +calories.value);
			this._tracker.addWorkout(workout);
		}

		name.value = '';
		calories.value = '';

		const collapseItem = document.getElementById(`collapse-${type}`);
		const bsCollapse = new bootstrap.Collapse(collapseItem, { toggle: true });
	}

	_removeItem(type, e) {
		if (
			e.target.classList.contains('delete') ||
			e.target.classList.contains('fa-xmark')
		) {
			if (confirm('Na pewno chcesz to zrobić?')) {
				const id = e.target.closest('.card').getAttribute('data-id');

				type === 'meal'
					? this._tracker.removeMeal(id)
					: this._tracker.removeWorkout(id);

				e.target.closest('.card').remove();
			}
		}
	}
	_filterItems(type, e) {
		const text = e.target.value.toLowerCase();
		document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
			const name = item.firstElementChild.firstElementChild.textContent;

			if (name.toLowerCase().indexOf(text) !== -1) {
				item.style.display = 'block';
			} else {
				item.style.display = 'none';
			}
		});
	}

	_reset() {
		this._tracker.reset();
		document.getElementById('meal-items').innerHTML = '';
		document.getElementById('workout-items').innerHTML = '';
		document.getElementById('filter-meals').innerHTML = '';
		document.getElementById('filter-workouts').innerHTML = '';
	}

	_setLimit(e) {
		e.preventDefault();

		const limit = document.getElementById('limit');

		if (limit.value === '') {
			alert('Dodaj limit');
			return;
		}

		this._tracker.setLimit(+limit.value);
		limit.value = '';

		const modalElement = document.getElementById('limit-modal');
		const modal = bootstrap.Modal.getInstance(modalElement);
		modal.hide();
	}
}

const app = new App();
