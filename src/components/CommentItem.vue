<template lang="">
  <div class="cmt-relative cmt-py-4 cmt-pl-4 cmt-bg-white" :class="commentItemData.isMentioned ? 'cmt-border-l-Orange cmt-border-l-4' : ''">
      <Badge v-if="commentItemData.unread" class="cmt-top-4 cmt-left-1"></Badge>
      <button class="cmt-absolute cmt-right-1 cmt-top-1" @click="onClickOptionsBtn">
        options
      </button>
      <div class="cmt-absolute cmt-right-2 cmt-top-8 cmt-bg-white cmt-rounded-md cmt-shadow-lg cmt-border-gray-500 cmt-border-1 cmt-p-1 cmt-z-50 cmt-cursor-pointer" v-if="showOptions">
        <div class="cmt-text-xs cmt-p-1" @click="onEditComment">edit</div>
        <div class="cmt-text-xs cmt-p-1" @click="onDeleteComment">delete</div>
      </div>
      <div>
        <span class="cmt-font-semibold cmt-mr-4">{{ commentItemData.creatorInfo.name }}</span> 
        <span class="cmt-text-sm cmt-font-normal cmt-text-txtGray">{{  convertTimeToFormattedString(new Date(commentItemData.createdAt), 'Asia/Tokyo') }}</span>
      </div>
      <div class="cmt-mt-2">{{  commentItemData.message }}</div>
    </div>
</template>
<script>
import Badge from './Badge.vue'

export default {
  props:{
    commentItemData: Object,
    isReply: Boolean
  },
  emits:['edit-reply', 'delete-reply'],
  data(){
    return {
      showOptions: false
    }
  },
  components:{
    Badge
  },
  methods:{
    convertTimeToFormattedString(time, timezone) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
      };

      const formattedString = time.toLocaleString('en-US', options);
      return formattedString.replace(',', '');
    },
    onClickOptionsBtn(){
      this.showOptions = !this.showOptions
    },
    onEditComment(){
      // if edit a reply => emit to thread item
      if(this.isReply){
        this.$emit('edit-reply')
      } else {
        const updateData = {
          id: this.commentItemData.id,
          //update comment - developing
        }
        this.$store.dispatch('updateComment', updateData)
      }
    },
    onDeleteComment(){
      console.log('delete');
    }
  }
}
</script>
<style lang="">
  
</style>