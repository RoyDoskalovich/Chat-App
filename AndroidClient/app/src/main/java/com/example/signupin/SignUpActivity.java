package com.example.signupin;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.signupin.activities.SettingsActivity;
import com.example.signupin.network.models.RegisterUserRequest;
import com.example.signupin.repositories.UserRepository;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import java.io.ByteArrayOutputStream;

public class SignUpActivity extends AppCompatActivity {

    private static final int GALLERY_REQ_CODE = 1000;
    ImageView profilePictureImageView;
    private UserRepository userRepository;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        profilePictureImageView = findViewById(R.id.profilePictureImageView);
        userRepository = new UserRepository();

        FloatingActionButton btnSettings = findViewById(R.id.btnSettings);
        btnSettings.setOnClickListener(v -> {
            Intent i = new Intent(this, SettingsActivity.class);
            startActivity(i);
        });
    }

    public void uploadProfilePicture(View view) {
        Intent iGallery = new Intent(Intent.ACTION_PICK);
        iGallery.setData(MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(iGallery, GALLERY_REQ_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {

            if (requestCode == GALLERY_REQ_CODE) {
                profilePictureImageView.setImageURI(data.getData());
            }
        }
    }

    public void goToLoginActivity(View view) {
        Intent intent = new Intent(this, LogInActivity.class);
        startActivity(intent);
    }

    public void signUp(View view) {
        System.out.println("got inside signUp");
        EditText usernameEditText = findViewById(R.id.txtUsername);
        EditText passwordEditText = findViewById(R.id.txtPassword);
        EditText passwordVerificationEditText = findViewById(R.id.txtPasswordVerification);
        EditText displayNameEditText = findViewById(R.id.txtDisplayName);
        ImageView profilePictureImageView = findViewById(R.id.profilePictureImageView);

        String username = usernameEditText.getText().toString().trim();
        String password = passwordEditText.getText().toString().trim();
        String passwordVerification = passwordVerificationEditText.getText().toString().trim();
        String displayName = displayNameEditText.getText().toString().trim();

        BitmapDrawable drawable = (BitmapDrawable) profilePictureImageView.getDrawable();
        Bitmap bitmap = drawable.getBitmap();

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG,100, bos);
        byte[] bb = bos.toByteArray();
        String profilePicture = Base64.encodeToString(bb, 0);

        // convert profile picture to a base64 picture.


        if (username.isEmpty() || password.isEmpty() || passwordVerification.isEmpty() || displayName.isEmpty()) {
            Toast.makeText(this, "Please fill in all the fields", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(passwordVerification)) {
            Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show();
            return;
        }

        if (password.length() < 8 || !password.matches(".*[a-zA-Z].*") || !password.matches(".*\\d.*")) {
            Snackbar.make(view, "Password must be at least 8 characters long and include at least one letter and one number", Snackbar.LENGTH_LONG).show();
            return;
        }

        RegisterUserRequest user = new RegisterUserRequest(username, password, displayName, profilePicture);
        // Second parameter is a lambda callback function to navigate to login page. (after getting the response from the server).
        userRepository.createUser(user, () -> goToLoginActivity(view));

        // TODO: Perform further validation or registration logic.

        // TODO: Post the server with all the data to create a user.


        // After validating all the data and passing them to the server, the program should move via Intent to the chats page.
        // It may pass the username and the token to the new page for following request for the server.
        // Or maybe we would like to move to the login page and there log in with the new user created and in this request to the server to accept
        // the relevant token, save it and pass it to the new chat activity.
    }

}