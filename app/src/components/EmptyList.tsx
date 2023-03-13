import { Text } from '@ui-kitten/components'
import { View, Image } from 'react-native'
import { images } from '../../constants'
import Layout from '../../constants/Layout'

type PropsType = {
    text?: string;
    mt?: number;
    imageW?: number;
}

const EmptyList: React.FC<PropsType> = ({ text, mt, imageW }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: mt || Layout.window.height / 5 }}>
            <Image resizeMode='cover' source={images.empty} style={{ width: imageW || 246, height: imageW || 246 }} />
            <Text category='h4'>{text || "No data exist"}</Text>
        </View>
    )
}

export default EmptyList;