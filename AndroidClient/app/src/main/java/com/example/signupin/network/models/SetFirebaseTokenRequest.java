package com.example.signupin.network.models;

import com.google.gson.annotations.SerializedName;

public class SetFirebaseTokenRequest {

    @SerializedName("token")
    private String token;

    public SetFirebaseTokenRequest(String token) {
        this.token = token;
    }
}
