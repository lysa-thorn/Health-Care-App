import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const MaterialDetail = ({ route,navigation }) => {
    const { item } = route.params;
    const materials ={
        title:item.name,
        image:item.image,
        des:item.description,
        createDate:item.created_at
    };

    const user ={
        fullname:item.user.fullname,
        image:item.user.image,
    }

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.btnBack} onPress={()=>navigation.navigate('MaterialList')}>
          <Text style={styles.textBtn}>{'Back'}</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.cardheader}>
            <Text style={styles.title}>
              {materials.title}
            </Text>
          </View>
          <View style={styles.cardBody}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: materials.image,
                }}
              />
            </View>
            <View>
                <Image
                  style={styles.imageProfile}
                  source={{
                    uri: user.image,
                  }}
                />
            </View>
            <View>
                <Text style={styles.text}>Author: {user.fullname}</Text>
                <Text style={styles.text}>Date: {materials.createDate}</Text>
            </View>
            <View style={styles.des}>
              <Text style={styles.text}>
                {
                  materials.des
                }
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
    },
    card: {
        padding: 5,
        marginTop: 20,
    },
    cardBody: {
        marginBottom: 30,
    },
    cardheader: {},
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight:'600'
    },
    text: {
        color: '#000',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    imageProfile: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 50,
        marginRight: 20,
    },
    btnBack: {
        marginTop: 10,
        padding: 3,
        marginLeft: 5,
        backgroundColor: '#04AA6D',
        width: 70,
        textAlign: 'center',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    des:{
        marginTop:10,
    },
    textBtn:{
        color:'#fff',
        padding:5,
        fontSize:16,
        fontWeight:'500',
        textAlign:'center'
    }
});

export default MaterialDetail;