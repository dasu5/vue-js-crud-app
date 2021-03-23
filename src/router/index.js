import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import NewEmployee from '../views/NewEmployee.vue'
import ViewEmployee from '../views/ViewEmployee.vue'
import UpdateEmployee from "../views/UpdateEmployee.vue"

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/add',
    name: "NewEmployee",
    component: NewEmployee
  },
  {
    path: "/:employee_id",
    name: "ViewEmployee",
    component: ViewEmployee,
    props: true
  },
  {
    path: "/:employee_id",
    name: "UpdateEmployee",
    component: UpdateEmployee
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
