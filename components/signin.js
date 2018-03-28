Vue.component('signin-form', {
    template : 
    `
    <div id="modalSignIn" class="modal fade" role="dialog">
        <div class="modal-dialog">
    
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="col-md-8">Login </h3>
            </div>

            <div class="modal-body">
                <section class="content">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Username</label>
                                <input id="login-username" type="text" class="form-control" placeholder="Username or Email" v-model="username_email">
                            </div>
                            
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Password</label>
                                <input id="login-password" type="password" class="form-control" placeholder="Password" v-model="password">
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <button type="submit" class="btn btn-success" v-on:click="signInUser">Login</button>                                
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
            username_email : ``,
            password       : ``
        }
    },
    methods : {
        signInUser : function() {
            axios.post('http://todo.purge-works.com/api/users/signin', {
                username_email: this.username_email,
                password: this.password,
            })
            .then((response) => {
                if(response.status == 200) {
                    localStorage.setItem('userid', response.data.data.id)
                    localStorage.setItem('token', response.data.data.token)
                    localStorage.setItem('email', response.data.data.email)                    
                    location.reload()
                    alert('Login Success')
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