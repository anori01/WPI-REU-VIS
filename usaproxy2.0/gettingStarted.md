Here is the code I ran in order to get UsaProxy to start listening for connections from other computers.
Once you navigate to the folder with usaproxy.jar in it, type:

java -jar usaproxy.jar -port 4380 -remoteIP <ip goes here> -remotePort <4380>

If I understand ports correctly, putting port 4380 might not work for you, because that was simply one that was inactive for my 
own personal computer. Also, before I ran that command I had to change the settings in the browser of the computer that I was
trying to monitor to recognize my laptop as a proxy. This is all more or less outlined in the readme.txt already included.
