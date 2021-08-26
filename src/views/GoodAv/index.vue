<template>
  <a-dropdown :trigger="['click']">
    <a @click.prevent>
      排序
      <down-circle-filled/>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="time">
          <a @click="toShowAvs.sort(timeSort)">时间</a>
        </a-menu-item>
        <a-menu-item key="abc">
          <a @click="toShowAvs.sort(abcSort)">字母序</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <a-button style="margin-left: 10px" @click="fresh">刷新</a-button>
  <a-input placeholder="查找AV" @change="handleChange"/>
  <a-divider/>
  <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="toShowAvs"
  >
    <template #renderItem="{item}">
      <a-list-item :key="`gav-${item.hash}`">
        <a-card style="width: 300px">
          <template #cover>
            <a-image :src="getCoverUrl(item.hash)"></a-image>
          </template>

          <template #actions>
            <a :href="getAvUrl(item.video)" key="play">
              <play-circle-filled/>
            </a>
            <a key="star">
              <star-filled/>
            </a>
            <a @click="del(item)" key="del">
              <rest-filled/>
            </a>
          </template>

          <a-card-meta>
            <template #title>{{ item.id }}</template>
            <template #description>
              <p>{{ fmtTime(item.createTime) }} {{ fmtSize(item.size) }}</p>
            </template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {getGoodAvs, getAvUrl, getCoverUrl} from "@/api";
import {AvDesc} from "@/types/AvDesc";
import {fmtSize, fmtTime} from '@/utils/fmt'
import {useDirtyAvsStore} from "@/store/DirtyAvs";
import {timeSort, abcSort} from "@/store/AppStore";
import {RestFilled, StarFilled, PlayCircleFilled, DownCircleFilled} from '@ant-design/icons-vue'
import {Trie} from "@/types/Trie";
import {initData} from "@/views/GoodAv/dataUtils";

export default defineComponent({
  name: "GoodAv",
  components: {
    RestFilled,
    StarFilled,
    PlayCircleFilled,
    DownCircleFilled
  },
  setup() {
    const toShowAvs = ref<AvDesc[]>([])
    const {del} = useDirtyAvsStore()
    const trie = new Trie<AvDesc>()
    const trieStack: Array<Trie<AvDesc> | null> = [trie]

    function handleChange(ev: InputEvent) {
      const char = ev.data

      if (char) {
        const lastTrie: Trie<AvDesc> | null = trieStack[trieStack.length - 1]
        const upperChar = char.toUpperCase()
        trieStack.push(lastTrie?.search(upperChar) ?? null)
      } else {
        trieStack.pop()
      }

      const lastTrie: Trie<AvDesc> | null = trieStack[trieStack.length - 1]

      toShowAvs.value = lastTrie?.data ?? []
    }

    const fresh = () => getGoodAvs().then(res => {
      initData(res, trie)
      toShowAvs.value = res
    })

    fresh()

    return {
      fmtTime,
      fmtSize,
      del,
      getAvUrl,
      getCoverUrl,
      timeSort,
      abcSort,
      toShowAvs,
      fresh,
      handleChange,
    }
  }
})
</script>

<style scoped>

</style>
