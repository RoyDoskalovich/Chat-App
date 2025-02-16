package com.example.signupin;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

public class NotificationUtils {

    private static final String CHANNEL_ID = "my_channel_id";
    private static final String CHANNEL_NAME = "Notification Channel";
    private static final String CHANNEL_DESCRIPTION = "Notification Channel";

    public static void showNotification(Context context, String title, String message) {
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        // Create the notification channel for Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT);
            channel.setDescription(CHANNEL_DESCRIPTION);
            notificationManager.createNotificationChannel(channel);
        }

        // Build the notification
        Notification.Builder builder = new Notification.Builder(context)
                .setSmallIcon(R.drawable.ic_send)
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(Notification.PRIORITY_DEFAULT)
                .setAutoCancel(true);

        // Set the channel ID for Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder.setChannelId(CHANNEL_ID);
        }

        // Display the notification
        Notification notification = builder.build();
        notificationManager.notify(0, notification);
    }
}