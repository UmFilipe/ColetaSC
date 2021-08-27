import * as React from "react"
import { View, Animated, TouchableOpacity, Alert, StyleSheet, ScrollView, Linking } from 'react-native' 
import { Card,
    Divider,
    TextInput,
    Text,
    Title,
    Paragraph,
    Button,
    List,
    FAB,
    IconButton, } from 'react-native-paper'
import firebase from 'firebase'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Link } from '@react-navigation/native';
import darkColors from "react-native-elements/dist/config/colorsDark"
import { color } from "react-native-elements/dist/helpers"

export default class pointList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            pointList: [],
        };
    }
    async componentDidMount() {
        await
        this.getData();
    }

    getData = async () => {

        const db = firebase.firestore()
        const pointsRef = db.collection('collectPoints');
        const snapshot = await pointsRef.get();
        var vetorTemp = []

        if (snapshot.empty) {
        console.log('Sem documentos correspondentes');
        return;
        }
        snapshot.forEach(doc => {
            vetorTemp.push({
                id: doc.id,
                nome: doc.data().nome,
                tipoResiduos: doc.data().tipoResiduos,
                latitude: doc.data().localizacao.latitude,
                longitude: doc.data().localizacao.longitude,
            })
            this.setState({ pointList: vetorTemp })
          });
    };
    

    filtrar = () => {
        let novoPoint = this.state.pointList.filter(
            (item) => item.nome.length > 4
        );

        this.setState({ pointList: novoPoint });
    };

    
    remover = (id) => {
        var pointRef = firebase.firestore().collection("collectPoints").doc(id);
        pointRef.delete().then(() => {
        }).catch((error) => {
            console.log(error);
        });
        this.getData();
    };

    pesquisar = async (text) => {
        if (text != '') {
            const newArray = this.state.pointList.filter((item) => {
                const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
                const textDado = text.toUpperCase();
                return itemDado.indexOf(textDado) > -1;
            });
            this.setState({
                pointList: newArray,
                search: text,
            });
        } else {
            await this.getData();
            this.setState({ search: null });
        }

    }

        rightActions = (progress, dragX, vetorPoint) => {
            const scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [0.7, 0]
            })

            return (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Remover ponto",
                                "Deseja realmente remover o ponto?",
                                [
                                    {
                                        text: "Cancelar",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => this.remover(vetorPoint.id) }
                                ]
                            );
                        }
                        }
                    >
                        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                            <Animated.Text
                                style={{
                                    color: 'white',
                                    paddingHorizontal: 10,
                                    fontWeight: '600',
                                    transform: [{ scale }]
                                }}>
                                Deletar
                        </Animated.Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Adicionar Ponto de Coleta", {
                                point: vetorPoint
                            });
                        }}
                    >
                    </TouchableOpacity>
                </>
            )
        }
    
    render() {
        return (
            <ScrollView style={{width: '100%'}}>
                <View style={{marginTop: 30}}>
                <TextInput
                    style={{borderRadius: 8, borderColor:'#a4eddf', backgroundColor: '#efefef',}}
                    label="Pesquisar"
                    value={this.state.search}
                    onChangeText={(text) => this.pesquisar(text)}
                />
                <Card>
                    <Card.Content>
                        <List.Section>
                            <List.Subheader style={styles.topText}>Listagem de Pontos de Coleta</List.Subheader>

                            {this.state.pointList?.map((item, i) => (
                                <>
                                    <Swipeable
                                        renderRightActions={(progress, dragX) => {
                                            let vetorPoint = {
                                                id: item.id,
                                                nome: item.nome,
                                                tipoResiduos: item.tipoResiduos,
                                                latitude: item.latitude,
                                                longitude: item.longitude,
                                            };

                                            return this.rightActions(progress, dragX, vetorPoint)
                                        }}>
                                        <Divider />
                                        <Title>{item.nome},</Title> 
                                        <Title style={{fontSize: 15}}>Tipo de resíduo coletado:</Title>
                                        <Paragraph>{item.tipoResiduos}</Paragraph>
                                        <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <IconButton icon="map-marker-radius" color={"#7c7aff"} size={15} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`)}/><Paragraph style={{color:"#7c7aff", fontSize:15 }} onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`)}> Ir para o Google Maps</Paragraph>
                                        </View>
                                        <Paragraph></Paragraph>
                                        <Divider />
                                    </Swipeable>
                                </>
                            ))}
                        </List.Section>
                    </Card.Content>
                </Card>
                </View>
                <View>
                <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => this.props.navigation.navigate('Adicionar Ponto de Coleta')}
            />
            </View>
            </ScrollView>
        );
}

}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27AE60'
    },

    topText: {
        fontSize: 18
    },
});