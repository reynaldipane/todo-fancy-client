new Vue({
    el: '#app',
    data: {
        message: 'Hello world !',
        objShow: {
            postId: '',
            title: '',
            body: '',
            userid: localStorage.getItem('userid')
        },
        objUser : {
            userId : localStorage.getItem('userid'),
            token : localStorage.getItem('token'),
            email : localStorage.getItem('email')
        },
        todos: []
    },
    methods: {
        showToDo: function(payload) {
            this.objShow.postId = payload.postId
            this.objShow.title  = payload.title
            this.objShow.body   = payload.body
        },
        addUserData: function(payload) {
            this.objUser.userId     = payload.id
            this.objUser.token      = payload.token
            this.objUser.username   = payload.username            
            this.objUser.name       = payload.name
            this.objUser.email      = payload.email
            this.objShow.userid     = payload.id          
        },
        clearUserData: function() {
            this.objUser.userId     = ``
            this.objUser.token      = ``
            this.objUser.username   = ``
            this.objUser.name       = ``
            this.objUser.email      = ``
            this.objShow.userid     = ``          
        },
        clearDataUpdate : function() {
            this.objShow.postId = ''
            this.objShow.title = ''
            this.objShow.body = ''
        }
    },
    created: function () {
        axios.post('http://todo.purge-works.com/api/todos/findbyuserid', {
            userId: this.objUser.userId,
        })
        .then((response) => {
            this.todos  = response.data.data
        })
        .catch(err => {
            console.log(err)
        })
    },
    updated: function() {
        axios.post('http://todo.purge-works.com/api/todos/findbyuserid', {
            userId: this.objUser.userId,
        })
        .then((response) => {
            this.todos  = response.data.data
        })
        .catch(err => {
            console.log(err)
        })
    }
})