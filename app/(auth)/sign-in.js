import { StyleSheet, Text, View, ScrollView,Image ,Alert} from 'react-native'
import React, {  useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../Components/FormField'
import CustomButton from '../../Components/CustomButton'
import {Link ,router} from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form,setform]= useState({
    email:'',
    value:''
  })

  const [issubmitting, setissubmitting] = useState(false)

  const submit = async ()=>{
    if( !form.email || !form.password ){
      Alert.alert('error', 'please fill in all the fields')
    } 
    setissubmitting(true);
      try {
        await signIn(form.email, form.password);
          // set it to global state

          router.replace('/home')
      } catch (error) {
        Alert.alert('Error',error.message)
      } finally{
        setissubmitting(false);
      }
    }
  return (
    <SafeAreaView className="bg-primary h-full">
  <ScrollView>
    <View className="justify-center w-full min-h-[75vh] px-4 my-6">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />
      <Text
        className="text-2xl text-white font-semibold mt-10 font-psemibold"
      >
        Login to Aora
      </Text>

      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setform({ ...form, email: e })}
        otherStyles="mt-7"
        keyboardType="email-address"
      />
           <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setform({ ...form, password: e })}
        otherStyles="mt-7"
        // keyboardType="email-address"
      />
      <CustomButton 
        title='Sign In'
        handlePress={submit}
        containerStyles="mt-7"
        isloading={issubmitting}
      />
      <View className="justify-center pt-5 flex-row gap-2">
       <Text className="text-lg text-white font-pregular">
        Don't have  account?
       </Text>
      <Link href="/sign_up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
      </View>
    </View>
  </ScrollView>
</SafeAreaView>

  )
}

export default SignIn

const styles = StyleSheet.create({})