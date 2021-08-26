<template>
  <div>
    <a-button @click="switchSortMethod">切换排序</a-button>
  </div>

  <a-list
      item-layout="horizontal"
      :pagination="pagination"
      :data-source="davs"
  >
    <template #renderItem="{item}">
      <a-list-item :key="item.hash">
        <template #actions>
          <a @click="uploadAv(item)">upload</a>
          <a @click="del(item)">del</a>
        </template>
        <a-list-item-meta>
          <template #title>
            <a :href="getAvUrl(item.video)">{{ item.video }}</a>
          </template>
          <template #description>
            <p>{{ fmtTime(item.createTime) }} - {{ fmtSize(item.size) }}</p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>

  <dirty-av-modal/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import type {DirtyAvDesc} from '@/types/AvDesc'
import {useDirtyAvsStore} from '@/store/DirtyAvs'
import { fmtTime, fmtSize } from '@/utils/fmt'
import DirtyAvModal from "@/views/DirtyAv/DirtyAvModal.vue";
import { getAvUrl } from "@/api";

const pagination = {pageSize: 7}

export default defineComponent({
  name: "DirtyAv",
  components: { DirtyAvModal },
  setup() {
    const {
      davs,
      updateDavs,
      setNowAv,
      modalVisible,
      del
    } = useDirtyAvsStore()

    let isAbcSort = false

    const uploadAv = (av: DirtyAvDesc) => {
      setNowAv(av)
      modalVisible.value = true
    }

    function switchSortMethod() {
      if (isAbcSort) {
        davs.value.sort((a, b) => b.createTime - a.createTime)
        isAbcSort = false
      } else {
        davs.value.sort((a, b) => {
          const x1 = a.video.toUpperCase();
          const x2 = b.video.toUpperCase();
          if (x1 < x2) return -1
          if (x1 > x2) return 1
          return 0
        })
        isAbcSort = true
      }
    }

    updateDavs()

    return {
      fmtTime,
      pagination,
      davs,
      uploadAv,
      fmtSize,
      del,
      getAvUrl,
      switchSortMethod
    }
  }
})
</script>

<style scoped>

</style>
