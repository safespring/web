function addLanguageLabels() {
  document.querySelectorAll('pre > code[class*="language-"]').forEach(function (codeBlock) {
    var languageMatch = codeBlock.className.match(/language-(\w+)/);
    if (languageMatch) {
      var language = languageMatch[1];
      var pre = codeBlock.parentNode;
      if (language === 'fallback') {
        language = ' ';
      }
      pre.setAttribute('data-lang', language);
    }
  });
}

addLanguageLabels();

document.querySelectorAll('pre').forEach((pre) => {
  const button = document.createElement('button');
  button.className = 'copy-code-button';
  button.innerHTML = 'Copy code';

  button.addEventListener('click', () => {
    const code = pre.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      button.innerHTML = 'Copied!';
      setTimeout(() => {
        button.innerHTML = 'Copy code';
      }, 4000);
    }).catch(() => {
      button.innerHTML = 'Error';
    });

    // Ta bort fokus från knappen efter 4 sekunder
    setTimeout(() => {
      button.blur();
    }, 4000);
  });

  pre.style.position = 'relative';
  pre.style.display = 'flex';
  button.style.position = 'absolute';
  button.style.top = '0';
  button.style.right = '0';

  pre.appendChild(button);
});