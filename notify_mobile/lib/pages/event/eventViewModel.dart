import '../../utils/viewModel/viewModel.dart';
import '../../utils/viewModel/viewModelProvider.dart';
import '../../models/notify.dart';
import '../../api/http_data.dart';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:signalr_client/signalr_client.dart';

typedef HubConnectionProvider = Future<HubConnection> Function();

class EventViewModel extends ViewModel {
  String _serverUrl;
  HubConnection _hubConnection;

  List<NotifyMessage> _notifyMessages;
  static const String notifyMessagesPropName = "notifyMessages";
  List<NotifyMessage> get notifyMessages => _notifyMessages;

  bool _connectionIsOpen;
  static const String connectionIsOpenPropName = "connectionIsOpen";
  bool get connectionIsOpen => _connectionIsOpen;
  set connectionIsOpen(bool value) {
    updateValue(connectionIsOpenPropName, _connectionIsOpen, value,
        (v) => _connectionIsOpen = v);
  }

  String _userNumber;
  static const String userNumberPropName = "userName";
  String get userNumber => _userNumber;
  set userNumber(String value) {
    updateValue(userNumberPropName, _userNumber, value, (v) => _userNumber = v);
  }

  EventViewModel() {
    _serverUrl = url + "/api/notifyhub";
    _notifyMessages = List<NotifyMessage>();
    _connectionIsOpen = false;
    _userNumber = "000";

    openChatConnection();
  }

  Future<void> openChatConnection() async {
    if (_hubConnection == null) {
      _hubConnection = HubConnectionBuilder().withUrl(_serverUrl).build();
      _hubConnection.onclose((error) => connectionIsOpen = false);
      _hubConnection.on("onMessage", _handleIncommingNotifyMessage);
    }

    if (_hubConnection.state != HubConnectionState.Connected) {
      await _hubConnection.start();
      connectionIsOpen = true;
    }
  }

  Future<void> sendAnswer(String answerMessage) async {
    if (answerMessage == null || answerMessage.length == 0) {
      return;
    }

    String _userNumber = await getUserNumber();
    await openChatConnection();
    _hubConnection
        .invoke("AnswerFromMobile", args: <Object>[_userNumber, answerMessage]);
  }

  void _handleIncommingNotifyMessage(List<Object> args) {
    final String description = args[0];
    final String departmentName = args[1];
    _notifyMessages.add(NotifyMessage(departmentName, description));
    notifyPropertyChanged(notifyMessagesPropName);
  }
}

Future<String> getUserNumber() async {
  final SharedPreferences userNumber = await SharedPreferences.getInstance();
  return userNumber.getString('number');
}

class EventViewModelProvider extends ViewModelProvider<EventViewModel> {
  EventViewModelProvider(
      {Key key, viewModel: EventViewModel, WidgetBuilder childBuilder})
      : super(key: key, viewModel: viewModel, childBuilder: childBuilder);

  static EventViewModel of(BuildContext context) {
    return (context
            .dependOnInheritedWidgetOfExactType<EventViewModelProvider>())
        .viewModel;
  }
}
