package com.example.signupin;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.signupin.adapters.ContactAdapter;
import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.UserProfile;
import com.example.signupin.repositories.ContactAPI;
import com.example.signupin.repositories.UserRepository;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.List;

public class ContactsActivity extends AppCompatActivity implements ContactAPI.GetContactCallback, UserRepository.UserProfileCallback {

    private ContactDB db;
    private ContactDao contactDao;

    private List<Contact> contacts;
    private ContactAdapter adapter;
    private RecyclerView lstContacts;

    private UserRepository userRepository;
    private UserProfile loggedInUser;
    private ContactAPI contactAPI;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contacts);
        userRepository = new UserRepository();
        userRepository.getCurrentUserDetails(this);
        db = ContactDB.getDB(getApplicationContext());
        contactDao = db.contactDao();
        contactDao.deleteContacts();
        lstContacts = findViewById(R.id.lstContacts);
        contacts = contactDao.index();
        adapter = new ContactAdapter(this);
        lstContacts.setAdapter(adapter);
        lstContacts.setLayoutManager(new LinearLayoutManager(this));
        adapter.setContacts(contacts);
        handleContacts();
        contactAPI = new ContactAPI();
        contactAPI.get(this);
    }

    private void handleContacts() {
        adapter.setOnItemClickListener((position) -> {
            contacts = adapter.getContacts();
            Contact selectedContact = contacts.get(position);
            openChatActivity(selectedContact);
        });
    }

    private void openChatActivity(Contact contact) {
        // Create an intent to open the chat activity
        Intent intent = new Intent(this, ChatActivity.class);
        // Pass any necessary data to the chat activity
        intent.putExtra("id", contact.getId());
        intent.putExtra("username", contact.getUser().getUsername());
        intent.putExtra("displayName", contact.getUser().getDisplayName());
        intent.putExtra("profilePic", contact.getUser().getProfilePic());
        intent.putExtra("loggedInUser_username", loggedInUser.getUsername());
        // Start the chat activity
        startActivity(intent);
    }

    @SuppressLint("NotifyDataSetChanged")
    @Override
    public void onSuccess(List<Contact> contacts) {
        // Update the database with the retrieved messages
        for (Contact contact : contacts) {
            Contact current = contactDao.get(contact.getId());
            if (current == null) {
                contactDao.insert(contact);
            } else {
                current.setLastMessage(contact.getLastMessage());
                contactDao.update(current);
            }
        }
        // Retrieve the updated messages from the database
        List<Contact> updatedContacts = contactDao.index();
        // Update the adapter with the updated messages
        adapter.setContacts(updatedContacts);
        FloatingActionButton btnAddContact = findViewById(R.id.btnAddContact);
        btnAddContact.setOnClickListener(v -> {
            Intent i = new Intent(this, AddContactActivity.class);
            startActivity(i);
        });
    }

    @Override
    public void onFailure(Throwable t) {
        // Handle the failure as needed
    }

    @Override
    public void onUserReceived(UserProfile currentLoggedinUser) {
        loggedInUser = currentLoggedinUser;
    }

    @Override
    public void onUserFailure(Throwable t) {
        Log.d("Error", "errorInUser");
    }

    @SuppressLint("NotifyDataSetChanged")
    @Override
    protected void onResume() {
        super.onResume();
        contacts.clear();
        contacts.addAll(contactDao.index());
        adapter.setContacts(contacts);
        adapter.notifyDataSetChanged();
    }
}