<template>
  <a class="text-blue-500 hover:text-blue-700" :href="href">{{ text }}</a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: "Click here!"
  }
});
</script>
