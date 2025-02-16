package com.example.signupin.services;

import androidx.annotation.NonNull;

import com.example.signupin.AppDB;
import com.example.signupin.MessageDao;
import com.example.signupin.MyApplication;
import com.example.signupin.NotificationUtils;
import com.example.signupin.network.NetworkClient;
import com.example.signupin.network.models.Message;
import com.example.signupin.network.models.Sender;
import com.example.signupin.network.models.SetFirebaseTokenRequest;
import com.example.signupin.preferences.LocalPreferences;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(@NonNull String token) {
        String authToken = LocalPreferences.getInstance(this).getToken();
        boolean isUserLoggedIn = !authToken.isEmpty();
        if (!isUserLoggedIn) return;

        sendTokenToServer(authToken, token);
    }

    private void sendTokenToServer(String authToken, String firebaseToken) {
        SetFirebaseTokenRequest request = new SetFirebaseTokenRequest(firebaseToken);
        NetworkClient.webServiceAPI.setFirebaseToken(authToken, request);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {
        super.onMessageReceived(message);

        final AppDB db = AppDB.getDB(this);
        final MessageDao messageDao = db.messageDao();

        RemoteMessage.Notification notification = message.getNotification();
        if (notification == null) return;

        NotificationUtils.showNotification(
                this,
                notification.getTitle(),
                notification.getBody()
        );

        Map<String, String> data = message.getData();
        Message messageEntity = new Message(
                0,
                data.get("created"),
                new Sender(data.get("senderUsername")),
                data.get("content"),
                data.get("chatId")
        );
        messageDao.insert(messageEntity);
    }
}