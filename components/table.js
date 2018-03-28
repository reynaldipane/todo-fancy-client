Vue.component(
    'component-table',
    {
        props:['todos','datauser'],
        template:
        `
        <section class="content">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-warning">
                        <div class="box-body">
                            <table class="table table-bordered">
                               <tbody>
                                <tr>
                                    <th style="text-align:center;">Task Title</th>
                                    <th style="text-align:center;">Task</th>
                                    <th style="text-align:center;">Task Status</th>
                                    <th style="text-align:center;">Action</th>
                                </tr>
                                <tr v-for="todo in todos">
                                        <td>{{todo.title}}</td>
                                        <td>{{todo.body}}</td>
                                        <td>{{todo.status}}</td>
                                        <td>
                                        <button class="btn btn-warning" v-on:click="handleShowToDo(todo._id)">Update</button>
                                        <br>
                                        <br>
                                        <button class="btn btn-danger" v-on:click="deleteTask(todo._id)">Delete</button>
                                        <br>
                                        <br>
                                        <button class="btn btn-success" v-on:click="updateStatusTask(todo._id)">Set Done</button>
                                    </td>
                                </tr>
                               </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
        data : function() {
            return {
                objShow : {
                    title : ``,
                    body  : ``,
                }
            }
        },
        methods : {
            handleShowToDo: function(id) {
                axios({
                    method: 'GET',
                    url: `http://todo.purge-works.com/api/todos/${id}`,
                    headers: {
                        token: this.datauser.token
                    }
                })
                .then((response) => {
                    this.objShow.postId = response.data.data._id;
                    this.objShow.title = response.data.data.title;
                    this.objShow.body = response.data.data.body;
                    this.$emit('click-show-data', this.objShow)
                })
                .catch(err => {
                    console.log(err)
                })
            },

            updateStatusTask: function(id) {
                axios({
                    method: 'PUT',
                    url: `http://todo.purge-works.com/api/todos/updatetask/${id}`,
                    headers: {
                        token: this.datauser.token
                    },
                    data : {
                        status:`Done !`
                    }
                })
                .then((response) => {
                    alert('Task Status Updated !')
                    this.$emit('clear-data-update')
                })
                .catch(err => {
                    console.log(err)
                })
            },

            deleteTask: function(id) {
                axios({
                    method: 'DELETE',
                    url: `http://todo.purge-works.com/api/todos/delete/${id}`,
                    headers: {
                        token: this.datauser.token
                    }
                })
                .then((response) => {
                    alert('Task Deleted !')
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }

    }
)