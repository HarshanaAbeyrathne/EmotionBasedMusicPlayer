import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import TrackPlayer, { State } from 'react-native-track-player';


import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from '../model/data';



const{width , height} = Dimensions.get('window');

const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(songs);
    } catch (error) {
      console.error('Error setting up player:', error);
    }
  }
  

const togglePlayback = async(plabackState) =>{
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if(currentTrack != null){
        if (plabackState = State.Paused){
            await TrackPlayer.play();
        }
        else{
            await TrackPlayer.pause();
        }
    }
}

const MusicPlayer = () => {
    // const plabackState = usePlaybackState();
    // const progress = useProgress();

    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);
    const songSlider = useRef(null);
    const skipTo = async(trackId) =>{
        await TrackPlayer.skip(trackId);
    }

    useEffect(() => {
        const initializePlayer = async () => {
          await setupPlayer();
          scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            skipTo(index);
            setSongIndex(index);
          });
        };
      
        initializePlayer();
      
        return () => {
          scrollX.removeAllListeners();
        };
      }, []);
      
    const skipToNext = ()=>{
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        })
    }
    const skipToBack = ()=>{
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        })
    }

    const songsRender =({index, item}) => {
        return(
            <Animated.View style={styles.songScroler}>
                <View style={styles.songImageWrapper}>
                    <Image 
                        source={item.image}
                        style={styles.songImage}
                    />
                </View>
            </Animated.View>
        );
    }
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.maincontainer}>
            <View style={{width: width}}>
            <Animated.FlatList
            ref={songSlider}
                data={songs}
                renderItem={songsRender}
                keyExtractor={(item)=>item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent:{
                        contentOffset: {x: scrollX}
                    }}],
                    {useNativeDriver: true}
                )}
                    
            />
            </View>
            <View>
                <Text style={styles.title}>{songs[songIndex].title}</Text>
                <Text style={styles.artist}>Song Artist Name</Text>
            </View>
            <View>
                <Slider
                    style={styles.soundBarContainer}
                    // value={progress.position}
                    minimumValue={0}
                    // maximumValue={progress.duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#FFFFFF"
                    onSlidingComplete={async(value)=>{
                        TrackPlayer.seekTo(value);
                    }}
                />
                <View style={styles.soundBarLableContainer}>
                    {/* <Text style={styles.soundBarLableText}>{new Date( progress.position * 1000). toISOString().substring(14, 5)}</Text>
                    <Text style={styles.soundBarLableText}>{new Date( progress.duration - progress.position * 1000). toISOString().substring(14, 5)}</Text> */}
                </View>
            </View>
            <View style={styles.musicPlayerControll}>
                <TouchableOpacity onPress={skipToBack}>
                    <Ionicons name='play-skip-back-outline' size={30} color= "#09e0d2" style={styles.musicPlayerSkipButtons}></Ionicons>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => togglePlayback(plabackState)}>
                    <Ionicons name={plabackState = State.Playing ? "pause-circle-outline" : "play-back-circle-outline" } size={50} color= "#09e0d2"></Ionicons>
                </TouchableOpacity> */}
                <TouchableOpacity >
                    <Ionicons name='pause-circle-outline' size={50} color= "#09e0d2"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext}>
                    <Ionicons name='play-skip-forward-outline' size={30} color= "#09e0d2" style={styles.musicPlayerSkipButtons}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>





        <View style={styles.bottomContainer}>
            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name='home-outline' size={30} color= "#ffff"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name='list-circle-outline' size={30} color= "#ffff"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name='search-outline' size={30} color= "#ffff"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name='ellipsis-horizontal' size={30} color= "#ffff"></Ionicons>
                </TouchableOpacity>
                
            </View>
        </View>
        </SafeAreaView>
    );
};
export default MusicPlayer;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#222831"
    },
    maincontainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer:{
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 15 
    },
    bottomButtons:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width:'80%'
    },
    songImageWrapper:{
        width: 300,
        height: 340,
        marginBottom: 25,
        elevation: 5,
    },
    songImage:{
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    title:{
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    artist:{
        fontSize: 16,
        fontWeight: '200',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    soundBarContainer:{
        width: 350, 
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    soundBarLableContainer:{
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    soundBarLableText:{
        color: '#ffff'
    },
    musicPlayerControll:{
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        marginTop: 15
    },
    musicPlayerSkipButtons:{
        marginTop: 9,
    },
    songScroler:{
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});