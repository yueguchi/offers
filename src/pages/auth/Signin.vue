<template>
  <v-layout
    align-center
    justify-center>
    <v-flex
      xs12
      sm8
      md4>
      <v-card
        v-if="!isLogin"
        class="elevation-12">
        <v-toolbar
          dark
          color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="userInfo.username"
              prepend-icon="person"
              name="login"
              label="Login"
              type="text" />
            <v-text-field
              v-model="userInfo.password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="signIn">SignIn</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-if="isLogin">
        <v-container
          fluid
          grid-list-lg>
          <v-toolbar
            dark
            color="accent">
            <v-toolbar-title>Menu</v-toolbar-title>
          </v-toolbar>
          <v-layout
            row
            wrap>
            <v-flex xs12>
              <v-card
                color="blue-grey darken-2"
                class="white--text">
                <v-card-title primary-title>
                  <div @click="moveUserListPage">
                    <div class="headline"> >> Search Users</div>
                    <span><small>Move User List Page</small></span>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card
                color="blue-grey lighten-5"
                class="white--text">
                <v-card-actions>
                  <v-btn
                    color="secondary"
                    @click="signOut">
                    SignOut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <br>
      <div
        v-if="!isLogin">
        <router-link :to="{ name: 'Signup'}">SignUp</router-link>
      </div>
    </v-flex>
  </v-layout>
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
    moveUserListPage() {
      this.$router.push({ name: 'UserList' })
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
</style>
