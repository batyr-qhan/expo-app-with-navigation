import { Image } from 'expo-image';
import { Button, FlatList, Platform, StyleSheet, TextInput } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useState } from 'react';
import IOSButton from '@/components/ios-button';
import { EvilIcons } from '@expo/vector-icons';

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export default function HomeScreen() {

  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState<{
    id: string,
    title: string
  }[]>([])

  const handleAddTodo = () => {
    setTodos(prev => [{
      id: generateId(),
      title: inputValue,
    }, ...prev])
    setInputValue("")
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerView={<ThemedView style={styles.headerView}>
        <ThemedText style={styles.headerTitle}>Todo</ThemedText>
      </ThemedView>}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <TextInput style={styles.input} value={inputValue} onChangeText={v => {
          console.log(v)
          setInputValue(v)
        }} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {
          Platform.OS === "ios" ? <IOSButton title="IOS Button Create Todo" onPress={() => {
            handleAddTodo()
          }} /> : <Button title='Create Todo' onPress={() => {
            handleAddTodo()
          }} />
        }
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <FlatList
          style={styles.listContainer}
          data={todos}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </ThemedView>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const Item = ({ title }: {
  title: string
}) => (
  <ThemedView style={styles.item}>

    <ThemedText style={styles.itemTitle}>{title}</ThemedText>
    <EvilIcons name='close' size={32} />
  </ThemedView>
);

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerView: {
    position: 'absolute',
    left: 24,
    bottom: 16,
    backgroundColor: "transparent",
  },
  input: {
    height: 60,
    marginVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "JosefinSans_400Regular",
    fontSize: 20,
    backgroundColor: "#fff",
    borderRadius: 5,

  },
  item: {
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1
  },
  itemTitle: {
    fontSize: 24,
    fontFamily: "JosefinSans_400Regular",

  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    backgroundColor: 'red'
  },
  // imageWrapper: {
  //   ...StyleSheet.absoluteFill,
  //   width: "100%",
  //   backgroundColor: 'red'
  // },
  scrollViewContainer: {
    flex: 1,
    padding: 16
  },
  headerTitle: {
    textTransform: "uppercase",
    fontSize: 30,
    color: "white",
    fontWeight: 600,
    letterSpacing: 8
  },
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 16
  }
});
