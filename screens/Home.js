import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
export default function Home({ navigation }) {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => {
    return state;
  });

  const fetchData = () => {
    fetch("http://ab200864a7d6.ngrok.io/")
      .then((res) => res.json())
      .then((results) => {
        //setData(results);
        //setLoading(false);

        dispatch({ type: "ADD_DATA", payload: results });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        Alert.alert("Something went wrong");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri: item.picture,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.cardText}>{item.name} </Text>
            <Text>{item.position} </Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => {
          item._id;
        }}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
        onPress={() => navigation.navigate("CreateEmployee")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  myCard: { marginTop: 20, padding: 5 },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },

  cardText: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
