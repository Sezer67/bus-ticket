import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { storageHelper } from '../helpers';
import { setToken } from '../../utils/axios.util';
import { userService } from '../../service';
import { userActions } from '../redux/user/slice';
import { ReduxRootType } from '../../types/redux-slice.type';
import { userEnums } from '../../enums';
import { COLORS } from '../../constants';
import { RootStackParamList, RootStackScreenProps, RootTabParamList, RootTabScreenProps } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/Bottoms/ProfileScreen';
import ServicesScreen from '../screens/Bottoms/ServicesScreen';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MyVehiclesScreen from '../screens/Bottoms/MyVehiclesScreen';
import MyServicesScreen from '../screens/Bottoms/MyServicesScreen';
import MyCompanyScreen from '../screens/Bottoms/MyCompanyScreen';
import TicketFindScreen from '../screens/Bottoms/TicketFindScreen';
import ModalScreen from '../screens/Modals/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabTwoScreen from '../screens/TabTwoScreen';


import GLOBAL_STYLES from '../../constants/Styles';
import AddVehicleScreen from '../screens/Modals/AddVehicleScreen';
import AddServiceScreen from '../screens/Modals/AddServiceScreen';
import AddServiceStepsScreen from '../screens/Modals/AddServiceStepsScreen';

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

  const dispacth = useAppDispatch();
  const userState = useAppSelector((state: ReduxRootType) => state.user);

  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const isSignedIn = useMemo(() => userState.isAuthenticated, [userState.isAuthenticated])

  const prepare = async () => {
    await SplashScreen.preventAutoHideAsync();
  }

  const controlToPhoneStorage = async () => {
    try {
      const token = await storageHelper.getStorageKey("@token");
      console.log("token: ", token);
      if (!token) return;
      setToken(token);
      const { data } = await userService.currentUser();
      dispacth(userActions.login({
        user: data,
        token
      }));

    } catch (error) {
      console.log(error);
    } finally {
      setAppIsReady(true);
    }
  }

  const hideSplash = async () => {
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    if (!userState.isAuthenticated)
      controlToPhoneStorage();
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady)
      hideSplash();
  }, [appIsReady])

  return (
    <Stack.Navigator initialRouteName='Root'>
      {
        isSignedIn ? (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='Services' component={ServicesScreen} options={{}} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Modal" component={ModalScreen} />
              <Stack.Screen name="AddVehicleModal" component={AddVehicleScreen} />
              <Stack.Screen name="AddServiceModal" component={AddServiceScreen} />
              <Stack.Screen name="AddServiceStepsModal" component={AddServiceStepsScreen} options={{ headerShown: false }} />
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

  const userState = useAppSelector((state: ReduxRootType) => state.user);

  const CompanyBottomNavigator = () => (
    <>
      <BottomTab.Screen
        name='MyVehicles'
        component={MyVehiclesScreen}
        options={({ navigation, route }: RootTabScreenProps<'MyVehicles'>) => ({
          title: 'My Vehicles',
          headerShadowVisible: true,
          headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddVehicleModal', { title: 'Create Vehicle' })} style={GLOBAL_STYLES.headerRightButtonContainer}>
              <Entypo name='add-to-list' color="black" size={24} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <FontAwesome5 name="bus" color={color} size={18} />
        })}
      />
      <BottomTab.Screen
        name='MyServices'
        component={MyServicesScreen}
        options={({ navigation }: RootTabScreenProps<'MyServices'>) => ({
          title: 'My Services',
          headerShadowVisible: true,
          headerStyle: GLOBAL_STYLES.transparentHeaderScreenContainer,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddServiceModal')} style={GLOBAL_STYLES.headerRightButtonContainer}>
              <Entypo name='add-to-list' color="black" size={24} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timetable" color={color} size={18} />
        })}
      />
      <BottomTab.Screen
        name='MyCompany'
        component={MyCompanyScreen}
        options={() => ({
          title: 'My Company',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="business-center" color={color} size={18} />
        })}
      />
    </>
  )
  const CustomerBottomNavigator = () => (
    <>
      <BottomTab.Screen
        name="TicketFind"
        component={TicketFindScreen}
        options={({ navigation }: RootTabScreenProps<'TicketFind'>) => ({
          title: 'Find Ticket',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="highway" color={color} size={18} />,

        })}
      />
      <BottomTab.Screen
        name="Travel"
        component={TabTwoScreen}
        options={{
          title: 'My Travels',
          tabBarIcon: ({ color }) => <FontAwesome5 name="map-marked-alt" color={color} size={18} />,
        }}
      />
    </>
  )
  // bilet bul sayfası company den kaldırılacak.
  // my travels company den kaldırılacak
  // bilet bul yerine araç oluştur eklenecek.
  // my travels => oluşturduğu seferler listelenecek (yoksa ekle gibi burda da olabilir)
  // my vehicles => araçları listelenecek

  return (
    <BottomTab.Navigator
      initialRouteName={userState.user.role === userEnums.Role.Company ? "MyVehicles" : "TicketFind"}
      screenOptions={{
        tabBarActiveTintColor: COLORS.light,
        tabBarActiveBackgroundColor: COLORS['danger-400']
      }}>
      {
        userState.user.role === userEnums.Role.Company ? CompanyBottomNavigator() : CustomerBottomNavigator()
      }
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name='user' color={color} size={18} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
