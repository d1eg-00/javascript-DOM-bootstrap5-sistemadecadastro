(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('cadMovel')) ?? [];
}

function setLocalStorage(cadMovel) {
  localStorage.setItem('cadMovel', JSON.stringify(cadMovel));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // inserir objeto  + index ?Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const cadMovel = getLocalStorage();
  let index = 0;
  for (movel of cadMovel) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${movel.descricao}</td>
        <td>${movel.precovenda}</td>
        <td>${movel.codigo}</td>
        <td>${movel.precocusto}</td>
        <td>${movel.quantidade}</td>
        <td>${movel.categoria}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const movel = {
    descricao: document.getElementById('descricao').value,
    precovenda: document.getElementById('precovenda').value,
    codigo: document.getElementById('codigo').value,
    precocusto: document.getElementById('precocusto').value,
    quantidade: document.getElementById('quantidade').value,
    categoria: document.getElementById('categoria').value
  }
  const cadMovel = getLocalStorage();
  cadMovel.push(movel);
  setLocalStorage(cadMovel);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const cadMovel = getLocalStorage();
  cadMovel.splice(index, 1);
  setLocalStorage(cadMovel);
  atualizarTabela();
}

function validarcodigo() { // Adaptação da função validar (10 pontos)
  const cadMovel = getLocalStorage();
  for (movel of cadMovel) {
    if (codigo.value == movel.codigo) {
      codigo.setCustomValidity("Este produto já existe");
      feedbackcodigo.innerText = "Este produto já existe!";
      return false;
    } else {
      codigo.setCustomValidity("");
      feedbackcodigo.innerText = "Este produto já existe..";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const codigo = document.getElementById("codigo");
const feedbackcodigo = document.getElementById("feedbackcodigo");
codigo.addEventListener('input', validarcodigo);