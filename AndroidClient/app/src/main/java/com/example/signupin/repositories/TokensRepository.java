package com.example.signupin.repositories;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.example.signupin.MyApplication;
import com.example.signupin.network.NetworkClient;
import com.example.signupin.network.models.LoginRequest;
import com.example.signupin.network.models.RegisterUserRequest;
import com.example.signupin.network.models.SetFirebaseTokenRequest;
import com.example.signupin.preferences.LocalPreferences;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TokensRepository {

    private static final String TAG = "TokensRepository";

    public void loginUser(LoginRequest request, Runnable onSuccess) {
        Log.d("yoyoyoyo", "inside loginUser method");

        NetworkClient.webServiceAPI.loginUser(request).enqueue(
                new Callback<String>() {
                    @Override
                    public void onResponse(@NonNull Call<String> call, @NonNull Response<String> response) {
                        Log.d("yoyoyoyo", "inside onResponse");

                        if (response.isSuccessful()) {
                            String token = response.body();
                            if (token != null) {
                                String modifiedToken = "Bearer " + token;

                                saveAuthToken(modifiedToken, request.getUsername());
                                setFireBaseToken(modifiedToken);

                                onSuccess.run();
                            }
                        }
                    }

                    @Override
                    public void onFailure(@NonNull Call<String> call, @NonNull Throwable t) {
                        Log.e("TESTz", "onFailure", t);
                    }
                }
        );
    }

    private void saveAuthToken(String modifiedToken, String username) {
        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
        preferences.setToken(modifiedToken);
        preferences.setUsername(username);
    }

    private void setFireBaseToken(String authToken) {
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        Log.w(TAG, "Fetching FCM registration token failed", task.getException());
                        return;
                    }

                    // Get new FCM registration token
                    String firebaseToken = task.getResult();
                    SetFirebaseTokenRequest request = new SetFirebaseTokenRequest(firebaseToken);
                    NetworkClient.webServiceAPI.setFirebaseToken(authToken, request).enqueue(
                            new Callback<Void>() {
                                @Override
                                public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                                    Log.d("yoyoyoyo", "inside onResponse");
                                }

                                @Override
                                public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                                    Log.e("TESTz", "onFailure", t);
                                }
                            }
                    );
                });
    }
}
