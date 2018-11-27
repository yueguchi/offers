<template>
  <div class="signup">
    <div class="contents">
      <signup-form
        v-if="!isConfirmStep"
        @clickSignup="handleSignup"
      />
      <signup-confirm-form
        v-if="isConfirmStep"
        :email="userInfo.email"
        @clickSignupConfirm="handleSignupConfirm"
      />
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
import * as api from '@/libs/api/api'
import SignupForm from '@/components/auth/SignupForm'
import SignupConfirmForm from '@/components/auth/SignupConfirmForm'

Amplify.configure(awsExports)
export default {
  components: {
    SignupForm,
    SignupConfirmForm
  },
  data() {
    return {
      userInfo: {
        email: undefined,
        password: undefined,
        sub: undefined
      },
      isConfirmStep: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async handleSignup(form) {
      this.userInfo.email = form.email
      this.userInfo.password = form.password
      // userSub=認証された一意の識別子(UUID)
      const { userSub } = await Auth.signUp({
        username: form.email,
        password: form.password
      })
      if (!userSub) throw new Error('signup failed.')
      this.userInfo.sub = userSub
      this.isConfirmStep = true
    },
    async handleSignupConfirm(form) {
      alert(form.sub)
      try {
        await Auth.confirmSignUp(form.email, form.sub)
        // headerにAuthorizationをセットしたいので、ここでsignInさせとく
        await Auth.signIn(form.email, this.userInfo.password)
        // システムにも登録
        if (!form.sub) throw new Error('Sub is not found.')
        api.putUser(form.email, form.sub)
        this.$router.replace({ name: 'Signin' })
      } catch (err) {
        console.error(err)
        alert('システムエラー')
      }
    }
  }
}
</script>
<style scoped>
</style>
