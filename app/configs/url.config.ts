const urlsConfig = {
  apiUrl: 'http://192.168.1.17:8000',
  user: {
    login: '/auth/login',
    logout: '/user/logout',
    register: '/user/register',
    getCurrent: '/user/@me',
  },
};

export default urlsConfig;
