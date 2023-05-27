<template>
  <div class="input-group my-3">
    <input type="text" class="form-control" placeholder="Введите слово" v-model="word">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="search">Найти</button>
    </div>
  </div>
  <div v-if="loading" class="row">
    <div class="col-5"></div>
    <div class="col-2 spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="col-5"></div>
  </div>
  <template v-if="loaded">
    <template v-if="videos.length">
      <p class="h3">Произношения</p>
      <template v-for="video in videos">
        <div>
          <audio controls>
            <source :src="get_host + video.word" type="audio/mp3">
          </audio>
        </div>
      </template>
      <p class="h3">Примеры</p>
      <template v-for="video in videos">
        <div>
          <video controls style="max-width: 50%;">
            <source :src="get_host + video.sentence" type="video/mp4">
          </video>
        </div>
      </template>
    </template>
    <div v-else class="alert alert-secondary" role="alert">
      К сожалению, по Вашему запросу ничего не найдено.
    </div>
    <p class="h3">Может быть интересно:</p>
    <div class="list-group">
      <template v-for="word in other">
        <a href="javascript:" type="button" class="list-group-item list-group-item-action" @click="new_word(word)">{{word}}</a>
      </template>
    </div>
  </template>
</template>

<script>

import get_videos_by_word from "../api/api"
import config from "../config/config.json"


export default{
  data(){
    return {
      videos : [],
      word : '',
      loading : false,
      loaded : false,
    }
  },
  methods : {
    async search(){
      this.loading = true
      this.loaded = false
      const res = await get_videos_by_word(this.word)
      this.loading = false
      this.loaded = true
      this.videos = res.data
      this.other = res.other
    },
    async new_word(word){
      this.word = word
      await this.search()
    }
  },
  computed : {
    get_host(){
      return config.host
    }
  },
  created(){
    this.word = this.$route.params.word
  }
}

</script>