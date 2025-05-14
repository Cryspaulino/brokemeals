//CREATING TEMPLATE
const recipes = [
    {
        name: 'mc&cheese',
        img: "./images/cookbooklogo.webp"
    },
    {
        name: 'Rice with chicken',
        img: "./images/cookbooklogo.webp"
    }

];

const container = document.querySelector(".container");

function recipeTemplate(recipe) {
    return `
        <h1>${recipe.name}</h1>
        <img src="${recipe.img}" alt="placeholder">
    `;
}

recipes.forEach(recipe => {
    container.innerHTML += recipeTemplate(recipe);
})

console.log(recipeTemplate)



//FOR THE GOALS PAGE

// const containertwo = document.querySelector(".containertwo");

// function goalsTemplate(recipe) {
//     return `
//         <h1>${recipe.name}</h1>
//         <img src="${recipe.img}" alt="placeholder">
//     `;
// }

// if (containertwo) {
//     recipes.forEach(recipe => {
//         containertwo.innerHTML += goalsTemplate(recipe);
//     });
// }

// console.log(goalsTemplate)


