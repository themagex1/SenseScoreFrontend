<template>
  <q-page class="flex flex-start">
    <div style="margin-top: 5rem; margin-left: 2rem">
      To be able to use features of our app please..
      <div class="q-pa-md q-gutter-y-md column items-start">
        <q-btn-group push>
          <q-btn
            color="primary"
            text-color="white"
            push
            label="Sign in"
            icon="login"
          />
          <q-btn
            color="primary"
            text-color="white"
            push
            label="Sign up"
            icon="how_to_reg"
          />
        </q-btn-group>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: "LoginRegister",
};
</script>
