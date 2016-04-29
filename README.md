# CheckTraffic

This project has been created using NodeJS, Express (backend) and D3.js, jQUERY, Bootstrap (frontend).
The mock server is located under Test.
traffic_check.json contains the DB dump in json.
Thanks!


I used NodeEclipse to create the application.
The architecture is as follows:
Views: Client code     Routes: routing code    Public: Client scripts    app.js: server code  

(Mock server) Water_properties.java : DB credentials (change these as required)
              Traffic.java          : Single Thread that adds entries (source addr, destination addr etc.) to the traffic_check table
                                      (This currently add 50 entries while sleeping for 100ms. You can increase/decrease this as required.)
                                    
(Application)  app.js               : NodeJS file. Get Node running by running this first. You will see the application on localhost:3000
               
               
Steps to use the application:
1. Run the Traffic.java thread class. The current mock query is for source IP as : 127.0.0.2 and inserts random bytes and packets.
2. Enter a time range/(packet/byte range) / (source/destination range) in the application (optional).
3. Click SUBMIT. 
4. You should now see the real-time packets and bytes streaming on screen.
5. The application can be stopped at any time by refreshing the screen.
