<template>
  <div class="signup">
    <div class="contents">
      <ul class="signup-form">
        <li>
          <label>email</label>
          <input
            v-model="userInfo.email"
            type="text">
        </li>
        <li>
          <label>パスワード</label>
          <input
            v-model="userInfo.password"
            type="password">
        </li>
      </ul>
      <button
        class="btn btn-primary"
        @click="signup">Signup</button>
    </div>
    <router-link
      :to="{ name: 'Signin'}"
      replace>戻る</router-link>
  </div>
</template>
<script>
import Amplify, { Auth } from 'aws-amplify'
const awsExports = require('@/aws-exports').default

Amplify.configure(awsExports)
export default {
  data() {
    return {
      userInfo: {
        email: '',
        password: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    signup() {
      Auth.signUp({
        username: this.userInfo.email,
        password: this.userInfo.password
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
.signup-form {
  list-style: none;
}
</style>
