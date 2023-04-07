import { Input, Text,Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackScreenProps } from '../../types';
import Layout from '../../constants/Layout';
import { COLORS } from '../../constants';
import { useInputState } from '../../hooks/forms.hook';
import GLOBAL_STYLES from '../../constants/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { settingsActions } from '../redux/settings/slice';
import { companyService } from '../../service';
import { ReduxRootType } from '../../types/redux-slice.type';
import { userActions } from '../redux/user/slice';

const CreateCompanyScreen = ({navigation,route}:RootStackScreenProps<'CreateCompany'>) => {
    
    const nameInputState = useInputState();
    
    const userState = useAppSelector((state:ReduxRootType) => state.user);
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        try {
            dispatch(settingsActions.setLoading({ isLoading: true, content: 'Loading...' }));
            const {data} = await companyService.createCompany({name:nameInputState.value});
            dispatch(userActions.setUser({
                ...userState.user,
                companyId:data.id
            }));
            navigation.navigate("Root");
        }  catch (error: any) {
            if (typeof error.response?.data.message === "string") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message }));
            } else if (typeof error.response?.data.message === "object") {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.response.data.message[0] }));
            } else {
                dispatch(settingsActions.setErrorSnackbar({ isError: true, content: error.message }));
            }
        } finally {
            dispatch(settingsActions.setLoading({ isLoading: false, content: undefined }));
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{ width:Layout.window.width * 0.8, textAlign: 'center' }} category='h1'>Create Your Company</Text>
            <View style={styles.cardContainer}>
                <View style={styles.formContainer}>
                    <Input 
                        style={nameInputState.isFocus ? GLOBAL_STYLES.focusInput : GLOBAL_STYLES.input}
                        placeholder='Company Name'
                        accessoryLeft={<MaterialCommunityIcons name='office-building' size={20} />}
                        {...nameInputState}
                    />
                    <Button onPress={handleSubmit} style={styles.submitButton}>
                        CREATE
                    </Button>
                </View>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    cardContainer: {
        width: Layout.window.width * 3 / 4,
        height: Layout.window.height * 1 / 4,
        backgroundColor: COLORS['danger-100'],
        marginTop: 60,
        borderRadius: 20,
        flexDirection: 'column'
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderRadius: 30,
        padding: 20,
        margin:5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    submitButton: {
        backgroundColor: COLORS['success-400'],
        width: '100%',
        borderWidth: 0,
        elevation: 4
    },
})

export default CreateCompanyScreen;