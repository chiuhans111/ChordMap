/**
 * 
 * @param {HTMLElement} element 
 * @param {number} x 
 * @param {number} y 
 */
function smoothScroll(element, x, y, time = 300) {
    let currentX = element.scrollLeft
    let currentY = element.scrollTop
    let dx = x - currentX
    let dy = y - currentY

    function terminate() {
        stop = true
        element.removeEventListener('mousedown', terminate)
        element.removeEventListener('wheel', terminate)
        element.removeEventListener('touchstart', terminate)
    }

    const startTime = performance.now()

    let stop = false

    function update() {
        let t = performance.now() - startTime
        if (t > time) {
            stop = true
            t = time
        }

        let f = t / time
        f = Math.sin(f * Math.PI / 2) ** 2
        element.scrollTo(f * dx + currentX, f * dy + currentY)

        if (stop) terminate()
        else requestAnimationFrame(update)
    }

    element.addEventListener('mousedown', terminate)
    element.addEventListener('wheel', terminate)
    element.addEventListener('touchstart', terminate)

    update()

}

export default {
    smoothScroll
}