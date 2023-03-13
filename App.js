import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const [multipleFile, setMultipleFile] = useState([]);

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }

      setMultipleFile(results);
      console.log("",results)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
     
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'grey',
            height: 2,
            marginTop: 10,
          }}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectMultipleFile}
        >
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick multiple files
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        <ScrollView>

          {multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    width: 200,
    borderWidth: 5,
    borderRadius: 16,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
