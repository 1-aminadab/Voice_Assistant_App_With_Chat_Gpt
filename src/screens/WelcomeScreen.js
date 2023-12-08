import { View, Text, Image, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
export default function WelcomeScreen() {
    const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 flex bg-white justify-around ">
      <View className="space-y-2">
        <Text style={{fontSize:wp(10)}} className="text-center text-4xl font-bord text-gray-700">SentiTron</Text>
        <Text style={{fontSize:wp(4)}} className="text-center tracking-wider text-gray-700 font-semibold">
            The Future is here, Powerd by AI
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image source = {require('../../assets/images/welcome.png')} style={{width:wp(75), height:wp(75)}} />
      </View>
      <TouchableOpacity onPress = {()=>navigation.navigate('Home')}  className="bg-emerald-600 mx-5 p-4 rounded-2xl">
        <Text style={{fontSize:wp(6)}} className="text-center font-bold text-white text-2xl">Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView >
  )
}