import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Snackbar, TextInput, Button, Icon } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { addCollectPoint } from '../API/firebaseMethods';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class addCellectPoint extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //visible: false,
            id: null,
            nome: '',
            tipoResiduos: '',
            errorType: '',
            marker: null,
        }
    }
   

    async componentDidMount() {
        this.carrregarDados();
    }

    /*onToggleSnackBar = () => {
        this.setState({visible: !visible})
    }

    onDismissSnackBar = () => {
        this.setState({visible: false})
    }*/

    emptyState = () => {
        this.setState({
            nome: '',
            tipoResiduos: '',
            errorType: '',
            marker: { latitude: null, longitude: null }
        })
    }

    salvar = () => {

        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection('collectPoints').doc()
        .set({ 
          nome: this.state.nome,
          tipoResiduos: this.state.tipoResiduos,
          localizacao: this.state.marker
        })
          this.props.navigation.navigate('Dashboard');
          console.log(this.state.nome, this.state.tipoResiduos, this.state.marker)          
          this.emptyState();
      };

    carrregarDados() {
        let { route } = this.props;

        if (route.params) {
            let { pontoDeColeta } = route.params;

            if (pontoDeColeta.id != null) {
                this.setState({
                    id: pontoDeColeta.id,
                    nome: pontoDeColeta.nome,
                    tipoResiduos: pontoDeColeta.tipoResiduos,
                    marker: pontoDeColeta.marker
                })
                ;
            }
        }

    }

        render() { 

            return (
            <View style={styles.container}>
                <View style={styles.itemAlign}>
                <Text style={styles.topText}>
                    Insira os dados do ponto de coleta:
                </Text>
                </View>
                <TextInput
                    placeholder="Nome do Ponto de Coleta"
                    style={styles.inputText}
                    value={this.nome}
                    onChangeText={(text) => this.setState({ nome: text })}
            />
                <TextInput
                    placeholder="Tipo de resíduos"
                    style={styles.inputText}
                    value={this.state.tipoResiduos}
                    onChangeText={(text) => this.setState({ tipoResiduos: text })}
                    underlineColor='#27AE60'
            />
                    <View style={styles.itemAlign}>
                    <MapView style={styles.map} initialRegion={{
                        latitude: -26.8900271,
                        longitude: -52.4145824,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                    onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate })}>
                {
                    this.state.marker &&
                    <Marker coordinate={this.state.marker} />
                }
                    </MapView>
                    </View>
                <Button style={styles.buttonSave} mode="contained" onPress={() => this.salvar()}>
                    Salvar
                </Button>

                {/* <Snackbar visible={this.visible}
          onDismiss={this.onDismissSnackBar()}
          duration={5000}
          action={{
            label: 'x',
            onPress: () => {
            },
          }}
          theme={{
            colors: {
                onSurface: "#f0f0ee",
                surface: "#616161",
                accent: "#27AE60",
            },
          }}>
          {this.errortype}
          </Snackbar> */}

            </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },

    inputText: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#f0f0ee',
        borderRadius: 20,
        height: 26,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
        width: 750,
      },
    
    topText: {
        fontSize: 22,
    },

    map: {
        width: 500,
        height: 300,
        borderRadius: 20,
    },
    itemAlign: {
        alignItems: "center",  
    },
    buttonSave: {
        backgroundColor: "#27AE60"
        
    }
})
