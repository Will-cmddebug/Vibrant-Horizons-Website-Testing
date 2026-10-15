
/* SOCIAL MEDIA LINKS */
const LINKS = {
    discord: '',
    TikTok: '',
    Instagram: '',
    X: '',
    Discord: ''
};

/* MOBILE NAVIGATION */
const menu = document.querySelector('.menu-toggle'),
      nav = document.querySelector('#navigation');

menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.textContent = open ? '×' : '☰';
});

/* OPTIONAL IMAGES */
for (const img of document.querySelectorAll('[data-optional-image]')) {
    img.addEventListener('error', () => img.classList.add('is-missing'));

    if (img.complete && img.naturalWidth === 0) {
        img.classList.add('is-missing');
    }
}

/* DISCORD BUTTONS */
for (const link of document.querySelectorAll('[data-discord]')) {
    if (LINKS.discord) {
        link.href = LINKS.discord;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    } else {
        link.addEventListener('click', e => {
            e.preventDefault();
            alert('Discord invitation URL has not been configured yet. Edit Scripts/site.js.');
        });
    }
}

/* SOCIAL MEDIA BUTTONS */
for (const link of document.querySelectorAll('[data-social]')) {
    const url = LINKS[link.dataset.social] ||
        (link.dataset.social === 'Discord' ? LINKS.discord : '');

    if (url) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.removeAttribute('title');
    } else {
        link.addEventListener('click', e => {
            e.preventDefault();
            alert('This social link has not been configured yet. Edit Scripts/site.js.');
        });
    }
}

/* RESOURCE SEARCH & FILTERS */
const search = document.querySelector('#resource-search'),
      filters = [...document.querySelectorAll('[data-filter]')];

let selected = 'all';

function filterResources() {
    const q = (search?.value || '').trim().toLowerCase();
    let visible = 0;

    for (const item of document.querySelectorAll('#resource-list article')) {
        const show =
            (selected === 'all' || item.dataset.category === selected) &&
            item.textContent.toLowerCase().includes(q);

        item.hidden = !show;

        if (show) visible++;
    }

    const empty = document.querySelector('#no-resources');

    if (empty) empty.hidden = visible > 0;
}

search?.addEventListener('input', filterResources);

for (const filter of filters) {
    filter.addEventListener('click', () => {
        selected = filter.dataset.filter;

        filters.forEach(f => f.classList.toggle('active', f === filter));
        filterResources();
    });
}

/* CONTACT FORM */
document.querySelector('#contact-form')?.addEventListener('submit', e => {
    e.preventDefault();

    const notice = document.querySelector('.form-notice');

    notice.textContent = 'Message not sent: a form backend or email service must be configured first.';
    notice.focus?.();
});
