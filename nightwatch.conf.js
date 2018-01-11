const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const PKG = require('./package.json'); // so we can get the version of the project
const SCREENSHOT_PATH = "./node_modules/nightwatch/screenshots/" + PKG.version + "/";


var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
openBrowser: true,
reportsDirectory: __dirname + '/reports',
relativeScreenshots: true,
themeName: 'default'


});

module.exports = {
reporter: reporter.fn
};


const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions

	"src_folders": [
		"myTest.js"     // we use '/test' as the name of our test directory by default. So 'test/e2e' for 'e2e'.
	],
	"page_objects_path": "",
	"output_folder": "./node_modules/nightwatch/reports", // reports (test outcome) output by Nightwatch

	"selenium": {
		"start_process": true,
		"server_path": seleniumServer.path,
		"log_path": "",
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.chrome.driver" : chromedriver.path,


		}
	},



	// "test_workers" : {"enabled" : true, "workers" : "auto"}, // perform tests in parallel where possible

	"test_settings": {
		"default": {
			"launch_url": "http://localhost", // we're testing a Public or "staging" site on Saucelabs
			"selenium_port": 4444,
			"selenium_host": "localhost",
			"silent": true,
			"screenshots" : {  "enabled" : true,  "on_failure" : true,  "on_error" : true,  "path" : SCREENSHOT_PATH},
			"skip_testcases_on_fail":false,
			"globals": {
				"waitForConditionTimeout": 10000,    // wait for content on the page before continuing
				//"abortOnAssertionFailure":false,
				//"abortOnFailure":false,
			}
		},
		"local": {
			"launch_url": "http://localhost",
			"selenium_port": 4444,
			"selenium_host": "127.0.0.1",
			"silent": true,
			"screenshots" : {  "enabled" : true,  "on_failure" : true,  "on_error" : true,  "path" : SCREENSHOT_PATH},
			"globals": {
				"waitForConditionTimeout": 15000, // on localhost sometimes internet is slow so wait...
				//"abortOnAssertionFailure":false,
				//"abortOnFailure":false,
				"skip_testcases_on_fail":false

			},
			"desiredCapabilities": {
				"browserName": "chrome",
				//"chromeOptions": {
				// "args": [
				//  `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
				//  (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
				//  "--window-size=640,1136" // iphone 5
				// ]
				//},
				"chromeOptions": {"args": ["--headless"]},
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		},
		"chrome": { // your local Chrome browser (chromedriver)
			"desiredCapabilities": {
				"browserName": "chrome",
				"javascriptEnabled": true,
				"acceptSslCerts": true,
				"chromeOptions": {"args": ["--headless"]}
			}
		},

		"android_web": {
			"selenium_start_process": false,
			//"launch_url": "http://www.google.com/",
			"selenium_port": 4723,
			"selenium_host": "localhost",
			"silent": true,
			"screenshots": {
				"enabled": false,
				"path": ""
			},

			"desiredCapabilities": {
				"browserName": "chrome",
				"platformName": "ANDROID",
				"deviceName": "samsung",
				"version": "5.0.1",
				"javascriptEnabled": true,
				"acceptSslCerts": true
					//"elementScrollBehavior": 1
			},
			"globals": {
				"waitForConditionTimeout": 15000, // on localhost sometimes internet is slow so wait...,
				//"abortOnAssertionFailure":false,
				"abortOnFailure":false
			}
		},

		// "android_native": {
		//     "selenium_port": 4723,
		//     "selenium_host": "localhost",
		//     "silent": true,
		//     "screenshots": {
		//         "enabled": false,
		//         "path": ""
		//     },
		//
		//     "desiredCapabilities": {
		//         "app": "E:\\New folder\\learn-nightwatch\\app.jibo.mock.1.0.1.apk",
		//         "platformName": "ANDROID",
		//         "deviceName": "samsung",
		//         "version": "5.0.1",
		//         "javascriptEnabled": true,
		//         "acceptSslCerts": true
		//     }
		// },



	}
}
module.exports = config;

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
	return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (browser) {
	var a = browser.options.desiredCapabilities;
	var meta = [a.platform];
	meta.push(a.browserName ? a.browserName : 'any');
	meta.push(a.version ? a.version : 'any');
	meta.push(a.name); // this is the test filename so always exists.
	var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
	return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
