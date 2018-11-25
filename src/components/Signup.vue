<template>
  <div class="signup">
    <div class="contents">
      <ul
        v-if="!isConfirmStep"
        class="signup-form">
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
        <li>
          <button
            class="btn btn-primary"
            @click="signup">Signup</button>
        </li>
      </ul>
      <ul
        v-if="isConfirmStep"
        class="signup-form">
        <li>
          <label>email</label>
          <input
            v-model="userInfo.email"
            type="text">
        </li>
        <li>
          <label>code</label>
          <input
            v-model="userInfo.code"
            type="text">
        </li>
        <li>
          <button
            class="btn btn-primary"
            @click="confirm">Confirm</button>
        </li>
      </ul>
    </div>
    <router-link
      v-if="!isConfirmStep"
      :to="{ name: 'Signin'}"
      replace>戻る</router-link>
  </div>
</template>
<script>
import Amplify, { Auth } from 'aws-amplify'
const awsExports = require('@/aws-exports').default
// import * as api from '@/libs/api/api'

Amplify.configure(awsExports)
export default {
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
        code: ''
      },
      isConfirmStep: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async signup() {
      const { userSub } = await Auth.signUp({
        username: this.userInfo.email,
        password: this.userInfo.password
      })
      console.log(userSub)
      if (!userSub) throw new Error('signup failed.')
      // 認証された一意の識別子(UUID)
      this.userInfo.sub = userSub
      this.isConfirmStep = true
    },
    async confirm() {
      await Auth.confirmSignUp(this.userInfo.email, this.userInfo.code)
      // システムにも登録
      if (!this.sub) throw new Error('Sub is not found.')
      // api.putUser({
      //   email: this.userInfo.email,
      //   sub: this.userInfo.sub
      // })

      this.$router.replace({ name: 'Signin' })
    }
  }
}
</script>
<style scoped>
.signup-form {
  list-style: none;
}
</style>
