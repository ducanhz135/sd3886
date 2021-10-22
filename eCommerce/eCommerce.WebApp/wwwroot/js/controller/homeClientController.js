

function CRateOut(rating) {
    for (var i = 1; i <= rating; i++) {
        $('#span' + i).removeClass('checked');
    }
}

function CRateOver(rating) {
    for (var i = 1; i <= rating; i++) {
        $('#span' + i).addClass('checked');
    }
}

function CRateClick(rating) {
    $('#lblRating').val(rating);

    for (var i = 1; i <= rating; i++) {
        $('#span' + i).addClass('checked');
    }

    for (var i = rating + 1; i <= 5; i++) {
        $('#span' + i).removeClass('checked');
    }
}

function CRateSelected() {
    var rating = $('#lblRating').val();

    for (var i = 1; i <= rating; i++) {
        $('#span' + i).addClass('checked');
    }

}

function CRateSelected() {
    var rating = $('#lblRating').val();

    for (var i = 1; i <= rating; i++) {
        $('#span' + i).addClass('checked');
    }

}

function VerifyRating() {
    var rating = $('#lblRating').val();

    if (rating == "0") {
        alert("Please select rating");
        return false;
    }

}