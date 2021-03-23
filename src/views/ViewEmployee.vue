<template>
  <div class="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Employee ID : {{ employee_id }}</li>
      <li class="collection-item">Department : {{ department }}</li>
      <li class="collection-item">Position : {{ position }}</li>
    </ul>

    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'UpdateEmployee', params: { employee_id: employee_id } }"
        class="btn-floating btn-large green"
      >
        <i class="material-icons">create</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../database/init.js";

export default {
  data() {
    return {
      employee_id: null,
      name: null,
      department: null,
      position: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((emp) => {
            emp.employee_id = doc.data().employee_id;
            emp.name = doc.data().name;
            emp.department = doc.data().department;
            emp.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.department = doc.data().department;
            this.position = doc.data().position;
          });
        });
    },
    deleteEmployee() {
      if (confirm("Are you sure?")) {
        db.collection("employees")
          .where("employee_id", "==", this.$route.params.employee_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.view-employee {
  margin-top: 30px;
  margin-left: 60px;
  margin-right: 100px;
  text-align: left;
}
button {
  margin-left: 10px;
}
</style>