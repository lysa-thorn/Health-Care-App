import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import url from '../const/url.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment"

const MaterialDetail = ({ route, navigation }) => {

  const { item } = route.params;
  const [material, setMaterail] = useState([]);
  const [commentText, setCommentText] = useState([]);
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState({})

  const fetchMaterial = async () => {
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
      const response = await fetch(url.base_url + '/materials/' + item.id,settings);
      const getProduct = await response.json();
      setMaterail(getProduct.materail);
      setUser(getProduct.materail.user);
      setComment(getProduct.materail.comments)

    } catch (error) {
      console.error(error);
    }

  };

  const getComment = (commentText) => {
    setCommentText(commentText);

  };

  const addComment = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    fetch(`${url.base_url}/comments`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData.access_token,
      },
      body: JSON.stringify({
        comment: commentText,
        material_id: material.id,
        user_id: 1,

      })
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(() => {
        navigation.push('MaterialDetail', {item})
      })
  };
  
  const deleteComment = async (id) => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    fetch(`${url.base_url}/comments/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData.access_token,
      },
      body: JSON.stringify({
        comment: commentText,
        material_id: material.id,
        user_id: 1,

      })
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(() => {
        navigation.push('MaterialDetail',{item})
      })
  }
  useEffect(() => {
    fetchMaterial();

  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('MaterialList')}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity> */}
          <View style={styles.card}>
            <View style={styles.cardheader}>
              <Text style={styles.title}>
                {material.name}
              </Text>
            </View>
            <View style={styles.cardBody}>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: material.image,
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
                <Text style={styles.text}>{
                  
                  moment(material.created_at).format('LLLL')
                }</Text>
              </View>
              <View style={styles.des}>
                <Text style={styles.text}>
                  {
                    material.description
                  }
                </Text>

              </View>
            </View>

          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.textInputStyle}
              multiline={true}
              onChangeText={(commentText) => getComment(commentText)}
              numberOfLines={3}
              placeholder="Comment"
            />
            <TouchableOpacity onPress={() => addComment()}>
              <Icon name="arrow-circle-up" size={40} />
            </TouchableOpacity>
          </View>

          {
            comment.map((value, index) => (
              <View key={index}>
                <Text>{value.created_at}</Text>
                <View style={styles.comment}>
                  <Image source={{ uri: user.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                  <View style={styles.commentDescription}>
                    <Text style={styles.videoTitle}>{user.fullname}</Text>
                    <Text style={styles.videoTitle}>{value.comment}</Text>
                    <View style={styles.row}>
                      <TouchableOpacity onPress={() => navigation.navigate('CommentEdit', {item:value})} style={{marginRight: 10}}>
                        <Text style={{ color: "blue" }}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteComment(value.id)}>
                        <Text style={{ color: "red" }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                 
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 15,
  },
  scrollView: {
    marginHorizontal: 2,
  },
  row: {
    flexDirection: 'row'
  },
  comment: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
  },
  commentDescription: {
    paddingLeft: 10,
  },
  card: {
    padding: 5,
    marginTop: 5,
  },
  cardBody: {
    marginBottom: 15,
  },
  cardheader: {},
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600'
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
    marginLeft: 5,
    backgroundColor: '#04AA6D',
    width: '15%',
    textAlign: 'center',
    height: 40,
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#171717',
  },
  des: {
    marginTop: 10,
  },
  textBtn: {
    color: '#fff',
    padding: 5,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  textInputStyle: {
    backgroundColor: "#E8E4E4",
    padding: 10,
    borderColor: '#000',
    borderRadius: 10,
    width: '85%',
    marginBottom: 20,
  },
});

export default MaterialDetail;