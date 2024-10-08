<script setup lang="ts">
import type { Data } from "@/types";

const props = defineProps<{
  data: Data;
}>();
</script>

<template>
  <div class="summary">
    <h1>Summary</h1>
    <p><strong>Customer Name:</strong> {{ props.data.customerName }}</p>
    <p>
      <strong>Customer Last Name:</strong> {{ props.data.customerLastName }}
    </p>
    <p><strong>Customer Email:</strong> {{ props.data.customerEmail }}</p>
    <p><strong>Customer Phone:</strong> {{ props.data.customerPhone }}</p>
    <p><strong>Customer Negozio:</strong> {{ props.data.customerNegozio }}</p>

    <p><strong>Customer Images:</strong></p>
    <ol>
      <p v-for="(img, index) in props.data.customerImage" :key="index">
        {{ index + 1 }} - {{ img.name }}
      </p>
    </ol>

    <p><strong>Request Type:</strong> {{ props.data.requestType }}</p>
    <p><strong>Request Specific:</strong> {{ props.data.requestSpecific }}</p>
  </div>
</template>

<style scoped>
.summary {
  padding: 20px;
}
</style>
