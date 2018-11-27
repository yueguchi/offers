<template>
  <ul
    class="signup-form">
    <li>
      <label>email</label>
      <input
        v-model="form.email"
        type="text">
    </li>
    <li>
      <label>パスワード</label>
      <input
        v-model="form.password"
        type="password">
    </li>
    <li>
      <button
        class="btn btn-primary"
        @click="signup">Signup</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: undefined,
        password: undefined
      }
    }
  },
  methods: {
    signup() {
      this.$emit('clickSignup', this.form)
    }
  }
}
</script>
<style scoped>
.signup-form {
  list-style: none;
}
</style>
