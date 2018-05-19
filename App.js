import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    openCamera: false,
    photo: 'Image',
    comments: 'Add Comments Here...',
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, openCamera } = this.state;
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
                  this.setState({
                    openCamera: false,
                    photo: this.camera.takePictureAsync()
                  });
                }}>
                <Text style={{ fontSize: 18, margin: 10, color: 'white' }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    openCamera: false,
                    photo: {}
                  });
                }}>
                <Text style={{ fontSize: 18, margin: 10, color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 100 }}>
          <View>
            <Text>{this.state.photo}</Text>
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
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(comments) => this.setState({ comments })}
            value={this.state.comments}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'gray', padding: 10, margin: 10, borderRadius: 5 }}
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