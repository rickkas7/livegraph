#include "Particle.h"

// How often to send samples in milliseconds
const unsigned long SEND_PERIOD_MS = 20;

// Analog input pin that's connected to a potentiometer in the test
const int INPUT_PIN = A0;

// IP address and port of the server. Note that the node server uses two ports - one for the web browser
// and a raw TCP port for receiving data. This is the port number for the data port, not the web server port!
IPAddress serverAddress(192,168,2,4);
int serverPort = 8081;

// Finite state machine states
enum {CONNECT_STATE, SEND_DATA_STATE};

TCPClient client;
unsigned long lastSend = 0;
int state = CONNECT_STATE;

void setup() {
	Serial.begin(9600);
}

void loop() {
	switch(state) {
	case CONNECT_STATE:
		Serial.println("connecting...");
		if (client.connect(serverAddress, serverPort)) {
			state = SEND_DATA_STATE;
		}
		else {
			Serial.println("connection failed");
			delay(15000);
		}
		break;

	case SEND_DATA_STATE:
		if (client.connected()) {
			// Discard any incoming data; there shouldn't be any
			while(client.available()) {
				client.read();
			}

			// Send data up to the server
			if (millis() - lastSend >= SEND_PERIOD_MS) {
				lastSend = millis();

				// analogRead returns 0 - 4095; remove the low bits so we got 0 - 255 instead.
				int val = analogRead(INPUT_PIN) >> 4;

				client.write((unsigned char)val);
			}
		}
		else {
			// Disconnected
			Serial.println("disconnected...");
			client.stop();
			state = CONNECT_STATE;
			delay(5000);
		}
		break;
	}

}
