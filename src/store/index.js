import Vue from 'vue'
import Vuex from 'vuex'
import ModalForm from "./modules/ModalForm"
import TaskTable from "./modules/TaskTable"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    ModalForm,
    TaskTable
  }
})