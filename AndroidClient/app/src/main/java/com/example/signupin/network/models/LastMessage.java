package com.example.signupin.network.models;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

@Entity
public class LastMessage {
    @PrimaryKey(autoGenerate = true)
    private int id;
    @SerializedName("content")
    private String content;
    @SerializedName("created")
    private String created;


    public LastMessage(int id, String content, String created) {
        this.id = id;
        this.content = content;
        this.created = created;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
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
}
