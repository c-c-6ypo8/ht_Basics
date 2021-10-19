const menuAnchor = document.getElementById('menu')
const menuLabels = document.getElementsByClassName('tabs-labels')

if (menuLabels[0]) {
  for (let label of menuLabels[0].children) {
    label.onclick = () => {
      menuAnchor.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
}
