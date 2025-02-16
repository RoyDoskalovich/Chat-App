package com.example.signupin.repositories;

import android.util.Log;

import androidx.annotation.NonNull;

import com.example.signupin.BaseUrl;
import com.example.signupin.MyApplication;
import com.example.signupin.network.NetworkClient;
import com.example.signupin.network.WebServiceAPI;
import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.Message;
import com.example.signupin.network.models.MessageMsg;
import com.example.signupin.preferences.LocalPreferences;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MessageAPI {

    Retrofit retrofit;
    WebServiceAPI webServiceAPI;

    public interface GetMessageCallback {
        void onSuccess(List<Message> messages);

        void onFailure(Throwable t);
    }

    public void get(GetMessageCallback callback, Contact contact) {
        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
        String token = preferences.getToken();
        Call<List<Message>> call = NetworkClient.webServiceAPI.getMessages(token, contact.getId());
        call.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(@NonNull Call<List<Message>> call, @NonNull Response<List<Message>> response) {
                if (response.isSuccessful()) {
                    List<Message> messages = response.body();
                    callback.onSuccess(messages);
                } else {
                    callback.onFailure(new Exception("Error: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<List<Message>> call, Throwable t) {
                callback.onFailure(t);
            }
        });
    }

    public void post(Message message, Contact contact) {
        // Token received, proceed with getMessages()
        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
        String token = preferences.getToken();
        MessageMsg msg = new MessageMsg(message.getContent());
        Call<Void> call = NetworkClient.webServiceAPI.sendMessage(token, msg, contact.getId());
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {

                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.d("MessageAPI", "onFailure: " + t.getMessage());
            }
        });
    }
}
