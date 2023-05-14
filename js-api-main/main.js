async function buscaEndereco(cep) {
  const mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    const urlApi = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const urlApiJson = await urlApi.json();
    if (urlApiJson.erro) {
      throw Error("CEP errado");
    }
    const cidade = document.getElementById("cidade");
    const logradouro = document.getElementById("endereco");
    const estado = document.getElementById("estado");

    cidade.value = urlApiJson.localidade;
    logradouro.value = urlApiJson.logradouro;
    estado.value = urlApiJson.uf;

    return urlApiJson;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP invalido. Tente novamente!</p>`;
  }
}

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
