<template>
  <div>
    <section>
      <button @click="playEnabledKeys()">Play Enabled Keys</button>
    </section>
    <section>
      <div ref="piano_container">
        <!-- Note Name -->
        <div class="piano_container-note_name">
          <div :style="key.containerStyle" v-for="key in pianoKeys" :key="key.index">
            <span>
              {{ key.name }}
            </span>
            <span class="note_octave">
              {{ key.octave }}
            </span>

          </div>
        </div>
        <!-- keyboard -->
        <div class="piano_container-keyboard">
          <div :style="key.keyStyle" :class="key.cssClass" class="note_body" v-for="key in pianoKeys" :key="key.index" @click.prevent="pianoKeyClick(key)">
            {{ key.name }}
          </div>
        </div>
        <!-- Working area -->
        <div class="piano_container-editor">
          <div :style="key.containerStyle" :class="key.cssClass" class="note_box" v-for="key in pianoKeys" :key="key.index" @click.prevent="editorKeyClick(key)">
            <div :class="{ 'note_enable': key.enable }">
              {{ key.enable }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import piano from './script/piano'
import sound from './script/sound'
export default {
  name: 'App',
  data() {
    return {
      pianoKeys: piano.pianoKeys
    }
  },
  components: {
  },
  mounted() {

  },
  methods: {
    pianoKeyClick(key) {
      sound.playNotes([
        key.frequency,
      ], 0.5)
    },
    editorKeyClick(key) {
      key.enable = !key.enable
      sound.playNotes([
        key.frequency,
      ], 0.5)
    },
    playEnabledKeys(){
      sound.playNotes(piano.pianoKeys.filter(key=>key.enable).map(key=>key.frequency), 0.5)
    }
  }
}
</script>

<style lang="scss"></style>
