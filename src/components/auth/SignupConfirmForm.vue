<template>
  <ul
    class="signup-confirm-form">
    <li>
      <label>email</label>
      <input
        v-model="form.email"
        type="text">
    </li>
    <li>
      <label>code</label>
      <input
        v-model="form.sub"
        type="text">
    </li>
    <li>
      <button
        class="btn btn-primary"
        @click="confirm">Confirm</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    email: {
      default: '',
      required: true,
      type: String
    }
  },
  data() {
    return {
      form: {
        email: this.email,
        sub: undefined
      }
    }
  },
  methods: {
    confirm() {
      this.$emit('clickSignupConfirm', this.form)
    }
  }
}
</script>
<style scoped>
.signup-confirm-form {
  list-style: none;
}
</style>
