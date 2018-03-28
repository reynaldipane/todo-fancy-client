Vue.component('signup-form', {
    template : 
    `
    <div id="modalSignUp" class="modal fade" role="dialog">
        <div class="modal-dialog">
    
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="col-md-8">Create Account </h3>
            </div>

            <div class="modal-body">
                <section class="content">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Username</label>
                                <input id="login-username" type="text" class="form-control" placeholder="Your Username" v-model="username">
                            </div>
                            
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Password</label>
                                <input id="login-password" type="password" class="form-control" v-model="password">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Name</label>
                                <input id="login-username" type="text" class="form-control" placeholder="Your Name" v-model="name">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Email</label>
                                <p> Your To Do will be sent to your email !, Provide the real One !</p>
                                <input id="login-username" type="email" class="form-control" placeholder="Your real email" v-model="email">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Gender</label>
                                <select class="form-control" v-model="gender">
                                    <option disabled value="">Please select one</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <button type="submit" class="btn btn-success" v-on:click="signUpUser">Sign Up</button>                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    
        </div>
    </div>
    `,
    data : function() {
        return {
            username: ``,
            password: ``,
            name: ``,
            email: ``,
            gender: ``,
        }
    },
    methods : {
        signUpUser : function() {
            axios.post('http://todo.purge-works.com/api/users/signup', {
                username: this.username,
                password: this.password,
                name: this.name,
                email: this.email,
                gender: this.gender,                
            })
            .then((response) => {
                if(response.status == 200) {
                    localStorage.setItem('userid', response.data.data.id)
                    localStorage.setItem('token', response.data.data.token)
                    localStorage.setItem('email', response.data.data.email)                    
                    location.reload()
                    alert('Sign Up Success, now you can create your own todo !')
                    $('#modalSignIn').modal('hide')
                } else {
                    alert('Login Failed, please check your username or password')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
    }

})