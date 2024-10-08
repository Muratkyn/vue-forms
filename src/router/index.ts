import { createRouter, createWebHistory } from "vue-router";
import SummaryPage from "@/components/SummaryPage.vue";
import VueForm from "@/components/VueForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: VueForm,
    },
  ],
});

export default router;
