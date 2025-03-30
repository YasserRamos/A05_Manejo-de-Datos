import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SecureStoreTab() {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const saveData = async () => {
    try {
      await SecureStore.setItemAsync('secure_key', inputValue);
      alert('Dato guardado correctamente');
      setInputValue('');
    } catch (error) {
      alert('Error al guardar el dato');
    }
  };

  const loadData = async () => {
    try {
      const value = await SecureStore.getItemAsync('secure_key');
      if (value) {
        setStoredValue(value);
      } else {
        alert('No hay datos almacenados');
      }
    } catch (error) {
      alert('Error al recuperar los datos');
    }
  };

  const deleteData = async () => {
    try {
      await SecureStore.deleteItemAsync('secure_key');
      setStoredValue('');
      alert('Dato eliminado');
    } catch (error) {
      alert('Error al eliminar los datos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SecureStore</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe algo..."
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.buttonGroup}>
        <View style={styles.buttonWrapper}>
          <Button title="Guardar" onPress={saveData} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cargar" onPress={loadData} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Eliminar" onPress={deleteData} color="red" />
        </View>
      </View>

      {storedValue ? <Text style={styles.result}>Dato almacenado: {storedValue}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    width: '90%',
    gap: 10, // requiere react-native 0.71+, si no funciona, usa marginBottom
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
