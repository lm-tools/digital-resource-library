module.exports = {
  init: () =>
    $('.toggle-switch .toggler').click((e) => {
      $(e.target).closest('.toggle-switch')
        .toggleClass('toggle')
        .toggleClass('toggled-once', true);
      e.preventDefault();
    }),
};
