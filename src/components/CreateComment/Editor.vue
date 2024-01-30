<template lang="">
    <QuillEditor :toolbar="[]" v-model:content="commentRaw" :modules="modules" contentType="html" ref="myEditor" />
</template>
<script>
import QuillMention from 'quill-mention'
import MagicUrl from 'quill-magic-url'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  emits: ['lose-focus', 'input-text', 'input-raw'],
  data(){
    return {
      editor: null,
      commentRaw: '',
      commentText: '',
      modules:
        [
          {
          name: 'quillMention',
          module: QuillMention,
          options:{
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@"],
            source: function(searchTerm, renderList, mentionChar) {
              let values;

              if (mentionChar === "@") {
                values = [
                  { id: 1, value: "Fredrik Sundqvist", email: 'quang@gmail.com' },
                  { id: 2, value: "Patrik Sjölin" , email: 'test@gmail.com' }
                ];
              }

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (let i = 0; i < values.length; i++)
                  if (
                    ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                  )
                    matches.push(values[i]);
                renderList(matches, searchTerm);
              }
            },
            renderItem: function(item) {
              const renderer = document.createElement('template')
              renderer.innerHTML = '<div class="cmt-py-1 cmt-px-2"><div class="cmt-font-semibold" style="display: red">' + item.value + '</div><div class="cmt-font-normal cmt-text-xs" style="display: red">' + item.email + '</div></div>'
              return renderer.content
          },
          }
        },{
          name: 'quillMagicUrl',
          module: MagicUrl,
          options:{},
        }
      ]
    }
  },
  components: {
    QuillEditor,
  },
  watch:{
    commentRaw:{
      handler(newVal, oldVal){
        this.commentText = this.$refs.myEditor.getText()
        this.$emit('input-text', this.commentText)
        this.$emit('input-raw', this.commentRaw)
      }
    }
  },
  mounted() {
    const editor = this.$refs.myEditor.getEditor()
    editor.addEventListener('focusout', (event) => {
      // when lose focus
      if(this.commentText.length === 0 || this.commentText === '\n'){
        this.$emit('lose-focus', {loseFocus: false})
      }
    });
  },
  destroyed() {
    const editor = this.$refs.myEditor.getEditor()
    editor.removeEventListener('focusout', (event) => {
      // when lose focus
      this.$emit('lose-focus', {loseFocus: false})
    });
  }
}
</script>
<style lang="scss">
.ql-mention-list-container {
  border: 1px solid gray;
  background-color: white;
  box-shadow: black;
}

.ql-toolbar {
  display: none;
}

.ql-container {
  border: 1px solid gray !important;
}

li.selected {
  background-color: #E3E3E3;
}

.mention {
  color: orange;
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #871919;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color:#e9ecef;
    color: #495057;
  }
}
</style>