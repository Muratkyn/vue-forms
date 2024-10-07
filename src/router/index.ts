import { createRouter, createWebHistory } from "vue-router";
import SummaryPage from "@/components/SummaryPage.vue";
import VueForm from "@/components/VueForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: VueForm,
    },
    {
      path: "/summary",
      name: "summary",
      component: SummaryPage,
    },
  ],
});

export default router;
