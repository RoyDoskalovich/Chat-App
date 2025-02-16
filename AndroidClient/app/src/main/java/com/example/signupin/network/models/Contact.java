package com.example.signupin.network.models;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

@Entity
public class Contact {
    @PrimaryKey @NonNull
    private String id;
    @NonNull
    private UserProfile user;
    @SerializedName("lastMessage")
    private LastMessage lastMessage;

    public LastMessage getLastMessage() {
        return lastMessage;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setLastMessage(LastMessage lastMessage) {
        this.lastMessage = lastMessage;
    }

    public void setUser(UserProfile user) {
        this.user = user;
    }

    public UserProfile getUser() {
        return user;
    }

    public Contact(String id, UserProfile user, LastMessage lastMessage) {
        this.lastMessage = lastMessage;
        this.user = user;
        this.id = id;
    }

    public String getId() {
        return id;
    }
}


