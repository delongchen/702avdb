import { AvDesc } from "@/types/AvDesc";
import { reactive, UnwrapRef, provide, inject } from 'vue'

type SortMethod = (a: AvDesc, b: AvDesc) => number

interface AppStore {
  sortMethod: SortMethod
}

const StoreSymbol = Symbol('AppStore')

const timeSort: SortMethod = (a, b) => b.createTime - a.createTime
const abcSort: SortMethod = (a, b) => {
  const x1 = a.id.toUpperCase();
  const x2 = b.id.toUpperCase();
  if (x1 < x2) return -1
  if (x1 > x2) return 1
  return 0
}

const appStore: UnwrapRef<AppStore> = reactive({
  sortMethod: timeSort
})

function provideAppStore(): void {
  provide<AppStore>(StoreSymbol, appStore)
}

function injectAppStore(): AppStore {
  const store = inject<AppStore>(StoreSymbol)
  if (store) return store
  throw new Error('')
}

export {
  provideAppStore,
  injectAppStore,
  timeSort,
  abcSort
}
