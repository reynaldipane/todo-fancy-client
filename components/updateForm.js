Vue.component(
    'form-update',
    {
        props : ['datatoupdate','datauser'],
        template :
        `
        <section class="content">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-warning">
                        <div class="box-body">
                            <h1 class="col-md-8 col-md-offset-4">Update To Do</h1>
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Your Task Title</label>
                                <input type="text" v-model="datatoupdate.title" class="form-control" placeholder="Task Title ...">
                            </div>
                            
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Your Task</label>
                                <textarea class="form-control" v-model="datatoupdate.body" rows="3" placeholder="Your task detail here ..."></textarea>
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <button type="submit" class="btn btn-primary" v-on:click="updateToDo(false,datatoupdate.postId)" v-if="updateTranslateBody == ''">Submit</button>
                                <button type="submit" class="btn btn-warning" v-on:click="translateToDo">Translate To Do</button>                                
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2" v-if="updateTranslateBody != ''">
                                <label>Your Task</label>
                                <textarea class="form-control" v-model="updateTranslateBody" rows="3" placeholder="Your task detail here ..."></textarea>
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2" >
                                <button type="submit" class="btn btn-primary" v-on:click="updateToDo(true,datatoupdate.postId)" v-if="updateTranslateBody != ''">Save Translate</button>
                                <button type="submit" class="btn btn-warning" v-on:click="updateToDo(false,datatoupdate.postId)" v-if="updateTranslateBody != ''">Save Original</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
        ,
        data : function() {
            return {
                updateTranslateBody : ``
            }
        },
        methods : {
            updateToDo: function(translate,id) {
                let toDoBody = ``
                if (translate) {
                    toDoBody = this.updateTranslateBody
                } else {
                    toDoBody = this.datatoupdate.body
                }

                axios({
                    method: 'PUT',
                    url: `http://todo.purge-works.com/api/todos/update/${id}`,
                    headers: {
                        token: this.datauser.token
                    },
                    data : {
                        title: this.datatoupdate.title,
                        body: toDoBody,
                        id_user: this.datatoupdate.userid 
                    }
                })
                .then((response) => {
                    alert('Updated !')
                    this.$emit('clear-data-update')
                })
                .catch(err => {
                    console.log(err)
                })
            },

            translateToDo : function() {
                axios.post('http://todo.purge-works.com/api/todos/translate', {
                    text: this.datatoupdate.body,
                })
                .then((response) => {
                    this.updateTranslateBody  = response.data.translate
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
)