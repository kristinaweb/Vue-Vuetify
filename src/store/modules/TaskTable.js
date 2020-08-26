export default ({
    state: {
        TableTask: []
    },
    mutations: {
        addTaskPerson(state, payload) {
            var id = payload.idPerson
            var local = JSON.parse(localStorage.getItem('arrayPerson'))
            console.log(local);
            local.forEach(element => {
                if (element.id == id) {
                    console.log(element);
                    if (!element["TableInfo"]) {
                        element["TableInfo"] = []
                    }
                    element["TableInfo"].push(payload)
                }
            });
            localStorage.setItem('arrayPerson', JSON.stringify(local))
            state.TableTask.push(payload)
        },
        addTableInfo: function (state, payload) {
            const person = JSON.parse(localStorage.getItem('arrayPerson'))
            console.log("person", person);
            console.log("payload", payload);
            person.forEach((element) => {
                if (element.id == payload) {
                    console.log(element);
                    state.TableTask = element.TableInfo
                }
            })
        }
    },
    actions: {
        addTaskPerson(context, payload) {
            context.commit('addTaskPerson', payload);
        },
        addTableInfo(context, payload) {
            context.commit('addTableInfo', payload);
        },
    },
    getters: {
        GetTaskPerson(state) {
            return state.TableTask
        }
    },
})