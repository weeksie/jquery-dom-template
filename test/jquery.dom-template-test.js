$(function(){
    module("Simple DOM Template Test");

    
    test("simple text replacement", function(){
        expect(1);
        $("#people")
            .template("initialize", "#person_template")
            .template("replace", { ".name": "Hortense Bartleswigmot"});

        equals($("#people").find(".name").text(), "Hortense Bartleswigmot", "simple text replace");
    });

    test("Simple Array replacement", function(){
        expect(3);
        
        var items = [
            "Cthulhu is coming.",
            "I want to be devoured first."
        ];

        $("#people")
            .template("initialize", "#person_template")
            .template("replace", { li: items });

        equals($("#people li").length, 2);
        equals($("#people li:first").html(), "Cthulhu is coming.");
        equals($("#people li:last").html(),  "I want to be devoured first.");
    });
    
    test("[Function, Array] replacement", function(){
        expect(5);
        
        var objects = [
            { date: "12/12/2012", description: "World ended." },
            { date: "12/13/2012", description: "Shit, nevermind." }
        ];
        
        $("#people")
        .template("initialize", "#person_template")
        .template("replace", { "li": [ function(i, li, object){
            li.find(".date").html(object.date);
            li.find(".description").html(object.description);
        }, objects ]});

        equals($("#people li").length, 2);
        equals($("#people li:first .date").text(), "12/12/2012");
        equals($("#people li:last .date").text(),  "12/13/2012");
        equals($("#people li:first .description").text(), "World ended.");
        equals($("#people li:last .description").text(),  "Shit, nevermind.");
    });
});
