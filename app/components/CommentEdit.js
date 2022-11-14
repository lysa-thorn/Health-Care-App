import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native';
const CommentEdit = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item);
    return(
        <View style={styles.container}>
            <TextInput
            style={styles.textInputStyle}
            multiline={true}
            // onChangeText={(commentText) => getComment(commentText)}
            numberOfLines={3}
            value={item.comment}
            placeholder="Comment"
            />
            <View style={styles.row}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{textAlign: 'center', color: 'white'}}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel}>
                    <Text style={{textAlign: 'center', color: 'white'}}>Cancel</Text>
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