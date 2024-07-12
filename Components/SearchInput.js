import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react';
import {icons } from '../constants'
import { router, usePathname } from 'expo-router';
  
const SearchInput = ({initialQuery}) => {
  const pathname=usePathname()
  const [query, setquery] = useState(initialQuery || ""); 

  return (
    
    

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus: border-secondary items-center flex-row space-x-4"> 
      
      <TextInput 
       className="text-base mt-0.5 text-white flex-1  font-pregular"
        value={query}
        placeholder="Search for a video topics"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e)=>{setquery(e)}}
    
     /> 
        <TouchableOpacity
        onPress={()=>{
          if(!query){
            return Alert.alert('Missing query' ,"Please enter something to search across database")
            //maybe some warnings
          }
          if(pathname.startsWith('/search')) router.setParams({query})
          else
          router.push(`/search/${query} `)
        }}>
            <Image source={icons.search}
            className="w-5 h-5"
            resizeMode='contain' />
        </TouchableOpacity>
     </View>
  
   
  ) 
}

export default SearchInput

const styles = StyleSheet.create({})