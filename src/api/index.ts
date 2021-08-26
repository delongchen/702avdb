import type { AvDesc, DirtyAvDesc } from "@/types/AvDesc";

const baseUrl = 'http://pi3.manjaro'
const port = 8889
const serverUrl = `${baseUrl}:${port}/`

const getGoodAvs = (): Promise<AvDesc[]> => fetch(serverUrl + 'gavs')
  .then(it => it.json() as Promise<AvDesc[]>)
  .then(avs => {
    for (const av of avs) {
      const { performers } = av
      if (typeof performers === 'string') {
        av.performers = performers.split(',')
      }
    }
    return avs
  })
  .catch(reason => {
    console.log(reason)
    return []
  })

const getDirtyAvs = (): Promise<DirtyAvDesc[]> => fetch(serverUrl + 'davs')
  .then(it => it.json() as Promise<DirtyAvDesc[]>)
  .catch(reason => {
    console.log(reason)
    return []
  })

const uploadDirtyAv = (body: string): Promise<string> =>
  fetch(serverUrl + 'gavs', {
    method: "POST",
    body
  }).then(it => it.json())

const delAv = (body: string): Promise<string> =>
  fetch(serverUrl + 'del', {
    method: "post",
    body
  }).then(it => it.json())

const getAvUrl = (name: string): string => `${baseUrl}/av/videos/${name}`
const getCoverUrl = (hash: string): string => `${baseUrl}/av/covers/${hash}.jpg`

export {
  getGoodAvs,
  getDirtyAvs,
  uploadDirtyAv,
  delAv,
  getAvUrl,
  getCoverUrl
}
