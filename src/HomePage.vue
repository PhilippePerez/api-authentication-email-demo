<template>
  <MainLayout title="Authentication Api Demo">
    <div class="showcase-wrapper">
      <div class="showcase-panel">
        <h2 class="title">Email-Based Authentication</h2>
        <p class="description">
          This is a demonstration application showing how an <strong>email-based authentication API</strong> works.
          You can register your email, receive a verification code, and securely login without a password.
        </p>
        <div class="steps">
          <div class="step">
            <div class="circle">1</div>
            <span>Register your email</span>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="circle">2</div>
            <span>Receive verification code</span>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="circle">3</div>
            <span>Access private area</span>
          </div>
        </div>
        <Button text="Proceed to Login" @click="goToLogin" class="login-button"/>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import {MainLayout, Button} from "vue-component-toolkit/dist/vue-component-toolkit.js";
import router from "./router.js";
import {useRoute} from "vue-router";

const route = useRoute();

const goToLogin = () => {
  router.push({name: 'private'});
};
</script>

<style scoped>
.showcase-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 1rem;
  flex-grow: 1;
}

.showcase-panel {
  max-width: 600px;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f5f5f5;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #222;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #444;
}

.steps {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4f46e5;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.arrow {
  font-size: 1.5rem;
  margin: 0 0.5rem;
}

.login-button {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 8px;
}

.login-button:hover {
  background-color: #4338ca;
}
</style>
