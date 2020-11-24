let dataArr;
function renderRecipeCard(recipe) {
    // console.log(recipe);

    let list = `<ul>`;

    for (let i = 0; i < recipe.ingredients.length; i++) {
        list += `<li>${recipe.ingredients[i].text}</li>`;
        // console.log(list)
    };
    list += `</ul>`;
    let card = `
                    <div class="box" id="${recipe.id}">
    
                        <img class="recipe_img" src="${recipe.img}">
                            <article class="media">
                            
                                <div class="content">
                                    <p>
                                        <strong> <a href="${recipe.url}">${recipe.label}</a></strong>
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
    
    console.log('edit')
    console.log(event.target.id)

    let curr = event.target.id;
    let recipe = dataArr.find(r => r.id = curr)
    // console.log(currRecipe)
    let myList = `<ul>`;

    for (let i = 0; i < recipe.ingredients.length; i++) {
        myList += `<li><input type="text" placeholder="${recipe.ingredients[i].text}"></li>`;
        // console.log(list)
    };
    myList += `</ul>`;
    let editForm = `
    <div class="box" id="${recipe.label.split(" ").join("")}">
    <img class="recipe_img" src="${recipe.img}">
    <article class="media">
                            
    <div class="field">
        <p>

            <strong> <a href="${recipe.url}"><input class="input" type="text" placeholder="${recipe.label}"></input></a></strong>
            <br>
            <small>${recipe.cals} cals</small>
            <br>
            
            ${myList}
            </p>
    </div>
</article>
<div class="tags mt-3">

    
</div>
<div class="tags">
<button id="${recipe.label.split(" ").join("")}" class=" button submitCard m-1 is-small is-warning">Submit <i class="fas fa-check"></i></button>
</div>


</div>

    `

    $('#' + event.target.id).replaceWith(editForm);
}

function handleDeleteButton(event) {
    event.preventDefault();
    //insert axios call
    console.log('delete')
    $('#' + event.target.id).replaceWith(``).remove();


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
        // console.log(recipe.data);
        // console.log(recipe.data.result);
        dataArr = Object.values(recipe.data.result);
        console.log(dataArr);

        for (let i = 0; i < dataArr.length; i++) {
            // dataArr[i].date = getDate();
            dataArr[i].id = i;
            renderRecipeCard(dataArr[i]);
        }

    } catch (error) {
        alert(error);
    }
}



$(function () {
    getRecipes();
    // $(document).on('click', '.edit', function () {
    //     console.log('edit')
    // });
    $(document).on('click', '.deleteCard', handleDeleteButton);
    $(document).on('click', '.edit', handleEditButton);

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


// function getDate() {
//     var d = new Date();
//     let month = d.getMonth() + 1;
//     let day = d.getDay() + 1;
//     return '12/4'
//     // return (month + '/' + day)
// }