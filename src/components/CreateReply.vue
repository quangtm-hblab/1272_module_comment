<template lang="">
  <div>
    <div v-show="!isCommenting" class="cmt-pl-4 cmt-py-2 cmt-bg-white cmt-rounded-b-lg cmt-cursor-pointer cmt-text-txtGray cmt-flex cmt-items-center" @click="onCreateComment">
      <div>
        <flux-icon-button
        :disabled="false"
        class="reply-button-icon"
        icon-id="return"
        icon-size="16"
        width="16"
        circled="false"
        filled="false"
      />
      </div> 
      <div>返信</div>
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
          @click="createReply"
        />
      </div>
    </div> 
  </div>
</template>
<script>
import Editor from './CreateComment/Editor'
export default {
  emits:['add-reply'],
  data(){
    return {
      inputText: ' ',
      inputRaw: ' ',
      isCommenting: false,
    }
  },
  components:{
    Editor
  },
  methods:{
    onCreateComment(){
      this.isCommenting = true      
    },
    handleInputText(inputValue){
      this.inputText = inputValue
    },
    handleInputRaw(inputRaw){
      this.inputRaw = inputRaw
    },
    handleLoseFocus(){
      this.isCommenting = false
    },
    createReply(){
      this.$emit('add-reply', this.inputRaw)
      this.isCommenting = false
    }
  }
}
</script>
<style lang="">
  
</style>