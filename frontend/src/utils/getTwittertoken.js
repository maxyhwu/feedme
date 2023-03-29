export const onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        console.log(user)
      }
    });
  };

export const onFailed = (error) => {
    alert(error);
};