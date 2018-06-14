<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>

<style media="screen">
body{
    display:flex;
    min-height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    align-items:center;
    justify-content: center;
    flex-direction: column;
}

uploader{
    appearance: none;
    width: 50%;
    margin-bottom: 10px;
}

</style>

<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>


</head>
<body>
<h1>HELLO WORLD</h1>
<progress value="0" max="100" id="uploader">0%</progress>
<input type="file" value="upload" id="fileButton">

<script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC-2rHVM65lDTcYkATUXyUQrM25JxE956s",
    authDomain: "my-project-1520789442820.firebaseapp.com",
    databaseURL: "https://my-project-1520789442820.firebaseio.com",
    projectId: "my-project-1520789442820",
    storageBucket: "my-project-1520789442820.appspot.com",
    messagingSenderId: "546385381449"
};
firebase.initializeApp(config);

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];
    var storage_ref = firebase.storage().ref("sweet_gifs/" + file.name)
    var task = storage_ref.put(file)
    task.on('state_changed', 
    function progress (snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploader.value = percentage
    },
    function error(err){
        alert("UPLOAD FAILED")
    },
    function complete() {
        alert("UPLOAD COMPLETED")
    }
    )
    console.log(task)
    
})
</script>
</body>
</html>