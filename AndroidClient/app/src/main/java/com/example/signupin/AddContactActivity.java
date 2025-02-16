package com.example.signupin;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.UserProfile;
import com.example.signupin.repositories.ContactAPI;


public class AddContactActivity extends AppCompatActivity implements ContactAPI.PostContactCallback {

    private Intent i;
    private ContactDB db;
    private ContactDao contactDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contact);

        ContactAPI contactAPI = new ContactAPI();

        EditText etContactId = findViewById(R.id.etContactId);
        Button btnConfirmAdd = findViewById(R.id.btnConfirmAdd);

        btnConfirmAdd.setOnClickListener(v -> {
            UserProfile newContactProfile = new UserProfile(etContactId.getText().toString(), null, null);
            contactAPI.createContact(this, newContactProfile);
        });
    }

    @Override
    public void onCreateSuccess(Contact contact) {
        Contact newContact = new Contact(contact.getId(), contact.getUser(), null);
        db = ContactDB.getDB(getApplicationContext());
        contactDao = db.contactDao();
        contactDao.insert(newContact);
        finish();
    }

    @Override
    public void onCreateFailure(Throwable t) {
        // Create the object of AlertDialog Builder class
        AlertDialog.Builder builder = new AlertDialog.Builder(AddContactActivity.this);

        // Set the message show for the Alert time
        builder.setMessage("This user does not exist");

        // Set Alert Title
        builder.setTitle("Error!");

        // Set Cancelable false for when the user clicks on the outside the Dialog Box then it will remain show
        builder.setCancelable(false);

        // Set the positive button with yes name Lambda OnClickListener method is use of DialogInterface interface.
        builder.setPositiveButton("Yes", (DialogInterface.OnClickListener) (dialog, which) -> {
            // When the user click yes button then app will close
            finish();
        });

        // Set the Negative button with No name Lambda OnClickListener method is use of DialogInterface interface.
        builder.setNegativeButton("No", (DialogInterface.OnClickListener) (dialog, which) -> {
            // If user click no then dialog box is canceled.
            dialog.cancel();
        });

        // Create the Alert dialog
        AlertDialog alertDialog = builder.create();
        // Show the Alert Dialog box
        alertDialog.show();
    }
}