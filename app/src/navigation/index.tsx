import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import TicketFindScreen from '../screens/TicketFindScreen';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import ServicesScreen from '../screens/ServicesScreen';
import { useAppSelector } from '../../hooks/redux.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { storageHelper } from '../helpers';
import { setToken } from '../../utils/axios.util';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  const controlToPhoneStorage = async () => {
    try {
      const token = await storageHelper.getStorageKey("@token");
      if (!token) return;
      setToken(token);

      // @me isteği gönder

    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (!userState.isAuthenticated)
      controlToPhoneStorage();
  }, [])
  const userState = useAppSelector((state) => state.user);

  return (
    <Stack.Navigator initialRouteName='Root'>
      {
        userState.isAuthenticated ? (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='Services' component={ServicesScreen} options={{}} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )
      }
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="TicketFind"
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}>
      <BottomTab.Screen
        name="TicketFind"
        component={TicketFindScreen}
        options={({ navigation }: RootTabScreenProps<'TicketFind'>) => ({
          title: 'Bilet Bul',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="highway" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="Travel"
        component={TabTwoScreen}
        options={{
          title: 'My Travels',
          tabBarIcon: ({ color }) => <FontAwesome5 name="map-marked-alt" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name='user' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}