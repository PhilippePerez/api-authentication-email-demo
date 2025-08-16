<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200">
      <div class="text-center space-y-2">
        <h2 class="text-lg font-semibold text-gray-900">
          Pin Verification Required
        </h2>
        <p class="text-sm text-gray-600">
          A <span class="font-medium">4-digit PIN code</span> has been sent to your email address to verify it.
        </p>
      </div>

      <form @submit.prevent="submitPin" class="space-y-6">
        <label class="block text-sm font-medium text-gray-700 text-center">
          Enter your 4-digit PIN
        </label>

        <div class="flex justify-center gap-4">
          <input
              v-for="(digit, index) in 4"
              :key="index"
              ref="pinInputs"
              type="text"
              maxlength="1"
              pattern="[0-9]*"
              inputmode="numeric"
              class="w-14 h-14 border border-gray-300 rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              v-model="pins[index]"
              @input="handleInput(index)"
              @keydown.backspace.prevent="handleBackspace(index, $event)"
              required
          />
        </div>

        <div v-if="errorMessage" class="text-center text-red-600 text-sm font-medium">
          {{ errorMessage }}
        </div>

        <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Verify
        </button>

        <div class="text-center mt-4">
          <button
              type="button"
              :disabled="resendCooldown > 0"
              @click="resendCode"
              class="text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="resendCooldown > 0">
              Resend PIN in {{ resendCooldown }}s
            </span>
            <span v-else>
              Resend PIN
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, nextTick} from 'vue'
import {useRoute} from 'vue-router'
import {authenticationManager} from './authentication.js'
import router from "@/router.js";

const route = useRoute()
const email = route.query.email
const redirect = route.query.redirect

const pins = ref(['', '', '', ''])
const pinInputs = ref([])
const errorMessage = ref(null)

const resendCooldown = ref(0)
let cooldownTimer = null

function handleInput(index) {
  if (pins.value[index] && index < 3) {
    nextTick(() => pinInputs.value[index + 1].focus())
  }
}

function handleBackspace(index) {
  if (!pins.value[index] && index > 0) {
    pins.value[index - 1] = ''
    nextTick(() => pinInputs.value[index - 1].focus())
  } else {
    pins.value[index] = ''
  }
}

function submitPin() {
  const code = pins.value.join('')
  if (code.length === 4) {
    submitPinCode(code)
  } else {
    errorMessage.value = null
    alert('Please enter a valid 4-digit PIN code.')
  }
}

async function submitPinCode(code) {
  const status = await authenticationManager.login({email, pincode: code})
  if (status.ok) {
    errorMessage.value = null
    if (redirect) {
      await router.push(redirect);
    } else {
      await router.push({name: 'home'})
    }
  } else {
    errorMessage.value = status.error
  }
}

async function resendCode() {
  const status = await authenticationManager.login({email: email});
  if (status.ok) {
    startCooldown(30) // 30 seconds before next resend allowed
  } else {
    errorMessage.value = status.error
  }
}

function startCooldown(seconds) {
  resendCooldown.value = seconds
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}
</script>
