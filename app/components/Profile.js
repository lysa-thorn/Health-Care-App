import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../const/url.json';

const Profile = ({navigation}) => {
    const [getProfile,setProfile] = useState({});
    const fetchData = async () => {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        const settings = {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData.access_token,
            }
        };

        try {
            const response = await fetch(url.base_url + '/profile',settings);
            const profile = await response.json();
            setProfile(profile);

        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={{margin:20}} onPress={() => navigation.navigate('MaterialList')}>
                <Icon name="arrow-back" size={30} />
            </TouchableOpacity> */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: getProfile.image,
                        }}
                    />

                    <Text style={styles.name}>{getProfile.fullname}</Text>
                    <Text style={styles.userInfo}>{getProfile.phone}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.btnPro}>
                    <TouchableOpacity>
                        <Text style={{ 
                            color: '#000', 
                            textAlign: 'center',
                            padding:10,
                            fontSize:20,
                            fontWeight:"600"
                            }}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#DCDCDC',
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: '#778899',
        fontWeight: '600',
    },
    body: {
        backgroundColor: '#778899',
        height: 500,
    },
    btnPro:{
        backgroundColor:'blue',
        borderRadius:10,
    }
});

export default Profile;