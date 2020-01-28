$(document).ready(function() {

    var currentDateEl = moment().format("MMMM Do YYYY");   
    var currentTimeEl =moment().format("H"); // Military Time
    console.log(currentTimeEl);  
   
    var officeHours= [8, 9,10,11,12,13,14,15,16,17,18];


    //header with current date
    
    function todaysDate(){
        $("#currentDay").text("Schedule for "+ currentDateEl); 
        //style curretn day <p>
        $("#currentDay").css("color", "#ac3b61");
        $("#currentDay").css("font-size", "30px");
    }
    todaysDate();

    // callTask();
    //body


    //create one row with 3 colums for all 10 time slots
    function createHourDivs(){
        for (var i = 0; i < officeHours.length; i++) {
        // Create row
            var holderEl = $("<div class='row'>");
      
            // id for row
            $(holderEl).attr("id", officeHours[i]);

            //div row styling
            $(holderEl).css("margin", "10px");
            $(holderEl).css("border", "1px black solid");
            // $(holderEl).css("background-color", "white");
            $(holderEl).css("background-color", "#e9ecef")
            $(holderEl).css("box-shadow", "0 3px 2px #777");

            
        //1st column in row is time column
            var timeBlockEl = $("<div class='col-lg-1'>");
            
            //time slot id and text/time
            $(timeBlockEl).attr("id", officeHours[i]).text(officeHours[i]+":00");

            //column 1 styling
        
            $(timeBlockEl).css("background-color", "#ac3b61");
            $(timeBlockEl).css("color", "white");
            $(timeBlockEl).css("font-size", "1.2em");
            $(timeBlockEl).css("text-align", "center");
            $(timeBlockEl).css("padding", "10px");
            $(timeBlockEl).css("border", "1px solid black");

            //append time slots/column1 into div
            $(holderEl).append(timeBlockEl);


        //2nd column- add textarea col
            var textEl = $("<div class='col-lg-9'>");
            
            //output time slot id and inputarea
            $(textEl).attr("id", officeHours[i]);
            $(textEl).append('<input type="todo" class="form-control" id="toDo'+ officeHours[i] + '">');

            //style text column
            $(textEl).css("padding", "10px");            
            $(textEl).css("font-size", "1.2em");
            $(textEl).css("border-radius", "5px");

            //append text slots into div
            $(holderEl).append(textEl);

        //3rd column add save button col 
            var saveButtonEl = $("<div class='col-lg-2'>");
            
            //output save id and text 
            $(saveButtonEl).append('<button type="submit" class="btn btn-light" id="Btn'+officeHours[i]+'">save</button>');
            
            //button column styling but btn itself in css
            $(saveButtonEl).attr("id", officeHours[i]);
            $(saveButtonEl).css("text-align", "center");
            $(saveButtonEl).css("font-size", "1.2em");
            $(saveButtonEl).css("padding", "10px");
            $(".btn").css("box-shadow", "3px 3px 2px #ac3b61");


            //append buttons into div
            $(holderEl).append(saveButtonEl);
            
            
        //append rows into into container
            $(".fullDayContainer").append(holderEl);

        //change rows depending on current time

            if(currentTimeEl == officeHours[i]){
                // $(timeBlockEl).css("font-size", "1.2em");
                $(timeBlockEl).css("background-color", "#ac3b61");
                //$(holderEl).css("border", "5px solid black");
                //$(timeBlockEl).css("color", "black");
                // $(".btn").css("box-shadow", "3px 3px 2px #ac3b61");
                $(holderEl).css("border", "2px solid black");

            } else if (currentTimeEl > officeHours[i]){
                $(holderEl).css("background-color", "#e9ecef");
                $(timeBlockEl).css("background-color", "#ac3b61");
                $(".btn").css("background-color", "#ac3b61");
                $(".btn").css("color", "white");

                // $(".btn").css("color", "white")
                $(".btn").text("Passed");
                //$(".form-control").css("background-color","#553D67" );
                $(holderEl).css("opacity", ".3");

            } else { 
                $(holderEl).css("background-color", "#e9ecef")
                // $(holderEl).css("background-color", "white");
                

            }
          }
          
    }

    createHourDivs();

    //set and get input to local storage

    $(".btn").on("click", function(element){
        console.log(element.target.id);
        for (i = 8; i <= 18; i++) {
            var task = $('#toDo' + i).val();
            console.log(task)
            localStorage.setItem('task' + i, task);
            //get Item
            $('#toDo' + i).val(task) = localStorage.getItem("task" + i);;
        }
    });

    // function callTask() {
    //     $('#toDo' + i).val(task) = localStorage.getItem("task" + i);;
    // }
    

// for (i = 8; i <= 18; i++) {
//     var task = $('#toDo' + i).val();
//     var saveTask= localStorage.setItem('task' + i, task);
//     console.log(task)

//     var callTask = localStorage.getItem("task" + i);

    //var timeSlotToDoEl = $("#toDo"+officeHours[i]);

    // var clickedButtonEl;

    // var divElementIds =[
    //     {
    //         buttonId: "Btn8",
    //         taskId: $("#toDo8")
    //     },
    //     {
    //         buttonId: "Btn9",
    //         taskId: $("#toDo9")
    //     },
    //     {
    //         buttonId: "Btn10",
    //         taskId: $("#toDo10")
    //     },
    //     {
    //         buttonId: "Btn11",
    //         taskId: $("#toDo11")
    //     },
    //     {
    //         buttonId: "Btn12",
    //         taskId: $("#toDo12")
    //     },
    //     {
    //         buttonId: "Btn13",
    //         taskId: $("#toDo13")
    //     },
    //     {
    //         buttonId: "Btn14",
    //         taskId: $("#toDo14")
    //     },
    //     {
    //         buttonId: "Btn15",
    //         taskId: $("#toDo15")
    //     },
    //     {
    //         buttonId: "Btn16",
    //         taskId: $("#toDo16")
    //     },
    //     {
    //         buttonId: "Btn17",
    //         taskId: $("#toDo17")
    //     },
    //     {
    //         buttonId: "Btn18",
    //         taskId: $("#toDo18")
    //     }
    // ];
    
    // ""Btn9", "Btn10","Btn11","Btn12","Btn13","Btn14","Btn15","Btn16","Btn17","Btn18"] },
    //     {taskIds: ["toDo8", "toDo9","toDo10","toDo11","toDo12","toDo13","toDo14","toDo15","toDo16","toDo17","toDo18",]}
    // ]
    // }
    // {buttonId: ["Btn8","Btn9", "Btn10","Btn11","Btn12","Btn13","Btn14","Btn15","Btn16","Btn17","Btn18"] },
    //     {taskIds: ["toDo8", "toDo9","toDo10","toDo11","toDo12","toDo13","toDo14","toDo15","toDo16","toDo17","toDo18",]}
    // ]
    // }

    

    // $("#loadTasks").click(function () {
    //     for (i = 9; i <= 17; ++i) {
    //         var task = localStorage.getItem("task" + i);
    //         $('#activityDescription' + i).val(task);
    //     }
            
    //     });

            // localStorage.setItem('storeObj', JSON.stringify(divElementIds));

            // var getObject = JSON.parse(localStorage.getItem('storeObj'));
            
            // // var clickedButtonEl = divElementIds.buttonId;
            // // var inputEl = divElementIds.taskId;
            // for (var j=0; j<divElementIds.length; j++){
            //     if(element.target.id === divElementIds[j].buttonId){
            //         // localStorage.("divElementIds[j].taskId", divElementIds[j].taskId.val());
            //         localStorage.setItem("divElementIds[j].taskId",getObject[j].taskId )
            //         // divElementIds[j].taskId.value = localStorage.;
            //         // localStorage.getItem('initials') + ': '+ localStorage.getItem('score');

            //         // localStorage.setItem("divElementIds[j].taskId", divElementIds[j].taskId.value);
            //         // localStorage.getItem
            //         // localStorage.content=$(divElementIds[j].taskId.html();
    //         //         console.log(localStorage);
    //         //     }
    //         };
    // });

//     $('#test').html("Test");
// localStorage.content = $('#test').html();
// $('#test').html(localStorage.content);



            // if(element.target.id === clickedButtonEl[0]){
            //     localStorage.setItem("inputEl[0]", inputEl[0]);
            // } else if (element.target.id === clickedButtonEl[1]){
            //     localStorage.setItem("inputEl[0]", inputEl[1]);
            // } else if (element.target.id === clickedButtonEl[2]){
            //     localStorage.setItem("inputEl[0]", inputEl[2]);
            // } else if (element.target.id === clickedButtonEl[3]){
            //     localStorage.setItem("inputEl[0]", inputEl[3]);
            // } else if (element.target.id === clickedButtonEl[4]){
            //     localStorage.setItem("inputEl[0]", inputEl[4]);
            // } else if (element.target.id === clickedButtonEl[5]){
            //     localStorage.setItem("inputEl[0]", inputEl[5]);
            // } else if (element.target.id === clickedButtonEl[6]){
            //     localStorage.setItem("inputEl[0]", inputEl[6]);
            // } else if (element.target.id === clickedButtonEl[7]){
            //     localStorage.setItem("inputEl[0]", inputEl[7]);
            // } else if (element.target.id === clickedButtonEl[8]){
            //     localStorage.setItem("inputEl[0]", inputEl[8]);
            // } else if (element.target.id === clickedButtonEl[9]){
            //     localStorage.setItem("inputEl[0]", inputEl[9]);
            // } else if (element.target.id === clickedButtonEl[10]){
            //     localStorage.setItem("inputEl[0]", inputEl[10]);
            // var tasktoSaveEl= $(".form-control.").val();
            // localStorage.setItem("tasktoSaveEl"+number, tasktoSaveEl);
            // console.log(clickedButtonEl);
            // console.log(tasktoSaveEl);
            
        // });

      
    
    
    });