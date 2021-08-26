import { AvDesc } from "@/types/AvDesc";
import { Trie } from "@/types/Trie";
import { timeSort } from "@/store/AppStore";

function initData(avs: AvDesc[], trie: Trie<AvDesc>): void{
  avs.sort(timeSort)

  for (const av of avs) {
    const abcAndNum = av.id.split('-')
    trie.insert(abcAndNum.join(''), av)
  }
}

export {
  initData
}
