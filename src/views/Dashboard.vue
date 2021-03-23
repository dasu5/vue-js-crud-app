<template>
  <div class="dashboard">
    <table>
      <thead>
        <tr>
          <th>Employee Id</th>
          <th>Name</th>
          <th>Department</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.employee_id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.department }}</td>
          <td>
            <router-view></router-view>
            <router-link
              class="view"
              :to="{
                name: 'ViewEmployee',
                params: { employee_id: employee.employee_id },
              }"
            >
              View
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="fixed-action-btn">
      <router-link to="/add" class="btn-floating btn-large blue">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../database/init.js";

export default {
  name: "Dashboard",
  data() {
    return {
      employees: [],
    };
  },
  methods: {},
  created() {
    db.collection("employees")
      .orderBy("employee_id")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            department: doc.data().department,
            position: doc.data().position,
          };
          this.employees.push(data);
        });
      });
  },
};
</script>

<style scoped>
table {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid teal;
  border-radius: 3px;
  background-color: #fff;
  width: 50%;
}
th {
  background-color: #555555;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}
tr:hover {
  background-color: lightgrey;
}
td {
  text-align: center;
}
th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
router-link {
  background-color: lightslategray;
}
.view {
  padding: 10px 24px;
  cursor: pointer;
  text-align: center;
  background-color: #008CBA;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
}
</style>