if (navigator.share) {
  document.querySelectorAll('[data-share-url]').forEach(($shareEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Partager';
    $shareEl.parentNode.append($button);
    $button.addEventListener(
      'click',
      share.bind(this, $shareEl, $button)
    );
  });
} else {
  console.warn("Pas de support :(")
}