<template lang="">
  <div class="cmt-relative cmt-py-4 cmt-pl-4 cmt-bg-white" :class="commentItemData.isMentioned ? 'cmt-border-l-Orange cmt-border-l-4' : ''">
      <Badge v-if="commentItemData.unread" class="cmt-top-4 cmt-left-1"></Badge>
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
    commentItemData: Object
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
    }
  }
}
</script>
<style lang="">
  
</style>