import * as React from "react";

import {
    Text,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    View,
    TouchableOpacity
} from "react-native";
import BaseScreen from "../base-screen";

function Cadastrar() {
    return (
        <BaseScreen>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.content}>
                    <Text style={styles.titulo}>Cadastrar</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        placeholder="username"
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="email"
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="visible-password"
                        placeholder="senha"
                    />
                    <TouchableOpacity>
                        <Text style={styles.botao_cadastrar}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.voltar_login}>{"<-- "}Voltar para o login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </BaseScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16
    },
    content: {
        width: "100%"
    },
    titulo: {
        fontFamily: "Courier Prime",
        lineHeight: 32,
        fontSize: 24
    },
    input: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
        width: "100%",
        fontFamily: "Courier Prime",
        lineHeight: 24,
        fontSize: 16,
        marginTop: 32,
        paddingVertical: 16
    },
    botao_cadastrar: {
        marginTop: 24,
        color: "white",
        backgroundColor: "black",
        padding: 16,
        fontFamily: "Courier Prime",
        lineHeight: 24,
        fontSize: 16
    },
    voltar_login: {
        lineHeight: 24,
        fontSize: 16,
        fontFamily: 'Courier Prime',
        paddingVertical: 16
    }
});

export default Cadastrar;
