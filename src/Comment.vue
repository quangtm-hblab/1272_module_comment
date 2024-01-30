<template>
  <!-- gia lap comment popup -->
  <div class="cmt-h-[700px] cmt-w-[500px]">
    <!-- comment popup content -->
    <div class="cmt-bg-bgGray cmt-flex cmt-flex-col" style="height: calc(100% - 48px);">
      <div class="cmt-h-full cmt-pl-4 cmt-overflow-auto flex-grow">
        <ThreadItem
          v-for="item in fakeListComment"
          :key="item.id"
          :thread-item-data="item" />
      </div>
      <CreateComment></CreateComment>
    </div>
  </div>
</template>

<script lang="js">
import ThreadItem  from './components/ThreadItem.vue'
import CreateComment from './components/CreateComment'
export default ({
  components: { ThreadItem, CreateComment },
  props:{},
  data(){
  },
  computed:{
    //fake data comment
    fakeListComment(){
      return this.$store.state.comments
    } 
  },
  created() {
    this.$store.dispatch('fetchComments')
  },
});
</script>
