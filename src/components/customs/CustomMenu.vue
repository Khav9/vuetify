<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-dots-vertical"
        class="elevation-0 pa-0"
        v-bind="props"
      ></v-btn>
    </template>

    <v-list density="compact" nav rounded="lg">
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :value="item"
        @click="handleClick(item.action)"
        color="primary"
      >
        <template v-slot:append>
          <v-icon :icon="item.icon" :color="item.color"></v-icon>
        </template>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'CustomMenu',
    props: {
      menuItems: {
        type: Array,
        required: true
      },
      id: {
        type: [String, Number],
        required: true
      },
      additionalData: {
        // Optional additional data
        type: [String, Number, Object],
        default: null
      }
    },
    methods: {
      handleClick(action) {
        this.$emit('menu-click', action, this.id, this.additionalData)
      }
    }
  }
</script>

<style scoped>
  /* Add any custom styles here if needed */
</style>
