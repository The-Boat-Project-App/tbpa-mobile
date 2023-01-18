import { useState, useEffect } from 'react'
import { View, Dimensions, StyleSheet, Text, Image } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useReactiveVar } from '@apollo/client'
import { boatLocationVar } from '../../variables/boatLocation'
import { useGetAllPartnersQuery } from '../../graphql/graphql'
import LoadingView from '@components/LoadingView/LoadingView'
import { useNavigation, useIsFocused } from '@react-navigation/native'

interface MapScreenProps {}

const MapScreen: React.FunctionComponent<MapScreenProps> = ({}) => {
  const isFocused = useIsFocused()

  // const size = useWindowDimensions()
  // const { width, height } = size

  const [region, setRegion] = useState({})
  const [isMapReady, setIsMapReady] = useState(false)
  const { data: partnersData, refetch: refetchPartnersData } = useGetAllPartnersQuery()

  const boatLocationInApollo = useReactiveVar(boatLocationVar)
  const onMapReady = () => {
    setIsMapReady(true)
  }

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
      {isFocused && (
        <MapView
          initialRegion={{
            latitude: boatLocationInApollo.latitude,
            longitude: boatLocationInApollo.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          style={styles.map}
          onMapReady={() => onMapReady()}
        >
          <Marker
            coordinate={{
              latitude: boatLocationInApollo.latitude,
              longitude: boatLocationInApollo.longitude,
            }}
            title='Emplacement actuel du bateau'
            description={`${boatLocationInApollo.name} - Latitude: ${boatLocationInApollo.latitude}  Longitude : ${boatLocationInApollo.longitude}`}
            image={require('../../assets/icons/sailboat.png')} //uses relative file path.
          />
          {/* <Callout>
            <View className=' m-4 h-180'>
              <Text className='flex items-center justify-center font-raleway text-deepBlue'>
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 8,
                  }}
                  source={{
                    uri: 'https://res.cloudinary.com/matthieudev/image/upload/c_scale,w_584/v1670249453/Capture_d_e%CC%81cran_2022-12-05_a%CC%80_15.10.21_uzufxq.png',
                    width: 200,
                    height: 200,
                  }}
                  resizeMode='cover'
                />
                {'\n'}
                {`Emplacement actuel : ${boatLocationInApollo.name}`} {'\n'}
                {`Latitude : ${boatLocationInApollo.latitude}`}
                {'\n'}
                {`Longitude : ${boatLocationInApollo.longitude}`} {'\n'}
              </Text>
            </View>
          </Callout> */}

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
                  <View className=' m-4 h-180'>
                    <Text className='flex items-center justify-center font-ralewayBold text-deepBlue'>
                      {/* <Image
                      style={{
                        height: 120,
                        width: 120,
                        borderRadius: 8,
                      }}
                      source={{
                        uri: partnerItem.logo,
                        width: 80,
                        height: 80,
                      }}
                      resizeMode='cover'
                    /> */}
                      {/* <Image
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 8,
                        marginLeft: 10,
                      }}
                      source={{
                        uri: partnerItem.main_picture,
                        width: 150,
                        height: 150,
                      }}
                      resizeMode='cover'
                    /> */}
                      {'\n'}
                      {`${partnerItem.name.FR}`} {'\n'}
                      {`${partnerItem.city}, ${partnerItem.country}`} {'\n'}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            )
          })}
        </MapView>
      )}
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
