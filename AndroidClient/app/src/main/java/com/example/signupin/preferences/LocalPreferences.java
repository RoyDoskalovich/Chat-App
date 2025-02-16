package com.example.signupin.preferences;

import android.content.Context;
import android.content.SharedPreferences;

//TODO: Change every static to a singleton holder pattern

// The localPreferences class is used to save all the validate local data. For example we will save
// the token here.
public class LocalPreferences {
    private static final String PREF_NAME = "LocalPreferences";
    private static final String KEY_USERNAME = "username";
    private static final String KEY_TOKEN = "token";

    private static LocalPreferences instance;
    private final SharedPreferences sharedPreferences;
    private final SharedPreferences.Editor editor;

    public LocalPreferences(Context context) {
        sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
    }

    public static synchronized LocalPreferences getInstance(Context context) {
        if (instance == null) {
            instance = new LocalPreferences(context.getApplicationContext());
        }
        return instance;
    }

    public String getUsername() {
        return sharedPreferences.getString(KEY_USERNAME, "");
    }

    public void setUsername(String username) {
        editor.putString(KEY_USERNAME, username);
        editor.apply();
    }

    public String getToken() {
        return sharedPreferences.getString(KEY_TOKEN, "");
    }

    public void setToken(String token) {
        editor.putString(KEY_TOKEN, token);
        editor.apply();
    }



    //TODO: Create a private shared preferences member here


    //TODO: Expose public functions that uses the shared preferences in order
    // to save and read data from it
}
