import { images } from '../../../constants';
import { vehicleEnums } from '../../../enums';
import { ticketFindTypes } from '../types';

export const TabItems: ticketFindTypes.TabItemType[] = [
  {
    id: vehicleEnums.VehicleType.Bus,
    name: 'Bus',
    icon: 'bus',
    image: images.bus,
    ticketType: 'bus',
    routeIcon: 'highway',
    submitButtonText: 'GET ON',
  },
  {
    id: vehicleEnums.VehicleType.Plane,
    name: 'Plane',
    icon: 'plane',
    image: images.plane,
    ticketType: 'plane',
    routeIcon: 'airport',
    submitButtonText: 'FLY',
  },
  {
    id: vehicleEnums.VehicleType.Train,
    name: 'Train',
    icon: 'train',
    image: images.train,
    ticketType: 'train',
    routeIcon: 'language-ruby-on-rails',
    submitButtonText: 'CHUFF CHUFF',
  },
];
