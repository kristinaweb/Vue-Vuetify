<template>
  <v-app>
    <v-btn @click="openModal" class="button" small color="primary">Добавить данные</v-btn>
    <v-data-table :items="GetTaskPerson" :headers="headers"></v-data-table>
    <v-dialog v-model="dialog" persistent max-width="500">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-card>
        <v-col class="d-flex">
          <v-text-field v-model="items.Categories" label="Категория" required></v-text-field>
        </v-col>
        <v-col class="d-flex">
          <v-text-field v-model="items.Name" label="Название" required></v-text-field>
        </v-col>
        <v-col class="d-flex">
          <v-text-field v-model="items.Discription" label="Описание" required></v-text-field>
        </v-col>
        <v-col class="d-flex">
          <v-select :items="StatusValue" v-model="items.Status" label="Статус"></v-select>
        </v-col>
        <v-col class="d-flex">
          <v-select :items="PriorityValue" v-model="items.Priority" label="Приоритет"></v-select>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addTaskInTable">Сохранить</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "ID", value: "Id" },
      { text: "Категория", value: "Categories" },
      { text: "Название", value: "Name" },
      { text: "Описание", value: "Discription" },
      { text: "Приоритет", value: "Status" },
      { text: "Статус", value: "Priority" },
    ],
    items: {
      Categories: "",
      Name: "",
      Discription: "",
      Status: null,
      Priority: null,
    },
    StatusValue: ["В ожидании", "В работе", "Готово"],
    PriorityValue: ["Большой", "Средний", "Низкий"],
    dialog: false,
  }),
  methods: {
    openModal() {
      this.dialog = true;
    },
    addTaskInTable() {
      let id = this.GetTaskPerson.length;
      const addTask = {
        Id: ++id,
        Categories: this.items.Categories,
        Name: this.items.Name,
        Discription: this.items.Discription,
        Status: this.items.Status,
        Priority: this.items.Priority,
        idPerson: +this.$route.params.id,
      };
      console.log(addTask);
      this.$store.dispatch("addTaskPerson", addTask);
      this.dialog = false;
      this.items = {
        Categories: "",
        Name: "",
        Discription: "",
        Status: null,
        Priority: null,
      };
    },
  },
  computed: {
    ...mapGetters(["GetTaskPerson"]),
  },
  mounted() {
    this.$store.dispatch("addTableInfo", +this.$route.params.id);
  },
};
</script>

<style scoped>
.button {
  max-width: 200px;
  margin-left: auto;
}
</style>