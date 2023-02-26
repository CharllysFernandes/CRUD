const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("input-nome").value;
    const email = document.getElementById("input-email").value;
    const celular = document.getElementById("input-celular").value;
    const cidade = document.getElementById("input-cidade").value;

    const data = {
        nome,
        celular,
        cidade
    };

    localStorage.setItem("myFormData", JSON.stringify(data));
    console.log("Dados salvos no localStorage:", data);

    // Limpa o formulário após salvar os dados
    form.reset();
});