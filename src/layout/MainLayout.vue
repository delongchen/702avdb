<template>
  <a-layout>
    <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
    >
      <av-side-menu/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0, textAlign: 'center' }">
        <h1>702avdb</h1>
      </a-layout-header>

      <a-layout-content>
        <div :style="{ padding: '50px', background: '#fff', minHeight: '360px'}">
          <router-view/>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        702avdb ©2021 Created by DeLong
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <a-back-top/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideDirtyAvsStore } from "@/store/DirtyAvs";
import { provideAppStore } from "@/store/AppStore";
import AvSideMenu from '@/components/AvSideMenu.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AvSideMenu,
  },
  setup() {
    provideAppStore()
    provideDirtyAvsStore()
  }
})
</script>
