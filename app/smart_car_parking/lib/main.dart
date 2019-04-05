import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Car Parking',
      theme: ThemeData.dark(),
      home: MyHomePage(title: 'Smart Car Parking'),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(this.title),
        ),
        body: Center(
            child: Text(
          "Hello World",
          style: TextStyle(fontSize: 25, color: Colors.white),
        )));
  }
}
