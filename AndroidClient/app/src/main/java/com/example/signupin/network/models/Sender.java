package com.example.signupin.network.models;

import androidx.room.Entity;

@Entity
public class Sender {
    private String username;

    public Sender(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}