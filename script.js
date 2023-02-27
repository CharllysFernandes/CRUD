// criando um objeto com os valores dos inputs
const formData = {nome, email, celular, cidade,};

  // verificando se já existem dados no localStorage
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// selecionando o elemento tbody da tabela
const tableBody = document.querySelector("#table-body");
const btnSalvar = document.querySelector("#btn-salvar");
const inputCelular = document.querySelector("#input-celular");
// selecionando o botão "Salvar"

inputCelular.addEventListener("blur", () => {
    inputCelular.value = formatPhoneNumberWithValidation(inputCelular.value);
});

// adicionando um ouvinte de eventos ao botão "Salvar"
btnSalvar.addEventListener("click", () => {
    // selecionando os valores dos inputs
    const nome = document.querySelector("#input-nome").value;
    const email = document.querySelector("#input-email").value;
    const celular = formatPhoneNumber(document.querySelector("#input-celular").value);
    const cidade = document.querySelector("#input-cidade").value;
  
    // adicionando o novo cliente ao array
    clientes.push(formData);

    // fechando o modal
    const modal = document.querySelector("#myModal");
    const modalBootstrap = bootstrap.Modal.getInstance(modal);
    modalBootstrap.hide();
    
    // resetando os valores dos inputs
    const form = document.querySelector("#myForm");
    form.reset();
    salvarClientesNoLocalStorage(clientes)
    renderizaClientesNaTabela();
  });
  

// verificando se há dados salvos no localStorage

function renderizaClientesNaTabela() {
    if (localStorage.getItem("clientes")) {
        // recuperando os dados salvos do localStorage
        const clientes = JSON.parse(localStorage.getItem("clientes"));


        // limpando o conteúdo da tabela
        tableBody.innerHTML = "";


        // percorrendo o array de dados e adicionando as linhas na tabela
        clientes.forEach((cliente, index) => {
            // criando a linha da tabela
            const row = document.createElement("tr");

            // criando as células da linha com os dados do cliente
            const nomeCell = document.createElement("td");
            nomeCell.innerText = cliente.nome;
            row.appendChild(nomeCell);

            const emailCell = document.createElement("td");
            emailCell.innerText = cliente.email;
            row.appendChild(emailCell);

            const celularCell = document.createElement("td");
            celularCell.innerText = cliente.celular;
            row.appendChild(celularCell);

            const cidadeCell = document.createElement("td");
            cidadeCell.innerText = cliente.cidade;
            row.appendChild(cidadeCell);

            // criando as células para os botões de editar e excluir
            const editarCell = document.createElement("td");
            const editarButton = document.createElement("button");
            editarButton.classList.add("btn", "btn-sm", "btn-primary");
            editarButton.innerText = "Editar";
            editarButton.addEventListener("click", () => {
                editarCliente(index);
            });
            editarCell.appendChild(editarButton);
            row.appendChild(editarCell);

            const excluirCell = document.createElement("td");
            const excluirButton = document.createElement("button");
            excluirButton.classList.add("btn", "btn-sm", "btn-danger");
            excluirButton.innerText = "Excluir";
            excluirButton.addEventListener("click", () => {
                excluirCliente(index);
            });
            excluirCell.appendChild(excluirButton);
            row.appendChild(excluirCell);

            // adicionando a linha na tabela
            tableBody.appendChild(row);
        });
    }
}



renderizaClientesNaTabela();

function excluirCliente(index) {
    // recuperando os dados salvos do localStorage
    const clientes = JSON.parse(localStorage.getItem("clientes"));

    // removendo o cliente do array de clientes
    clientes.splice(index, 1);

    // salvando o array de clientes atualizado no localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // renderizando novamente a tabela com os clientes atualizados
    renderizaClientesNaTabela();
}

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}
function formatPhoneNumberWithValidation(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");
    
    if (cleaned.length !== 11 || !/^\d+$/.test(cleaned)) {
      return null; // número de celular inválido
    }
    
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return null; // número de celular inválido
  }
  function validateForm() {
    const nome = document.querySelector("#input-nome").value;
    const email = document.querySelector("#input-email").value;
    const celular = document.querySelector("#input-celular").value;
    const cidade = document.querySelector("#input-cidade").value;
  
    if (!nome || !email || !celular || !cidade) {
      alert("Por favor, preencha todos os campos!");
      return false;
    }
  
    const formattedCelular = formatPhoneNumberWithValidation(celular);
  
    if (!formattedCelular) {
      alert("Por favor, insira um número de celular válido!");
      return false;
    }
  
    return true;
  }
    
  function salvarClientesNoLocalStorage(dadosClientes) {
     // salvando os dados dos clientes no localStorage
     localStorage.setItem("clientes", JSON.stringify(dadosClientes));
  }