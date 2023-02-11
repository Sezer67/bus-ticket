import { images } from '../../constants';
import { ticketFindEnums } from '../../enums';
import { ticketFindTypes } from '../types';

export const TabItems: ticketFindTypes.TabItemType[] = [
  {
    id: ticketFindEnums.TabEnum.Bus,
    name: 'Bus',
    icon: 'bus',
    image: images.bus,
    ticketType: 'bus',
    routeIcon: 'highway',
    submitButtonText: 'GET ON',
  },
  {
    id: ticketFindEnums.TabEnum.Plane,
    name: 'Plane',
    icon: 'plane',
    image: images.plane,
    ticketType: 'plane',
    routeIcon: 'airport',
    submitButtonText: 'FLY',
  },
  {
    id: ticketFindEnums.TabEnum.Train,
    name: 'Train',
    icon: 'train',
    image: images.train,
    ticketType: 'train',
    routeIcon: 'language-ruby-on-rails',
    submitButtonText: 'CHUFF CHUFF',
  },
];
