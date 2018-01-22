function requestFile(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              callback(null, xhr.response)
          } else {
              callback(xhr.status, null)
          }
      }
  }
  xhr.open('get', url, true)
  xhr.send();
}