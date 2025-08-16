<template>
  <MainLayout title="Demo App">
    <Card style="align-items: center;justify-content: center;">
      <Form class=" max-w-sm w-full"
            border
            :entries="[
                {path:'email',label:'E-Mail',props:{placeholder:'',autocomplete:'off'}},
                ]"
            v-model="form"
            :validationError="validation"
      >
        <template v-slot:footer>
          <VerticalLayout padding-off align-center align-x="center">
            <ErrorMessage :validationError="error"/>
            <Button text="Signup" @click="signupHandler"/>
            <Link text="I have an account" href="/login"/>
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
import {authenticationManager} from "./authentication.js";
import router from "./router.js";
import Link from "@/Link.vue";

const form = ref({email: ''});
const validation = ref(null);
const error = ref(null);

const signupHandler = async () => {
  const status = await authenticationManager.signup(form.value);

  if (status.ok) {
    error.value = null;
    validation.value = null;
    const status = await authenticationManager.login(form.value);
    if (status.ok) {
      await router.push({name: 'verify-pin', params: {email: form.value.email}});
    }
  } else if (status.failure) {
    window.alert(status.failure);
  } else {
    validation.value = status.validation;
    error.value = status.error;
  }
};

</script>

<style scoped>

</style>
