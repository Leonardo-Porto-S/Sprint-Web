const btnTema = document.getElementById('btn-tema')

btnTema.addEventListener('click', function () {
  document.body.classList.toggle('escuro')

  if (document.body.classList.contains('escuro')) {
    btnTema.textContent = '☀️ Tema'
  } else {
    btnTema.textContent = '🌙 Tema'
  }
})

const inputTexto  = document.getElementById('input-texto')
const infoTexto   = document.getElementById('info-texto')
const resultado   = document.getElementById('resultado')

inputTexto.addEventListener('input', function () {
  const texto    = this.value
  const chars    = texto.length
  const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length

  infoTexto.textContent = `${chars} caractere${chars !== 1 ? 's' : ''} · ${palavras} palavra${palavras !== 1 ? 's' : ''}`
})

function transformar(acao) {
  const texto = inputTexto.value

  if (acao !== 'limpar' && texto.trim() === '') {
    mostrarResultado('⚠️ Digite algum texto primeiro!')
    return
  }

  if (acao === 'maiusculo') {
    mostrarResultado(texto.toUpperCase())

  } else if (acao === 'minusculo') {
    mostrarResultado(texto.toLowerCase())

  } else if (acao === 'inverter') {
    const invertido = texto.split('').reverse().join('')
    mostrarResultado(invertido)

  } else if (acao === 'contar') {
    const chars    = texto.length
    const palavras = texto.trim().split(/\s+/).filter(Boolean).length
    const espacos  = (texto.match(/ /g) || []).length
    const vogais   = (texto.match(/[aeiouáéíóúâêîôûãõAEIOUÁÉÍÓÚ]/g) || []).length

    mostrarResultado(
      `📊 ${chars} caracteres · ${palavras} palavras · ${espacos} espaços · ${vogais} vogais`
    )

  } else if (acao === 'limpar') {
    inputTexto.value      = ''
    infoTexto.textContent = '0 caracteres · 0 palavras'
    resultado.classList.add('escondido')
  }
}

function mostrarResultado(texto) {
  resultado.textContent = texto
  resultado.classList.remove('escondido')
}

const slides     = document.querySelectorAll('.slide')
const btnAntes   = document.getElementById('btn-anterior')
const btnProximo = document.getElementById('btn-proximo')
const numeroSlide = document.getElementById('slide-numero')

let slideAtual = 0

function irParaSlide(indice) {

  slides[slideAtual].classList.remove('ativo')

  slideAtual = (indice + slides.length) % slides.length

  slides[slideAtual].classList.add('ativo')

  numeroSlide.textContent = `${slideAtual + 1} / ${slides.length}`
}

btnAntes.addEventListener('click', function () {
  irParaSlide(slideAtual - 1)
})

btnProximo.addEventListener('click', function () {
  irParaSlide(slideAtual + 1)
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft')  irParaSlide(slideAtual - 1)
  if (e.key === 'ArrowRight') irParaSlide(slideAtual + 1)
})

let autoPlay = setInterval(function () {
  irParaSlide(slideAtual + 1)
}, 5000)

document.getElementById('galeria').addEventListener('mouseenter', function () {
  clearInterval(autoPlay)
})

document.getElementById('galeria').addEventListener('mouseleave', function () {
  autoPlay = setInterval(function () {
    irParaSlide(slideAtual + 1)
  }, 5000)
})

const loginEmail   = document.getElementById('login-email')
const loginSenha   = document.getElementById('login-senha')
const btnVerSenha  = document.getElementById('btn-ver-senha')
const btnEntrar    = document.getElementById('btn-entrar')
const forcaBarra   = document.getElementById('forca-preenchimento')
const forcaTexto   = document.getElementById('forca-texto')

btnVerSenha.addEventListener('click', function () {
  if (loginSenha.type === 'password') {
    loginSenha.type    = 'text'
    btnVerSenha.textContent = '🙈'
  } else {
    loginSenha.type    = 'password'
    btnVerSenha.textContent = '👁'
  }
})

loginSenha.addEventListener('input', function () {
  const senha = this.value
  let pontos  = 0

  if (senha.length >= 6)            pontos++
  if (senha.length >= 10)           pontos++
  if (/[A-Z]/.test(senha))          pontos++
  if (/[0-9]/.test(senha))          pontos++
  if (/[^A-Za-z0-9]/.test(senha))   pontos++

  const niveis = [
    { largura: '0%',   cor: '',                      texto: '' },
    { largura: '25%',  cor: '#dc2626',               texto: 'Muito fraca' },
    { largura: '50%',  cor: '#f97316',               texto: 'Fraca' },
    { largura: '75%',  cor: '#2563eb',               texto: 'Boa' },
    { largura: '90%',  cor: '#16a34a',               texto: 'Forte' },
    { largura: '100%', cor: '#16a34a',               texto: 'Excelente!' },
  ]

  const nivel = niveis[Math.min(pontos, 5)]
  forcaBarra.style.width      = senha ? nivel.largura : '0%'
  forcaBarra.style.background = nivel.cor
  forcaTexto.textContent      = senha ? nivel.texto : ''
})

btnEntrar.addEventListener('click', function () {
  const emailOk = validarEmail(loginEmail, 'erro-email')
  const senhaOk = validarSenha(loginSenha, 'erro-senha')

  if (!emailOk || !senhaOk) return

  if (loginEmail.value.trim() === 'user@email.com' && loginSenha.value === 'senha123') {
    abrirModal('✅', 'Login realizado!', 'Bem-vindo de volta!')
  } else {
    abrirModal('❌', 'Dados incorretos', 'Use user@email.com com a senha senha123.')
  }
})
