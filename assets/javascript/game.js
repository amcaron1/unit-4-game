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
  var targetNumber = Math.floor(Math.random() * 101) + 20;

  $("#targetNumberH").text(targetNumber);
 


  // Now for the hard part. Creating multiple crystals each with their own unique number value.

  // Next we create a for loop to create each crystal
  for (var i = 0; i < crystals.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", crystals[i].picture);

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    imageCrystal.attr("data-crystalvalue", Math.floor(Math.random() * 11) + 1);


    imageCrystal.attr("id", i);

  
    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);

  }
    



  // This time, our click event applies to every single crystal on the page. Not just one.
  // $(".crystal-image").on("click", function() {

  // for handling elements that are created after the jQuery
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

      // All of the same game win-lose logic applies. So the rest remains unchanged.
      $("#crystalCounterH").text(crystalCounter);
      // alert("New score: " + crystalCounter);

      if (crystalCounter === targetNumber) {
        winsCounter += 1
        $("#winsCounterH").text(winsCounter);
        $("#messageH").text("You win!  Click Reset to start a new game.");
        gameOver = true;
      }

    if (crystalCounter > targetNumber) {
        lossesCounter += 1
        $("#lossesCounterH").text(lossesCounter);
        $("#messageH").text("Sorry, you lost!  Click Reset to start a new game.");
        gameOver = true;
      }
    }
  });

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
    }
  })