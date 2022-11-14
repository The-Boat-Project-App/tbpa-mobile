import { useState, useEffect } from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useReactiveVar } from '@apollo/client'
import { boatLocationVar } from '../../variables/boatLocation'
import { useGetAllPartnersQuery } from '../../graphql/graphql'
import LoadingView from '@components/LoadingView/LoadingView'
import { useNavigation } from '@react-navigation/native'

interface MapScreenProps {}

const MapScreen: React.FunctionComponent<MapScreenProps> = ({}) => {
  const navigation = useNavigation()

  // const size = useWindowDimensions()
  // const { width, height } = size

  const [region, setRegion] = useState({})
  const { data: partnersData, refetch: refetchPartnersData } = useGetAllPartnersQuery()

  const boatLocationInApollo = useReactiveVar(boatLocationVar)
  useEffect(() => {
    ;(async () => {
      // console.log(await getCoordinate())
    })()
  }, [])

  const getInitialState = () => {
    return {
      region: {
        latitude: 43.3,
        longitude: 8.4,
        latitudeDelta: 12,
        longitudeDelta: 12,
      },
    }
  }

  const onRegionChange = (region) => {
    setRegion({ region })
  }

  if (!partnersData) {
    return <LoadingView />
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: boatLocationInApollo.latitude,
          longitude: boatLocationInApollo.longitude,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: boatLocationInApollo.latitude,
            longitude: boatLocationInApollo.longitude,
          }}
          title='Emplacement actuel du bateau :'
          description={`${boatLocationInApollo.name}  ${boatLocationInApollo.latitude} ${boatLocationInApollo.longitude}`}
          image={require('../../assets/icons/sailboat.png')} //uses relative file path.
        />

        {partnersData?.PartnersList.map((partnerItem, index) => {
          return (
            <Marker
              key={index}
              pinColor={'#0C617D'}
              title={partnerItem.name.FR}
              coordinate={{
                latitude: partnerItem.latitude,
                longitude: partnerItem.longitude,
              }}
            >
              <Callout>
                <View>
                  <Text
                    onPress={() => {
                      navigation.navigate('Partner', { partnerId: partnerItem.id })
                    }}
                  >
                    {partnerItem.name.FR}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
