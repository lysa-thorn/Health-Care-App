import React, { useState, useEffect } from 'react';
import url from '../const/url.json';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    RefreshControl,
    StatusBar,
    Text,
    View,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    SearchBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditMaterail from './EditMaterail';
const Stack = createNativeStackNavigator();

const MaterialList = ({ navigation }) => {

    const [product, setMaterail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);


    const fetchProduct = async () => {
        try {
            const response = await fetch(
                url.base_url + '/materials'
            );

            const getProduct = await response.json();
            setMaterail(getProduct.materials);
            setFilterData(getProduct.materials);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }

    };

    const deleteMaterial = (id) => {
        fetch(`${url.base_url}/materials/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();
            })
            .then(
                (result) => {
                    
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = filterData.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setMaterail(newData);
            setSearch(text);
        } else {
            setMaterail(filterData);
            setSearch(text);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />

            <ScrollView style={styles.scrollView}>
                {
                    product.map((value, index) => (

                        <View style={styles.card} key={index}>
                            <TouchableOpacity onPress={()=>navigation.navigate('MaterialDetail', {item:value})}>
                                <Image source={{ uri: value.image }} style={{ height: 200 }} />
                            </TouchableOpacity>
                            <View style={styles.descContainer}>
                                <Image source={{ uri: value.user.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                <View style={styles.videoDetails}>
                                    <Text numberOfLines={2} style={styles.videoTitle}>{value.name}</Text>
                                    <Text numberOfLines={1} style={styles.videoStats}>{value.description}</Text>
                                </View>
                                <View style={styles.rightNav}>
                                    <TouchableOpacity>
                                        <Icon name="edit" size={30} color="#0000FF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteMaterial(value.id)}>
                                        <Icon name="delete" size={30} color="#FF0000" />
                                    </TouchableOpacity>                                    
                                </View>

                            </View>
                        </View>

                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rightNav: {
        flexDirection: 'row'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: '#ccc',
        marginBottom:10,
    },
    descContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
    },
    videoTitle: {
        fontSize: 16,
        color: '#3c3c3c'
    },
    videoDetails: {
        paddingHorizontal: 15,
        flex: 1
    },
    videoStats: {
        fontSize: 15,
        paddingTop: 3
    },
    textInputStyle: {
        backgroundColor: "#E8E4E4",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: '#000',
        borderRadius: 10,
        marginLeft: 20,
        width: '90%'
    },

    menuButton: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
    },


});
export default MaterialList;
