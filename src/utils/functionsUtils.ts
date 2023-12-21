export function handleFinishFailed(error, setMsgErros) {
  let erros = [];
  for (const err of error.errorFields) {
    erros = [...erros, ...err.errors];
  }

  if (erros.length) {
    setMsgErros(erros);
  }
}

export function handleErros(strMensagens, setMsgErros) {
  if (strMensagens) {
    setMsgErros(strMensagens.split("\n"));
  } else {
    setMsgErros([]);
  }
}

export const isValidCPF = (data: string) => {
  const strCPF = data.replace(/\D/g, "");
  let Soma;
  let Resto;
  Soma = 0;

  if (
    strCPF.length !== 11 ||
    strCPF == "00000000000" ||
    strCPF == "11111111111" ||
    strCPF == "22222222222" ||
    strCPF == "33333333333" ||
    strCPF == "44444444444" ||
    strCPF == "55555555555" ||
    strCPF == "66666666666" ||
    strCPF == "77777777777" ||
    strCPF == "88888888888" ||
    strCPF == "99999999999"
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

export const generateUUID = () => {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export const convertGMSToDec = (coord: string) => {
  if (!coord) return;
  var gms = coord.toString();
  var sinal = gms[0] === "S" || gms[0] === "W" ? "-" : "+",
    gmsDados = gms.match(/([0-9]\.?)+/g),
    graus = Number(gmsDados[0]),
    minutos = Number(gmsDados[1]),
    segundos = Number(gmsDados[2]),
    parteInteira = graus,
    parteDecimal =
      minutos + segundos > 0
        ? (minutos / 60 + segundos / 3600 + "").split(".")[1]
        : "00",
    resultado = Number(sinal + parteInteira + "." + parteDecimal).toFixed(5);
  if (isNaN(+resultado)) {
    throw "Não é uma coordenada válida!";
  }
  return +resultado;
};

export const convertDecToGMS = (dec: number, type: 'latitude' | 'longitude') => {
  if (isNaN(dec)) {
    throw 'Não é uma coordenada válida!';
  }

  let sinal = '';
  if (dec < 0) {
    sinal = type === 'latitude' ? 'S' : 'W';
    dec = Math.abs(dec);
  } else {
    sinal = type === 'latitude' ? 'N' : 'E';
  }

  const graus = Math.floor(dec);
  const minutosFloat = (dec - graus) * 60;
  const minutos = Math.floor(minutosFloat);
  const segundos = (minutosFloat - minutos) * 60;

  return `${graus}°${minutos}'${segundos.toFixed(2).replace('.', ',')}"${sinal}`;
}

export const parseToPascalCase = (str: string) => {
  if (!str) return null;
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

export const clearCpf = (str: string) => {
  if (!str) return null
  return str.replace(/\D/g, "")
}

export const clearCep = (str: string) => {
  if (!str) return null
  return str.replace(/\D/g, "")
}

export const uppercase = (value: string) => {
  if (!value) return null
  if (value) {
    return value.toUpperCase()
  }
}

export const normalizePhoneNumber = (phoneNumber) => {
  if(!phoneNumber) return null
  
  const normalizedNumber = phoneNumber.replace(/\D/g, '');
  return normalizedNumber;
}

export const advancedFilterSelect = (inputValue, option) => {
  const inputValueClean = inputValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const optionClean = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return optionClean.includes(inputValueClean);
}

export const maskOnlyNumbersCustom = value => {
  if(!value) return null
  return value.replace(/[^0-9-,.]/g, "")
}

export const maskOnlyNumbers = value => {
  if(!value) return null
  return value.replace(/[^0-9]/g, "");
}


function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error)
      );
    } else {
      reject("Geolocalização não é suportada pelo seu navegador.");
    }
  });
}

async function fetchUserLocation() {
  try {
    const position = await getLocation();
    const resData = {
      data: position,
      success: true,
      message: "Localização obtida com sucesso."
    }
    return resData;
  } catch (error) {
    const err = `Erro ao obter localização: ${error.message}`
    const resData = {
      data: null,
      success: false,
      message: err
    }
    return resData;
  }
}

export async function checkLocationPermission() {
  try {
    const permissionStatus = await navigator.permissions.query({ name: "geolocation" });

    if (permissionStatus.state === "granted") {
      const res = await fetchUserLocation();
      return res
    } else if (permissionStatus.state === "prompt") {
      const res = await fetchUserLocation();
      return res
    } else {
      const resData = {
        data: null,
        success: false,
        message: "Acesso à localização foi negado."
      }
      return resData;
    }
  } catch (error) {
    const resData = {
      data: null,
      success: false,
      message: `Erro ao verificar permissão de localização: ${error.message}`
    }
    return resData;
  }
}

export const formatarDocumento = (documento) => {
  if(!documento) return "";
  if(documento.length === 11){
    return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }
  if(documento.length === 14){
    return documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }
  return documento;
}

export const isNetworkError = (error) => {
  return error.message === 'Network Error';
};

export const isTimeoutError = (error) => {
  return error.code === 'ECONNABORTED' || error.message.includes('timeout');
};

export const isServerError = (error) => {
  return error && error.errorCode >= 500 && error.errorCode < 600;
};

export const convertBlobToBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};