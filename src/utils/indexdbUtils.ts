import { get, set, del, clear, keys, entries } from 'idb-keyval';

export const salvarDadosDB = async (chave: string, dados: any) => {
  try {
    await set(chave, dados);
  } catch (err) {
    console.log(err)
  }
};

export const buscarDadosDB = async (chave: string) => {
  let dados;
  try {
    dados = await get(chave);
  } catch (err) {
  }
  return dados;
};

export const buscarAnexosBanco = async (data) => {
  const ocorrenciasPromises = data.ocorrencias ? data.ocorrencias.map(async (item) => {
    const anexo = item.anexo ? await buscarDadosDB(item.anexo.uid) : null;
    return { ...item, anexo };
  }) : null;

  const ocorrenciasResolve = ocorrenciasPromises ? await Promise.all(ocorrenciasPromises) : [];
  return ocorrenciasResolve
}

export const deletarDadosDB = async (chave: string) => {
  try {
    await del(chave);
  } catch (err) {
  }
};

export const deletaAnexosBanco = async (arrayUid) => {
  if(arrayUid.length > 0){
    const deletePromises = arrayUid.map(async (item) => {
      return await deletarDadosDB(item)
    });
    await Promise.all(deletePromises);
  }
}

export const limparDadosDB = async () => {
  try {
    await clear();
  } catch (err) {
  }
}

export const buscarChavesDB = async () => {
  let chaves;
  try {
    chaves = await keys();
  } catch (err) {
  }
  return chaves;
}

export const entriesDB = async () => {
  let entriesLet;
  try {
    entriesLet = await entries();
  } catch (err) {
  }
  return entriesLet;
}
