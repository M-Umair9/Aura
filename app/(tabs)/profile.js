import { FlatList, StyleSheet, Image  , TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../Components/EmptyState'
import {  getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import InfoBox from '../../Components/infoBox'
import  VideoCard from "../../Components/VideoCard";
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import { router } from 'expo-router'

const Profile = () => {
  const {user,setUser,setIsLogged}=useGlobalContext();
  const { data : posts } =useAppwrite(()=>
    getUserPosts(user.$id)
);
const logout=async()=>{
  await signOut();
  setUser(null)
  setIsLogged(false)
  router.replace('/sign-in') //maybe sign_In
}
 return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
       data={posts}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({item})=>(
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />

        )}  
        ListHeaderComponent={()=>(
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
             <TouchableOpacity className="w-full items-end mb-10"
              onPress={logout}>
                <Image source={icons.logout}
                  resizeMode='contain'
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image source={{uri:user?.avatar}}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode='cover'
                />
              </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
            </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
            title= "No Videos found for this search query"
            subtitle="No videos found"
            />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})