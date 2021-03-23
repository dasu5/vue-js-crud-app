<template>
  <div class="new-employee">
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <label>Employee Id</label>
          <div class="input-field col s12">
            <input type="number" v-model="employee_id" required />
          </div>
        </div>
        <div class="row">
          <label>Name</label>
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <label>Department</label>
          <div class="input-field col s12">
            <input type="text" v-model="department" required />
          </div>
        </div>
        <div class="row">
          <label>Position</label>
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
          </div>
        </div>

        <button type="submit" class="btn">Add Employee</button>
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
  methods: {
    saveEmployee() {
      db.collection("employees")
        .add({
          employee_id: this.employee_id,
          name: this.name,
          department: this.department,
          position: this.position,
        })
        .then((docRef) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.new-employee {
  margin-top: 40px;
  margin-left: 130px;
  margin-right: 100px;
  text-align: left;
}
label {
  text-align: left;
  font-size: 14px;
  color: black;
}
button {
  margin-right: 10px;
}
</style>