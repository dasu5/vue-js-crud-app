<template>
  <div class="update-employee">
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="number" v-model="employee_id" required disabled />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="department" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
          </div>
        </div>

        <button type="submit" class="btn">Update Employee</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
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
    updateEmployee() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                employee_id: this.employee_id,
                name: this.name,
                department: this.department,
                position: this.position,
              })
              .then(() => {
                this.$router.push({
                  name: "ViewEmployee",
                  params: { employee_id: this.employee_id },
                });
              });
          });
        });
    },
  },
};
</script>

<style>
.update-employee {
  margin-top: 40px;
  margin-left: 130px;
  margin-right: 100px;
  text-align: left;
}
</style>