onmessage = function (e) {
  const object = e.data;
  const jsonString = JSON.stringify(object);
  const tamanho = new TextEncoder().encode(jsonString).length;
  postMessage(tamanho);
};