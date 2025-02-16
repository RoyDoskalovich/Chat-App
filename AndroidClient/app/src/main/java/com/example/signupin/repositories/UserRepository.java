package com.example.signupin.repositories;

import android.util.Log;

import androidx.annotation.NonNull;

import com.example.signupin.MyApplication;
import com.example.signupin.network.NetworkClient;
import com.example.signupin.network.WebServiceAPI;
import com.example.signupin.network.models.RegisterUserRequest;
import com.example.signupin.network.models.UserProfile;
import com.example.signupin.preferences.LocalPreferences;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRepository {
    public interface UserProfileCallback {
        void onUserReceived(UserProfile currentLoggedinUser);

        void onUserFailure(Throwable t);
    }

    public void createUser(RegisterUserRequest request, Runnable onSuccess) {

        NetworkClient.webServiceAPI.createUser(request).enqueue(
                new Callback<Void>() {
                    @Override
                    public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                        if (response.isSuccessful()) {
                            onSuccess.run();
                        }
                    }

                    @Override
                    public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                        Log.d("TESTz", "onFailure");
                    }
                }
        );
    }

    public void getCurrentUserDetails(UserProfileCallback userProfileCallback) {
        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
        String token = preferences.getToken();
        String username = preferences.getUsername();
        NetworkClient.webServiceAPI.getCurrentUserDetails(token, username).enqueue(
                new Callback<UserProfile>() {
                    @Override
                    public void onResponse(@NonNull Call<UserProfile> call, @NonNull Response<UserProfile> response) {
                        if (response.isSuccessful()) {
                            UserProfile currentUser = response.body();
                            userProfileCallback.onUserReceived(currentUser);
                        } else {
                            userProfileCallback.onUserFailure(new Exception("Error: " + response.code()));
                        }
                    }

                    @Override
                    public void onFailure(@NonNull Call<UserProfile> call, @NonNull Throwable t) {
                        userProfileCallback.onUserFailure(t);
                    }
                }
        );
    }
}
