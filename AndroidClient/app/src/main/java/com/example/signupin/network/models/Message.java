package com.example.signupin.network.models;

import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
@Entity
public class Message {
    @PrimaryKey(autoGenerate = true)
    private int id;
    private String content;
    private String created;
    @Embedded(prefix = "sender_")
    private Sender sender;
    private String chatId;

    public Message(int id, String created, Sender sender, String content, String chatId) {
        this.id = id;
        this.content = content;
        this.created = created;
        this.sender = sender;
        this.chatId = chatId;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public Sender getSender() {
        return sender;
    }

    public void setSender(Sender sender) {
        this.sender = sender;
    }
}

