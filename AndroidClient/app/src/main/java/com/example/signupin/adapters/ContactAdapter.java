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
import com.example.signupin.R;
import com.example.signupin.network.models.Contact;

import java.util.List;

public class ContactAdapter extends RecyclerView.Adapter<ContactAdapter.ContactViewHolder> {

    private List<Contact> contacts;
    private LayoutInflater mInflater;
    private OnItemClickListener onItemClickListener;

    public ContactAdapter(Context context) {
        mInflater = LayoutInflater.from(context);
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
        notifyDataSetChanged();
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        this.onItemClickListener = listener;
    }

    @NonNull
    @Override
    public ContactViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = mInflater.inflate(R.layout.my_contact, parent, false);
        return new ContactViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ContactViewHolder holder, int position) {
        if (contacts != null) {
            Contact current = contacts.get(position);
            holder.bind(current);
        }
    }

    @Override
    public int getItemCount() {
        return contacts != null ? contacts.size() : 0;
    }

    public List<Contact> getContacts() {
        return this.contacts;
    }

    class ContactViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private ImageView tvContactPic;
        private TextView tvContactName;
        private TextView tvLastMsgContent;
        private TextView tvLastMsgCreated;

        private ContactViewHolder(View itemView) {
            super(itemView);
            tvContactPic = itemView.findViewById(R.id.tvContactPic);
            tvContactName = itemView.findViewById(R.id.tvContactName);
            tvLastMsgContent = itemView.findViewById(R.id.tvLastMsgContent);
            tvLastMsgCreated = itemView.findViewById(R.id.tvLastMsgCreated);

            itemView.setOnClickListener(this);
        }

        private void bind(Contact contact) {
            RequestOptions requestOptions = new RequestOptions().transform(new CircleCrop());
            Glide.with(itemView.getContext())
                    .load(contact.getUser().getProfilePic())
                    .apply(requestOptions)
                    .into(tvContactPic);

            tvContactName.setText(contact.getUser().getUsername());
            if (contact.getLastMessage() != null) {
                tvLastMsgContent.setText(contact.getLastMessage().getContent());
                tvLastMsgCreated.setText(contact.getLastMessage().getCreated());
            }
        }

        @Override
        public void onClick(View v) {
            if (onItemClickListener != null) {
                int position = getAdapterPosition();
                if (position != RecyclerView.NO_POSITION) {
                    onItemClickListener.onItemClick(position);
                }
            }
        }
    }

    public interface OnItemClickListener {
        void onItemClick(int position);
    }
}

