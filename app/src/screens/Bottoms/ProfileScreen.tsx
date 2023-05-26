import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { COLORS, images } from '../../../constants';
import { Text, ViewPager } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import Layout from '../../../constants/Layout';
import UserDetailForm from '../../components/Forms/UserDetailForm';
import ChangePasswordForm from '../../components/Forms/ChangePasswordForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { ReduxRootType } from '../../../types/redux-slice.type';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { setToken } from '../../../utils/axios.util';
import { storageHelper } from '../../helpers';
import { userActions } from '../../redux/user/slice';
import { userEnums } from '../../../enums';
import { complainService } from '../../../service';
const ProfileScreen = ({ navigation, route }: RootTabScreenProps<'Profile'>) => {
  const [activePageIndex, setActivePageIndex] = useState<0 | 1>(0);

  const userState = useAppSelector((state: ReduxRootType) => state.user);
  const dispacth = useAppDispatch();

  const handleLogout = async () => {
    try {
      setToken('');
      await storageHelper.setStorageKey('@token', '');
      dispacth(userActions.logOut());
    } catch (error) {
      console.log(error);
    }
  };
  const getNotReadComplainsCount = async () => {
    try {
      const { data } = await complainService.getNotReadCount();
      console.log(data);
      dispacth(userActions.setNotReadComplainsCount({ count: data.count }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      title: userState.user.fullName,
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 20 }}>
          <MaterialIcons size={24} name="logout" />
        </TouchableOpacity>
      ),
    });
    const focusListener = navigation.addListener('focus', () => {
      getNotReadComplainsCount();
    });
    return focusListener;
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={[styles.tabBarContainer]}>
          <TouchableOpacity
            onPress={() => setActivePageIndex(0)}
            style={[styles.tabBar, activePageIndex === 0 && styles.activeTab]}
          >
            <Text style={activePageIndex === 0 && styles.activeText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActivePageIndex(1)}
            style={[styles.tabBar, activePageIndex === 1 && styles.activeTab]}
          >
            <Text style={activePageIndex === 1 && styles.activeText}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <ViewPager
          style={{ flex: 1, marginBottom: 20 }}
          selectedIndex={activePageIndex}
          onSelect={(index) => setActivePageIndex(index as never)}
        >
          <View style={styles.tabContainer}>
            <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Image
                style={styles.profileImage}
                borderRadius={100}
                resizeMethod="resize"
                resizeMode="cover"
                source={images.plane}
              />
              <Text category="h4">
                {
                  Object.keys(userEnums.Role).filter(
                    (key) => userEnums.Role[key as keyof typeof userEnums.Role] === userState.user.role,
                  )[0]
                }{' '}
                Account
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('ReportList')} style={styles.complainsContainer}>
                {userState.notReadComplainsCount ? (
                  <View style={styles.complainBadge}>
                    <Text style={styles.badgeText}>{userState.notReadComplainsCount}</Text>
                  </View>
                ) : null}
                <Ionicons name="ios-warning" size={24} color={COLORS.dark} />
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <UserDetailForm isEdit isDisable />
            </View>
          </View>
          <View style={styles.tabContainer}>
            <ChangePasswordForm />
          </View>
        </ViewPager>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tabBarContainer: {
    width: Layout.window.width,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopColor: COLORS.light,
    borderBottomColor: COLORS.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tabBar: {
    width: Layout.window.width / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  activeTab: {
    backgroundColor: COLORS['danger-400'],
  },
  activeText: {
    color: COLORS.light,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    elevation: 2,
  },
  tabContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  complainsContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: COLORS.disabledColor,
    borderRadius: 10,
  },
  complainBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS['danger-500'],
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '300',
    color: COLORS.light,
  },
});

export default ProfileScreen;
