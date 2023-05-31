<template>
  <Commercial v-if="commercial_playing" @finished="commercial_playing=!commercial_playing"></Commercial>
  <div class="input-group my-3">
    <select class="form-select" v-model="accent"
     @change="searched=false" :disabled="loading_audios || loading_videos">
      <option selected>British</option>
      <option>American</option>
    </select>
    <input type="text" class="form-control" placeholder="Введите слово"
     v-model="word" @input="searched=false" :disabled="loading_audios || loading_videos">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" 
      @click="search" :disabled="loading_audios || loading_videos">Найти</button>
    </div>
  </div>
  <Spinner v-if="loading_audios"></Spinner>
  <template v-if="searched">
    <hr/>
    <template v-if="audios.length">
      <p class="h3 my-3">Произношения</p>
      <template v-for="audio in audios">
        <div>
          <audio controls>
            <source :src="get_host + audio.word" type="audio/mp3">
          </audio>
        </div>
      </template>
      <hr/>
      <p class="h3 my-3">Примеры</p>
      <template v-if="videos.length && !commercial_playing">
        <template v-for="video in videos">
          <div class="my-2">
            <video controls style="max-width: 50%;">
              <source :src="get_host + video.sentence" type="video/mp4">
            </video>
          </div>
        </template>
      </template>
      <template v-else-if="loading_videos || commercial_playing">
        <Spinner></Spinner>
      </template>
      <template v-else>
        <button type="button" class="btn btn-primary btn-lg" @click="load_videos()">Посмотреть рекламу и показать примеры</button>
      </template>
      <hr/>
    </template>
    <div v-else class="alert alert-secondary" role="alert">
      К сожалению, по Вашему запросу ничего не найдено.
    </div>
    <p v-if="other.length" class="h3 my-3">Может быть интересно:</p>
    <div class="list-group">
      <template v-for="word in other">
        <a href="javascript:" type="button" class="list-group-item list-group-item-action" @click="new_word(word)">{{word}}</a>
      </template>
    </div>
  </template>
</template>
<script>

import {get_videos_by_word, get_audios_by_word} from "../api/api"
import Spinner from '../components/Spinner.vue'
import config from "../config/config.json"
import Commercial from "../components/Commercial.vue"


export default{
  data(){
    return {
      audios : [],
      videos : [],
      word : '',
      accent : 'British',
      loading_audios : false,
      loading_videos : false,
      searched : false,
      commercial_playing : false
    }
  },
  methods : {
    async search(){
      this.videos = []
      this.searched = false
      this.loading_audios = true
      const res = await get_audios_by_word(this.word, this.accent)
      this.loading_audios = false
      this.audios = res.data
      this.other = res.other

      this.searched = true
    },
    async new_word(word){
      this.word = word
      await this.search()
    },
    async load_videos(){
      const word = this.word
      const accent = this.accent
      this.loading_videos = true
      this.commercial_playing=true
      const res = await get_videos_by_word(word, accent)
      this.loading_videos = false
      this.videos = res.data
    }
  },
  computed : {
    get_host(){
      return config.host
    }
  },
  created(){
    this.word = this.$route.params.word
  },
  components : {
    Spinner, Commercial
  },
}

</script>