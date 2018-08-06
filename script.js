
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

dbref = firebase.database().ref().child('heroes');
storageref = firebase.storage().ref();
hero_picref = storageref.child('heroes_pic');

heroesList = $('#heroes');
$('#hero-pic-upload').change(function(e){
    file = e.target.files[0]
    console.log(file.name);
    
    tempfileref_name = CryptoJS.SHA256("temp" + file.name);
    // ref = hero_picref.put(tempfileref_name);
    console.log(tempfileref_name);
});

//Setting up firebase event

/*
heroes database ref
*/

dbref.on('value', snap => {
})

dbref.on('child_added', function(data){
    $("#heroes").append(herolistCreateHelper(data))
    
})
dbref.on('child_removed', function(data){
    $("#" + data.key).remove();
})

/*
heroes profile image
*/

function herolistCreateHelper(param){
    $("#heroes").append(`<li><button id="${param.key}" class='btn btn-submit hero'>` + param.val().name + "</button></li>");
    $(`#${param.key}`).click(function(){
        showprofile(param)
    })
    $('button#' + param.key).hover(function(e){
        $(this).css({'color': 'black', 'background-color':param.val().color });
    }).mouseout(function(){
        $(this).css({'color': 'black', 'background-color':'aliceblue' });
    })
}


var showingID;
var isShow = false;
var counter = 0
function showprofile(param){
    if (isShow){
        if (param.key == showingID){
            $('#right-content').collapse('toggle')
            showingID = "";
            isShow = !isShow;
            
        }else{
            showingID = param.key;
            dbref.child(showingID).on('value', function(snap){
                $('#hero-profile h1').text('THIS IS ' + snap.val().name)
            })
        }
    }else{
        showingID = param.key;
        isShow = !isShow;
        dbref.child(showingID).on('value', function(snap){
            $('#hero-profile h1').text('THIS IS ' + snap.val().name)
        })
        $('#right-content').collapse('toggle')
    }

}

/*
Webpage all event 
*/

$('#hero-studio').on('change', function(){
    if (this.value == 2 ){
        $('#other-studio').prop('disabled', false);
    }else{
        $('#other-studio').prop('disabled', true);
    }
})
function setColorText(){
    $('#hero-color-text').val($('#hero-color').val())
}
$('#hero-color').on('change', function(){
    setColorText()
})

$('#hero-create').submit(function(){
    name = $('#hero-name').val();
    from = $('#hero-studio').val();
    if (from < 2){
        from = $('#hero-studio option:selected').text();
    }else{
        from = $('#other-studio').val();
    }
    color = $('#hero-color-text').val();
    
    newHero = dbref.push({
        name:name,
        from:from,
        color:color
    })
    
    $('#hero-create')[0].reset();
    $('#button-add-hero').click()
    return false;
})
setColorText()