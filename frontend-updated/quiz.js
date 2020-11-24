//global mood counters
var happyPoints = 0;
var sadPoints = 0;
var angryPoints = 0;
var excitedPoints = 0;
var questionCount = 0;
var tempCounter = 0;
let finalRecipe;

let success = false;

let allRecipes = [];
// global array --- somehow make this a secret value ??
//exports.allRecipes = allRecipes;

var tempData = copyData(questions);

export function copyData(questions){
  let copyarr = [];
  for(let i = 0; i < questions.length; i++){
    copyarr[i] = questions[i];
  }
  return copyarr;
}

export const handleAnswerButton = function(event){
  event.preventDefault();


    // PROBLEM HERE -- if you click on the words, it doesn't return the correct html element
  let tracker = event.target.getAttribute('id');

    if(tracker == "happy"){
      happyPoints++;
    }else if(tracker == "sad"){
      sadPoints++;
    }else if(tracker == "angry"){
      angryPoints++;
    }else{
      excitedPoints++;
    }

  if(questionCount < 8){
    $('#entirePage').replaceWith(renderQuestion());

  } else {
    createRecipe();
  }
}

export const renderQuestion = function(){
  //  console.log(questionCount);
  if(questionCount < 8){
    questionCount++;
    var randomNumber = Math.floor(Math.random() * Math.floor(9 - tempCounter)); // change back to 24 when all the questions are in

    let question =    `<div id="entirePage" class="quiz_banner banner">
                        <div id="quiz">
                            <h2 class="title has-text-dark" id="quiz-name">Let's guess your mood</h2>
                                <div id="quiz_cont">
                                    <div class="question">
                                        <h3 class="subtitle m-2">${tempData[randomNumber].q}</h3>
                                    </div>


                                    <!-- QUIZ ANSWERS -->
                                    <div class="container">
                                        <div class="columns m-1">
                                            <a class="ans_container" class="answer" href="#">
                                                <div class="column hvr-shrink   m-1 answer" id="${tempData[randomNumber].m[0]}">
                                                    <p>${tempData[randomNumber].a[0]}</p>
                                                </div>
                                            </a>
                                            <a class="ans_container" class="answer" href="#">
                                                <div class="column hvr-shrink  m-1 answer" id="${tempData[randomNumber].m[1]}">
                                                    <p>${tempData[randomNumber].a[1]}</p>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="columns m-1">
                                            <a class="ans_container" class="answer" href="#">
                                                <div class="column hvr-shrink  m-1 answer" id="${tempData[randomNumber].m[2]}">
                                                    <p>${tempData[randomNumber].a[2]}</p>
                                                </div>
                                            </a>
                                            <a class="ans_container" class="answer" href="#">
                                                <div class="column hvr-shrink  m-1 answer" id="${tempData[randomNumber].m[3]}">
                                                    <p>${tempData[randomNumber].a[3]}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    let deletedQuestion = tempData.splice(randomNumber,1);
    tempCounter++;

    return question;
  }
}

export async function makeFoodList(foodList){
  let foodObjArr = [];

  try { 
    for(let i = 0; i < foodList.length; i++){
      const result = await axios({
          method: 'get',
          url: 'https://api.edamam.com/search?app_id=a827a21b&app_key=ec74908f00f3210c21a1a90c37518b97&q='+foodList[i],
        });
  
      foodObjArr[i] = result.data;
    }
    success = true;
  } catch(err){
    success = false;
   // console.log(success);
    let popUp = `<div id="entirePage">
                <section class = "section">
                <br>
                <br>
                <br>
                <div class = "container">
                  <br>
                  <br>
                  <div id = "modal" class = "modal is-active">
                      <div class = "modal-background"></div>
                        <div class = "modal-content">
                            <div class="card">
                                <div class="card-content">
                                <p class="title" style="text-align:center">
                                    Just one second...
                                </p>
                                <br>
                                <p class="subtitle" style="text-align:center">
                                   We are having some trouble connecting to the network, please wait at least a minute before retaking the quiz
                                </p>
                            </div>
                            <footer class="card-footer">
                                <p class="card-footer-item">
                                <a href="index.html"><button class="button profileButton" id="profileButton">Return to Home</button></a>
                                </p>
                            </footer>
                        </div>
                        </div>
                        <button class = "modal-close is-large" aria-label = "close"></button>
                    </div>
                    </div>
                </section>
                </div>`;

    $('#entirePage').replaceWith(popUp);
  }
    
  //console.log(foodObjArr);
  findFinalRecipe(foodObjArr);
}

async function findFinalRecipe(foodObjArr){
  let randomNumber  = Math.floor(Math.random() * Math.floor(foodObjArr.length));     // give a random number to choose from the foot types

  let finalFoodType = foodObjArr[randomNumber].hits;                                 // gives the 10 recipes for that food type

  let randomNumber2 = Math.floor(Math.random() * Math.floor(finalFoodType.length));  // gives a random number to choose from the recipes

  finalRecipe = finalFoodType[randomNumber2]; 
  
  allRecipes.push(finalRecipe);
  console.log(allRecipes);
  
}

// async function getPrivate() {
//   const tokenStr = localStorage.getItem('token');
//   try{
//       const res = await axios({
//           method: "get",
//           url: "http://localhost:3003/private/recipes",
//           headers: {Authorization: `Bearer ${tokenStr}`},
//       });
//       return res;
//   } catch(error){
//       alert(error);
//   }
// }



export async function createRecipe(){
  // 5 most popular food types in the world sorted with moods happy, sad, angry, anxious, and excited
  let happyOptions = ["chicken", "salad", "tacos", "american"];
  let sadOptions = ["chinese", "pizza", "soup", "icecream"];
  let angryOptions = ["mexican", "indian", "beef", "vegetables"];
  let excitedOptions = ["italian", "steak", "fried", "pasta"];

  let pointsArray = [];

  pointsArray.push(happyPoints);
  pointsArray.push(sadPoints);
  pointsArray.push(angryPoints);
  pointsArray.push(excitedPoints);

    for(let i = 0; i < pointsArray.length; i++){
        pointsArray[i] = Math.ceil(pointsArray[i] / 2);
    }
    let finalFoodArray = [];

    if(pointsArray[0] > 1){
        for(let i = 0; i < pointsArray[0]; i++){
            let randomNumber = Math.floor(Math.random() * Math.floor(pointsArray[0]));
            finalFoodArray.push(happyOptions[randomNumber]);
        }
    }
    if(pointsArray[1] > 1){
        for(let i = 0; i < pointsArray[1]; i++){
            let randomNumber = Math.floor(Math.random() * Math.floor(pointsArray[1]));
            finalFoodArray.push(sadOptions[randomNumber]);
        }
    }
    if(pointsArray[2] > 1){
        for(let i = 0; i < pointsArray[2]; i++){
            let randomNumber = Math.floor(Math.random() * Math.floor(pointsArray[2]));
            finalFoodArray.push(angryOptions[randomNumber]);
        }
    }
    if(pointsArray[3] > 1){
        for(let i = 0; i < pointsArray[3]; i++){
            let randomNumber = Math.floor(Math.random() * Math.floor(pointsArray[3]));
            finalFoodArray.push(excitedOptions[randomNumber]);
        }
    }
  makeFoodList(finalFoodArray);
 //console.log(success);
  setTimeout(function(){
    if(success){
      let popUp = `<div id="entirePage">
                  <section class = "section">
                  <br>
                  <br>
                  <br>
                  <div class = "container">
                    <br>
                    <br>
                    <div id = "modal" class = "modal is-active">
                        <div class = "modal-background"></div>
                          <div class = "modal-content">
                              <div class="card">
                                  <div class="card-content">
                                  <p class="title" style="text-align:center">
                                      Congratulations! 
                                  </p>
                                  <br>
                                  <p class="subtitle" style="text-align:center">
                                      We have chosen a recipe for you based on your current mood
                                  </p>
                              </div>
                              <footer class="card-footer">
                                  <p class="card-footer-item">
                                  <a href="profile.html"><button class="button profileButton" id="profileButton">Go to My Recipe</button></a>
                                  </p>
                              </footer>
                          </div>
                          </div>
                          <button class = "modal-close is-large" aria-label = "close"></button>
                      </div>
                      </div>
                  </section>
                  </div>`;
  
      $('#entirePage').replaceWith(popUp); 
    }
  }, 1000);

}

async function addRecipe(event){

  let id = finalRecipe.recipe.label;
  // id = id.split().join();
  console.log(id);

  let recipe = finalRecipe.recipe;
  //let date = getDate();
  let code = createID();

    let token = localStorage.getItem('jwt');
    try {
        const res = await axios({
            method: 'post',
            url: "http://localhost:3003/user/recipes/" + id,
            headers: {Authorization: `Bearer ${token}`},
            "type": "merge",
            'data': {
              'data': { 
                'uri': recipe.uri,
                'img': recipe.image,
                'label': recipe.label,
                'url': recipe.url,
                'cals': recipe.calories,
                'ingredients': recipe.ingredients,
                'dietLabel': recipe.dietLabels,
                'healthLabel': recipe.healthLabels,
                'id': code
              }
            }
        });
        //console.log(res);
    } catch (error) {
        alert(error);
    }
}
// async function stringToHash(string) {        
//   var hash = 0; 
//   if (string.length == 0) return hash; 
//   for (let i = 0; i < string.length; i++) { 
//       let char = string.charCodeAt(i); 
//       hash = ((hash << 5) - hash) + char; 
//       hash = hash & hash; 
//   } 
//   return hash; 
// } 

async function addUser(){
  let name = localStorage.getItem('name');
  let id = finalRecipe.recipe.label.split(" ").join("");
  console.log(name);
  console.log(id);

  let recipe = finalRecipe.recipe;
  //let date = getDate();
  //console.log(date)
  let token = localStorage.getItem('jwt');
  console.log(id);
  try {
    const res = await axios({
        method: 'post',
        url: "http://localhost:3003/user/recipes/" + id,
        headers: {Authorization: `Bearer ${token}`},
        "type": "merge",
        'data': {
            'data': {
              "uri": recipe.uri,
              "img": recipe.image,
              "label": recipe.label,
              "url": recipe.url,
              "cals": recipe.calories,
              "ingredients": recipe.ingredients,
              "dietLabel": recipe.dietLabels,
              "healthLabel": recipe.healthLabels,
            }
        }
    });
  } catch (error) {
      alert(error);
  }
}

export function renderQuiz(){
  let quiz = $('#root');

  quiz.append(renderQuestion());
 
  quiz.on('click', '.answer', handleAnswerButton);

  quiz.on('click', '.profileButton', addUser);

 // quiz.on('click', '.profileButton', handleProfileButton);
}

$(function() {
    renderQuiz();
});




function createID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}


export default allRecipes;

