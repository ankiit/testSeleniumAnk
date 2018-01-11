module.exports = {

  'Facebook Login': function (browser) {

    browser.url("https://www.facebook.com")
       .assert.title('Facebook – log in or sign up')
       browser.url(function(result) {
        // return the current url
        console.log("This is the current url :"+ result.value);
      });

      browser.end();
    }
  };
