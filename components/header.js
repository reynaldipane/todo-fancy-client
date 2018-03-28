Vue.component('header-todo', {
    props : ['datauser'],
    template: `
    <header class="main-header">
        
        <a class="logo" style="height:65px;position:fixed">
            <span class="logo-mini"><b>T</b>DF</span>
            <span class="logo-lg"><b>To Do </b>Fancy</span>
        </a>

        <nav class="navbar navbar-static-top" role="navigation">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="navbar-custom-menu">                
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu" v-if="datauser.userId == undefined">
                        <a class="dropdown-toggle">
                            <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
                        </a>
                    </li>

                    <li class="dropdown user user-menu" v-if="datauser.userId == undefined">
                        <a class="dropdown-toggle" data-toggle="modal" data-target="#modalSignUp">
                            <i class="btn btn-warning">Sign Up</i>
                        </a>
                    </li>

                    <li class="dropdown user user-menu" v-if="datauser.userId == undefined">
                        <a class="dropdown-toggle" data-toggle="modal" data-target="#modalSignIn">
                            <i class="btn btn-success">Login</i>
                        </a>
                    </li>

                    <li class="dropdown user user-menu"  v-if="datauser.userId != undefined">
                        <a class="dropdown-toggle" data-toggle="dropdown" v-on:click="logoutUser">
                            <i class="btn btn-danger">Logout</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    `
    ,
    methods : {
        logoutUser : function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            localStorage.removeItem('email');            
            location.reload()
        }
    }
})