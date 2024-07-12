import { Account,Avatars,Client,Databases,ID, Query,Storage } from 'react-native-appwrite';

export const appwriteConfig=    {
     endpoint:'https://cloud.appwrite.io/v1',
     Platform:'com.umair.Aora',
     projectId:'668146d6003b0e8ca02e',
     databaseId:'668149bd0024c47dd336',
     userCollectionId:'668149fa00021e9dc061',   
     videoCollectionId:'66814a3600273c673cd7',
     storageId :'66814c3400152ecf5d8c '
}
// Init your React Native SDK
 export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.Platform) // Your application ID or bundle ID.
;
//make your request
const account = new Account(client);
//const storage =new Storages(client);
const databases= new Databases(client);
const avatars= new Avatars(client);

export const createUser = async (email,password,username)=> {
    try {
        const newAccount=await account.create(
        ID.unique(),
        email,
        password,
        username
        )
        if(!newAccount) throw Error;
        const avatarurl= avatars.getInitials(username);
        await signIn(email,password);
        const newUser=await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email:email,
                username:username,
                avatar: avatarurl
            }
        )
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
 export const signIn=async(  email,password) =>{
    try {
        const session= await account.createEmailPasswordSession(email,password)
        return session; 
    } catch (error) {
        throw new Error(error);
        
    }
 }
 export const getCurrentUser =async()=>{
    try {
        const currentAccount =await account.get();
        if(!currentAccount) throw Error;
        
        const currentUser=  await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if( !currentUser) throw Error;
       // return currentUser.documents[0];
    } catch (error) {
        console.log(error);
       // return null;
    }
 }
 export const getAllPosts= async()=>{
    try {
        const posts=await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,  
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
 }
 export const getLatestPosts= async()=>{
    try {
        const posts=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,  
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
 }
 export const searchPosts= async( query)=>{
    try {
        const posts=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,  
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
 }
 export const getUserPosts= async( userId)=>{
    try {
        const posts=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,  
            [Query.equal('creator', userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
 }
 export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }