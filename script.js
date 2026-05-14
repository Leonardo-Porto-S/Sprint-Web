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