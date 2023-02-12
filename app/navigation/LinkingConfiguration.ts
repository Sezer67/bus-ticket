/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TicketFind: {
            screens: {
              TicketFind: 'TicketFind',
            },
          },
          Travel: {
            screens: {
              Travel: 'Travel',
            },
          },
          Profile: {
            screens: {
              Profile: 'Profile',
            },
          },
        },
      },
      TicketFind: 'ticket-find',
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
