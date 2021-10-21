const scroller = document.getElementById('scroller')
const menu = document.getElementById('menu')
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
  if (
    scrollPosTop() + window.innerHeight > unHidePos &&
    (menu == undefined || menu.getBoundingClientRect().bottom + 50 < 0)
  ) {
    scroller.classList.remove('removed')
  } else {
    scroller.classList.add('removed')
  }
}

document.body.addEventListener('load', () => {
  setScrollVisibility()
})

window.addEventListener('resize', () => {
  setScrollVisibility()
})

window.addEventListener('scroll', () => {
  setScrollVisibility(unHidePosTop)
})

if (menu) {
  scroller.addEventListener('click', () => {
    menu.scrollIntoView()
  })
} else {
  scroller.addEventListener('click', () => {
    document.body.scrollIntoView()
  })
}

scroller.classList.add('removed')
