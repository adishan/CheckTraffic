package test;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

class TrafficThread extends Thread {
	static Water_properties prop=new Water_properties();
	
	public void run(){
	try{
			
	Connection conn=DriverManager.getConnection(prop.servername,prop.username,prop.password);
	int count=0;
	Statement stmt=conn.createStatement();
	
	while(count!=50){
	    String insert="insert into traffic_check values (null,'127.0.0.2','"+(int)Math.floor(Math.random()*5000)+"','virtual1','127.0.0.32','"+(int)Math.floor(Math.random()*5000)+"','virtual2','6','"+(int)Math.floor(Math.random()*50000)+"','"+(int)Math.floor(Math.random()*100000)+"')";
		stmt.executeUpdate(insert);
		System.out.println("Record successfully inserted...\n");
		count++;
		Thread.sleep(500);
	 }
	}
	catch(Exception e){
		e.printStackTrace();
	}
	}
}

public class Traffic{
	
	public static void main (String []args){
		try{
		TrafficThread traffic=new TrafficThread();
		Thread t=new Thread(traffic);
		t.start();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}
  }

