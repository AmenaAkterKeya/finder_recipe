document.getElementById("button_s").addEventListener("click", () => {
  let inputValue = document.getElementById("inputName").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      const items = document.getElementById("items");
      items.innerHTML = "";
      if (data.meals == null) {
        document.getElementById("message").style.display = "block";
      } else {
        document.getElementById("message").style.display = "none";
        data.meals.forEach((meal) => {
          let itemDiv = document.createElement("div");

          let itemsInfo = `
              <div class="card m-2" style="width: 12rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body text-center">
                  <h6 class="card-text">${meal.strMeal}</h6>
                  <button class="btn btn-primary btn-sm" onclick="singleItem('${meal.idMeal}')">View Recipe</button>
                </div>
              </div>
            `;

          itemDiv.innerHTML = itemsInfo;
          items.appendChild(itemDiv);
        });
      }
    });
});

function singleItem(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((detail) => {
      let meal = detail.meals[0];
      let details = document.getElementById("details");
      details.innerHTML = "";
      let detailDiv = document.createElement("div");

      let ingredients = "";
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients += `<li>${meal[`strIngredient${i}`]} - ${
            meal[`strMeasure${i}`]
          }</li>`;
        }
      }

      let detailInfo = `
          <div class="card card_r" style="width: 18rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${
        meal.strMeal
      }">
            <div class="card-body">
              <h3 class="card-text text-center">${meal.strMeal}</h3>
              <h6>Ingredients</h6>
              <ul>${ingredients}</ul>
              <h6>Instructions</h6>
              <p>${meal.strInstructions.slice(0, 300)}  </p>
            </div>
          </div>
        `;

      detailDiv.innerHTML = detailInfo;
      details.appendChild(detailDiv);
    });
}
