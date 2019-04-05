#include <Stepper.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "u cant hack this";
const char* password = "qwertyuiop";

#define ledPin 13 // GPIO13

StaticJsonBuffer<200> jsonbuffer;

WiFiClient client;
IPAddress server(192, 168, 43, 36);

HTTPClient http;

String Post(String URL, String header, String content) {
  http.begin(URL);
  http.addHeader("Content-Type", header);

  Serial.println("Post: " + URL);

  int httpCode = http.POST(content);

  if (httpCode > 0){
    String payload = http.getString();
    http.end();
    return payload;
  }
  else {
    http.end();
    return "error";
  }

}

String Get(String URL) {
    
  http.begin(URL);
  int httpCode = http.GET();

  if (httpCode > 0) { //Check the returning code
    String payload = http.getString();   //Get the request response payload
    http.end();
    return payload;
  }
  else {
    http.end();
    return "error";
  }
}

void setup() {
  Serial.begin(115200);
  delay(10);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
}

void loop() {
  Serial.println(Get("http://192.168.43.36:3000/test"));
  delay(10000);
  String post = Post("http://192.168.43.36:3000/addCar", "application/x-www-form-urlencoded", "ownerName=HK&towerLocation=1&parkIndex=1"); 
  JsonObject& outData = jsonbuffer.parseObject(post);

  const char* success = outData["success"];
  const char* qrUrl = outData["qrUrl"];
  long passkey = outData["passkey"];
  
  
  Serial.print("success: ");
  Serial.println(success);
  Serial.print("passkey: ");
  Serial.println(passkey);
  Serial.print("qrUrl: ");
  Serial.println(qrUrl);
  delay(10000);
}
