type TrieChildren<T> = { [key: string]: Trie<T>}

class Trie<T> {
  private readonly children: TrieChildren<T>
  data: T[]

  constructor() {
    this.children = Object.create(null)
    this.data = []
  }

  public insert(word: string, data: T): void {
    this.data.push(data)
    let nowChildren = this.children

    for (const ch of word) {
      const exist = nowChildren[ch]
      if (exist) {
        exist.data.push(data)
        nowChildren = exist.children
      } else {
        const newNode = new Trie<T>()
        newNode.data.push(data)

        nowChildren[ch] = newNode
        nowChildren = newNode.children
      }
    }
  }

  public search(word: string): Trie<T> | null {
    let nowChildren = this.children
    let lastNode: Trie<T> | null = null

    for (const ch of word) {
      const exist = nowChildren[ch]
      if (exist) {
        nowChildren = exist.children
        lastNode = exist
      } else {
        return lastNode
      }
    }

    return lastNode
  }
}

export {
  Trie
}
