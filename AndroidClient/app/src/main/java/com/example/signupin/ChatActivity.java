package com.example.signupin;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.signupin.adapters.chatAdapter;
import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.LastMessage;
import com.example.signupin.network.models.Message;
import com.example.signupin.network.models.Sender;
import com.example.signupin.network.models.UserProfile;
import com.example.signupin.repositories.MessageAPI;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;

public class ChatActivity extends AppCompatActivity implements MessageAPI.GetMessageCallback {

    private AppDB db;
    private MessageDao messageDao;
    private ContactDB cdb;
    private ContactDao contactDao;
    private EditText inputMessage;
    private Message message;
    private List<Message> messages;
    private chatAdapter adapter;
    private UserProfile myUser;
    private UserProfile contact;

    private String chatId;
    private RecyclerView lstMessages;
    private ImageView profileImage;
    private TextView profileName;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        db = AppDB.getDB(getApplicationContext());
        messageDao = db.messageDao();

        cdb = ContactDB.getDB(getApplicationContext());
        contactDao = cdb.contactDao();

        profileImage = findViewById(R.id.profileImage);
        profileName = findViewById(R.id.profileName);

        inputMessage = findViewById(R.id.inputMessage);
        FloatingActionButton btnSend = findViewById(R.id.btnSend);
        lstMessages = findViewById(R.id.lstMessages);
        chatId = getIntent().getStringExtra("id");


        myUser = new UserProfile(getIntent().getStringExtra("loggedInUser_username"), null, null);
        contact = new UserProfile(getIntent().getStringExtra("username"),
                getIntent().getStringExtra("displayName"),
                getIntent().getStringExtra("profilePic"));

        if (contact.getProfilePic() != null && !contact.getProfilePic().isEmpty()) {
            Glide.with(this)
                    .load(contact.getProfilePic())
                    .into(profileImage);
        }
        messages = messageDao.index();
        profileName.setText(contact.getDisplayName());
        adapter = new chatAdapter(this, myUser, contact);
        lstMessages.setAdapter(adapter);
        lstMessages.setLayoutManager(new LinearLayoutManager(this));
        adapter.setMessages(messages);

        Contact myContact = new Contact(chatId, contact, null);
        MessageAPI messageAPI = new MessageAPI();

        btnSend.setOnClickListener(view -> {
            String currentDateTime = DateFormat.getDateTimeInstance().format(new Date());
            Sender sender = new Sender(myUser.getUsername());
            String content = inputMessage.getText().toString().trim();
            message = new Message(0, currentDateTime, sender, content, chatId);
            messageAPI.post(message, myContact);
            messageDao.insert(message);
            messages.add(message);
            adapter.setMessages(messages);
            LastMessage lastMessage = new LastMessage(message.getId(), message.getContent(), message.getCreated());
            myContact.setLastMessage(lastMessage);
            contactDao.update(myContact);
            lstMessages.scrollToPosition(messages.size() - 1);
            inputMessage.getText().clear();
            //finish();
        });

        //TODO: Fix sending push to myself
        //TODO: ? Add navigate to chat when clicking on the notification

        messageDao.getChatMessages(chatId).observe(this, (messages) -> {
            adapter.setMessages(messages);
            adapter.notifyDataSetChanged();
        });

        // Call the get() method to retrieve messages from the server
        messageAPI.get(this, myContact);
    }

    @Override
    public void onSuccess(List<Message> messages) {
        for (Message message : messages) {
            message.setChatId(chatId);
            if (messageDao.get(message.getId()) == null) {
                messageDao.insert(message);
            }
        }
    }

    @Override
    public void onFailure(Throwable t) {
        // Handle the failure as needed
    }
}
