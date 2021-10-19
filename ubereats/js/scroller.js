const scroller = document.getElementById('scroller')
const scrollerUnHidePoint = document.getElementById('scrollerUnHidePoint')
var unHidePosTop

const scrollPosTop = () => {
  return window.pageYOffset ?? 0
}

const unHidePointPosTop = () => {
  return scrollerUnHidePoint.getBoundingClientRect().top + scrollPosTop()
}

const setScrollVisibility = (unHidePos) => {
  if (unHidePos == undefined) {
    unHidePos = unHidePointPosTop()
    unHidePosTop = unHidePos
  }
  if (scrollPosTop() + window.innerHeight > unHidePos) {
    scroller.classList.remove('hidden')
  } else {
    scroller.classList.add('hidden')
  }
}

document.body.onload = () => {
  setScrollVisibility()  
}

window.onresize = () => {
  setScrollVisibility()  
}

window.onscroll = () => {
  setScrollVisibility(unHidePosTop)  
}

scroller.classList.add('hidden')
