<template>
  <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {createSong, isValidMusic, processSongsUrl} from 'common/js/song'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    components: {MusicList},
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.songmenu.dissname
      },
      bgImage() {
        return this.songmenu.imgurl
      },
      ...mapGetters([
        'songmenu'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.songmenu.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.songmenu.dissid).then((res) => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
              this.songs = songs
            })
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
