function addLanguageLabels() {
  document.querySelectorAll('pre > code[class*="language-"]').forEach(function (codeBlock) {
    var language = codeBlock.className.match(/language-(\w+)/)[1];
    if (language) {
      var pre = codeBlock.parentNode;
      pre.setAttribute('data-lang', language);
    }
  });
}

function addCopyButtons(clipboard) {
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.innerText = '';

    button.addEventListener('click', function () {
      clipboard.writeText(codeBlock.innerText).then(function () {
        button.blur();
        button.innerText = '';

        setTimeout(function () {
          button.innerText = '';
        }, 4000);
      }, function (error) {
        button.innerText = '';
      });
    });

    var pre = codeBlock.parentNode;
    if (pre.parentNode.classList.contains('highlight')) {
      var highlight = pre.parentNode;
      highlight.parentNode.insertBefore(button, highlight);
    } else {
      pre.parentNode.insertBefore(button, pre);
    }
  });
}

if (navigator && navigator.clipboard) {
  addLanguageLabels();
  addCopyButtons(navigator.clipboard);
} else {
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
  script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
  script.crossOrigin = 'anonymous';
  script.onload = function () {
    addLanguageLabels();
    addCopyButtons(clipboard);
  };

  document.body.appendChild(script);
}