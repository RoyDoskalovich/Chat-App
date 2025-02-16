package com.example.signupin;

import androidx.room.TypeConverter;
import com.example.signupin.network.models.LastMessage;
import com.example.signupin.network.models.User;
import com.example.signupin.network.models.UserProfile;
import com.google.gson.Gson;

public class Converters {
    @TypeConverter
    public static LastMessage fromJson(String value) {
        return new Gson().fromJson(value, LastMessage.class);
    }

    @TypeConverter
    public static String toJson(LastMessage message) {
        return new Gson().toJson(message);
    }

    @TypeConverter
    public static User fromUserJson(String json) {
        return new Gson().fromJson(json, User.class);
    }

    @TypeConverter
    public static String toUserJson(User user) {
        return new Gson().toJson(user);
    }

    @TypeConverter
    public static UserProfile fromUserProfJson(String json) {
        return new Gson().fromJson(json, UserProfile.class);
    }

    @TypeConverter
    public static String toUserProfJson(UserProfile user) {
        return new Gson().toJson(user);
    }
}