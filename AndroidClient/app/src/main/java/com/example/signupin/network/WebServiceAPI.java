package com.example.signupin.network;

import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.LoginRequest;
import com.example.signupin.network.models.Message;
import com.example.signupin.network.models.MessageMsg;
import com.example.signupin.network.models.RegisterUserRequest;
import com.example.signupin.network.models.SetFirebaseTokenRequest;
import com.example.signupin.network.models.UserProfile;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {
    @POST("Users")
    Call<Void> createUser(@Body RegisterUserRequest request);

    @GET("Users/{id}")
    Call<UserProfile> getCurrentUserDetails(@Header("Authorization") String token,
                                            @Path("id") String id);

    @POST("Tokens")
    Call<String> loginUser(@Body LoginRequest request);

//    @POST("/Tokens")
//    Call<String> getToken(@Body User user);

    @GET("/Chats")
    Call<List<Contact>> getContacts(@Header("Authorization") String token);

    @POST("/Chats")
    Call<Contact> createContact(@Header("Authorization") String token, @Body UserProfile username);

    @GET("/Chats/{id}/Messages")
    Call<List<Message>> getMessages(@Header("Authorization") String token, @Path("id") String id);
    //need to check send message
    @POST("/Chats/{id}/Messages")
    Call<Void> sendMessage(@Header("Authorization") String token, @Body MessageMsg message, @Path("id") String id);

    @POST("Tokens/Firebase")
    Call<Void> setFirebaseToken(
            @Header("Authorization") String token,
            @Body SetFirebaseTokenRequest request
    );
}




