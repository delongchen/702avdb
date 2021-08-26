import { inject, provide, ref, Ref } from 'vue'
import type { DirtyAvDesc } from '@/types/AvDesc'
import { getDirtyAvs, delAv } from '@/api'
import { Modal } from 'ant-design-vue'

interface DirtyAvsStore {
  davs: Ref<DirtyAvDesc[]>,
  modalVisible: Ref<boolean>,
  nowAv: Ref<DirtyAvDesc>,
  updateDavs: () => Promise<void>,
  setNowAv: (av: DirtyAvDesc) => void,
  del: (av: DirtyAvDesc) => void
}

const dirtyAvsSymbol = Symbol("DirtyAvs")
const davs = ref<DirtyAvDesc[]>([])
const modalVisible = ref(false)
const nowAv = ref<DirtyAvDesc>({
  video: '',
  createTime: 0,
  hash: '',
  isDirty: false,
  size: 0
})

const dirtyAvsStore: DirtyAvsStore = {
  davs,
  modalVisible,
  nowAv,
  updateDavs() {
    return getDirtyAvs().then(value => {
      davs.value = value.sort((a, b) => b.createTime - a.createTime)
    })
  },
  setNowAv(av: DirtyAvDesc) {
    nowAv.value = av
  },
  del(av) {
    Modal.confirm({
      title: '主人，真的要删掉这部片吗?',
      content: '下片不易，仔细思考',
      onOk() {
        return delAv(JSON.stringify({ hash: av.hash })).then(() => {
          dirtyAvsStore.updateDavs()
        })
      },
      onCancel() {void 0}
    })
  }
}

function provideDirtyAvsStore(): void {
  provide<DirtyAvsStore>(dirtyAvsSymbol, dirtyAvsStore)
}

function useDirtyAvsStore(): DirtyAvsStore {
  const store = inject<DirtyAvsStore>(dirtyAvsSymbol)
  if (store) return store
  throw new Error("no store")
}

export {
  provideDirtyAvsStore,
  useDirtyAvsStore
}
