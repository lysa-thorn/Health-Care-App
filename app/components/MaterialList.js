import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar ,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default VideoItem = () => {

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);


    const fetchProduct = async () => {
        try {
            const response = await fetch(
                'https://3810-45-201-199-61.ap.ngrok.io/api/materials'
            );

            const getProduct = await response.json();
            setProduct(getProduct.materials);
            setFilterData(getProduct.materials);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            {
                product.map((value,index) =>(
                  
                    <View style={styles.card} key={index}>
                        <Image source={{ uri: value.image }} style={{ height: 200 }} />
                        <View style={styles.descContainer}>
                            <Image source={{ uri: value.image}} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <View style={styles.videoDetails}>
                                <Text numberOfLines={2} style={styles.videoTitle}>{value.name}</Text>
                                <Text style={styles.videoStats}>{value.description}</Text>
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
        paddingTop: StatusBar.currentHeight,
      },
      scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
    card:{
        backgroundColor:'#ccc'
    },
    descContainer: {
        flexDirection: 'row',
        paddingTop: 15
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
    }

});