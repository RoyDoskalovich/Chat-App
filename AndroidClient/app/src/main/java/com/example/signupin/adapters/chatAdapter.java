package com.example.signupin.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CircleCrop;
import com.bumptech.glide.request.RequestOptions;
import com.example.signupin.MyApplication;
import com.example.signupin.R;
import com.example.signupin.network.models.Contact;
import com.example.signupin.network.models.Message;
import com.example.signupin.network.models.User;
import com.example.signupin.network.models.UserProfile;
import com.mikhaellopez.circularimageview.CircularImageView;

import java.util.List;

public class chatAdapter extends RecyclerView.Adapter<chatAdapter.MessageViewHolder> {

    class MessageViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvMessageContent;
        private final TextView tvTimeAndDate;

        private MessageViewHolder(View itemView) {
            super(itemView);
            tvMessageContent = itemView.findViewById(R.id.tvMessageContent);
            tvTimeAndDate = itemView.findViewById(R.id.tvTimeAndDate);
        }
    }

    private List<Message> messages;
    private final LayoutInflater mInflater;
    private final UserProfile myUser;
    private final UserProfile contact;
    public static final int ME = 0;
    public static final int CONTACT = 1;

    public chatAdapter(Context context, UserProfile myUser, UserProfile contact) {
        mInflater = LayoutInflater.from(context);
        this.myUser = myUser;
        this.contact = contact;
    }

    @NonNull
    @Override
    public MessageViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView;
        if (viewType == ME) {
            itemView = mInflater.inflate(R.layout.my_message, parent, false);
        } else {
            itemView = mInflater.inflate(R.layout.contact_message, parent, false);
        }
        return new MessageViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull MessageViewHolder holder, int position) {
        if (messages != null) {
            final Message current = messages.get(position);
            holder.tvMessageContent.setText(current.getContent());
            holder.tvTimeAndDate.setText(current.getCreated());
        }
    }


    @Override
    public int getItemCount() {
        if (messages != null) {
            return messages.size();
        }
        return 0;
    }

    @Override
    public int getItemViewType(int position) {
        if (messages.get(position).getSender().getUsername().equals(this.myUser.getUsername())) {
            return ME;
        } else {
            return CONTACT;
        }
    }

    public void setMessages(List<Message> m) {
        messages = m;
        notifyDataSetChanged();
    }
}
