import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react';
import {icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';
  
const FormField = ({title,value,placholder,handleChangeText,otherStyles, ...props}) => {
  const [ showpassword, setshowpassword] = useState( false );
  return (
    
    <View className={` space-y-2 ${otherStyles}`}>
      <Text className= "text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus: border-secondary items-center flex-row"> 
      
      <TextInput 
       className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
       secureTextEntry = { title === 'Password' ? !showpassword : null } 
     /> 

     {title === 'Password' && (
      <TouchableOpacity
      onPress={()=>
        setshowpassword (!showpassword)}
          >
            <Image 
            source={!showpassword ? icons.eye :icons.eyeHide}
            className="w-6 h-6"
            resizeMode='contain'
             />
          </TouchableOpacity>
     )}
     </View>
  
    </View>
  ) 
}

export default FormField

const styles = StyleSheet.create({})