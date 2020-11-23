import { data } from 'jquery';
// let risotto = {
//     id: 'risotto',
//     quantity: '10 oz',
// }

// let cheese = {
//     id: 'parm',
//     quantity: '2 oz',
// }

// let squash = {
//     id: 'butternut squash',
//     quantity: '1',
// }

// let dishLabels = ['label1', 'label2', 'label3', 'label4', 'label5']
// let dietLabels = ['label1', 'label2', 'label3', 'label4', 'label5']
// let healthLabels = ['label1', 'label2', 'label3', 'label4', 'label5']



// var recipe = {
//     id: 1,
//     img: 'images/test.jpg',
//     label: 'butternut squash risotto',
//     createdAt: 'date',
//     url: '#',
//     cals: 123,
//     ingredients: [
//         risotto, cheese, squash
//     ],
//     dishType: dishLabels,
//     dietLabel: dietLabels,
//     healthLabel: healthLabels
//     //will have to write a code to only get one label
// }

import allRecipes from './quiz.js';



function renderRecipeCard(recipe) {
    console.log(recipe);

    let list = `<ul>`;

    for (let i = 0; i < recipe.length; i++) {
        list += `<li>${recipe.ingredients[i].id} - ${recipe.ingredients[i].quantity}</li>`
    };
    list += `</ul>`;

    // let dishType = getRandomLabel(recipe.dishType);
    // let dietLabel = getRandomLabel(recipe.dietLabel);
    // let healthLabel = getRandomLabel(recipe.healthLabel);



    console.log(dishType)

  
        let card = `<div class= "column is-half">
                    <div class="box" id="${recipe.uri}">
                    
                        <img class="recipe_img" src="${recipe.img}">
                            <article class="media">
                            
                                <div class="content">
                                    <p>
                                        <strong> <a href="${recipe.url}">${recipe.label}</a></strong><small> ${recipe.createdAt}</small>
                                        <br>
                                        <small>${recipe.cals} cals</small>
                                        <br>
                                        ${list}
                                        </p>
                                </div>
                            </article>
                            <div class="tags mt-3">
                           
                                
                            </div>
                            <div class="tags">
                            <button id="${recipe.id}" class="delete" class="button m-1 is-small is-danger">Delete <i class="ml-1 far fa-trash-alt"></i></button>
                            <button id="${recipe.id}" class ="edit" class="button is-info m-1 is-small">Edit <i class="ml-1 fas fa-edit"></i></button>
                            </div>
                            
                            
                        </div>
                </div>`;

        $('.cardRoot').append(card);
    
}

function handleEditButton(event) {
    event.preventDefault();

    let editForm = `
    `;

    $('#' + event.target.id).replaceWith(editForm);

}

function handleDeleteButton(event) {
    event.preventDefault();
    //insert axios call

    $('#' + event.target.id).replaceWith(``);


}

async function getRecipes() {
    let token = localStorage.getItem('jwt');
    try {
        const recipe = await axios({
            method: 'get',
            url: "http://localhost:3003/private/recipes",
            headers: { Authorization: `Bearer ${token}` },
            "type": "merge",
        });
        console.log(recipe);
        console.log(recipe.data.recipeult);

        let dataArr = Object.values(recipe.data.recipeult);
        console.log(dataArr);

        for(let i=0; i< dataArr.length; i++){
            renderRecipeCard(dataArr[i]); 
        }
       
    } catch (error) {
        alert(error);
    }
}



$(function () {
    getRecipes();
    // $(document).on('click', '.edit', handleEditButton);
    // $(document).on('click', '.delete', handleDeleteButton);
});


//gets the specific recipe id
function getID(string) {
    let idNum = string.replace(/\D/g, ''); // replace all leading non-digits with nothing
    return idNum;
}

//gets one individual label out of an array of multipl labels
function getRandomLabel(labelArr) {
    var label = labelArr[Math.floor(Math.random() * labelArr.length)];
    return label;

}


