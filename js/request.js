const Urls = {
  GET: 'https://24.javascript.pages.academy/keksobooking/data',
  POST: 'https://24.javascript.pages.academy/keksobooking1',
};

const request = (onSuccess, onError, method, body) => {
  fetch(Urls[method], {
    method: method,
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onError();
    });
};

export { request };
