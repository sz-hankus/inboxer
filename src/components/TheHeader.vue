<script setup lang="ts">
  import EnvelopeIcon from './icons/EnvelopeIcon.vue'
</script>

<template>
  <header>
    <EnvelopeIcon id="envelope-icon" class=""></EnvelopeIcon>
    <h1>Inboxer</h1>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center; 
}

#envelope-icon {
  height: 40px;
}

</style>