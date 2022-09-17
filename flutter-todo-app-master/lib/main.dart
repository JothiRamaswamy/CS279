import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import './screens/home.dart';

// run the app in the main function
void main() {
  runApp(const MyApp());
}

// define the class MyApp for the app run above
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // override the build function for MyApp
  @override
  Widget build(BuildContext context) {
    // adjust Chrome overlay style
    SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle(statusBarColor: Colors.transparent));
    // run the MaterialApp that displays the Home Widget for the entire
    // home page through home()
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'ToDo App',
      home: Home(),
    );
  }
}
