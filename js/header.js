//Creamos el header
const header = document.createElement('header')
header.className = 'header__desktop'

//creamos el div del logo
const logoDivHeader = document.createElement('div')
logoDivHeader.className = 'header__caja-logo'

//creamos el elemento img y le asignamos src y alt
const logoImgHeader = document.createElement('img')
logoImgHeader.className = 'header__logo'
logoImgHeader.src = './img/Logo header/logoOMAtransparente.svg'
logoImgHeader.alt = 'logo OMA'
logoDivHeader.appendChild(logoImgHeader)

//agregamos el logo al header
header.appendChild(logoDivHeader)

//Creamos el titulo
const tituloH1 = document.createElement('h1')
tituloH1.className = 'header__titulo navbar-brand'

const secretariaP = document.createElement('p')
secretariaP.className = 'secretaria'
secretariaP.textContent = 'SECRETARÍA REGIONAL CENTRO'

const olimpiadasP = document.createElement('p')
olimpiadasP.className = 'olimpiadas'
olimpiadasP.textContent = 'Olimpiada Matemática Argentina'

//agregamos los p al titulo
tituloH1.appendChild(secretariaP)
tituloH1.appendChild(olimpiadasP)

//agregamos el titulo al header
header.appendChild(tituloH1)

//creamos el elemento nav
const navElement = document.createElement('nav')
navElement.className = 'navbar navbar-expand-md bg-body-tprimary header__nav'

//agregamos el elemento nav al header
header.appendChild(navElement)

//creamos el div contenedor del menú
const containerDiv = document.createElement('div')
containerDiv.className = 'container-fluid'

//agregamos el div contenedor al elemento nav
navElement.appendChild(containerDiv)

//creamos el div para los items del menú
const menuCollapseDiv = document.createElement('div')
menuCollapseDiv.className = 'collapse navbar-collapse flex-grow-1 flex-lg-grow-0'
menuCollapseDiv.id = 'navbarNavDropdown'

//agregamos el div de colapso al div contenedor
containerDiv.appendChild(menuCollapseDiv)

//creamos la lista de items del menú
const menuList = document.createElement('ul')
menuList.className = 'navbar-nav header__menu'

//agregamos la lista ul de menú al div de colapso
menuCollapseDiv.appendChild(menuList)

//creamos el elemento de menú "Inicio"
const menuItemInicio = document.createElement('li')
menuItemInicio.className = 'nav-item header__menu-item rounded-pill'
const linkInicio = document.createElement('a')
linkInicio.className = 'nav-link header__menu-link'
linkInicio.href = './index.html'
linkInicio.textContent = 'INICIO'

//Agregamos el elemento link a la li 
menuItemInicio.appendChild(linkInicio)

//agregamos el elemento li de menú "Inicio" a la lista ul
menuList.appendChild(menuItemInicio)


//finalmente agregamos el header al body
document.body.prepend(header)
