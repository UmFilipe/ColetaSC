import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { FAB, BottomNavigation } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { loggingOut } from '../API/firebaseMethods'

export default class Dashboard extends Component {
    constructor(props){
      super(props)
      this.state = {
        pointData: [],
        firstName: ''
      }
    }

    async componentDidMount() {
      await this.getData();
  }

    getData = async () => {

      const db = await firebase.firestore()
      const pointsRef = db.collection('collectPoints');
      const snapshot = await pointsRef.get();
      var vetorTemp = [];

      if (snapshot.empty) {
        console.log('Sem documentos correspondentes');
        return;
        }
        snapshot.forEach(doc => {
          vetorTemp.push({ 
                id: doc.id,
                nome: doc.data().nome,
                latitude: doc.data().localizacao.latitude,
                longitude: doc.data().localizacao.longitude,
            })
            this.setState({ pointData: vetorTemp })
          }); 
    }

  handlePress = () => {
    navigation.navigate('Adicionar Ponto de Coleta')
  };

  render(){
    return(
<View style={styles.container}>

<MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
              latitude: -26.8900271,
              longitude: -52.4145824,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
          }}  
      >
        {this.state.pointData?.map((item, i) => (
          <Marker
          title={item.nome}
          coordinate={{latitude: item.latitude, longitude: item.longitude}}
          >
          </Marker>
        ))}
        
</MapView>
 <View>
      <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => { this.props.navigation.navigate('Adicionar Ponto de Coleta') }}
      />
  </View>
</View>

    )
  }
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },

  button: {
    width: 200,
    borderRadius: 15,
    backgroundColor: '#27AE60',
    padding: 5,
    margin: '2%'
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },

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

} 

)