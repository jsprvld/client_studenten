  function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LeOXIEpAAAAAE84Y6ftREyIFBZkDH-FKGcyzvzp', {action: 'LOGIN'});
    });
  }