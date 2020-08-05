import '../../models/user.dart';
import '../../pages/event/event.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../utils/routing.dart';
// import '../../api/http_data.dart';

class LoginForm extends StatefulWidget {
  @override
  LoginFormState createState() => LoginFormState();
}

class LoginFormState extends State<LoginForm> {
  final _loginFormKey = GlobalKey<FormState>();
  final _formController = [
    TextEditingController(),
  ];

  @override
  void dispose() {
    for (var controller in _formController) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 0.0, horizontal: 32),
      child: Form(
        key: _loginFormKey,
        child: Column(
          children: [
            TextFormField(
              controller: _formController[0],
              inputFormatters: [WhitelistingTextInputFormatter.digitsOnly],
              keyboardType: TextInputType.number,
              decoration: InputDecoration(hintText: 'Numer telefonu'),
              validator: (value) {
                if (value.isEmpty) return 'Podaj numer telefonu';
              },
              autofocus: false,
            ),
            _renderLoginButton(),
          ],
        ),
      ),
    );
  }

  Padding _renderLoginButton() {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0),
      child: FlatButton(
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.0)),
        splashColor: Colors.blue,
        padding: EdgeInsets.fromLTRB(56, 12, 56, 12),
        color: Colors.blue,
        child: Text('Zaloguj', style: TextStyle(color: Colors.white)),
        onPressed: () async {
          // _showErrorSnackbar('Prosze podaj numer telefonu.');

          if (_loginFormKey.currentState.validate()) {
            await _processOnPress();
          } else {
            _showErrorSnackbar('Prosze podaj numer telefonu.');
          }
        },
      ),
    );
  }

  Future _processOnPress() async {
    var number = _formController[0].text;

    _setUserData(number);
    _navigateToEvent(UserData(int.parse(number)));
  }

  void _setUserData(String number) async {
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setString('number', number);
  }

  void _navigateToEvent(UserData userData) {
    Navigator.of(context).pushReplacement(MaterialPageRoute(
        settings: RouteSettings(name: Routes.events),
        builder: (context) => Event(userData: userData)));
  }

  void _showErrorSnackbar(String errorText) {
    Scaffold.of(context).showSnackBar(SnackBar(
      content: Text(errorText),
      backgroundColor: Colors.redAccent[100],
    ));
  }
}
