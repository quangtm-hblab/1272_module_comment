<template>
  <div class="cmt-my-[20px] cmt-rounded-lg cmt-shadow-lg">
    <!-- message item content -->
    <CommentItem :comment-item-data="threadItemData" class="cmt-rounded-t-lg cmt-border-b-[1px] cmt-border-[#E7E7E7]"></CommentItem>
    <!-- message item extend-reply-btn -->
    <div v-if="!isShowingReply && threadItemData.replyTotal">
      <div
        v-if="threadItemData.replyTotal > 1"
        class="cmt-bg-white cmt-pl-4 cmt-py-2 cmt-border-b-[1px] cmt-border-[#E7E7E7] cmt-text-Mint cmt-text-sm cmt-cursor-pointer cmt-flex cmt-items-center"
        @click="isShowingReply = true">
        <div>
          <flux-icon-button
            type="primary"
            :icon-id="'downarrowhead'"
            icon-size="16"
            width="16"
            height="16"
            disabled="false" /> 
        </div>
        <div>{{ threadItemData.replyTotal + ' 件の返信' }}</div>
      </div>
    </div>
    <div
      v-if="isShowingReply"
      class="cmt-bg-white cmt-pl-4 cmt-py-2 cmt-border-b-[1px] cmt-border-[#E7E7E7] cmt-text-Mint cmt-text-sm cmt-cursor-pointer cmt-flex cmt-items-center"
      @click="isShowingReply = false">
      <div>
        <flux-icon-button
          class="cmt-text-Mint"
          type="primary"
          :icon-id="'uparrowhead'"
          icon-size="16"
          width="16"
          height="16"
          disabled="false" /> 
      </div>
      <div>すべて折りたたむ</div>
    </div>
    <!-- message item latest reply -->
    <CommentItem v-if="!isShowingReply && threadItemData.replyLatest" :comment-item-data="threadItemData.replyLatest" is-reply></CommentItem>
    <!-- message item list reply -->
    <div v-if="isShowingReply">
      <CommentItem v-for="replyItem in listReply" :key="replyItem.id" :comment-item-data="replyItem" is-reply />
    </div>
    <!-- message item reply-btn -->
    <CreateReply @add-reply="handleAddReply" />
  </div>
</template>
<script lang="">
  import CommentItem from './CommentItem.vue'
  import CreateReply from './CreateReply.vue'
  import CreateComment from './CreateComment.vue'
  export default ({
    props:{
      threadItemData: Object
    },
    components:{
      CommentItem,
      CreateReply,
      CreateComment
    },
    data() {
      return {
        isCommenting: false,
        isShowingReply: false,
        comment: '',
        listReply: [],  
      }
    },
    methods: {
      showCommentField(){
        this.isCommenting = true
      },
      handleAddReply(reply){
        //call api create reply
        console.log(reply)
        const createdReply = {
            id: 'c1324036-3a9e-425e-a7ae-18a9ff40feec',
            message: reply,
            creatorInfo: {
              id: 'd65e13b1-f274-4708-96fb-18096f1a5beb',
              mailAddress: 'apm-dxpf-dev014@fujifilm.com',
              name: '統合 十四'
            },
            createdAt: '2024-01-22T03:09:20.960Z',
            mentionTo: [],
            unread: false,
            isMentioned: false
          }
        this.listReply.push(createdReply)
        // update latest reply
        this.threadItemData.replyLatest = createdReply
      }
    },
    created(){
      // fetch list reply
      this.listReply = 
      [
          {
            id: 'c1324036-3a9e-425e-a7ae-18a9ff40feec',
            message: 'new comment',
            creatorInfo: {
              id: 'd65e13b1-f274-4708-96fb-18096f1a5beb',
              mailAddress: 'apm-dxpf-dev014@fujifilm.com',
              name: '統合 十四'
            },
            createdAt: '2024-01-22T03:09:20.960Z',
            mentionTo: [],
            unread: false,
            isMentioned: false
          },
          {
            id: '107b5057-be97-4ffb-a838-9737384176c5',
            message: 'Comment 1',
            creatorInfo: {
              id: 'e09f20f9-77a8-4e65-afe1-90fd233c5914',
              mailAddress: 'apm-dxpf-dev012@fujifilm.com',
              name: '統合 十二'
            },
            createdAt: '2024-01-17T03:25:48.017Z',
            mentionTo: [],
            unread: false,
            isMentioned: true,
          },
          {
            id: 'd6dacc21-423e-4f47-a8a7-8e8d3d256034',
            message: '<p><span data-w-e-type="mention" class = "mention" data-w-e-is-void data-w-e-is-inline data-value="全員" data-info="%22allAccessUser%22">全員</span> mention test</p>',
            creatorInfo: {
              id: '8854019d-05dc-4422-a11a-78ea3f4c66ad',
              mailAddress: 'apm-dxpf-dev022@fujifilm.com',
              name: '統合 二十二'
            },
            createdAt: '2024-01-22T08:14:54.210Z',
            mentionTo: [
              'allAccessUser'
            ],
            unread: false,
            isMentioned: false,
          },
          {
            id: '009ac553-00d2-473c-9ec3-a5a1d27bbff1',
            message: '<p>hello 22</p>',
            creatorInfo: {
              id: 'fae01a9e-a79c-4e1b-b68b-ac3c4bbd02f9',
              mailAddress: 'apm-dxpf-dev021@fujifilm.com',
              name: '統合 二十一'
            },
            createdAt: '2024-01-22T08:49:48.995Z',
            mentionTo: [],
            unread: false,
            isMentioned: true,
          },
          {
            id: '0be795e2-60d0-4a91-ac58-aa9978092367',
            message: '<p>new comment </p>',
            creatorInfo: {
              id: 'e09f20f9-77a8-4e65-afe1-90fd233c5914',
              mailAddress: 'apm-dxpf-dev012@fujifilm.com',
              name: '統合 十二'
            },
            createdAt: '2024-01-19T07:04:56.642Z',
            mentionTo: [],
            unread: false,
            isMentioned: false,
          },
          {
            id: 'c16ed8ea-079e-47fb-a717-cfb0a8dc999e',
            message: '<p><span data-w-e-type="mention" class = "mention" data-w-e-is-void data-w-e-is-inline data-value="統合 二十一" data-info="%22fae01a9e-a79c-4e1b-b68b-ac3c4bbd02f9%22">統合 二十一</span>123123123123123</p>',
            creatorInfo: {
              id: '8854019d-05dc-4422-a11a-78ea3f4c66ad',
              mailAddress: 'apm-dxpf-dev022@fujifilm.com',
              name: '統合 二十二'
            },
            createdAt: '2024-01-23T02:36:41.722Z',
            mentionTo: [
              'fae01a9e-a79c-4e1b-b68b-ac3c4bbd02f9'
            ],
            unread: false,
            isMentioned: false
          },
          {
            id: 'a3fcd4a8-c888-4953-80f7-65413a49a823',
            message: '<p>123123123123123123</p>',
            creatorInfo: {
              id: '8854019d-05dc-4422-a11a-78ea3f4c66ad',
              mailAddress: 'apm-dxpf-dev022@fujifilm.com',
              name: '統合 二十二'
            },
            createdAt: '2024-01-23T02:37:52.325Z',
            mentionTo: [],
            unread: true,
            isMentioned: true
          }
        ]
    }
  });
</script>
