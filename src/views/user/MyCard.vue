<template>
  <v-container class="py-5" max-width="400px">
    <v-card class="pa-4">
      <!-- Credit Score Header -->
      <v-card-title>Credit Report</v-card-title>

      <!-- Report Section -->
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card title="On-Time Payment" variant="tonal">
              <template v-slot:append>
                <v-icon class="mr-1" color="primary">mdi-check-circle</v-icon>
              </template>
              <span class="text-h6 font-weight-bold ms-4">100%</span>
            </v-card>
          </v-col>
          <v-col>
            <v-card title="Est. Monthly Payments" variant="tonal">
              <template v-slot:append>
                <v-icon class="mr-1" color="primary">mdi-currency-usd</v-icon>
              </template>
              <span class="text-h6 font-weight-bold ms-4">$1,346</span>
            </v-card>
          </v-col>
          <v-col>
            <v-card title="Credit Used" variant="tonal">
              <template v-slot:append>
                <v-icon class="mr-1" color="primary">mdi-chart-pie</v-icon>
              </template>
              <span class="text-h6 font-weight-bold ms-4">32%</span>
            </v-card>
          </v-col>
          <v-col>
            <v-card title="Total Debt" variant="tonal">
              <template v-slot:append>
                <v-icon class="mr-1" color="primary">mdi-bank</v-icon>
              </template>

              <span class="text-h6 font-weight-bold ms-4">
                $ {{ getDebtTotal }}
              </span>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        score: 750 // Credit score value
      }
    },
    computed: {
      getDebtTotal() {
        return localStorage.getItem('totalDebt')
      }
    }
  }
</script>

<style scoped>
  .text-red {
    color: #f44336;
  }

  .text-green {
    color: #4caf50;
  }

  .rounded-pill {
    border-radius: 9999px;
  }
</style>
