<template lang="">
  <div class="cmt-bg-bgGray cmt-py-6 cmt-px-4 cmt-border-t-[1px] cmt-border-gray-300 cmt-w-full">
    <div v-show="!isCommenting">
      <button @click="onCreateComment" class="cmt-border cmt-border-black cmt-bg-bgGray cmt-py-1 cmt-px-4">新規コメント</button>
    </div>

    <div v-show="isCommenting">
      <Editor @lose-focus="handleLoseFocus" @input-text="handleInputText" @input-raw="handleInputRaw"/>
      <div class="cmt-flex cmt-justify-end cmt-items-center cmt-px-2 cmt-pt-2">
        <!-- -1 because '\n' value in inputText when clear editor -->
        <div class="cmt-mr-4">{{ (inputText.length-1) +'/500'}}</div>
        <flux-icon-button
          :disabled="false"
          :tooltip="sendButton"
          icon-size="24"
          width="24"
          height="24"
          icon-id="paperairplane"
          @click="createComment"
        />
      </div>
    </div> 
  </div>
</template>
<script lang="">
import Editor from './CreateComment/Editor'
export default {
  data(){
    return {
      isCommenting: false,
      inputText: ' ',
      inputRaw: '',
    }
  },
  components: {
    Editor
  },
  methods: {
    onCreateComment(){
      this.isCommenting = true      
    },
    createComment(){
      console.log('created')
      this.$store.dispatch('addComment', this.inputRaw)
    },
    handleLoseFocus(data){
      this.isCommenting = false
      console.log(data);
    }, 
    handleInputText(text){
      this.inputText = text
    },
    handleInputRaw(textHtml){
      this.inputRaw = textHtml
    }
  },
}
</script>
<style lang="scss">
</style>
