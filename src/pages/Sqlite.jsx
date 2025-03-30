import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

const initDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync('tasks.db');
    console.log("SQLite: Conexión abierta correctamente.");

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL
      );
    `);
    console.log('Tabla `tasks` creada o verificada con éxito.');
  } catch (error) {
    console.error('Error al iniciar la base de datos:', error);
  }
};

const addTask = async (task) => {
  try {
    if (!task.trim()) throw new Error('Ingresa una tarea válida.');
    const result = await db.runAsync('INSERT INTO tasks (name) VALUES (?);', [task]);
    console.log(`Tarea guardada con ID: ${result.lastInsertRowId}`);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('No se pudo guardar la tarea:', error);
  }
};

const deleteTask = async (id) => {
  try {
    const result = await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
    console.log(`Tarea eliminada (filas afectadas: ${result.changes})`);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
  }
};

const fetchAllTasks = async () => {
  try {
    const tasks = await db.getAllAsync('SELECT * FROM tasks;');
    console.log('Tareas recuperadas desde la base de datos:', tasks);
    return tasks;
  } catch (error) {
    console.error('No se pudieron recuperar las tareas:', error);
    return [];
  }
};

export default function SQLiteScreen() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    initDB().then(() => loadTasks());
  }, []);

  const loadTasks = async () => {
    const storedTasks = await fetchAllTasks();
    setTasks(storedTasks); 
  };

  const handleAddTask = async () => {
    if (taskName.trim() === '') {
      Alert.alert('Campo vacío', 'Debes escribir una tarea antes de guardarla.');
      return;
    }
    await addTask(taskName);
    loadTasks();
    setTaskName('');
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Tareas</Text>

      <Text style={styles.counterText}>
        {tasks.length} {tasks.length === 1 ? 'elemento almacenado' : 'elementos almacenados'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una nueva tarea"
        value={taskName}
        onChangeText={setTaskName}
      />

      <View style={styles.buttonGroup}>
        <Button title="Añadir" onPress={handleAddTask} color="#1976D2" />
        <Button
          title={showList ? 'Ocultar lista' : 'Mostrar lista'}
          onPress={() => setShowList(!showList)}
          color="#455A64"
        />
      </View>

      {showList && (
        <FlatList
          style={styles.list}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.name}</Text>
              <Button
                title="Eliminar"
                onPress={() => handleDeleteTask(item.id)}
                color="#D32F2F"
              />
            </View>
          )}
        />
      )}
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
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    color: '#263238',
  },
  counterText: {
    fontSize: 15,
    marginBottom: 15,
    color: '#607D8B',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  taskText: {
    fontSize: 17,
    color: '#37474F',
  },
});
