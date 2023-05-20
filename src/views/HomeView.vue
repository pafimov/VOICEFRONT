<template>
  <div class="input-group my-3">
    <input type="text" class="form-control" placeholder="Введите слово" v-model="word">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="search">Найти</button>
    </div>
  </div>
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
      <video controls>
        <source :src="get_host + video.sentence" type="video/mp4">
      </video>
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
    }
  },
  methods : {
    async search(){
      const res = await get_videos_by_word(this.word)
      this.videos = res.data
    }
  },
  computed : {
    get_host(){
      return config.host
    }
  },
  beforeMount() {
    console.log(config.host)
  }
}

</script>