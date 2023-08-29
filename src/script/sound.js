// Create audio context
const audioContext = new window.AudioContext()

// Function to create an ADSR envelope
function createEnvelope(context, volumn, attack, decay, sustain, release, duration) {
    const envelope = context.createGain()
    envelope.gain.setValueAtTime(0, context.currentTime)
    envelope.gain.linearRampToValueAtTime(volumn, context.currentTime + attack)
    envelope.gain.linearRampToValueAtTime(volumn*sustain, context.currentTime + attack + decay)
    envelope.gain.linearRampToValueAtTime(volumn*sustain, context.currentTime + duration - release)
    envelope.gain.linearRampToValueAtTime(0, context.currentTime + duration)
    return envelope
}

let oscillators = []
// Function to play a note
function playNotes(frequencies, duration) {
    // Create an oscillator node
    // for(let oscillator of oscillators){
    //     oscillator.stop(audioContext.currentTime)
    // }
    oscillators.splice(0, oscillators.length)
    for(let frequency of frequencies){

        const oscillator = audioContext.createOscillator()

        // Set the frequency
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

        // Create an ADSR envelope with attack, decay, sustain, and release times
        const envelope = createEnvelope(audioContext, 0.1, 0.001, 0.1, 0.5, 0.1, duration)

        // Connect the oscillator to the envelope
        oscillator.connect(envelope)

        // Connect the envelope to the audio context's output
        envelope.connect(audioContext.destination)

        // Start the oscillator now
        oscillator.start(audioContext.currentTime)

        // Stop the oscillator after the duration
        oscillator.stop(audioContext.currentTime + duration)
        oscillators.push(oscillator)
    }

}

// Play a middle C note (approximately 261.63 Hz) for 1 second
// playNote(261.63, 1)

export default {
    playNotes
}
