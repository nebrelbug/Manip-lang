function requestFile(path) {
var httpRequest;
var retrievedFile;
//generate parameter can either be true or false depending on whether to generate an Ast for the file
  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = storeContents;
    httpRequest.open('GET', path);
    httpRequest.send();
  }

  function storeContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        retrievedFile = httpRequest.responseText;
        console.log(httpRequest.responseText);
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }
    makeRequest();
    return retrievedFile;
}//end of requestFile
