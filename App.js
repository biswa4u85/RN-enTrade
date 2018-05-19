import React from 'react';
import { Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';

export default class App extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    openCamera: false,
    photo: null,
    comments: '',
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  showImg() {
    if (this.state.photo) {
      return (
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.state.photo }}
        />
      )
    } else {
      return (
        <Text style={{ fontSize: 15, padding: 10 }}>No Image</Text>
      )
    }
  }

  render() {
    const { hasCameraPermission, openCamera } = this.state;
    let data = [{
      value: 'Type 01',
    }, {
      value: 'Type 02',
    }, {
      value: 'Type 03',
    }];

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (hasCameraPermission === true && openCamera === true) {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View style={{ flex: 10, flexDirection: 'row', backgroundColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 40, color: 'white' }}>Flip</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => {
                  if (this.camera) {
                    this.camera.takePictureAsync()
                      .then(data => {
                        this.setState({
                          openCamera: false,
                          photo: data.uri
                        });
                      })
                  }
                }}>
                <Text style={{ fontSize: 18, margin: 10, color: 'white' }}>Keep</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    openCamera: false,
                    photo: null
                  });
                }}>
                <Text style={{ fontSize: 18, margin: 10, color: 'white' }}>Discard</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
          <View>
            {this.showImg()}
            <TouchableOpacity
              style={{ backgroundColor: 'gray', padding: 10, marginTop: 5, borderRadius: 5 }}
              onPress={() => {
                this.setState({
                  openCamera: true
                });
              }}>
              <Text style={{ fontSize: 15, color: 'white' }}>Take Photo</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ width: 200 }}
          >
            <Dropdown
              label='Select Type'
              data={data}
            />
            <TextInput
              style={{ height: 40, borderColor: 'gray', padding: 10, borderWidth: 1 }}
              onChangeText={(comments) => this.setState({ comments })}
              value={this.state.comments}
            />
          </View>
          <TouchableOpacity
            style={{ backgroundColor: 'gray', padding: 10, margin: 10, borderRadius: 5, marginBottom: 100 }}
            onPress={() => {
              this.setState({

              });
            }}>
            <Text style={{ fontSize: 15, color: 'white' }}>Save Data</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}