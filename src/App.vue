<template>
  <div>
    <section>
      <button @click="playEnabledKeys()">Play Enabled Keys</button>
      {{ pitchClass }}

    </section>
    <section>
      <div class="scroll_horizontal">

        <div class="piano_container" :style="{ width: fullWidth + 'px' }">
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
              <!-- {{ key.name }} -->
            </div>
          </div>
          <!-- Working area -->
          <div class="piano_container-editor">
            <div :style="key.containerStyle" :class="key.cssClass" class="note_box" v-for="key in pianoKeys" :key="key.index" @click.prevent="editorKeyClick(key)">
              <div :class="{ 'note_enable': key.enable }" class="note_box-tag">
                {{ key.name }}
                <!-- {{ key.enable }} -->
              </div>
            </div>
          </div>

        </div>

        <!-- Result Area -->
        <div class="ratio_hint" :style="{ width: fullWidth + 'px' }">
          <div class="ratio_hint-row" :class="{ 'harmonized': hint.harmonized }" v-for="hint, i in analyzeResult.hints" :key="i" @click="playHint(hint)">
            <div class="ratio_hint-node" :style="node.style" :class="node.cssClass" v-for="node, i in hint.nodes" :key="i">
              <template v-if="!node.cssClass['node_is_minimize']">
                {{ node.ratio }}
              </template>
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
import chord from './script/chord'
export default {
  name: 'App',
  data() {
    return {
      pianoKeys: piano.pianoKeys,
      analyzeResult: {},
      pitchClass: [],
      fullWidth: piano.fullWidth
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

      let pitch = piano.pianoKeys.filter(key => key.enable).map(key => key.index)
      pitch = pitch.map((x) => x - pitch[0])

      this.pitchClass = pitch
    },
    playHint(hint) {
      sound.playNotes(hint.frequencies, 0.5)
    }
  },
  computed: {

  }
}
</script>

<style lang="scss"></style>
