const menuAnchor = document.getElementById('menu')
const tabsContents = document.getElementsByClassName('tabs-contents')[0]
const tabContent = document.getElementsByClassName('tab-content')
const tabsButtons = document.getElementsByName('tab-btn')
const menuLabels = document.getElementsByClassName('tabs-labels')[0].children
const headers = document.getElementsByClassName('header')
const baloon = document.getElementsByClassName('tab-name-baloon')[0]

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

//TODO: make created tags clearing
// Меняет направление анимации появления меню для всех элементов, кроме текущего
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
var currentBaloonId;

const showCurrentTabNameBaloon = (tabNum) => {  
  const thisBaloonId = Math.random(1000)
  currentBaloonId = thisBaloonId
  baloon.classList.remove('hidden')
  baloon.innerHTML = menuLabels[+tabNum].innerHTML
  setTimeout(() => {
    if (currentBaloonId == thisBaloonId) {
      baloon.classList.add('hidden')
    }
  }, 2000)  
}

const tabNameIsHidden = (tabNum) => {
  if (headers[tabNum].getBoundingClientRect().top - 58 < 0) {
    return true
  } else {
    return false
  }
}

tabsContents.addEventListener('swiped-left', () => {
  setTranslateX('right')
  activateMenuRadio('left')
  const tabNum = getActiveTabNum()
  if (tabNameIsHidden(tabNum)) {
    showCurrentTabNameBaloon(tabNum)
  }
})

tabsContents.addEventListener('swiped-right', () => {
  setTranslateX('left')
  activateMenuRadio('right')
  const tabNum = getActiveTabNum()
  if (tabNameIsHidden(tabNum)) {
    showCurrentTabNameBaloon(tabNum)
  }
})

// Реакция на нажатие кнопки меню
for (let btn of tabsButtons) {
  btn.addEventListener('change', () => {
    menuAnchor.scrollIntoView()
  })
}
