const campos = ['proprietario', 'modelo', 'placa', 'lavagem']
const veiculos = JSON.parse(localStorage.getItem('dbveiculos')) || []

document.querySelector('#novo').addEventListener('click', () => abrirJanela())
document.querySelector('#btnGravar').addEventListener('click', (e) => {
  e.preventDefault()
  const veiculo = campos.reduce((obj, campo) => {
    obj[campo] = document.querySelector(`#${campo}`).value
    return obj
  }, {})
  veiculos.push(veiculo)
  localStorage.setItem('dbveiculos', JSON.stringify(veiculos))
  loadVeiculos()
  document.querySelector('.janela-veiculo-container').classList.remove('active')
})

function abrirJanela() {
  document.querySelector('.janela-veiculo-container').classList.add('active')
}

function loadVeiculos() {
  const tabelaVeiculos = document.querySelector('.tabela tbody')
  tabelaVeiculos.innerHTML = ''
  veiculos.forEach((veiculo, index) => {
    let tr = document.createElement('tr')
    campos.forEach(campo => {
      let td = document.createElement('td')
      td.textContent = veiculo[campo]
      tr.appendChild(td)
    })
    let tdEditar = document.createElement('td')
    tdEditar.innerHTML = `<button class="acaoEditar" onclick="abrirJanela()">Editar</button>`
    tr.appendChild(tdEditar)
    let tdExcluir = document.createElement('td')
    tdExcluir.innerHTML = `<button class="acaoExcluir" onclick="veiculos.splice(${index}, 1); loadVeiculos()">Excluir</button>`
    tr.appendChild(tdExcluir)
    tabelaVeiculos.appendChild(tr)
  })
}

loadVeiculos()
