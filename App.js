import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Button } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { useFonts, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

const { width } = Dimensions.get('window');

const skills = ['JavaScript', 'HTML', 'CSS', 'React', 'SQL', 'PHP', 'React Native'];

const HomeScreen = () => {
  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={styles.name}>Kevin Bell</Text>
      <Text style={styles.studentInfo}>
        I am a student at Davis Technical College, studying Software
        Development. My goal is to become a full-stack developer.
      </Text>
    </View>
  );
};

const SkillsScreen = () => {
  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={styles.name}>My Skills</Text>
      {skills.map((skill, index) => (
        <Text style={styles.skillsList} key={index}>{skill}</Text>
      ))}
    </View>
  );
};

const SchoolScreen = () => {
  const dtcImage = require('./assets/dtc.jpg');
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={styles.school}>Davis Technical College</Text>
      <Image source={dtcImage} style={styles.image} />
      <Text style={styles.address}>550 East 300 South</Text>
      <Text style={styles.city}>
        Kaysville, Utah, United States of America 84037
      </Text>
      <Text style={styles.phone}>801-593-2500</Text>
      <Button
        title="COURSES TAKEN"
        onPress={() => navigation.navigate('CourseList')}
        style={styles.button}
        color="green"
      />
    </View>
  );
};

const courses = [
  { id: 'SDEV1020', name: 'Intro. to Computers', description: 'Introduction to computer hardware and software.' },
  { id: 'SDEV1021', name: 'Intro. to Programming', description: 'Introduction to programming concepts and problem solving.' },
  { id: 'SDEV1022', name: 'HTML/CSS Basics', description: 'Learn the basics of HTML and CSS for web development.' },
  { id: 'SDEV1023', name: 'JavaScript Basics', description: 'Introduction to JavaScript programming language.' },
  { id: 'SDEV1024', name: 'React Native', description: 'Building native mobile apps with React.' },
  { id: 'SDEV1025', name: 'Database Systems', description: 'Design and implementation of database systems.' },
  { id: 'SDEV1026', name: 'Software Engineering', description: 'Methods and practices for software development projects.' },
  { id: 'SDEV1027', name: 'Web Application Development', description: 'Design and development of web applications.' },
  { id: 'SDEV1028', name: 'Mobile App. Dev.', description: 'Design and development of mobile applications.' },
  { id: 'SDEV1029', name: 'Software Dev. Capstone', description: 'Capstone project for the Software Development program.' },
];

const CourseCard = ({ id, name, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.courseTitle}>{id}: {name}</Text>
      <Text style={styles.courseDescription}>{description}</Text>
    </View>
  );
};

const CourseListScreen = () => {
  const [fontsLoaded] = useFonts({
    'custom-font-1': require('./assets/fonts/OpenSans-Bold.ttf'),
    'custom-font-2': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  const renderItem = ({ item }) => (
    <CourseCard id={item.id} name={item.name} description={item.description} />
  );

  if (!fontsLoaded) {
    return null; // Return empty view or loading screen while fonts are being loaded
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'custom-font-1', fontSize: 25, textAlign: 'center' }}>Course Listing</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [loaded] = useFonts({
    OpenSans_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="CourseList" component={CourseListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Skills') {
            iconName = focused ? 'star' : 'star';
          } else if (route.name === 'School') {
            iconName = focused ? 'book' : 'book';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="School" component={SchoolScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'ivory',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  courseTitle: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 20,
  },
  courseDescription: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#c8e6c9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 30,
    marginBottom: 20,
  },
  studentInfo: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    
  },
  school: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 30,
    marginBottom: 20,
  },
  image: {
    width: "95%",
    height: width * 0.8,
    marginBottom: 20,
  },
  address: {
    fontSize: 20,
    marginBottom: 10,
  },
  city: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  phone: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  skillsList: {
    fontSize: 20,
    marginBottom: 10,
  },
  courseList: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 30,
    marginBottom: 20,
  },
});

export default App;
