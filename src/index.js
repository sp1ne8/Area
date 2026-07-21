// Burger menu
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Закрытие меню при клике на ссылку
  menu.querySelectorAll('.menu__item a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

const columns = document.querySelectorAll('.compare__column');

columns.forEach(column => {
  column.addEventListener('click', () => {

    columns.forEach(item => {
      item.classList.remove('compare__column--active');
    });

    column.classList.add('compare__column--active');

  });
});

//Links
const menuLinks = document.querySelectorAll('.menu__item a');
const sections = [];

menuLinks.forEach(link => {
  const id = link.getAttribute('href').substring(1);
  const section = document.getElementById(id);
  if (section) sections.push(section);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      menuLinks.forEach(link => link.classList.remove('active'));

      const activeLink = document.querySelector(`.menu__item a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => observer.observe(section));

// Parallax
const parallaxElements = [
  { el: document.querySelector('.hero__media'), speed: 0.05, base: '' },
  { el: document.querySelector('.main__img'), speed: 0.05, base: '' }, // исправил селектор
  { el: document.querySelector('.big__image img'), speed: 0.12, base: '' },
  { el: document.querySelector('.testimonial__image img'), speed: 0.12, base: '' },
  { el: document.querySelector('.map__image'), speed: 0.05, base: '' },
];

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      parallaxElements.forEach(({ el, speed, base }) => {
        if (!el) return;

        // Отключаем параллакс на мобильных и планшетах (экран < 1024px)
        if (window.innerWidth < 1299) {
          el.style.transform = ''; // Сбрасываем трансформацию в исходное положение
          return;
        }

        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          const offset = center * speed * -1;
          el.style.transform = `${base} translateY(${offset}px)`;
        }
      });

      ticking = false;
    });
    ticking = true;
  }
});
