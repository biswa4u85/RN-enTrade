import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    openCamera: false,
    photo: {},
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
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginLeft: 10, marginTop: 50, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  openCamera: false,
                  photo: this.camera.takePictureAsync()
                });
              }}>
              <Text style={{ fontSize: 18, margin: 10 }}>Save Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  openCamera: false,
                  photo: {}
                });
              }}>
              <Text style={{ fontSize: 18, margin: 10 }}>Cancel Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (

        <View style={{ flex: 1, marginTop: 100 }}>
          <View>
            {/* <Text>{this.state.photo}</Text> */}
            <TouchableOpacity
              style={{ margin: 20 }}
              onPress={() => {
                this.setState({
                  openCamera: true
                });
              }}>
              <Text>Take Photo</Text>
            </TouchableOpacity>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(comments) => this.setState({ comments })}
              value={this.state.comments}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({

                });
              }}>
              <Text style={{ fontSize: 18, margin: 10 }}>Save Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}