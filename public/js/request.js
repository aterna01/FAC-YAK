const requestFunction = (method, url, callBack, data) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      callBack(result);
    }
  };
  xhr.open(method, url, true);
  xhr.send(data);
};
