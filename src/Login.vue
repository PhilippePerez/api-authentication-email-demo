<template>
  <MainLayout title="Demo App">
    <Card style="align-items: center;justify-content: center;">
      <Form class=" max-w-sm w-full"
            border
            :entries="[
                {path:'email',label:'E-Mail',props:{placeholder:'',autocomplete:'off'}}
                ]"
            v-model="form"
            :validationError="validation"
      >
        <template v-slot:footer>
          <VerticalLayout padding-off align-center align-x="center">
            <ErrorMessage :validationError="error"/>
            <Button text="Login" @click="loginHandler"/>
            <Link text="Create an account" href="/signup"/>
          </VerticalLayout>
        </template>
      </Form>
    </Card>
  </MainLayout>
</template>

<script setup>
import {
  MainLayout,
  VerticalLayout,
  ErrorMessage,
  Card,
  Button,
  Form,
} from "vue-component-toolkit/dist/vue-component-toolkit.js";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {authenticationManager} from "./authentication.js";
import router from "./router.js";
import Link from "./Link.vue";

const route = useRoute();
const form = ref({username: '', password: ''});
const validation = ref(null);
const error = ref(null);

const loginHandler = async () => {
  const status = await authenticationManager.login(form.value);

  if (status.ok) {
    error.value = null;
    validation.value = null;
    await router.push({name: 'verify-pin', query: {email: form.value.email, redirect: route.query.redirect}});
  } else if (status.failure) {
    error.value = status.failure;
  } else {
    validation.value = status.validation;
    error.value = status.error;
  }
};

</script>

<style scoped>

</style>
