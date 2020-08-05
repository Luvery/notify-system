// import './screens/loading/loading_screen.dart';
import 'package:flutter/material.dart';

import './utils/routing.dart';
// import './screens/list/resolution_screen.dart';
import './pages/login/login.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: 'login',
      routes: {
        // Routes.loading: (context) => LoadingScreen(),
        Routes.login: (context) => Login(),
        // Routes.resolutions: (context) => ResolutionScreen()
      },
    );
  }
}
