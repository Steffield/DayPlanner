//clear only works when page is reloaded
//it does not trim the values

$(document).ready(function() {

//global variables

    var currentDateEl = moment().format("MMMM Do YYYY");   
    var currentTimeEl =moment().format("H"); // Military Time
            console.log(currentTimeEl);  
    var officeHours= [8, 9,10,11,12,13,14,15,16,17,18];
    var tasks =[];


//start off function

    function init (){
        var savedTodosFromStorage =[];
        //call the todos that were entered
        savedTodosFromStorage = JSON.parse(localStorage.getItem("tasks"));
        console.log(savedTodosFromStorage);
        //update tasks array
        if(savedTodosFromStorage!== null){
            tasks=savedTodosFromStorage;
        }
        //create today's date
        todaysDate();
        //create time slot body
        createHourDivs();
        //call the saved todos
        storeTodos();
    }


//call start off function and tasks from local storage

    init();
  

//current date in header function

    function todaysDate(){
        $("#currentDay").text("Schedule for "+ currentDateEl); 
    }


//function that creates the body and time slots with one row with 3 colums for each slot
    function createHourDivs(){
        for (var i = 0; i < officeHours.length; i++) {
        // Create row
            var holderEl = $("<div class='row'>");
            // id for row
            $(holderEl).attr("data-holder", i);
            
        //1st column in row is time column
            var timeBlockEl = $("<div class='col-lg-1'>");
            //time slot id and text/time
             $(timeBlockEl).attr("data-timeslot", officeHours[i]).text(officeHours[i]+":00");
            //append time slots/column1 into div
            $(holderEl).append(timeBlockEl);

        //2nd column- add textarea col
            var textEl = $("<div class='col-lg-10'>");
            //output time slot id and inputarea
            $(textEl).attr("data-text", officeHours[i]);
            $(textEl).append('<input type="todo" class="form-control" id="toDo'+ officeHours[i] + '">');
            //append text slots into div
            $(holderEl).append(textEl);

        //3rd column add save button col 
            var saveButtonEl = $("<div class='col-lg-1'>");
            //output save id and text 
            $(saveButtonEl).append('<button type="submit" class="btn btn-light" id="Btn'+officeHours[i] +'">Save <i class="fa fa-save"></i></button>');
            // $(saveButtonEl).append('<button type="submit" class="btn btn-light" id="Btn'+officeHours[i] +'">save</button>');
            //button column styling but btn itself in css
            $(saveButtonEl).attr("data-saveBtn", officeHours[i]);
            //append buttons into div
            $(holderEl).append(saveButtonEl);

        //append rows into into container
            $(".fullDayContainer").append(holderEl);

        //create and append clear Todos button
            $("#clearBtn").on("click", clearToDos);

    //chnage row opacity depending on current time
            if(currentTimeEl == officeHours[i]){
                $(timeBlockEl).css("background-color", "#732741");
                $(holderEl).css("border", "2px solid #732741");
                // $(timeBlockEl).attr("data-timeslot", officeHours[i]).text("Now: " + officeHours[i]+":00");
                $(saveButtonEl).css("background-color", "#732741");
                // $(holderEl).css("background-color", "#cbd3da")
            } else if (currentTimeEl > officeHours[i]){
                $(holderEl).css("background-color", "#e9ecef");
                $(timeBlockEl).css("background-color", "#ac3b61");
    
                // $(".btn").css("background-color", "#ac3b61");
                // $(".btn").css("color", "white");
                // $(".btn").text("Passed");
                $(holderEl).css("opacity", ".25");
            } else { 
                $(holderEl).css("background-color", "#e9ecef")

                // $(holderEl).css("opacity", ".85");
                // $(".btn").css("background-color", "#ac3b61");
                // $(".btn").css("color", "white");


            }
            //retrieve the stored to dos and add them
            // console.log(tasks.length);
            if(tasks && (tasks.length)){
                for(var k =0; k<tasks.length; k++){
                //find time slot for index in the array
                // console.log(tasks[k].time);
                // console.log($(`[data-text="${tasks[k].time}"]`))
                $(`[data-text="${tasks[k].time}"]`).text(tasks[k].description)
                }
            }
        }
    } 


// function that stores the entered toDos
    function storeTodos() {
        console.log("storeTODO-functionruns");
            // Stringify and set "todos" key in localStorage to todos array
            $(".btn").on("click", function(event){
                console.log(event.target.id);
                var element = event.target;
                var indexBtn = element.parentElement.getAttribute("data-saveBtn");
                console.log(indexBtn);
                
                var taskInput = $('#toDo'+indexBtn+'').val();
                console.log(taskInput);

                var task ={
                    time: indexBtn,
                    description: taskInput
                };
                console.log(task);
                console.log(task.length);

                //is there an entry in tasks already?
                if (tasks && (tasks.length )) {
                    var indexNewtasks = tasks.findIndex(function(item) {
                        console.log(item.time);
                        return item.time === indexBtn;
                    });
                

                    // If timeslot is taken
                    if (indexNewtasks >= 0) {
                        var newtasks = [];  //temp array

                        // Copy tasks into the temporary array
                        for (var m = 0; m < indexNewtasks; m++) {
                            newtasks.push(tasks[m]);
                        }

                        // Copy tasks that follow the found object into the temporary array
                        for (var n = indexNewtasks + 1; n < tasks.length; n++) {
                            newtasks.push(tasks[n]);
                            console.log(newtasks);
                        }

                        // Point appointments to our new temporary array, if it exists, or to an empty array
                        if (newtasks && (newtasks.length > 0)) {
                            tasks = newtasks;
                        } else {
                            tasks = [];
                        }

                    localStorage.removeItem("tasks");
                    }
                }
                
                if(task.description.length>0){
                    tasks.push(task);
                // } else {
                //     clear($(".form-control"));
                }
        
                // Add to local storage
                localStorage.setItem('tasks',JSON.stringify(tasks));
                          
            });     
    }


//click button and clear local storage
    function clearToDos(){
        console.log("clear function runs");
        // tasks=[];
        // console.log(tasks.length);
        // if(tasks && (tasks.length)){
        // for(var k =0; k<tasks.length; k++){
        //     //find time slot for index in the array
        //     console.log(tasks[k].time);
        //     // console.log($(`[data-text="${tasks[k].time}"]`))
        //     $(`[data-text="${tasks[k].time}"]`).text(tasks[k].description)
        //     }
        // }
        localStorage.clear();
        // for(var i=0; i<officeHours.length; i++){
        //     task ={
        //         time: indexBtn,
        //         description: taskInput
        //     };
        //     taskInput ="";
        // //     tasks

        // }
        // storeTodos();
        // renderTodos();

        }

});

    