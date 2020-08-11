import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function CreateEmplyee({ navigation, route }) {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "Name":
          return route.params.name;
        case "Phone":
          return route.params.phone;
        case "Email":
          return route.params.email;
        case "Salary":
          return route.params.salary;
        case "Picture":
          return route.params.picture;
        case "Position":
          return route.params.position;
      }
    }
    return "";
  };

  const [Name, setName] = useState(getDetails("Name"));
  const [Phone, setPhone] = useState(getDetails("Phone"));
  const [Email, setEmail] = useState(getDetails("Email"));
  const [Salary, setSalary] = useState(getDetails("Salary"));
  const [Picture, setPicture] = useState(getDetails("Picture"));
  const [Position, setPosition] = useState(getDetails("Position"));
  const [modal, setModal] = useState("false");
  //const [enableShift,setenableShift]=useState("false");
  const updateData = () => {
    fetch("http://ab200864a7d6.ngrok.io/update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: route.params._id,
        name: Name,
        email: Email,
        phone: Phone,
        salary: Salary,
        position: Position,
        picture: Picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is succefuly updated`);
        navigation.navigate("Home");
      })

      .catch((err) => {
        Alert.alert("Something went wrong");
      });
  };
  const submitData = () => {
    fetch("http://ab200864a7d6.ngrok.io/send-data", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: Name,
        email: Email,
        phone: Phone,
        salary: Salary,
        position: Position,
        picture: Picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is saved succefuly`);
        navigation.navigate("Home");
      })

      .catch((err) => {
        Alert.alert("Something went wrong");
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employeeApp");
    data.append("cloud_name", "melb");
    fetch("https://api.cloudinary.com/v1_1/melb/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
        setModal(false);
      });
  };
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.inputStyle}
        label="Name"
        value={Name}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Email"
        value={Email}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Phone Number"
        value={Phone}
        mode="outlined"
        theme={theme}
        keyboardType="number-pad"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Salary"
        value={Salary}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setSalary(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Position"
        value={Position}
        mode="outlined"
        theme={theme}
        onChangeText={(text) => setPosition(text)}
      />
      <Button
        style={styles.inputStyle}
        icon={Picture == "" ? "upload" : "check"}
        mode="contained"
        theme={theme}
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      {route.params ? (
        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => updateData()}
        >
          Update Details
        </Button>
      ) : (
        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => submitData()}
        >
          Save Employee
        </Button>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButton}>
            <Button
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={() => pickFromCamera()}
            >
              Camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => pickFromGallery()}
            >
              Gallery
            </Button>
          </View>
          <Button theme={theme} onPress={() => setModal(false)}>
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
}
const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
});
