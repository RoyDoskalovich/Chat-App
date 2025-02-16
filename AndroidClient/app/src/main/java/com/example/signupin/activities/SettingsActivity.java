package com.example.signupin.activities;

import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import com.example.signupin.BaseUrl;
import com.example.signupin.R;


public class SettingsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        // Find views
        Button btnChangeTheme = findViewById(R.id.btnChangeTheme);
        EditText editPortNumber = findViewById(R.id.editServerAddress);
        Button btnConfirm = findViewById(R.id.btnConfirmPortChange);

        // Set click listener for the theme change button
        btnChangeTheme.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toggleTheme();
            }
        });

        btnConfirm.setOnClickListener(v -> {
            BaseUrl.setBaseUrl(editPortNumber.getText().toString());
            finish();
        });
    }

    private void toggleTheme() {
        // Retrieve the current theme setting
        int currentNightMode = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;

        // Update the theme setting
        if (currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        }
    }

}