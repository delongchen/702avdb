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
  <a-input placeholder="查找AV" @change="handleChange" v-model:value="searchKey"/>

  <a-collapse v-model:active-key="activeKeys" :bordered="false" expand-icon-position="right">
    <a-collapse-panel key="info" header="更多信息">
      <p>全部用量：{{ fmtSize(avsInfo.allSize) }}</p>
      <div>
        <a-tag key="all" @click="clickTag('')">
          <template #icon><rocket-filled/></template>
          全部：{{ avsInfo.avNum }}
        </a-tag>
        <a-tag
            v-for="(v, k) in avsInfo.tags"
            :key="`avtag-${k}`"
            :color="getRandomColor()"
            @click="clickTag(v[0])"
        >{{v[0]}} ({{v[1]}})</a-tag>
      </div>
    </a-collapse-panel>
  </a-collapse>

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
            <a :href="getAvUrl(item.video)" key="play" @click="() => console.log(1)">
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
import {defineComponent, ref, reactive} from 'vue'
import {getGoodAvs, getAvUrl, getCoverUrl} from "@/api";
import {AvDesc} from "@/types/AvDesc";
import {fmtSize, fmtTime} from '@/utils/fmt'
import {useDirtyAvsStore} from "@/store/DirtyAvs";
import {timeSort, abcSort} from "@/store/AppStore";
import {RestFilled, StarFilled, PlayCircleFilled, DownCircleFilled, RocketFilled} from '@ant-design/icons-vue'
import {Trie} from "@/types/Trie";
import {initData} from "@/views/GoodAv/dataUtils";

export default defineComponent({
  name: "GoodAv",
  components: {
    RestFilled,
    StarFilled,
    PlayCircleFilled,
    DownCircleFilled,
    RocketFilled
  },
  setup() {
    const toShowAvs = ref<AvDesc[]>([])
    const {del} = useDirtyAvsStore()
    const trie = new Trie<AvDesc>()
    const trieStack: Array<Trie<AvDesc> | null> = [trie]
    const activeKeys = ref<string[]>([])
    const searchKey = ref<string>('')
    const avsInfo = reactive({
      allSize: 0,
      avNum: 0,
      tags: new Map<string, number>()
    })

    function getRandomColor(): string {
      const colors: string[] = [
          'pink', 'red', 'orange', 'green',
          'cyan', 'blue', 'purple'
      ]

      return colors[(Math.random() * colors.length) >> 0]
    }

    function updateToShowAvs() {
      const lastTrie: Trie<AvDesc> | null = trieStack[trieStack.length - 1]
      toShowAvs.value = lastTrie?.data ?? []
    }

    function searchOneChar(char: string | null) {
      if (char) {
        const lastTrie: Trie<AvDesc> | null = trieStack[trieStack.length - 1]
        const upperChar = char.toUpperCase()
        trieStack.push(lastTrie?.search(upperChar) ?? null)
      } else {
        trieStack.pop()
      }
    }

    function handleChange(ev: InputEvent) {
      searchOneChar(ev.data)
      updateToShowAvs()
    }

    function clickTag(key: string) {
      trieStack.length = 1
      searchKey.value = key
      for (const char of key) {
        searchOneChar(char)
      }
      updateToShowAvs()
    }

    const fresh = () => getGoodAvs().then(res => {
      const avData = initData(res, trie)
      avsInfo.allSize = avData.size
      avsInfo.tags = avData.tags
      avsInfo.avNum = avData.nums

      searchKey.value = ''
      trieStack.length = 1
      updateToShowAvs()
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
      activeKeys,
      avsInfo,
      getRandomColor,
      searchKey,
      clickTag
    }
  }
})
</script>

<style scoped>

</style>
