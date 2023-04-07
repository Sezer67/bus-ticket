import { Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../../types';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const MyCompanyScreen = ({ navigation, route }: RootTabScreenProps<'MyCompany'>) => {

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];

    return (
        <View style={styles.container}>
            <Text>My Company Screen</Text>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MyCompanyScreen;