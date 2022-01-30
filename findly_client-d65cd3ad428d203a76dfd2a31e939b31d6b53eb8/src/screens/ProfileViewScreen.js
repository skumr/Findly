import React, {useEffect, useState} from 'react'
import {View, ActivityIndicator, SafeAreaView, ScrollView} from 'react-native'
import {  Text, Image } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import {styles} from "../../styles";


export default function ProfileViewScreen({ user }) {
    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{backgroundColor: '#fff',}}>
                <Image source={userPic}
                       PlaceholderContent={<ActivityIndicator color="#A020F0"/>}
                       style={{resizeMode: 'contain', borderRadius: 20,}} />
                <View style={[{flex: 1}, styles.testView]}>
                    <View style={styles.textRow}>
                        <Text style={{textAlign: 'left', padding: 5, color:"black"}} h1>{user.name.first}</Text>
                        <Text style={{textAlign: 'left', padding: 5, color:"black"}} h2>{user.instrument}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <FontAwesome name="map-marker" size={20} color="white"></FontAwesome>
                        <Text style={{textAlign: 'left', padding: 5, color:"black"}} h3>{user.location.city}</Text>
                    </View>
                </View>
                user.bio?(
                    <View style={[{flex: 1}, styles.testView]}>
                        <Text style={{textAlign: 'center', padding: 5, color:"black"}} h4>
                            {user.bio}
                        </Text>
                    </View>
                )
                user.media.map((val, index) => {
                    <View style={[{flex: 1}, styles.testView]}>
                        (val.format == 'jpg' || val.format == 'png')?
                            <Image source={{uri: val.fileUri}}
                                   PlaceholderContent={<ActivityIndicator color="#A020F0"/>}
                                   style={{resizeMode: 'contain', borderRadius: 20,}} />:
                        (val.format == 'mp3')?
                    </View>
                });
            </ScrollView>
        </SafeAreaView>
    );
}
