# SL2M

This is a web application build using NodeJS which will take artist name as the input and display a list of albums using iTunes API 

How to Execute App locally?

1. Clone the project locally from `github` via command 
    `git clone git@github.com:AmitThakkar/SL2M.git`  OR
    
    `git clone https://github.com/AmitThakkar/SL2M.git` OR
    
    download zipped from [https://github.com/AmitThakkar/SL2M](https://github.com/AmitThakkar/SL2M) and unzipped it.
      
2. Change directory to(Open terminal/command prompt and go inside the) SL2M via
    `cd SL2M`.
    
3. Install all the dependencies with command `npm install`.

4. Run `NodeJS` with command `node app`, It will execute `NodeJS` server at port **8081**. 
    > Make sure there is no there process is running on port 8081, or you can change the port in `server/config.js` file.

5. Open another tab and go to same directory `SL2M`.

6. Run `AngularJS` app with command `npm start`. 
    > `npm start` will automatically open new table in your default browser and will execute app at `http://localhost:3000`, if it does
     not the please open it manually.


Pending Stuff(Because of time constraint):

1. No CSS work done, so it is not responsive and it is plan HTML App.

2. No loading bar on ajax call.

How to Test:

1. Type `Sonu Nigam` into text box just after **Enter Artist Name:**
    > It will show list of all the artist matching to `Sonu Nigam`. 

2. Click on any Artist you like:
    > It will hide artist list and will show album list with picture.

3. Click on any album you like, It will fetch track list from server and will show you in the popup.
     
