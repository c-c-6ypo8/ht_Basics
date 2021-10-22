const menuAnchor = document.getElementById('menu')
const tabsContents = document.getElementsByClassName('tabs-contents')[0]
const tabContent = document.getElementsByClassName('tab-content')
const tabsButtons = document.getElementsByName('tab-btn')
const menuLabels = document.getElementsByClassName('tabs-labels')[0].children
const baloon = document.getElementsByClassName('tab-name-baloon')[0]
const arrowsLeft = document.getElementsByClassName('arrow-left')
const arrowsRight = document.getElementsByClassName('arrow-right')
const arrowLeftContainers = document.getElementsByClassName(
  'arrow-left-container',
)
const arrowRightContainers = document.getElementsByClassName(
  'arrow-right-container',
)
const headerWithArrowsName = document.getElementById('header-with-arrows-name')

// Определяет номер активной радио-кнопки
const getActiveTabNum = () => {
  for (let btn of tabsButtons) {
    if (btn.checked) {
      return +btn.dataset.num
    }
  }
}

// Включает радио-кнопки. Проходит их циклично в случае выхода за границу
// диапазона
const activateMenuRadio = (direction) => {
  let buttonNum = getActiveTabNum()
  if (direction == 'left') {
    buttonNum + 1 < tabsButtons.length ? (buttonNum += 1) : (buttonNum = 0)
  } else if (direction == 'right') {
    buttonNum - 1 >= 0 ? (buttonNum -= 1) : (buttonNum = tabsButtons.length - 1)
  }
  tabsButtons[buttonNum].checked = true
}

// Меняет направление анимации появления меню для всех элементов, кроме текущего
// Добавляет стиль путём создания в конце DOM-дерева элемента с тегом "style"
const setTranslateX = (direction) => {
  const sheet = document.createElement('style')
  sheet.innerHTML = `
    #tab-btn-1:checked ~ .tabs-contents #menu-1,
    #tab-btn-2:checked ~ .tabs-contents #menu-2,
    #tab-btn-3:checked ~ .tabs-contents #menu-3,
    #tab-btn-4:checked ~ .tabs-contents #menu-4,
    #tab-btn-5:checked ~ .tabs-contents #menu-5,
    #tab-btn-6:checked ~ .tabs-contents #menu-6 {
      display: block;
      animation: trans-from-${direction} 0.4s ease-out;
    }`
  document.body.appendChild(sheet)
}

// Показывает всплывающее сообщение с именем текущей вкладки меню
var currentBaloonId

const showCurrentTabNameBaloon = (tabNum) => {
  const thisBaloonId = Math.random(1000)
  currentBaloonId = thisBaloonId
  baloon.classList.remove('hidden', 'removed')
  baloon.innerHTML = menuLabels[+tabNum].innerHTML
  setTimeout(() => {
    if (currentBaloonId == thisBaloonId) {
      baloon.classList.add('hidden')
    }
  }, 1250)
}

const showCurrentTabNameHeader = (tabNum) => {
  headerWithArrowsName.innerHTML = menuLabels[+tabNum].innerHTML
}

const tabNameIsHidden = () => {
  if (tabsContents.getBoundingClientRect().top < 0) {
    return true
  } else {
    return false
  }
}

for (let container of arrowLeftContainers) {
  container.addEventListener('click', () => {
    setTranslateX('left')
    activateMenuRadio('right')
    showCurrentTabNameHeader(getActiveTabNum())
  })
}

for (let container of arrowRightContainers) {
  container.addEventListener('click', () => {
    setTranslateX('right')
    activateMenuRadio('left')
    showCurrentTabNameHeader(getActiveTabNum())
  })
}

tabsContents.addEventListener('swiped-left', () => {
  setTranslateX('right')
  activateMenuRadio('left')
  const tabNum = getActiveTabNum()
  if (tabNameIsHidden(tabNum)) {
    showCurrentTabNameBaloon(tabNum)
  }
  showCurrentTabNameHeader(tabNum)
})

tabsContents.addEventListener('swiped-right', () => {
  setTranslateX('left')
  activateMenuRadio('right')
  const tabNum = getActiveTabNum()
  if (tabNameIsHidden(tabNum)) {
    showCurrentTabNameBaloon(tabNum)
  }
  showCurrentTabNameHeader(tabNum)
})

// Реакция на нажатие кнопки меню
for (let btn of tabsButtons) {
  btn.addEventListener('change', () => {
    menuAnchor.scrollIntoView()
  })
}
