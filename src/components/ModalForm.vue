<template>
  <v-container>
    <v-dialog persistent v-model="dialog" width="70rem">
      <!-- 
        persistent // не дает окну закрыться при потере фокуса
      -->
      <v-card>
        <v-form class="firstForm" ref="form" v-model="valid">
          <v-text-field v-model="name" :counter="10" label="Имя" required></v-text-field>
          <v-text-field v-model="lastname" :counter="10" label="Фамилия" required></v-text-field>

          <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>

          <v-menu
            ref="dialogFrom"
            v-model="menuFrom"
            :close-on-content-click="false"
            :return-value.sync="dateFrom"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormattedFrom"
                label="Начальная дата"
                persistent-hint
                v-bind="attrs"
                @blur="dateFrom=parseDate(dateFormattedFrom)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateFrom" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalFrom=false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogFrom.save(dateFrom)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="dialogTo"
            v-model="menuTo"
            :close-on-content-click="false"
            :return-value.sync="dateTo"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormattedTo"
                label="Конечная дата"
                persistent-hint
                v-bind="attrs"
                @blur="dateTo=parseDate(dateFormattedTo)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateTo" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalTo=false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogTo.save(dateTo)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <!-- Для date-picker обяхаьельно нужны v-menu, v-text-field в template и  v-date-picker, такжее была проблема с ref="dialog" - ошибка save - undefined была из-за этого-->
          <!-- <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>-->

          <v-btn
            :disabled="validForm"
            color="success"
            class="mr-4"
            @click="personInfoSubmit"
          >Создать</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ModalForm",

  data: (vm) => ({
    // Даты
    dateFrom: "",
    dateTo: "",
    dateFormattedFrom: vm.formatDate(),
    dateFormattedTo: vm.formatDate(),
    modalFrom: false,
    modalTo: false,
    menuFrom: false,
    menuTo: false,
    dialogFrom: true,
    dialogTo: true,
    // Остальная информация из модального окна
    dialog: true,
    valid: false,
    email: "",
    emailRules: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    name: "",
    lastname: "",
  }),
  methods: {
    ...mapActions(["actionPerson"]),
    personInfoSubmit() {
      const personInfo = {
        id: Date.now(),
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        dateFrom: this.dateFormattedFrom,
        dateTo: this.dateFormattedTo,
        TableInfo: [],
      };
      this.$store.dispatch("actionPerson", personInfo);
      setTimeout(() => {
        this.$router.push({ name: "Page", params: { id: personInfo.id } });
      }, 2000);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("-");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  watch: {
    dateFrom() {
      this.dateFormattedFrom = this.formatDate(this.dateFrom);
    },
    dateTo() {
      this.dateFormattedTo = this.formatDate(this.dateTo);
    },
  },
  computed: {
    validForm() {
      if (
        this.dateFrom !== "" &&
        this.dateTo !== "" &&
        this.email !== "" &&
        this.name !== "" &&
        this.lastname !== ""
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.firstForm {
  padding: 30px;
}
</style>
