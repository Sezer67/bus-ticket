const urlsConfig = {
  apiUrl: 'http://192.168.1.103:8000',
  user: {
    login: '/auth/login',
    logout: '/user/logout',
    register: '/user/register',
    getCurrent: '/user/@me',
    changePassword: '/user/change-password',
  },
  vehicle: {
    create: '/vehicle',
    get: '/vehicle',
    update: '/vehicle/information',
    updatePoint: '/vehicle/point',
  },
  service: {
    baseCreate: '/base-service',
    baseServiceLookupMe: '/base-service/@me',
    multipleCreate: '/service',
  },
};

export default urlsConfig;
