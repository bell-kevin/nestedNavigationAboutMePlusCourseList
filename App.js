import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { useFonts, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

const skills = ['JavaScript', 'HTML', 'CSS', 'React', 'SQL', 'PHP', 'React Native'];

const HomeScreen = () => {
  const navigation = useNavigation();

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CourseList')}
      >
        <Text style={styles.buttonText}>View Courses</Text>
      </TouchableOpacity>
    </View>
  );
};

const CourseListScreen = () => {
  const courses = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn how to build websites using HTML, CSS, and JavaScript.',
      image: require('./assets/web.jpg'),
    },
    {
      id: 2,
      title: 'Mobile Development',
      description: 'Learn how to build mobile apps using React Native.',
      image: require('./assets/mobile.jpg'),
    },
    {
      id: 3,
      title: 'Database Development',
      description: 'Learn how to build databases using SQL.',
      image: require('./assets/database.jpg'),
    },
  ];

  const navigation = useNavigation();

  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={styles.courseList}>Course List</Text>
      {courses.map((course, index) => (
        <TouchableOpacity
          key={index}
          style={styles.course}
          onPress={() => navigation.navigate('CourseDetails', { course })}
        >
          <Image source={course.image} style={styles.courseImage} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const CourseDetailsScreen = ({ route }) => {
  const { course } = route.params;

  return (
    <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
      <Image source={course.image} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseDescription}>{course.description}</Text>
    </View>
  );
}

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
          activeTintColor: '#000',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Skills" component={SkillsScreen} />
        <Tab.Screen name="School" component={SchoolScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 30,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 10,
  },
  studentInfo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  school: {
    fontSize: 30,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 10,
  },
  image: {
    width: '95%',
    height: 200,
    marginBottom: 10,
  },
  address: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
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
  courseList: {
    fontSize: 30,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 10,
  },
  course: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans_700Bold',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 20,
  },
  skillsList: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default App;

