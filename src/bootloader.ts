import { createApp } from "vue";

import "./index.scss";

import commentStore from './store/comment.js'

import Comment from "./Comment.vue";
const app = createApp(Comment)
app.use(commentStore)
app.mount("#app");
