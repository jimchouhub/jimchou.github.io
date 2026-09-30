(function () {
  'use strict';

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight the nav link for the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) {
      var section = document.querySelector(a.getAttribute('href'));
      if (section) observer.observe(section);
    });
  }

  // Contact form: validate, then open the visitor's email app with the message filled in
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = ['name', 'email', 'message'].map(function (n) { return form.elements[n]; });
    var valid = true;
    fields.forEach(function (f) {
      var ok = f.value.trim() !== '' && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value));
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok) valid = false;
    });
    if (!valid) {
      status.textContent = 'Please fill in your name, a valid email, and a message.';
      return;
    }
    var subject = 'Message from ' + fields[0].value.trim();
    var body = fields[2].value.trim() + '\n\n' + fields[0].value.trim() + '\n' + fields[1].value.trim();
    window.location.href = 'mailto:jimchou10@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Opening your email app. If nothing happens, email jimchou10@gmail.com directly.';
  });
})();
