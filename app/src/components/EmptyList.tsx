import { Text } from '@ui-kitten/components'
import { View, Image } from 'react-native'
import { images } from '../../constants'
import Layout from '../../constants/Layout'

const EmptyList = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: Layout.window.height / 5 }}>
            <Image resizeMode='cover' source={images.empty} />
            <Text category='h4'>No data exist</Text>
        </View>
    )
}

export default EmptyList;