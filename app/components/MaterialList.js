import React, { useState, useEffect } from 'react';
import url from '../url.json';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar ,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    SearchBar,
    Touchable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const VideoItem = ({navigation}) => {

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
           <View>
           <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />

            <TouchableOpacity 
            onPress={() => navigation.navigate('CreateMaterialScreen')}  
            >
                <Text style={styles.buttonMaterial}>Add Material</Text>
            </TouchableOpacity>
           </View>
        
            
            <ScrollView style={styles.scrollView}>
            {
                product.map((value,index) =>(
                  
                    <View style={styles.card} key={index}>
                        <Image source={{ uri: value.image }} style={{ height: 200 }} />
                        <View style={styles.descContainer}>
                            <Image source={{ uri: value.image}} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <View style={styles.videoDetails}>
                                <Text numberOfLines={2} style={styles.videoTitle}>{value.name}</Text>
                                <Text numberOfLines={1} style={styles.videoStats}>{value.description}</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name="more-vert" size={20} color="#999999" />
                            </TouchableOpacity>
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
      scrollView: {
        marginHorizontal: 20,
      },
    card:{
        backgroundColor:'#ccc'
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
    textInputStyle:{
        backgroundColor: "#E8E4E4",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor:'#000',
        borderRadius:10,
        marginLeft:20,
        width:'90%'
    },
    buttonMaterial:{
        backgroundColor: "#12b069",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor:'#000',
        borderRadius:10,
        marginLeft:20,
        marginBottom: 15,
        width:'30%'
    }

});
export default VideoItem;
