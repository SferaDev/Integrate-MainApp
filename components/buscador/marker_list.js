import React from 'react';
import MapView from 'react-native-maps';
import MarkerImage from '../../Images/marker60.png';

const renderMarkers = (props) => {

    const renderMarker = (e, i) => {
        return (
            <MapView.Marker
                key={e.id}
                identifier={'' + e.id + ''}
                onPress={() => props.onMarkerClick(i)}
                image={MarkerImage}
                coordinate={{
                    latitude: e.coordinates[1],
                    longitude: e.coordinates[0],
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                pinColor="red"
            />
        );
    };
    return props.items.map(renderMarker);
};

const MarkerList = props => {
    return renderMarkers(props);
};

export default MarkerList
