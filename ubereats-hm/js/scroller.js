let unHidePosTop
const scroller = document.getElementById('scroller')
const scrollerUnHidePoint = document.getElementById('scrollerUnHidePoint')
scroller.classList.add('hidden')

scrollPosTop = () => {
  return window.pageYOffset ?? 0
}

const unHidePointPosTop = () => {
  return scrollerUnHidePoint.getBoundingClientRect().top + scrollPosTop()
}

document.body.onload = () => {
  unHidePosTop = unHidePointPosTop()
}

window.onresize = () => {
  unHidePosTop = unHidePointPosTop()
}

window.onscroll = () => {
  unHidePosTop = unHidePosTop ?? unHidePointPosTop()
  if (scrollPosTop() + window.innerHeight > unHidePosTop) {
    scroller.classList.remove('hidden')
  } else {
    scroller.classList.add('hidden')
  }
}
