<template>
  <div>
    <section>
      <div class="container">
        <div>
          <h1>
            Chord Analyzer
          </h1>
        </div>

        <div>
          <button @click="clearAllKeys()">Clear All Keys</button>
          Chord Preset:
          <span class="selector-wrapper">
            <span class="selector-label">Key</span>
            <select ref="key selector">
              <option :value="i" v-for="i in toneNames" :key="i">{{ i }}</option>
            </select>
          </span>
          <span class="selector-wrapper">
            <span class="selector-label">Octave</span>
            <select ref="octave selector" value="4">
              <option :value="i" v-for="i in [2, 3, 4, 5, 6]" :key="i">{{ i }}</option>
            </select>
          </span>
          <span class="selector-wrapper">
            <span class="selector-label">Chord</span>
            <select ref="chord selector">
              <option :value="chord.keys" v-for="chord, i in chordDatabase.chords" :key="i">{{ chord.name }}</option>
            </select>
          </span>
          <button @click="applyChords()">Apply!</button>
        </div>

        <div>
          <button class="btn-hightlight" @click="playEnabledKeys()">Play Enabled Keys</button>
          <span>
            Pitch Class and ratio = {{ pitchClass }}, {{ ratio }}
          </span>
        </div>
      </div>
    </section>
    <section>
      <div class="scroll_horizontal" ref="scroll region">

        <div class="scroll_horizontal-sticky">
          ▼ Piano Keys | Click to play
        </div>

        <div class="piano_container" :style="{ width: fullWidth + 'px' }">

          <!-- keyboard -->
          <div class="piano_container-keyboard">
            <div :style="key.keyStyle" :class="Object.assign(key.cssClass, { 'key_enabled': key.enable })" class="note_body" v-for="key in pianoKeys" :key="key.index" @click.prevent="pianoKeyClick(key)">
              <!-- {{ key.name }} -->
            </div>
          </div>
        </div>

        <div class="scroll_horizontal-sticky">
          ▼ Chord Switches | Click to toggle on/off
        </div>

        <div class="piano_container" :style="{ width: fullWidth + 'px' }">
          <!-- Working area -->
          <div class="piano_container-editor">
            <div :style="key.containerStyle" :class="key.cssClass" class="note_box" v-for="key in pianoKeys" :key="key.index" @click.prevent="editorKeyClick(key)">
              <div :class="{ 'note_enable': key.enable }" class="note_box-tag">
                {{ key.name }}
              </div>
              <span class="note_octave">
                {{ key.octave }}
              </span>
              <!-- {{ key.enable }} -->
            </div>
          </div>
        </div>

        <div class="scroll_horizontal-sticky">
          ▼ Harmonics | Orange = Overtone, Blue = Undertone | Click to play
        </div>

        <!-- Result Area -->
        <div class="ratio_hint" :style="{ width: fullWidth + 'px' }">
          <div class="ratio_hint-row" :class="{ 'is_higher_harmonics': hint.isHigherHarmonics }" v-for="hint, i in analyzeResult.hints" :key="i" @click.prevent="playHint(hint)">
            <div class="ratio_hint-node" :style="node.style" :class="node.cssClass" v-for="node, i in hint.nodes" :key="i" @click.prevent="playHint(hint, node)">
              <template v-if="!node.cssClass['node_is_minimize']">
                {{ node.ratio }}
              </template>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section>
      <div class="container">
        <div>
          <h1>
            How to use?
          </h1>
          <p>1. Click piano key to play sound.</p>
          <p>2. Toggle the switches to make a chord.</p>
          <p>3. View and interact with harmonics.</p>
        </div>
      </div>
    </section>
    <footer>
      <div class="container">
        <div>
          <h3>GitHub Repository</h3>
          <p><a href="https://github.com/chiuhans111/ChordMap">github.com/chiuhans111/ChordMap</a></p>
          <h3>Credit:</h3>
          <p>Developer: Hans Chiu</p>
          <p>Chords gathered from <a href="https://www.apassion4jazz.net/keys.html">apassion4jazz.net/keys.html</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import piano from './script/piano'
import sound from './script/sound'
import chord from './script/chord'
import helper from './script/helper'
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
      const index = keys.split(',').map(x => parseInt(x)).filter(x => !isNaN(x))
      if (index.length > 0) {
        for (let key of this.pianoKeys) {
          key.enable = index.includes(key.index)
        }
        this.updateAnalyze()
        this.scrollKeyIntoView()
      } else {
        console.log('no keys')
        this.scrollToKeyIndex((piano.keyid_start + piano.keyid_end) / 2)
      }
    } catch (error) {
      console.log('parameter parsing failed')
      this.scrollToKeyIndex((piano.keyid_start + piano.keyid_end) / 2)
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

      // this.scrollToKeyIndex(index + Math.max(...chord) / 2 + 0.5)
      this.scrollKeyIntoView()
      this.updateAnalyze()
      this.playEnabledKeys()
    },
    pianoKeyClick(key) {
      sound.playNotes([
        key.frequency,
      ], 0.5)
    },
    scrollToKeyIndex(index) {
      let x = piano.index2Xoffset(index)
      let width = this.$refs['scroll region'].offsetWidth
      helper.smoothScroll(this.$refs['scroll region'], x - width / 2, 0)
    },
    scrollKeyIntoView() {
      let list = this.pianoKeys.filter(x => x.enable).map(x => x.index)
      this.scrollToKeyIndex((Math.min(...list) + Math.max(...list)) / 2 + 0.5)
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
      const enabledKeys = piano.pianoKeys.filter(key => key.enable)
      if (enabledKeys.length > 0) {

        const keys = enabledKeys.map(key => key.index).join(',')
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?keys=${keys}`
        window.history.replaceState({}, '', newUrl)
      } else {
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
        window.history.replaceState({}, '', newUrl)
      }
    },
    playHint(hint, node) {
      if (node === undefined) {
        sound.playNotes(hint.frequencies, 0.5)
      } else {
        sound.playNotes([node.frequency], 0.5)
      }
      this.ratio = hint.ratio
    }
  },
  computed: {

  }
}
</script>

<style lang="scss"></style>
