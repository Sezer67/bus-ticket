import { ticketFindEnums } from '../../enums';
import { ReactNode } from 'react';

export type TabItemType = {
  name: string;
  id: ticketFindEnums.TabEnum;
  icon: string;
  image: string;
  ticketType: TicketType;
  routeIcon: TicketRouteLineIcon;
  submitButtonText: string;
};
export type TicketType = 'bus' | 'plane' | 'train';
export type TicketRouteLineIcon = 'highway' | 'airport' | 'language-ruby-on-rails';
