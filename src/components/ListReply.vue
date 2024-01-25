<template lang="">
  <div>
    <CommentItem v-for="replyItem in listReplyComment" :key="replyItem.id" :comment-item-data="replyItem" />
  </div>
</template>
<script >
import CommentItem from './CommentItem'
export default {
  props: {
    listReplyComment: Object
  },
  components:{
    CommentItem
  },

}
</script>
<style lang="">
  
</style>