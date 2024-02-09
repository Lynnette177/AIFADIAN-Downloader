// ==UserScript==
// @name         Image Downloader
// @namespace    https://afdian.net/
// @version      0.1
// @description  Display a download button for images on specified webpage
// @author       Lynnette177
// @match        https://afdian.net/*
// @grant        none
// ==/UserScript==

var shouldContinue = true;
var downloadstr = '';
(function() {
    'use strict';
    function savetotxt(stringToSave) {
        // Create a Blob containing the string data
        var blob = new Blob([stringToSave], {type: 'text/plain'});

        // Create a download link
        var downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);

        // Set the file name
        downloadLink.download = 'myFile.txt';

        // Append the link to the document
        document.body.appendChild(downloadLink);

        // Trigger a click on the link to initiate the download
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink);
        downloadstr = '';
    }
    function createAutoDisappearingPopup(message, duration) {
        var popupContainer = document.createElement('div');
        popupContainer.style.position = 'fixed';
        popupContainer.style.top = '50%';
        popupContainer.style.left = '50%';
        popupContainer.style.transform = 'translate(-50%, -50%)';
        popupContainer.style.padding = '20px';
        popupContainer.style.background = 'white';
        popupContainer.style.border = '1px solid #ccc';
        popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        popupContainer.style.zIndex = '9999';

        var popupMessage = document.createElement('p');
        popupMessage.textContent = message;

        popupContainer.appendChild(popupMessage);
        document.body.appendChild(popupContainer);

        // Auto-hide after the specified duration
        setTimeout(function() {
            popupContainer.remove();
        }, duration);
    }
    function DownloadAndNext() {
        if (!shouldContinue) {
            savetotxt(downloadstr);
            return;
        }
        var titleBox = document.querySelector('div.title-box[data-v-43e7283a]');
        var content = '';
        if (titleBox) {
            var linkElement = titleBox.querySelector('a');
            if (linkElement) {
                content = linkElement.textContent;
                console.log(content);
            }
        }
        downloadstr = downloadstr + content +'\n';
        var imagenum = 0;
        var imgElements = document.querySelectorAll('img');
        imgElements.forEach(function(img) {
        // Check if the image has a valid source and starts with "https://pic1"
            if (img.src && img.src.startsWith("https://pic1.afdiancdn.com/user/") && img.src.indexOf('avatar') === -1 && img.src.indexOf('user_upload_osl') == -1) {
                var imageUrl = img.src.split('?image')[0];
                console.log(imageUrl);
                imagenum += 1 ;
                downloadstr = downloadstr + imageUrl + '\n';
            }
        });
        createAutoDisappearingPopup(content + ' 已经添加 数量：' + imagenum,1000);
    // Pause for 2 seconds before clicking the "向后翻" element
        setTimeout(function() {
            clickNextButton();
        }, 2000);
    }

    // Function to click the "向后翻" element
function clickNextButton() {
    if (!shouldContinue) {
        savetotxt(downloadstr);
        return;
    }

    var aElements = document.querySelectorAll('a.tab-page-box.flex-item-1.ml16');
    for (var i = 0; i < aElements.length; i++) {
        var aElement = aElements[i];
        var nextButton = aElement.querySelector('p[data-v-43e7283a].tit');
        if (nextButton && nextButton.textContent.trim() === '向后翻') {
            nextButton.click();
            // After clicking, wait for 2 seconds before calling the scrapeAndDownloadImages function again
            setTimeout(function() {
                DownloadAndNext();
            }, 2000);
            return; // Exit the loop after clicking the correct button
        }
    }

    // If no matching element is found, stop the loop
    shouldContinue = false;
    setTimeout(function() {
                DownloadAndNext();
    }, 2000);
}

    // Function to create and append a download button
    function createDownloadButton() {
        var button = document.createElement('button');
        button.innerHTML = '下载当前页面所有照片';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.left = '10px';
        button.style.zIndex = '9999';
        button.addEventListener('click', scrapeAndDownloadImages);
        document.body.appendChild(button);
    }
    function createDownloadAndNextButton() {
        var button = document.createElement('button');
        button.innerHTML = '单个动态自动下载翻页开始';
        button.style.position = 'fixed';
        button.style.top = '50px';
        button.style.left = '10px';
        button.style.zIndex = '9999';
        button.addEventListener('click', function() {
            shouldContinue = true;
            DownloadAndNext();
        });
        document.body.appendChild(button);
    }
    function createStopButton() {
        var button = document.createElement('button');
        button.innerHTML = '停止自动翻页下载';
        button.style.position = 'fixed';
        button.style.top = '50px';
        button.style.left = '200px';
        button.style.zIndex = '9999';
        button.addEventListener('click', function() {
            shouldContinue = false;
        });
        document.body.appendChild(button);
    }

    // Function to download an image
    function downloadImage(url) {
        var link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Use the last part of the URL as the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Function to scrape and download images
    function scrapeAndDownloadImages() {
    downloadstr = '';
    var imgElements = document.querySelectorAll('img');
    imgElements.forEach(function(img) {
        // Check if the image has a valid source and starts with "https://pic1"
        if (img.src && img.src.startsWith("https://pic1.afdiancdn.com/user/") && img.src.indexOf('avatar') === -1 && img.src.indexOf('user_upload_osl') == -1) {
            // Extract the part before "?image"
            var imageUrl = img.src.split('?image')[0];
            console.log(imageUrl);
            downloadstr = downloadstr + imageUrl + '\n';
            // Download the image
            //downloadImage(imageUrl);
        }
    });
    console.log(downloadstr);
    savetotxt(downloadstr);
}

    // Check if the specified website is matched
    if (window.location.href.startsWith("https://afdian.net/")) {
        // Create and append the download button
        createDownloadButton();
        createDownloadAndNextButton();
        createStopButton();
    }
})();
