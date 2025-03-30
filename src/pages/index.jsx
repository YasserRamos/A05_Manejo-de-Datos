import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [tempData, setTempData] = useState("");
  const [data, setData] = useState("");
  const [storedData, setstoredData] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("userData", data);
      setTempData(data);
      Alert.alert("Guardado", "Dato guardado.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setstoredData(value);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el nombre.");
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setstoredData("");
      Alert.alert("Eliminado", "Elemento eliminado.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage</Text>

      <Text style={styles.label}>Ingresa un dato:</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        placeholder="Ej. Mi nombre"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Guardar Dato" onPress={saveData} color="#4CAF50" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cargar Dato" onPress={loadData} color="#2196F3" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Eliminar Dato" onPress={clearData} color="#F44336" />
      </View>

      {storedData ? (
        <Text style={styles.result}>Dato guardado: {storedData}</Text>
      ) : null}

      <Text style={styles.temp}>Dato Temporal: {tempData}</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginBottom: 12,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  temp: {
    marginTop: 10,
    fontSize: 14,
    color: "#888",
  },
});
