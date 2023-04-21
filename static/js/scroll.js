var scrollLinks = document.querySelectorAll('a');

scrollLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    var target = document.querySelector(this.getAttribute('href'));
    var targetTop = target.offsetTop;
    
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
    
    target.classList.add('scroll-animation');
    setTimeout(function() {
      target.classList.remove('scroll-animation');
    }, 1000);
  });
});