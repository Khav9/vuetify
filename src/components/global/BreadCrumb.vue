<template>
    <v-breadcrumbs :items="pathTitles" class="pa-1">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </template>
  <script>
  export default {
    props: {
      pathTitles: {
        type: Array,
        default: () => [],
      },
    },
  }
  </script>
  <style scoped>
  ul {
    cursor: pointer;
    display: inline-block;
    text-transform: uppercase;
  }
  </style>