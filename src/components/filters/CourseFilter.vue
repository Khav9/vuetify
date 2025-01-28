<template>
  <v-card class="py-2 px-0 mb-3" variant="text">
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          label="Categories"
          variant="outlined"
          hide-details
          density="compact"
          :items="categories"
          item-title="name"
          item-value="id"
          v-model="filter.category_id"
          @update:modelValue="applyFilter"
          clearable
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Search Course"
          v-model="filter.name"
          variant="outlined"
          hide-details
          density="compact"
          @input="applyFilter"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  import { mapActions, mapState } from 'pinia'
  import { useCategoryStore } from '../../stores/category'
  export default {
    name: 'CourseFilter',
    data() {
      return {
        filter: {
          category_id: null,
          name: ''
        }
      }
    },
    created() {
      this.getCategories()
    },
    computed: {
      ...mapState(useCategoryStore, ['categories'])
    },
    methods: {
      ...mapActions(useCategoryStore, ['getCategories']),
      applyFilter() {
        this.$emit('filter-changed', this.filter)
      }
    }
  }
</script>
