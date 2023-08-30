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
    <section>
      <!-- Result Area -->
      <div class="ratio_hint">
        <div class="ratio_hint-row" v-for="hint, i in analyzeResult.hints" :key="i">
          <div class="ratio_hint-node" :style="node.style" :class="node.cssClass" v-for="node, i in hint.nodes" :key="i">
            {{ node.ratio }}
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import piano from './script/piano'
import sound from './script/sound'
import chord from './script/chord'
export default {
  name: 'App',
  data() {
    return {
      pianoKeys: piano.pianoKeys,
      analyzeResult: {}
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
      this.updateAnalyze()
    },
    playEnabledKeys() {
      sound.playNotes(piano.pianoKeys.filter(key => key.enable).map(key => key.frequency), 0.5)
    },
    updateAnalyze() {
      this.analyzeResult = chord.analyze(
        piano.pianoKeys.filter(key => key.enable).map(key => key.frequency),
      )
    }
  },
  computed: {

  }
}
</script>

<style lang="scss"></style>
