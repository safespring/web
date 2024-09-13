function addLanguageLabels() {
  document.querySelectorAll('pre > code[class*="language-"]').forEach(function (codeBlock) {
    var language = codeBlock.className.match(/language-(\w+)/)[1];
    if (language) {
      var pre = codeBlock.parentNode;
      if (language === 'fallback') {
        language = ' ';
      }
      pre.setAttribute('data-lang', language);
    }
  });
}

document.querySelectorAll('pre').forEach((pre) => {
  addLanguageLabels();

  const button = document.createElement('button');
  button.className = 'copy-code-button';
  button.innerHTML = '';

  button.addEventListener('click', () => {
    const code = pre.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerHTML = '';
      setTimeout(() => {
        button.innerHTML = '';
      }, 2000);
    }).catch(() => {
      button.innerHTML = '';
    });
  });

  pre.style.display = 'flex';
  button.style.position = 'absolute';
  button.style.top = '0';
  button.style.right = '0';

  pre.appendChild(button);
});
