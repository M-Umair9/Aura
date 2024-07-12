import { StyleSheet, Text, View, ScrollView,Image, Alert } from 'react-native'
import React, {  useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../Components/FormField'
import CustomButton from '../../Components/CustomButton'
import {Link, router} from 'expo-router'
import {createUser} from '../../lib/appwrite'

const signUp = () => {
  const [form,setform]= useState({
    username:'',
    email:'',
    value:''
  })

  const [issubmitting, setissubmitting] = useState(false);

  const submit = async ()=>{
    if(!form.username || !form.email || !form.password ){
      Alert.alert('error', 'please fill in all the fields')
    } 
    setissubmitting(true);
      try {
          const result= await createUser(form.email, form.password, form.username);
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
    <View className="justify-center w-full min-h-[82vh] px-4 my-6">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />
      <Text
        className="text-2xl text-white font-semibold mt-10 font-psemibold"
      >
        Signup to Aora
      </Text>

      <FormField
        title="username"
        value={form.username}
        handleChangeText={(e) => setform({ ...form, username: e })}
        otherStyles="mt-10"
      />
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
        title='Sign Up'
        handlePress={submit}
        containerStyles="mt-7"
        isloading={issubmitting}
      />
      <View className="justify-center pt-5 flex-row gap-2">
       <Text className="text-lg text-white font-pregular">
       Have an account already?
       </Text>
      <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
      </View>
    </View>
  </ScrollView>
</SafeAreaView>

  )
}

export default signUp

const styles = StyleSheet.create({})