'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,  
  DeviceEventEmitter
} from 'react-native';
import Beacons        from 'react-native-beacons-android';

class A5yncRNBeacons extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      // region information
      // Estimote uuid = "B9407F30-F5F8-466E-AFF9-25556B57FE6D";
      // RadiusNetworks uuid = "2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6";
      // uuidRef: '6665542b-41a1-5e00-931c-6a82db9b78c1',
      //uuidRef: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      uuidRef: '2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6',
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    //
    // ONLY non component state aware here in componentWillMount
    //
    Beacons.detectIBeacons();

    const uuid = this.state.uuidRef;
    Beacons
      .startRangingBeaconsInRegion(
        'REGION1',
        uuid
      )
      .then(
        () => console.log('Beacons ranging started succesfully')
      )
      .catch(
        error => console.log(`Beacons ranging not started, error: ${error}`)
      );
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //
    // Ranging:
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });
      }
    );
  }

  componentWillUnMount(){
    this.beaconsDidRange = null;
  }

  render() {
    const { dataSource } =  this.state;
    return (
<View style={styles.header}>
      <Text style={styles.headline}>
          Our beacons in the area:
        </Text>
      <View style={styles.container}>
        
        <ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
       </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          XDistance: {rowData.distance ? rowData.distance : 'NA'}m
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 0,
    //justifyContent: 'space-between',
    //alignItems: 'flex-start',
    backgroundColor: '#F5FCFF'

  },
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 0,
    //justifyContent: 'space-between',
    //alignItems: 'flex-start',
    backgroundColor: '#F5FCFF'

  },
  btleConnectionStatus: {
    // fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
    alignSelf: 'stretch'
    //order:1
  },
  row: {
    //padding: 8,
    //paddingBottom: 16,
    //order:2,
    flex: 1,
    backgroundColor: 'gray',
    alignSelf: 'stretch'

  },
  smallText: {
    fontSize: 11
  }
});

AppRegistry.registerComponent(
  'A5yncRNBeacons',
  () => A5yncRNBeacons
);

