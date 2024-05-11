import { PAGES } from './constants.js';
const containerEl = document.querySelector('.container');
export function setDataLoading(isLoading) {
    if (!isLoading) {
        return containerEl?.querySelectorAll('.spinner').forEach(spinnerEl => spinnerEl.remove());
    }
    const spinnerEl = document.createElement('div');
    spinnerEl.classList.add('spinner');
    containerEl?.appendChild(spinnerEl);
}
export function renderBreadcrumbs() {
    const url = window.location.hash.replace('#', '');
    const breadcrumbsEl = document.querySelector('.breadcrumbs');
    const breadcrumbs = [];
    const parts = url.split('/');
    if (breadcrumbsEl) {
        breadcrumbsEl.innerHTML = '';
    }
    const urlParts = url.split('/');
    for (let i = 0; i < urlParts.length; i++) {
        const currentUrl = parts.slice(0, i + 1).join('/');
        const page = PAGES.find(p => p.check(currentUrl));
        if (page?.title === '404' && i === urlParts.length - 1) {
            return;
        }
        //	Why did I pass check for "404" page?
        //		Because when we get currentUrl = "users/1" in loop,
        //		our router can't find page with this url
        if (!currentUrl || page?.title === '404') {
            continue;
        }
        breadcrumbs.push({
            title: page?.title || '-',
            url: `#${currentUrl}`
        });
    }
    breadcrumbs.forEach(breadcrumb => {
        const breadcrumbLinkEl = document.createElement('a');
        breadcrumbLinkEl.classList.add('breadcrumb');
        breadcrumbLinkEl.innerHTML = breadcrumb.title;
        breadcrumbLinkEl.setAttribute('href', breadcrumb.url);
        if (!breadcrumbsEl) {
            return;
        }
        breadcrumbsEl.appendChild(breadcrumbLinkEl);
    });
}
export function hideBreadcrumbs() {
    const breadcrumbsEl = document.querySelector('.breadcrumbs');
    if (!breadcrumbsEl) {
        return;
    }
    breadcrumbsEl.innerHTML = '';
}
