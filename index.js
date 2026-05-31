const columns = document.querySelectorAll('.compare__column');

columns.forEach(column => {
  column.addEventListener('click', () => {

    columns.forEach(item => {
      item.classList.remove('compare__column--active');
    });

    column.classList.add('compare__column--active');

  });
});