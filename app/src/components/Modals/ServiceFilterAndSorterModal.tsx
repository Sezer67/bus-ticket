import { Modal, Text, ViewPager, Button, CheckBox } from '@ui-kitten/components';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../../../constants/Layout';
import { COLORS } from '../../../constants';
import { serviceTypes } from '../../../types/index';
import GLOBAL_STYLES from '../../../constants/Styles';

type PropsType = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  filterOptions: serviceTypes.ServiceScreenFilterOptionsType;
  setFilterOptions: (options: serviceTypes.ServiceScreenFilterOptionsType) => void;
  handleOk: () => void;
};

const ServiceFilterAndSorterModal: React.FC<PropsType> = ({
  isVisible,
  setIsVisible,
  filterOptions,
  setFilterOptions,
  handleOk
}) => {
  const [activePageIndex, setActivePageIndex] = useState(0);

  const handleCheckSeat = (plan: string, checked: boolean) => {
    setFilterOptions({
      ...filterOptions,
      seatingPlans: filterOptions.seatingPlans.map((eachPlan) => {
        if (eachPlan.seatingPlan === plan) {
          return {
            ...eachPlan,
            isSelected: checked,
          };
        }
        return eachPlan;
      }),
    });
  };

  const handleCheckCompany = (id: string, checked: boolean) => {
    setFilterOptions({
      ...filterOptions,
      companies: filterOptions.companies.map((company) => {
        if (company.id === id) {
          return {
            ...company,
            isSelected: checked,
          };
        }
        return company;
      }),
    });
  };

  return (
    <Modal
      style={styles.container}
      backdropStyle={styles.backdrop}
      visible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
    >
      <View style={[styles.tabBarContainer]}>
        <TouchableOpacity
          onPress={() => setActivePageIndex(0)}
          style={[styles.tabBar, activePageIndex === 0 && styles.activeTab]}
        >
          <Text style={activePageIndex === 0 && styles.activeText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActivePageIndex(1)}
          style={[styles.tabBar, activePageIndex === 1 && styles.activeTab]}
        >
          <Text style={activePageIndex === 1 && styles.activeText}>Sorter</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Filter Area */}
        <View style={{ ...styles.tabView, display: activePageIndex === 1 ? 'none' : 'flex' }}>
          <View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.dark }}>
              <Text style={{ ...Layout.FONTS.h2, marginLeft: 5, fontWeight: '600' }}>Companies</Text>
            </View>
            <FlatList
              style={{ marginLeft: 10, marginTop: 5, height: Layout.window.height * 0.2 }}
              data={filterOptions.companies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    status="danger"
                    checked={item.isSelected}
                    onChange={(checked) => handleCheckCompany(item.id, checked)}
                  >
                    <Text style={{ ...Layout.FONTS.body2 }}>{item.name}</Text>
                  </CheckBox>
                </View>
              )}
            />
          </View>
          <View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.dark }}>
              <Text style={{ ...Layout.FONTS.h2, marginLeft: 5, fontWeight: '600' }}>Seating Plans</Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <FlatList
                data={filterOptions.seatingPlans}
                keyExtractor={(item) => item.seatingPlan}
                renderItem={({ item }) => (
                  <View style={styles.checkBoxContainer}>
                    <CheckBox
                      status="danger"
                      checked={item.isSelected}
                      onChange={(checked) => handleCheckSeat(item.seatingPlan, checked)}
                    >
                      <Text style={{ ...Layout.FONTS.body2 }}>{item.seatingPlan}</Text>
                    </CheckBox>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        {/* Sorter Area */}
        <View style={{ ...styles.tabView, display: activePageIndex === 0 ? 'none' : 'flex' }}>
          <Text>Sorter</Text>
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
        <Button onPress={() => setIsVisible(false)} style={{ backgroundColor: COLORS.gray, borderWidth: 0, width:'49%' }}>Cancel</Button>
        <Button onPress={handleOk} style={{ backgroundColor: COLORS['danger-400'], borderWidth: 0, width:'49%' }}>Apply</Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (Layout.window.width * 4) / 5,
    height: Layout.window.height * 0.5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 5,
    zIndex: 999,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  tabBarContainer: {
    width: (Layout.window.width * 4) / 5 - 20,
    marginBottom: 10,
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
    width: ((Layout.window.width * 4) / 5 - 20) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  activeTab: {
    backgroundColor: COLORS['danger-400'],
  },
  activeText: {
    color: COLORS.light,
  },
  tabView: {
    width: Layout.window.width * 0.8 - 20,
  },
  checkBoxContainer: {
    marginBottom: 5,
  },
});

export default ServiceFilterAndSorterModal;
