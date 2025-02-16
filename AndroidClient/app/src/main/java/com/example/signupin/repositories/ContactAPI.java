package com.example.signupin.repositories;

import androidx.annotation.NonNull;

import com.example.signupin.MyApplication;
import com.example.signupin.network.NetworkClient;
import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.UserProfile;
import com.example.signupin.preferences.LocalPreferences;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ContactAPI {
    public interface GetContactCallback {
        void onSuccess(List<Contact> contacts);

        void onFailure(Throwable t);
    }

    public interface PostContactCallback {
        void onCreateSuccess(Contact contact);

        void onCreateFailure(Throwable t);
    }

    //modify get to fit the contacts
    public void get(GetContactCallback callback) {
        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
        String token = preferences.getToken();
        Call<List<Contact>> call = NetworkClient.webServiceAPI.getContacts(token);
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(@NonNull Call<List<Contact>> call, @NonNull Response<List<Contact>> response) {
                if (response.isSuccessful()) {
                    List<Contact> contacts = response.body();
                    callback.onSuccess(contacts);
                } else {
                    callback.onFailure(new Exception("Error: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
                callback.onFailure(t);
            }
        });
    }

//change details for hadar
    public void createContact(final PostContactCallback callback, UserProfile username) {
        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
        String token = preferences.getToken();
        Call<Contact> call = NetworkClient.webServiceAPI.createContact(token, username);
        call.enqueue(new Callback<Contact>() {
            @Override
            public void onResponse(Call<Contact> call, Response<Contact> response) {
                if (response.isSuccessful()) {
                    Contact contact = response.body();
                    callback.onCreateSuccess(contact);
                } else {
                    try {
                        String errorBody = response.errorBody().string();
                        System.out.println("Error body: " + errorBody);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onCreateFailure(new Exception("Error: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<Contact> call, Throwable t) {
                callback.onCreateFailure(t);
            }
        });
    }
}
