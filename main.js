const navTarget = document.querySelector("#nav-rep");
const blogListTarget = document.querySelector("#blog-list-rep");
const scriptUrl = document.currentScript?.src ?? window.location.href;
const navUrl = new URL("nav.html", scriptUrl);
const blogListUrl = new URL("blog_list.html", scriptUrl);
const navFallback = `
    <nav id="nav">
        <ul id="nu">
            <li><a href="/index.html">主页</a></li>
            <li><a href="/blog.html">博客</a></li>
            <li><a href="/works.html">项目</a></li>
        </ul>
    </nav>
`;

function mountNavigation(html) {
    if (!navTarget) return;

    navTarget.insertAdjacentHTML("beforeend", html);

    const siteBase = new URL("./", scriptUrl);
    navTarget.querySelectorAll('a[href^="/"]').forEach(link => {
        link.href = new URL(link.getAttribute("href").slice(1), siteBase);
    });
}

fetch(navUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Navigation request failed: ${response.status}`);
        }

        return response.text();
    })
    .then(html => {
        mountNavigation(html);
    })
    .catch(error => {
        console.error(error);
        mountNavigation(navFallback);
    });

if (blogListTarget) {
    fetch(blogListUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Blog list request failed: ${response.status}`);
            }

            return response.text();
        })
        .then(html => {
            blogListTarget.insertAdjacentHTML("beforeend", html);
        })
        .catch(error => {
            console.error(error);
        });
}
