package com.example.signupin;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.signupin.network.models.Contact;


@Database(entities = {Contact.class}, version = 4)
@TypeConverters(Converters.class)
public abstract class ContactDB extends RoomDatabase {
    public abstract ContactDao contactDao();
    private static volatile ContactDB instance;

    public static synchronized ContactDB getDB(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(), ContactDB.class, "ContactDB")
                    .allowMainThreadQueries()
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }
}