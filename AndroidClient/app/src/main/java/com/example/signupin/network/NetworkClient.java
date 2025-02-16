package com.example.signupin.network;

import com.example.signupin.BaseUrl;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NetworkClient {

    private final static HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor()
        .setLevel(HttpLoggingInterceptor.Level.BODY);

    private final static OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .build();

    // Create Gson instance with lenient parsing
    private final static Gson gson = new GsonBuilder().setLenient().create();

    //Singleton client
    private final static Retrofit client = new Retrofit.Builder()
            .baseUrl(BaseUrl.getBaseUrl())
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build();

    public static WebServiceAPI webServiceAPI = client.create(WebServiceAPI.class);
}
