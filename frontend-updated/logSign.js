
$(function () {
    $(document).on('click', '#submitRtrnAccount', async function (event) {
        event.preventDefault();
        let username = $("#rtrnUsername").val();
        let password = $("#rtrnPass").val();
        console.log(username, password)

            let res = await axios.post('http://localhost:3000/login', {
            withCredentials: true,
                data: {
                    user: username,
                    password: password,
                }
            });

        

        console.log(res);
        // .then((response) => {
        //     $("#messages").append('<br><p class="has-text-danger">SUCCESS!<p>');
        //     location.href = "./profile.html";
        //     console.log(response)
        // }).catch((e) => {
        //     $("#messages").append('<br><p class="has-text-danger">Username or password incorrect. Try again!<p>');
        //     console.log(e)
        // });


        // ) catch(e){
        //     $("#messages").append('<br><p class="has-text-danger">Username or password incorrect. Try again!<p>')
        // }
        //  $("#messages").append('<br><p class="has-text-danger">SUCCESS!<p>');
        //     location.href = "./profile.html"

        // if(result.data == true){

        // location.href = "./profile_mockpage.html"
        //$("#name").append('<p>LOGGED IN USER</p>')
        //   getUserInfo();

    })

    $(document).on('click', '#submitNewAccount', async function (event) {
        event.preventDefault();
        let username = $("#username").val();
        let name = $("#name").val();
        let password1 = $("#pass1").val();
        let password2 = $("#pass2").val();

        if (password1 != password2) {
            alert("Passwords do not match, try again!");
            return;
        } else {
            let res = await axios.post('http://localhost:3000/createUser',{
                withCredentials:true,
                data: {
                    username: username,
                    name: name,
                    password1: password1,
                    password2: password2,
                }
            });
            console.log(res.data);
        }
    })
});
