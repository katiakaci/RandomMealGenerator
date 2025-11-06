const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
  console.log('button clicked successfully');

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
      createMeal(res.meals[0]);
    });
});

const createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else break; // Stop if no more ingredients left
  }

  const newInnerHTML = `
        <div class="row">
            <div class="card">
                <div class="content">
                    <div class="back">
                        <div class="back-content">
                            <img src="${meal.strMealThumb}" alt="Meal Image">
                        </div>
                    </div>
                    <div class="front">
                        <div class="img">
                            <div class="circle"></div>
                            <div class="circle" id="right"></div>
                            <div class="circle" id="bottom"></div>
                        </div>
                        <div class="front-content">
                            <small class="badge">${meal.strCategory || 'Food'}</small>
                            <div class="description">
                                <div class="title">
                                    <p class="title">
                                        <strong>${meal.strMeal}</strong>
                                    </p>
                                </div>
                                <p class="card-footer">
                                    ${meal.strArea || 'International'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="meal-info">
                ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="instructions-section">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions}</p>
        </div>

        ${meal.strYoutube ? `
        <div class="row">
            <h5>Video Recipe</h5>
            <div class="videoWrapper">
                <iframe width="420" height="315"
                src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                </iframe>
            </div>
        </div>` : ''}
    `;

  meal_container.innerHTML = newInnerHTML;
}