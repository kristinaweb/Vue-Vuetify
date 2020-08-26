<template>
  <v-app>
    <div v-if="person">
      <v-list-item>
        <v-list-item-content>
          <h3>Имя</h3>
          <p>{{person.name}}</p>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <h3>Фамилия</h3>
          <p>{{person.lastname}}</p>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <h3>Почта для связи</h3>
          <p>{{person.email}}</p>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <h3>Дата постановки задач</h3>
          <p>{{person.dateFrom}}</p>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <h3>Крвйняя дата решения списка задач</h3>
          <p>{{person.dateTo}}</p>
        </v-list-item-content>
      </v-list-item>
      <div>
        <Table />
      </div>
    </div>
    <div class="fullscreen" v-else>Пользователь не найден</div>
  </v-app>
</template>

<script>
// import { mapState } from "vuex";
import Table from "./Table";

export default {
  data: () => ({}),
  components: { Table },
  mounted() {
    this.$store.dispatch("personInfo");
  },

  computed: {
    person() {
      console.log(this.$store.getters);
      return this.$store.getters.personGet(+this.$route.params.id);
    },
  },
};
</script>

<style scoped>
.fullscreen {
  font-size: 10rem;
  display: flex;
  height: 100vh;
  align-items: center;
  align-self: center;
}
</style>