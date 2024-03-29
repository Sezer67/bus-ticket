const urlsConfig = {
  apiUrl: 'http://192.168.1.100:8000',
  user: {
    login: '/auth/login',
    logout: '/user/logout',
    register: '/user/register',
    getCurrent: '/user/@me',
    changePassword: '/user/change-password',
  },
  company: {
    create: '/company',
    get: '/company',
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
    findTicket: '/service/find',
    buyTicket: '/service/ticket-buy',
    myTravels: '/service/travels/@me',
    vote: '/service/vote',
  },
  payment: {
    ticketBuy: '/pay/ticket-buy',
  },
  complain: {
    create: '/complain',
    notReadCount: '/complain/not-read-count',
    changeToRead: '/complain/read',
    createAnswer: '/complain/answer',
    getMyComplains: '/complain/@me'

  }
};

export default urlsConfig;
