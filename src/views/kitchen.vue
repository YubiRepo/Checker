<template>
    <div>
        <p v-for="(message, idx) in messages" :key="idx">{{ message }}</p>
    </div>
</template>
  
<script>
// We store the reference to the SSE client out here
// so we can access it from other methods
let sseClient;

export default {
    name: 'sse-test',
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        sseClient = this.$sse.create({
            url: '/your-events-server',
            format: 'json',
            withCredentials: true,
            polyfill: true,
        });

        // Catch any errors (ie. lost connections, etc.)
        sseClient.on('error', (e) => {
            console.error('lost connection or failed to parse!', e);

            // If this error is due to an unexpected disconnection, EventSource will
            // automatically attempt to reconnect indefinitely. You will _not_ need to
            // re-add your handlers.
        });

        // Handle messages without a specific event
        sseClient.on('message', this.handleMessage);

        // Handle 'chat' messages
        sseClient.on('chat', this.handleChat);

        // Handle once for a ban message
        sseClient.once('ban', this.handleBan);

        sseClient.connect()
            .then(sse => {
                console.log('We\'re connected!');

                // Unsubscribes from event-less messages after 7 seconds
                setTimeout(() => {
                    sseClient.off('message', this.handleMessage);
                    console.log('Stopped listening to event-less messages!');
                }, 7000);

                // Unsubscribes from chat messages after 14 seconds
                setTimeout(() => {
                    sse.off('chat', this.handleChat);
                    console.log('Stopped listening to chat messages!');
                }, 14000);
            })
            .catch((err) => {
                // When this error is caught, it means the initial connection to the
                // events server failed.  No automatic attempts to reconnect will be made.
                console.error('Failed to connect to server', err);
            });
    },
    methods: {
        handleBan(banMessage) {
            // Note that we can access properties of message, since our parser is set to JSON
            // and the hypothetical object has a `reason` property.
            this.messages.push(`You've been banned! Reason: ${banMessage.reason}`);
        },
        handleChat(message) {
            // Note that we can access properties of message, since our parser is set to JSON
            // and the hypothetical object has these properties.
            this.messages.push(`${message.user} said: ${message.text}`);
        },
        handleMessage(message, lastEventId) {
            console.warn('Received a message w/o an event!', message, lastEventId);
        },
    },
    beforeDestroy() {
        // Make sure to close the connection with the events server
        // when the component is destroyed, or we'll have ghost connections!
        sseClient.disconnect();

        // Alternatively, we could have added the `sse: { cleanup: true }` option to our component,
        // and the SSEManager would have automatically disconnected during beforeDestroy.
    },
};
</script>