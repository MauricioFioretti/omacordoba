const footer = document.createElement('footer')

const izqSection = document.createElement('section')
izqSection.className = 'footer__izq'

const logoIzqImg = document.createElement('img')
logoIzqImg.className = 'footer__logo-izq'
logoIzqImg.src = '../img/Logos Footer/FondoFOMAtransparenteLetrasBlancas.svg'
logoIzqImg.alt = 'logo FOMA'
izqSection.appendChild(logoIzqImg)

footer.appendChild(izqSection)

const lineaDiv = document.createElement('div')
lineaDiv.className = 'footer__line'
footer.appendChild(lineaDiv)

const derSection = document.createElement('section')
derSection.className = 'footer__der'

const datosContactoDiv = document.createElement('div')
datosContactoDiv.className = 'datosContacto'

const datosContactoParrafo1 = document.createElement('p')
datosContactoParrafo1.innerHTML = '<b>María del Carmen Spina Gómez</b>'
const datosContactoParrafo2 = document.createElement('p')
datosContactoParrafo2.innerHTML = '<b>Secretaria regional Adjunta a la dirección de la Olimpíada</b>'
const datosContactoParrafo3 = document.createElement('p')
datosContactoParrafo3.innerHTML = '<b>Teléfono: (0351) 4215695</b>'
datosContactoDiv.appendChild(datosContactoParrafo1)
datosContactoDiv.appendChild(datosContactoParrafo2)
datosContactoDiv.appendChild(datosContactoParrafo3)

derSection.appendChild(datosContactoDiv)

const correoParrafo = document.createElement('p')
correoParrafo.className = 'correo'
correoParrafo.innerHTML = '<b>Correo electrónico: omacordoba2019@gmail.com</b>'
derSection.appendChild(correoParrafo)

const iconosDiv = document.createElement('div')
iconosDiv.className = 'iconos'

const iconosFaceA = document.createElement('a')
iconosFaceA.className = 'iconos-face'
iconosFaceA.target = '_blank'
iconosFaceA.href = 'https://www.facebook.com/omacordoba?mibextid=ZbWKwL'
const iconosFaceImg = document.createElement('img')
iconosFaceImg.src = '../img/Logos Footer/logoFacebook.svg'
iconosFaceImg.alt = 'logo Facebook'
iconosFaceA.appendChild(iconosFaceImg)

const iconosInstaA = document.createElement('a')
iconosInstaA.className = 'iconos-insta'
iconosInstaA.target = '_blank'
iconosInstaA.href = 'https://instagram.com/omacordoba?igshid=MzRlODBiNWFlZA=='
const iconosInstaImg = document.createElement('img')
iconosInstaImg.src = '../img/Logos Footer/logoInstagram.svg'
iconosInstaImg.alt = 'logo Instagram'
iconosInstaA.appendChild(iconosInstaImg)

iconosDiv.appendChild(iconosFaceA)
iconosDiv.appendChild(iconosInstaA)
derSection.appendChild(iconosDiv)

const logoDivFoot = document.createElement('div')
logoDivFoot.className = 'logo'

const logoImgFoot = document.createElement('img')
logoImgFoot.src = '../img/Logos Footer/FondoOMAtransparenteLetrasBlancas.svg'
logoImgFoot.alt = 'logo OMA'
logoDivFoot.appendChild(logoImgFoot)

derSection.appendChild(logoDivFoot)

footer.appendChild(derSection)

document.body.appendChild(footer)

