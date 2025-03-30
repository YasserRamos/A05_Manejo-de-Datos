# 📌 Proyecto: Implementación de SecureStore y SQLite en Expo  

## 📚 Descripción General  
Este proyecto implementa el almacenamiento seguro de datos mediante **Expo SecureStore** y la gestión de bases de datos locales con **Expo SQLite** en una aplicación desarrollada con **React Native y Expo**. Ambas tecnologías permiten manejar información de manera eficiente y segura dentro de dispositivos móviles.  

---

## 🔐 SecureStore - Almacenamiento Seguro  
**Expo SecureStore** permite almacenar datos sensibles de manera segura en dispositivos móviles, utilizando el almacenamiento cifrado del sistema. Se emplea principalmente para **guardar credenciales, tokens de autenticación o configuraciones sensibles** que requieren protección.  

### 🔹 Funcionalidades Implementadas  
✅ Guardar un dato de manera segura  
✅ Recuperar el dato almacenado  
✅ Eliminar el dato guardado  

### ⚙️ Código Implementado  
```javascript
import * as SecureStore from 'expo-secure-store';

async function saveData(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getData(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteData(key) {
  await SecureStore.deleteItemAsync(key);
}
```

### 📷 Captura de Pantalla  
![SecureStore](./navigation_data/assets/EV-0.jpg.jpg)
![SecureStore](./navigation_data/assets/EV-1.jpg.jpg)

---

## 🐂 SQLite - Base de Datos Local  
**Expo SQLite** permite gestionar bases de datos locales en dispositivos móviles mediante SQLite, ideal para almacenar y consultar información estructurada de manera eficiente. Se utiliza en este proyecto para **crear una base de datos, insertar, consultar y eliminar registros**.  

### 🔹 Funcionalidades Implementadas  
✅ Crear una base de datos y una tabla si no existe  
✅ Insertar datos en la base de datos  
✅ Consultar y mostrar datos almacenados  
✅ Eliminar registros de la base de datos  

### ⚙️ Código Implementado  
```javascript
import * as SQLite from 'expo-sqlite';

// Abrir o crear la base de datos
const db = SQLite.openDatabase('myDatabase.db');

// Crear la tabla si no existe
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);',
    [],
    () => console.log('Tabla creada correctamente'),
    (_, error) => console.log('Error al crear la tabla', error)
  );
});

// Insertar un dato
function insertData(value) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (value) VALUES (?);',
      [value],
      () => console.log('Dato insertado'),
      (_, error) => console.log('Error al insertar', error)
    );
  });
}

// Consultar los datos
function fetchData() {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items;',
      [],
      (_, { rows }) => console.log(rows._array),
      (_, error) => console.log('Error al recuperar datos', error)
    );
  });
}

// Eliminar un dato
function deleteData(id) {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM items WHERE id = ?;',
      [id],
      () => console.log('Dato eliminado'),
      (_, error) => console.log('Error al eliminar', error)
    );
  });
}
```

### 📷 Captura de Pantalla  
_(Incluir captura de pantalla de la funcionalidad de SQLite funcionando en la app.)_  

---

## 📚 Conclusión  
Este proyecto demuestra cómo manejar datos de manera **segura y eficiente** en React Native con Expo. `SecureStore` proporciona **almacenamiento cifrado** para credenciales sensibles, mientras que `SQLite` permite **gestionar bases de datos locales** sin necesidad de conexión a internet.  

---

📧 **Desarrollado por:** _Yasser Omar Apango Ramos_  
📅 **Fecha:** _09/03/2025_  

