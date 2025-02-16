package com.example.signupin;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.signupin.activities.SettingsActivity;
import com.example.signupin.network.NetworkClient;
import com.example.signupin.network.models.LoginRequest;
import com.example.signupin.preferences.LocalPreferences;
import com.example.signupin.repositories.TokensRepository;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class LogInActivity extends AppCompatActivity {
    private TokensRepository tokensRepository;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);
        tokensRepository = new TokensRepository();

        FloatingActionButton btnSettings = findViewById(R.id.btnSettings);
        btnSettings.setOnClickListener(v -> {
            Intent i = new Intent(this, SettingsActivity.class);
            startActivity(i);
        });
    }

    public void goToSignupActivity(View view) {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }


    public void goToChatActivity(View view) {
        Intent intent = new Intent(this, ContactsActivity.class);
        // TODO: Pass the username using putExtra.
        startActivity(intent);
    }

    public void logIn(View view) {
        EditText usernameEditText = findViewById(R.id.txtUsername);
        EditText passwordEditText = findViewById(R.id.txtPassword);

        String username = usernameEditText.getText().toString().trim();
        String password = passwordEditText.getText().toString().trim();

        if (username.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please fill in all the fields", Toast.LENGTH_SHORT).show();
            return;
        }

//        LocalPreferences preferences = LocalPreferences.getInstance(MyApplication.context);
//        String lastLoggedInUsername = preferences.getUsername();

        LoginRequest user = new LoginRequest(username, password);

        tokensRepository.loginUser(user, () -> goToChatActivity(view));

        // TODO: Perform further validation or login logic.

        // TODO: Post the server with the username and password and receive in return token that will be passed to the new Activity (chats)
        // TODO: for following server requests.

    }
}