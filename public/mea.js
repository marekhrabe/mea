var remote = new Firebase('https://mea.firebaseio.com/quotes/' + document.location.host.toLowerCase().replace(/\./g, '-').replace(/\-dev$/, ''));

window.addEventListener('load', function () {
    var body = document.body;
    var nextButton = document.getElementById('next');
    var quoteElement = document.getElementById('quote');
    var adminInput = document.getElementById('admin');
    var adminHistory = document.getElementById('history');

    if (nextButton && quoteElement) {
        var quotes = [];
        var last = null;

        remote.on('value', function (data) {
            var q = data.val();
            for (var i in q) {
                if (q[i]) {
                    quotes.push(q[i]);
                }
            }
            last = quotes.length - 1;
            document.body.classList.add('loaded');
        });

        var animating = false;
        nextButton.addEventListener('click', function () {
            if (animating || !quotes.length) {
                return false;
            }

            var quote = Math.random() > .3 ? last-- : Math.floor(quotes.length * Math.random());

            animating = true;
            body.classList.add('animating');
            setTimeout(function () {
                quoteElement.innerText = quotes[quote];
                body.classList.remove('animating');
                animating = false;
            }, 1000);
        });
    }

    if (adminInput) {
        adminInput.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();

                var newQuote = adminInput.value.replace(/\n/g, '').trim();
                if (!newQuote) {
                    return;
                }
                remote.push(newQuote);

                adminInput.value = '';

                if (adminHistory) {
                    adminHistory.innerHTML += '<div>' + newQuote + '</div>';
                }
            }
        });
    }
});
