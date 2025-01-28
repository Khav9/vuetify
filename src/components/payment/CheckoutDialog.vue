<template>
  <v-dialog
    :model-value="dialog"
    max-width="500"
    @update:model-value="updateDialog"
    style="z-index: 200;"
  >
    <v-stepper :items="['Payment method', 'Checkout']">
      <template v-slot:item.1>
        <v-card class="mb-5" variant="text">
          <v-card-title>Payment for: {{ name }}</v-card-title>
          <v-card-title class="text-h4 font-weight-bold">
            $ {{ price }}
          </v-card-title>
          <v-radio-group row class="px-2" v-model="selectedPaymentMethod">
            <v-card class="pa-2">
              <v-radio label="Credit Card" value="credit_card">
                <template v-slot:label>
                  <v-icon color="success" class="me-3">mdi-credit-card</v-icon>
                  Credit Card
                </template>
              </v-radio>
            </v-card>
            <v-card class="pa-2 mt-3">
              <v-radio label="Direct Debit" value="direct_debit">
                <template v-slot:label>
                  <v-icon color="primary" class="me-3">mdi-bank</v-icon>
                  Direct Debit
                </template>
              </v-radio>
            </v-card>
          </v-radio-group>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card v-if="selectedPaymentMethod === 'credit_card'">
          <v-card-text>
            <v-form ref="checkoutForm" v-model="valid">
              <v-text-field
                label="Cardholder Name"
                v-model="cardholderName"
                :rules="[rules.required]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Card Number"
                v-model="cardNumber"
                :rules="[rules.required, rules.cardNumber]"
                maxlength="19"
                required
                variant="outlined"
                @input="formatCardNumber"
              ></v-text-field>
              <v-text-field
                label="Expiry Date (MM/YY)"
                v-model="expiryDate"
                :rules="[rules.required, rules.expiryDate]"
                maxlength="5"
                required
                variant="outlined"
                @input="formatExpiryDate"
              ></v-text-field>
              <v-text-field
                label="CVV"
                v-model="cvv"
                :rules="[rules.required, rules.cvv]"
                maxlength="3"
                required
                variant="outlined"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-btn
              class="bg-primary"
              block
              @click="processPayment"
              :disabled="!valid"
            >
              Pay ${{ price }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="selectedPaymentMethod === 'direct_debit'">
          <v-card title="Total Debt" variant="tonal" class="py-2">
            <template v-slot:append>
              <v-icon class="mr-1" color="primary">mdi-bank</v-icon>
            </template>
            <span class="text-h6 font-weight-bold ms-4">$ {{ debt }}</span>
          </v-card>

          <v-btn class="bg-primary mt-4" block @click="processPayment">
            Pay ${{ price }}
          </v-btn>
        </v-card>
      </template>
    </v-stepper>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      dialog: Boolean,
      courseId: Number,
      name: String,
      price: String
    },
    data() {
      return {
        valid: false,
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        selectedPaymentMethod: 'credit_card',
        cvv: '',
        debt: 0,
        rules: {
          required: value => !!value || 'Required.',
          cardNumber: value =>
            /^\d{4} \d{4} \d{4} \d{4}$/.test(value) ||
            'Card number must be 16 digits in the format XXXX XXXX XXXX XXXX.',

          expiryDate: value =>
            /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || 'Format must be MM/YY.',
          cvv: value => /^\d{3}$/.test(value) || 'CVV must be 3 digits.'
        }
      }
    },
    created() {
      const storedDebt = localStorage.getItem('totalDebt')
      this.debt = storedDebt ? parseFloat(storedDebt) : 20235
    },
    methods: {
      updateDialog(value) {
        this.$emit('update:dialog', value)
      },

      processPayment() {
        if (
          this.selectedPaymentMethod === 'credit_card' &&
          this.$refs.checkoutForm &&
          this.$refs.checkoutForm.validate()
        ) {
          this.$emit('payment-success')
          this.$root.$notif(`Payment successful`, {
            type: 'success',
            color: 'primary'
          })
          this.updateDialog(false)
          this.clearForm()
        } else {
          if (this.debt >= this.price) {
            // Process payment if balance is enough
            this.debt -= this.price // Subtract payment amount from debt
            localStorage.setItem('totalDebt', this.debt) // Update `localStorage`

            // Notify user of successful payment
            this.$root.$notif(`Payment successful`, {
              type: 'success',
              color: 'primary'
            })  
            
            this.updateDialog(false)
          } else {
            // Show error if balance is insufficient
            this.$root.$notif(`Not enough balance for this payment.`, {
              type: 'error',
              color: 'red'
            })
          }
        }
      },
      clearForm() {
        this.cardholderName = ''
        this.cardNumber = ''
        this.expiryDate = ''
        this.cvv = ''
      },
      formatCardNumber() {
        // Remove any non-numeric characters
        this.cardNumber = this.cardNumber.replace(/\D/g, '')

        // Automatically insert spaces every four digits
        if (this.cardNumber.length > 4) {
          this.cardNumber = this.cardNumber.match(/.{1,4}/g).join(' ')
        }

        // Limit to 19 characters (16 digits + 3 spaces)
        this.cardNumber = this.cardNumber.slice(0, 19)
      },
      formatExpiryDate() {
        // Remove any non-numeric characters
        this.expiryDate = this.expiryDate.replace(/\D/g, '')

        // Automatically insert a slash after the month
        if (this.expiryDate.length > 2) {
          this.expiryDate =
            this.expiryDate.slice(0, 2) + '/' + this.expiryDate.slice(2, 4)
        }

        // Limit to 5 characters (MM/YY)
        this.expiryDate = this.expiryDate.slice(0, 5)
      }
    }
  }
</script>

<style scoped></style>
