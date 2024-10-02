import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import axios from "axios";
import userIcon from "../assets/krl.fotomarian.jpg";

const Messages = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://crud-bbc51-default-rtdb.firebaseio.com/pessoas.json"
      );
      // Convertendo o objeto para uma array de objetos
      const dataArray = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));
      setApiData(dataArray);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cards}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Felicitações</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image style={styles.userFoto} source={userIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={apiData}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAE3E1",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "normal",
  },
  header: {
    backgroundColor: "#EA9088",
    padding: 5,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  userFoto: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  cards: {
    alignItems: "center",
    backgroundColor: "#EA9088",
    width: 330,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  name: {
    color: "#fff",
  },
  description: {
    color: "white",
  },
  list: {
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
});

export default Messages;
