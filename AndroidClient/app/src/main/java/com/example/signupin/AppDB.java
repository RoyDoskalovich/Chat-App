package com.example.signupin;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.migration.Migration;
import androidx.sqlite.db.SupportSQLiteDatabase;

import com.example.signupin.network.models.Message;

@Database(entities = {Message.class}, version = 5)
//@TypeConverters(Converters.class)
public abstract class AppDB extends RoomDatabase {
    public abstract MessageDao messageDao();
    //public abstract ContactDao contactDao();

    private static volatile AppDB instance;

    public static synchronized AppDB getDB(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context, AppDB.class, "FooDB") //TODO: Check with applicationContext
                    .allowMainThreadQueries()
                    .build();
        }
        return instance;
    }
}