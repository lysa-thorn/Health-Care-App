import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../const/colors";

const CustomInput = ({
    label,
    iconName,
    error,
    password,
    onFous = () => { },
    ...props
}) => {
    const [isFocused, setFocused] = useState(false);
    const [hidePwd, setHidePwd] = useState(password);

    return (
        <>
        <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>{label}</Text>
            
            <View style={[styles.inputContainer, {
                borderColor: error
                    ? COLORS.red : isFocused
                        ? COLORS.darkblue : COLORS.light
            }]}>
                <Icon name={iconName} style={{ fontSize: 22, color: COLORS.darkblue, marginRight: 10 }} />
                    <TextInput
                        secureTextEntry={hidePwd}
                        autoCorrect={false}
                        style={{ color: COLORS.darkblue, flex: 1 }}
                        onFocus={() => {
                            onFous();
                            setFocused(true);
                        }}
                        onBlur={() => {
                            setFocused(false);
                        }}
                        {...props} 
                    />
                    {password && <Icon
                        onPress={() => setHidePwd(!hidePwd)}
                        style={{fontSize: 22, color: COLORS.darkblue}}
                        name={hidePwd ? 'visibility' : 'visibility-off'}
                    />
                    }
                </View>
                {error &&
                    <Text
                        style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}
                    >
                        {error}
                    </Text>
                }
            </View>
        </>
    ) 
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 45,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderWidth: 0.5,
        alignItems: 'center',
        borderRadius: 5,
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.black,
    }
})

export default CustomInput;