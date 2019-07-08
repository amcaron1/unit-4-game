$(document).ready(function() {
  // Array of crystals and their pictures
  var crystals = [
    {name: "diamond", picture: "assets/images/diamond1.png"},
    {name: "emerald", picture: "assets/images/emerald1.png"},
    {name: "garnet", picture: "assets/images/garnet1.png"},
    {name: "ruby", picture: "assets/images/ruby1.png"}, 
  ]

  var crystalCounter = 0;
  var winsCounter = 0;
  var lossesCounter = 0;
  var gameOver = false;
  var targetNumber = Math.floor(Math.random() * 102) + 19;

  // Disables the reset button until after a game is completed
  $('#resetButtonH').prop('disabled', true);

  // Creates target number.
  $("#targetNumberH").text(targetNumber);
 
  // Creates each crystal dynamically.  This was not necessary, but wanted to practice dynamic creation
  for (var i = 0; i < crystals.length; i++) {

    // For each iteration, an imageCrystal is created.
    var imageCrystal = $("<img>");

    // First each crystal is given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal is given a src link to the crystal image
    imageCrystal.attr("src", crystals[i].picture);

    // Each imageCrystal is given a data attribute called data-crystalValue that contains a random number 1-12
    imageCrystal.attr("data-crystalvalue", Math.floor(Math.random() * 11) + 1);

    // Each imageCrystal is given an id in order to reset the data-crystalvalue.
    imageCrystal.attr("id", i);

    // Lastly, each crystal image (with all it classes and attributes) is added to the page.
    $("#crystals").append(imageCrystal);

  }
    
  // The click event applies to every single crystal on the page. Not just one.
  $(document).on("click", ".crystal-image", function() {
    
    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    if (gameOver == false) {
      var crystalValue = ($(this).attr("data-crystalvalue"));
      crystalValue = parseInt(crystalValue);
      // We then add the crystalValue to the user's "counter" which is a global variable.
      // Every click, from every crystal adds to the global counter.
      crystalCounter += crystalValue;

      // The counter is updated on the screen.
      $("#crystalCounterH").text(crystalCounter);

      // If the player matches the target number, then the win counter is incremented and a win message is displayed
      if (crystalCounter === targetNumber) {
        winsCounter += 1
        $("#winsCounterH").text(winsCounter);
        $("#messageH").html("You win! &nbsp; &nbsp; Click Reset to start a new game.");
        gameOver = true;
        $('#resetButtonH').prop('disabled', false);
      }

      // If the player exceeds the target number, then the loss counter is incremented and a loss message is displayed
      if (crystalCounter > targetNumber) {
        lossesCounter += 1
        $("#lossesCounterH").text(lossesCounter);
        $("#messageH").html("Sorry, you lost! &nbsp; &nbsp; Click Reset to start a new game.");
        gameOver = true;
        $('#resetButtonH').prop('disabled', false);
      }
    }
  });

  // This code resets the game when the reset button is pressed after a win or loss
  $(document).on("click", "#resetButtonH", function() {
    console.log("gameOver = " + gameOver);
    if (gameOver) {
      gameOver = false;
      targetNumber = Math.floor(Math.random() * 101) + 20;
      $("#targetNumberH").text(targetNumber);
      crystalCounter = 0;
      $("#crystalCounterH").text(crystalCounter);
      $("#messageH").text("Good Luck!");
      for (var i = 0; i < crystals.length; i++) {
        var crystalNumber = "#" + i;
        console.log(crystalNumber);
        $(crystalNumber).attr("data-crystalvalue", Math.floor(Math.random() * 11) + 1);
      }
      $('#resetButtonH').prop('disabled', true);
    }
  })

})
