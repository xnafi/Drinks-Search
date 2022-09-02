const loadPhoto = (search) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getPhoto(data.drinks))
}
document.getElementById('search').addEventListener('click', function () {
    const searchValue = inputField();
    loadPhoto(searchValue)

})
document.getElementById('search-field').addEventListener('keydown', function (e) {

    if (e.key === 'Enter') {
        const searchValue = inputField();
        loadPhoto(searchValue);
    }

})

const getPhoto = (data) => {
    console.log(data);
    const parentDiv = document.getElementById('parent-div')
    parentDiv.textContent = ''
    data.forEach(ele => {
        const childDiv = document.createElement('div')
        childDiv.innerHTML = `
 
        <div class="card bg-base-100 shadow-xl">
        <figure>
        <img src="${ele.strDrinkThumb}" alt="Shoes" />
      </figure>
       <div class="card-body">
        <h2 class="card-title block">
           ${ele.strDrink}
        <div class="badge badge-secondary">NEW</div>
        </h2>
       <p>${ele.strInstructions.slice(0, 50)}</p>
       <div class="card-actions justify-end mt-2">
       <label for="my-modal-4" onclick="moreInfo('${ele.idDrink}')" class="btn modal-button">More Info</label>
       </div>
     </div>
        </div>
        
     `
        parentDiv.appendChild(childDiv)

    });

}
function moreInfo(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => getMoreData(data.drinks))

}
function getMoreData(data) {
    console.log(data);
    const drinksName = document.getElementById('drinks-name');
    drinksName.innerHTML = `${data[0].strDrink}`
    const drinksType = document.getElementById('drinks-type');
    drinksType.innerHTML = `<span>Drinks type</span> : ${data[0].strAlcoholic}`
    const drinksImage = document.getElementById('details');
    drinksImage.innerHTML = `<img src="${data[0].strDrinkThumb}"/> `
    const drinksIng = document.getElementById('drinks-ing');
    drinksIng.innerHTML = `<span>Drinks Ingridients</span> : ${data[0].strIngredient1} `
    

}
function inputField() {
    const search = document.getElementById('search-field');
    const searchValue = search.value;
    search.value = ''
    return searchValue;
}

