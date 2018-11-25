<template>
  <div class="page">
    <div class="login-form">
      <p>{{ isLogin ? 'ログイン中' : 'ログインしてください' }}</p>
      <p>{{ message_text }} </p>
      <ul
        v-if="!isLogin"
        class="login-form">
        <li>
          <label>ユーザー名</label>
          <input
            v-model="userInfo.username"
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
        v-if="!isLogin"
        class="btn btn-primary"
        @click="signIn">ログイン</button>
      <button
        v-if="isLogin"
        class="btn btn-primary"
        @click="signOut">ログアウト</button>
      <br>
      <div
        v-if="isLogin">
        <router-link :to="{ name: 'UserList'}">ユーザー一覧</router-link>
      </div>
      <br>
      <div
        v-if="!isLogin">
        <router-link :to="{ name: 'Signup'}">新規登録</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Amplify, { Auth } from 'aws-amplify'
const awsExports = require('@/aws-exports').default

Amplify.configure(awsExports)
export default {
  data() {
    return {
      isLogin: false,
      userInfo: {
        username: '',
        password: ''
      },
      message_text: '',
      url: ''
    }
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      Auth.currentSession()
        .then(() => {
          this.isLogin = true
        })
        .catch(err => {
          console.error(err)
          this.isLogin = false
        })
    },
    signIn() {
      Auth.signIn(this.userInfo.username, this.userInfo.password)
        .then(() => {
          this.message_text = 'ログインしました'
          this.isLogin = true
        })
        .catch(err => {
          console.error(err)
          this.message_text = 'ログインできませんでした'
          this.isLogin = false
        })
      this.checkLogin()
    },
    async signOut() {
      await Auth.signOut()
        .then(() => {
          this.message_text = 'ログアウトしました'
          this.isLogin = false
        })
        .catch(err => {
          console.error(err)
          this.message_text = 'ログアウトできませんでした'
        })
      this.checkLogin()
    }
  }
}
</script>
<style scoped>
.login-form {
  list-style: none;
}
</style>
