const unhidePoint = 1000;

const scroller = document.getElementById('scroller')
scroller.classList.add('hidden')
console.log(scroller.getBoundingClientRect())

window.onscroll = function () {
  posLeft =
    window.pageXOffset !== undefined
      ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft
  posTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop
  if (posTop > unhidePoint) {
    scroller.classList.remove('hidden')
  } else {
    scroller.classList.add('hidden')
  }
}
