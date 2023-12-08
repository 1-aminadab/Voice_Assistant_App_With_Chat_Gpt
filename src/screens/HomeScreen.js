import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Features from "../components/Features";
import { dummyMessages } from "../components/constants";
import Voice from '@react-native-community/voice'


export default function HomeScreen() {
  const [messages, setMessage] = useState(dummyMessages);
  const [recording, setRecording] = useState(true);
  const [speaking, setSpeaking] = useState(true)
  const clearMessages = ()=>{
    return setMessage([])
  }
    
  const onSpeechStartHandler = e=>{
    console.log('speach start handler',e);
        
  }
  const onSpeechEndHandler = e=>{
        console.log('speach end handler',e);
  }
  const onSpeechResultsHandler = e=>{
        console.log('voice event',e);
  }
  const onSpeechErrorHandleer= e=>{
        console.log('speach error handler',e);
  }
  const startRecording = async()=>{
    setRecording(true)
    try {
        
    } catch (error) {
        
    }
  }
  useEffect(()=>{
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandleer;
    return ()=>{
        Voice.destroy().then(Voice.removeAllListeners)
    }
  },[])
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex items-center">
          <Image
            source={require("../../assets/images/bot.png")}
            style={{ height: hp(15), width: hp(15) }}
          />
          {/* features || messages */}
          {messages.length > 0 ? (
            <View className="space-y-2 ">
              <Text
                style={{ fontSize: wp(5) }}
                className="text-gray-700 font-semibold ml-1"
              >
                Assistant
              </Text>
              <View
                style={{ height: hp(65), width: wp(90) }}
                className="bg-neutral-200 rounded-3xl p-4 "
              >
                <ScrollView
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}
                >
                  {messages.map((message, index) => {
                    if (message.role === "assistant") {
                      if (message.content.includes("http")) {
                        //ai assistance message
                        return (
                          <View key={index} className="flex-row justify-start">
                            <View className="flex justify-start bg-emerald-100 rounded-2xl p-2 rounded-tl-none">
                              <Image
                                source={{ uri: message.content }}
                                className="rounded-2xl"
                                resizeMode="contain"
                                style={{ height: wp(60), width: wp(60) }}
                              />
                            </View>
                          </View>
                        );
                      } else {
                        // ai text message
                        return (
                          <View key={index} className="flex-row justify-start">
                            <View
                              style={{ width: wp(70) }}
                              className="flex-row justify-start bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                            >
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        );
                      }
                    } else {
                      return (
                        <View key={index} className="flex-row justify-end">
                          <View
                            style={{ width: wp(70) }}
                            className="flex-row justify-end bg-white rounded-xl p-2 rounded-tr-none"
                          >
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
              <View className="flex justify-center items-center p-4">
              {
            speaking && 
                <TouchableOpacity
        
                className="bg-red-400 rounded-3xl p-2 absolute left-11 "
                >
                    <Text className="text-white font-semibold p-2">Stop</Text>
                </TouchableOpacity>
            
          } 
          {recording ? (
            <TouchableOpacity >
                
              <Image
                className="rounded-full"
                source={require("../../assets/images/voiceLoading.gif")}
                style={{ width: hp(12), height: hp(12) }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Image
                className="rounded-full"
                source={require("../../assets/images/recordingIcon.png")}
                style={{ width: hp(12), height: hp(12) }}
              />
            </TouchableOpacity>
          )}
          {
            messages.length > 0 && 
                <TouchableOpacity
                onPress={()=>clearMessages()}
                className="bg-neutral-400 rounded-3xl p-2 absolute right-11"
                >
                    <Text className="text-white font-semibold">Clear</Text>
                </TouchableOpacity>
            
          }
        </View>
            </View>
          ) : (
            <Features />
          )}
        </View>
      
      </SafeAreaView>
    </View>
  );
}
