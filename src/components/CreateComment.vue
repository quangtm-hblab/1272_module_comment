<template lang="">
  <div class="cmt-bg-bgGray cmt-py-6 cmt-px-4 cmt-border-t-[1px] cmt-border-gray-300 cmt-w-full">
    <div v-show="!isCommenting">
      <button @click="onCreateComment" class="cmt-border cmt-border-black cmt-bg-bgGray cmt-py-1 cmt-px-4">新規コメント</button>
    </div>
    <div v-show="isCommenting">
      <input v-model="comment" ref="createComment" type="text" placeholder="コメントを入力する" 
        class="cmt-w-full cmt-h-10 cmt-border-[2px] cmt-border-gray-300 cmt-p-2 focus:cmt-border-Mint cmt-outline-none" @blur="onLossFocus" />
      <div class="cmt-flex cmt-justify-end cmt-items-center cmt-px-2 cmt-pt-2">
        <div class="cmt-mr-4">{{ comment.length +'/500'}}</div>
        <flux-icon-button
          :disabled="false"
          :tooltip="sendButton"
          icon-size="24"
          width="24"
          height="24"
          icon-id="paperairplane"
          @click="isCommenting = false"
        />
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  data(){
    return {
      isCommenting: false,
      comment: '',
    }
  },
  methods: {
    onCreateComment(){
      this.isCommenting = true
      setTimeout(() => {
        this.$refs.createComment.focus()
      }, 50);
      
    },
    focus(){
      console.log('focus')
    },
    onLossFocus(){
      console.log('focusout')
      this.isCommenting = false
    }
  }
  
}
</script>
<style lang="">
  
</style>