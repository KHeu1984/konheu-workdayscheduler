// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });

$(document).ready(function () {
  // Add a listener for click events on the save button.
  $(".save-button").on("click", function () {
    // Get the id in the containing time-block.
    var timeBlockId = $(this).closest(".time-block").attr("id");
    
    // Save the user input in local storage using the time-block id as a key.
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);

    // Notification that shows that iteam has been save to local storage.
    $("div").addClass("notification");

    //Add notification to document
    $("body").append(notification)

    // Time out to remove notification.
    setTimeout(function(){
      notification.removeClass("notification");

    }, 5000)
  });

// Check local storage.  

  // Apply past, present, or future class to each time block.
  var currentHour = parseInt(dayjs().format("H"));
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
      // add line of code to remove the class for past.
    } else {
      // add line of code to remove the class for past and present.
      $(this).addClass("future");
    }
  });

  // Get user input from localStorage and set the values of corresponding textarea elements.
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedUserInput = localStorage.getItem(timeBlockId);
    if (savedUserInput !== null) {
      $(this).find(".description").val(savedUserInput);
    }
  });

  // Display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});