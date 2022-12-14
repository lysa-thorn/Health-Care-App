import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../const/url.json';

const CommentEdit = ({ route, navigation }) => {
    const { item } = route.params;
    const [input, setInput] = useState({});
    useEffect(() => {
        setInput({
            comment: item.comment,
        });
    }, [])

    const onChangeComment = (value) => {
        setInput({ ...input, comment: value });
    };


    ///////////////////////////
    // Update comment
    const updateComment = async () => {
        const formdata = new FormData();
        formdata.append('comment', input.comment);
        formdata.append('user_id', item.user_id);
        formdata.append('material_id', item.material_id);

        let requestOptions = {
            method: 'post',
            body: formdata,
            redirect: 'follow'
        };
        fetch(`${url.base_url}/update-comment/${item.id}`,requestOptions)
            .then((response) => {
                response.text();
                // navigation.push('MaterialDetail',{item})
                console.log(item)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(value) => onChangeComment(value)}
                value={input.comment}
            />
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={updateComment}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel} onPress={() =>navigation.goBack() }>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default CommentEdit;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    row: {
        flexDirection: 'row',
    },
    textInputStyle: {
        backgroundColor: "#E8E4E4",
        padding: 10,
        borderColor: '#000',
        borderRadius: 10,
        width: '100%',

    },
    button: {
        marginTop: 10,
        padding: 13,
        backgroundColor: 'blue',
        width: 70,
        borderRadius: 10,
        marginRight: 7,
    },
    cancel: {
        marginTop: 10,
        padding: 13,
        backgroundColor: 'red',
        width: 70,
        borderRadius: 10,
        marginRight: 7,
    }
});