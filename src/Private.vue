<template>
  <MainLayout title="Private Area">
    <div class="logout-wrapper">
      <div class="logout-container">
        <p class="info-text">
          You are currently in your private area. Clicking the <strong>Logout</strong> button will exit your session and return you to the public homepage.
        </p>
        <Button text="Logout" @click="logoutHandler" class="logout-button"/>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import {
  Button,
  MainLayout,
} from "vue-component-toolkit/dist/vue-component-toolkit.js";
import { authenticationManager } from "./authentication.js";
import router from "./router.js";

const logoutHandler = async () => {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  if (await authenticationManager.logout()) {
    await router.push('/');
  }
};
</script>

<style scoped>
.logout-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 70vh; /* adjust to fit below the layout header */
}

.logout-container {
  max-width: 500px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fafafa;
  text-align: center;
}

.info-text {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.logout-button {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #ff5c5c;
  color: white;
  border-radius: 8px;
}

.logout-button:hover {
  background-color: #e04e4e;
}
</style>
