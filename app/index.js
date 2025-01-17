import { StatusBar } from 'expo-status-bar';
import {  ScrollView, Text, View ,Image} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../Components/CustomButton';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isloading,isloggedin} =useGlobalContext();
  if (!isloading && isloggedin) 
    return <Redirect href="/home" />
  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={{height: '100%'}}>
      <View className=" min-h-[85vh] w-full  items-center px-4">
        <Image  
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode='contain'
        />
        <Image 
          source={images.cards}
          className=" max-w-[380px] w-full h-[300px]"
          resizeMode='contain'
        />
        <View className='relative mt-5'>
          <Text className="text-3xl text-white font-bold text-center ">
            Discover Endless Possibilities with{' '}
            <Text className='text-secondary-200'>Aora</Text>
          </Text>
          <Image  source={images.path}
            className='w-[350px] h-[15px] abosolute  -right-20'
            resizeMode='contain'
          />
        </View>
        <Text className=' text-sm font-pregular text-gray-100 mt-7 text-center'>
        Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
        </Text>
        
        <CustomButton 
          title="Continue with Email"
          handlePress={() => router.push('./sign-in')}
          continerStyles="w-full mt-7"
        />
      </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' style='light' />
     { /*<Link href='/home' style={{color : 'blue'}}>Go to home</Link> */} 
      
     </SafeAreaView>
  );
}


