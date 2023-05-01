export const getGoogleUrl = (from, redirect_uri, clientID) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  
    const options = {
      redirect_uri: redirect_uri,
      client_id: clientID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: from,
    };
  
    const qs = new URLSearchParams(options);

    console.log(`${rootUrl}?${qs.toString()}`)
  
    return `${rootUrl}?${qs.toString()}`;
  };
  
  