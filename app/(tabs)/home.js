import { FlatList, StyleSheet, Text, View,Image, RefreshControl } from 'react-native'
import React,{ useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../Components/SearchInput'
import Trendig from '../../Components/Trendig'
import EmptyState from '../../Components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../Components/VideoCard'
const Home = () => {
  const { data : posts ,refetch} =useAppwrite(getAllPosts);
  const { data : latestPosts } =useAppwrite(getAllPosts);

  const [refreshing, setrefreshing] = useState(false)
   
  const onRefresh =async()=>{ 
    setrefreshing(true);
    await refetch();  
    //recall  videos
    setrefreshing(false);
  }


  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
       data={posts}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({item})=>(
          <VideoCard
            video={item}
           // thumbnail={item.thumbnail}
            //video={item.video}
            //creator={item.creator.username}
            //avatar={item.creator.avatar}
          />


        )}  
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
          <View className="justify-between item-start flex-row mb-6"> 
          <View>
            <Text className="font-pmedium text-sm text-white">Welcome Back</Text>
            <Text className="text-2xl font-psemibold text-white">Umair</Text>
          </View>
            <View className="mt-1.5">
              <Image 
                source={images.logo}
                className="w-9 h-10"
                resizeMode='contain'
              />
            </View>
          </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8 ">
              <Text className="text-white text-lg font-pregular mb-3">Latest videos</Text>
              <Trendig 
              posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
            title= "Be the fist one to upload the video"
            subtitle="No videos found"
            />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})