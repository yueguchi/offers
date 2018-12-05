<template>
  <div class="apigateway-test">
    <div class="contents">
      <p class="message">{{ message }}</p>
    </div>
    <router-link
      :to="{ name: 'Signin'}"
      replace>戻る</router-link>
  </div>
</template>
<script>
import * as api from '@/libs/api/api'
export default {
  data() {
    return {
      message: 'empty'
    }
  },
  created() {},
  mounted() {
    this.test()
  },
  methods: {
    async test() {
      const users = await api.getUsers()
      console.log(users)
      this.message = users
    }
  }
}
</script>
<style scoped>
.message {
  font-weight: bold;
  font-size: 24px;
}
</style>
