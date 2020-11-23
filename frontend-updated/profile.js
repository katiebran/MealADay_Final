// import { data } from 'jquery';
// import $ from '/js/libs/jquery/dist/jquery.js';


// import allRecipes from './quiz.js';



function renderRecipeCard(recipe) {
    console.log(recipe);

    let list = `<ul>`;

    for (let i = 0; i < recipe.length; i++) {
        list += `<li>${recipe.ingredients[i].id} - ${recipe.ingredients[i].quantity}</li>`;
        console.log(list)
    };
    list += `</ul>`;


    console.log(list)

    // let dishType = getRandomLabel(recipe.dishType);
    // let dietLabel = getRandomLabel(recipe.dietLabel);
    // let healthLabel = getRandomLabel(recipe.healthLabel);



    // console.log(dishType)

  
        let card = `
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
                            <button id="${recipe.id}" class=" button deleteCard m-1 is-small is-danger">Delete <i class="ml-1 far fa-trash-alt"></i></button>
                            <button id="${recipe.id}"  class="button edit is-info m-1 is-small">Edit <i class="ml-1 fas fa-edit"></i></button>
                            </div>
                            
                            
                        </div>
             `;

        $('.cardRoot').prepend(card);
    
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
        console.log(recipe.data);
        console.log(recipe.data.result);
        let dataArr = Object.values(recipe.data.result);
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
    $(document).on('click', '.edit', function(){
        console.log('edit')
    });
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


function getDate(){
    var d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDay() + 1;
    return (month + '/' + day)
}