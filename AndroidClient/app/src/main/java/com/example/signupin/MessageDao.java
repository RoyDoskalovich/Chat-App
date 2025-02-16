package com.example.signupin;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import com.example.signupin.network.models.Message;

import java.util.List;

@Dao
public interface MessageDao {
    @Query("SELECT * FROM message")
    List<Message> index();

    @Query("SELECT * FROM message WHERE chatId  = :chatId ")
    LiveData<List<Message>> getChatMessages(String chatId);

    @Query("SELECT * FROM message WHERE id = :id")
    Message get(int id);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(Message... messages);

    @Update
    void update(Message... messages);

}
