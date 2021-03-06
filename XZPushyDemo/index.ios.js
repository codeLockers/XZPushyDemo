/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';

// import UpdateConfig from './update.json'
// 
// 

import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

// // const {appkey} = UpdateConfig[Platform.OS]
// 
// 
// import _updateConfig from './update.json';
// const {appKey} = _updateConfig[Platform.OS];

const appkey = 'RkrxKJYw6Vh8DJi_Ac1h8yK1gbFXAs1f'

export default class XZPushyDemo extends Component {


  componentWillMount(){


    if (isFirstTime) {
      Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
        {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
        {text: '否', onPress: ()=>{markSuccess()}},
      ]);
    } else if (isRolledBack) {
      Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
    }

  }

  _check(){
      checkUpdate(appkey).then(info => {
      
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本')
      } else if (info.upToDate) {
        Alert.alert('提示', '您的应用版本已是最新.');
      } else {
         Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
          {text: '是', onPress: ()=>{this.doUpdate(info)}},
          {text: '否',},
        ]);
      }

    }).catch(error => {
      Alert.alert('提示','更新失败')
    })
  }

  doUpdate = info => {
    downloadUpdate(info).then(hash => {
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {text: '是', onPress: ()=>{switchVersion(hash);}},
        {text: '否',},
        {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
      ]);
    }).catch(err => { 
      Alert.alert('提示', '更新失败.');
    });
  };


  render() {

    return (
      <TouchableWithoutFeedback onPress={this._check.bind(this)}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
         xuzhang what a hansome man !! YES i agree ，HaHa~~~
        </Text>
        <Text style={styles.instructions}>
          xuzhang i love you 
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('XZPushyDemo', () => XZPushyDemo);
