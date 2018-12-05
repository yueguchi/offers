<template>
  <div class="apigateway-test">
    <div class="contents">
      <h2 class="users">ユーザー一覧</h2>
      <ul>
        <li
          v-for="(user, index) in response.users"
          :key="index">
          {{ user.email }}
        </li>
      </ul>
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
      response: {
        users: 'empty',
        total: 0,
        count: 0
      },
      form: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {},
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const { results, count, total } = await api.getUsers(this.form)
      this.response.users = results
      this.response.count = count
      this.response.total = total
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
