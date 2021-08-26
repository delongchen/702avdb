<template>
  <a-menu theme="dark" mode="inline" v-model:selected-keys="cur">
    <a-menu-item key="good">
      <router-link to="/ga">good</router-link>
      <template #icon>
        <smile-outlined :spin="whoSpin"/>
      </template>
    </a-menu-item>
    <a-menu-item key="dirty">
      <template #icon>
        <woman-outlined :spin="whoSpin"/>
      </template>
      <router-link to="/da">dirty</router-link>
    </a-menu-item>
    <a-menu-item key="app" disabled>
      <template #icon>
        <appstore-outlined :spin="whoSpin"/>
      </template>
      702av
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import { SmileOutlined, WomanOutlined, AppstoreOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: "AvSideMenu",
  components: {
    SmileOutlined,
    WomanOutlined,
    AppstoreOutlined
  },
  setup() {
    const cur = ref<string[]>(['good'])
    const whoSpin = computed(() => {
      return cur.value[0] === 'good'
    })

    return {
      cur,
      whoSpin
    }
  }
})

</script>

<style scoped>

</style>
