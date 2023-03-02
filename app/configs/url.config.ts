const urlsConfig = {
  apiUrl: 'http://192.168.43.167:8000',
  user: {
    login: '/auth/login',
    logout: '/user/logout',
    register: '/user/register',
    getCurrent: '/user/@me',
  },
  vehicle: {
    create: '/vehicle',
    get: '/vehicle',
    update: '/vehicle/information',
    updatePoint: '/vehicle/point',
  },
};

export default urlsConfig;
