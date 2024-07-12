import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isloading }) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl h[58px]  justify-center items-center min-w-[327] m-[10px] ${containerStyles}
    ${isloading ? 'opacity-50':''}`}
    disabled={isloading}>
      <Text className={`text-primary font-psemibold text-lg m-[12px] ${textStyles}`}>
      {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

