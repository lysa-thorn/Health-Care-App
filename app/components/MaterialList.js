import React, { useState, useEffect } from 'react';
import url from '../const/url.json';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MaterialList = ({ navigation }) => {
    const [product, setMaterail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);

    const fetchProduct = async () => {
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
            const response = await fetch(url.base_url + '/materials',settings);
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

    const deleteMaterial = async (id) => {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        const settings = {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData.access_token,
            }
        };
        fetch(`${url.base_url}/materials/${id}`,settings)
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
            .then(() => {
                navigation.push('MaterialList')
            })
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
          <View style={{ flexDirection: 'row', marginLeft: 20,marginTop:6, marginBottom:6 }}>
               <TouchableOpacity onPress={()=>navigation.navigate('AddMaterial')}>
                   <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}>
                       <Text style={{ color: 'white', textAlign: 'center' }}>
                            <Icon name="add" size={30} />
                       </Text>
                   </View>
               </TouchableOpacity>
           </View>

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
                                        <Icon name="edit" onPress={()=>navigation.navigate('EditMaterial', {item:value})} size={30} color="#0000FF" />
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
        marginTop: 12,
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
    editInput: {
        backgroundColor: "#E8E4E4",
        padding: 10,
        marginVertical: 8,

        borderColor: '#000',
        borderRadius: 10,

    },

    menuButton: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginVertical: 8,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 25
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 23,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'black',
    },

    // modal edit
    editInput: {
        backgroundColor: "#E8E4E4",
        padding: 10,
        marginVertical: 8,

        borderColor: '#000',
        borderRadius: 10,

    },

    menuButton: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginVertical: 8,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 25
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 23,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'black',
    }



});
export default MaterialList;
