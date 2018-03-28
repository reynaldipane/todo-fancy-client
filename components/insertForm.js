Vue.component(
    'form-insert',
    {
        props : ['datausertoinsert'],
        template:
        `
        <section class="content">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="box box-warning">
                        <div class="box-body">
                            <h1 class="col-md-8 col-md-offset-4">Add new to do !</h1>
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Your Task Title</label>
                                <input type="text" v-model="objToDo.title" class="form-control" placeholder="Task Title ...">
                            </div>
                            
                            <div class="form-group col-md-8 col-md-offset-2">
                                <label>Your Task</label>
                                <textarea class="form-control" v-model="objToDo.body" rows="3" placeholder="Your task detail here ..."></textarea>
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2">
                                <button type="submit" class="btn btn-primary" v-on:click="saveToDo(false)" v-if="objToDo.translateBody == ''">Submit</button>
                                <button type="submit" class="btn btn-warning" v-on:click="translateToDo">Translate To Do</button>                                
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2" v-if="objToDo.translateBody != ''">
                                <label>Your Task</label>
                                <textarea class="form-control" v-model="objToDo.translateBody" rows="3" placeholder="Your task detail here ..."></textarea>
                            </div>

                            <div class="form-group col-md-8 col-md-offset-2" >
                                <button type="submit" class="btn btn-primary" v-on:click="saveToDo(true)" v-if="objToDo.translateBody != ''">Save Translate</button>
                                <button type="submit" class="btn btn-warning" v-on:click="saveToDo(false)" v-if="objToDo.translateBody != ''">Save Original</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
        methods: {
            tesTag: function () {
                alert(this.objToDo.tag)
            },
            saveToDo: function (translate) {
                let todoBody = ``
                
                if(translate) {
                    todoBody = this.objToDo.translateBody
                } else {
                    todoBody = this.objToDo.body
                }

                axios({
                    method: 'POST',
                    url: 'http://todo.purge-works.com/api/todos/create',
                    headers: {
                        token: this.datausertoinsert.token
                    },
                    data : {
                        title: this.objToDo.title,
                        body: todoBody,
                        id_user: this.objToDo.userid,
                        email: this.objToDo.email,
                        tag:this.objToDo.tag                        
                    }
                })
                .then((response) => {
                    this.objToDo.title         = ``
                    this.objToDo.body          = ``
                    this.objToDo.translateBody = ``
                    alert('Saved !')
                })
                .catch(err => {
                    console.log(err)
                })
            },

            translateToDo: function () {
                axios.post('http://todo.purge-works.com/api/todos/translate', {
                    text: this.objToDo.body,
                })
                .then((response) => {
                    this.objToDo.translateBody  = response.data.translate
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        data: function () {
            return {
                objToDo: {
                    title: ``,
                    body: ``,
                    userid: this.datausertoinsert.userId,
                    email: this.datausertoinsert.email,
                    tag:``,
                    translateBody : ``
                },
            }
        }
    }
)