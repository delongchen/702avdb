import { AvDesc } from "@/types/AvDesc";
import { Trie } from "@/types/Trie";
import { timeSort } from "@/store/AppStore";

interface DataDetails {
  avs: AvDesc[],
  size: number,
  nums: number,
  tags: Map<string, number>
}

function initData(avs: AvDesc[], trie: Trie<AvDesc>): DataDetails {
  avs.sort(timeSort)
  let allSize = 0
  const tagMap = new Map<string, number>()

  for (const av of avs) {
    allSize += av.size

    const abcAndNum = av.id.split('-')
    const avId = abcAndNum[0]
    tagMap.set(avId, (tagMap.get(avId) ?? 0) + 1)
    trie.insert(abcAndNum.join(''), av)
  }

  const result: DataDetails = {
    avs,
    size: allSize,
    nums: avs.length,
    tags: tagMap
  }

  return result
}

export {
  initData
}
