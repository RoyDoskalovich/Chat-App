const admin = require("firebase-admin");
const serviceAccount = require("../firebaseKey.json");
const {getMessaging} = require("firebase-admin/messaging");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendFirebaseMessage = (firebaseToken, message, senderUsername, chatId) => {
    console.log(message)
    const messageToSend = {
        notification: {
            title: senderUsername,
            body: message.content,
        },
        data: {
            created: message.created.toISOString(),
            senderUsername: senderUsername,
            content: message.content,
            chatId: chatId.toString(),
        },
        token: firebaseToken,
    };

    console.log(messageToSend)

    try {
        getMessaging().send(messageToSend)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    } catch (error) {
        console.log('Caught an error:', error);
    }
}

module.exports = {sendFirebaseMessage}