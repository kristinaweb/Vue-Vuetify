export default ({
    state: {
        TableTask: []
    },
    mutations: {
        addTaskPerson(state, payload) {
            var id = payload.idPerson
            var local = JSON.parse(localStorage.getItem('arrayPerson'))
            local.forEach(element => {
                if (element.id == id) {
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
            person.forEach((element) => {
                if (element.id == payload) {
                    state.TableTask = element.TableInfo
                }
            })
        },
        deletedTaskPerson(state, payload) {
            const person = JSON.parse(localStorage.getItem('arrayPerson'))
            const id = payload[0].idPerson
            person.forEach((element) => {
                if (element.id == id) {
                    let TableInfo = element.TableInfo
                    TableInfo.forEach((item, index) => {
                        if (item.Id == payload[0].Id) {
                            TableInfo.splice(index, 1)
                        }
                    })
                }
            })
            localStorage.setItem('arrayPerson', JSON.stringify(person))
            state.TableTask.forEach((tableItem, index) => {
                if (tableItem.Id == payload[0].Id) {
                    state.TableTask.splice(index, 1)
                }
            });
        },
        editTaskPerson(state, payload) {
            const person = JSON.parse(localStorage.getItem('arrayPerson'))
            const id = payload.idPerson
            person.forEach((element) => {
                if (element.id == id) {
                    let TableInfo = element.TableInfo
                    TableInfo.forEach((item) => {
                        if (item.Id == payload.Id) {
                            item["Categories"] = payload.Categories
                            item["Discription"] = payload.Discription
                            item["Id"] = payload.Id
                            item["Name"] = payload.Name
                            item["Priority"] = payload.Priority
                            item["Status"] = payload.Status
                            item["idPerson"] = payload.idPerson
                        }

                    })
                }
            })
            localStorage.setItem('arrayPerson', JSON.stringify(person))
            state.TableTask.forEach((tableItem, index) => {
                if (tableItem.Id == payload.Id) {
                    console.log(state.TableTask[index]);
                    state.TableTask[index]["Categories"] = payload.Categories
                    state.TableTask[index]["Discription"] = payload.Discription
                    state.TableTask[index]["Id"] = payload.Id
                    state.TableTask[index]["Name"] = payload.Name
                    state.TableTask[index]["Priority"] = payload.Priority
                    state.TableTask[index]["Status"] = payload.Status
                    state.TableTask[index]["idPerson"] = payload.idPerson
                }
            });
        }
    },
    actions: {
        addTaskPerson(context, payload) {
            context.commit('addTaskPerson', payload);
        },
        addTableInfo(context, payload) {
            context.commit('addTableInfo', payload);
        },
        deletedTaskPerson(context, payload) {
            context.commit('deletedTaskPerson', payload);
        },
        editTableInfo(context, payload) {
            context.commit('editTaskPerson', payload);
        }
    },
    getters: {
        GetTaskPerson(state) {
            return state.TableTask
        }
    },
})