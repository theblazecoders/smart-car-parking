import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import './SigninPage.dart';
import './HomeScreen.dart';

final FirebaseAuth _auth = FirebaseAuth.instance;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Car Parking',
      home: MyHomePage(title: 'Home'),
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  FirebaseUser user;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _auth.onAuthStateChanged.listen((firebaseUser) {
      if (firebaseUser != null) {
        setState(() {
          user = firebaseUser;
        });
      } else {
        setState(() {
          user = null;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          actions: <Widget>[
            Padding(
              padding: const EdgeInsets.only(right: 18.0),
              child: InkWell(
                onTap: () {
                  if (user == null)
                    _pushPage(context, SigninPage());
                  else
                    _signOut();
                },
                child: Center(
                    child: Text(
                  user == null ? "Sign in" : "Sign out",
                  style: TextStyle(fontSize: 20),
                )),
              ),
            )
          ],
        ),
        body: HomeScreen(),
    );
  }

  void _pushPage(BuildContext context, Widget page) async {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => page),
    );
  }

  void _signOut() async {
    await _auth.signOut();
  }
}
