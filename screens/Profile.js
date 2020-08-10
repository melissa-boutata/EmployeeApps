import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Title, Card, Button } from "react-native-paper";
export default function Profile(props) {
  const {
    _id,
    name,
    picture,
    phone,
    email,
    salary,
    position,
  } = props.route.params.item;

  const deleteEmployee = () => {
    fetch("http://cd9a80aa01c2.ngrok.io/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedEmp) => {
        Alert.alert(`${deletedEmp.name} deleted`);
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("someting went wrong");
      });
  };
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel:" + phone);
    } else {
      Linking.openURL("telprompt:" + phone);
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "20%",
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70, marginTop: 100 }}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 10 }}>
        <Title> {name} </Title>
        <Text style={{ fontSize: 18 }}>{position}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL("mailto:" + email);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Text style={styles.myText}>{email}</Text>
        </View>
      </Card>
      <Card
        style={styles.myCard}
        onPress={() => {
          openDial();
        }}
      >
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff" />
          <Text style={styles.myText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.myText}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-around",
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            props.navigation.navigate("CreateEmployee", {
              _id,
              name,
              picture,
              phone,
              salary,
              email,
              position,
            });
          }}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          onPress={() => deleteEmployee()}
          theme={theme}
        >
          Fire Employee
        </Button>
      </View>
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
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  myText: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});
