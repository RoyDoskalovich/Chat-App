package com.example.signupin.network.models;

import com.google.gson.annotations.SerializedName;

public class RegisterUserRequest {

    @SerializedName("username")
    private String username;

    @SerializedName("password")
    private String password;

    @SerializedName("displayName")
    private String displayName;

    @SerializedName("profilePic")
    private String profilePicture;

    public RegisterUserRequest(String username, String password, String displayName, String profilePicture) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.profilePicture = profilePicture;
    }
}
