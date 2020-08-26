export default ({
    state: {
        arrayPerson: [{
            id: 1,
            name: "Пользователь",
            lastname: "С фамилией",
            email: "test@test.test"
        }]
    },
    mutations: {
        addPerson(state, payload) {
            console.log(payload);
            let newArr = JSON.parse(localStorage.getItem('arrayPerson'))
            state.arrayPerson.push(payload)
            newArr.push(payload)
            localStorage.setItem('arrayPerson', JSON.stringify(newArr))

        },
        presetPerson(state) {
            const person = localStorage.getItem('arrayPerson')
            if (person) {
                state.arrayPerson = JSON.parse(person)
            }
        }
    },
    actions: {
        actionPerson(context, payload) {
            context.commit('addPerson', payload);
        },
        personInfo(context) {
            context.commit('presetPerson');
        }
    },
    getters: {
        // personGet: (s) => id => s.arrayPerson.find(t => t.id == id)
        personGet(state) {
            return function (id) {
                return state.arrayPerson.find((t) => t.id == id)
            }
        }

    }
})