import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:notify_mobile/pages/event/eventViewModel.dart';
import '../../utils/routing.dart';
import '../../models/user.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../utils/viewModel/viewModelPropertyWidgetBuilder.dart';
import 'package:flutter/foundation.dart';
import '../../models/notify.dart';

class Event extends StatefulWidget {
  final UserData userData;

  const Event({Key key, this.userData}) : super(key: key);

  @override
  // _ResolutionScreenState createState() => _ResolutionScreenState();
  _EventState createState() => _EventState();
}

// class _EventState extends State<Event> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text("Resolutions"),
//         actions: [
//           IconButton(
//             onPressed: () {
//               logOut(context);
//             },
//             icon: Icon(Icons.exit_to_app),
//           )
//         ],
//       ),
//     );
//   }
// }
class _EventState extends State<Event> {
  @override
  Widget build(BuildContext context) {
    final vm = new EventViewModel();
    return EventViewModelProvider(
        viewModel: vm,
        childBuilder: (ctx) {
          return Scaffold(
            appBar: AppBar(
              title: Text("Alerty"),
              actions: [
                IconButton(
                  onPressed: () {
                    logOut(context);
                  },
                  icon: Icon(Icons.exit_to_app),
                )
              ],
            ),
            body: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: <Widget>[
                    EventComposeView(),
                    Divider(),
                    Expanded(child: EventView())
                  ],
                )),
          );
        });
  }
}

class EventView extends StatelessWidget {
  // Properites

  // Methods
  @override
  Widget build(BuildContext context) {
    final vm = EventViewModelProvider.of(context);

    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        Row(
          children: <Widget>[
            Text(
              "API Connection: ",
              style: Theme.of(context).textTheme.subhead,
            ),
            ViewModelPropertyWidgetBuilder<bool>(
                viewModel: vm,
                propertyName: EventViewModel.connectionIsOpenPropName,
                builder: (context, snapshot) {
                  return Text(
                      vm.connectionIsOpen ? "Connected" : "Disconnected");
                }),
          ],
        ),
        Expanded(
            child: ViewModelPropertyWidgetBuilder<NotifyMessage>(
          viewModel: vm,
          propertyName: EventViewModel.notifyMessagesPropName,
          builder: (context, snapshot) {
            return ListView.builder(
                itemCount: vm.notifyMessages.length,
                itemBuilder: (BuildContext ctx, int index) =>
                    _createMessageItemView(vm.notifyMessages[index]));
          },
        )),
      ],
    );
  }

  Widget _createMessageItemView(NotifyMessage message) {
    return Column(children: <Widget>[
      ListTile(
          leading: Text("${message.departmentName} :"),
          title: Text(message.description)),
      Divider(),
    ]);
  }
}

class EventComposeView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _EventComposeViewState();
}

class _EventComposeViewState extends State<EventComposeView> {
  // Properties
  final TextEditingController _messageTextController = TextEditingController();
  final TextEditingController _userNameController = TextEditingController();

  // Methods

  @override
  void dispose() {
    // Clean up the controller when the Widget is disposed
    _messageTextController.dispose();
    _userNameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final vm = EventViewModelProvider.of(context);
    return Column(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        ViewModelPropertyWidgetBuilder<String>(
            viewModel: vm,
            propertyName: EventViewModel.userNumberPropName,
            builder: (context, snapshot) {
              return Text("Witaj, czy dasz radę wziąć udział?");
            }),
        Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            RaisedButton(
              child: Text("Biorę udział"),
              color: Colors.greenAccent,
              onPressed: () => vm.sendAnswer("TAK"),
            ),
            RaisedButton(
              child: Text("Nie biorę udziału"),
              color: Colors.redAccent,
              onPressed: () => vm.sendAnswer("NIE"),
            )
          ],
        )
      ],
    );
  }
}

Future logOut(context) async {
  final SharedPreferences user = await SharedPreferences.getInstance();
  user.remove('id');
  Navigator.pushReplacementNamed(context, Routes.login);
}
