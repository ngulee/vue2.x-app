export function formatDateMethod (data, fmt) {
  let regYear = /y+/;
  if (regYear.test(fmt)) {
    fmt = fmt.replace(regYear, data.getFullYear() + '');
  };
  let obj = {
    'M+': data.getMonth() + 1,
    'd+': data.getDay(),
    'h+': data.getHours(),
    'm+': data.getMinutes()
  };
  for (let key in obj) {
    let regData = new RegExp(`${key}`);
    if (regData.test(fmt)) {
      let str = obj[key] + '';
      fmt = fmt.replace(regData, () => {
        if (str.length < 2) {
          return padLeftZero(str);
        }
        return str;
      });
    }
  }
  return fmt;
}

function padLeftZero (string) {
  return ('00' + string).substr(string.length);
};

