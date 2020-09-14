<template>
  <v-app>
    <div class="buttonConsole">
      <v-btn @click="openModal" class="button" small color="primary">Добавить данные</v-btn>
      <v-btn
        @click="editSelectedItem"
        :disabled="!selected.length"
        class="button"
        small
        color="primary"
      >Редактировать</v-btn>
      <v-btn
        @click="deletedSelectedItem"
        :disabled="!selected.length"
        class="button"
        small
        color="primary"
      >Удалить</v-btn>
    </div>
    <v-data-table
      v-model="selected"
      :single-select="singleSelect"
      show-select
      :items="GetTaskPerson"
      item-key="Id"
      :headers="headers"
    >
      <template v-slot:item.Status="{ item }">
        <p
          :class="item.Status == 'В ожидании' ? 'tableRed' : item.Status ==  'В работе' ? 'tableBlue' : 'tableGreen'"
        >{{ item.Status }}</p>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-form>
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
            <v-btn
              :disabled="dialogForm"
              :class="[edit ? 'editTrue' : '']"
              color="blue darken-1"
              text
              @click="addTaskInTable"
            >Сохранить</v-btn>
            <v-btn
              :class="[!edit ? 'editTrue' : '']"
              color="blue darken-1"
              text
              @click="editTaskInTable"
            >Редактировать</v-btn>
            <v-btn color="red darken-1" text @click="dialog = false">Отмена</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    singleSelect: true,
    selected: [],
    edit: false,
    headers: [
      { text: "ID", value: "Id" },
      { text: "Категория", value: "Categories" },
      { text: "Название", value: "Name" },
      { text: "Описание", value: "Discription" },
      { text: "Статус", value: "Status" },
      { text: "Приоритет", value: "Priority" },
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
      this.edit = false;
      this.dialog = true;
    },
    addTaskInTable() {
      let id = 0;
      for (var i in this.GetTaskPerson) {
        if (this.GetTaskPerson[i].Id > id) {
          id = this.GetTaskPerson[i].Id;
        }
      }
      const addTask = {
        Id: ++id,
        Categories: this.items.Categories,
        Name: this.items.Name,
        Discription: this.items.Discription,
        Status: this.items.Status,
        Priority: this.items.Priority,
        idPerson: +this.$route.params.id,
      };
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
    deletedSelectedItem() {
      this.$store.dispatch("deletedTaskPerson", this.selected);
    },
    editSelectedItem() {
      let editInfo = this.selected[0];
      console.log(editInfo);
      this.edit = true;
      this.dialog = true;
      this.items = {
        Categories: editInfo.Categories,
        Name: editInfo.Name,
        Discription: editInfo.Discription,
        Status: editInfo.Status,
        Priority: editInfo.Priority,
      };
    },
    editTaskInTable() {
      let editSelected = this.selected[0];

      editSelected = {
        Id: editSelected.Id,
        Categories: this.items.Categories,
        Name: this.items.Name,
        Discription: this.items.Discription,
        Status: this.items.Status,
        Priority: this.items.Priority,
        idPerson: editSelected.idPerson,
      };
      this.$store.dispatch("editTableInfo", editSelected);
      this.dialog = false;
    },
  },
  computed: {
    ...mapGetters(["GetTaskPerson"]),
    dialogForm() {
      let valid = true;
      for (let i in this.items) {
        if (this.items[i] == "" || this.items[i] == null) {
          return (valid = true);
        } else {
          valid = false;
        }
      }
      return valid;
    },
  },
  mounted() {
    this.$store.dispatch("addTableInfo", +this.$route.params.id);
  },
};
</script>

<style scoped>
.button {
  max-width: 200px;
  margin-left: 20px;
}
.buttonConsole {
  margin-left: auto;
}
.tableRed {
  margin: 0;
  color: red;
}
.tableBlue {
  margin: 0;
  color: blue;
}
.tableGreen {
  margin: 0;
  color: green;
}
.editTrue {
  display: none;
}
</style>