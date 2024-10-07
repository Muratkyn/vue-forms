<template>
  <div class="summary">
    <h1>Summary</h1>
    <p><strong>Customer Name:</strong> {{ customerName }}</p>
    <p><strong>Customer Last Name:</strong> {{ customerLastName }}</p>
    <p><strong>Customer Email:</strong> {{ customerEmail }}</p>
    <p><strong>Customer Phone:</strong> {{ customerPhone }}</p>
    <p><strong>Customer Negozio:</strong> {{ customerNegozio }}</p>
    <p><strong>Customer Type:</strong> {{ customerType }}</p>
    <p><strong>Customer specific:</strong> {{ customerSpecific }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const customerName = route.query.customerName as string;
const customerLastName = route.query.customerLastName as string;
const customerEmail = route.query.customerEmail as string;
const customerPhone = route.query.customerPhone as string;
const customerNegozio = route.query.customerNegozio as string;
const customerType = route.query.requestType as string;
const customerSpecific = route.query.requestSpecific as string;
</script>

<style scoped>
.summary {
  padding: 20px;
}
</style>
