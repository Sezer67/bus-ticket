import { Modal, Text } from '@ui-kitten/components'
import React, { FC } from 'react'
import { Alert, PermissionsAndroid, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Layout from '../../../constants/Layout'
import { COLORS } from '../../../constants'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import HtmlView from '../HtmlView'
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing'

type PropsType = {
    html: string;
    isVisible: boolean;
    setVisible: (value: boolean) => void;
    handleCloseNavigate?: () => void;
}

const BillTicketModal:FC<PropsType> = ({html,isVisible,setVisible,handleCloseNavigate}) => {

  const handleClose = () => {
    setVisible(false)
    if(handleCloseNavigate){
      handleCloseNavigate();
    }
  }

    const handleDonwload = async () => {
        const file = await printToFileAsync({
          html,
          base64: false
        });

        await shareAsync(file.uri, {dialogTitle: "Share", mimeType: 'application/pdf', });
    }

  return (
    <Modal style={styles.container} backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }} visible={isVisible}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Tickets You Bought</Text>
            <TouchableOpacity onPress={handleClose}>
                <FontAwesome name="close" size={16} color={"black"} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <HtmlView html={html} />
        </ScrollView>
        <View style={{justifyContent:'center',alignItems:'center',marginVertical: 20}}>
            <TouchableOpacity style={styles.downloadButton} onPress={handleDonwload}>
                <AntDesign name='sharealt' size={20} color={COLORS.dark} />
                <Text style={{fontSize: 14, fontWeight: '600', color: COLORS.dark, marginLeft: 10}}>SHARE</Text>
            </TouchableOpacity>
        </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
    container: {
        width: Layout.window.width * 4 / 5,
        height: Layout.window.height * 0.75,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 5,
        zIndex:999
    },
    header: {
        width: '100%',
        backgroundColor: COLORS['danger-400'],
        height: 50,
        elevation: 3,
        borderBottomWidth:1,
        borderBottomColor: COLORS.gray,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal: 20
    },
    headerText: {
        color: COLORS.dark,
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 0.5
    },
    downloadButton: {
        borderWidth: 1,
        borderColor: COLORS.dark,
        borderRadius: 6,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: '80%',
        height: 40
    }
})
export default BillTicketModal