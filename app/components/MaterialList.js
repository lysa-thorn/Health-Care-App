import React, { useState, useEffect } from 'react';
import url from '../url.json';
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

    TouchableOpacity,
    SearchBar,
    Alert,
    Modal,
    Pressable,
} from 'react-native';
import Icon, { Button } from 'react-native-vector-icons/MaterialIcons';



const VideoItem = () => {
    const [product, setMaterail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);


    const fetchProduct = async () => {
        try {
            const response = await fetch(
                url.base_url + '/api/materials'
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
        fetch(`${url.base_url}/api/materials/${id}`, {
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


    //////////
    // edit materail alert
    const [modalVisible, setModalVisible] = useState(false);
    const getMaterail = async () => {
        try {
          let response = await fetch('https://gorest.co.in/public-api/users');
          let json = await response.json();
          setUser(json.data);
        } catch (error) {
          console.error(error);
        }
      };


    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            {/* Modol to edit materail */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Materail Form </Text>
                        <View>
                            <TextInput
                                style={styles.editInput}
                                underlineColorAndroid="transparent"
                                placeholder="Materail Name"

                            />
                            <TextInput
                                style={styles.editInput}
                                underlineColorAndroid="transparent"
                                placeholder="Materail Image"

                            />
                            <TextInput
                                style={styles.editInput}
                                underlineColorAndroid="transparent"
                                placeholder="Materail Desciption"

                            />
                        </View>
                        <Text style={[styles.btn, styles.textStyle]}>Update</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* end modol edit materail */}
            <ScrollView style={styles.scrollView}>
                {
                    product.map((value, index) => (

                        <View style={styles.card} key={index}>
                            <Image source={{ uri: value.image }} style={{ height: 200 }} />
                            <View style={styles.descContainer}>
                                <Image source={{ uri: value.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                <View style={styles.videoDetails}>
                                    <Text numberOfLines={2} style={styles.videoTitle}>{value.name}</Text>
                                    <Text numberOfLines={1} style={styles.videoStats}>{value.description}</Text>
                                </View>
                                <View style={styles.rightNav}>
                                    <TouchableOpacity>
                                        <Icon name="edit" onPress={() => setModalVisible(true)} size={30} color="#0000FF" />
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
        backgroundColor: '#ccc'
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
export default VideoItem;
