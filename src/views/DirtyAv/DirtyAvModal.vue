<template>
  <a-modal
    v-model:visible="modalVisible"
    :title="nowAv.video"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Id">
        <a-input v-model:value="formState.id"/>
      </a-form-item>
      <a-form-item label="Cover">
        <a-input-search v-model:value="formState.cover" @search="checkCover">
          <template #enterButton>
            <a-button>check</a-button>
          </template>
        </a-input-search>
      </a-form-item>
      <a-form-item label="Performers">
        <a-input v-model:value="formState.performers" />
      </a-form-item>
    </a-form>

    <img width="270" ref="imgRef"/>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { useDirtyAvsStore } from "@/store/DirtyAvs";
import { uploadDirtyAv } from "@/api";

interface FormState {
  cover: string,
  performers: string,
  id: string
}

export default defineComponent({
  name: "DirtyAvModal",
  setup() {
    const { nowAv, modalVisible, updateDavs } = useDirtyAvsStore()
    const confirmLoading = ref(false)
    const imgRef = ref()
    const formState = reactive<FormState>({
      cover: '',
      performers: '',
      id: ''
    })

    const handleOk = () => {
      confirmLoading.value = true
      const toUpload = JSON.stringify({
        ...toRaw(formState),
        hash: nowAv.value.hash
      })
      uploadDirtyAv(toUpload).then(value => {
        console.log(value)
        updateDavs()
      }).finally(() => {
        confirmLoading.value = false
        modalVisible.value = false
      })
    }

    function checkCover() {
      imgRef.value.src = formState.cover
    }

    return {
      modalVisible,
      nowAv,
      formState,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      confirmLoading,
      handleOk,
      checkCover,
      imgRef
    }
  }
})
</script>

<style scoped>

</style>
