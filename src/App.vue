<template>
  <div>
    <section>
      <button @click="playEnabledKeys()">Play Enabled Keys</button>
      <div>
        <button @click="clearAllKeys()">Clear All Keys</button>

        <select ref="key selector">
          <option :value="i" v-for="i in toneNames" :key="i">{{ i }}</option>
        </select>
        <select ref="octave selector" value="4">
          <option :value="i" v-for="i in [2, 3, 4, 5, 6]" :key="i">{{ i }}</option>
        </select>
        <select ref="chord selector">
          <option :value="chord.keys" v-for="chord, i in chordDatabase.chords" :key="i">{{ chord.name }}</option>
        </select>
        <button @click="applyChords()">Apply Chords</button>
      </div>
      <p>
        Pitch Class and ratio = {{ pitchClass }}, {{ ratio }}
      </p>

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
          <div class="ratio_hint-row" :class="{ 'is_higher_harmonics': hint.isHigherHarmonics }" v-for="hint, i in analyzeResult.hints" :key="i" @click="playHint(hint)">
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
import chordDatabase from './script/chordDatabase'
console.log(chordDatabase)

export default {
  name: 'App',
  data() {
    return {
      pianoKeys: piano.pianoKeys,
      toneNames: piano.toneNames,
      fullWidth: piano.fullWidth,
      analyzeResult: {},
      pitchClass: [],
      ratio: [],
      chordDatabase
    }
  },
  components: {
  },
  mounted() {
    // Read URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const keys = urlParams.get("keys")

    try {
      const index = keys.split(',').map(x => parseInt(x))
      for (let key of this.pianoKeys) {
        key.enable = index.includes(key.index)
      }
      this.updateAnalyze()
    } catch (error) {
      console.log('parameter parsing failed')
    }

    console.log("keys:", keys)
  },
  methods: {
    clearAllKeys() {
      for (let key of this.pianoKeys) {
        key.enable = false
      }
      this.updateAnalyze()
    },
    applyChords() {
      const key_selector = this.$refs['key selector']
      const octave_selector = this.$refs['octave selector']
      const chord_selector = this.$refs['chord selector']

      const key = key_selector.value
      const octave = octave_selector.value
      const chord = chord_selector.value.split(',').map(x => parseInt(x))

      const index = piano.name2index(key, octave)

      for (let key of this.pianoKeys) {
        key.enable = chord.includes(key.index - index)
      }

      this.updateAnalyze()
      this.playEnabledKeys()
    },
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
      this.updateParams()
      this.analyzeResult = chord.analyze(
        piano.pianoKeys.filter(key => key.enable).map(key => key.frequency),
      )

      let pitch = piano.pianoKeys.filter(key => key.enable).map(key => key.index)
      pitch = pitch.map((x) => x - pitch[0])

      this.pitchClass = pitch
      if (this.analyzeResult.hints.length > 0)
        this.ratio = this.analyzeResult.hints[0].ratio
      else this.ratio = []

    },
    updateParams() {
      const keys = piano.pianoKeys.filter(key => key.enable).map(key => key.index).join(',')
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?keys=${keys}`
      window.history.pushState({}, '', newUrl)
    },
    playHint(hint) {
      sound.playNotes(hint.frequencies, 0.5)
      this.ratio = hint.ratio
    }
  },
  computed: {

  }
}
</script>

<style lang="scss"></style>
